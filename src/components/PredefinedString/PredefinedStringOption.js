import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, Modifier } from 'draft-js';
import classNames from 'classnames';

// import { Dropdown, DropdownOption } from './Dropdown';
import './PredefinedString.css'
import predefinedStrings from '../../predefinedStrings.json'
const templates = predefinedStrings.predefinedStrings;

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
    // const blocks = blockTypes.filter(
    //   ({ label }) => config.options.indexOf(label) > -1
    // );
    return (
      <div className="rdw-template-wrapper" aria-label="rdw-template-control">
        <select name="template" id="template">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>
    );
  }
}


        // <Dropdown
        //   className={classNames('rdw-block-dropdown')}
        // //   optionWrapperClassName={classNames(dropdownClassName)}
        //   onChange={this.addStar}
        // //   expanded={expanded}
        // //   doExpand={doExpand}
        // //   doCollapse={doCollapse}
        // //   onExpandEvent={onExpandEvent}
        // >
        //   <span>
        //     {`current`}
        //   </span>
        //   {templates.map((temp, index) => (
        //     <DropdownOption
        //       active={true}
        //       value={temp.label}
        //       key={index}
        //     >
        //       {temp.label}
        //     </DropdownOption>
        //   ))
        //   }
        // </Dropdown>