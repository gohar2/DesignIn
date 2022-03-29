import React, { useContext, useState } from 'react';
import Context from '../../../store/store';
import SidebarCloseComponent from '../close/SidebarCloseComponent';
import {
  createFrame,
  showloopofskeleton,
  Spinner,
} from '../../../../utils/index';
import './SidebarUploadTemplate.css';
import 'react-toastify/dist/ReactToastify.css';
import {} from '../../../../utils/index';
import SidebarUploadPosters from '../SidebarUploadPosters';
import { FormattedMessage } from 'react-intl';

const SidebarUploadTemplate = (props) => {
  const [state, dispatch] = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function Main(file) {
    return await toBase64(file);
  }

  const uploadImage = (e) => {
    setIsLoading(true);
    setIsUploading(true);
    const selectedFile = e.currentTarget.files[0];
    Main(selectedFile).then((res) => {
      let images = [];
      images.push(res);
      let data = {
        images,
        name: 'uploaded',
        id: Math.random(),
      };
      dispatch({
        type: 'SAVE_UPLOADED_IMAGES',
        payload: {
          data: data,
          type: 'create',
        },
      });
      setIsUploading(false);
      setIsLoading(false);
    });
  };

  const onClickImage = (e) => {
    if (e.target.tagName === 'IMG') {
      const left = `${state.pageWidth / 2 - e.target.clientWidth / 2}px`;
      const top = `${state.pageHeight / 2 - e.target.clientWidth / 2}px`;
      dispatch({
        type: 'STORE_ELEMENT',
        payload: {
          type: 'img',
          src: e.target.src,
          frame: createFrame(
            `${e.target.clientWidth}px`,
            `${e.target.clientHeight}px`,
            top,
            left,
          ),
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          lock: false,
        },
      });
    } else {
      dispatch({
        type: 'STORE_ELEMENT',
        payload: {
          type: 'text',
          text: e.currentTarget.textContent,
          textArray: [],
          frame: createFrame(
            `${e.currentTarget.clientWidth}px`,
            `${e.currentTarget.clientHeight}px`,
          ),
          isBold: false,
          isItalic: false,
          isUnderline: false,
          isUppercase: false,
          isAlignTop: false,
          isAlignBottom: false,
          isAlignCenter: false,
          isColorPicker: false,
          fontSize: 18,
          fontFamily: 'open sans',
          lineHeight: 1,
          letterSpacing: 1,
          color: '#111111',
          textAlign: state.alignment.types[state.alignment.indexNo],
          list: 0,
          opacity: 1,
        },
      });
    }
  };
  const onClickSidebar = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'SET_SHORTCUT_KEY',
      payload: false,
    });
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
          <h1 className={''}>
            <FormattedMessage id="uploads" defaultMessage="Uploads" />
          </h1>
        </div>
        <div className="sidebarContentSearchBarDivUploads">
          <form id="myForm">
            <label className={'uploadImage'}>
              <input
                type="file"
                style={{
                  display: `none`,
                }}
                accept="image/x-png,image/jpeg"
                name="image"
                onChange={uploadImage}
              />
              <FormattedMessage
                id="UploadYourImage"
                defaultMessage="Upload Your Image"
              />
            </label>
          </form>
        </div>
        <div className="wraperDiv">
          <div className="directionDiv">
            <div className="sidebarContentPicsContainer">
              <div className="sidebarContentPhotosContainer">
                {isLoading
                  ? showloopofskeleton(2)
                  : state.uploadedImages &&
                    state.uploadedImages.map((obj, index) => {
                      return (
                        <SidebarUploadPosters
                          key={index}
                          title={obj.name}
                          images={obj.images}
                          onClick={onClickImage}
                          uploaded={'uploadedImages'}
                          imageId={obj.id}
                          imageOptions={obj.imageOptions}
                        />
                      );
                    })}
                {isUploading ? Spinner() : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarUploadTemplate;
