## Template Chrome Extension

[![CI](https://img.shields.io/github/actions/workflow/status/habedi/template-chrome-extension/lint_and_package.yml?branch=main)](https://github.com/habedi/template-chrome-extension/actions)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This repository is a template for creating a Google Chrome and Chromium extension.
It uses the [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/) format.
I'm sharing it here in case it's useful to someone.

---

### Getting Started

You can load this template in your browser to see it work.

1. **Get the Code**
    * Clone this repository or download it as a ZIP file.

2. **Load the Extension in Chrome**
    * Open the Google Chrome (or Chromium) browser.
    * Go to the extension page. You can type `chrome://extensions` in the address bar.
    * Enable Developer mode. (It's a toggle switch is in the top-right corner.)
    * Click the Load unpacked button.
    * In the file selection dialog, and choose the `src` folder from this project.

The extension icon will now appear in your Chrome toolbar.

---

### How to Customize

* Edit `src/manifest.json`: change the `name` and `description` to match your project.
* Change the icons: put your own `.png` files in the `src/icons/` folder.
* Build your popup: modify `src/popup/popup.html` and `src/popup/popup.js` to create your user interface.
* Add the logic: write your extension's background logic in `src/background.js`.

---

### License

This project is licensed under the MIT License (see [LICENSE](LICENSE)).
