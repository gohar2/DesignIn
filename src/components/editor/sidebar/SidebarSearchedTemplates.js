import React, { useContext, useEffect } from 'react';
import './SidebarPoster.css';
import DraggableImage from './DraggableImage';
import DraggableUploadedImage from './DraggableUploadedImage';
import Context from '../../store/store';
import { createFrame } from '../../../utils/index';
import userContext from '../../../userContext/UserContext';
import cloneDeep from 'lodash/cloneDeep';
import API from '../../../api/Api';
import { getSelectedDesignById } from '../../../api/constants';
import { useHistory } from 'react-router-dom';

const SidebarSearchedTemplates = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant coment var from this
  let history = useHistory();

  const onClickImage = (e) => {
    dispatch({
      type: 'INDESIGNTEMPLATE',
      payload: true,
    });
    API.get(
      `${process.env.REACT_APP_BASE_URL}${getSelectedDesignById(e.target.id)}`,
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
  };

  return (
    <div className={props.uploaded ? '' : 'sidebarContentPicsContainerDivs'}>
      <div className={userState.isArabic ? 'titleDiv arabicMode' : 'titleDiv'}>
        <label className={userState.isArabic ? 'title_Ar' : 'title_En'}>
          {props.images.length
            ? props.templatesTitle
            : 'No results are available.'}
        </label>
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
        {props.searchQuery.length && props.images.length ? (
          props.images.map((el) => {
            return (
              <a onClick={(e) => onClickImage(e)} id={el.id}>
                <DraggableImage
                  id={el.id}
                  image={{ src: el.url }}
                  templateUrl={{ src: el.url }}
                />
              </a>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default SidebarSearchedTemplates;
