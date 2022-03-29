import React, { useContext } from 'react';
import userContext from '../../../userContext/UserContext';
import EditorBarIconButton from './EditorBarIconButton';
import { ReactComponent as Undo } from '../../../icons/Undo.svg';
import { ReactComponent as Redo } from '../../../icons/Redo.svg';
import { ReactComponent as UnLock } from '../../../icons/UnLock.svg';
import { ReactComponent as Lock } from '../../../icons/Lock.svg';
import { ReactComponent as Delete } from '../../../icons/Delete.svg';
import { ReactComponent as Cross } from '../../../icons/Cancel.svg';
import { ReactComponent as Tick } from '../../../icons/Tick.svg';
import Flip from './flip/Flip';
// import Animation from './animation/Animation';
import Opacity from './opacity/Opacity';
// import Spacing from './spacing/Spacing';  Shaheer code-refactoring-removing-unused-variables
import DropdownButton from './DropdownButton';
import Context from '../../store/store';
import './EditorBar.css';
import { Icon } from '@iconify/react';
import downArrow from '@iconify/icons-mdi/chevron-down';
import { FormattedMessage } from 'react-intl';
import PageColorPicker from './PageColor';
import '../sidebar/iconCollorPicker/IconColorBar.css';

const EditorBar = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const lockElementsCount = state.pages[
    state.selectedPage.pageId
  ].elements.filter((el) => el.lock).length;

  const changeColor = (colorObject) => () => {
    let getdocumentColors = [];
    state.pages[state.selectedPage.pageId].elements.forEach((el, ind) => {
      if (el.type === 'svg') {
        if (el.colors)
          el.colors.forEach((cl) => getdocumentColors.push(cl.color));
      }
    });
    dispatch({ type: 'SET_DOCUMENT_COLORS', payload: getdocumentColors });
    dispatch({
      type: 'SET_COLOR_CLASS',
      payload: colorObject,
    });
    dispatch({
      type: 'SHOW_SIDEBAR',
      payload: 'IconColorBar',
    });
  };
  // const changePageColor = colorObject => () => {  Shaheer code-refactoring-removing-unused-variables
  //   dispatch({
  //     type: 'SHOW_PAGE_COLOR_PICKER',
  //     payload: true,
  //   });
  // };
  const onClickDeleteElement = () => {
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
  };

  const onClickDuplicateBtn = () => {
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
  };

  const onClickCropBtn = () => {
    dispatch({
      type: 'SET_SELECTED_EDITOR_BTN',
      payload: null,
    });
    dispatch({
      type: 'CROP_IMAGE',
      payload: true,
    });
  };

  const onClickLock = () => {
    dispatch({
      type: 'SET_SELECTED_EDITOR_BTN',
      payload: null,
    });
    dispatch({
      type: 'LOCK',
    });
  };

  const onClickUnLock = () => {
    dispatch({
      type: 'UNLOCK',
    });
  };

  const onClickDoneBtn = () => {
    if (state.selectedElement?.type === 'grid') {
      dispatch({
        type: 'DONE_GRID',
        payload: {
          id: state.selectedElement.id,
          name: state.selectedElement.name,
        },
      });
    } else if (state.selectedElement?.type === 'frame') {
      dispatch({
        type: 'DONE_FRAME',
        payload: {
          id: state.selectedElement.id,
          name: state.selectedElement.name,
        },
      });
    } else {
      // state.imageRef.current.cropper.imageData.scaleY = 1;
      // state.imageRef.current.cropper.imageData.scaleX = 1;
      dispatch({
        type: 'CROPPED_IMAGE',
        payload: state?.imageRef?.current?.cropper
          .getCroppedCanvas()
          .toDataURL(),
        payload2: {
          scaleY: state.imageRef.current.cropper.imageData.scaleY,
          scaleX: state.imageRef.current.cropper.imageData.scaleX,
        },
      });
    }
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  const onClickCancelBtn = (e) => {
    e.stopPropagation();
    if (state.selectedElement?.type === 'grid') {
      dispatch({
        type: 'CANCEL_GRID',
      });
    } else if (state.selectedElement?.type === 'frame') {
      dispatch({
        type: 'CANCEL_FRAME',
      });
    } else {
      dispatch({
        type: 'CROP_IMAGE',
        payload: false,
      });
    }
  };

  const onClickUndo = () => {
    dispatch({
      type: 'SET_SELECTED_EDITOR_BTN',
      payload: null,
    });
    dispatch({
      type: 'UNDO',
    });
  };

  const onClickRedo = () => {
    dispatch({
      type: 'SET_SELECTED_EDITOR_BTN',
      payload: null,
    });
    dispatch({
      type: 'REDO',
    });
  };

  // const onClickCopyStyleBtn = () => {  Shaheer code-refactoring-removing-unused-variables
  //   dispatch({
  //     type: 'COPY_STYLE',
  //   });
  // };

  const onClickBalanceEffects = (e) => {
    dispatch({
      type: 'SET_SELECTED_EDITOR_BTN',
      payload: null,
    });
    e.stopPropagation();
    dispatch({ type: 'SHOW_SIDEBAR', payload: e.currentTarget.id });
  };

  const page =
    state.pages &&
    state.pages.length < 0 &&
    state.pages[state.selectedPage.pageId];

  const onClickEditorBar = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'REMOVE_SELECTIONN',
    });
    dispatch({
      type: 'SET_ALIGNMENTV',
      payload: false,
    });
    dispatch({
      type: 'SET_LISTV',
      payload: false,
    });
  };
  const handleNewColors = (color) => {
    dispatch({
      type: 'SET_PAGE_COLOR',
      payload: color,
    });
  };

  const onClickGroupBtn = () => {
    dispatch({
      type: 'SAVE_HISTORY',
    });
    dispatch({
      type: 'GROUP',
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  const onClickUnGroupBtn = () => {
    dispatch({
      type: 'SAVE_HISTORY',
    });
    dispatch({
      type: 'UNGROUP',
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  return (
    <>
      <div className="editorBarDiv" onClick={onClickEditorBar}>
        {/* {state.selectedPage.pageColor && state.selectedPage.pageColor.length ? (
          <PageColorPicker
            newcolor={color => {
              handleNewColors(color);
            }}
          ></PageColorPicker>
        ) : null} */}

        {state.selectedElementBtns === 'text' ||
        state.selectedElementBtns === 'group' ||
        state.selectedElementBtns === 'icon' ||
        state.selectedElementBtns === 'background' ||
        state.selectedElementBtns === 'img' ||
        (state.selectedElementBtns === 'grid' && !state.doubleClick) ? (
          <div className="editorBarIconDiv">
            <Delete className="deleteIcon" onClick={onClickDeleteElement} />
            {lockElementsCount > 1 ? (
              <Lock className="unLockIcon" onClick={onClickUnLock} />
            ) : (
              <UnLock className="lockIcon" onClick={onClickLock} />
            )}
            {state.undoArray && state.undoArray.length ? (
              <Undo className="undoIcon" onClick={onClickUndo} />
            ) : (
              <></>
            )}
            {state.redoArray && state.redoArray.length ? (
              <Redo className="redoIcon" onClick={onClickRedo} />
            ) : (
              <></>
            )}
          </div>
        ) : (
          state.selectedPage &&
          state.sidebarType !== '' && (
            <div className="editorBarIconDiv">
              {state.selectedElement && !state.selectedElementBtns && (
                <Lock className="unLockIcon" onClick={onClickUnLock} />
              )}
              {state.selectedPage && state.selectedPage.backgroundImage && (
                <Delete className="deleteIcon" onClick={onClickDeleteElement} />
              )}
              {state.undoArray && state.undoArray.length ? (
                <Undo className="undoIcon" onClick={onClickUndo} />
              ) : (
                <></>
              )}
              {state.redoArray && state.redoArray.length ? (
                <Redo className="redoIcon" onClick={onClickRedo} />
              ) : (
                <></>
              )}
            </div>
          )
        )}

        {state.selectedElementBtns === null &&
          page &&
          page.elements.length > 0 &&
          state.selectedElement &&
          page.elements[
            parseInt(
              page.elements.findIndex(
                (el) => state.selectedElement.id === el.id,
              ),
            )
          ] &&
          page.elements[
            parseInt(
              page.elements.findIndex(
                (el) => state.selectedElement.id === el.id,
              ),
            )
          ].lock && (
            <div className="editorBarIconDiv">
              <Lock className="unLockIcon" onClick={onClickUnLock} />
            </div>
          )}
        <div className="editorBarButtonsDiv">
          {state.selectedElementBtns === 'text' ||
          state.selectedElementBtns === 'icon' ||
          state.selectedElementBtns === 'img' ||
          (state.selectedElementBtns === 'grid' &&
            !state.targets &&
            !state.doubleClick) ? (
            <DropdownButton
              component={<Opacity />}
              btnName="Opacity"
              id="opacity"
              className={
                userState.isArabic
                  ? 'editorBarRoundBtn_Ar'
                  : 'editorBarDropdownRoundBtnDownload'
              }
              icon={<Icon className="addIcon" icon={downArrow} />}
            />
          ) : null}
          {state.selectedElementBtns === 'icon' ||
          state.selectedElementBtns === 'background' ||
          state.selectedElementBtns === 'img' ||
          (state.selectedElementBtns === 'grid' &&
            !state.targets &&
            !state.doubleClick &&
            state.isFrame) ? (
            <DropdownButton
              component={<Flip />}
              btnName="Flip"
              id="flip"
              className={
                userState.isArabic
                  ? 'editorBarRoundBtn_Ar'
                  : 'editorBarDropdownRoundBtnDownload'
              }
              icon={<Icon className="addIcon" icon={downArrow} />}
            />
          ) : null}
          {((state.selectedElement && state.selectedElement.cropImage) ||
            state.doubleClick) && (
            <>
              <div className="doneBtnDiv">
                <button
                  className={userState.isArabic ? 'done_Ar' : 'done'}
                  onClick={onClickDoneBtn}
                >
                  <Tick className="tick" />
                  <span
                    className={userState.isArabic ? 'doneTxt_Ar' : 'doneTxt'}
                  >
                    <FormattedMessage id="doneTxt" defaultMessage="Done" />
                  </span>
                </button>
              </div>
              <div>
                <button
                  className={userState.isArabic ? 'cancel_Ar' : 'cancel'}
                  onClick={onClickCancelBtn}
                >
                  <Cross className="cross" />
                  <span
                    className={userState.isArabic ? 'doneTxt_Ar' : 'donrTxt'}
                  >
                    <FormattedMessage id="cancelTxt" defaultMessage="Cancel" />
                  </span>
                </button>
              </div>
            </>
          )}

          {state.selectedElementBtns === 'img' ||
          state.selectedElementBtns === 'background' ||
          (state.selectedElementBtns === 'grid' &&
            !state.targets &&
            !state.doubleClick) ? (
            <button
              id="effects"
              className={
                userState.isArabic
                  ? 'editorBarRoundBtnO_Ar'
                  : 'editorBarRoundBtnO'
              }
              onClick={onClickBalanceEffects}
            >
              <FormattedMessage id={'effects'} defaultMessage={'Effects'} />
            </button>
          ) : null}

          {(state.selectedElementBtns === 'text' ||
            // state.selectedElementBtns === 'group' ||
            state.selectedElementBtns === 'icon' ||
            state.selectedElementBtns === 'img') &&
          !state.targets &&
          !state.doubleClick ? (
            <div className="editorBarRoundBtns">
              <div className="editorBarRoundBtnsOuterBorder">
                <EditorBarIconButton
                  btn={
                    userState.isArabic
                      ? 'editorBarRoundBtn_ArW'
                      : 'editorBarRoundBtn'
                  }
                  btnName="Duplicate"
                  id="duplicate"
                  onClick={onClickDuplicateBtn}
                />
              </div>
            </div>
          ) : null}
          {(state.selectedElementBtns === 'background' ||
            state.selectedElementBtns === 'img') &&
          !state.targets &&
          !state.doubleClick ? (
            <div className="editorBarRoundBtns">
              <div className="editorBarRoundBtnsOuterBorder">
                <EditorBarIconButton
                  btn={
                    userState.isArabic
                      ? 'editorBarRoundBtn_ArW'
                      : 'editorBarRoundBtn'
                  }
                  btnName="Crop"
                  id="crop"
                  onClick={onClickCropBtn}
                />
              </div>
            </div>
          ) : null}
          {state.selectedElement == null &&
          !state.targets &&
          state.selectedPage.pageColor &&
          state.selectedPage.pageColor.length ? (
            <div className="pageColorPickerDiv d-flex ">
              <PageColorPicker
                selectedColor={state.selectedPage.pageColor}
                newcolor={(color) => {
                  handleNewColors(color);
                }}
              ></PageColorPicker>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default EditorBar;
