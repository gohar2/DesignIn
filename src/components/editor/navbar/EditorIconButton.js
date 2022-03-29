import React from 'react';
import { Icon } from '@iconify/react';
import { FormattedMessage } from 'react-intl';

const EditorIconButton = (props) => {
  return (
    <>
      <div className={props.btnDiv}>
        <button className={props.btn} onClick={props.onClick}>
          <Icon className={props.iconClassName} icon={props.icon} />
          <FormattedMessage id={props.id} defaultMessage={props.buttonName} />
        </button>
      </div>
    </>
  );
};

export default EditorIconButton;
