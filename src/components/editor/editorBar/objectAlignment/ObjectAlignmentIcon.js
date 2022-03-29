import React, { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import userContext from '../../../../userContext/UserContext';
import './ObjectAlignment.css';

const ObjectAlignmentIcon = (props) => {
  const [state, dispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this

  return (
    <>
      <div
        className={props.iconDivClassName}
        onClick={props.onClick}
        id={props.id}
      >
        {props.icon}
        <h6
          className={state.isArabic ? 'alignmentText_Ar' : ''}
          onClick={props.onClick}
          id={props.id}
        >
          <FormattedMessage id={props.id} defaultMessage={props.iconName} />
        </h6>
      </div>
    </>
  );
};

export default ObjectAlignmentIcon;
