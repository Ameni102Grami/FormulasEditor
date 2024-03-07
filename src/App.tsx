// import React, { useState } from "react";
// import { CKEditor , } from "@ckeditor/ckeditor5-react";

// import ClassicEditor from "ckeditor5-mathtype-with-extra-plugins";


// import ReactHtmlParser from "react-html-parser";



// export default function App() {
//   const [ckData, setCkData] = useState("");
//   return (
//     <React.Fragment>
     
//       <CKEditor
//         editor={ClassicEditor}
//         config={{
//           fontSize : {
//             items: [
//               'tiny',
//               'small',
//               'normal',
//               'big',
//               'huge'
//             ]
//           },
//           toolbar: {
//             shouldNotGroupWhenFull: true,
//             items: [
//               "fontSize", "fontFamily", "defaultStretchy", "backgroundColor", "format",
//               'heading',
//               '|',
//               'bold',
//               'italic',
//               'underline',
//               'strikethrough',
//               'subscript',
//               'superscript',
//               '|',
//               'bulletedList',
//               'numberedList',
//               'todoList',
//               '|',
//               'alignment',
//               'outdent',
//               'indent',
//               "MathType",
//               "ChemType",
//               "emojis"
//           ]
//           },
       
//           fontFamily: {
//             options: [
//               "default",
//               "Arial, Helvetica, sans-serif",
//               "Courier New, Courier, monospace",
//               "Georgia, serif",
//               "Lucida Sans Unicode, Lucida Grande, sans-serif",
//               "Tahoma, Geneva, sans-serif",
//               "Times New Roman, Times, serif",
//               "Verdana, Geneva, sans-serif",
//             ],
//           },
//         }}
//         data={ckData}
//         onReady={(editor) => {
//           // You can store the "editor" and use when it is needed.
//           // console.log( 'Editor is ready to use!', editor );
//         }}
//         onChange={(event, editor) => {
//           const data = editor.getData();
//           // console.log({ event, editor, data });
//           setCkData(data);
//         }}
//       />
//       <div>{ReactHtmlParser(ckData)}</div>
//       <div>{ckData}</div>
//     </React.Fragment>
//   );
// }



import { useState } from "react";
//import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-mathtype-with-extra-plugins/";
import ReactHtmlParser from "react-html-parser";
import ckeditor from "ckeditor4-with-fmath"

