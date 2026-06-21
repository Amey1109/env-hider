# 🔒 Env Hider

An ultra-sleek, privacy-focused security tool for developers. **Env Hider** automatically masks your sensitive `.env` configurations with a smooth blur effect, keeping your API keys and credentials safe from accidental screen-sharing leaks, over-the-shoulder lookers, and presentation mishaps.

---

## 🚀 Features

* **Zero-Config Protection:** Automatically detects and blurs secrets the exact millisecond you open a `.env` file.
* **One-Click Toggle:** Control your workspace visibility with a dedicated native Eye button (`$(eye)`) embedded right into your editor title bar.
* **Performance First:** Built purely in lightweight JavaScript with native VS Code text decoration capabilities—no overhead, no memory leaks.

---

## 🛠️ How to Use It

1. Open any project containing a `.env` file.
2. Watch your secrets instantly blur out into stealth mode.
3. Need to read or edit a secret? Simply click the **Eye Icon** in the top-right corner of your editor title menu to reveal everything. Click it again to re-hide.



---

## ⚙️ Customization & Control

Env Hider registers a global command that you can bind to your favorite hotkeys or access instantly via the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`):

| Action | Command ID | Description |
| :--- | :--- | :--- |
| **Toggle Hide** | `blurry.toggleHide` | Instantly switches between blurring and revealing all secrets |

---

## 🔒 Privacy & Security First

* **100% Local:** Your environment values never leave your machine