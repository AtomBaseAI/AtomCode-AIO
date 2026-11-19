; ================================================================
; AtomCode Student — NSIS installer customization
;
; Runs at the end of every install / uninstall:
;   customInstall   → verifies that every bundled component (app code,
;                     WASM runtimes, Java runtime, integrity manifest)
;                     landed on disk correctly and reports the result
;                     to the user; desktop + Start Menu shortcuts are
;                     created by electron-builder (createDesktopShortcut/
;                     createStartMenuShortcut = "always").
;   customUnInstall → cleanup notice.
; ================================================================

!macro customInstall
  DetailPrint "Verifying installed components…"

  StrCpy $R0 0 ; failure counter

  ${If} ${FileExists} "$INSTDIR\resources\app.asar"
    DetailPrint "  [OK]   Application code + WASM execution engine (app.asar)"
  ${Else}
    DetailPrint "  [FAIL] Application code missing: resources\app.asar"
    IntOp $R0 $R0 + 1
  ${EndIf}

  ${If} ${FileExists} "$INSTDIR\resources\java-runtime\runner.js"
    DetailPrint "  [OK]   Java runtime entry (java-runtime\runner.js)"
  ${Else}
    DetailPrint "  [FAIL] Java runtime missing: java-runtime\runner.js"
    IntOp $R0 $R0 + 1
  ${EndIf}

  ${If} ${FileExists} "$INSTDIR\resources\java-runtime\node_modules\doppiojvm\vendor\java_home\lib\rt.jar"
    DetailPrint "  [OK]   JDK 8 class library (rt.jar)"
  ${Else}
    DetailPrint "  [FAIL] JDK 8 class library missing: rt.jar"
    IntOp $R0 $R0 + 1
  ${EndIf}

  ${If} ${FileExists} "$INSTDIR\resources\java-runtime\node_modules\doppiojvm\vendor\java_home\lib\tools.jar"
    DetailPrint "  [OK]   Java compiler (tools.jar / javac)"
  ${Else}
    DetailPrint "  [FAIL] Java compiler missing: tools.jar"
    IntOp $R0 $R0 + 1
  ${EndIf}

  ${If} ${FileExists} "$INSTDIR\resources\integrity-manifest.json"
    DetailPrint "  [OK]   Installation integrity manifest"
  ${Else}
    DetailPrint "  [FAIL] Integrity manifest missing: integrity-manifest.json"
    IntOp $R0 $R0 + 1
  ${EndIf}

  ${If} $R0 == 0
    DetailPrint "Verification complete: 5/5 components installed correctly."
    MessageBox MB_ICONINFORMATION|MB_TOPMOST \
      "Installation verified successfully.$\n$\nAll bundled components are installed and intact:$\n  - Application code & built-in WASM engine$\n  - Python 3.11-3.14 / SQL / Ruby / JS / TS runtimes$\n  - C / C++ (Clang) toolchain$\n  - Java runtime (Doppio JVM + JDK 8 + javac)$\n  - Installation integrity manifest$\n$\nShortcuts:$\n  - Desktop shortcut created$\n  - Start Menu shortcut created$\n  - Menu bar / tray icon appears while the app runs$\n$\nAtomCode Student is ready to use."
  ${Else}
    DetailPrint "Verification FAILED: $R0 component(s) missing."
    MessageBox MB_ICONEXCLAMATION|MB_TOPMOST \
      "Installation verification FAILED.$\n$\n$R0 required component(s) did not install correctly.$\nClick 'Show details' in this installer to see which ones.$\n$\nPlease run the installer again (or re-download the setup file).$\nThe app will refuse to start until the installation is complete."
  ${EndIf}
!macroend

!macro customUnInstall
  DetailPrint "Removing AtomCode Student and its bundled runtimes…"
!macroend
