import React, { useContext, useState } from 'react';
import { useDrag } from 'react-dnd';
import { ReactComponent as FolderOptions } from '../../../icons/FolderOption.svg';
import { ReactComponent as Delete } from '../../../icons/DeleteFolder.svg';
import API from '../../../api/Api';
import Context from '../../store/store';
import userContext from '../../../userContext/UserContext';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import { Spinner } from '../../../utils';

const DraggableUploadedImage = (props) => {
  const [state, dispatch] = useContext(Context); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const [selectedUploadId, setSelectedUploadId] = useState(0);

  const [{ opacity }, drag] = useDrag({
    item: {
      type: 'IMG',
      element: props.defaultUrl,
      left: 954,
      top: 88,
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const optionBtnClick = (e) => {
    e.stopPropagation();
    dispatch({ type: 'UPLOADED_IMAGES_OPTION', payload: e.currentTarget.id });
  };

  const delImage = (e) => {
    setSelectedUploadId(e.currentTarget.id);
    dispatch({ type: 'UPLOADED_IMAGES_OPTION', payload: e.currentTarget.id });
    let delId = e.currentTarget.id;
    API.del(
      `${process.env.REACT_APP_BASE_URL}uplaodUrl${e.currentTarget.id}`,
    ).then((result) => {
      notify(result.meta.message);
      setSelectedUploadId(0);
      dispatch({ type: 'DELETE_UPLOADED_IMAGE', payload: delId });
    });
  };
  const notify = (message) => toast(message);
  return (
    <>
      <div className="designParentDiv">
        <button
          className={
            userState.isArabic
              ? 'optionBtnDUI optionBtnDUI_Ar'
              : 'optionBtnDUI optionBtnDUI_En'
          }
          id={props.imageId}
          onClick={optionBtnClick}
        >
          <FolderOptions className="folderOptionBtn" />
        </button>
        <div
          className={
            props.imageOptions
              ? userState.isArabic
                ? 'optionsUI optionsUI_Ar'
                : 'optionsUI optionsUI_En'
              : 'optionsH'
          }
        >
          <div className="btnOptionDiv">
            <button
              className={
                userState.isArabic ? 'btnOption arabicMode' : 'btnOption'
              }
              id={props.imageId}
              onClick={delImage}
            >
              <Delete className="deleteUI" />
              <span
                className={
                  userState.isArabic ? 'optionUI arabicMode' : 'optionUI'
                }
              >
                <FormattedMessage id="delete" defaultMessage="Delete" />
              </span>
            </button>
          </div>
        </div>
        {props.image.src ? (
          props.imageId == selectedUploadId ? (
            <Spinner />
          ) : (
            <img
              ref={drag}
              style={{
                opacity,
                fontSize: 25,
                fontWeight: 'bold',
                cursor: 'move',
              }}
              className="sidebarContentFirstImage"
              src={props.image.src}
              alt="img"
            />
          )
        ) : (
          <h1 ref={drag} className="sidebarContentSecondImage">
            {props.image.text}
          </h1>
        )}
      </div>
    </>
  );
};

export default DraggableUploadedImage;
