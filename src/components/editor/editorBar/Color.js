import React from 'react';
import './EditorBar.css';

const Color = (props) => {
  return (
    <>
      <div
        style={{ backgroundColor: props.color }}
        className="editorBarColor"
      ></div>
    </>
  );
};

export default Color;
