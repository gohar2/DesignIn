import React, { useContext } from 'react';
import UserContext from '../../userContext/UserContext';
import './Navbar.css';
// import img from './../../icons/SocialFBL.svg'

const SocialLogin = (props) => {
  const [userState, userDispatch] = useContext(UserContext);

  return (
    <>
      <button className={props.parent}>
        <span className="">
          <img className="icon" src={props.img} alt="" />
        </span>
        <span className={props.clas}> &nbsp;{props.title}</span>
      </button>
    </>
  );
};

export default SocialLogin;
