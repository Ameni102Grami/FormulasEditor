CKEDITOR.plugins.add('FMath-Function', {
    icons: 'FMath-Function',
    init: function(editor) {
        editor.addCommand('viewMathFunction', new CKEDITOR.dialogCommand('FMathFunctionDialog'));

        editor.ui.addButton('FMath-Function', {
            label: 'Math Function Editor',
            command: 'viewMathFunction',
            toolbar: 'fmath'
        });

        CKEDITOR.dialog.add('FMathFunctionDialog', this.path + 'dialogs/dialog.js');
    }
});