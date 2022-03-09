import React, { useState, useEffect, useCallback } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PredefinedStringOption from '../PredefinedString/PredefinedStringOption';
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
  const [state, setState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setState(editorState);
  };
  let value = draftToHtml(convertToRaw(state.getCurrentContent()));

  const getStringBetween = (str, start, end) => {
    const result = str.split('<body>')[1].split('</body>')[0];
    return result;
  }
  const openFile = useCallback((_, html) => {
    const contentBlock = htmlToDraft(getStringBetween(html, '<body>', '</body>'));
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      console.log('contentBlock = ', contentBlock);
      const editorState = EditorState.createWithContent(contentState);
      setState(editorState);
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
        editorState={state}
        wrapperClassName='wrapper-class'
        editorClassName='editor-class'
        toolbarClassName='toolbar-class'
        toolbarCustomButtons={[<PredefinedStringOption/>]}
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
