const vscode = require('vscode');

// Create the blur effect style
const secretDecorationType = vscode.window.createTextEditorDecorationType({
    textDecoration: 'none; filter: blur(5px); select: none;',
    opacity: '0.3'
});

// It is ON initially
let isHidingEnabled = true;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    
    // Command to toggle the hiding feature
    let toggleCommand = vscode.commands.registerCommand('blurry.toggleHide', () => {
        isHidingEnabled = !isHidingEnabled;
        
        // Update the button icon dynamically based on state
        // (Optional: standard buttons stay static, but this toggles the blur view)
        updateDecorations(vscode.window.activeTextEditor);
    });
    context.subscriptions.push(toggleCommand);

    // Listen for when the user switches to a different file
    vscode.window.onDidChangeActiveTextEditor(editor => {
        updateDecorations(editor);
    }, null, context.subscriptions);

    // Listen for text edits 
    vscode.workspace.onDidChangeTextDocument(event => {
        if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
            updateDecorations(vscode.window.activeTextEditor);
        }
    }, null, context.subscriptions);

    // Run immediately on startup
    if (vscode.window.activeTextEditor) {
        updateDecorations(vscode.window.activeTextEditor);
    }
}

/**
 * @param {vscode.TextEditor | undefined} editor
 */
function updateDecorations(editor) {
    if (!editor) return;

    // Strict safety: Only manage decorations on .env language types
    const langId = editor.document.languageId;
    if (langId !== 'properties' && langId !== 'dotenv') {
        return;
    }

    // If hiding is toggled OFF, clear all blurs instantly
    if (!isHidingEnabled) {
        editor.setDecorations(secretDecorationType, []);
        return;
    }

    const text = editor.document.getText();
    const decorations = [];
    const regEx = /=(.*)/g; 
    let match;

    while ((match = regEx.exec(text))) {
        const secretText = match[1].trim();
        if (secretText.length === 0) continue;

        const startPos = editor.document.positionAt(match.index + 1); // +1 skips the '='
        const endPos = editor.document.positionAt(match.index + 1 + match[1].length);
        
        const decoration = { 
            range: new vscode.Range(startPos, endPos), 
            hoverMessage: '🔒 Secret hidden (Click the Eye icon in top right to reveal)' 
        };
        decorations.push(decoration);
    }

    // Apply the decorations
    editor.setDecorations(secretDecorationType, decorations);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};