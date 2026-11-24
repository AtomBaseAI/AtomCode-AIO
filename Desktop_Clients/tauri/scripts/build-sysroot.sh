#!/bin/bash
# AtomCode Tauri — local GTK/WebKit sysroot builder.
#
# The sandbox has no root access, so we cannot `apt-get install`.
# Instead we download the full dependency tree of libwebkit2gtk-4.1-dev
# as .deb files and extract them into ~/tauri-sysroot. Build uses
# PKG_CONFIG_SYSROOT_DIR; runtime uses LD_LIBRARY_PATH.
set -u

SYSROOT="$HOME/tauri-sysroot"
WORK="$HOME/tauri-sysroot-build"
mkdir -p "$WORK" "$SYSROOT"
cd "$WORK"

log() { echo "[sysroot] $*"; }

# 1. Resolve the recursive dependency set.
log "resolving dependency tree..."
SEEDS="libwebkit2gtk-4.1-dev fonts-dejavu-core fontconfig"
TREE="$(apt-cache depends --recurse --no-recommends --no-suggests --no-conflicts \
  --no-breaks --no-replaces --no-enhances $SEEDS 2>/dev/null)"

# Dependency targets (indented "Depends: x") and subject package names.
DEPS="$(printf '%s\n' "$TREE" | grep -E '^\s+(Depends|PreDepends):' | sed -E 's/^\s+(Depends|PreDepends):\s*//' | sed -E 's/^<//; s/>$//' | sed -E 's/\s*\(.*$//' | sed -E 's/:any$//; s/:amd64$//')"
SUBJ="$(printf '%s\n' "$TREE" | grep -E '^[a-z0-9][a-z0-9+.-]*$')"

ALL="$(printf '%s\n%s\n' "$DEPS" "$SUBJ" | sort -u | grep -vE '^$')"
# Drop packages that are virtual, or that must never be shadowed from a sysroot.
ALL="$(printf '%s\n' "$ALL" | grep -vE '^(debconf|dpkg|install-info|libc-bin|mount|util-linux|tar|gzip|dash|sed|grep|coreutils|bash|findutils|default-dbus-session-bus|dbus-user-session|gcc-14-base|cpp-14|cpp|xz-utils|bzip2|patch)$')"

COUNT=$(printf '%s\n' "$ALL" | grep -c . || true)
log "package count: $COUNT"

# 2. Download everything (ignore individual failures — some are virtual).
log "downloading .debs..."
i=0
for p in $ALL; do
  i=$((i+1))
  apt-get download "$p" >/dev/null 2>&1 || true
  if [ $((i % 50)) -eq 0 ]; then log "progress $i/$COUNT"; fi
done
log "download loop done: $(ls ./*.deb 2>/dev/null | wc -l) debs fetched"

# 3. Extract every .deb into the sysroot.
log "extracting..."
for deb in ./*.deb; do
  dpkg -x "$deb" "$SYSROOT" >/dev/null 2>&1 || log "extract failed: $deb"
done
log "extraction complete"

# 4. Compile glib schemas + regenerate gdk-pixbuf loader cache (webkit needs both).
SCHEMAS="$SYSROOT/usr/share/glib-2.0/schemas"
if [ -d "$SCHEMAS" ] && [ -x "$SYSROOT/usr/bin/glib-compile-schemas" ]; then
  LD_LIBRARY_PATH="$SYSROOT/usr/lib/x86_64-linux-gnu:$SYSROOT/lib/x86_64-linux-gnu" \
    "$SYSROOT/usr/bin/glib-compile-schemas" "$SCHEMAS" >/dev/null 2>&1 || true
  log "glib schemas compiled"
fi
LOADERS="$SYSROOT/usr/lib/x86_64-linux-gnu/gdk-pixbuf-2.0/2.10.0/loaders"
if [ -x "$SYSROOT/usr/bin/gdk-pixbuf-query-loaders" ]; then
  LD_LIBRARY_PATH="$SYSROOT/usr/lib/x86_64-linux-gnu:$SYSROOT/lib/x86_64-linux-gnu" \
    "$SYSROOT/usr/bin/gdk-pixbuf-query-loaders" "$LOADERS"/*.so > "$SYSROOT/gdk-pixbuf.loaders" 2>/dev/null || true
  log "gdk-pixbuf loader cache written"
fi

# 5. Fontconfig cache dir (writable).
mkdir -p "$SYSROOT/fontconfig-cache"

# 5b. CA certificates — GnuTLS (glib-networking TLS backend) reads
#     /etc/ssl/certs/ca-certificates.crt at its compiled-in path. Without a
#     trust bundle every https:// fetch from the webview fails with
#     g-tls-error-quark ("Cannot reach server …"). Copy the host bundle in.
if [ -f /etc/ssl/certs/ca-certificates.crt ]; then
  mkdir -p "$SYSROOT/etc/ssl/certs"
  cp /etc/ssl/certs/ca-certificates.crt "$SYSROOT/etc/ssl/certs/ca-certificates.crt"
  log "CA bundle copied ($(grep -c 'BEGIN CERTIFICATE' "$SYSROOT/etc/ssl/certs/ca-certificates.crt") certs)"
fi

log "SYSROOT ready at $SYSROOT"
du -sh "$SYSROOT" 2>/dev/null | head -1

# 6. WebKit helper-path patch (sandbox only) — the Debian libwebkit2gtk
#    hard-codes /usr/lib/x86_64-linux-gnu/webkit2gtk-4.1 as its helper
#    directory. In a rootless sysroot that path does not exist, so the
#    WebKitNetworkProcess/WebProcess spawn fails and the app aborts.
#    Patch the two baked-in literals to a short writable path (/tmp/wk)
#    with symlinks to the sysroot helpers (C-string NUL-padding keeps the
#    ELF layout intact).
LIB="$SYSROOT/usr/lib/x86_64-linux-gnu/libwebkit2gtk-4.1.so.0"
if [ -f "$LIB" ] && [ -x "$SYSROOT/usr/lib/x86_64-linux-gnu/webkit2gtk-4.1/WebKitNetworkProcess" ]; then
  mkdir -p /tmp/wk
  for h in WebKitNetworkProcess WebKitWebProcess WebKitGPUProcess; do
    ln -sf "$SYSROOT/usr/lib/x86_64-linux-gnu/webkit2gtk-4.1/$h" "/tmp/wk/$h"
  done
  ln -sfn "$SYSROOT/usr/lib/x86_64-linux-gnu/webkit2gtk-4.1/injected-bundle" /tmp/wk/injected-bundle
  python3 - "$LIB" <<'PYEOF'
import sys
lib = sys.argv[1]
with open(lib, "r+b") as f:
    data = f.read()
reps = [
    (b"/usr/lib/x86_64-linux-gnu/webkit2gtk-4.1/injected-bundle/", b"/tmp/wk/injected-bundle/"),
    (b"/usr/lib/x86_64-linux-gnu/webkit2gtk-4.1", b"/tmp/wk"),
]
changed = 0
for old, new in reps:
    i = data.find(old)
    while i >= 0:
        data = data[:i] + new + b"\x00" * (len(old) - len(new)) + data[i + len(old):]
        changed += 1
        i = data.find(old, i + len(new))
with open(lib, "wb") as f:
    f.write(data)
print(f"[sysroot] patched {changed} webkit helper path literal(s)")
PYEOF
fi
