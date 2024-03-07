var dialog = CKEDITOR.dialog.add("FMathEditorDialog", function (editor) {
	return {
		title: "FMath Editor - www.fmath.info",
		minWidth: 1020,
		minHeight: 388,
		contents: [
			{
				id: "tab-basic",
				label: "Basic Settings",
				elements: [
					{
						type: "html",
						html:
							'<iframe id="editorIFrame_' +
							editor.element.$.id +
							'" style="width:1030px;height:384px" src="plugins/FMathEditor/dialogs/redirect.php?editorId=' +
							"editor" +
							'&lang=en"></iframe>',
					},
				],
			},
		],
		onOk: function (event) {
			var dialog = this;

			var idEditor = editor.element.$.id;
			var elms = document.querySelectorAll(
				"[id='editorIFrame_" + idEditor + "']",
			);
			console.log(
				"MUST BE ALWAYS 1 ELEMENT -- > [id='editorIFrame_" +
					idEditor +
					"'] : nb of elements: " +
					elms.length,
			);

			mathml = null;
			img = null;

			var iframe = document.getElementById("editorIFrame_" + idEditor);
			iframe.contentWindow.postMessage(idEditor + ":getDataEditor", "*");
			event.data.hide = false;
		},
		onShow: function () {
			var idEditor = editor.element.$.id;
			console.log("onshow");
			mathml = null;
			img = null;

			currentEditor = editor;
			currentEditorId = idEditor;

			var selection = editor.getSelection();
			if (selection.getType() == CKEDITOR.SELECTION_ELEMENT) {
				//var selectedContent = selection.getSelectedElement().$.outerHTML;
				var selElem = selection.getSelectedElement();
				if (selElem.getName() == "img") {
					var mathmlEnc = selElem.getAttribute("alt");
					if (
						mathmlEnc != null &&
						mathmlEnc.indexOf("MathML (base64):") == 0
					) {
						mathmlEnc = mathmlEnc.substring(16, mathmlEnc.length);
						if (firstMathMLToSet == null) {
							firstMathMLToSet = mathmlEnc;
						} else {
							var iframe = document.getElementById(
								"editorIFrame_" + idEditor,
							);
							iframe.contentWindow.postMessage(
								idEditor + ":setMathMLEditor:" + mathmlEnc,
								"*",
							);
						}
					}
				}
			}
		},
	};
});

var mathml = null;
var img = null;
var currentEditor = null;
var currentEditorId = null;
var firstMathMLToSet = null;

window.addEventListener("message", (event) => {
	var data = event.data;

	if (data != null) {
		if (data.indexOf(currentEditorId + ":") == 0) {
			data = data.substring(currentEditorId.length + 1);
		} else {
			return;
		}
		if (data.indexOf("Initialization:") == 0) {
			if (firstMathMLToSet != null) {
				var iframe = document.getElementById(
					"editorIFrame_" + currentEditorId,
				);
				iframe.contentWindow.postMessage(
					currentEditorId + ":setMathMLEditor:" + firstMathMLToSet,
					"*",
				);
			}
		} else {
			if (data.indexOf("MathmlEditor:") == 0) {
				mathml = data.substring(13);
			} else if (data.indexOf("PngEditor:") == 0) {
				img = data.substring(10);
			}
			insertEquation();
		}
	}
});

function insertEquation() {
	if (mathml != null && img != null) {
		var selection = currentEditor.getSelection();
		if (selection.getType() == CKEDITOR.SELECTION_ELEMENT) {
			var selElem = selection.getSelectedElement();
			if (selElem.getName() == "img") {
				selElem.data("cke-saved-src", img);
				selElem.setAttribute("src", img);
				selElem.setAttribute("alt", "MathML (base64):" + mathml);

				closeDialog();
				return;
			}
		}

		var imgElem = currentEditor.document.createElement("img");
		imgElem.setAttribute("src", img);
		imgElem.setAttribute("alt", "MathML (base64):" + mathml);
		currentEditor.insertElement(imgElem);

		closeDialog();
	}
}

function closeDialog() {
	var button = CKEDITOR.dialog.getCurrent().getButton("cancel");
	CKEDITOR.tools.setTimeout(button.click, 0, button);
}
