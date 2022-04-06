import React, {useState} from 'react';
import { EditorState, convertFromRaw} from 'draft-js';
import dropdownOption from "./DropdownOptions.json"
import './TemplateDropdown.css'

const TemplateDropdown = ({onChange, editorState}) => {
  const [open, setOpen] = useState(false);

  const addTemplate = (template) => {
    const contentState = convertFromRaw(template);
    console.log(contentState);
    // const st = ContentState.createFromBlockArray(blocks, blocks.entityMap)
    // const block = st.getBlockMap();
    // const contentState = Modifier.replaceWithFragment(
    //   editorState.getCurrentContent(),
    //   editorState.getSelection(),
    //   apendedContentState
    // );
    const result = EditorState.createWithContent(contentState)
    // const result = EditorState.push(editorState, contentState, 'insert-fragment');
    if (onChange) {
      onChange(result);
    }
  };

  const dropdownOptions = dropdownOption.dropdownOptions

  return (
    <div onClick={() => setOpen(!open)} className="rdw-block-wrapper" aria-label="rdw-block-control">
      <div className="rdw-dropdown-wrapper rdw-block-dropdown" aria-label="rdw-dropdown">
        <div className="rdw-dropdown-selectedtext">
          <span>Temlpates</span>
          <div className={`rdw-dropdown-caretto${open ? 'close' : 'open'}`} />
        </div>
        <ul className={`rdw-dropdown-optionwrapper ${open ? '' : 'template-ul'}`}>
          {dropdownOptions.map(item => (
            <li
              onClick={() => addTemplate(item.value)}
              key={item.key}
              className="rdw-dropdownoption-default template-li"
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TemplateDropdown;

