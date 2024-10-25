import * as vscode from 'vscode';

interface CursorHoverConfiguration {
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

  async function updateHoverOnCursorMove() {
    if (!activeEditor) {
      return;
    }

    const document = activeEditor.document;
    if (!config.languages.includes(document.languageId)) {
      return;
    }

    const position = activeEditor.selection.active;

    // 현재 위치의 단어 범위를 가져옵니다
    const wordRange = activeEditor.document.getWordRangeAtPosition(position);
    if (!wordRange) {
      return; // 커서가 단어 위에 없으면 중단
    }

    try {
      // hover 제공자를 직접 호출
      const hovers = await vscode.commands.executeCommand<vscode.Hover[]>(
        'vscode.executeHoverProvider',
        document.uri,
        position
      );

      if (hovers && hovers.length > 0) {
        // hover 정보가 있을 때만 showHover 실행
        await vscode.commands.executeCommand('editor.action.showHover');
        vscode.window.setStatusBarMessage('Hover information displayed', 2000);
      }
    } catch (error) {
      console.error('Failed to show hover:', error);
    }
  }

  function triggerUpdateHoverOnCursorMove(immediate: boolean = false) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }

    if (immediate) {
      updateHoverOnCursorMove();
    } else {
      timeout = setTimeout(() => updateHoverOnCursorMove(), config.delay);
    }
  }

  // 커서 이동 이벤트 리스너
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection((event) => {
      if (activeEditor && event.textEditor === activeEditor) {
        triggerUpdateHoverOnCursorMove();
      }
    })
  );

  // 활성 에디터 변경 이벤트 리스너
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        activeEditor = editor;
      }
    })
  );

  // 설정 변경 이벤트 리스너
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration('cursorHover')) {
        loadConfiguration();
      }
    })
  );

  loadConfiguration();
}

export function deactivate() {}
