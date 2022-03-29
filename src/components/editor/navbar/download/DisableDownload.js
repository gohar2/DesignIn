import React, { useContext, useEffect } from 'react';
import Context from '../../../store/store';
import './download.css';
import Api from '../../../../api/Api';
import { ReactComponent as Download } from '../../../../icons/Download.svg';

const DisableDownload = (props) => {
  const [state, dispatch] = useContext(Context);
  const checkStatus = () => {
    Api.get(`${process.env.REACT_APP_BASE_URL}verifyTokenUrls`).then(
      (result) => {
        if (result.data !== 'Access Granted') {
          let url = window.location.pathname;
          localStorage.setItem('redirectUrl', url);
          localStorage.setItem(
            'selectedPage',
            JSON.stringify(state.selectedPage),
          );
          localStorage.setItem('pages', JSON.stringify(state.pages));
          localStorage.removeItem('userData');
          dispatch({ type: 'SET_LOGIN_POPUP', payload: true });
        }
      },
    );
  };
  return (
    <>
      <div className="midBtns">
        <button
          class="downloadBtnNavbar"
          style={{ margin: '.8rem' }}
          onClick={checkStatus}
        >
          <div class="circle">
            <Download className="downloadIcon" />
          </div>
          <span class="downloadSpan">Download</span>
        </button>
      </div>
    </>
  );
};

export default DisableDownload;
