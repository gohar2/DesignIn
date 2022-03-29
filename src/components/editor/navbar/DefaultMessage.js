import React, { useContext, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import UserContext from '../../../userContext/UserContext';
import Context from '../../store/store';
import './DefaultMessage.css';

const DefaultMessage = (props) => {
  const [userState, userDispatch] = useContext(UserContext);
  const [state, dispatch] = useContext(Context);

  const HandleRedirect = () => {
    let url = window.location.pathname;
    localStorage.setItem('redirectUrl', url);
    localStorage.setItem('selectedPage', JSON.stringify(state.selectedPage));
    localStorage.setItem('pages', JSON.stringify(state.pages));
    localStorage.removeItem('userData');
    dispatch({ type: 'SET_LOGIN_POPUP', payload: true });
  };
  return (
    <>
      <div
        className={
          userState.isArabic ? 'defaultMessageTxt_Ar' : 'defaultMessageTxt'
        }
      >
        <FormattedMessage
          id="saveYourDesign"
          defaultMessage="To save your design, please"
        />

        <button className="btnDefaultMsgLoginSignup" onClick={HandleRedirect}>
          <b>
            <FormattedMessage id="signUpTxt" defaultMessage="Sign Up" />
          </b>
        </button>
        <FormattedMessage id="or" defaultMessage="or" />
        <button className="btnDefaultMsgLoginSignup" onClick={HandleRedirect}>
          <b>
            <FormattedMessage id="loginTxt" defaultMessage="Log In" />
          </b>
        </button>
      </div>
    </>
  );
};

export default DefaultMessage;
