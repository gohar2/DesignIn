import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import LoginForm from '../../authentication/login/Login';
import ResetPassword from '../../authentication/reset-password/ResetPassword';
import SignUpForm from '../../authentication/signup/Signup';

import Context from '../../store/store';
import './LoginPopup.css';
const LoginPopup = (props) => {
  const [state, dispatch] = useContext(Context);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isSignUpForm, setIsSignUpForm] = useState(false);

  const handleClose = () => {
    dispatch({ type: 'SET_LOGIN_POPUP', payload: false });
  };
  const handleForgotPasswordClick = () => {
    setIsForgotPassword(!isForgotPassword);
  };
  const handleSignUpForm = () => {
    setIsSignUpForm(!isSignUpForm);
  };
  return (
    <>
      <Modal show={props.showModal} onHide={handleClose}>
        {/* <Modal.Header> */}
        {/* </Modal.Header> */}
        <Modal.Body>
          <div className="customClass">
            {isForgotPassword ? (
              <ResetPassword
                isLoginPopup={true}
                handleForgotPasswordClick={handleForgotPasswordClick}
                handleClose={handleClose}
              />
            ) : !isSignUpForm ? (
              <LoginForm
                isLoginPopup={true}
                handleForgotPasswordClick={handleForgotPasswordClick}
                handleSignUpForm={handleSignUpForm}
              />
            ) : (
              <SignUpForm
                isLoginPopup={true}
                handleSignUpForm={handleSignUpForm}
                handleClose={handleClose}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginPopup;
