import React, { useContext } from 'react';
import Context from '../../store/store';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as PhotoIcon } from '../../../icons/PhotosIcon.svg';
import { ReactComponent as TextIcon } from '../../../icons/TextIcon.svg';
import { ReactComponent as BackgroundIcon } from '../../../icons/BackgroundIcon.svg';
import { ReactComponent as UploadIcon } from '../../../icons/UploadIcon.svg';
import userContext from '../../../userContext/UserContext';
import { setDimensionsOfEditorContainer } from '../../../utils/index';
import './Sidebar.css';

const Sidebar = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState] = useContext(userContext);
  const type = window.location.pathname.split('/')[2];

  const onClickMenuItem = (e) => {
    let setDimension = new Promise((onSuccess) => {
      dispatch({ type: 'SHOW_SIDEBAR', payload: e.currentTarget.value });
      dispatch({ type: 'REMOVE_SELECTION' });
      onSuccess(true);
    });
    setDimension.then((result) => {
      document.getElementById('p0').style.width = `${
        setDimensionsOfEditorContainer(type, userState, state)[0]
      }px`;
      document.getElementById('p0').style.height = `${
        setDimensionsOfEditorContainer(type, userState, state)[1]
      }px`;
    });
  };

  return (
    <>
      <div className="editorSidebarMenu">
        <div>
          <div className="sidebar">
            <div align="center">
              <button
                id={state.sidebarType === 'photobar' ? 'id' : 'dullId'}
                className={
                  userState.isArabic
                    ? 'sidebarButtons_Ar sidebarButtonsPhoto arabicMode'
                    : 'sidebarButtons sidebarButtonsPhoto'
                }
                onClick={onClickMenuItem}
                value="Photos"
              >
                <PhotoIcon value="Photos" className="iconClass icon2" />
                <br />
                <FormattedMessage id="photos" defaultMessage="Photos" />
              </button>
            </div>
            <div align="center">
              <button
                id={state.sidebarType === 'textbar' ? 'id' : 'dullId'}
                className={
                  userState.isArabic
                    ? 'sidebarButtons_Ar sidebarButtonsText arabicMode'
                    : 'sidebarButtons sidebarButtonsText sidebarButtonsPhoto'
                }
                onClick={onClickMenuItem}
                value="Text"
              >
                <TextIcon value="Text" className="iconClass icon2" />
                <br />
                <FormattedMessage id="text" defaultMessage="Text" />
              </button>
            </div>
            <div align="center">
              <button
                id={state.sidebarType === 'backgroundbar' ? 'id' : 'dullId'}
                className={
                  userState.isArabic
                    ? 'sidebarButtons_Ar sidebarButtonsBackground arabicMode'
                    : 'sidebarButtons sidebarButtonsBackground sidebarButtonsPhoto'
                }
                onClick={onClickMenuItem}
                value="Background"
              >
                <BackgroundIcon
                  value="Background"
                  className="iconClass icon2"
                />
                <br />
                <FormattedMessage id="background" defaultMessage="Background" />
              </button>
            </div>
            <div align="center">
              <button
                id={state.sidebarType === 'uploadbar' ? 'id' : 'dullId'}
                className={
                  userState.isArabic
                    ? 'sidebarButtons_Ar sidebarButtonsUpload arabicMode'
                    : 'sidebarButtons sidebarButtonsUpload sidebarButtonsPhoto'
                }
                onClick={onClickMenuItem}
                value="Upload"
              >
                <UploadIcon value="Upload" className="iconClass icon2" />
                <br />
                <FormattedMessage id="uploads" defaultMessage="Uploads" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
