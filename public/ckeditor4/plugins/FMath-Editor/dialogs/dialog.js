var dialog = CKEDITOR.dialog.add("FMathEditorDialog", function (editor) {
    return {
        title: "FMath Editor",
        minWidth: 1020,
        minHeight: 388,
        contents: [
            {
                id: "tab-basic",
                label: "Basic Settings",
                elements: [
                    {
                        type: "html",
                        html: '<iframe id="editorIFrame" style="width:1030px;height:384px" src="./../../../../../../../../editor/onlyEditorV2.html"></iframe>',
                    },
                ],
            },
        ],
        onOk: function () {
            var dialog = this;

            var mathml = document
                .getElementById("editorIFrame")
                .contentWindow.getMathML();
            document
                .getElementById("editorIFrame")
                .contentWindow.getBlobOrUrl(function (result) {
                    if (result.indexOf("ERROR:") == 0) {
                        alert(result);
                    } else {
                        var img = result;
                        var selection = editor.getSelection();
                        if (selection.getType() == CKEDITOR.SELECTION_ELEMENT) {
                            var selElem = selection.getSelectedElement();
                            if (selElem.getName() == "img") {
                                selElem.data("cke-saved-src", img);
                                selElem.setAttribute("src", img);
                                selElem.setAttribute(
                                    "alt",
                                    "MathML (base64):" + window.btoa(mathml),
                                );
                                return;
                            }
                        }

                        var imgElem = editor.document.createElement("img");
                        imgElem.setAttribute("src", img);
                        imgElem.setAttribute(
                            "alt",
                            "MathML (base64):" + window.btoa(mathml),
                        );
                        editor.insertElement(imgElem);
                    }
                });
        },
        onShow: function () {
            var idEditor = editor.id;
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
