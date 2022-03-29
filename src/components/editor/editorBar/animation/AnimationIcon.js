import React from 'react';
import { FormattedMessage } from 'react-intl';
import './Animation.css';

const AnimationIcon = (props) => {
  return (
    <>
      <div className="animationIconDivContainer" onClick={props.onClick}>
        <div className="animationIconDiv" id={props.id}>
          {props.icon}
        </div>
        <h6 className={props.isArabic ? 'arabicMode' : ''}>
          <FormattedMessage
            id={props.messageId}
            defaultMessage={props.iconName}
          />
        </h6>
      </div>
    </>
  );
};

export default AnimationIcon;
