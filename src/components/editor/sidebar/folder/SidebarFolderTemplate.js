import React, { useState, useContext } from 'react';
import './SidebarFolderTemplate.css';
import SidebarCloseComponent from '../close/SidebarCloseComponent';
import SidebarFolderDetail from './SidebarFolderDetail';
import { InputGroup, FormControl } from 'react-bootstrap';
import SidebarFolder from './SidebarFolder';
import Context from '../../../store/store';
import { toast } from 'react-toastify';
import API from '../../../../api/Api';
import { createFolderUrl } from '../../../../api/constants';
import { ReactComponent as TickFolder } from '../../../../icons/tickFolder.svg';
import { ReactComponent as AddFolder } from '../../../../icons/addFolder.svg';
import { FormattedMessage } from 'react-intl';
import userContext from '../../../../userContext/UserContext.js';

const SidebarFolderTemplate = (props) => {
  const notify = (message) => toast(message);
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const [createFolderV, setCreateFolderV] = useState(false);
  const [folderName, setFolderName] = useState(null);
  const takeInput = () => {
    setCreateFolderV(!createFolderV);
  };
  const onKeyUp = (event) => {
    setFolderName(event.target.value);
    dispatch({
      type: 'SET_SHORTCUT_KEY',
      payload: false,
    });
  };
  const addFolder = () => {
    if (!!JSON.parse(localStorage.getItem('userData'))) {
      const newFolderObject = {
        name: folderName,
      };
      API.post(
        `${process.env.REACT_APP_BASE_URL}${createFolderUrl}`,
        newFolderObject,
      ).then((result) => {
        if (result.meta.code === 200) {
          notify('Succesfully Created folder');
          setCreateFolderV(false);
          state.createdFolderId = result.data.id;
          const createdFolder = {
            name: folderName,
            id: state.createdFolderId,
          };
          dispatch({ type: 'ADD_NEW_FOLDER', payload: createdFolder });
        } else {
          notify(result.meta.message);
        }
      });
    } else {
      // notify('kindly register to create folders');
      dispatch({ type: 'SET_LOGIN_POPUP', payload: true });
    }
  };

  const onClickSidebar = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'SET_SELECTED_EDITOR_BTN',
      payload: null,
    });
    dispatch({
      type: 'REMOVE_SELECTION',
    });
  };

  return (
    <>
      <SidebarCloseComponent />
      <div className="sidebarContent" onClick={onClickSidebar}>
        <div className="templatesHead">
          <h1 className={userState.isArabic ? 'arabicMode' : ''}>
            <FormattedMessage id="folders" defaultMessage="Folders" />
          </h1>
        </div>
        {state.openFolder ? (
          <SidebarFolderDetail />
        ) : (
          <div className="foldersContainer">
            <div
              className={
                userState.isArabic
                  ? 'createFolderDiv arabicMode'
                  : 'createFolderDiv'
              }
              onClick={takeInput}
            >
              <AddFolder
                className="createFolderIcon"
                style={{ width: '4.2rem' }}
              />
              <div
                className={
                  userState.isArabic
                    ? 'createFolderHeading_Ar mx-3'
                    : 'createFolderHeading mx-3'
                }
              >
                <FormattedMessage
                  id="createFolder"
                  defaultMessage="Create Folder"
                />
              </div>
            </div>
            {createFolderV ? (
              <div className="folderNameInputFeildDiv">
                <InputGroup
                  className={userState.isArabic ? 'mb-3 arabicMode' : 'mb-3'}
                >
                  <FormControl
                    placeholder="Enter Name"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    className="folderNameInputFeild"
                    onChange={onKeyUp}
                  />
                  <InputGroup.Append className="w-25">
                    <div
                      className={
                        userState.isArabic
                          ? 'tickFolderIconDiv_Ar w-100'
                          : 'tickFolderIconDiv w-100'
                      }
                      onClick={addFolder}
                    >
                      <TickFolder className="tickFolderIcon" />
                    </div>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            ) : (
              <></>
            )}
            <SidebarFolder />
          </div>
        )}
      </div>
    </>
  );
};
export default SidebarFolderTemplate;
