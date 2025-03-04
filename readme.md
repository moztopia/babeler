# Babler - Chrome Extension for Locale Testing (Functional First Version)

This Chrome extension, "Locale Switcher", is designed to simplify locale testing for web developers, particularly those working with internationalized applications like Laravel projects.

**Functionality:**

- **Effortless Language Switching:** Quickly change the `Accept-Language` HTTP header sent by your browser to test how websites and web applications respond to different language preferences.
- **Favorite Languages Dropdown:** Provides a popup with a dropdown list of languages for easy selection.
- **Language Search:** Includes a search bar to filter the language list, making it easy to find specific languages, even in a long list.
- **Automatic Page Refresh:** When you select a new language, the current tab automatically refreshes to reflect the language change immediately.
- **Persistent Language Setting:** The last selected language is saved and will be active when you reopen your browser.
- **"Browser Default" Option:** Allows you to easily revert back to your browser's default language settings.
- **Comprehensive Language List:** Includes a wide range of languages (using ISO 639-2/639-1 codes for general language representation).

**Installation:**

1.  **Download or clone** the extension files to a local folder on your computer.
2.  **Open Google Chrome** and navigate to `chrome://extensions/`.
3.  **Enable "Developer mode"** in the top right corner of the Extensions page.
4.  Click the **"Load unpacked"** button and select the folder containing the extension files (where `manifest.json` is located).
5.  The "Locale Switcher" extension should now be installed and visible in your Chrome toolbar.

**Usage:**

1.  **Click the "Locale Switcher" icon** in your Chrome toolbar to open the popup.
2.  **Use the search bar** to find a language, or scroll through the dropdown list.
3.  **Select a language** from the dropdown. The current tab will automatically refresh and the website should now be displayed in the selected language (if the website supports it and respects the `Accept-Language` header).
4.  To revert to your browser's default language behavior, select **"Browser Default"** from the dropdown.

**Contributing and Feature Requests:**

This is a functional first version of the Locale Switcher extension. We are open to suggestions for improvements and new features!

If you have an idea for a new feature, find a bug, or have any feedback, please **open an issue** in this project's issue tracker. We will gladly review your suggestions and consider them for future updates.

Thank you for using Babler!
