import React, { useContext } from 'react';
import './Navbar.css';
// import img from './../../icons/SocialFBL.svg'
import { ReactComponent as Arrowicon } from './../../icons/ArrowIcon.svg';
import { useHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import UserContext from '../../userContext/UserContext';

const Gettarted = (props) => {
  const [userState, userDispatch] = useContext(UserContext);

  let history = useHistory();
  const redirect = (event) => {
    history.push('/editor');
  };
  return (
    <>
      <button className="getStarted position-relative" onClick={redirect}>
        <span
          className={userState.isArabic ? 'txtGetStarted_Ar' : 'txtGetStarted'}
        >
          <FormattedMessage id="getstarted" defaultMessage="Get Started" />
        </span>

        <span className="">
          <Arrowicon
            className={userState.isArabic ? 'iconArrow_Ar' : 'iconArrow'}
          />
        </span>
      </button>
    </>
  );
};

export default Gettarted;
