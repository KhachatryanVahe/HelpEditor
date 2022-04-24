import React, { useState, useEffect, useCallback } from 'react';
import { EditorState, ContentState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import TemplateDropdown from '../TemplateDropdown/TemplateDropdown';
import dropdownOption from "../TemplateDropdown/DropdownOptions.json"
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

  const addTemplate = useCallback(() => {
    let optionsArray = dropdownOption.dropdownOptions;
    let lastOption = optionsArray[optionsArray.length - 1];
    let index = parseInt(lastOption.label.split(" ")[1]);
    let newOption = {
      "key": `template${index + 1}`,
      "label": `Template ${index + 1}`,
      "value": raw
    }
    dropdownOption.dropdownOptions.push(newOption);
    ipcRenderer.send('add-template', dropdownOption)
  }, [raw]);

  useEffect(() => {
    ipcRenderer.on('save-file', saveFile);
    ipcRenderer.once('open-file', openFile);
    ipcRenderer.on('add-template', addTemplate);

    return () => {
      ipcRenderer.removeListener('save-file', saveFile);
      ipcRenderer.removeListener('open-file', openFile);
      ipcRenderer.removeListener('add-template', addTemplate);
    };
  }, [saveFile, openFile, addTemplate]);

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
