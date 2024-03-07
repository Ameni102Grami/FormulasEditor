var dialogGraph = CKEDITOR.dialog.add( 'FMathGraphDialog', function( editor ) {
    return {
        title: 'FMath Graph Editor - www.fmath.info',
        minWidth: 1020,
        minHeight: 388,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        type: 'html',
                        html: '<iframe id="editorGIFrame_'+editor.element.$.id+'" style="width:1030px;height:510px" src="plugins/FMath-Graph/dialogs/redirect.php?editorId='+editor.element.$.id+'&lang=en"></iframe>'
                    }
                ]
            }
        ],
        onOk: function(event) {
            var dialog = this;
			
			var idEditor = editor.element.$.id;
			var elms = document.querySelectorAll("[id='editorGIFrame_" + idEditor + "']");
			console.log("MUST BE ALWAYS 1 ELEMENT -- > [id='editorGIFrame_" + idEditor + "'] : nb of elements: " + elms.length);
			
			var iframe = document.getElementById('editorGIFrame_' + idEditor); 
			mathml = null;
			img = null;
			currentEditor = editor;
			currentEditorId = idEditor;

			iframe.contentWindow.postMessage(idEditor + ":getDataGraph", "*");
			event.data.hide = false;

        },
        onShow: function(){
			var idEditor = editor.element.$.id;
			console.log('onshow');
			mathml = null;
			img = null;
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
		if( data.indexOf("PngGraph:")==0){
			img = data.substring(9);
			insertEquation();
		}
	}
});

function insertEquation(){
	if(img != null){
		var imgElem = currentEditor.document.createElement( 'img' );
		imgElem.setAttribute( "src", img);
		//imgElem.setAttribute( "alt",   "MathML (base64):" + mathml);
		currentEditor.insertElement( imgElem );		
		
		closeDialog();
	}
}

function closeDialog(){
	var button = CKEDITOR.dialog.getCurrent().getButton( 'cancel' );
    CKEDITOR.tools.setTimeout( button.click, 0, button );
}