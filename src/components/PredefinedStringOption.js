import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import classNames from 'classnames';

import { Dropdown, DropdownOption } from './Dropdown';

export default class PredefinedStringOption extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addStar = () => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '⭐',
      editorState.getCurrentInlineStyle(),
    );
    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  };

  render() {
    return (
        <div className="rdw-block-wrapper" aria-label="rdw-block-control">
        <Dropdown
          className={classNames('rdw-block-dropdown')}
        //   optionWrapperClassName={classNames(dropdownClassName)}
        //   onChange={onChange}
        //   expanded={expanded}
        //   doExpand={doExpand}
        //   doCollapse={doCollapse}
        //   onExpandEvent={onExpandEvent}
        >
          <span>
            {`currentLabel`}
          </span>
          {//blocks.map((block, index) => (
            <DropdownOption
            //   active={blockType === block.label}
            //   value={block.label}
            //   key={index}
            >
              {'block.displayName'}
            </DropdownOption>
        //   ))
          }
        </Dropdown>
      </div>
    );
  }
}