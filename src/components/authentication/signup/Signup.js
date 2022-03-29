import React, { useContext, useState } from 'react';
import SocialLogin from '../../LandingPageNew/SocialLogin';
import ButtonAuth from '../ButtonAuth';
import InputField from '../login/InputField';
import './../login/Login.css';
import './../../LandingPageNew/Navbar.css';
import { useHistory } from 'react-router-dom';
import fb from './../../../icons/SocialFBL.svg';
import 'react-toastify/dist/ReactToastify.css';
import google from './../../../icons/SocialGL.svg';
import apple from './../../../icons/apple.svg';
import { Link } from 'react-router-dom';
import UserContext from '../../../userContext/UserContext';
import { FormattedMessage } from 'react-intl';
import { validEmail } from '../../../constants/index';
import Api from '../../../api/Api';
import { floginUrl, gloginUrl, signupUrl } from '../../../api/constants';
import { toast, ToastContainer } from 'react-toastify';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import LoginNavbar from '../../LandingPageNew/LoginNavbar';
import SocialMediaButton from '../../shared/SocialMediaButton';

const Signup = (props) => {
  const [loading, setloading] = useState(false);
  const [userState, userDispatch] = useContext(UserContext);
  // const [states, dispatch] = useContext(Context);
  const notify = (message) => toast(message);
  let history = useHistory();

  const [state, setState] = React.useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const setInputFields = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
    validate(evt.target.name, evt.target.value);
  };
  const validate = (name, value) => {
    switch (name) {
      case 'userName':
        state.errors.userName =
          value === '' ? (
            <FormattedMessage
              id="NameFieldRequired"
              defaultMessage="User Name field is required."
            />
          ) : value.length < 3 ? (
            <FormattedMessage
              id="nameLengthValidation"
              defaultMessage="User Name must be 3 characters long"
            />
          ) : (
            ''
          );
        break;
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
      case 'confirmPassword':
        state.errors.confirmPassword = state.errors.confirmPassword =
          value === '' ? (
            <FormattedMessage
              id="CPasswordFieldRequired"
              defaultMessage="Confirm password field is required."
            />
          ) : value !== state.password ? (
            <FormattedMessage
              id="confirmPassword"
              defaultMessage="Confirm password does not match"
            />
          ) : (
            ''
          );
        break;
      default:
        break;
    }
  };
  const submit = () => {
    let email, password, userName, confirmPassword;
    if (
      state.userName === '' ||
      state.email === '' ||
      state.password === '' ||
      state.confirmPassword === ''
    ) {
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
      if (state.userName === '') {
        userName = (
          <FormattedMessage
            id="NameFieldRequired"
            defaultMessage="User Name field is required."
          />
        );
      }
      if (state.confirmPassword === '') {
        confirmPassword = (
          <FormattedMessage
            id="CPasswordFieldRequired"
            defaultMessage="Confirm password field is required."
          />
        );
      }
      setState({
        ...state,
        errors: {
          userName,
          email,
          password,
          confirmPassword,
        },
      });
    } else {
      setloading(true);
      const data = {
        first_name: state.userName,
        email: state.email,
        password: state.password,
        password_confirmation: state.confirmPassword,
      };

      Api.post(`${process.env.REACT_APP_BASE_URL}${signupUrl}`, data).then(
        (result) => {
          console.log(result);
          setloading(false);
          if (result.meta.code === 200) {
            if (!result.data.is_email_confirmed) {
              notify('Kindly confirm your email.');
            }
            // else {
            //   userDispatch({ type: 'SET_USER', payload: result });
            //   history.push('/');
            // }
          } else {
            notify(result.meta.message);
          }
        },
      );
    }
  };
  const onSuccess = (response) => {
    const data = {
      google_id: response.profileObj.googleId,
      email: response.profileObj.email,
      first_name: response.profileObj.name,
    };
    Api.post(`${process.env.REACT_APP_BASE_URL}${gloginUrl}`, data).then(
      (result) => {
        if (result?.meta?.code === 200) {
          if (props.isLoginPopup) {
            userDispatch({ type: 'SET_USER', payload: result });
            props.handleClose();
            window.onbeforeunload = null;
            window.location.reload();
            localStorage.removeItem('redirectUrl');
          } else {
            userDispatch({ type: 'SET_USER', payload: result });
            history.push('/');
          }
        } else {
          notify(result.meta.message);
        }
      },
    );
  };
  const responseFacebook = (response) => {
    const data = {
      email: response.email,
      fb_id: response.userID,
    };
    Api.post(`${process.env.REACT_APP_BASE_URL}${floginUrl}`, data).then(
      (result) => {
        if (result?.meta?.code === 200) {
          if (props.isLoginPopup) {
            window.onbeforeunload = null;
            userDispatch({ type: 'SET_USER', payload: result });
            props.handleClose();
            window.location.reload();
            localStorage.removeItem('redirectUrl');
          } else {
            userDispatch({ type: 'SET_USER', payload: result });
            history.push('/');
          }
        } else {
          if (result.error) {
            notify(result.error);
          } else {
            notify(result.meta.message);
          }
        }
      },
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="AuthenticationBg">
        <div className="position-absolute w-100">
          <LoginNavbar isLoginPopup={props.isLoginPopup} />
        </div>
        <div
          className={userState.isArabic ? 'd-flex flex-row-reverse' : 'd-flex'}
        >
          <div className="flex1 leftBg"></div>
          <div className="flex18 d-flex flex-column height100vh justify-content-center">
            <div className="row">
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
                        id="signupFree"
                        defaultMessage="Sign up for free"
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
                        id="signupFreeBelowtxt"
                        defaultMessage="Wait no more to create your first design"
                      />
                    </div>
                    <div className="row mx-0 my-4 py-3">
                      <div className="col-md-12 p-0">
                        <div className={'row'} style={{ margin: '0' }}>
                          <div className="flex1">
                            <FacebookLogin
                              appId="320219789254032"
                              fields="name,email,picture"
                              callback={responseFacebook}
                              render={(renderProps) => (
                                <SocialMediaButton
                                  buttonClassName={'parentClassBtn colorFB'}
                                  imagePath={
                                    'https://www.freepnglogos.com/uploads/logo-facebook-png/logo-facebook-high-quality-facebook-logo-cliparts-for-20.png'
                                  }
                                  spanClassName="facebookLogo"
                                  buttonName="Facebook"
                                  onClick={renderProps.onClick}
                                />
                              )}
                            />
                            {/* <SocialLogin img={fb} title="Facebook" parent="parentClassBtn" clas="colorTxtfb"/> */}
                          </div>
                          <div className="flex1">
                            {/* <SocialLogin  img={google} title="Google" parent="parentClassBtn" clas="colorTxtgo"/> */}
                            <GoogleLogin
                              clientId="1516855667-hb9t69qbh2sr84jgi41cd3kngndear23.apps.googleusercontent.com"
                              onSuccess={onSuccess}
                              onFailure={onSuccess}
                              cookiePolicy={'single_host_origin'}
                              render={(renderProps) => (
                                <SocialMediaButton
                                  buttonClassName={
                                    userState.isArabic
                                      ? 'parentClassBtn textred ml-auto'
                                      : 'parentClassBtn textred'
                                  }
                                  imagePath={
                                    'https://www.freepnglogos.com/uploads/logo-gmail-png/logo-gmail-png-file-gmail-icon-svg-wikimedia-commons-0.png'
                                  }
                                  spanClassName=""
                                  buttonName="Google"
                                  onClick={renderProps.onClick}
                                />
                              )}
                            />
                          </div>
                          <div className="flex1">
                            <SocialLogin
                              img={
                                'https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-antivirus-software-policy-library-and-information-34.png'
                              }
                              title="Apple"
                              parent="parentClassBtng"
                              clas="colorTxtap"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <InputField
                      defaultValue=""
                      placeholder="Name"
                      arabicText="الإسم"
                      name="userName"
                      isArabic={userState.isArabic}
                      onChange={setInputFields}
                    />
                    <div
                      className={userState.isArabic ? 'errors_Ar' : 'errors'}
                    >
                      {state.errors.userName}
                    </div>
                    <InputField
                      type="email"
                      defaultValue=""
                      placeholder="Email"
                      arabicText="البريد الإلكتروني "
                      name="email"
                      isArabic={userState.isArabic}
                      onChange={setInputFields}
                    />
                    <div
                      className={userState.isArabic ? 'errors_Ar' : 'errors'}
                    >
                      {state.errors.email}
                    </div>
                    <InputField
                      type="password"
                      defaultValue=""
                      placeholder="Password"
                      arabicText="كلمة المرور"
                      name="password"
                      isArabic={userState.isArabic}
                      onChange={setInputFields}
                    />
                    <div
                      className={userState.isArabic ? 'errors_Ar' : 'errors'}
                    >
                      {state.errors.password}
                    </div>
                    <InputField
                      type="password"
                      defaultValue=""
                      placeholder="Confirm Password"
                      arabicText="تأكيد كلمة المرور"
                      name="confirmPassword"
                      isArabic={userState.isArabic}
                      onChange={setInputFields}
                    />
                    <div
                      className={userState.isArabic ? 'errors_Ar' : 'errors'}
                    >
                      {state.errors.confirmPassword}
                    </div>

                    <div>
                      <ButtonAuth
                        buttonClassName={
                          userState.isArabic
                            ? 'w-100 border-0 py-4 mt-5 mb-4 buttonAuth_Ar'
                            : 'w-100 border-0 py-4 mt-5 mb-4 buttonAuth'
                        }
                        buttonName="Sign Up"
                        id="signUp"
                        btnType="signUp"
                        onClick={submit}
                        loading={loading}
                      />
                    </div>
                    <div
                      className={
                        userState.isArabic
                          ? 'signUpTesmem_Ar d-flex'
                          : 'signUpTesmem'
                      }
                    >
                      <FormattedMessage
                        id="AlreadysignUp"
                        defaultMessage=" Already sign up?"
                      />
                      {props.isLoginPopup ? (
                        <Link onClick={props.handleSignUpForm}>
                          <FormattedMessage
                            id="signuplogin"
                            defaultMessage=" Login"
                          />
                        </Link>
                      ) : (
                        <Link to="/login">
                          <FormattedMessage
                            id="signuplogin"
                            defaultMessage=" Login"
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

export default Signup;
