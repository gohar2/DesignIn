import React, { useContext, useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useHotkeys } from 'react-hotkeys-hook';
// import reactdomserver from 'react-dom/server'; Shaheer code-refactoring-removing-unused-variables
// import reactdom from 'react-dom'; Shaheer code-refactoring-removing-unused-variables
// import PropTypes from 'prop-types'; Shaheer code-refactoring-removing-unused-variables
import Context from '../../store/store';
import userContext from '../../../userContext/UserContext.js';
// import {
//   ReactComponent as Copy,
//   ReactComponent,
// } from '../../../icons/Copy.svg';    Shaheer code-refactoring-removing-unused-variables
// import { ReactComponent as Delete } from '../../../icons/Delete.svg'; Shaheer code-refactoring-removing-unused-variables
import { useDrop } from 'react-dnd';
import {
  createFrame,
  checkTextElementsLength,
  setDimensionsOfSVG,
  setStylesOnSVG,
  formatText,
  addLineHeight,
  setScaleOfNewElement,
} from '../../../utils/index';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import API from '../../../api/Api';

import { withRouter, useParams, useHistory } from 'react-router-dom';
// import domtoimage from 'dom-to-image'; Shaheer code-refactoring-removing-unused-variables
import { ColorExtractor } from 'react-color-extractor';
// import { FullScreen } from 'react-full-screen'; Shaheer code-refactoring-removing-unused-variables
import ContentEditable from 'react-contenteditable';
// import sanitizeHtml from 'sanitize-html'; Shaheer code-refactoring-removing-unused-variables
import './Page.css';
// import { ReactSVG } from 'react-svg';  Shaheer code-refactoring-removing-unused-variables
import { css } from 'glamor';
import Circle from '../frames/Circle';
import VerticalRectangle from '../frames/VerticalRectangle';
import Triangle from '../frames/Triangle';
import Trapezoid from '../frames/Trapezoid';
import Parallelogram from '../frames/Parallelogram';
import Rhombus from '../frames/Rhombus';
import Pentagon from '../frames/Pentagon';
import Heptagon from '../frames/Heptagon';
import Octagon from '../frames/Octagon';
import Nonagon from '../frames/Nonagon';
import Bevel from '../frames/Bevel';
import LeftPoint from '../frames/LeftPoint';
import RightPoint from '../frames/RightPoint';
import LeftChev from '../frames/LeftChev';
import RightChev from '../frames/RightChev';
import Star from '../frames/Star';
import Minus from '../frames/Minus';
import Frame from '../frames/Frame';
import Elipse from '../frames/Elipse';
import Rectangle from '../frames/Rectangle';
import Square from '../frames/Square';
import FullPageGrid from '../grids/FullPageGrid';
import HalfPageGrid from '../grids/HalfPageGrid';
import ThirtySeventyPageGrid from '../grids/ThirtySeventyPageGrid';
import HorizontalHalfPageGrid from '../grids/HorizontalHalfPageGrid';
import HorizontalTriGrid from '../grids/HorizontalTriGrid';
import VerticalTriGrid from '../grids/VerticalTriGrid';
import cloneDeep from 'lodash/cloneDeep';

// import {
//   dragElement,
//   makeResizableDiv,
//   getElementDimensions,
// } from '../../../utils/moveableText.js'; Shaheer code-refactoring-removing-unused-variables
// import { rotateMe } from '../../../utils/rotatableText.js'; Shaheer code-refactoring-removing-unused-variables
import './MoveableText.css';
// import { ReactComponent as Drag } from '../../../icons/Drag.svg';
// import { ReactComponent as Rot } from '../../../icons/RotateImg.svg'; Shaheer code-refactoring-removing-unused-variables
import parse from 'html-react-parser';
import hotkeys from 'hotkeys-js';

