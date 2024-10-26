import * as vscode from 'vscode';

interface CursorHoverConfiguration {
  enabled: boolean;
  delay: number;
  languages: string[];
}

export function activate(context: vscode.ExtensionContext) {
  let timeout: NodeJS.Timeout | undefined = undefined;
  let activeEditor = vscode.window.activeTextEditor;
  let config: CursorHoverConfiguration;

  function loadConfiguration(): void {
    const conf = vscode.workspace.getConfiguration('cursorHover');
    config = {
      enabled: conf.get('enabled', true),
      delay: conf.get('delay', 300),
      languages: conf.get('languages', [
        'aspnetcorerazor',
        'csharp',
        'dotnet',
        'go',
        'javascript',
        'json',
        'lua',
        'markdown',
        'php',
        'python',
        'rust',
        'typescript',
      ]),
    };
  }

  function updateHoverOnCursorMove() {
    if (!activeEditor || !config.enabled) {
      return;
    }

    const document = activeEditor.document;
    if (!config.languages.includes(document.languageId)) {
      return;
    }

    const position = activeEditor.selection.active;

    vscode.commands
      .executeCommand('editor.action.showHover', {
        position: position,
        range: new vscode.Range(position, position),
      })
      .then(
        () => {
          // 호버가 표시되면 상태 바를 업데이트합니다
          vscode.window.setStatusBarMessage('Hover information displayed', 2000);
        },
        (error) => {
          console.error('Failed to show hover:', error);
        }
      );
  }

  function triggerUpdateHoverOnCursorMove(immediate: boolean = false) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    if (immediate) {
      updateHoverOnCursorMove();
    } else {
      timeout = setTimeout(updateHoverOnCursorMove, config.delay);
    }
  }

  vscode.window.onDidChangeTextEditorSelection(
    (event) => {
      if (activeEditor && event.textEditor === activeEditor) {
        triggerUpdateHoverOnCursorMove();
      }
    },
    null,
    context.subscriptions
  );

  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      if (editor) {
        activeEditor = editor;
      }
    },
    null,
    context.subscriptions
  );

  vscode.workspace.onDidChangeConfiguration(
    (event) => {
      if (event.affectsConfiguration('cursorHover')) {
        loadConfiguration();
      }
    },
    null,
    context.subscriptions
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('cursorHover.toggle', () => {
      config.enabled = !config.enabled;
      vscode.workspace.getConfiguration('cursorHover').update('enabled', config.enabled, true);
      vscode.window.showInformationMessage(`Cursor Hover ${config.enabled ? 'enabled' : 'disabled'}`);
    })
  );

  loadConfiguration();
}

export function deactivate() {}
