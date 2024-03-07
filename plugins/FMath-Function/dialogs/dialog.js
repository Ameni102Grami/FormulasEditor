var dialogFunction = CKEDITOR.dialog.add( 'FMathFunctionDialog', function( editor ) {
    return {
        title: 'FMath Function Editor - www.fmath.info',
        minWidth: 1020,
        minHeight: 388,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'html',
                        html: '<iframe id="editorFIFrame_'+editor.element.$.id+'" style="width:1030px;height:384px" src="plugins/FMath-Function/dialogs/redirect.php?editorId='+editor.element.$.id+'&lang=en"></iframe>'
                    }
                ]
            }
        ],
        onOk: function(event) {
            var dialog = this;
			
			var idEditor = editor.element.$.id;
			var elms = document.querySelectorAll("[id='editorFIFrame_" + idEditor + "']");
			console.log("MUST BE ALWAYS 1 ELEMENT -- > [id='editorFIFrame_" + idEditor + "'] : nb of elements: " + elms.length);
			
			var iframe = document.getElementById('editorFIFrame_' + idEditor); 
			mathml = null;
			img = null;
			currentEditor = editor;
			currentEditorId = idEditor;

			iframe.contentWindow.postMessage(idEditor + ":getDataFunction", "*");
			event.data.hide = false;

        },
        onShow: function(){
			var idEditor = editor.element.$.id;
			console.log('onshow');
			mathml = null;
			img = null;
			
			var selection = editor.getSelection();
			if (selection.getType() == CKEDITOR.SELECTION_ELEMENT) {
				//var selectedContent = selection.getSelectedElement().$.outerHTML;
				var selElem = selection.getSelectedElement();
				if(selElem.getName() =='img'){
					var mathmlEnc = selElem.getAttribute("alt");
					if(mathmlEnc!=null && mathmlEnc.indexOf("MathML (base64):") == 0){
						mathmlEnc = mathmlEnc.substring(16, mathmlEnc.length);
						var iframe = document.getElementById('editorFIFrame_' + idEditor); 
						iframe.contentWindow.postMessage(idEditor + ":setMathMLFunction:" + mathmlEnc, "*");
					}
				}

			}
		}
    };
});

var mathml = null;
var img = null;
var currentEditor = null;
var currentEditorId = null;

window.addEventListener("message", (event) => {
	var data = event.data;
	if(data != null){
		if(data.indexOf(currentEditorId + ":") == 0){
			data = data.substring(currentEditorId.length + 1);
		}else{
			return;
		}
		if(data.indexOf("MathmlFunction:")==0){
			mathml = data.substring(15);
		}else if( data.indexOf("PngFunction:")==0){
			img = data.substring(12);
		}
		insertEquation();
	}
});

function insertEquation(){
	if(mathml != null && img != null){
		var selection = currentEditor.getSelection();
		if (selection.getType() == CKEDITOR.SELECTION_ELEMENT) {
			var selElem = selection.getSelectedElement();
			if(selElem.getName() == 'img'){
				selElem.data( 'cke-saved-src', img );
				selElem.setAttribute( "src", img);
				selElem.setAttribute( "alt",  "MathML (base64):" + mathml);
				
				closeDialog();
				return;
			}
		}

		var imgElem = currentEditor.document.createElement( 'img' );
		imgElem.setAttribute( "src", img);
		imgElem.setAttribute( "alt",   "MathML (base64):" + mathml);
		currentEditor.insertElement( imgElem );		
		
		closeDialog();
	}
}

function closeDialog(){
	var button = CKEDITOR.dialog.getCurrent().getButton( 'cancel' );
    CKEDITOR.tools.setTimeout( button.click, 0, button );
}