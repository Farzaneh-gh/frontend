import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./Editor.css";
export default function Editor({ value, setValue }) {
  return (
    <div className="my-editor">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          setValue(data);
        }}
      />
    </div>
  );
}
