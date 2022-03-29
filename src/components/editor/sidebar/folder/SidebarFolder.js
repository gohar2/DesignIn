import React, { useContext, useEffect, useState } from 'react';
import { ReactComponent as Folder } from '../../../../icons/folder.svg';
import { InputGroup, FormControl } from 'react-bootstrap';
import Context from '../../../store/store';
import { ReactComponent as FolderOptions } from '../../../../icons/FolderOption.svg';
import { ReactComponent as TickFolder } from '../../../../icons/tickFolder.svg';
import { ReactComponent as Rename } from '../../../../icons/Rename.svg';
import { ReactComponent as Delete } from '../../../../icons/DeleteFolder.svg';
import API from '../../../../api/Api';
import { toast } from 'react-toastify';
import './SidebarFolder.css';
import {
  getFolderUrl,
  deleteFolderUrl,
  renameFolderUrl,
} from '../../../../api/constants';
import { showloopofskeleton } from '../../../../utils/index';
import userContext from '../../../../userContext/UserContext.js';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

const SidebarFolder = (props) => {
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  let history = useHistory();

  useEffect(() => {
    API.get(`${process.env.REACT_APP_BASE_URL}${getFolderUrl}`).then(
      (result) => {
        if (result.data) {
          dispatch({ type: 'SET_FOLDERS', payload: result.data });
          setLoader(false);
        } else {
          if (result.meta.code === 401) {
            notify('Kindly register to use folders');
            setLoader(false);
          }
        }
      },
    );
  }, []);
  const [state, dispatch] = useContext(Context);
  const [loader, setLoader] = useState(true);
  const optionBtnClick = (e) => {
    e.stopPropagation();
    dispatch({ type: 'FOLDER_OPTION', payload: e.currentTarget.id });
  };

  const delFolder = (e) => {
    const delId = e.currentTarget.id;
    API.del(`${process.env.REACT_APP_BASE_URL}${deleteFolderUrl(delId)}`).then(
      (result) => {
        if (result.meta.code === 200) {
          dispatch({ type: 'DELETE_FOLDER', payload: delId });
          notify('Succesfully deleted folder');
        } else {
          notify(result.meta.message);
        }
      },
    );
  };
  const notify = (message) => toast(message);
  const [renameFolderID, setRenameFolderID] = useState(null);
  const [folderNewName, setFolderNewName] = useState(null);
  const renameFolderOption = (e) => {
    dispatch({ type: 'RENAME_OPTION', payload: e.currentTarget.id });
    setRenameFolderID(e.currentTarget.id);
  };
  const onKeyUp = (event) => {
    setFolderNewName(event.target.value);
    dispatch({
      type: 'SET_SHORTCUT_KEY',
      payload: false,
    });
  };
  const renameFolder = (e) => {
    const renamedFolder = {
      name: folderNewName,
      id: renameFolderID,
    };
    const renameObj = {
      name: folderNewName,
    };
    dispatch({ type: 'RENAME_OPTION', payload: null });
    API.put(
      `${process.env.REACT_APP_BASE_URL}renameForlder/${renameFolderID}`,
      renameObj,
    ).then((result) => {
      if (result.meta.code === 200) {
        dispatch({ type: 'RENAME_FOLDER', payload: renamedFolder });
        notify('Succesfully renamed folder');
      } else {
        notify(result.meta.message);
      }
    });
  };
  const openFolder = (e) => {
    dispatch({ type: 'OPEN_FOLDER', payload: e.currentTarget.id });
  };

  return (
    <>
      {loader ? (
        showloopofskeleton(1)
      ) : (
        <>
          {state.folders.map((folder) => {
            return (
              <>
                <div
                  className={
                    userState.isArabic
                      ? 'folderWraper arabicMode'
                      : 'folderWraper'
                  }
                >
                  <button
                    className={
                      userState.isArabic
                        ? 'optionBtnSidebar_Ar'
                        : 'optionBtnSidebar'
                    }
                    id={folder.id}
                    onClick={optionBtnClick}
                  >
                    <FolderOptions className="folderOptionBtnSidebar" />
                  </button>
                  <div
                    className={
                      folder.folderOptions
                        ? userState.isArabic
                          ? 'optionsVS_Ar'
                          : 'optionsVS'
                        : 'optionsH'
                    }
                  >
                    <button
                      className="btnOptionSidebar"
                      id={folder.id}
                      onClick={renameFolderOption}
                    >
                      <Rename className="optionIcon" />
                      <span
                        className={
                          userState.isArabic
                            ? 'optionSidebar_Ar'
                            : 'optionSidebar'
                        }
                      >
                        <FormattedMessage id="rename" defaultMessage="Rename" />
                      </span>
                    </button>
                    <button
                      className="btnOptionSidebar"
                      id={folder.id}
                      onClick={delFolder}
                    >
                      <Delete className="optionIcon" />
                      <span
                        className={
                          userState.isArabic
                            ? 'optionSidebar_Ar'
                            : 'optionSidebar'
                        }
                      >
                        <FormattedMessage id="delete" defaultMessage="Delete" />
                      </span>
                    </button>
                  </div>
                  <div
                    className="editorFolderDiv"
                    // className={
                    //   userState.isArabic
                    //     ? 'editorFolderDiv arabicMode'
                    //     : 'editorFolderDiv'
                    // }
                    id={folder.id}
                    onClick={openFolder}
                  >
                    <Folder className="folderIcon" />
                    <div className="folderNameSB w-100" id={folder.id}>
                      {folder.name}
                    </div>
                  </div>
                </div>
                {folder.renameOptions ? (
                  <div className="folderNameInputFeildDiv">
                    <InputGroup className="mb-3">
                      <FormControl
                        placeholder="Enter Name"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        className="folderNameInputFeild"
                        onChange={onKeyUp}
                      />
                      <InputGroup.Append className="w-25">
                        <div
                          className="tickFolderIconDiv w-100"
                          id={folder.id}
                          onClick={renameFolder}
                        >
                          <TickFolder className="tickFolderIcon" />
                        </div>
                      </InputGroup.Append>
                    </InputGroup>
                  </div>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default SidebarFolder;
