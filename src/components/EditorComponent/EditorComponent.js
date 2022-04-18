import React, { useState, useEffect, useCallback } from 'react';
import { EditorState, ContentState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import TemplateDropdown from '../TemplateDropdown/TemplateDropdown';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './EditorComponent.css'

const { ipcRenderer } = window.require('electron');

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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  let raw = convertToRaw(editorState.getCurrentContent())
  let value = draftToHtml(raw);

  const getStringBetween = (str, start, end) => {
    const result = str.split(start)[1].split(end)[0];
    return result;
  }
  const openFile = useCallback((_, html) => {
    const contentBlock = htmlToDraft(getStringBetween(html, '<body>', '</body>'));
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, []);

  const saveFile = useCallback(() => {
    ipcRenderer.send('save-file', value)
  }, [value]);

  useEffect(() => {
    ipcRenderer.on('save-file', saveFile);
    ipcRenderer.once('open-file', openFile);

    return () => {
      ipcRenderer.removeListener('save-file', saveFile);
      ipcRenderer.removeListener('open-file', openFile);
    };
  }, [saveFile, openFile]);

  return (
    <div className={'editor'}>
      <Editor
        toolbar={toolbar}
        editorState={editorState}
        wrapperClassName='wrapper-class'
        editorClassName='editor-class'
        toolbarClassName='toolbar-class'
        toolbarCustomButtons={[<TemplateDropdown/>]}
        onEditorStateChange={onEditorStateChange}
      />
      <textarea
        className={'html-area'}
        readOnly={true}
        value={value}
      />
    </div>
  );
}
