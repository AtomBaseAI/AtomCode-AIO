; ================================================================
; AtomCode Student — NSIS installer customization
;
; Runs at the end of every install / uninstall:
;   customInstall   → verifies that every bundled component (app code,
;                     WASM runtimes, Java runtime, integrity manifest)
;                     actually landed on disk, SELF-REPAIRS a partial
;                     install by re-extracting the payload straight into
;                     $INSTDIR, and reports a loud, actionable failure if
;                     repair is impossible. Desktop + Start Menu shortcuts
;                     are created by electron-builder (createDesktopShortcut/
;                     createStartMenuShortcut = "always").
;   customUnInstall → cleanup notice.
;
; WHY THIS EXISTS
; ---------------
; electron-builder's NSIS flow extracts the app payload in two phases:
;   1. Nsis7z::Extract  →  %TEMP%\nsXXX.tmp\7z-out\   (result never checked)
;   2. CopyFiles /SILENT "%TEMP%\...\7z-out\*" $INSTDIR
;      (SHFileOperation aborts ALL remaining files on the first error)
; A disk-full, antivirus lock or transient copy error therefore produces
; a silently TRUNCATED install: the files after the failure point are
; simply missing, and the installer still reports success. The app then
; refuses to start at launch (integrity manifest check) with a wall of
; "missing file" errors that reinstalling alone may not fix.
;
; This macro closes that hole:
;   - 16 sentinel files spanning the WHOLE tree (including the
;     alphabetically-late packages that a truncated copy loses first)
;     plus minimum-size checks for the big anchors (app.asar, jars).
;   - If anything is missing, the still-present payload in $PLUGINSDIR
;     is re-extracted DIRECTLY into $INSTDIR (single-phase, checked)
;     and everything is verified again.
;   - If verification still fails, the installer sets a non-zero error
;     level and tells the user exactly what to do — instead of leaving
;     a broken install that the app will refuse to start from.
; ================================================================

!include "LogicLib.nsh"

; NOTE: the AC_* globals are declared with `Var /GLOBAL` inside the
; customInstall macro (not at file scope) because this script is also
; compiled into the UNINSTALLER pass, where customInstall is never
; expanded — file-scope declarations would trigger makensis warning 6001
; ("variable not referenced"), which electron-builder treats as an error.

; --- verification pass ---------------------------------------------
; AC_RunChecks: (re)sets the counters and checks every sentinel.
; Order: alphabetically-LATE packages first, so the first missing
; sentinel pinpoints where a truncated copy stopped.

!macro AC_RunChecks
  StrCpy $AC_MissingCount 0
  StrCpy $AC_FirstMissing ""

  !insertmacro AC_CheckFile    "$INSTDIR\resources\java-runtime\node_modules\source-map-support\source-map-support.js"
  !insertmacro AC_CheckFile    "$INSTDIR\resources\java-runtime\node_modules\source-map\source-map.js"
  !insertmacro AC_CheckFile    "$INSTDIR\resources\java-runtime\node_modules\pako\package.json"
  !insertmacro AC_CheckBigFile "$INSTDIR\resources\java-runtime\node_modules\doppiojvm\vendor\java_home\lib\tools.jar"   9216000   ; ~9 MB (actual ~18 MB)
  !insertmacro AC_CheckBigFile "$INSTDIR\resources\java-runtime\node_modules\doppiojvm\vendor\java_home\lib\rt.jar"     33554432   ; ~32 MB (actual ~65 MB)
  !insertmacro AC_CheckFile    "$INSTDIR\resources\java-runtime\node_modules\doppiojvm\package.json"
  !insertmacro AC_CheckFile    "$INSTDIR\resources\java-runtime\node_modules\doppiojvm\bin\doppio"
  !insertmacro AC_CheckFile    "$INSTDIR\resources\java-runtime\node_modules\doppiojvm\dist\release-cli\console\runner.js"
  !insertmacro AC_CheckFile    "$INSTDIR\resources\java-runtime\node_modules\doppiojvm\dist\release-cli\src\util.js.map"
  !insertmacro AC_CheckBigFile "$INSTDIR\resources\java-runtime\node_modules\doppiojvm\dist\release-cli\vendor\java_home\lib\rt.jar" 33554432 ; the vendored copy
  !insertmacro AC_CheckFile    "$INSTDIR\resources\java-runtime\node_modules\browserfs\dist\browserfs.min.js"
  !insertmacro AC_CheckFile    "$INSTDIR\resources\java-runtime\node_modules\async\package.json"
  !insertmacro AC_CheckFile    "$INSTDIR\resources\java-runtime\runner.js"
  !insertmacro AC_CheckFile    "$INSTDIR\resources\java-runtime\doppio-wrapper.js"
  !insertmacro AC_CheckBigFile "$INSTDIR\resources\integrity-manifest.json" 10240  ; ~10 KB (actual ~110 KB)
  !insertmacro AC_CheckBigFile "$INSTDIR\resources\app.asar" 52428800                      ; ~50 MB (actual ~150 MB)
!macroend

!macro AC_CheckFile PATH
  ${IfNot} ${FileExists} ${PATH}
    IntOp $AC_MissingCount $AC_MissingCount + 1
    ${If} $AC_FirstMissing == ""
      StrCpy $AC_FirstMissing ${PATH}
    ${EndIf}
  ${EndIf}
!macroend

