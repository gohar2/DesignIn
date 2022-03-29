import React, { useContext, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import UserContext from '../../userContext/UserContext';
import './login/Login.css';

const ButtonAuth = (props) => {
  const [userState, userDispatch] = useContext(UserContext);

  return (
    <>
      <button className={props.buttonClassName} onClick={props.onClick}>
        {props.loading ? (
          <Spinner as="span" animation="border" size="" role="status" />
        ) : (
          <FormattedMessage id={props.id} defaultMessage={props.buttonName} />
        )}
      </button>
    </>
  );
};

export default ButtonAuth;
