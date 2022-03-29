import React, { useContext, useState, useEffect } from 'react';
import { ReactComponent as BackPage } from '../../../icons/BackPage.svg';
import { withRouter, useParams } from 'react-router-dom';
import Context from '../../store/store';
import PulseLoader from 'react-spinners/PulseLoader';
import DropdownButton from '../editorBar/DropdownButton';
import DownloadList from './download/list';
import { ReactComponent as Download } from '../../../icons/Download.svg';

import { ToastContainer, toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import userContext from '../../../userContext/UserContext';
import './Navbar.css';

import { useHistory } from 'react-router-dom';

const Navbar = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext);
  const [ButtonSave, setButtonSave] = useState(false); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const [Loader, setLoader] = useState(false);
  const [isLoaggedIn, setIsLoaggedIn] = useState(false);
  const [title, setTitle] = useState('');
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    if (state.selectedPage && state.selectedPage.title) {
      setTitle(state.selectedPage.title);
    }
  }, [state.selectedPage.title]);

  const redirectBack = () => {
    window.history.back();
  };

  const onClickEditorNavbar = (e) => {
    e.stopPropagation();
    dispatch({ type: 'REMOVE_SELECTION' });
    dispatch({
      type: 'SET_ALIGNMENTV',
      payload: false,
    });
    dispatch({
      type: 'SET_LISTV',
      payload: false,
    });
    dispatch({
      type: 'SET_SHORTCUT_KEY',
      payload: false,
    });
  };

  return (
    <>
      <div className={Loader ? 'downloaderDivOn' : 'downloaderDiv'}>
        <PulseLoader
          css="position:fixed;display: flex;margin:45vh 45vw;border-color:#4662f0;"
          size={30}
          color={'#4662f0'}
          loading={Loader}
        />
      </div>
      <ToastContainer />
      <div className="editorNavbar" onClick={onClickEditorNavbar}>
        <div className="midBtns">
          <div className="midBtns">
            <DropdownButton
              component={<DownloadList />}
              btnName="Downlad"
              id="download"
              className="editorBarDropdownRoundBtnDownload"
              isDownload={true}
              icon={Download}
            />
          </div>
        </div>
        <button
          onClick={redirectBack}
          className={
            userState.isArabic
              ? 'backPageBtnNavbar_Ar arabicMode'
              : 'backPageBtnNavbar'
          }
        >
          <span>
            <FormattedMessage id="backPage" defaultMessage="Back Page" />
          </span>
          <div className="circleBackPageIcon">
            <BackPage className="backPageIcon" />
          </div>
        </button>
      </div>
    </>
  );
};

export default withRouter(Navbar);
