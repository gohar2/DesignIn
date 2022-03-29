import React from 'react';
import './ResizePage.css';

const ResizePageInputField = (props) => {
  return (
    <div align="center">
      <input
        className="resizePageInput"
        type="number"
        placeholder="0"
        name={props.name}
        onChange={props.onChange}
      />
      {props.width === '' && props.height === '' ? (
        <label className="resizePageLabel">{props.labelName}</label>
      ) : null}
    </div>
  );
};

export default ResizePageInputField;
