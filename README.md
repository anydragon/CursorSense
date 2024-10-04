# CursorSense

CursorSense enhances your coding experience by providing instant information as you type. Get real-time hover details, definitions, and reference counts for multiple languages without manual hovering.

## Features

- **Auto-display of hover information**: See details about variables, functions, and more as you move your cursor.
- **Quick access to definitions**: Instantly view where a symbol is defined.
- **Reference counting**: Know how many times a symbol is used in your code.
- **Multi-language support**: Works with JavaScript, TypeScript, Python, C#, and more.
- **Customizable highlighting**: Choose how highlighted elements appear in your code.

## Requirements

- Visual Studio Code version 1.60.0 or higher

## Extension Settings

This extension contributes the following settings:

* `cursorSense.enable`: Enable/disable CursorSense.
* `cursorSense.delay`: Set the delay (in milliseconds) before showing information.
* `cursorSense.languages`: List of languages where CursorSense is active.
* `cursorSense.showDefinition`: Enable/disable showing definitions.
* `cursorSense.showReferences`: Enable/disable showing reference counts.
* `cursorSense.highlightStyle`: Set the style of highlighting (`"background"`, `"underline"`, or `"border"`).

## Usage

1. Open a file in a supported language.
2. Move your cursor over different parts of your code.
3. Information will automatically appear after the set delay.
4. Use the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and search for "CursorSense" to access additional commands.

## Known Issues

- May conflict with other extensions that modify hover behavior.
- Performance impact on very large files.

## Release Notes

### 1.0.0

Initial release of CursorSense

- Basic hover functionality
- Support for JavaScript, TypeScript, Python, and C#
- Customizable delay and highlighting

### 1.0.1

- Fixed issue with language detection
- Improved performance for large files

### 1.1.0

- Added reference counting feature
- Expanded language support

## Feedback and Contributions

- File bugs, feature requests in [GitHub Issues](https://github.com/yourusername/CursorSense/issues)
- Leave a review on the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=yourusername.cursorsense)

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy coding with CursorSense!**
