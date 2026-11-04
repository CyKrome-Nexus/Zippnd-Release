# Zippnd — Releases

Official distribution repository for **Zippnd**: send anything to any device nearby —
Mac to Windows, Linux to Android, iPhone to PC. Peer-to-peer and end-to-end encrypted.
A CyKrome Nexus app.

This repository hosts released binaries and the [zippnd.cykrome.com](https://zippnd.cykrome.com)
landing page only. It contains no source code.

## Install

macOS and Linux can install from the terminal:

```bash
curl -fsSL https://github.com/CyKrome-Nexus/Zippnd-Release/releases/latest/download/install.sh | bash
```

Platform-specific installers are also attached to every release:

```bash
curl -fsSL https://github.com/CyKrome-Nexus/Zippnd-Release/releases/latest/download/install-mac.sh | bash
curl -fsSL https://github.com/CyKrome-Nexus/Zippnd-Release/releases/latest/download/install-linux.sh | bash
```

The macOS installer extracts the `.app.tar.gz` into `/Applications` and removes
Gatekeeper quarantine attributes. The Linux installer installs the AppImage under
`~/.local/share/Zippnd`, creates a desktop entry, and links `zippnd` into
`~/.local/bin`.

## Download

Grab the latest build from the [**Releases**](../../releases/latest) page.

| Platform | File |
| --- | --- |
| macOS (Apple Silicon) | `Zippnd_<version>_aarch64.dmg` or `Zippnd_aarch64.app.tar.gz` |
| macOS (Intel) | `Zippnd_<version>_x64.dmg` or `Zippnd_x86_64.app.tar.gz` |
| Windows | `Zippnd_<version>_x64_en-US.msi` or `Zippnd_<version>_x64-setup.exe` |
| Linux | `Zippnd_<version>_amd64.AppImage`, `Zippnd_<version>_amd64.deb`, or `Zippnd-<version>-1.x86_64.rpm` |
| Android (arm64) | `Zippnd_<version>_android-arm64.apk` |

## Updates

Zippnd updates itself. It checks this repository shortly after launch and shows the
update in the sidebar when there is one — download, install and restart are handled
for you. You can also check from *Settings → About → Updates*.

Every update is cryptographically signed, and Zippnd verifies that signature before
installing anything. An update that has been tampered with in transit is rejected.

In-app updating covers the macOS app, the Windows installers and the Linux `.AppImage`.
On Android, install a newer `.apk` over the old one: every APK is signed with the same
CyKrome key, so Android keeps your devices and history.
The `.deb` and `.rpm` packages are owned by your system package manager, so those
installs do not self-update — grab a newer package when you want to move up.

`latest.json` on each release is the update feed. It is metadata, not a download.

## First launch

Builds are not code-signed or notarised yet, so macOS and Windows will show an
"unidentified developer" / SmartScreen warning on first launch. (This is separate
from update signing above, which is always on.) The terminal installer avoids it on macOS.

- **macOS:** right-click the app → *Open* → *Open*. Allow *Local Network* access when
  asked — that is how Zippnd finds devices nearby.
- **Windows:** *More info* → *Run anyway*. Allow Zippnd through the firewall on private networks.
- **Linux (AppImage):** `chmod +x Zippnd_*.AppImage && ./Zippnd_*.AppImage`
- **Android:** open the `.apk`. The first time, Android asks to allow installing apps from
  your browser or file manager; allow it, then tap *Install*.

## Updating this page

The landing page is `index.html` (GitHub Pages, `main` / root). It reads the newest
release from the GitHub API; the version baked into the HTML is only the fallback.
After a release:

```bash
node scripts/update-version.mjs 0.2.0
```

Releases are published automatically by CI from the private source repository.