import { CKEditor } from 'ckeditor4-react';
import * as edit from  "../math_on_web.com/math-on-web.com/CKEditor-Plugin/ckeditor_4.5.7_standard/ckeditor/ckeditor.js" 
function App() {
  const [data, setData] = useState("");
  const [addedData, showData] = useState(0);

  const handleChange = (_, editor:any) => {
    const data = editor.getData();
    console.log({data})
    setData(data);
  };

  return (
    <div className="App">
      <h2>
        <u>CKEditor5 with React</u>
      </h2>
      <div
        style={{ width: "700px", display: "inline-block", textAlign: "left",marginLeft:"100px" }}
      >
        <div
          style={{
            width: "700px",
            display: "inline-block",
            textAlign: "right",
            marginBottom: "5px",
          }}
        >
          <button
          
            onClick={() => showData(!addedData)}
          >
            {addedData ? "Hide Data" : "Show Data"}
          </button>
        </div>
        {/* <CKEditor
          editor={ClassicEditor}
          data={data}
          config={{   
          //   language: {
          //     textPartLanguage: [
          //         { title: 'Arabic', languageCode: 'ar' },
          //         { title: 'French', languageCode: 'fr' },
                  
          //         { title: 'Spanish', languageCode: 'es' }
          //     ]
          // },
          fontColor: {
            colors: [
                {
                    color: 'hsl(0, 75%, 60%)',
                    label: 'Red'
                },
                {
                    color: 'hsl(30, 75%, 60%)',
                    label: 'Orange'
                },
                {
                    color: 'hsl(60, 75%, 60%)',
                    label: 'Yellow'
                },
                {
                    color: 'hsl(90, 75%, 60%)',
                    label: 'Light green'
                },
                {
                    color: 'hsl(120, 75%, 60%)',
                    label: 'Green'
                },
                
            ]
        },
          fontBackgroundColor: {
            colors: [
                {
                    color: 'hsl(0, 75%, 60%)',
                    label: 'Red'
                },
                {
                    color: 'hsl(30, 75%, 60%)',
                    label: 'Orange'
                },
                {
                    color: 'hsl(60, 75%, 60%)',
                    label: 'Yellow'
                },
                {
                    color: 'hsl(90, 75%, 60%)',
                    label: 'Light green'
                },
                {
                    color: 'hsl(120, 75%, 60%)',
                    label: 'Green'
                },
                
            ]
        },
          image: {
            resizeOptions: [
            {
                name: 'resizeImage:original',
                value: null,
                icon: 'original'
            },
            {
                name: 'resizeImage:50',
                value: '50',
                icon: 'medium'
            },
            {
                name: 'resizeImage:75',
                value: '75',
                icon: 'large'
            }
        ],
        toolbar: [
            'resizeImage:50',
            'resizeImage:75',
            'resizeImage:original',
           
        ] },
            toolbar: {
              items: [
                "|",
                "emoji",
                "direction",
                "fontColor",'fontBackgroundColor',
                "fontFamily",
                "fontSize",
                "highlight",
                "alignment",
                "MathType",
                "ChemType",
                "link",
                "bold",
                "redo",
                "undo",
                "underline",
                "italic",
                "heading",
                "blockQuote",
                "mediaEmbed",
                "insertTable",
                "imageUpload",
                "numberedList",
                "bulletedList",
                "resizeImage"
              ],
            },
          }}
          onChange={handleChange}
        /> */}
        <div >
     
        <CKEditor
       id="editor"
   // editorUrl={"https://math-on-web.com/CKEditor-Plugin/ckeditor_4.5.7_standard/ckeditor/ckeditor.js"}
   editorUrl={  edit  }
//          config={{
//           toolbar: [
//             { name: "tools", items: ["Maximize"] },
//             { name: 'fmath'},
//             {
//               name: "clipboard",
//               items: ["Cut", "Copy", "Paste", "PasteText", "-", "Undo", "Redo"]
//             },
//             { name: "links", items: ["Link", "Unlink"] },
//             { name: "document", items: ["Source"] },
//             "/",
//             {
//               name: "basicstyles",
//               items: [
//                 "Bold",
//                 "Italic",
//                 "Underline",
//                 "Strike",
//                 "-",
//                 "Subscript",
//                 "Superscript"
//               ]
//             },
//             {
//               name: "paragraph",
//               items: [
//                 "NumberedList",
//                 "BulletedList",
//                 "-",
//                 "Outdent",
//                 "Indent",
//                 "Blockquote"
//               ]
//             },
//             {
//               name: "align",
//               items: [
//                 "AlignLeft",
//                 "JustifyLeft",
//                 "JustifyCenter",
//                 "JustifyRight",
//                 "JustifyBlock"
//               ]
//             },
//             "/",
//             { name: "styles", items: ["Format", "-", "Font", "-", "FontSize"] },
//             { name: "colors", items: ["TextColor", "BGColor"] },
//             { name: "insert", items: ["Image", "Table", "HorizontalRule"] },
//             "/"
//           ],
//       	// Remove some buttons provided by the standard plugins, which are
// 	// not needed in the Standard(s) toolbar.
// removeButtons :'Underline,Subscript,Superscript',

// 	// Set the most common block elements.
// 	format_tags : 'p;h1;h2;h3;pre',

// 	// Simplify the dialog windows.
// removeDialogTabs : 'image:advanced;link:advanced',


//         }}  
        
         initData="<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>"  
         //  editorUrl="https://ck4-script.netlify.app/script.js"
          
          />

</div>
        <div>{addedData ? ReactHtmlParser(data) : ""}</div>
      </div>
    </div>
  );
}

export default App;
