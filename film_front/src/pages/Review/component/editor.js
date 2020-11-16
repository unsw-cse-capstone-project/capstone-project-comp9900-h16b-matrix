import React, { useState, useEffect } from "react";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";

export default function BraftEditorDemo(props) {
  const { content, handleContent } = props;

  const [value, setValue] = useState({
    content: content,
  });
  console.log(content, value);
  useEffect(() => {
    setValue({ ...value, content: content });
    console.log(content, value);
  }, [content]);
  const [state1, setEditorState] = useState({
    editorState: BraftEditor.createEditorState(null),
  });
  const getContent = async () => {
    console.log("content", value.content);
    const htmlContent = value.content;
    setEditorState({
      editorState: BraftEditor.createEditorState(htmlContent),
    });
  };

  useEffect(() => {
    getContent();
  }, [value.content]);
  const submitContent = async () => {
    console.log("editorState", state1.editorState);

    const htmlContent = state1.editorState.toHTML();
    if (handleContent) {
      handleContent(htmlContent);
    }

    console.log("htmlContent=", htmlContent);
  };

  const handleEditorChange = (editorState1) => {
    console.log(editorState1);
    setEditorState({ editorState: editorState1 });
  };

  return (
    <div className="my-component">
      <BraftEditor
        value={state1.editorState}
        onChange={handleEditorChange}
        onBlur={submitContent}
        language="en"
      />
    </div>
  );
}
