import React, { useContext, useEffect } from 'react';
import './SidebarPoster.css';
import DraggableImage from './DraggableImage';
import DraggableUploadedImage from './DraggableUploadedImage';
import Context from '../../store/store';
import { createFrame } from '../../../utils/index';
import userContext from '../../../userContext/UserContext';
import cloneDeep from 'lodash/cloneDeep';
import API from '../../../api/Api';
import { ReactComponent as CrossIconEditor } from './../../../icons/CrossIconEditor.svg';
import { getSelectedDesignById } from '../../../api/constants';
import { useHistory } from 'react-router-dom';

const SidebarPostersDetails = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant coment var from this
  let history = useHistory();

  useEffect(() => {
    dispatch({ type: 'SET_TEMPLATES_DETAIL', payload: true });
  }, []);
  useEffect(() => {
    return () => {
      dispatch({ type: 'SET_TEMPLATES_DETAIL', payload: false });
    };
  }, []);
  const onClickImage = (e) => {
    dispatch({
      type: 'INDESIGNTEMPLATE',
      payload: true,
    });
    if (props.isTemplate) {
      API.get(
        `${process.env.REACT_APP_BASE_URL}${getSelectedDesignById(
          e.target.id,
        )}`,
      ).then((result) => {
        if (result.data && result.data.length > 0) {
          dispatch({
            type: 'EMPTY_PAGES',
          });
          let clickedel = result.data[0];
          clickedel.json.page.pageId = state.selectedPage.pageId;
          clickedel.json.page.newTemplate = true;
          clickedel.json.page.elements = clickedel.json.page.elements.map(
            (el, ind) => {
              el.id = el.id.replace(/[0-9*]/, state.selectedPage.pageId);
              if (el.type === 'text') {
                if (typeof el.fontSize === 'number') {
                  let fs = el.fontSize + 'px';
                  el.fontSize = fs;
                }
              } else if (el.type === 'frame') {
                const frames = state.frames;
                frames[el.name].images = cloneDeep(el.images);
              }
              return el;
            },
          );
          if (props.images) {
            let saveTemplatepromise = new Promise((onSuccess) => {
              dispatch({
                type: 'SET_NEW_TEMPLATE',
                payload: clickedel.json,
              });
              onSuccess(true);
            });
            saveTemplatepromise.then((result) => {
              dispatch({
                type: 'SAVE_HISTORY',
              });
            });
            dispatch({
              type: 'SET_SELECTED_PAGE',
              payload: cloneDeep(clickedel.json.page),
            });
            if (window.location.pathname.substr(8, 1) === 'D') {
              history.push(`/editor/Template/${clickedel.json.categoryId}`);
            }
          }
        }
        // else {
        //   if (result.meta.code === 401) {
        //     let url = window.location.pathname;
        //     localStorage.setItem('redirectUrl', url);
        //     localStorage.removeItem('userData');
        //     history.push('/login');
        //   }
        // }
      });
    } else {
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
            originalWidth: `${e.target.clientWidth}`,
            originalHeight: `${e.target.clientHeight}`,
            lastFrameWidth: `${e.target.clientWidth}`,
            lastFrameHeight: `${e.target.clientHeight}`,
            lastImageWidth: `${e.target.clientWidth}`,
            lastImageHeight: `${e.target.clientHeight}`,
            width: `${e.target.clientWidth}`,
            height: `${e.target.clientHeight}`,
          },
        });
      } else if (e.target.tagName === 'TEXT') {
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
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
  };

  return (
    // <div className={props.uploaded ? '' : 'sidebarContentPicsContainerDiv'}>
    <>
      <div
        className={
          userState.isArabic
            ? 'titleDiv arabicMode titleFixed'
            : 'titleDiv titleFixed'
        }
      >
        <label className={userState.isArabic ? 'title_Ar' : 'title_En'}>
          {props.templatesTitle}
        </label>
        <div>
          <div
            onClick={(e) => props.onClickSeeAll(e, 'none')}
            className={
              userState.isArabic ? 'closeButton-arabic' : 'closeButton'
            }
            id="erase"
          >
            <CrossIconEditor />
          </div>
        </div>
      </div>
      <div
        className={
          props.uploaded
            ? ''
            : userState.isArabic
            ? 'sidebarContentTemplatesDiv arabicMode'
            : 'sidebarContentTemplatesDiv'
        }
      >
        {props.displayAll ? (
          props.images.map((images, index) => {
            return (
              <a onClick={(e) => onClickImage(e)} key={index} id={images.id}>
                {props.uploaded ? (
                  <DraggableUploadedImage
                    image={{ src: images.default_url }}
                    imageId={props.imageId}
                    imageOptions={props.imageOptions}
                  />
                ) : (
                  <DraggableImage
                    id={images.id}
                    image={{ src: images.url }}
                    templateUrl={{ src: images.url }}
                  />
                )}
              </a>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SidebarPostersDetails;
