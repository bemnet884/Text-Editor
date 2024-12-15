'use client';

import dynamic from 'next/dynamic';

// Dynamically import the Froala editor, disabling SSR
const FroalaEditor = dynamic(() => import('react-froala-wysiwyg'), {
  ssr: false,
});


import { useState, useEffect } from "react";
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Froala Plugins
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/char_counter.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/draggable.min.js';
import 'froala-editor/js/plugins/emoticons.min.js';
import 'froala-editor/js/plugins/entities.min.js';
import 'froala-editor/js/plugins/file.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/fullscreen.min.js';
import 'froala-editor/js/plugins/help.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/image_manager.min.js';
import 'froala-editor/js/plugins/inline_class.min.js';
import 'froala-editor/js/plugins/inline_style.min.js';
import 'froala-editor/js/plugins/line_breaker.min.js';
import 'froala-editor/js/plugins/line_height.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/lists.min.js';
import 'froala-editor/js/plugins/paragraph_format.min.js';
import 'froala-editor/js/plugins/paragraph_style.min.js';
import 'froala-editor/js/plugins/print.min.js';
import 'froala-editor/js/plugins/quote.min.js';
import 'froala-editor/js/plugins/save.min.js';
import 'froala-editor/js/plugins/special_characters.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/url.min.js';
import 'froala-editor/js/plugins/word_paste.min.js';

// External Libraries
import html2pdf from 'html2pdf.js';

export default function FroalaComponent() {
  const [model, setModel] = useState("");

  // Load saved content from localStorage on component mount
  useEffect(() => {
    const savedHtml = localStorage.getItem("savedHtml") || "";
    setModel(savedHtml);
  }, []);

  // Handle file upload to edit
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setModel(e.target.result.toString());
      }
    };
    reader.readAsText(file); // Read file as plain text or HTML
  };

  // Export content as PDF
  const handleDownloadPDF = () => {
    const element = document.createElement("div");
    element.innerHTML = model; // Load the content of the editor into a temporary div
    html2pdf().from(element).save("editor-content.pdf");
  };

  // Clear the editor and localStorage
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete the content? This action cannot be undone.")) {
      setModel(""); // Clear the state
      localStorage.removeItem("savedHtml"); // Clear localStorage
    }
  };

  return (
    <div className="m-10 bg-gray-50 shadow-lg p-6 rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">🚀 Advanced Rich Text Editor</h1>

      {/* Froala Editor */}
      <FroalaEditor
        model={model}
        onModelChange={(newModel: string) => setModel(newModel)}
        config={{
          placeholderText: "Start writing your amazing content here...",
          charCounterCount: true,
          saveInterval: 2000,
          toolbarSticky: true,
          pluginsEnabled: [
            'align', 'charCounter', 'codeView', 'colors', 'draggable',
            'emoticons', 'entities', 'file', 'fontFamily', 'fontSize',
            'fullscreen', 'help', 'image', 'imageManager', 'inlineClass',
            'inlineStyle', 'lineBreaker', 'lineHeight', 'link', 'lists',
            'paragraphFormat', 'paragraphStyle', 'print', 'quote', 'save',
            'specialCharacters', 'table', 'url', 'wordPaste',
          ],
          events: {
            'save.before': function (html: string) {
              localStorage.setItem("savedHtml", html);
            },
          },
        }}
      />

      {/* Buttons */}
      <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
        >
          Delete Content
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Download as PDF
        </button>
        <label className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 cursor-pointer">
          Upload File
          <input
            type="file"
            accept=".txt,.html"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Preview Section */}
      <h2 className="text-xl font-semibold mt-6 text-gray-700">Preview:</h2>
      <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg">
        <FroalaEditorView model={model} />
      </div>
    </div>
  );
}
