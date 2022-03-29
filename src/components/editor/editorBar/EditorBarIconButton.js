import React from 'react';
import { Icon } from '@iconify/react';
import { FormattedMessage } from 'react-intl';

const EditorBarIconButton = (props) => {
  return (
    <>
      <div className={props.btnDiv}>
        <button className={props.btn} onClick={props.onClick}>
          <FormattedMessage id={props.id} defaultMessage={props.btnName} />
          <Icon className={props.iconClassName} icon={props.icon} />
        </button>
      </div>
    </>
  );
};

export default EditorBarIconButton;
