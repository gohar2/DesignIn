import React, { useContext, useRef, useEffect, useState } from 'react';
import Page from './Page';
import Moveable from 'react-moveable';
import Context from '../../store/store';
import userContext from '../../../userContext/UserContext.js';
import { useHistory, withRouter } from 'react-router-dom';

import API from '../../../api/Api';
import { getDesignByIdUrl, templateUrl } from '../../../api/constants';
import { useFullScreenHandle } from 'react-full-screen';
import './Editor.css';
import { setDimensionsOfEditorContainer } from '../../../utils/index';

import Selecto from 'react-selecto';
import { ReactComponent as ZoomOut } from './../../../icons/ZoomOut.svg';
import { ReactComponent as ZoomIn } from './../../../icons/ZoomIn.svg';

const Editor = (props) => {
  const [EditableP, setEditableP] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext);
  const { selectedFrame } = state;
  const moveableRef = useRef(null);
  const moveableRefGroup = useRef(null);
  const selectoRef = React.useRef(null);
  const labelRef = useRef(null);
  const handle = useFullScreenHandle();
  const [isScale, setisScale] = useState(true);
  // const [isResize, setisResize] = useState(false); //Shaheer code-refactoring-removing-unused-variables
  const [showModal, setShowModal] = useState(false);
  const [isdragged, setIsdragged] = useState({ left: null, top: null });
  const [pagedivTranslate, setPageDivTranslate] = useState({
    pageDivX: 0,
    pageDivY: 0,
  });
  const [moveableState, setMoveAbleState] = useState({
    dragging: false,
    resizing: false,
    scaling: false,
    rotating: false,
  });
  const type = window.location.pathname.split('/')[2];
  const [previousDimentions, setPreviousDimentions] = useState({
    frameWidth: 0,
    frameHeight: 0,
    imageWidth: 0,
    imageHeight: 0,
  });
  const [previoustranslateX, setprevioustranslateX] = useState(0);
  const [previoustranslateY, setprevioustranslateY] = useState(0);
  let abnormalDifference = 0;
  let normalDifference = 0;
  let abnormalDifferenceY = 0;
  let normalDifferenceY = 0;
  let history = useHistory();

  useEffect(() => {
    if (props.location.pathname.substr(8, 1) !== 'D') {
      dispatch({
        type: 'EMPTY_EDITOR',
      });
    }
    if (props.location.pathname.substr(8) === '') {
      dispatch({
        type: 'RESET_SCALE',
      });
    }
    window.addEventListener('resize', onResizeScreen);
    if (props.location.pathname.substr(8) !== '') {
      if (props.location.pathname.substr(8, 1) === 'D') {
        API.get(
          `${process.env.REACT_APP_BASE_URL}${getDesignByIdUrl(
            props.location.pathname.substr(15),
          )}`,
        )
          .then((result) => {
            if (result.data.length > 0) {
              dispatch({
                type: 'SAVE_DESIGN',
                payload: result.data[0],
              });
            }
          })
          .catch((error) => {
            console.error('failed to fetch data');
          });
      } else if (props.location.pathname.substr(8, 1) === 'T') {
        API.get(
          `${process.env.REACT_APP_BASE_URL}${templateUrl(
            parseInt(props.location.pathname.substr(17)),
          )}`,
        )
          .then((result) => {
            userDispatch({ type: 'SET_PAGE_SIZE', payload: result.data });
            dispatch({ type: 'SET_PAGE_SIZE', payload: result.data });
          })
          .catch((error) => {
            console.error('failed to fetch data');
          });
      }
    }
    dispatch({
      type: 'SAVE_LABEL_REF',
      payload: labelRef,
    });
    if (localStorage.getItem('pages') && localStorage.getItem('selectedPage')) {
      let emptiness = new Promise((onSuccess) => {
        dispatch({
          type: 'RETRIVE_DESIGN',
          payload: {
            pages: JSON.parse(localStorage.getItem('pages')),
            selectedPage: JSON.parse(localStorage.getItem('selectedPage')),
          },
        });
        onSuccess(true);
      });
      emptiness.then((result) => {
        localStorage.removeItem('pages');
        localStorage.removeItem('selectedPage');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.pathname.substr(15)]);

  const addPage = () => {
    dispatch({ type: 'ADD_NEW_PAGE' });
  };

  const renderPages = () => {
    const { pages } = state;
    return (
      pages &&
      pages.map((page) => {
        return (
          <Page
            setEditableP={setEditableP}
            EditableP={EditableP}
            handle={handle}
            key={page.pageId}
            onClickAddBtn={addPage}
            page={page}
            zoomPercentage={zoomPercentage}
            ZoomPercentageSet={ZoomPercentageSet}
            transformDesign={state.transformDesign}
            pWidth={userState.pageWidth}
            pHieght={userState.pageHeight}
            newScale={state.newScale}
            inDesignTemplate={state.inDesignTemplate}
            translateOfPageDiv={pagedivTranslate}
          />
        );
      })
    );
  };

  // const setTransform = target => { //Shaheer code-refactoring-removing-unused-variables
  //   target.style.cssText += selectedFrame.toCSS();
  // };

  const setLabel = (clientX, clientY, text) => {
    labelRef.current.style.cssText = `
    display: block; transform: translate(${clientX}px, ${
      clientY - 10
    }px) translate(-100%, -100%) translateZ(-100px);`;
    labelRef.current.innerHTML = text;
    dispatch({
      type: 'SAVE_LABEL_REF',
      payload: labelRef,
    });
  };

  const onDrag = ({ target, clientX, clientY, top, left, isPinch }) => {
    dispatch({ type: 'SET_DRAGGING', payload: true });
    // selectedFrame.set('left', `${left}px`);
    // selectedFrame.set('top', `${top}px`);
    selectedFrame.properties.left = `${left}px`;
    selectedFrame.properties.top = `${top}px`;
    if (!isPinch) {
      setLabel(
        clientX,
        clientY,
        `X: ${left.toFixed(2)}px<br/>Y: ${top.toFixed(2)}px`,
      );
    }
    document.getElementById(target.id).style.right = null;
    document.getElementById(target.id).style.bottom = null;
    if (!state.isFrame) {
      dispatch({ type: 'REMOVE_ALIGNMENT' });
    }
  };

  const onScale = ({ target, clientX, clientY, scale, drag }) => {
    if (scale[0] > 0 || scale[1] > 0) {
      let height =
        document.getElementById(state.selectedElement.id).offsetHeight *
        scale[0] *
        document
          .getElementsByClassName('dynamicPagesDiv')[0]
          .style.transform.slice(6, 9);
      let width =
        parseInt(
          document.getElementById(state.selectedElement.id).offsetWidth,
        ) *
        scale[1] *
        document
          .getElementsByClassName('dynamicPagesDiv')[0]
          .style.transform.slice(6, 9);
      setLabel(
        clientX,
        clientY,
        `H: ${Math.ceil(height.toFixed(2))}<br/>W: ${Math.ceil(
          width.toFixed(2),
        )}`,
      );
      if (target.tagName === 'ARTICLE')
        dispatch({
          type: 'SET_FONTSIZE',
          payload: parseInt(
            Math.ceil(
              parseFloat(target.style.fontSize.split('px')[0]) * scale[0],
            ),
          ),
        });
      const beforeTranslate = drag.beforeTranslate;
      selectedFrame.properties.translate = beforeTranslate;
      selectedFrame.properties.scale = scale;
      let deg = selectedFrame.properties.transform.rotate;
      target.style.transform =
        `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)` +
        ` scale(${scale[0]}, ${scale[1]})  rotate(${deg})`;
    }
  };

  const onRotate = ({ target, clientX, clientY, beforeDelta, isPinch }) => {
    const deg =
      parseFloat(selectedFrame.get('transform', 'rotate')) + beforeDelta;
    selectedFrame.set(
      'transform',
      'rotate',
      `${parseInt(deg) > 359 || parseInt(deg) < -359 ? 0 : deg}deg`,
    );
    let trans = selectedFrame.properties.translate;
    let scale = selectedFrame.properties.scale;
    target.style.transform =
      `translate(${trans[0]}px, ${trans[1]}px)` +
      ` scale(${scale[0]}, ${scale[1]}) rotate(${
        parseInt(deg) > 359 || parseInt(deg) < -359 ? 0 : deg
      })`;
    selectedFrame.properties.width = target.offsetWidth + 'px';
    selectedFrame.properties.height = target.offsetHeight + 'px';
    // setTransform(target);
    if (!isPinch) {
      setLabel(clientX + 100, clientY + 100, `R: ${parseInt(deg)}°`);
    }
  };

  const onScaleStart = ({ set, dragStart }) => {
    setMoveAbleState({ ...moveableState, scaling: true });
    set(selectedFrame.properties.scale);
    dragStart && dragStart.set(selectedFrame.properties.translate);
  };
  const removeLabel = () => {
    labelRef.current.style.cssText = `
    display: block;`;
  };
  const onDragStart = (target) => {
    setMoveAbleState({ ...moveableState, dragging: true });

    setIsdragged({
      left: target.target.offsetLeft,
      top: target.target.offsetTop,
    });
  };
  const onRotateStart = () => {
    setMoveAbleState({ ...moveableState, rotating: true });
  };
  const onDragEnd = (target) => {
    dispatch({ type: 'SET_DRAGGING', payload: false });
    setMoveAbleState({ ...moveableState, dragging: false });

    if (
      isdragged.left === target.target.offsetLeft &&
      isdragged.top === target.target.offsetTop
    ) {
      dispatch({ type: 'IS_DRAGGED', payload: false });
      // document.getElementById(target.target.id).blur()
    } else {
      dispatch({ type: 'IS_DRAGGED', payload: true });
      document
        .getElementById(target.target.id)
        .setAttribute('contenteditable', 'false');
    }
    removeLabel();
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const onScaleEnd = () => {
    setMoveAbleState({ ...moveableState, scaling: false });
    removeLabel();
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const onRotateEnd = () => {
    setMoveAbleState({ ...moveableState, rotating: false });
    removeLabel();
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const onClickEditor = (e) => {
    e.stopPropagation();
    if (state.targets) {
      dispatch({ type: 'UNGROUP' });
    }
    dispatch({
      type: 'UNSELECT_ALL',
    });
    dispatch({
      type: 'SET_SELECTED_EDITOR_BTN',
      payload: null,
    });
    dispatch({
      type: 'REMOVE_SELECTION',
    });
    dispatch({
      type: 'SET_LISTV',
      payload: false,
    });
    dispatch({
      type: 'SET_ALIGNMENTV',
      payload: false,
    });
    dispatch({
      type: 'SET_SHORTCUT_KEY',
      payload: true,
    });
    // dispatch({ type: 'SHOW_SIDEBAR', payload: 'Templates' });
    setEditableP(true);
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
  const onResizeScreen = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'ON_RESIZE',
    });
  };

  const [zoomVisiblilty, setZoomVisiblilty] = useState(false);
  const zoomPercentageVisible = () => {
    setZoomVisiblilty(!zoomVisiblilty);
  };
  const [zoomPercentage, ZoomPercentageSet] = useState(100);
  const setZoomPercentageBySlider = (e) => {
    console.log(state.zoomPercentage);
    let myPromise = new Promise(function (myResolve, myReject) {
      dispatch({
        type: 'SET_ZOOM_PERCENTAGE',
        payload: parseInt(e.target.value),
      });
      ZoomPercentageSet(parseInt(e.target.value));
      dispatch({ type: 'SET_ZOOM', payload: parseInt(e.target.value) / 100 });
      myResolve('OK');
    });

    myPromise.then(function (value) {
      let pageDivBounds = document.getElementById('0').getBoundingClientRect();
      let pageDivTransform = document.getElementById('0').style.transform;
      let transX = parseFloat(
        pageDivTransform.split('translate(')[1].split(',')[0].split('px')[0],
      );
      let transY = parseFloat(
        pageDivTransform.split(',')[1].split(')')[0].split('px')[0],
      );
    });
  };
  const setZoomPercentage = (e) => {
    let myPromise = new Promise(function (myResolve, myReject) {
      dispatch({
        type: 'SET_ZOOM_PERCENTAGE',
        payload: e.currentTarget.id * 100,
      });
      ZoomPercentageSet(e.currentTarget.id * 100);
      dispatch({ type: 'SET_ZOOM', payload: e.currentTarget.id });
      myResolve('OK');
      // myReject("Error");
    });

    myPromise.then(
      function (value) {
        let pageDivBounds = document
          .getElementById('0')
          .getBoundingClientRect();
        let pageDivTransform = document.getElementById('0').style.transform;
        let transX = parseFloat(
          pageDivTransform.split('translate(')[1].split(',')[0].split('px')[0],
        );
        let transY = parseFloat(
          pageDivTransform.split(',')[1].split(')')[0].split('px')[0],
        );
      },
      // function(error) {myDisplayer(error);}
    );
  };

  // setTransform(target)
  // };
  const onResizeStart = ({ setOrigin, dragStart }) => {
    if (
      dragStart.inputEvent.target.className ===
        'moveable-control moveable-direction moveable-e' ||
      dragStart.inputEvent.target.className ===
        'moveable-control moveable-direction moveable-w'
    ) {
      setisScale(false);
    } else {
      setisScale(true);
    }
    setOrigin(['%', '%']);
    dragStart && dragStart.set(selectedFrame.properties.translate);
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const onResizeEnd = () => {
    document.getElementById(state.selectedElement.id).style.height = 'auto';
    setisScale(true);
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  const onScaleGroupStart = ({ events }) => {
    events.forEach((ev, i) => {
      ev.set(state.selectedElements[i]?.frame.properties.scale);
      ev.dragStart &&
        ev.dragStart.set(state.selectedElements[i]?.frame.properties.translate);
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  const onScaleGroup = ({ events }) => {
    events.forEach((ev, i) => {
      state.selectedElements[i].frame.properties.translate =
        ev.drag.beforeTranslate;
      state.selectedElements[i].frame.properties.scale = ev.scale;

      ev.target.style.transform =
        `translate(${ev.drag.beforeTranslate[0]}px, ${ev.drag.beforeTranslate[1]}px)` +
        ` scale(${ev.scale[0]}, ${ev.scale[1]})`;
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  const onDragGroupStart = ({ events }) => {
    events.forEach((ev, i) => {
      ev.set(state.selectedElements[i]?.frame.properties.translate);
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const onDragGroup = ({ events }) => {
    events.forEach((ev, i) => {
      state.selectedElements[i].frame.properties.translate = ev.beforeTranslate;
      ev.target.style.transform =
        `translate(${ev.beforeTranslate[0]}px, ${ev.beforeTranslate[1]}px)` +
        `scale(${state.selectedElements[i].frame.properties.scale[0]}, ${state.selectedElements[i].frame.properties.scale[1]})`;
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
    console.log(events);
  };

  const onRotateGroupStart = ({ events }) => {
    events.forEach((ev, i) => {
      ev.set(state.selectedElements[i].frame.properties.transform.rotate);
      ev.drag &&
        ev.drag.set(state.selectedElements[i].frame.properties.translate);
    });
  };

  useEffect(() => {
    if (state.editorSwitch && !state.isSaved) {
      setShowModal(true);
    } else if (state.isSaved && state.editorSwitch) {
      dispatch({ type: 'SET_EDITOR_REDIRECTION', payload: true });
      let emptiness = new Promise((onSuccess) => {
        dispatch({ type: 'EMPTY_EDITOR' });
        onSuccess(true);
      });
      emptiness.then((result) => {
        if (!!JSON.parse(localStorage.getItem('userData'))) {
          history.push('/');
        } else {
          history.push('/landing');
        }
        // window.history.back();
      });
    }
  }, [state.editorSwitch]);

  useEffect(() => {
    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  const getUnselectedElements = () => {
    if (state.selectedElement)
      return Array.from(document.getElementsByClassName('moveable')).filter(
        (el) => {
          return el.id + '' !== state.selectedElement.id;
        },
      );
    else return null;
  };

  return (
    <>
      <Moveable
        ref={moveableRef}
        className={
          moveableState.scaling === true ||
          moveableState.rotating === true ||
          moveableState.dragging === true
            ? 'hideFrameButtons'
            : ''
        }
        target={
          state.target && moveableState.resizing === false
            ? state.target.tagName === 'ARTICLE' ||
              state.target.tagName === 'UL'
              ? state.target
              : state.target
            : null
        }
        snappable={true}
        snapThreshold={7}
        snapCenter={true}
        // snapVertical={true}
        // snapHorizontal={true}
        snapElement={true}
        snapDigit={0}
        snapGap={true}
        isDisplaySnapDigit={false}
        // verticalGuidelines={[200, 350, 500, 600, 700]}
        // horizontalGuidelines={[50, 250, 482]}
        elementGuidelines={getUnselectedElements()}
        container={document.getElementsByClassName('pageContainer')[0]}
        resizable={false}
        draggable={state.target == null ? false : true}
        scalable={true}
        warpable={false}
        rotatable={
          state.selectedElement && state.selectedElement.type === 'grid'
            ? false
            : true
        }
        origin={false}
        // throttleDrag={5}
        // throttleRotate={1}
        onScale={onScale}
        onRotate={onRotate}
        keepRatio={
          state.target &&
          (state.target.tagName === 'ARTICLE' || state.target.tagName === 'UL')
            ? isScale
              ? true
              : false
            : true
        }
        onDrag={onDrag}
        onScaleStart={onScaleStart}
        onRotateStart={onRotateStart}
        onDragStart={onDragStart}
        onScaleEnd={onScaleEnd}
        onDragEnd={onDragEnd}
        onRotateEnd={onRotateEnd}
        height={'auto'}
        onResizeStart={onResizeStart}
        // onResize={onResize}
        onResizeEnd={onResizeEnd}
        renderDirections={
          state.target &&
          (state.target.tagName === 'ARTICLE' || state.target.tagName === 'UL')
            ? parseFloat(state.target.style.fontSize.split('px')[0]) > 11
              ? ['nw', 'ne', 'se', 'sw']
              : ['nw', 'e']
            : ['nw', 'ne', 'se', 'sw']
        }
      />
      {state?.target?.tagName === 'ARTICLE' ? (
        <Moveable
          className={
            moveableState.resizing === true
              ? 'MoveableResizeText'
              : 'hideFrameBorders'
          }
          ref={moveableRef}
          target={
            state.target &&
            !moveableState.dragging &&
            !moveableState.scaling &&
            !moveableState.rotating &&
            state.target
          }
          container={document.getElementsByClassName('pageContainer')[0]}
          resizable={true}
          draggable={false}
          scalable={false}
          warpable={false}
          origin={false}
          keepRatio={false}
          height={'auto'}
          onResizeStart={(e) => {
            e.setOrigin(['%', '%']);
            e.dragStart && e.dragStart.set(selectedFrame.properties.translate);
            setMoveAbleState({ ...moveableState, resizing: true });
          }}
          onResizeEnd={(e) => {
            setMoveAbleState({ ...moveableState, resizing: false });
            dispatch({
              type: 'SAVE_HISTORY',
            });
          }}
          onResize={(e) => {
            const beforeTranslate = e.drag.beforeTranslate;
            selectedFrame.properties.translate = beforeTranslate;
            selectedFrame.properties.width = `${e.width}px`;
            selectedFrame.properties.height = `auto`;
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `auto`;
            e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
            e.target.style.transform =
              `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)` +
              ` scale(${selectedFrame.properties.scale[0]}, ${selectedFrame.properties.scale[1]})  rotate(${selectedFrame.properties.transform.rotate})`;
          }}
          renderDirections={['e', 'w']}
        />
      ) : (
        ''
      )}
      {state?.target?.children[0]?.children[0]?.tagName === 'IMG' &&
      state?.selectedElement?.type !== 'frame' ? (
        <Moveable
          className={
            moveableState.resizing === true
              ? 'MoveableResizeText'
              : 'hideFrameBorders'
          }
          ref={moveableRef}
          target={
            state.target &&
            moveableState.dragging === false &&
            moveableState.scaling === false &&
            moveableState.rotating === false
              ? state.target.tagName === 'ARTICLE' ||
                state.target.tagName === 'UL'
                ? state.target
                : state.target
              : null
          }
          container={document.getElementsByClassName('pageContainer')[0]}
          resizable={true}
          draggable={false}
          scalable={false}
          warpable={false}
          rotatable={false}
          origin={false}
          throttleRotate={45}
          keepRatio={false}
          // height={'auto'}
          onResizeStart={(e) => {
            setMoveAbleState({
              ...moveableState,
              resizing: true,
            });
            let ImageLastProps = {
              id: state.selectedElement.id,
              width: document.getElementById(state.selectedElement.id)
                .children[0].children[0].style.width
                ? document.getElementById(state.selectedElement.id).children[0]
                    .children[0].style.width
                : 200,
              height: document.getElementById(state.selectedElement.id)
                .children[0].children[0].style.width
                ? document.getElementById(state.selectedElement.id).children[0]
                    .children[0].style.height
                : 'auto',
              translateX: document
                .getElementById(state.selectedElement.id)
                .children[0].children[0].style.transform.includes('translateX')
                ? parseFloat(
                    document
                      .getElementById(state.selectedElement.id)
                      .children[0].children[0].style.transform.split(
                        'translateX(',
                      )[1]
                      .split('px')[0],
                  )
                : 0,
              translateY: document
                .getElementById(state.selectedElement.id)
                .children[0].children[0].style.transform.includes('translateY')
                ? parseFloat(
                    document
                      .getElementById(state.selectedElement.id)
                      .children[0].children[0].style.transform.split(
                        'translateY(',
                      )[1]
                      .split('px')[0],
                  )
                : 0,
            };
            dispatch({
              type: 'set_LastTransform',
              payload: ImageLastProps,
            });
            setPreviousDimentions({
              frameWidth: document.getElementById(state.selectedElement.id)
                .offsetWidth,
              frameHeight: document.getElementById(state.selectedElement.id)
                .offsetHeight,
              imageWidth: document.getElementById(state.selectedElement.id)
                .children[0].children[0].offsetWidth,
              imageHeight: document.getElementById(state.selectedElement.id)
                .children[0].children[0].offsetHeight,
            });
            if (
              document
                .getElementById(state.selectedElement.id)
                .children[0].children[0].style.transform.includes('translate')
            ) {
              if (
                document
                  .getElementById(state.selectedElement.id)
                  .children[0].children[0].style.transform.includes(
                    'translateX',
                  )
              ) {
                setprevioustranslateX(
                  parseFloat(
                    document
                      .getElementById(state.selectedElement.id)
                      .children[0].children[0].style.transform.split(
                        'translateX(',
                      )[1]
                      .split('px')[0],
                  ),
                );
              }
              if (
                document
                  .getElementById(state.selectedElement.id)
                  .children[0].children[0].style.transform.includes(
                    'translateY',
                  )
              ) {
                setprevioustranslateY(
                  parseFloat(
                    document
                      .getElementById(state.selectedElement.id)
                      .children[0].children[0].style.transform.split(
                        'translateY(',
                      )[1]
                      .split('px')[0],
                  ),
                );
              }
            }

            if (
              e.dragStart.inputEvent.target.className ===
              'moveable-control moveable-direction moveable-e'
            ) {
              dispatch({
                type: 'setResizePointer',
                payload: 'right',
              });
              dispatch({
                type: 'SET_WIDTH',
                payload: document.getElementById(state.selectedElement.id)
                  .children[0].children[0].offsetWidth,
              });
            } else if (
              e.dragStart.inputEvent.target.className ===
              'moveable-control moveable-direction moveable-w'
            ) {
              dispatch({
                type: 'setResizePointer',
                payload: 'left',
              });
              dispatch({
                type: 'SET_WIDTH',
                payload: document.getElementById(state.selectedElement.id)
                  .children[0].children[0].offsetWidth,
              });
            } else if (
              e.dragStart.inputEvent.target.className ===
              'moveable-control moveable-direction moveable-n'
            ) {
              dispatch({
                type: 'setResizePointer',
                payload: 'top',
              });
              dispatch({
                type: 'setHeight',
                payload: document.getElementById(state.selectedElement.id)
                  .children[0].children[0].offsetHeight,
              });
            } else if (
              e.dragStart.inputEvent.target.className ===
              'moveable-control moveable-direction moveable-s'
            ) {
              dispatch({
                type: 'setResizePointer',
                payload: 'bottom',
              });
              dispatch({
                type: 'setHeight',
                payload: document.getElementById(state.selectedElement.id)
                  .children[0].children[0].offsetHeight,
              });
            }
            e.setOrigin(['%', '%']);
            e.dragStart && e.dragStart.set(selectedFrame.properties.translate);
          }}
          onResizeEnd={() => {
            setMoveAbleState({ ...moveableState, resizing: false });
            selectedFrame.properties.width = `${state.WidthforScale}px`;
            let elementsLastProps = {
              id: state.selectedElement.id,
              frameWidth: document.getElementById(state.selectedElement.id)
                .style.width
                ? document.getElementById(state.selectedElement.id).style.width
                : 200,
              frameHeight: document.getElementById(state.selectedElement.id)
                .style.height
                ? document.getElementById(state.selectedElement.id).style.height
                : 'auto',
              imageWidth: document.getElementById(state.selectedElement.id)
                .children[0].children[0].style.width
                ? document.getElementById(state.selectedElement.id).children[0]
                    .children[0].style.width
                : 200,
              imageHeight: document.getElementById(state.selectedElement.id)
                .children[0].children[0].style.width
                ? document.getElementById(state.selectedElement.id).children[0]
                    .children[0].style.height
                : 'auto',
              imageTranslateX: document
                .getElementById(state.selectedElement.id)
                .children[0].children[0].style.transform.includes('translateX')
                ? parseFloat(
                    document
                      .getElementById(state.selectedElement.id)
                      .children[0].children[0].style.transform.split(
                        'translateX(',
                      )[1]
                      .split('px')[0],
                  )
                : 0,
              imageTranslateY: document
                .getElementById(state.selectedElement.id)
                .children[0].children[0].style.transform.includes('translateY')
                ? parseFloat(
                    document
                      .getElementById(state.selectedElement.id)
                      .children[0].children[0].style.transform.split(
                        'translateY(',
                      )[1]
                      .split('px')[0],
                  )
                : 0,
            };
            dispatch({
              type: 'setLastElementProps',
              payload: elementsLastProps,
            });
            dispatch({
              type: 'SAVE_HISTORY',
            });
          }}
          onResize={({ width, height, target, drag }) => {
            let selectedElementIndex = state.pages[0].elements.findIndex(
              (elIndex) => elIndex.id === state.selectedElement.id,
            );
            if (state.resizePointer === 'left') {
              const imageHeight = document.getElementById(
                state.selectedElement.id,
              ).offsetHeight;
              const beforeTranslate = drag.beforeTranslate;
              selectedFrame.properties.translate = beforeTranslate;
              let deg = selectedFrame.properties.transform.rotate;
              let scale = selectedFrame.properties.scale;
              target.style.width = `${width}px`;
              if (width > state.initialWidth) {
                target.children[0].children[0].style.width = `${width}px`;
                target.children[0].children[0].style.height = `auto`;
                selectedFrame.width = `${width}px`;
                target.style.height = `${imageHeight}px`;
                selectedFrame.height = `${imageHeight}px`;
                selectedFrame.properties.height = `${imageHeight}px`;
                dispatch({
                  type: 'SET_newWidth',
                  payload: width,
                });
                target.children[0].children[0].style.transform = `translateX(0px) translateY(${state.pages[0].elements[selectedElementIndex].ImagetranslateY}px)`;
                dispatch({
                  type: 'SET_ImagetranslateX0',
                });
              }
              target.style.transform =
                `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)` +
                ` scale(${scale[0]}, ${scale[1]})  rotate(${deg}) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`;
              if (
                previousDimentions.frameWidth <
                parseFloat(selectedFrame.properties.width.split('px')[0])
              ) {
                if (width > previousDimentions.frameWidth) {
                  if (
                    document
                      .getElementById(state.selectedElement.id)
                      .children[0].children[0].style.transform.includes(
                        'translateX(',
                      )
                  ) {
                    if (
                      parseFloat(
                        document
                          .getElementById(state.selectedElement.id)
                          .children[0].children[0].style.transform.split(
                            'translateX(',
                          )[1]
                          .split('px')[0],
                      ) < 0
                    ) {
                      abnormalDifference =
                        width - previousDimentions.frameWidth;
                      if (
                        target.children[0].children[0].style.transform.includes(
                          'translateX(',
                        )
                      ) {
                        if (previoustranslateX + abnormalDifference > 0) {
                          target.children[0].children[0].style.transform = `translateX(0px) translateY(${state.pages[0].elements[selectedElementIndex].ImagetranslateY}px)`;
                          dispatch({
                            type: 'SET_ImagetranslateX0',
                          });
                        } else {
                          target.children[0].children[0].style.transform = `translateX(${
                            previoustranslateX + abnormalDifference
                          }px) translateY(${
                            state.pages[0].elements[selectedElementIndex]
                              .ImagetranslateY
                          }px)`;
                        }
                      } else {
                        if (previoustranslateY + abnormalDifferenceY > 0) {
                          target.children[0].children[0].style.transform =
                            target.children[0].children[0].style.transform.concat(
                              `translateX(0px)`,
                            );
                          dispatch({
                            type: 'SET_ImagetranslateX0',
                          });
                        } else {
                          target.children[0].children[0].style.transform =
                            target.children[0].children[0].style.transform.concat(
                              `translateX(${
                                previoustranslateX + abnormalDifference
                              }px)`,
                            );
                        }
                      }
                    }
                  }
                }
              }
              if (previousDimentions.frameWidth > width) {
                normalDifference = previousDimentions.frameWidth - width;

                target.children[0].children[0].style.transform = `translateX(${
                  state.pages[0].elements[selectedElementIndex]
                    .ImagetranslateX - normalDifference
                }px) translateY(${
                  state.pages[0].elements[selectedElementIndex].ImagetranslateY
                }px)`;
              }
            }
            if (state.resizePointer === 'right') {
              const imageHeight = document.getElementById(
                state.selectedElement.id,
              ).offsetHeight;
              const beforeTranslate = drag.beforeTranslate;
              selectedFrame.properties.translate = beforeTranslate;
              let deg = selectedFrame.properties.transform.rotate;
              let scale = selectedFrame.properties.scale;
              target.style.width = `${width}px`;

              let translateDifference = 0;
              if (
                target.children[0].children[0].style.transform.includes(
                  'translateX',
                )
              ) {
                translateDifference = parseFloat(
                  target.children[0].children[0].style.transform
                    .split('translateX(')[1]
                    .split('px)')[0],
                );
              }
              if (width - translateDifference > state.initialWidth) {
                target.children[0].children[0].style.width = `${
                  width - translateDifference
                }px`;
                target.children[0].children[0].style.height = `auto`;
                selectedFrame.width = `${width}px`;
                target.style.height = `${imageHeight}px`;
                selectedFrame.height = `${imageHeight}px`;
                selectedFrame.properties.height = `${imageHeight}px`;
                dispatch({
                  type: 'SET_newWidth',
                  payload: width - translateDifference,
                });
              }
              target.style.transform =
                `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)` +
                ` scale(${scale[0]}, ${scale[1]})  rotate(${deg}) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`;
            }

            if (state.resizePointer === 'top') {
              const imageWidth = document.getElementById(
                state.selectedElement.id,
              ).offsetWidth;
              const beforeTranslate = drag.beforeTranslate;
              selectedFrame.properties.translate = beforeTranslate;
              let deg = selectedFrame.properties.transform.rotate;
              let scale = selectedFrame.properties.scale;
              target.style.height = `${height}px`;
              if (height > state.initialHeight) {
                target.children[0].children[0].style.height = `${height}px`;
                target.children[0].children[0].style.width = `auto`;
                selectedFrame.height = `${height}px`;
                target.style.width = `${imageWidth}px`;
                selectedFrame.width = `${imageWidth}px`;
                selectedFrame.properties.width = `${imageWidth}px`;
                dispatch({
                  type: 'SET_newHeight',
                  payload: height,
                });
                target.children[0].children[0].style.transform = `translateX(${state.pages[0].elements[selectedElementIndex].ImagetranslateX}px) translateY(0px)`;
                dispatch({
                  type: 'SET_ImagetranslateY0',
                });
              }
              target.style.transform =
                `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)` +
                ` scale(${scale[0]}, ${scale[1]})  rotate(${deg}) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`;
              //   if (
              //   previousDimentions.frameHeight <
              //   parseFloat(selectedFrame.properties.height.split('px')[0])
              // ) {
              if (height > previousDimentions.frameHeight) {
                if (
                  parseFloat(
                    document
                      .getElementById(state.selectedElement.id)
                      .children[0].children[0].style.transform.split(
                        'translateY(',
                      )[1]
                      .split('px')[0],
                  ) < 0
                ) {
                  abnormalDifferenceY = height - previousDimentions.frameHeight;
                  if (
                    target.children[0].children[0].style.transform.includes(
                      'translateY(',
                    )
                  ) {
                    if (previoustranslateY + abnormalDifferenceY > 0) {
                      target.children[0].children[0].style.transform = `translateX(${state.pages[0].elements[selectedElementIndex].ImagetranslateX}px) translateY(0px)`;
                    } else {
                      target.children[0].children[0].style.transform = `translateX(${
                        state.pages[0].elements[selectedElementIndex]
                          .ImagetranslateX
                      }px) translateY(${
                        previoustranslateY + abnormalDifferenceY
                      }px)`;
                    }
                  } else {
                    if (previoustranslateY + abnormalDifferenceY > 0) {
                      target.children[0].children[0].style.transform =
                        target.children[0].children[0].style.transform.concat(
                          `translateY(0px)`,
                        );
                      dispatch({
                        type: 'SET_ImagetranslateY0',
                      });
                    } else {
                      target.children[0].children[0].style.transform =
                        target.children[0].children[0].style.transform.concat(
                          `translateY(${
                            previoustranslateY + abnormalDifferenceY
                          }px)`,
                        );
                    }
                  }
                }
              }
              // }
              if (previousDimentions.frameHeight > height) {
                normalDifferenceY = previousDimentions.frameHeight - height;
                target.children[0].children[0].style.transform = `translateX(${
                  state.pages[0].elements[selectedElementIndex].ImagetranslateX
                }px) translateY(${
                  state.pages[0].elements[selectedElementIndex]
                    .ImagetranslateY - normalDifferenceY
                }px)`;
              }
            }
            if (state.resizePointer === 'bottom') {
              const imageWidth = document.getElementById(
                state.selectedElement.id,
              ).offsetWidth;
              const beforeTranslate = drag.beforeTranslate;
              selectedFrame.properties.translate = beforeTranslate;
              let deg = selectedFrame.properties.transform.rotate;
              let scale = selectedFrame.properties.scale;
              target.style.height = `${height}px`;

              let translateDifferenceY = 0;
              if (
                target.children[0].children[0].style.transform.includes(
                  'translateY',
                )
              ) {
                translateDifferenceY = parseFloat(
                  target.children[0].children[0].style.transform
                    .split('translateY(')[1]
                    .split('px)')[0],
                );
              }
              if (height - translateDifferenceY > state.initialHeight) {
                target.children[0].children[0].style.height = `${
                  height - translateDifferenceY
                }px`;
                target.children[0].children[0].style.width = `auto`;
                selectedFrame.height = `${height}px`;
                target.style.width = `${imageWidth}px`;
                selectedFrame.width = `${imageWidth}px`;
                selectedFrame.properties.width = `${imageWidth}px`;
                dispatch({
                  type: 'SET_newHeight',
                  payload: height - translateDifferenceY,
                });
              }
              target.style.transform =
                `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)` +
                ` scale(${scale[0]}, ${scale[1]})  rotate(${deg}) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`;
            }
          }}
          renderDirections={['n', 'e', 's', 'w']}
        />
      ) : (
        ''
      )}
      <Moveable
        ref={moveableRefGroup}
        target={state.targets ?? null}
        container={document.getElementsByClassName('pageContainer')[0]}
        resizable={false}
        draggable={true}
        scalable={true}
        rotatable={false}
        origin={false}
        throttleDrag={5}
        throttleRotate={45}
        keepRatio={true}
        height={'auto'}
        onClickGroup={(e) => {
          selectoRef.current.clickTarget(e.inputEvent, e.inputTarget);
        }}
        onScale={onScale}
        onRotate={onRotate}
        onDrag={onDrag}
        onScaleStart={onScaleStart}
        onRotateStart={onRotateStart}
        onDragStart={onDragStart}
        onScaleEnd={onScaleEnd}
        onDragEnd={onDragEnd}
        onRotateEnd={onRotateEnd}
        onScaleGroupStart={onScaleGroupStart}
        onScaleGroup={onScaleGroup}
        onDragGroupStart={onDragGroupStart}
        onDragGroup={onDragGroup}
        // onRotateGroupStart={onRotateGroupStart}
        // onRotateGroup={onRotateGroup}
        renderDirections={
          state.target &&
          (state.target.tagName === 'ARTICLE' || state.target.tagName === 'UL')
            ? parseFloat(state.target.style.fontSize.split('px')[0]) > 20
              ? ['nw', 'ne', 'se', 'sw', 'e', 'w']
              : ['nw', 'e']
            : ['nw', 'ne', 'se', 'sw']
        }
      />
      <Selecto
        ref={selectoRef}
        dragContainer={'.dynamicPagesDiv'}
        selectableTargets={[`.dynamicPagesDiv .moveable`]}
        hitRate={0}
        selectByClick={true}
        selectFromInside={false}
        toggleContinueSelect={['shift']}
        ratio={0}
        onSelect={(e) => {
          dispatch({ type: 'UNGROUP' });
          if (e.selected.length > 1) {
            dispatch({ type: 'SELECTION', payload: e.selected });
          }
          dispatch({
            type: 'SAVE_HISTORY',
          });
        }}
        onSelectEnd={(e) => {
          const moveable = moveableRefGroup.current;
          if (e.isDragStart) {
            e.inputEvent.preventDefault();
            setTimeout(() => {
              moveable.dragStart(e.inputEvent);
            });
          }
          dispatch({
            type: 'SAVE_HISTORY',
          });
        }}
      ></Selecto>
      <div
        className={
          state.pageWidth > 600 && state.sidebarType === ''
            ? 'pageFullContainerPageSize1000'
            : state.sidebarType === ''
            ? 'pageFullContainer'
            : state.doubleClick
            ? 'pageContainerOnDoubleClick'
            : 'pageContainer'
        }
        id="p0"
        onClick={onClickEditor}
        onresize={onResizeScreen}
        style={{
          width: `${
            setDimensionsOfEditorContainer(type, userState, state)[0]
          }px`,
          height: `${
            setDimensionsOfEditorContainer(type, userState, state)[1]
          }px`,
          position: 'absolute',
          // left: '50%',
          // transform: 'translateX(30%)'
        }}
      >
        <div className="editorBarsDiv"></div>
        <div
          className="dynamicPagesDiv"
          id="d0"
          style={{
            transform: `scale(${
              (state.pages[0].scaleX, state.pages[0].scaleY)
            })`,
            width: `${
              type === 'Template' ? userState.pageWidth : state.pageWidth
            }px`,
            height: `${
              type === 'Template' ? userState.pageHeight : state.pageHeight
            }px`,
            position: 'absolute',
          }}
        >
          {renderPages()}
        </div>
        <div className="label" ref={state.labelRef} />
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className="zoomDiv">
          {zoomVisiblilty ? (
            <div>
              <div className="zomPercentageDiv">
                <button
                  className="zoomPercentageBtn"
                  id="0.25"
                  onClick={setZoomPercentage}
                >
                  25%
                </button>
                <button
                  className="zoomPercentageBtn"
                  id="0.50"
                  onClick={setZoomPercentage}
                >
                  50%
                </button>
                <button
                  className="zoomPercentageBtn"
                  id="0.75"
                  onClick={setZoomPercentage}
                >
                  75%
                </button>
                <button
                  className="zoomPercentageBtn"
                  id="1"
                  onClick={setZoomPercentage}
                >
                  100%
                </button>
                <button
                  className="zoomPercentageBtn"
                  id="1.25"
                  onClick={setZoomPercentage}
                >
                  125%
                </button>
                <button
                  className="zoomPercentageBtn"
                  id="1.50"
                  onClick={setZoomPercentage}
                >
                  150%
                </button>
                {/* <button
              className="zoomPercentageBtn"
              id="1.75"
              onClick={setZoomPercentage}
            >
              175%
            </button>
            <button
              className="zoomPercentageBtn"
              id="2"
              onClick={setZoomPercentage}
            >
              200%
            </button> */}
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="zoomFunc">
            <div className="zoomfuncDiv">
              <button className="zoomValue">
                <div style={{ flex: 10 }} className="d-flex">
                  <span className="mx-4">
                    <ZoomOut className="zoomInBtn" />
                  </span>
                  <span>
                    {state.zoomPercentage > 0 ? (
                      <input
                        type="range"
                        className=" maxWidth10"
                        min={10}
                        max={150}
                        step={1}
                        defaultValue={parseInt(state.zoomPercentage)}
                        onChange={setZoomPercentageBySlider}
                      />
                    ) : (
                      <></>
                    )}
                  </span>
                  <span className="mx-4">
                    <ZoomIn className="zoomInBtn" />
                  </span>
                </div>
                <div style={{ flex: 3 }}>
                  <span className="mr-4" onClick={zoomPercentageVisible}>
                    {parseInt(state.zoomPercentage)} %
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Editor);
