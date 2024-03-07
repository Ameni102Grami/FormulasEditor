CKEDITOR.plugins.add( 'FMath-Editor', {
    icons: 'FMath-Editor',
    init: function( editor ) {
		editor.addCommand( 'viewMathEditor', new CKEDITOR.dialogCommand( 'FMathEditorDialog' ) );

		editor.ui.addButton( 'FMath-Editor', {
		    label: 'FMath Equation Editor',
		    command: 'viewMathEditor',
		    toolbar: 'fmath'
		});
		
		CKEDITOR.dialog.add( 'FMathEditorDialog', this.path + 'dialogs/dialog.js' );
    }
});
