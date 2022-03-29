import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import './SidebarFolderDetail.css';
import { ReactComponent as Delete } from '../../../../icons/DeleteFolder.svg';
import { ReactComponent as Rename } from '../../../../icons/Rename.svg';
import { ReactComponent as Trash } from '../../../../icons/MoveTrash.svg';
import API from '../../../../api/Api';
import DraggableImage from '../DraggableImage';
import { ReactComponent as Folder } from '../../../../icons/folder.svg';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as TickFolder } from '../../../../icons/tickFolder.svg';
import {
  getFolderUrl,
  deleteFolderUrl,
  updateContainerUrl,
  deleteDesignUrl,
  deleteUploadUrl,
  createUploadUrl,
  createContainerUrl,
} from '../../../../api/constants';

import {
  createFrame,
  showloopofskeleton,
  Spinner,
} from '../../../../utils/index';
import { ToastContainer, toast } from 'react-toastify';
import Context from '../../../store/store';
import { ReactComponent as CrossIconEditor } from '../../../../icons/CrossIconEditor.svg';
import { ReactComponent as FolderOptions } from '../../../../icons/FolderOption.svg';
import userContext from '../../../../userContext/UserContext.js';

const SidebarFolderDetail = (props) => {
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const [loader, setloader] = useState(true);
  const [subfolders, setSubFolders] = useState([]); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const [data, setData] = useState({});
  const [object, setObject] = useState([]);
  const notify = (message) => toast(message);
  const [Id, setFolderID] = useState(0);
  const [state, dispatch] = useContext(Context);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedUploadId, setSelectedUploadId] = useState(0);

  const onClickImage = (e) => {
    if (e.target.tagName === 'IMG') {
      const left = `${
        document.getElementById(state.selectedPage.pageId).offsetWidth / 2 -
        e.target.clientWidth / 2
      }px`;
      const top = `${
        document.getElementById(state.selectedPage.pageId).offsetHeight / 2 -
        e.target.clientWidth / 2
      }px`;
      dispatch({
        type: 'STORE_ELEMENT',
        payload: {
          type: 'img',
          src: e.target.src,
          frame: createFrame('200px', '200px', top, left),
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          filter: null,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          lock: false,
        },
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
  };
  useEffect(() => {}, [selectedUploadId]);
  useEffect(() => {
    API.get(
      `${process.env.REACT_APP_BASE_URL}${getFolderUrl}/${state.folderToOpen}`,
    ).then((result) => {
      dispatch({ type: 'SET_DATA', payload: result.data[0] });
      setData(result.data[0]);
      setFolderID(result.data[0].id);
      setSubFolders(result.data[0].subfolders);
      setloader(false);
    });
  }, [state.folderToOpen]);

  const redirect = (id) => {
    dispatch({ type: 'OPEN_FOLDER', payload: id });
  };
  const optionBtnClick = (e) => {
    e.stopPropagation();
    dispatch({ type: 'SUBFOLDER_OPTION', payload: e.currentTarget.id });
  };
  const delFolder = (e) => {
    e.stopPropagation();
    const delId = e.currentTarget.id;
    API.del(`${process.env.REACT_APP_BASE_URL}${deleteFolderUrl(delId)}`).then(
      (result) => {
        if (result.meta.code === 200) {
          dispatch({ type: 'DELETE_SUBFOLDER', payload: delId });
          setSubFolders(state.subfolders);
          createFolders();
          notify('Succesfully deleted folder');
        } else {
          notify(result.meta.message);
        }
      },
    );
  };
  const [renameFolderID, setRenameFolderID] = useState(null);
  const renameFolderOption = (e) => {
    e.stopPropagation();
    dispatch({ type: 'RENAME_SUBOPTION', payload: e.currentTarget.id });
    setRenameFolderID(e.currentTarget.id);
  };
  const onKeyUp = (event) => {
    setFolderNewName(event.target.value);
  };
  const [folderNewName, setFolderNewName] = useState(null);
  const renameFolder = (e) => {
    e.stopPropagation();
    const renamedFolder = {
      name: folderNewName,
      id: renameFolderID,
    };
    const renameObj = {
      name: folderNewName,
    };
  };
  const createFolders = () => {
    if (
      (state.subfolders.length === 0) &
      (state.folderDesigns.length === 0) &
      (state.folderUploads.length === 0) &
      !isUploading
    ) {
      return (
        <div
          className={
            userState.isArabic
              ? 'sidebarEmptyFolder arabicMode'
              : 'sidebarEmptyFolder'
          }
        >
          <FormattedMessage
            id="Thisfolderisempty"
            defaultMessage="This folder is empty"
          />
        </div>
      );
    } else {
      const allFoldersData = state.subfolders.map((folder) => {
        return (
          <>
            <div className="sidebarFolderBtnsDiv">
              <button
                className={
                  userState.isArabic
                    ? 'sidebaroptionBtn_Ar'
                    : 'sidebaroptionBtn'
                }
                id={folder.id}
                onClick={optionBtnClick}
              >
                <FolderOptions className="folderOptionBtn" />
              </button>
              <div
                className={
                  folder.folderOptions ? 'sidebarOptionsVF' : 'optionsH'
                }
              >
                <div>
                  <button
                    className={
                      userState.isArabic
                        ? 'sidebarBtnOption_Ar'
                        : 'sidebarBtnOption'
                    }
                    id={folder.id}
                    onClick={renameFolderOption}
                  >
                    <FormattedMessage id="rename" defaultMessage="Rename" />
                  </button>
                </div>
                <div>
                  <button
                    className={
                      userState.isArabic
                        ? 'sidebarBtnOption_Ar'
                        : 'sidebarBtnOption'
                    }
                    id={folder.id}
                    onClick={delFolder}
                  >
                    <FormattedMessage id="delete" defaultMessage="Delete" />
                  </button>
                </div>
              </div>
              <div>
                <div
                  className={
                    userState.isArabic
                      ? 'editorFolderDiv arabicMode'
                      : 'editorFolderDiv'
                  }
                  onClick={() => redirect(folder.id)}
                  id={folder.id}
                >
                  <Folder className="folderIcon" />
                  <div className="sidebarfolderName" id={folder.id}>
                    {folder.name}
                  </div>
                </div>
              </div>
            </div>
            {folder.renameOptions ? (
              <div className="sidebarfolderNameInputFeildDiv">
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
      });
      return <>{allFoldersData}</>;
    }
  };
  const designOptionBtnClick = (e) => {
    e.stopPropagation();
    dispatch({ type: 'DESIGN_FOLDER_OPTION', payload: e.currentTarget.id });
  };
  const openDesign = (e) => {
    e.stopPropagation();
    props.history.push(`/editor/Design/${e.currentTarget.id}`);
  };
  const createDesigns = () => {
    const allDesigns = state.folderDesigns.map((design) => {
      return (
        <div className="sidebarPictureBtnsDiv">
          <button
            className={
              userState.isArabic ? 'sidebaroptionBtn_Ar' : 'sidebaroptionBtn'
            }
            id={design.id}
            onClick={designOptionBtnClick}
          >
            <FolderOptions className="folderOptionBtn" />
          </button>
          <div
            className={
              design.designOptions
                ? userState.isArabic
                  ? 'sidebarOptionsV_Ar'
                  : 'sidebarOptionsV'
                : 'optionsH'
            }
          >
            <div>
              <button
                className={
                  userState.isArabic
                    ? 'sidebarBtnOption_Ar'
                    : 'sidebarBtnOption'
                }
                id={design.id}
                onClick={MoveDesignToFolder}
              >
                <FormattedMessage
                  id="MovetoFolder"
                  defaultMessage="Move to Folder"
                />
              </button>
            </div>
            <div>
              <button
                className={
                  userState.isArabic
                    ? 'sidebarBtnOption_Ar'
                    : 'sidebarBtnOption'
                }
                id={design.id}
                onClick={designTrash}
              >
                <FormattedMessage
                  id="MovetoTrash"
                  defaultMessage="Move to Trash"
                />
              </button>
            </div>
            <div>
              <button
                className={
                  userState.isArabic
                    ? 'sidebarBtnOption_Ar'
                    : 'sidebarBtnOption'
                }
                id={design.id}
                onClick={permanentDeleteDesign}
              >
                <FormattedMessage
                  id="PermanentDelete"
                  defaultMessage="Permanent Delete"
                />
              </button>
            </div>
          </div>
          <div
            className={
              design.designFOptions
                ? userState.isArabic
                  ? 'sidebarfolderMenu sidebarfolderMenu_Ar'
                  : 'sidebarfolderMenu sidebarfolderMenu_En'
                : 'sidebarMenuH'
            }
          >
            <h3>
              <FormattedMessage
                id="MovetoFolder"
                defaultMessage="Move to Folder"
              />
            </h3>
            <hr className="separation" />
            {state.folders.map((folder) => {
              return (
                <div className="folderItems">
                  <button
                    className={
                      userState.isArabic
                        ? 'sidebarfolderNamelist sidebarfolderNamelist_Ar'
                        : 'sidebarfolderNamelist sidebarfolderNamelist_En'
                    }
                    id={folder.id}
                    onClick={move}
                  >
                    {folder.name}
                  </button>
                </div>
              );
            })}
          </div>
          <div onClick={openDesign} id={design.id}>
            <img
              className="sidebarimag"
              style={{
                width: '100%',
                height: '100%',
              }}
              src={`${design.images[0].url}`}
              alt="img"
            />
            <span>{design.title}</span>
          </div>
        </div>
      );
    });
    return <>{allDesigns}</>;
  };

  const move = (e) => {
    e.stopPropagation();
    const contId = state.containerId;
    const folderID = {
      folder_id: e.currentTarget.id,
    };
    API.put(
      `${process.env.REACT_APP_BASE_URL}${updateContainerUrl(contId)}`,
      folderID,
    ).then((result) => {
      if (result.meta.code === 200) {
        {
          object === 'design'
            ? dispatch({
                type: 'DELETE_FOLDER_DESIGN',
                payload: state.ObjectId,
              })
            : dispatch({
                type: 'DELETE_FOLDER_UPLOAD',
                payload: state.ObjectId,
              });
        }
        // createDesigns();
        createUploads();
        notify('Succesfully moved');
      } else {
        notify(result.meta.message);
      }
    });
  };
  const permanentDeleteDesign = (e) => {
    e.stopPropagation();
    const delId = e.currentTarget.id;
    API.del(`${process.env.REACT_APP_BASE_URL}${deleteDesignUrl(delId)}`).then(
      (result) => {
        if (result.meta.code === 200) {
          dispatch({ type: 'DELETE_FOLDER_DESIGN', payload: delId });
          createDesigns();
          notify('Succesfully deleted design');
        } else {
          notify(result.meta.message);
        }
      },
    );
  };
  const permanentDeleteUpload = (e) => {
    setSelectedUploadId(e.currentTarget.id);
    dispatch({ type: 'UPLOADS_FOLDER_OPTION', payload: e.currentTarget.id });
    e.stopPropagation();
    const delId = e.currentTarget.id;
    API.del(`${process.env.REACT_APP_BASE_URL}${deleteUploadUrl(delId)}`).then(
      (result) => {
        if (result.meta.code === 200) {
          dispatch({ type: 'DELETE_FOLDER_UPLOAD', payload: delId });
          createUploads();
          notify('Succesfully deleted photo');
          setSelectedUploadId(0);
        } else {
          notify(result.meta.message);
          setSelectedUploadId(0);
        }
      },
    );
  };
  const uploadsOptionBtnClick = (e) => {
    e.stopPropagation();
    dispatch({ type: 'UPLOADS_FOLDER_OPTION', payload: e.currentTarget.id });
  };
  const designTrash = (e) => {
    e.stopPropagation();
    const delId = e.currentTarget.id;
    const designArr = state.folderDesigns;
    let restore = {};
    for (let design of designArr) {
      if (design.id === parseInt(delId)) {
        restore = {
          title: design.title,
          styles: design.styles,
          user_id: design.user.id,
          is_trashed: '1',
        };
      }
    }
    API.put(
      `${process.env.REACT_APP_BASE_URL}${deleteDesignUrl(delId)}`,
      restore,
    ).then((result) => {
      if (result.meta.code === 200) {
        dispatch({ type: 'DELETE_FOLDER_DESIGN', payload: delId });
        createDesigns();
        notify('Succesfully moved design to Trash');
      } else {
        notify(result.meta.message);
      }
    });
  };
  const uploadsTrash = (e) => {
    setSelectedUploadId(e.currentTarget.id);
    dispatch({ type: 'UPLOADS_FOLDER_OPTION', payload: e.currentTarget.id });
    e.stopPropagation();
    const delId = e.currentTarget.id;
    const restore = {
      is_trashed: '1',
    };
    API.put(
      `${process.env.REACT_APP_BASE_URL}${deleteUploadUrl(delId)}`,
      restore,
    ).then((result) => {
      if (result.meta.code === 200) {
        dispatch({ type: 'DELETE_FOLDER_UPLOAD', payload: delId });
        createUploads();
        notify('Succesfully moved photo to Trash');
        setSelectedUploadId(0);
      } else {
        notify(result.meta.message);
        setSelectedUploadId(0);
      }
    });
  };
  const moveToFolder = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'UPLOADS_FOLDERMOVE_OPTION',
      payload: e.currentTarget.id,
    });
    setObject('upload');
  };
  const MoveDesignToFolder = (e) => {
    e.stopPropagation();
    dispatch({ type: 'DESIGN_FOLDERMOVE_OPTION', payload: e.currentTarget.id });
    setObject('design');
  };

  const createUploads = () => {
    if (state.folderUploads) {
      const allUploads = state.folderUploads.map((upload) => {
        return (
          <div className="sidebarPictureBtnsDiv">
            <button
              className={
                userState.isArabic ? 'sidebaroptionBtn_Ar' : 'sidebaroptionBtn'
              }
              id={upload.id}
              onClick={uploadsOptionBtnClick}
            >
              <FolderOptions className="folderOptionBtn" />
            </button>
            <div
              className={
                upload.uploadOptions
                  ? userState.isArabic
                    ? 'sidebarOptionsV_Ar'
                    : 'sidebarOptionsV'
                  : 'optionsH'
              }
            >
              <div>
                <button
                  className={
                    userState.isArabic
                      ? 'sidebarBtnOption_Ar'
                      : 'sidebarBtnOption'
                  }
                  id={upload.id}
                  onClick={moveToFolder}
                >
                  <Rename className="restore2" />
                  <span>
                    <FormattedMessage
                      id="MovetoFolder"
                      defaultMessage="Move to Folder"
                    />
                  </span>
                </button>
              </div>
              <div>
                <button
                  className={
                    userState.isArabic
                      ? 'sidebarBtnOption_Ar'
                      : 'sidebarBtnOption'
                  }
                  id={upload.id}
                  onClick={uploadsTrash}
                >
                  <Trash className="restoretrash" />
                  <span>
                    <FormattedMessage
                      id="MovetoTrash"
                      defaultMessage="Move to Trash"
                    />
                  </span>
                </button>
              </div>
              <div>
                <button
                  className={
                    userState.isArabic
                      ? 'sidebarBtnOption_Ar'
                      : 'sidebarBtnOption'
                  }
                  id={upload.id}
                  onClick={permanentDeleteUpload}
                >
                  <Delete className="restore1" />
                  <span>
                    <FormattedMessage
                      id="PermanentDelete"
                      defaultMessage="Permanent Delete"
                    />
                  </span>
                </button>
              </div>
            </div>
            <div
              className={
                upload.uploadFOptions
                  ? userState.isArabic
                    ? 'sidebarfolderMenu sidebarfolderMenu_Ar'
                    : 'sidebarfolderMenu sidebarfolderMenu_En'
                  : 'sidebarMenuH'
              }
            >
              <h3
                className={
                  userState.isArabic
                    ? 'sidebarfolderMenuh_Ar'
                    : 'sidebarfolderMenuh'
                }
              >
                <FormattedMessage
                  id="MovetoFolder"
                  defaultMessage="Move to Folder"
                />
              </h3>
              <hr className="separation" />
              {state.folders.map((folder) => {
                return (
                  <div className="folderItems">
                    <button
                      className={
                        userState.isArabic
                          ? 'sidebarfolderNamelist sidebarfolderNamelist_Ar'
                          : 'sidebarfolderNamelist sidebarfolderNamelist_En'
                      }
                      id={folder.id}
                      onClick={move}
                    >
                      {folder.name}
                    </button>
                  </div>
                );
              })}
            </div>
            <div id={upload.id}>
              {upload.id == selectedUploadId ? (
                <Spinner />
              ) : (
                <a className="photoS" onClick={onClickImage}>
                  <DraggableImage image={{ src: upload.images[0].url }} />
                </a>
              )}
              {/* <img
                ref={drag}
                className="sidebarimag"
                style={{
                  opacity,
                  width: '100%',
                  height: '100%',
                  cursor: "move"
                }}
                src={`${upload.images[0].url}`}
                alt="img"
              /> */}
              <span>{upload.title}</span>
            </div>
          </div>
        );
      });

      return allUploads;
    }
  };
  const back = () => {
    dispatch({ type: 'BACK_FOLDER' });
  };

  const uploadPhoto = (e) => {
    setIsUploading(true);
    e.stopPropagation();
    const selectedFile = e.currentTarget.files[0];
    let formData = new FormData();
    formData.append('image', selectedFile, selectedFile.name);
    API.postImage(
      `${process.env.REACT_APP_BASE_URL}${createUploadUrl}`,
      formData,
    ).then((result) => {
      state.createdUploadUrl = result.data.images[0].url;
      state.createdUploadTitle = result.data.title;
      const folderinfo = {
        folder_id: Id,
        instance_id: result.data.id,
        instance: 'upload',
      };
      API.post(
        `${process.env.REACT_APP_BASE_URL}${createContainerUrl}`,
        folderinfo,
      ).then((result) => {
        if (result.meta.code === 200) {
          state.createdUploadId = result.data.instance_id;
          const createdUpload = {
            id: state.createdUploadId,
            title: state.createdUploadTitle,
            uploadOptions: false,
            uploadFOptions: false,
            images: [
              {
                url: state.createdUploadUrl,
              },
            ],
            container: {
              id: result.data.id,
            },
          };

          dispatch({ type: 'ADD_NEW_UPLOAD', payload: createdUpload });
          createUploads();
          notify('Succesfully Uploaded');
          setIsUploading(false);
        } else {
          notify(result.meta.message);
          setIsUploading(false);
        }
      });
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="sidebarFolderContainer">
        <div
          className={
            userState.isArabic
              ? 'sidebarFolderHeadingDiv arabicMode'
              : 'sidebarFolderHeadingDiv'
          }
        >
          <CrossIconEditor className="backFolderIcon mt-4" onClick={back} />
          <div className="sidebarFolderHeading">{data.name}</div>
        </div>

        <div className="btnClass">
          <form id="myForm">
            <label
              className={
                userState.isArabic
                  ? 'createNewFolderBtn arabicMode'
                  : 'createNewFolderBtn'
              }
            >
              <input
                type="file"
                style={{
                  display: `none`,
                }}
                name="image"
                accept="image/x-png,image/jpeg"
                onChange={uploadPhoto}
              />
              <FormattedMessage id="upload" defaultMessage="Upload" />
            </label>
          </form>
          {/* <button className="createNewFolderBtn" onClick={createNewFolder}>
              Add folder
            </button> */}
        </div>
        <div
          className={
            userState.isArabic ? 'dataContainer arabicMode' : 'dataContainer'
          }
        >
          {loader ? (
            <>{showloopofskeleton(4)}</>
          ) : (
            <>
              {createFolders()}
              {createDesigns()}
              {createUploads()}
            </>
          )}
          {isUploading ? Spinner() : null}
        </div>
      </div>
    </>
  );
};

export default withRouter(SidebarFolderDetail);
