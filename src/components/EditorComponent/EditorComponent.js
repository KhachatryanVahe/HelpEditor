import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./EditorComponent.css"

const { ipcRenderer } = window.require("electron");

const toolbar = {
  options: ['history', 'inline', 'blockType', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link'],
  inline: {
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
  },
  list: {
    options: ['unordered', 'ordered']
  },
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Verdana']
  }
}

export function EditorConvertToHTML (props) {
  const [state, setState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setState(editorState);
  };
  const value = draftToHtml(convertToRaw(state.getCurrentContent()))
  ipcRenderer.on('save-as', (event, data) => {
    console.log('data = ', data);
    if(data) {
      event.returnValue = value
    }
  })
  return (
    <div className={'editor'}>
      <Editor
        toolbar={toolbar}
        editorState={state}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        onEditorStateChange={onEditorStateChange}
      />
      <textarea
        className={'html-area'}
        // disabled
        value={value}//draftToHtml(convertToRaw(state.getCurrentContent()))}
      />
    </div>
  );
}
