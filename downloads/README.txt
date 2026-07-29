Drop the built Tauri installers here using these exact filenames — spifora.html already links to them:

Windows
  Spifora_1.0.0_x64-setup.exe        (NSIS installer)
  Spifora_1.0.0_x64_en-US.msi        (MSI installer)
  Spifora_1.0.0_arm64-setup.exe      (ARM64)

macOS
  Spifora_1.0.0_universal.dmg        (Apple Silicon + Intel)
  Spifora_1.0.0_aarch64.dmg          (Apple Silicon only)
  Spifora_1.0.0_x64.dmg              (Intel only)

Linux
  spifora_1.0.0_amd64.AppImage
  spifora_1.0.0_amd64.deb
  spifora-1.0.0-1.x86_64.rpm

These come out of `Erp/src-tauri/target/release/bundle/` after running the Tauri build
(`npm run tauri build` from Erp/, or the platform-specific build command). Rename/copy
them here to match the list above, or update the href values in spifora.html if you'd
rather keep Tauri's default filenames.
