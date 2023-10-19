const codeTextarea = document.getElementById('code');
const copyButton = document.querySelector('.code-copy');
const lockButton = document.querySelector('.code-lock');
const indentButton = document.querySelector('.code-indent');
const executeButton = document.querySelector('.code-execute');
const saveButton = document.querySelector('.code-save');

let isLocked = false;

// Initialize CodeMirror editor
const editor = CodeMirror.fromTextArea(codeTextarea, {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'dracula', // You can choose a different theme
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 4,
    toggleComment:true,
    smartIndent:true,
});

// Toggle code editor lock/unlock
lockButton.addEventListener('click', () => {
    isLocked = !isLocked;
    editor.setOption('readOnly', isLocked);
    lockButton.textContent = isLocked ? 'Unlock' : 'Lock';
});

// Copy code to clipboard
copyButton.addEventListener('click', () => {
    const code = editor.getValue();
    navigator.clipboard.writeText(code)
        .then(() => alert('Code copied to clipboard'))
        .catch(error => console.error('Copy failed', error));
});

// Execute code
executeButton.addEventListener('click', () => {
    const code = editor.getValue();
    try {
        eval(code);
    } catch (error) {
        console.error(error);
    }
});

// Save functionality is implemented to save the code to a local storage
saveButton.addEventListener('click', () => {
    // Implement save functionality here
    const code = editor.getValue();
    localStorage.setItem('savedCode', code);
    alert('Code saved to local storage.');
});
// Load saved code from local storage
function loadSavedCode() {
    const savedCode = localStorage.getItem('savedCode');
    if (savedCode) {
        editor.setValue(savedCode);
    }
}

loadSavedCode(); // Load saved code when the page loads