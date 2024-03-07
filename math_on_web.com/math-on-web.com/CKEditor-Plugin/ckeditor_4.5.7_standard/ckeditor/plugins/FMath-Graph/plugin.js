CKEDITOR.plugins.add('FMath-Graph', {
    icons: 'FMath-Graph',
    init: function(editor) {
        editor.addCommand('viewMathGraph', new CKEDITOR.dialogCommand('FMathGraphDialog'));

        editor.ui.addButton('FMath-Graph', {
            label: 'FMath Graph Editor',
            command: 'viewMathGraph',
            toolbar: 'fmath'
        });


        CKEDITOR.dialog.add('FMathGraphDialog', this.path + 'dialogs/dialog.js');
    }
});