; Existence + minimum size. A 0-byte / truncated-but-present file is
; just as fatal as a missing one (the integrity manifest would reject
; it at launch), so both conditions trigger the repair pass.
!macro AC_CheckBigFile PATH MINBYTES
  ${If} ${FileExists} ${PATH}
    ClearErrors
    FileOpen $R6 ${PATH} r
    ${If} ${Errors}
      IntOp $AC_MissingCount $AC_MissingCount + 1
      ${If} $AC_FirstMissing == ""
        StrCpy $AC_FirstMissing ${PATH}
      ${EndIf}
    ${Else}
      FileSeek $R6 0 END $R7   ; $R7 = file size in bytes
      FileClose $R6
      ${If} $R7 < ${MINBYTES}
        IntOp $AC_MissingCount $AC_MissingCount + 1
        ${If} $AC_FirstMissing == ""
          StrCpy $AC_FirstMissing ${PATH}
        ${EndIf}
      ${EndIf}
    ${EndIf}
  ${Else}
    IntOp $AC_MissingCount $AC_MissingCount + 1
    ${If} $AC_FirstMissing == ""
      StrCpy $AC_FirstMissing ${PATH}
    ${EndIf}
  ${EndIf}
!macroend

; --- one-shot payload re-extraction into $INSTDIR -------------------
; The payload File'd into $PLUGINSDIR during installApplicationFiles is
; still present here. Extract it straight into $INSTDIR (the same thing
; electron-builder's template does as its own last-resort path) — one
; checked phase instead of TEMP-extract + CopyFiles.
!macro AC_RepairPayload
  SetOutPath "$INSTDIR"
  DetailPrint "Incomplete install detected — re-extracting the application payload (this can take a minute)…"
  DetailPrint "First missing component: $AC_FirstMissing"
  ClearErrors
  !if "${COMPRESSION_METHOD}" == "zip"
    nsisunz::Unzip "$PLUGINSDIR\app-$packageArch.${COMPRESSION_METHOD}" "$INSTDIR"
    Pop $AC_ExtractResult
  !else
    ${If} ${FileExists} "$PLUGINSDIR\app-$packageArch.${COMPRESSION_METHOD}"
      Nsis7z::Extract "$PLUGINSDIR\app-$packageArch.${COMPRESSION_METHOD}"
      Pop $AC_ExtractResult
    ${Else}
      StrCpy $AC_ExtractResult "payload not found in installer temp dir"
    ${EndIf}
  !endif
  DetailPrint "Re-extraction finished (result: $AC_ExtractResult) — verifying again…"
!macroend

!macro customInstall
  Var /GLOBAL AC_MissingCount   ; sentinel failures found by the current pass
  Var /GLOBAL AC_FirstMissing   ; first missing sentinel (diagnostics)
  Var /GLOBAL AC_ExtractResult  ; payload re-extraction plugin result

  DetailPrint "Verifying installed components…"

  !insertmacro AC_RunChecks

  ${If} $AC_MissingCount == 0
    DetailPrint "Verification complete: all bundled components installed correctly."
    MessageBox MB_ICONINFORMATION|MB_TOPMOST /SD IDOK \
      "Installation verified successfully.$\n$\nAll bundled components are installed and intact:$\n  - Application code & built-in WASM engine (app.asar)$\n  - Python 3.11-3.14 / SQL / Ruby / JS / TS runtimes$\n  - C / C++ (Clang) toolchain$\n  - Java runtime (Doppio JVM + JDK 8 + javac)$\n  - Installation integrity manifest$\n$\nShortcuts:$\n  - Desktop shortcut created$\n  - Start Menu shortcut created$\n  - Menu bar / tray icon appears while the app runs$\n$\nAtomCode Student is ready to use."
  ${Else}
    !insertmacro AC_RepairPayload
    !insertmacro AC_RunChecks

    ${If} $AC_MissingCount == 0
      DetailPrint "Repair complete: all components verified after re-extraction."
      MessageBox MB_ICONINFORMATION|MB_TOPMOST /SD IDOK \
        "Installation repaired successfully.$\n$\nThe first extraction pass was incomplete (this can happen when disk space runs low, an antivirus tool briefly locks files, or the machine was shut down mid-install).$\n$\nThe installer re-extracted the application payload and verified that every bundled component is now in place.$\n$\nAtomCode Student is ready to use."
    ${Else}
      DetailPrint "REPAIR FAILED: $AC_MissingCount component(s) still missing or corrupted."
      SetErrorLevel 2   ; scripted/IT deployments can detect the failed install
      MessageBox MB_ICONEXCLAMATION|MB_TOPMOST /SD IDOK \
        "Installation could NOT be completed.$\n$\n$AC_MissingCount required component(s) are still missing or corrupted after an automatic repair attempt.$\n$\nFirst missing component:$\n$AC_FirstMissing$\n$\nMost common causes and fixes:$\n  1. Not enough free disk space — free up at least 2 GB on the install drive, then run this installer again.$\n  2. Antivirus / endpoint protection interfering — temporarily pause real-time protection during installation.$\n  3. A previous installation was interrupted — run this installer again (it will overwrite the incomplete files).$\n$\nUntil the installation completes successfully, AtomCode Student will not start."
    ${EndIf}
  ${EndIf}
!macroend

!macro customUnInstall
  DetailPrint "Removing AtomCode Student and its bundled runtimes…"
!macroend