const Page = (props) => {
  const [templates, setTemplates] = useState([]);
  const [Editable, setEditable] = useState(true);
  const [html, setHtml] = useState('');
  const [state, dispatch] = useContext(Context);
  const [userState] = useContext(userContext);
  const cropper = useRef(null);
  const [keypressed, setIsKeyPressed] = useState(false);
  const notify = (message) => toast(message);
  let history = useHistory();
  let { id } = useParams();
  let { elements, pageId } = props.page;
  const type = window.location.pathname.split('/')[2];

  //STATES TO IMPLEMENT MAC SHORT KEYS
  const [macCopyKey, setMacCopyKey] = useState(false);
  const [macPasteKey, setMacPasteKey] = useState(false);
  const [macBoldKey, setMacBoldKey] = useState(false);
  const [macItalicKey, setMacItalicKey] = useState(false);
  const [macUnderLineKey, setMacUnderLineKey] = useState(false);
  const [macFontIncreaseKey, setMacFontIncreaseKey] = useState(false);
  const [macFontDecreaseKey, setMacFontDecreaseKey] = useState(false);
  const [macFontStyleCopyKey, setmacFontStyleCopyKey] = useState(false);
  const [macFontStylePasteKey, setmacFontStylePasteKey] = useState(false);
  const [macTextUppercaseKey, setMacTextUppercaseKey] = useState(false);
  const [macTextAlignLeftKey, setMacTextAlignLeftKey] = useState(false);
  const [macTextAlignRightKey, setMacTextAlignRightKey] = useState(false);
  const [macTextAlignCenterKey, setMacTextAlignCenterKey] = useState(false);
  const [macDuplicateKey, setMacDuplicateKey] = useState(false);
  const [macBackwardKey, setMacBackwardKey] = useState(false);
  const [macForwardKey, setMacForwardKey] = useState(false);
  const [macBackKey, setMacBackKey] = useState(false);
  const [macFrontKey, setMacFrontKey] = useState(false);
  const [macZoomInKey, setMacZoomInKey] = useState(false);
  const [macZoomOutKey, setMacZoomOutKey] = useState(false);
  const [macFullZoomKey, setMacFullZoomKey] = useState(false);
  const [macFitToScreenKey, setMacFitToScreenKey] = useState(false);

  useEffect(() => {
    if (state.isDragElementCopied && state.isDragging) {
      let isDragged = true;
      dispatch({
        type: 'SET_COPIED_ELEMENT',
        payload: false,
      });
      dispatch({
        type: 'SET_SELECTED_EDITOR_BTN',
        payload: null,
      });
      dispatch({
        type: 'DUPLICATE_ELEMENT',
        payload: isDragged,
      });
    }
  }, [state.isDragging]);
  useEffect(() => {
    dispatch({
      type: 'SET_DRAG_COPIED_ELEMENT',
      payload: keypressed,
    });
  }, [keypressed]);
  useEffect(() => {
    document.getElementById(`page0`).addEventListener('scroll', function (e) {
      document.getElementById(`page0`).scrollTop = 0;
      document.getElementById(`page0`).scrollLeft = 0;
    });
  });
  useEffect(() => {
    if (type === 'Template') {
      let height, width;
      if (window.screen.width * 0.6 < props.pWidth) {
        width = (window.screen.width * 0.6) / props.pWidth;
      } else {
        width = props.pWidth / (window.screen.width * 0.6);
      }
      if (window.screen.height * 0.6 < props.pHieght) {
        height = (window.screen.height * 0.6) / props.pHieght;
      } else {
        height = props.pHieght / (window.screen.height * 0.6);
      }
      if (width < height) {
        dispatch({
          type: 'SET_ZOOM',
          payload: width,
        });
        props.ZoomPercentageSet(parseInt(width * 100));
        dispatch({
          type: 'SET_ZOOM_PERCENTAGE',
          payload: parseInt(width * 100),
        });
      } else {
        dispatch({
          type: 'SET_ZOOM',
          payload: height,
        });
        props.ZoomPercentageSet(parseInt(height * 100));
        dispatch({
          type: 'SET_ZOOM_PERCENTAGE',
          payload: parseInt(height * 100),
        });
      }
    }
    if (type === 'Design') {
      let designscale =
        props.transformDesign && parseFloat(props.transformDesign);
      props.ZoomPercentageSet(parseInt(designscale * 100));
      dispatch({
        type: 'SET_ZOOM_PERCENTAGE',
        payload: parseInt(designscale * 100),
      });
    }
    if (props.inDesignTemplate) {
      props.ZoomPercentageSet(parseInt(props.newScale * 100));
      dispatch({
        type: 'SET_ZOOM_PERCENTAGE',
        payload: parseInt(props.newScale * 100),
      });
    }

    if (props.EditableP) {
      setEditable(true);
    }
  }, [
    props.pWidth,
    props.newScale,
    props.transformDesign,
    props.inDesignTemplate,
    props.translateOfPageDiv,
    props.EditableP,
  ]);

  const [{ isOver }, drop] = useDrop({
    accept: 'IMG',
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    drop: async (props, monitor) => {
      let isFrameExist = false;
      if (state.sidebarType === 'Text') {
        let fontSize,
          isBold,
          direction,
          fontFamily,
          tWidth = 221,
          textType = 'heading';
        if (monitor.getItem().id === 'heading') {
          fontSize = '35px';
          isBold = true;
          direction = 'ltr';
          fontFamily = 'NeoSans';
          tWidth = 221;
          textType = 'heading';
        } else if (monitor.getItem().id === 'subheading') {
          fontSize = '15px';
          isBold = true;
          fontFamily = 'NeoSans';
          direction = 'ltr';
          tWidth = 120;
          textType = 'subHeading';
        } else if (monitor.getItem().id === 'heading_Ar') {
          fontSize = '35px';
          isBold = true;
          fontFamily = 'NeoSans-Arabic';
          direction = 'rtl';
          tWidth = 160;
          textType = 'heading';
        } else if (monitor.getItem().id === 'subheading_Ar') {
          fontSize = '15px';
          isBold = true;
          fontFamily = 'NeoSans-Arabic';
          direction = 'rtl';
          tWidth = 143;
          textType = 'subHeading';
        } else if (monitor.getItem().id === 'body_Ar') {
          fontSize = '12px';
          isBold = false;
          fontFamily = 'NeoSans-Arabic';
          direction = 'rtl';
          tWidth = 148;
          textType = 'body';
        } else {
          fontSize = '12px';
          isBold = false;
          fontFamily = 'NeoSans';
          direction = 'ltr';
          tWidth = 144;
          textType = 'body';
        }
        let tHeight = document.getElementById(
          monitor.getItem().id,
        ).offsetHeight;
        const left = `${state.pageWidth / 2 - tWidth / 2}px`;
        const top = `${
          state.pageHeight / 2 -
          tHeight / 2 +
          checkTextElementsLength(state.pages, state.selectedPage) * 60
        }px`;
        dispatch({
          type: 'STORE_ELEMENT',
          payload: {
            textType,
            type: 'text',
            text: `<div>${monitor.getItem().heading}</div>`,
            textArray: [],
            frame: createFrame(
              `${tWidth}px`,
              `${tWidth * 0.1634}px`,
              top,
              left,
            ),
            top,
            left,
            isBold: isBold,
            direction: direction,
            isItalic: false,
            isUnderline: false,
            isUppercase: false,
            isAlignTop: false,
            isAlignBottom: false,
            isAlignCenter: false,
            isColorPicker: false,

            fontSize:
              fontSize.split('px')[0] * setScaleOfNewElement(`${tWidth}px`),
            fontFamily: fontFamily,
            lineHeight: 1,
            letterSpacing: 0,
            color: '#111111',
            textAlign: state.alignment.types[state.alignment.indexNo],
            list: 0,
            opacity: 1,
            rotation: '0deg',
            xBound: 0,
            yBound: 0,
            rotBound: 0,
            width: tWidth,
          },
        });
        dispatch({
          type: 'SHOW_TEXT_BAR',
          payload: true,
        });
        dispatch({
          type: 'SAVE_HISTORY',
        });
        return;
      }
      if (state.sidebarType === 'Templates') {
        return;
      }
      if (state.isFrame) {
        dispatch({ type: 'IS_FRAME', payload: false });
      } else {
        if (!state.isGrid) {
          const element = props.element;
          if (state.sidebarType === 'Icons') {
            if (props.type === 'IMG') {
              const type =
                props.sub_category_id === 34 && props.mode === 'Searched Result'
                  ? 'frame'
                  : props.id.substring(0, 5);
              // const type = props.id.substring(0, 5);
              if (type === 'grids') {
                dispatch({
                  type: 'STORE_GRID',
                  payload: {
                    type: 'grid',
                    name: props.id.substring(6),
                    grid: true,
                    frame: createFrame(
                      `${state.pageWidth}px`,
                      `${state.pageHeight}px`,
                    ),
                  },
                });
              } else if (type === 'frame') {
                let temp = props.id.split(' ');
                var last_element = temp[temp.length - 1];
                state.pages[state.selectedPage.pageId].elements.forEach(
                  (el) => {
                    if (el.type === 'frame') {
                      isFrameExist = true;
                    }
                  },
                );
                if (!isFrameExist) {
                  let clientWidth = document.getElementById(
                    props.id,
                  ).clientWidth;
                  const left = `${
                    state.pageWidth / 2 - clientWidth / 2 - clientWidth
                  }px`;
                  const top = `${
                    state.pageHeight / 2 - clientWidth / 2 - clientWidth
                  }px`;
                  dispatch({
                    type: 'STORE_FRAME',
                    payload: {
                      type: 'frame',
                      name: last_element,
                      frames: true,
                      zIndex: 0,
                      frame: createFrame(`400px`, `400px`, top, left),
                      images: [
                        {
                          className: 'gridDiv',
                          selectedClassName: 'gridDiv selectedGridImg',
                          moveableClassName:
                            'moveableImgFullPage gridDiv selectedGridImg',
                          id: '',
                          src: null,
                          selected: false,
                          opacity: 1,
                          brightness: 100,
                          contrast: 100,
                          saturate: 100,
                          blur: 0,
                          padding: 0,
                          isflipX: false,
                          isflipY: false,
                          frame: createFrame(`100px`, `100px`),
                          imageHeight: 0,
                          imageWidth: 0,
                        },
                      ],
                    },
                  });
                }
              } else {
                let iconDesc;
                let temp = [];
                let newColor = props.colors.filter((el) => {
                  if (el.color[0] === '#') {
                    if (!temp.includes(el.color)) {
                      temp.push(el.color);
                      return el;
                    }
                  }
                });
                const left = `${state.pageWidth / 2 - 150 / 2}px`;
                const top = `${state.pageHeight / 2 - 150 / 2}px`;
                dispatch({
                  type: 'STORE_ELEMENT',
                  payload: {
                    type: 'svg',
                    src: !element.src ? iconDesc.svg.url : element.src,
                    description: !props.description
                      ? iconDesc.description
                      : props.description,
                    frame: createFrame('150px', '150px', top, left),
                    opacity: 1,
                    brightness: 100,
                    contrast: 100,
                    saturate: 100,
                    blur: 0,
                    padding: 0,
                    isflipX: false,
                    isflipY: false,
                    lock: false,
                    colors: !!props.colors ? newColor : [],
                    selectedColor: '',
                  },
                });
              }
            } else {
              dispatch({
                type: 'STORE_ELEMENT',
                payload: {
                  type: 'text',
                  textArray: [],
                  frame: createFrame(`${props.width}px`, `${props.width}px`),
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
          } else if (state.sidebarType === 'Background') {
            dispatch({
              type: 'SET_BACKGROUND_IMAGE',
              payload: props.BackgroundImage.src,
            });
          } else {
            if (element.src) {
              if (!!props.isSVG) {
                let temp = [];
                let newColor = props.colors.filter((el) => {
                  if (el.color[0] === '#') {
                    if (!temp.includes(el.color)) {
                      temp.push(el.color);
                      return el;
                    }
                  }
                });
                const left = `${state.pageWidth / 2 - 150 / 2}px`;
                const top = `${state.pageHeight / 2 - 150 / 2}px`;
                dispatch({
                  type: 'STORE_ELEMENT',
                  payload: {
                    type: 'svg',
                    src: element.src,
                    description: props.description,
                    frame: createFrame('150px', '150px', top, left),
                    opacity: 1,
                    brightness: 100,
                    contrast: 100,
                    saturate: 100,
                    blur: 0,
                    padding: 0,
                    isflipX: false,
                    isflipY: false,
                    lock: false,
                    colors: !!props.colors ? newColor : [],
                    selectedColor: '',
                  },
                });
              } else if (state.sidebarType !== 'Templates') {
                const left = `${state.pageWidth / 2 - 100}px`;
                const top = `${state.pageHeight / 2 - 100}px`;
                dispatch({
                  type: 'STORE_ELEMENT',
                  payload: {
                    type: 'img',
                    src: element.src,
                    frame: createFrame('200px', '200px', top, left),
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
              }
            } else {
              // dispatch({
              //   type: 'STORE_ELEMENT',
              //   payload: {
              //     type: 'text',
              //     text: element.text,
              //     textArray: [],
              //     frame: createFrame('150px', '150px'),
              //     isBold: false,
              //     isItalic: false,
              //     isUnderline: false,
              //     isUppercase: false,
              //     isAlignTop: false,
              //     isAlignBottom: false,
              //     isAlignCenter: false,
              //     isColorPicker: false,
              //     fontSize: 18,
              //     fontFamily: 'open sans',
              //     lineHeight: 2,
              //     letterSpacing: 1,
              //     color: '#111111',
              //     textAlign: state.alignment.types[state.alignment.indexNo],
              //     list: 0,
              //     opacity: 1,
              //   },
              // });
            }
          }
        }
      }
      if (state.sidebarType != 'Templates') {
        dispatch({
          type: 'SAVE_HISTORY',
        });
      }
    },
  });

  // const updateDesign = () => {    Shaheer code-refactoring-removing-unused-variables
  //   domtoimage
  //     .toJpeg(document.getElementById(`page${state.selectedPage.pageId}`), {
  //       quality: 0.95,
  //     })
  //     .then(function(dataUrl) {
  //       const editDesign = {
  //         title: state.selectedPage.title,
  //         description: state.selectedPage.description,
  //         user_id: JSON.parse(localStorage.getItem('userData')).id,
  //         image: dataUrl,
  //         styles: {
  //           page: state.selectedPage,
  //         },
  //       };
  //       API.put(
  //         `${process.env.REACT_APP_BASE_URL}${updateDesignUrl(
  //           state.loadedDesignId,
  //         )}`,
  //         editDesign,
  //       ).then(result => {});
  //     });
  // };

  const _crop = (e) => {
    dispatch({ type: 'SAVE_REF', payload: cropper });
  };

  // const onClickDeleteBtn = e => { Shaheer code-refactoring-removing-unused-variables
  //   e.stopPropagation();
  //   dispatch({ type: 'DELETE_PAGE', payload: e.currentTarget.id });
  // };

  // const delBtn = () => {   Shaheer code-refactoring-removing-unused-variables
  //   if (state.pages.length !== 1) {
  //     const delBtn = (
  //       <Delete className="iconBtns" id={pageId} onClick={onClickDeleteBtn} />
  //     );
  //     return delBtn;
  //   } else {
  //     return false;
  //   }
  // };

  // const onClickCopy = e => {   Shaheer code-refactoring-removing-unused-variables
  //   dispatch({ type: 'COPY_PAGE', payload: e.currentTarget.id });
  // };

  // const onChangeText = e => {  Shaheer code-refactoring-removing-unused-variables
  //   dispatch({
  //     type: 'EDIT_TEXT',
  //     payload: { value: e.target.value, width: e.currentTarget.clientWidth },
  //   });
  // };

  const selectedPage = (e) => {
    e.stopPropagation();
    if (state.selectedElement != null) {
      if (
        state.pages[state.selectedPage.pageId].elements[
          state.pages[state.selectedPage.pageId].elements.findIndex(
            (elem) => elem.id === state.selectedElement.id,
          )
        ].cropImage !== true
      ) {
        if (state.selectedElement?.type === 'grid') {
          dispatch({
            type: 'CANCEL_GRID',
          });
        } else if (
          state.selectedElement?.type === 'frame' &&
          !state.doubleClick
        ) {
          dispatch({
            type: 'CANCEL_FRAME',
          });
        }
        dispatch({
          type: 'SET_SELECTED_PAGE',
          payload: props.page,
        });
        dispatch({ type: 'REMOVE_SELECTION' });
        setEditable(true);
      }
    } else {
      // if(!state.selectedPage.backgroundImage.length && !state.selectedPage.pageColor){
      //   let color = '#ffffff';
      //   dispatch({ type: 'SET_PAGE_COLOR', payload: color });
      // }
      dispatch({
        type: 'SET_SELECTED_PAGE',
        payload: props.page,
      });
    }
    dispatch({
      type: 'SET_SHORTCUT_KEY',
      payload: true,
    });
    checkAndRemoveEmptyTexts(state.pages, state.selectedPage.pageId);
    switchSidebarTab(state.sidebarType, state.showTextBar);
  };
  const switchSidebarTab = (sidebarType, showTextBar) => {
    if (sidebarType === 'IconColorBar') {
      dispatch({ type: 'SHOW_SIDEBAR', payload: 'Icons' });
    }
    if (showTextBar) {
      dispatch({ type: 'SHOW_SIDEBAR', payload: 'Text' });
    }
    if (sidebarType === 'balance' || sidebarType === 'effects') {
      dispatch({ type: 'SHOW_SIDEBAR', payload: 'Photos' });
    }
  };
  const checkAndRemoveEmptyTexts = (pages, selectedPageId) => {
    let selectedId = [];
    pages[selectedPageId].elements.forEach((el) => {
      if (el.type === 'text') {
        if (
          document.getElementById(el.id).innerText === '' ||
          document.getElementById(el.id).innerText === '\n'
        ) {
          selectedId.push({ id: el.id });
        }
      }
    });
    dispatch({
      type: 'DELETE_EMPTY_TEXT',
      payload: selectedId,
    });
  };
  // const selecteTextElement = element => {  Shaheer code-refactoring-removing-unused-variables
  //   let elWidth = document.getElementById(element.id).offsetWidth;
  //   let elHeight = document.getElementById(element.id).offsetHeight;
  //   document.getElementById(`${element.id}t`).style.width = elWidth + 'px';
  //   document.getElementById(`${element.id}t`).style.height = elHeight + 'px';

  //   document
  //     .querySelectorAll(`.${element.id}resizable .resizer`)
  //     .forEach(el => {
  //       el.style.display = 'block';
  //     });
  //   document.getElementById(element.id).style.border = '1px solid #00d9e0';
  //   document.getElementById(`${element.id}theader`).style.display = 'block';
  //   document.getElementById(`${element.id}trot`).style.display = 'block';
  // };
  // const updateTextState = (elementId, left, top) => {  Shaheer code-refactoring-removing-unused-variables
  //   dispatch({
  //     type: 'ON_DRAG_TEXT',
  //     payload: { left, top, elementId },
  //   });
  // };
  // const updateTextRotation = ( Shaheer code-refactoring-removing-unused-variables
  //   elementId,
  //   width,
  //   height,
  //   left,
  //   top,
  //   transform,
  // ) => {
  //   dispatch({
  //     type: 'ON_Rotate_TEXT',
  //     payload: { elementId, width, height, left, top, transform },
  //   });
  // };
  // const getPrevBounds = elId => { Shaheer code-refactoring-removing-unused-variables
  //   const boundingClient = state.pages[
  //     state.selectedPage.pageId
  //   ].elements.findIndex(el => el.id === elId);
  //   let pagesBounds = state.pages;
  //   let xBound = pagesBounds[state.selectedPage.pageId].elements[0].xBound;
  //   let yBound = pagesBounds[state.selectedPage.pageId].elements[0].yBound;
  //   let rotBound = pagesBounds[state.selectedPage.pageId].elements[0].rotBound;
  //   return { xBound, yBound, rotBound };
  // };
  const onClickElement = (e, element) => {
    dispatch({
      type: 'SET_SHORTCUT_KEY',
      payload: true,
    });
    e.stopPropagation();
    dispatch({ type: 'SET_UNSELECT_ALL_PAGES' });
    if (element.type === 'text') {
      if (props.EditableP) {
        props.setEditableP(!props.EditableP);
      }
      if (Editable) {
        setEditable(!Editable);
        dispatch({
          type: 'EDIT_MODE',
          payload: null,
        });
      }
    }
    if (element.type !== 'text') {
      setEditable(true);
    }
    if (
      element.type !== 'grid' ||
      element.type !== 'svg' ||
      element.type !== 'img'
    ) {
      dispatch({
        type: 'SHOW_TEXT_BAR',
        payload: true,
      });
      if (element.type === 'text') {
        dispatch({ type: 'SHOW_SIDEBAR', payload: 'Text' });
        dispatch({
          type: 'SHOW_TEXT_BAR',
          payload: true,
        });
      }
      if (
        element.type === 'img' ||
        element.type === 'svg' ||
        element.type === 'frame'
      ) {
        dispatch({
          type: 'SHOW_TEXT_BAR',
          payload: false,
        });
      }
      if (state.selectedPage.created) {
        let frame = createFrame(
          `${element.frame.properties.width}px`,
          `${element.frame.properties.height}px`,
        );
        frame.properties.left = element.frame.properties.left;
        frame.properties.top = element.frame.properties.top;
        frame.properties.scale[0] = element.frame.properties.scale[0];
        frame.properties.scale[1] = element.frame.properties.scale[1];
        frame.properties.translate[0] = element.frame.properties.translate[0];
        frame.properties.translate[1] = element.frame.properties.translate[1];
        frame.properties.translate[2] = element.frame.properties.translate[2];
        frame.properties.transform.rotate =
          element.frame.properties.transform.rotate;
        element.frame = frame;
      }
      dispatch({
        type: 'SET_SELECTED_ELEMENT_BTN',
        payload: element,
      });

      dispatch({
        type: 'SET_SELECTED_ELEMENT',
        payload: element,
      });
      dispatch({
        type: 'SET_SELECTED_FRAME',
        payload: state.doubleClick ? element.images[0].frame : element.frame,
      });

      if (state.currentDesign !== null) {
        dispatch({
          type: 'SET_SELECTED_ELEMENT',
          payload: element,
        });
        dispatch({
          type: 'SET_SELECTED_FRAME',
          payload: state.doubleClick ? element.images[0].frame : element.frame,
        });
        if (state.currentDesign !== null) {
          dispatch({
            type: 'UPDATE_DESIGN',
            payload: element,
          });
        }
      }
    }
  };

  const handleChange = (e, el) => {
    const element = el;
    if (element.type === 'text') {
      dispatch({ type: 'REMOVE_SELECTION' });
      dispatch({
        type: 'SET_SHORTCUT_KEY',
        payload: false,
      });
      // setIsEditing(false);
      dispatch({
        type: 'EDIT_TEXT',
        payload: {
          value: e.currentTarget.innerHTML,
          id: el.id,
        },
      });
    }
  };

  // const sanitizeConf = { Shaheer code-refactoring-removing-unused-variables
  //   allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'h1'],
  //   allowedAttributes: { a: ['href'] },
  // };

  // const sanitize = () => { Shaheer code-refactoring-removing-unused-variables
  //   setHtml(html, sanitizeConf);
  // };

  const onDoubleClick = () => {
    // dispatch({
    //   type: 'SET_SHORTCUT_KEY',
    //   payload: false,
    // });
    // setEditable(!Editable);
    // if (Editable)
    //   dispatch({
    //     type: 'EDIT_MODE',
    //     payload: null,
    //   });
  };
  // const onChangeTextFrame = (e, el_id, width, height, left, top, font, rot) => {  Shaheer code-refactoring-removing-unused-variables
  //   if (document.getElementById(el_id)) {
  //     dispatch({
  //       type: 'ON_RESIZE_TEXT',
  //       payload: { el_id, width, height, left, top, font, rot },
  //     });
  //   }
  // };

  // const setBoundingXY = (elId, x, y, rot) => {  Shaheer code-refactoring-removing-unused-variables
  //   dispatch({
  //     type: 'SET_XY_BOUNDS',
  //     payload: { elId, x, y, rot },
  //   });
  // };
  const onMouseUp = (e, element) => {
    if (element.type === 'text') {
      setEditable(false);
      document
        .getElementById(element.id)
        .setAttribute('contenteditable', 'true');
      if (state.target?.id === element.id && !state.isDragged) {
        setTimeout(function () {
          document.getElementById(element.id).focus();
        }, 0);
        // let node = document.getElementById(element.id); Shaheer code-refactoring-removing-unused-variables
      } else {
        dispatch({ type: 'IS_DRAGGED', payload: false });
        document
          .getElementById(element.id)
          .setAttribute('contenteditable', 'false');
        setEditable(true);
      }
    }
  };
  // const onMouseDown = (e, element) => {
  // document.getElementById(element.id).setAttribute("contenteditable", "true");
  // };

  document.onkeydown = function (e) {
    //copy paste key for mac
    // if(e.metaKey && e.which === 86 && state.selectedElement){
    //   return false;
    // }
    // if(e.metaKey && e.which === 67 && state.selectedElement){
    //   return false;
    // }
    //to drag and copy element
    if (e.which === 18 && !e.ctrlKey) {
      setIsKeyPressed(true);
    }
    //to disable chrome shortcut keys and override them with our own
    if (e.ctrlKey && e.which === 68 && state.selectedElement) {
      return false;
    } else if (
      e.ctrlKey &&
      e.which === 85 &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      return false;
    } else if (
      e.ctrlKey &&
      e.shiftKey &&
      e.which === 82 &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      return false;
    } else if (
      e.ctrlKey &&
      e.shiftKey &&
      e.which === 67 &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      return false;
    } else if (e.which === 187 && e.ctrlKey) {
      return false;
    } else if (e.which === 189 && e.ctrlKey) {
      return false;
    } else if (
      e.ctrlKey &&
      e.which === 86 &&
      state.selectedElement &&
      document.activeElement.tagName === 'ARTICLE'
    ) {
      return false;
    }
  };

  //shortkeys for mac
  //copy element key for mac
  useHotkeys('command+c', (e) => {
    e.preventDefault();
    setMacCopyKey(true);
  });
  //paste element key for mac
  useHotkeys('command+v', (e) => {
    e.preventDefault();
    setMacPasteKey(true);
  });
  //bold text key for mac
  useHotkeys('command+b', (e) => {
    e.preventDefault();
    setMacBoldKey(true);
  });
  //make text italic key for mac
  useHotkeys('command+i', (e) => {
    e.preventDefault();
    setMacItalicKey(true);
  });
  //Underline text element key for mac
  useHotkeys('command+u', (e) => {
    e.preventDefault();
    setMacUnderLineKey(true);
  });
  //increase text font size key for mac
  useHotkeys('command+shift+.', (e) => {
    e.preventDefault();
    setMacFontIncreaseKey(true);
  });
  //decrease text font size key for mac
  useHotkeys('command+shift+,', (e) => {
    e.preventDefault();
    setMacFontDecreaseKey(true);
  });
  //copy text style key for mac
  useHotkeys('command+alt+c', (e) => {
    e.preventDefault();
    setmacFontStyleCopyKey(true);
  });
  //paste text style key for mac
  useHotkeys('command+alt+v', (e) => {
    e.preventDefault();
    setmacFontStylePasteKey(true);
  });
  //convert text to uppercase key for mac
  useHotkeys('command+shift+k', (e) => {
    e.preventDefault();
    setMacTextUppercaseKey(true);
  });
  //align text to the left key for mac
  useHotkeys('command+shift+l', (e) => {
    e.preventDefault();
    setMacTextAlignLeftKey(true);
  });
  //align text to right key for mac
  useHotkeys('command+shift+r', (e) => {
    e.preventDefault();
    setMacTextAlignRightKey(true);
  });
  //align text to center key for mac
  useHotkeys('command+shift+c', (e) => {
    e.preventDefault();
    setMacTextAlignCenterKey(true);
  });
  //duplicate element key for mac
  useHotkeys('command+d', (e) => {
    e.preventDefault();
    setMacDuplicateKey(true);
  });
  //send elements backward key for mac
  useHotkeys('command+[', (e) => {
    e.preventDefault();
    setMacBackwardKey(true);
  });
  //send elements forward key for mac
  useHotkeys('command+]', (e) => {
    e.preventDefault();
    setMacForwardKey(true);
  });
  //send elements to back key for mac
  useHotkeys('command+alt+[', (e) => {
    e.preventDefault();
    setMacBackKey(true);
  });
  //send elements to front key for mac
  useHotkeys('command+alt+]', (e) => {
    e.preventDefault();
    setMacFrontKey(true);
  });
  //Zoom in on your template key for mac
  useHotkeys('command+=', (e) => {
    e.preventDefault();
    setMacZoomInKey(true);
  });
  //Zoom out on your template key for mac
  useHotkeys('command+-', (e) => {
    e.preventDefault();
    setMacZoomOutKey(true);
  });
  //full zoom of page shortcut key for mac
  useHotkeys('command+0', (e) => {
    e.preventDefault();
    setMacFullZoomKey(true);
  });
  //Zoom to fit the screen key for mac
  useHotkeys('command+alt+0', (e) => {
    e.preventDefault();
    setMacFitToScreenKey(true);
  });
  //undo key for mac
  useHotkeys('command+z', (e) => {
    e.preventDefault();

    dispatch({
      type: 'SET_SELECTED_EDITOR_BTN',
      payload: null,
    });
    dispatch({
      type: 'UNDO',
    });
  });
  //redo key for mac
  useHotkeys('command+shift+z', (e) => {
    e.preventDefault();

    dispatch({
      type: 'SET_SELECTED_EDITOR_BTN',
      payload: null,
    });
    dispatch({
      type: 'REDO',
    });
  });

  //short keys for windows
  document.onkeyup = (e) => {
    if (state?.selectedElement?.type === 'frame' && state?.doubleClick === true)
      return false;
    //mac copy key
    if (
      macCopyKey &&
      state.isShortkey &&
      state.selectedElement &&
      document.activeElement.tagName !== 'ARTICLE'
    ) {
      dispatch({
        type: 'SET_COPIED_ELEMENT',
        payload: true,
      });
      setMacCopyKey(false);
    }
    //mac paste key
    if (
      macPasteKey &&
      state.isShortkey &&
      state.selectedElement &&
      document.activeElement.tagName !== 'ARTICLE' &&
      state.isElementCopied
    ) {
      dispatch({
        type: 'SET_COPIED_ELEMENT',
        payload: false,
      });
      dispatch({
        type: 'SET_SELECTED_EDITOR_BTN',
        payload: null,
      });
      dispatch({
        type: 'DUPLICATE_ELEMENT',
      });
      setMacPasteKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac bold key
    if (
      macBoldKey &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      dispatch({
        type: 'BOLD_TEXT',
        payload: state.selectedElement ? !state.selectedElement.isBold : false,
      });
      setMacBoldKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac italic key
    if (
      macItalicKey &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      dispatch({
        type: 'ITALIC_TEXT',
        payload: state.selectedElement
          ? !state.selectedElement.isItalic
          : false,
      });
      setMacItalicKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac underline key
    if (
      macUnderLineKey &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      dispatch({
        type: 'UNDERLINE_TEXT',
        payload: state.selectedElement
          ? !state.selectedElement.isUnderline
          : false,
      });
      setMacUnderLineKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac font increase key
    if (
      macFontIncreaseKey &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      let fontSize = parseInt(state.selectedElement.fontSize, 10);
      dispatch({ type: 'REMOVE_SELECTIONN' });
      dispatch({
        type: 'SET_TARGET_NULL',
      });
      dispatch({
        type: 'SET_FONT_SCALE',
        payload: parseInt(fontSize + 1),
      });
      dispatch({
        type: 'SET_FONTSIZE',
        payload: parseInt(fontSize + 1),
      });
      setMacFontIncreaseKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac font decrease key
    if (
      macFontDecreaseKey &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      let fontSize = parseInt(state.selectedElement.fontSize, 10);
      dispatch({ type: 'REMOVE_SELECTIONN' });
      dispatch({
        type: 'SET_TARGET_NULL',
      });
      dispatch({
        type: 'SET_FONTSIZE',
        payload: parseInt(fontSize - 1),
      });
      setMacFontDecreaseKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac Font style copy key
    if (
      macFontStyleCopyKey &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      dispatch({
        type: 'COPY_TEXT_STYLE',
        payload: { element: state.selectedElement, action: 'COPY_STYLE' },
      });
      setmacFontStyleCopyKey(false);
    }
    //mac font style paste key
    if (
      macFontStylePasteKey &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      dispatch({
        type: 'PASTE_TEXT_STYLE',
        payload: { element: state.selectedElement, action: 'PASTE_STYLE' },
      });
      setmacFontStylePasteKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac convert text to uppercase key
    if (
      macTextUppercaseKey &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      dispatch({
        type: 'UPPERCASE_TEXT',
        payload: state.selectedElement
          ? !state.selectedElement.isUppercase
          : false,
      });
      setMacTextUppercaseKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac align text to left key
    if (
      macTextAlignLeftKey &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      let direction = 2;
      dispatch({
        type: 'ALIGN_TEXT',
        payload: direction,
      });
      dispatch({
        type: 'SET_ALIGNMENTV',
        payload: false,
      });
      setMacTextAlignLeftKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac align text right key
    if (
      macTextAlignRightKey &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      let direction = 1;
      dispatch({
        type: 'ALIGN_TEXT',
        payload: direction,
      });
      dispatch({
        type: 'SET_ALIGNMENTV',
        payload: false,
      });
      setMacTextAlignRightKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac align text center key
    if (
      macTextAlignCenterKey &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      let direction = 0;
      dispatch({
        type: 'ALIGN_TEXT',
        payload: direction,
      });
      dispatch({
        type: 'SET_ALIGNMENTV',
        payload: false,
      });
      setMacTextAlignCenterKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac duplicate element key
    if (macDuplicateKey && state.selectedElement) {
      dispatch({
        type: 'SET_SELECTED_EDITOR_BTN',
        payload: null,
      });
      dispatch({
        type: 'DUPLICATE_ELEMENT',
      });
      setMacDuplicateKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac element backward key
    if (macBackwardKey && state.selectedElement) {
      let direction = 'backward';
      dispatch({ type: 'OBJECT_POSITION', payload: direction });
      setMacBackwardKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac element forward key
    if (macForwardKey && state.selectedElement) {
      let direction = 'forward';
      dispatch({ type: 'OBJECT_POSITION', payload: direction });
      setMacForwardKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac element back key
    if (macBackKey && state.selectedElement) {
      let direction = 'back';
      dispatch({ type: 'OBJECT_POSITION', payload: direction });
      setMacBackKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac element front key
    if (macFrontKey && state.selectedElement) {
      let direction = 'front';
      dispatch({ type: 'OBJECT_POSITION', payload: direction });
      setMacFrontKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //zoom in key mac
    if (macZoomInKey) {
      let pageScale = parseFloat(state.pages[0].scaleX);
      dispatch({ type: 'SET_ZOOM', payload: pageScale + 0.25 });
      dispatch({
        type: 'SET_ZOOM_PERCENTAGE',
        payload: (pageScale + 0.25) * 100,
      });
      dispatch({
        type: 'SET_TARGET_NULL',
      });
      setMacZoomInKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //zoom out mac
    if (macZoomOutKey) {
      let pageScale = parseFloat(state.pages[0].scaleX);
      if (pageScale - 0.25 > 0) {
        dispatch({ type: 'SET_ZOOM', payload: pageScale - 0.25 });
        dispatch({
          type: 'SET_ZOOM_PERCENTAGE',
          payload: (pageScale - 0.25) * 100,
        });
        setMacZoomOutKey(false);
      }
    }
    //mac full zoom key
    if (macFullZoomKey) {
      let pageScale = parseFloat(state.pages[0].scaleX);
      dispatch({ type: 'SET_ZOOM', payload: pageScale + 1.5 });
      dispatch({
        type: 'SET_ZOOM_PERCENTAGE',
        payload: (pageScale + 1.5) * 100,
      });
      setMacFullZoomKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //mac fit to screen zoom key
    if (macFitToScreenKey) {
      if (type === 'Template') {
        let height, width;
        if (window.screen.width * 0.6 < props.pWidth) {
          width = (window.screen.width * 0.6) / props.pWidth;
        } else {
          width = props.pWidth / (window.screen.width * 0.6);
        }
        if (window.screen.height * 0.6 < props.pHieght) {
          height = (window.screen.height * 0.6) / props.pHieght;
        } else {
          height = props.pHieght / (window.screen.height * 0.6);
        }
        if (width < height) {
          dispatch({
            type: 'SET_ZOOM',
            payload: width,
          });
          props.ZoomPercentageSet(parseInt(width * 100));
          dispatch({
            type: 'SET_ZOOM_PERCENTAGE',
            payload: parseInt(width * 100),
          });
        } else {
          dispatch({
            type: 'SET_ZOOM',
            payload: height,
          });
          props.ZoomPercentageSet(parseInt(height * 100));
          dispatch({
            type: 'SET_ZOOM_PERCENTAGE',
            payload: parseInt(height * 100),
          });
        }
      }
      if (type === 'Design') {
        let designscale =
          props.transformDesign && parseFloat(props.transformDesign);
        props.ZoomPercentageSet(parseInt(designscale * 100));
        dispatch({
          type: 'SET_ZOOM_PERCENTAGE',
          payload: parseInt(designscale * 100),
        });
      }
      if (props.inDesignTemplate) {
        props.ZoomPercentageSet(parseInt(props.newScale * 100));
        dispatch({
          type: 'SET_ZOOM_PERCENTAGE',
          payload: parseInt(props.newScale * 100),
        });
      }
      setMacFitToScreenKey(false);
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //copy text style in windows
    if (
      e.ctrlKey &&
      e.altKey &&
      e.which === 67 &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      dispatch({
        type: 'COPY_TEXT_STYLE',
        payload: { element: state.selectedElement, action: 'COPY_STYLE' },
      });
    }
    //paste text style in windows
    if (
      e.ctrlKey &&
      e.altKey &&
      e.which === 86 &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      dispatch({
        type: 'PASTE_TEXT_STYLE',
        payload: { element: state.selectedElement, action: 'PASTE_STYLE' },
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //to drag and copy element in windows
    if (e.which === 18 && !e.ctrlKey) {
      setIsKeyPressed(false);
    }
    //element copy shortcut key in windows
    if (
      !e.shiftKey &&
      e.ctrlKey &&
      e.which === 67 &&
      state.isShortkey &&
      state.selectedElement &&
      document.activeElement.tagName !== 'ARTICLE' &&
      !e.altKey
    ) {
      dispatch({
        type: 'SET_COPIED_ELEMENT',
        payload: true,
      });
    }
    //element paste shortcut key in windows
    if (
      !e.shiftKey &&
      e.ctrlKey &&
      e.which === 86 &&
      state.selectedElement &&
      document.activeElement.tagName === 'ARTICLE'
    ) {
      let newTextDom = '';
      let old_element = cloneDeep(state.selectedElement);
      let copyPaste = new Promise((onSuccess) => {
        const element = state.selectedElement;
        navigator.clipboard.readText().then((copiedText) => {
          var sel, range;
          if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
              range = sel.getRangeAt(0);
              range.deleteContents();
              let rangeinsert = new Promise((onSuccess) => {
                range.insertNode(document.createTextNode(copiedText));
                onSuccess(true);
              });
              rangeinsert.then((result) => {
                newTextDom = cloneDeep(
                  document.getElementById(element.id).innerHTML,
                );
                // let delEl = new Promise(onSuccess => {
                //   dispatch({
                //     type: 'DELETE_ELEMENT',
                //   });
                //   onSuccess(true);
                // });
                // delEl.then(result => {
                //   let afterAdd = new Promise(onSuccess => {
                //     dispatch({
                //       type: 'ADD_NEW_ELEMENT_IN_ARRAY',
                //       payload: old_element,
                //     });
                //     onSuccess(true);
                //   });
                let setTargetNull = new Promise((onSuccess) => {
                  dispatch({
                    type: 'SET_TARGET_NULL',
                  });
                  onSuccess(true);
                });
                setTargetNull.then((result) => {
                  let addText = new Promise((onSuccess) => {
                    dispatch({
                      type: 'EDIT_TEXT',
                      payload: {
                        value: newTextDom,
                        id: element.id,
                      },
                    });
                    onSuccess(true);
                  });
                  addText.then((result) => {
                    dispatch({
                      type: 'SET_TARGET',
                      payload: {
                        id: state.selectedElement.id,
                      },
                    });
                  });
                });
                // });
              });
              range.detach();
              window.getSelection().empty();
            }
          }
        });
        onSuccess(true);
      });
      copyPaste.then((result) => {
        dispatch({
          type: 'SAVE_HISTORY',
        });
      });
    }
    if (
      !e.shiftKey &&
      e.ctrlKey &&
      e.which === 86 &&
      state.isShortkey &&
      state.selectedElement &&
      document.activeElement.tagName !== 'ARTICLE' &&
      state.isElementCopied &&
      !e.altKey
    ) {
      dispatch({
        type: 'SET_COPIED_ELEMENT',
        payload: false,
      });
      dispatch({
        type: 'SET_SELECTED_EDITOR_BTN',
        payload: null,
      });
      dispatch({
        type: 'DUPLICATE_ELEMENT',
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //Bold text shortcut key in windows
    if (
      e.ctrlKey &&
      e.which === 66 &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      dispatch({
        type: 'BOLD_TEXT',
        payload: state.selectedElement ? !state.selectedElement.isBold : false,
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //italic text shortcut key in windows
    else if (
      e.ctrlKey &&
      e.which === 73 &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      dispatch({
        type: 'ITALIC_TEXT',
        payload: state.selectedElement
          ? !state.selectedElement.isItalic
          : false,
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //increase font size shortcut key in windows
    else if (
      e.ctrlKey &&
      e.shiftKey &&
      e.which === 190 &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      let fontSize = parseInt(state.selectedElement.fontSize, 10);
      dispatch({ type: 'REMOVE_SELECTIONN' });
      dispatch({
        type: 'SET_TARGET_NULL',
      });
      dispatch({
        type: 'SET_FONT_SCALE',
        payload: parseInt(fontSize + 1),
      });
      dispatch({
        type: 'SET_FONTSIZE',
        payload: parseInt(fontSize + 1),
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //decrease font size shortcut key in windows
    else if (
      e.ctrlKey &&
      e.shiftKey &&
      e.which === 188 &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      let fontSize = parseInt(state.selectedElement.fontSize, 10);
      dispatch({ type: 'REMOVE_SELECTIONN' });
      dispatch({
        type: 'SET_TARGET_NULL',
      });
      dispatch({
        type: 'SET_FONTSIZE',
        payload: parseInt(fontSize - 1),
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //uppercase font shortcut key in windows
    else if (
      e.ctrlKey &&
      e.shiftKey &&
      e.which === 75 &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      dispatch({
        type: 'UPPERCASE_TEXT',
        payload: state.selectedElement
          ? !state.selectedElement.isUppercase
          : false,
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //underline font shortcut key in windows
    else if (
      e.ctrlKey &&
      e.which === 85 &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      dispatch({
        type: 'UNDERLINE_TEXT',
        payload: state.selectedElement
          ? !state.selectedElement.isUnderline
          : false,
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //align text left shortcut key in windows
    else if (
      e.ctrlKey &&
      e.shiftKey &&
      e.which === 76 &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      let direction = 2;
      dispatch({
        type: 'ALIGN_TEXT',
        payload: direction,
      });
      dispatch({
        type: 'SET_ALIGNMENTV',
        payload: false,
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //align text right shortcut key in windows
    else if (
      e.ctrlKey &&
      e.shiftKey &&
      e.which === 82 &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      let direction = 1;
      dispatch({
        type: 'ALIGN_TEXT',
        payload: direction,
      });
      dispatch({
        type: 'SET_ALIGNMENTV',
        payload: false,
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //align text center shortcut key in windows
    else if (
      e.ctrlKey &&
      e.shiftKey &&
      e.which === 67 &&
      state.selectedElement &&
      state.selectedElement.type === 'text'
    ) {
      let direction = 0;
      dispatch({
        type: 'ALIGN_TEXT',
        payload: direction,
      });
      dispatch({
        type: 'SET_ALIGNMENTV',
        payload: false,
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //duplicate element shortcut key in windows
    else if (e.ctrlKey && e.which === 68 && state.selectedElement) {
      dispatch({
        type: 'SET_SELECTED_EDITOR_BTN',
        payload: null,
      });
      dispatch({
        type: 'DUPLICATE_ELEMENT',
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //select page shortcut key in windows
    else if (e.which === 27 && state.selectedElement) {
      selectedPage(e);
    }
    //delete element shortcut key in windwos
    else if (
      (e.which === 46 || e.which === 8) &&
      (state.selectedElement || state.targets) &&
      state.isShortkey &&
      document.activeElement.tagName !== 'ARTICLE'
    ) {
      dispatch({
        type: 'SET_SELECTED_EDITOR_BTN',
        payload: null,
      });
      dispatch({
        type: 'DELETE_ELEMENT',
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //move element backward shortcut key in windows
    else if (
      e.which === 219 &&
      e.ctrlKey &&
      !e.altKey &&
      state.selectedElement
    ) {
      let direction = 'backward';
      dispatch({ type: 'OBJECT_POSITION', payload: direction });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //move element forward shortcut key windows
    else if (
      e.which === 221 &&
      e.ctrlKey &&
      !e.altKey &&
      state.selectedElement
    ) {
      let direction = 'forward';
      dispatch({ type: 'OBJECT_POSITION', payload: direction });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //move element back shortcut key in windows
    else if (
      e.which === 219 &&
      e.altKey &&
      e.ctrlKey &&
      state.selectedElement
    ) {
      let direction = 'back';
      dispatch({ type: 'OBJECT_POSITION', payload: direction });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //move element front shortcut key in windows
    else if (
      e.which === 221 &&
      e.altKey &&
      e.ctrlKey &&
      state.selectedElement
    ) {
      let direction = 'front';
      dispatch({ type: 'OBJECT_POSITION', payload: direction });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //increase zoom of page shortcut key in windows
    else if (e.which === 187 && (e.ctrlKey || e.metaKey)) {
      let pageScale = parseFloat(state.pages[0].scaleX);
      dispatch({ type: 'SET_ZOOM', payload: pageScale + 0.25 });
      dispatch({
        type: 'SET_ZOOM_PERCENTAGE',
        payload: (pageScale + 0.25) * 100,
      });
      dispatch({
        type: 'SET_TARGET_NULL',
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //decrease zoom of page shortcut key in windows
    else if (e.which === 189 && (e.ctrlKey || e.metaKey)) {
      let pageScale = parseFloat(state.pages[0].scaleX);
      if (pageScale - 0.25 > 0) {
        dispatch({ type: 'SET_ZOOM', payload: pageScale - 0.25 });
        dispatch({
          type: 'SET_ZOOM_PERCENTAGE',
          payload: (pageScale - 0.25) * 100,
        });
        dispatch({
          type: 'SET_TARGET_NULL',
        });
        dispatch({
          type: 'SAVE_HISTORY',
        });
      }
    }
    //full zoom of page shortcut key in windows
    else if (e.which === 48 && (e.ctrlKey || e.metaKey) && !e.altKey) {
      let pageScale = parseFloat(state.pages[0].scaleX);
      dispatch({ type: 'SET_ZOOM', payload: pageScale + 1.5 });
      dispatch({
        type: 'SET_ZOOM_PERCENTAGE',
        payload: (pageScale + 1.5) * 100,
      });
      dispatch({
        type: 'SET_TARGET_NULL',
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //fit to screen zoom of page shortcut key in windows
    else if (e.which === 48 && e.altKey && (e.ctrlKey || e.metaKey)) {
      if (type === 'Template') {
        let height, width;
        if (window.screen.width * 0.6 < props.pWidth) {
          width = (window.screen.width * 0.6) / props.pWidth;
        } else {
          width = props.pWidth / (window.screen.width * 0.6);
        }
        if (window.screen.height * 0.6 < props.pHieght) {
          height = (window.screen.height * 0.6) / props.pHieght;
        } else {
          height = props.pHieght / (window.screen.height * 0.6);
        }
        if (width < height) {
          dispatch({
            type: 'SET_ZOOM',
            payload: width,
          });
          props.ZoomPercentageSet(parseInt(width * 100));
          dispatch({
            type: 'SET_ZOOM_PERCENTAGE',
            payload: parseInt(width * 100),
          });
          dispatch({
            type: 'SET_TARGET_NULL',
          });
        } else {
          dispatch({
            type: 'SET_ZOOM',
            payload: height,
          });
          props.ZoomPercentageSet(parseInt(height * 100));
          dispatch({
            type: 'SET_ZOOM_PERCENTAGE',
            payload: parseInt(height * 100),
          });
          dispatch({
            type: 'SET_TARGET_NULL',
          });
        }
      }
      if (type === 'Design') {
        let designscale =
          props.transformDesign && parseFloat(props.transformDesign);
        props.ZoomPercentageSet(parseInt(designscale * 100));
        dispatch({
          type: 'SET_ZOOM_PERCENTAGE',
          payload: parseInt(designscale * 100),
        });
        dispatch({
          type: 'SET_TARGET_NULL',
        });
      }
      if (props.inDesignTemplate) {
        props.ZoomPercentageSet(parseInt(props.newScale * 100));
        dispatch({
          type: 'SET_ZOOM_PERCENTAGE',
          payload: parseInt(props.newScale * 100),
        });
        dispatch({
          type: 'SET_TARGET_NULL',
        });
      }
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
    //undo shortcut key in windows
    else if (e.which === 90 && e.ctrlKey && !e.shiftKey) {
      dispatch({
        type: 'SET_SELECTED_EDITOR_BTN',
        payload: null,
      });
      dispatch({
        type: 'UNDO',
      });
    }
    //redo shortcut key in windows
    else if (e.which === 90 && e.ctrlKey && e.shiftKey) {
      dispatch({
        type: 'SET_SELECTED_EDITOR_BTN',
        payload: null,
      });
      dispatch({
        type: 'REDO',
      });
    }
    //text add shortcut key in windows
    else if (e.which === 84 && state.isShortkey) {
      dispatch({ type: 'IS_DRAGGED', payload: true });
      let fontSize = '12px',
        tWidth = 144,
        isBold = false,
        fontFamily = 'NeoSans',
        direction = 'ltr',
        textType = 'body';
      let tHeight = 60;
      const left = `${state.pageWidth / 2 - tWidth / 2}px`;
      const top = `${
        state.pageHeight / 2 -
        tHeight / 2 +
        checkTextElementsLength(state.pages, state.selectedPage) * 60
      }px`;
      dispatch({
        type: 'STORE_ELEMENT',
        payload: {
          textType,
          type: 'text',
          text: `<div>Add a little bit of body text</div>`,
          textArray: [],
          frame: createFrame(`${tWidth}px`, `${tWidth * 0.1634}px`, top, left),
          top,
          left,
          isBold: isBold,
          direction: direction,
          isItalic: false,
          isUnderline: false,
          isUppercase: false,
          isAlignTop: false,
          isAlignBottom: false,
          isAlignCenter: false,
          isColorPicker: false,
          fontSize:
            fontSize.split('px')[0] * setScaleOfNewElement(`${tWidth}px`),
          fontFamily: fontFamily,
          lineHeight: 1,
          letterSpacing: 0,
          color: '#111111',
          textAlign: state.alignment.types[state.alignment.indexNo],
          list: 0,
          opacity: 1,
          rotation: '0deg',
          xBound: 0,
          yBound: 0,
          rotBound: 0,
          width: tWidth,
        },
      });
      dispatch({
        type: 'SHOW_TEXT_BAR',
        payload: true,
      });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
  };
  const displayImage = (elements) => {
    // let svgStyles = null; Shaheer code-refactoring-removing-unused-variables
    return elements.length > 0
      ? elements.map((el) => {
          console.log(el);
          if (el.type === 'svg' && el.description !== undefined) {
            let svgStyles = css({
              ' svg': {
                padding: el.padding,
                left: el.frame.properties.left,
                top: el.frame.properties.top,
                right: el.right,
                bottom: el.bottom,
                opacity: el.opacity,
                // filter: `contrast(${el.contrast}%) brightness(${
                //   el.brightness
                // }%) saturate(${el.saturate}%) blur(${-1}px)`,
                transform: `
            translate(${el.frame.properties.translate[0]}px, ${
                  el.frame.properties.translate[1]
                }px)
            scaleX(${el.isZoomIn ? 2 : el.frame.properties.scale[0]}) scaleY(${
                  el.isZoomIn ? 2 : el.frame.properties.scale[1]
                }) rotate(${el.frame.properties.transform.rotate})`,
                zIndex: el.zIndex,
                height: `${el.frame.properties.height}`,
                width: `${el.frame.properties.width}`,
              },
              ' g': {
                fill: el.selectedColor,
              },
              ' path': {
                fill: el.selectedColor,
              },
            });
            return (
              <div
                id={el.id}
                key={el.id}
                className="moveable"
                style={{
                  // border: `${
                  //   state.target === null
                  //     ? state.selectedElement
                  //       ? el.id === state.selectedElement.id
                  //         ? '0.5px solid #00d9e0 '
                  //         : '0px'
                  //       : '0px'
                  //     : '0px'
                  // }`,
                  border: '0px',
                  padding: el.padding,
                  left: el.frame.properties.left,
                  top: el.frame.properties.top,
                  right: el.right,
                  bottom: el.bottom,
                  opacity: el.opacity,
                  // filter: `contrast(${el.contrast}%) brightness(${
                  //   el.brightness
                  // }%) saturate(${el.saturate}%) blur(${-1}px) ${
                  //   !!el.filter ? el.filter : ''
                  // }`,
                  transform: `
          translate(${el.frame.properties.translate[0]}px, ${
                    el.frame.properties.translate[1]
                  }px)
    scaleX(${el.isZoomIn ? 2 : el.frame.properties.scale[0]}) scaleY(${
                    el.isZoomIn ? 2 : el.frame.properties.scale[1]
                  }) rotate(${el.frame.properties.transform.rotate})`,
                  zIndex: el.zIndex,
                  height: setDimensionsOfSVG(el.description)[1],
                  width: setDimensionsOfSVG(el.description)[0],
                  background: 'transparent',
                  overflow: 'hidden',
                }}
                onClick={(e) => onClickElement(e, el)}
              >
                <div
                  style={{
                    transform: `scaleY(${1}) scaleX(${1})`,
                  }}
                >
                  {parse(
                    setStylesOnSVG(el.description, el.isflipX, el.isflipY),
                  )}
                </div>
              </div>
            );
          } else if (el.type === 'img' && !state.isGrid && !state.isFrame) {
            return (
              <>
                {state.selectedElement &&
                state.selectedElement.id === el.id &&
                state.pages[
                  state.pages.findIndex((pg) => {
                    return pg.pageId === parseInt(el.id.substring(13));
                  }) === -1
                    ? 0
                    : state.pages.findIndex((pg) => {
                        return pg.pageId === state.selectedPage.pageId;
                      })
                ].elements.filter((elem) => {
                  return elem.id === state.selectedElement.id;
                })[0].cropImage ? (
                  <Cropper
                    ref={cropper}
                    src={el.src}
                    background={false}
                    style={{
                      transform: `rotate(${el.frame.properties.transform.rotate})`,
                      zIndex: +1,
                      height: '100%',
                      width: '100%',
                    }}
                    crop={_crop}
                    dragMode="move"
                    scaleX={state.selectedElement.isflipY ? -1 : 1}
                    scaleY={state.selectedElement.isflipX ? -1 : 1}
                    minCropBoxHeight={10}
                  />
                ) : (
                  <div
                    id={el.id}
                    key={el.id}
                    className="moveable"
                    style={{
                      height: el.frameHeight
                        ? el.frameHeight
                        : `${el.frame.properties.height}px`,
                      width: el.frameWidth
                        ? el.frameWidth
                        : `${el.frame.properties.width}px`,
                      padding: el.padding,
                      left: el.frame.properties.left,
                      top: el.frame.properties.top,
                      right: el.right,
                      bottom: el.bottom,
                      opacity: el.opacity,
                      filter: `contrast(${el.contrast}%) brightness(${el.brightness}%) saturate(${el.saturate}%) blur(${el.blur}px) sepia(${el.sepia}%)grayscale(${el.grayscale}%) `,
                      transform: `
                  translate(${el.frame.properties.translate[0]}px, ${
                        el.frame.properties.translate[1]
                      }px)
            scaleX(${el.isZoomIn ? 2 : el.frame.properties.scale[0]}) scaleY(${
                        el.isZoomIn ? 2 : el.frame.properties.scale[1]
                      }) rotate(${
                        el.frame.properties.transform.rotate
                      }) matrix3d(${el.frame.properties.transform.matrix3d})`,
                      zIndex: el.zIndex,
                      height: el.frameHeight ? el.frameHeight : `auto`,
                      width: el.frameWidth
                        ? el.frameWidth
                        : `${el.frame.properties.width}px`,
                      overflow: 'hidden',
                      boxShadow: !!el.boxShadow
                        ? `${el.boxShadowColor} ${el.boxShadowX}px ${el.boxShadowY}px ${el.boxShadowB}px`
                        : 'none',
                    }}
                    onClick={(e) => onClickElement(e, el)}
                  >
                    <div
                      className="flipImageDiv"
                      style={{
                        position: `relative`,
                        width: `100%`,
                        height: `100%`,
                        transform: `scaleY(${el.isflipX ? -1 : 1}) scaleX(${
                          el.isflipY ? -1 : 1
                        })`,
                      }}
                    >
                      <ColorExtractor getColors={getColors}>
                        <img
                          key={el.id}
                          src={el.src}
                          alt="img"
                          style={{
                            // border: `${
                            //   state.selectedElement
                            //     ? state.target === null
                            //       ? el.id === state.selectedElement.id
                            //         ? '1px solid #00d9e0 '
                            //         : '0px'
                            //       : '0px'
                            //     : '0px'
                            // }`,
                            transform: `scaleY(1) scaleX(1) translateX(${
                              el.ImagetranslateX ? el.ImagetranslateX : 0
                            }px)translateY(${
                              el.ImagetranslateY ? el.ImagetranslateY : 0
                            }px)`,
                            width: el.ImageWidth ? el.ImageWidth : el.width,
                            height: el.ImageHeight ? el.ImageHeight : el.height,
                          }}
                        />
                      </ColorExtractor>
                    </div>
                  </div>
                )}
              </>
            );
          } else if (el.type === 'text') {
            return (
              <ContentEditable
                html={el.text}
                disabled={el.lock ? true : Editable}
                onChange={(e) => handleChange(e, el)}
                // onBlur={e=> handleChange(e, el)}
                onClick={(e) => onClickElement(e, el)}
                // onDoubleClick={onDoubleClick}
                onMouseUp={(e) => onMouseUp(e, el)}
                // onMouseDown={e => onMouseDown(e, el)}
                onKeyDown={(e) => {}}
                // onKeyUp={e => {
                //   if (e.key === 'Enter') {
                //     if(el.list===0)
                //     {
                //       let currEl = document.getElementById(el.id);
                //       if(currEl){
                //     let elChilds = currEl.children
                //     if(currEl.lastChild.textContent.length<1){
                //     currEl.lastChild.style = `style="line-height:${1}; margin-top:${0}rem; margin-bottom:${0}rem;"`
                //     elChilds[elChilds.length-2].style = `style="line-height:${1}; margin-top:${0}rem; margin-bottom:${el.lineHeight/2}rem;"`
                //   }
                // }
                //     }

                //   }
                // }}
                tagName="article"
                className={`moveable inputText ${
                  el.direction === 'rtl'
                    ? el.textType === 'heading'
                      ? 'inputText_Heading_AR'
                      : el.textType === 'subHeading'
                      ? 'inputText_SubHeading_AR'
                      : 'inputText_Body_AR'
                    : el.textType === 'heading'
                    ? 'inputText_Heading_EN'
                    : el.textType === 'subHeading'
                    ? 'inputText_SubHeading_EN'
                    : 'inputText_Body_EN'
                }`}
                id={el.id}
                style={(() => {
                  let sty = {
                    // border: `${
                    //   state.selectedElement
                    //     ? state.target === null
                    //       ? el.id === state.selectedElement.id
                    //         ? '1px solid #00d9e0 '
                    //         : '0px'
                    //       : '0px'
                    //     : '0px'
                    // }`,
                    width: el.width,
                    height: 'auto',
                    minHeight:
                      el.textType !== undefined
                        ? el.textType === 'heading'
                          ? '35px'
                          : el.textType === 'subHeading'
                          ? '15px'
                          : '12px'
                        : '35px',
                    paddingTop:
                      el.lineHeight < 1 ? `${1 - el.lineHeight}rem` : '0rem',
                    left: el.frame.properties.left,
                    top: el.frame.properties.top,
                    right: el.right,
                    bottom: el.bottom,
                    direction: el.direction,
                    opacity: el.opacity,
                    filter: `contrast(${el.contrast}%) brightness(${el.brightness}%) saturate(${el.saturate}%) blur(${el.blur}px)`,
                    transform: `
                  translate(${el.frame.properties.translate[0]}px, ${
                      el.frame.properties.translate[1]
                    }px)
              scaleX(${
                el.isZoomIn ? 2 : el.frame.properties.scale[0]
              }) scaleY(${
                      el.isZoomIn ? 2 : el.frame.properties.scale[1]
                    }) rotate(${el.frame.properties.transform.rotate})`,
                    zIndex: el.zIndex,
                    fontStyle: el.isItalic ? 'italic' : null,
                    fontWeight: el.isBold
                      ? el.textType === 'subHeading'
                        ? 500
                        : 700
                      : 100,
                    textDecorationLine: el.isUnderline ? 'underline' : null,
                    textTransform: el.isUppercase ? 'uppercase' : 'none',
                    fontSize:
                      el.textType !== undefined
                        ? el.textType === 'heading'
                          ? '35px'
                          : el.textType === 'subHeading'
                          ? '15px'
                          : '12px'
                        : '35px',
                    fontFamily: el.fontFamily,
                    lineHeight: el.lineHeight,
                    letterSpacing: el.letterSpacing,
                    wordSpacing: el.wordSpacing,
                    color: el.color,
                    verticalAlign: el.isAlignBottom
                      ? 'text-bottom'
                      : el.isAlignTop
                      ? 'text-top'
                      : 'baseline',
                    textAlign: el.textAlign,
                    position: 'absolute',
                    // boxShadow:
                    //   el.id === state.selectedElement?.id
                    //     ? '0px 0px 0px 1px #00d9e0'
                    //     : '0px 0px 0px 0px #00d9e0',
                    // transform: 'scaleX(1) scaleY(1)',
                    // border:
                    //   el.id === state.selectedElement?.id
                    //     ? '1px solid #00d9e0'
                    //     : '0px solid #00d9e0',
                    wordBreak: 'break-all',
                  };
                  return sty;
                })()}
              />
            );
          } else if (el.type === 'grid') {
            if (el.name === 'full page grid') {
              return (
                <FullPageGrid
                  id={state.doubleClick ? '' : el.id}
                  className={state.doubleClick ? '' : 'moveable'}
                  name={el.name}
                  frame={el.frame}
                  left={el.frame.properties.left}
                  top={el.frame.properties.top}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'half page grid') {
              return (
                <HalfPageGrid
                  id={state.doubleClick ? '' : el.id}
                  className={state.doubleClick ? '' : 'moveable'}
                  name={el.name}
                  frame={el.frame}
                  left={el.frame.properties.left}
                  top={el.frame.properties.top}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === '30 70 grid') {
              return (
                <ThirtySeventyPageGrid
                  id={state.doubleClick ? '' : el.id}
                  className={state.doubleClick ? '' : 'moveable'}
                  name={el.name}
                  frame={el.frame}
                  left={el.frame.properties.left}
                  top={el.frame.properties.top}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'horizontal half grid') {
              return (
                <HorizontalHalfPageGrid
                  id={state.doubleClick ? '' : el.id}
                  className={state.doubleClick ? '' : 'moveable'}
                  name={el.name}
                  frame={el.frame}
                  left={el.frame.properties.left}
                  top={el.frame.properties.top}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'horizontal tri grid') {
              return (
                <HorizontalTriGrid
                  id={state.doubleClick ? '' : el.id}
                  className={state.doubleClick ? '' : 'moveable'}
                  name={el.name}
                  frame={el.frame}
                  left={el.frame.properties.left}
                  top={el.frame.properties.top}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'vertical tri grid') {
              return (
                <VerticalTriGrid
                  id={state.doubleClick ? '' : el.id}
                  className={state.doubleClick ? '' : 'moveable'}
                  name={el.name}
                  frame={el.frame}
                  left={el.frame.properties.left}
                  top={el.frame.properties.top}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            }
          } else if (el.type === 'frame') {
            if (el.name === 'circle') {
              return (
                <Circle
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'vertical_rectangle') {
              return (
                <VerticalRectangle
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'rectangle') {
              return (
                <Rectangle
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'triangle') {
              return (
                <Triangle
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'trapezoid') {
              return (
                <Trapezoid
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'parallelogram') {
              return (
                <Parallelogram
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'rhombus') {
              return (
                <Rhombus
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'pentagon') {
              return (
                <Pentagon
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'heptagon') {
              return (
                <Heptagon
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'octagon') {
              return (
                <Octagon
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'nonagon') {
              return (
                <Nonagon
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'bevel') {
              return (
                <Bevel
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'leftPoint') {
              return (
                <LeftPoint
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'rightPoint') {
              return (
                <RightPoint
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'leftChev') {
              return (
                <LeftChev
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'rightChev') {
              return (
                <RightChev
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'star') {
              return (
                <Star
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'elipse') {
              return (
                <Elipse
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'frame') {
              return (
                <Frame
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'minus') {
              return (
                <Minus
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            } else if (el.name === 'square') {
              return (
                <Square
                  id={el.id}
                  name={el.name}
                  frame={el.frame}
                  zIndex={el.zIndex}
                  onClick={(e) => onClickElement(e, el)}
                />
              );
            }
          }
        })
      : null;
  };

  const getColors = (colors) => {
    dispatch({
      type: 'SET_COLORS',
      payload: colors,
    });
  };

  // const pageMessages = {
  //   page: 'صفحة',
  // };
  return (
    <>
      <div
        className="pageDiv"
        id={pageId}
        style={{
          position: 'relative',
          scrollSnapType: 'both',
          width: `${
            props.page.scaleX
              ? type === 'Template'
                ? userState.pageWidth
                : state.pageWidth
              : null
          }px`,
          height: `${
            props.page.scaleX
              ? type === 'Template'
                ? userState.pageHeight
                : state.pageHeight
              : null
          }px`,
          transform: `translate(${props.translateOfPageDiv.pageDivX}px,${props.translateOfPageDiv.pageDivY}px)`,
          paddingRight: '13px',
          paddingBottom: '13px',
        }}
      >
        {/* <div className="btnIconsDiv">
          <div className="btnIconsDivFirstHalf">
            {delBtn()}
            <Copy className="iconBtns" id={pageId} onClick={onClickCopy} />
          </div>
          <div className="btnIconsDivSecondHalf">
            <span>
              {`${
                userState.isArabic ? pageMessages.page : 'Page'
              } ${++pageId}`}
            </span>
          </div>
        </div> */}
        {/* <FullScreen handle={props.handle}> */}
        <div
          ref={drop}
          onClick={selectedPage}
          style={{
            position: 'relative',
            width: `${
              type === 'Template' ? userState.pageWidth : state.pageWidth
            }px`,
            height: `${
              type === 'Template' ? userState.pageHeight : state.pageHeight
            }px`,
            backgroundSize: 'cover',
            backgroundImage: `url("${props.page.backgroundImage}")`,
            backgroundColor: `${props.page.pageColor}`,
            overflow: 'hidden',
            // transform: `scale(${(props.page.scaleX, props.page.scaleY)})`,
          }}
          className={
            props.handle.active
              ? `${props.page.className} fullScreen`
              : props.page.className
          }
          id={`page${pageId}`}
        >
          {state.undo
            ? displayImage(
                JSON.parse(
                  state.undoArray[state.undoArray.length - state.count],
                )[state.selectedPage.pageId].elements,
              )
            : state.redo
            ? displayImage(
                JSON.parse(
                  state.undoArray[state.undoArray.length - state.count],
                )[state.selectedPage.pageId].elements,
              )
            : displayImage(elements)}
        </div>
        {/* </FullScreen> */}
      </div>
    </>
  );
};

export default withRouter(Page);
