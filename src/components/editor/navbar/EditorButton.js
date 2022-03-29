import React from 'react';
import { FormattedMessage } from 'react-intl';

const EditorButton = (props) => {
  return (
    <>
      <div className={props.divClassName}>
        <button className={props.buttonClassName} onClick={props.onClick}>
          <FormattedMessage id={props.id} defaultMessage={props.buttonName} />
        </button>
      </div>
    </>
  );
};

export default EditorButton;
