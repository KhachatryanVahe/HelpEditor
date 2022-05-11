import React, {useState} from 'react';
import { EditorState, convertFromRaw} from 'draft-js';

const DefineButton = ({onChange, editorState}) => {
  const [open, setOpen] = useState(false);



  return (
    <div className='rdw-link-wrapper' aria-label='rdw-link-control'>
        <div
            className={`rdw-option-wrapper ${open? 'rdw-option-active ' : ''}`}
            aria-security={`${open}`}
            onClick={() => setOpen(!open)}
            title="Define string"
        >
            Define
        </div>
        {
        open?
        <div class="rdw-link-modal">
            <label class="rdw-link-modal-label" for="linkTitle">Define Title</label>
            <input id="linkTitle" class="rdw-link-modal-input" name="linkTitle" value=""/>
            <label class="rdw-link-modal-label" for="linkTarget">Define string</label>
            <input id="linkTarget" class="rdw-link-modal-input" name="linkTarget" value=""/>
            <span class="rdw-link-modal-buttonsection">
                <button class="rdw-link-modal-btn" disabled="">Add</button>
                <button class="rdw-link-modal-btn">Cancel</button>
            </span>
        </div>
        : ''
        }
    </div>
  );
};

export default DefineButton;

