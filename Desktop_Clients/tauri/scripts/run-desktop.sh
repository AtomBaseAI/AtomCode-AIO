#!/usr/bin/env bash
# run-desktop.sh — run the Tauri AtomCode Student binary with the
# rootless GTK/WebKit runtime environment (sandbox / sysroot mode).
#
#   SYSROOT=$HOME/tauri-sysroot            # set when using the local sysroot
#   DISPLAY=:99 ./scripts/run-desktop.sh   # headless (Xvfb) or any display
#   ATOMCODE_PORT=3021 ./scripts/run-desktop.sh   # pin the loopback port
#
# On a normal Linux desktop (system webkit2gtk-4.1 installed) simply run:
#   ./src-tauri/target/debug/atomcode-student
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
APP="$HERE/../src-tauri/target/debug/atomcode-student"
[ -x "$APP" ] || APP="$HERE/../src-tauri/target/release/atomcode-student"
if [ ! -x "$APP" ]; then
  echo "binary not found — build first: (cd src-tauri && cargo build)" >&2
  exit 1
fi

export ATOMCODE_RENDERER_ROOT="${ATOMCODE_RENDERER_ROOT:-}"
# Runtime environment for the local sysroot (rootless sandboxes).
if [ -n "${SYSROOT:-}" ] && [ -d "$SYSROOT" ]; then
  export LD_LIBRARY_PATH="$SYSROOT/usr/lib/x86_64-linux-gnu:$SYSROOT/lib/x86_64-linux-gnu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
  export GSETTINGS_SCHEMA_DIR="$SYSROOT/usr/share/glib-2.0/schemas"
  # GLib resolves GIO modules from its compiled-in path (/usr/lib/…/gio/modules).
  # On hosts WITHOUT glib-networking there is no TLS backend there and every
  # https:// load fails with g-tls-error-quark. Point GLib at the sysroot's
  # GIO modules (libgiognutls.so) instead.
  export GIO_MODULE_DIR="$SYSROOT/usr/lib/x86_64-linux-gnu/gio/modules"
  export GDK_PIXBUF_MODULE_FILE="$SYSROOT/gdk-pixbuf.loaders"
  export WEBKIT_DISABLE_DMABUF_RENDERER=1   # software rendering (xvfb)
  export WEBKIT_DISABLE_COMPOSITING_MODE=1  # accel. compositing crashes Xvfb (Debian trixie)
  # WebKit's bubblewrap sandbox hides /etc/ssl inside the rootless sysroot
  # namespace → GnuTLS finds no CA bundle and TLS handshakes fail. The
  # sandbox must stay off in this mode (webkit >= 2.4x flag name).
  export WEBKIT_DISABLE_SANDBOX_THIS_IS_DANGEROUS=1
  export LIBGL_ALWAYS_SOFTWARE=1
  export FONTCONFIG_FILE="${FONTCONFIG_FILE:-/etc/fonts/fonts.conf}"
fi

export DISPLAY="${DISPLAY:-:99}"
echo "[run-desktop] DISPLAY=$DISPLAY SYSROOT=${SYSROOT:-none} APP=$APP"
exec "$APP"
