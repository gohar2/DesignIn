import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import API from '../../../api/Api';
import { passwordResetUrl } from '../../../api/constants';
import { validEmail } from '../../../constants/index';
import UserContext from '../../../userContext/UserContext';
import LoginNavbar from '../../LandingPageNew/LoginNavbar';
import ButtonAuth from '../ButtonAuth';
import InputField from './../login/InputField';
import './../login/Login.css';

const ResetPassword = (props) => {
  const [loading, setloading] = useState(false);
  const [userState] = useContext(UserContext);

  const [state, setState] = React.useState({
    email: '',
    errors: {
      email: '',
    },
  });
  const [response, setResponse] = useState({ response: false, success: false });
  const setInputFields = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
    validate(evt.target.name, evt.target.value);
  };
  const validate = (name, value) => {
    switch (name) {
      case 'email':
        state.errors.email =
          value === '' ? (
            <FormattedMessage
              id="EmailFieldRequired"
              defaultMessage="Email field is required."
            />
          ) : validEmail.test(value) ? (
            ''
          ) : (
            <FormattedMessage
              id="EmailNValid"
              defaultMessage="Email is not valid."
            />
          );
        break;
      default:
        break;
    }
  };
  const submit = () => {
    let email;
    if (state.email === '') {
      email = (
        <FormattedMessage
          id="EmailFieldRequired"
          defaultMessage="Email field is required."
        />
      );
      setState({
        ...state,
        errors: {
          email: email,
        },
      });
    }
  };

  return (
    <>
      <div className="AuthenticationBg">
        <div className="position-absolute w-100">
          <LoginNavbar isLoginPopup={props.isLoginPopup} />
        </div>
        <div
          className={userState.isArabic ? 'd-flex flex-row-reverse' : 'd-flex'}
        >
          <div className="flex1 leftBg"></div>
          <div className="flex18 d-flex flex-column height100vh justify-content-center">
            <div className="row ">
              <div className="col-md-9 mx-auto">
                <div className="row mx-5 mx-md-0">
                  <div
                    className={
                      userState.isArabic
                        ? 'col-md-8 mx-auto p-0 text-right'
                        : 'col-md-8 mx-auto p-0'
                    }
                  >
                    <h3
                      className={
                        userState.isArabic ? 'loginHeading_Ar' : 'loginHeading'
                      }
                    >
                      <FormattedMessage
                        id="resetPassword"
                        defaultMessage="Reset your password?"
                      />
                    </h3>
                    <div
                      className={
                        userState.isArabic
                          ? 'subltext_Ar mb-4'
                          : 'subltext mb-4'
                      }
                    >
                      <FormattedMessage
                        id="resetPasswordBelow"
                        defaultMessage="Enter your email address below & we’ll send you password link"
                      />
                    </div>
                    <InputField
                      name="email"
                      onChange={setInputFields}
                      placeholder={
                        userState.isArabic ? 'البريد الإلكتروني' : 'Email'
                      }
                      type="email"
                    />
                    <div
                      className={userState.isArabic ? 'errors_Ar' : 'errors'}
                    >
                      {state.errors.email}
                    </div>
                    {(() => {
                      if (response.response && response.success) {
                        return (
                          <p
                            className={
                              userState.isArabic
                                ? ' forgotPassworddt3Arabicnew'
                                : 'forgotPassworddt3new'
                            }
                          >
                            <FormattedMessage
                              id="onSuccessPasswordReset"
                              defaultMessage="Password has beee sent to your Email"
                            />
                          </p>
                        );
                      } else if (response.response && !response.success) {
                        return (
                          <p
                            className={
                              userState.isArabic
                                ? ' forgotPassworddt3Arabic'
                                : 'forgotPassworddt3'
                            }
                          >
                            <FormattedMessage
                              id="onFailurePasswordReset"
                              defaultMessage="Email is not Registered"
                            />
                          </p>
                        );
                      }
                    })()}

                    <div>
                      <ButtonAuth
                        //  id="resetLink"
                        title={userState.isArabic ? 'إرسال' : 'Send'}
                        //  onClick={submit}
                        //  loading={loading}
                        buttonClassName={
                          userState.isArabic
                            ? 'w-100 border-0 py-4 mt-5 mb-4 buttonAuth_Ar'
                            : 'w-100 border-0 py-4 mt-5 mb-4 buttonAuth'
                        }
                        buttonName="Send"
                        id="resetLink"
                        btnType="resetLink"
                        onClick={submit}
                        loading={loading}
                      />
                    </div>
                    <div
                      className={
                        userState.isArabic ? 'signUpTesmem_Ar' : 'signUpTesmem'
                      }
                    >
                      {props.isLoginPopup ? (
                        <Link onClick={props.handleForgotPasswordClick}>
                          <FormattedMessage
                            id="backLogin"
                            defaultMessage="Back to Login"
                          />
                        </Link>
                      ) : (
                        <Link to="/login">
                          <FormattedMessage
                            id="backLogin"
                            defaultMessage="Back to Login"
                          />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
