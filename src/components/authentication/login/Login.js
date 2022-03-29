import React, { useContext, useState } from 'react';
import ButtonAuth from '../ButtonAuth';
import { Link, useHistory } from 'react-router-dom';
import InputField from './InputField';
import './Login.css';
import UserContext from '../../../userContext/UserContext';
import { FormattedMessage } from 'react-intl';
import { validEmail } from '../../../constants';
import { loginUrl } from '../../../api/constants';
import Api from '../../../api/Api';
import { toast, ToastContainer } from 'react-toastify';
import LoginNavbar from '../../LandingPageNew/LoginNavbar';

const Login = (props) => {
  const [loading, setloading] = useState(false);
  const [userState, userDispatch] = useContext(UserContext);
  // const [states, dispatch] = useContext(Context);
  const notify = (message) => toast(message);
  const [state, setState] = React.useState({
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
  });
  let history = useHistory();
  const setInputFields = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
    validate(evt.target.name, evt.target.value);
  };
  const submit = () => {
    let email, password;
    if (state.email === '' || state.password === '') {
      if (state.email === '') {
        email = (
          <FormattedMessage
            id="EmailFieldRequired"
            defaultMessage="Email field is required."
          />
        );
      }
      if (state.password === '') {
        password = (
          <FormattedMessage
            id="PasswordFieldRequired"
            defaultMessage="Password field is required."
          />
        );
      }
      setState({
        ...state,
        errors: {
          email,
          password,
        },
      });
    } else if (state.errors.email === '' && state.errors.password === '') {
      const data = {
        email: state.email,
        password: state.password,
      };
      setloading(true);
      Api.post(`${process.env.REACT_APP_BASE_URL}${loginUrl}`, data).then(
        (result) => {
          setloading(false);
          if (result.meta.code === 200) {
            userDispatch({ type: 'SET_USER', payload: result });
            notify(result.meta.message);
            if (props.isLoginPopup) {
              window.onbeforeunload = null;
              window.location.reload();
              localStorage.removeItem('redirectUrl');
            } else {
              history.push('/');
            }
          } else {
            console.log(result);
            notify(result.meta.message);
          }
        },
      );
    }
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
      case 'password':
        state.errors.password = state.errors.password =
          value === '' ? (
            <FormattedMessage
              id="PasswordFieldRequired"
              defaultMessage="Password field is required."
            />
          ) : value.length < 8 ? (
            <FormattedMessage
              id="lengthValidation"
              defaultMessage="Password must be 8 characters long!"
            />
          ) : (
            ''
          );
        break;
      default:
        break;
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="AuthenticationBg">
        <div className="position-absolute w-100">
          <LoginNavbar isLoginPopup={props.isLoginPopup} />
        </div>
        <div className={'d-flex'}>
          <div className="flex1 leftBg"></div>
          <div className="flex18 d-flex height100vh flex-column justify-content-center">
            <div className="row">
              <div className="col-md-9 mx-auto">
                <div className="row mx-5 mx-md-0">
                  <div className={'col-md-8 mx-auto p-0'}>
                    <h3 className={'loginHeading'}>
                      <FormattedMessage id="signin" defaultMessage=" Sign in" />
                    </h3>
                    <div className={'subltext mb-4'}>
                      <FormattedMessage
                        id="signintxtBelow"
                        defaultMessage="Good to see you, please sign in to continue"
                      />
                    </div>
                    <InputField
                      type="email"
                      placeholder="Email"
                      arabicText="بريد الإلكتروني"
                      name="email"
                      isArabic={userState.isArabic}
                      onChange={setInputFields}
                    />
                    <div className={'errors'}>{state.errors.email}</div>
                    <InputField
                      type="password"
                      placeholder="Password"
                      arabicText="كلمة المرور"
                      name="password"
                      isArabic={userState.isArabic}
                      onChange={setInputFields}
                    />
                    <div className={'errors'}>{state.errors.password}</div>
                    <div
                      className={
                        userState.isArabic
                          ? 'd-flex justify-content-between flex-row-reverse clearBoth'
                          : 'd-flex justify-content-between'
                      }
                    >
                      <div
                        className={
                          userState.isArabic
                            ? 'd-flex align-items-center flex-row-reverse mart2 '
                            : ' mart2 d-flex align-items-center'
                        }
                      >
                        <input id="remember" type="checkbox" className="" />
                        &nbsp;
                        <label
                          htmlFor="remember"
                          className={
                            userState.isArabic
                              ? 'txtRemember_Ar mb-0'
                              : 'txtRemember mb-0'
                          }
                        >
                          <FormattedMessage
                            id="remembermetxt"
                            defaultMessage="Remember Me"
                          />
                        </label>
                      </div>
                      <div className={'forgotTxt'}>
                        {props.isLoginPopup ? (
                          <Link onClick={props.handleForgotPasswordClick}>
                            <FormattedMessage
                              id="forgotPass"
                              defaultMessage="Forgot Password"
                            />
                          </Link>
                        ) : (
                          <Link to="/forgotpassword">
                            <FormattedMessage
                              id="forgotPass"
                              defaultMessage="Forgot Password"
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                    <div>
                      <ButtonAuth
                        buttonClassName={
                          userState.isArabic
                            ? 'w-100 border-0 py-4 mt-5 mb-4 buttonAuth_Ar'
                            : 'w-100 border-0 py-4 mt-5 mb-4 buttonAuth'
                        }
                        buttonName="Sign In"
                        id="signIn"
                        btnType="signIn"
                        onClick={submit}
                        loading={loading}
                      />
                    </div>
                    <div className={'signUpTesmem'}>
                      <FormattedMessage
                        id="newTesmem"
                        defaultMessage="New to tesmem? "
                      />
                      {props.isLoginPopup ? (
                        <Link onClick={props.handleSignUpForm}>
                          <FormattedMessage
                            id="signupHere"
                            defaultMessage=" Sign up here"
                          />
                        </Link>
                      ) : (
                        <Link to="/signup">
                          <FormattedMessage
                            id="signupHere"
                            defaultMessage=" Sign up here"
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

export default Login;
