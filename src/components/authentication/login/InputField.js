import React from 'react';
import UserContext from '../../../userContext/UserContext';
import './Login.css';

const InputField = (props) => {
  return (
    <>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={'form-control customInput'}
        onChange={props.onChange}
        name={props.name}
      />
    </>
  );
};

export default InputField;
