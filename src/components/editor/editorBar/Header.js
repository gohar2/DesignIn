import React, { useContext } from 'react';
// import { ReactComponent as CrossCircle } from '../../../icons/CrossCircle.svg'; Shaheer code-refactoring-removing-unused-variables
import { FormattedMessage } from 'react-intl';
import userContext from '../../../userContext/UserContext';
import './Header.css';

const Header = (props) => {
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this

  return (
    <>
      <div className="textBarHeadingDiv">
        <h5
          className={
            userState.isArabic
              ? 'AlignmentHeading arabicMode'
              : 'AlignmentHeading'
          }
        >
          <FormattedMessage id={props.id} defaultMessage={props.heading} />
        </h5>
      </div>
    </>
  );
};

export default Header;
