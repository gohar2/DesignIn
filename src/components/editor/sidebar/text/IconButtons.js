import React, { useContext } from 'react';
import { ReactComponent as TextRightAlign } from '../../../../icons/TextRightAlign.svg';
import { ReactComponent as TextLeftAlign } from '../../../../icons/TextLeftAlign.svg';
import { ReactComponent as TextCenterAlign } from '../../../../icons/TextCenterAlign.svg';
import { ReactComponent as List } from '../../../../icons/List.svg';
import { ReactComponent as NoList } from '../../../../icons/nolist.svg';
import { ReactComponent as Numbering } from '../../../../icons/Numbering.svg';
import { ReactComponent as Bold } from '../../../../icons/Bold.svg';
import { ReactComponent as Italic } from '../../../../icons/Italic.svg';
import { ReactComponent as Underline } from '../../../../icons/Underline.svg';
import { ReactComponent as FontCase } from '../../../../icons/FontCase.svg';
import { converttolist, formatText } from '../../../../utils/index';
// import { ReactComponent as TextColor } from '../../../../icons/TextColor.svg'; Shaheer code-refactoring-removing-unused-variables
import Context from '../../../store/store';
import './IconButtons.css';
import PageColorPicker from '../../editorBar/PageColor';
import { FormattedMessage } from 'react-intl';
import UserContext from '../../../../userContext/UserContext';

const IconButtons = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(UserContext);

  const onClickBoldIcon = () => {
    dispatch({
      type: 'BOLD_TEXT',
      payload: state.selectedElement ? !state.selectedElement.isBold : false,
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  const onClickItalicIcon = () => {
    dispatch({
      type: 'ITALIC_TEXT',
      payload: state.selectedElement ? !state.selectedElement.isItalic : false,
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  const onClickUnderlineIcon = () => {
    dispatch({
      type: 'UNDERLINE_TEXT',
      payload: state.selectedElement
        ? !state.selectedElement.isUnderline
        : false,
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  const onClickUppercaseIcon = () => {
    dispatch({
      type: 'UPPERCASE_TEXT',
      payload: state.selectedElement
        ? !state.selectedElement.isUppercase
        : false,
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  const onClickAlignment = (e) => {
    dispatch({
      type: 'ALIGN_TEXT',
      payload: e.currentTarget.id,
    });
    dispatch({
      type: 'SET_ALIGNMENTV',
      payload: false,
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const selectAlignment = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'SET_ALIGNMENTV',
      payload: !state.alignmentV,
    });
    dispatch({
      type: 'SET_LISTV',
      payload: false,
    });
  };
  const selectList = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'SET_LISTV',
      payload: !state.listV,
    });
    dispatch({
      type: 'SET_ALIGNMENTV',
      payload: false,
    });
  };
  const onClickColorPickerIcon = (e) => {
    // let selection = window.getSelection().toString();
    // document.execCommand('insertHTML', false, `<span id=${selection}>${selection}</span>`); // Send the command to the browser
    e.stopPropagation();
    dispatch({
      type: 'SET_TEXT_COLOR',
      payload: {
        isColorPicker: state.selectedElement ? true : false,
        color: state.selectedElement ? state.selectedElement.color : '#111111',
      },
    });
  };

  const onClickList = (e) => {
    e.stopPropagation();
    let tlist = new Promise((onSuccess) => {
      dispatch({
        type: 'LIST_TEXT',
        payload: e.currentTarget.id,
      });
      onSuccess(true);
    });
    tlist.then((result) => {
      let elem = state.selectedElement;
      if (state.selectedElement)
        dispatch({
          type: 'EDIT_TEXT',
          payload: {
            value: converttolist(elem.text, elem.list, elem),
            id: state.selectedElement.id,
          },
        });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    });
  };
  const closeAlignmentList = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'SET_LISTV',
      payload: false,
    });
    dispatch({
      type: 'SET_ALIGNMENTV',
      payload: false,
    });
  };
  const handleNewColors = (color) => {
    dispatch({
      type: 'SET_TEXT_COLOR',
      payload: {
        // isColorPicker: true,
        color: color,
      },
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  return (
    <div className="TextSettingDiv" onClick={closeAlignmentList}>
      <div
        className={
          userState.isArabic
            ? 'd-flex align-items-center justify-content-between mb-5 flex-row-reverse'
            : 'd-flex align-items-center justify-content-between mb-5'
        }
      >
        <div
          className={
            userState.isArabic
              ? 'createFolderHeading_Ar'
              : 'createFolderHeading'
          }
        >
          <FormattedMessage id="textColor" defaultMessage="Text Color" />
        </div>
        <div>
          <PageColorPicker
            selectedColor={state.selectedElement.color}
            newcolor={(color) => {
              handleNewColors(color);
            }}
          ></PageColorPicker>
        </div>
        <div>
          <button
            className={
              userState.isArabic ? 'btnDropShadow_Ar' : 'btnDropShadow'
            }
          >
            <FormattedMessage id="addShadow" defaultMessage="Add Shadow" />
          </button>
        </div>
      </div>
      <hr className="customHrEditor" />

      <div className="textBarIconsFirstDiv justify-content-between mt-5 w-100">
        <div
          className={
            userState.isArabic
              ? 'd-flex w-100 align-items-center flex-row-reverse'
              : 'w-100 d-flex align-items-center'
          }
        >
          <div
            className={
              userState.isArabic
                ? 'textBarFontSidebar_Ar w-25 text-right'
                : 'textBarFontSidebar w-25'
            }
          >
            <FormattedMessage id="txtStyle" defaultMessage="Text Style" />
          </div>
          <div class="d-flex">
            <div
              className={
                (state.selectedElement ? state.selectedElement.isBold : false)
                  ? 'selectedTextBtnDiv'
                  : 'textBoldBtnDiv '
              }
            >
              <button className="textBoldBtn" onClick={onClickBoldIcon}>
                <Bold className="textBarIcon" />
              </button>
            </div>
            <div
              className={
                (
                  state.selectedElement
                    ? state.selectedElement.isUppercase
                    : false
                )
                  ? 'selectedTextBtnDiv'
                  : 'textBoldBtnDiv'
              }
            >
              <button className="textBoldBtn" onClick={onClickUppercaseIcon}>
                <FontCase className="textBarIcon" />
              </button>
            </div>
            <div
              className={
                (
                  state.selectedElement
                    ? state.selectedElement.isUnderline
                    : false
                )
                  ? 'selectedTextBtnDiv'
                  : 'textBoldBtnDiv'
              }
            >
              <button className="textBoldBtn" onClick={onClickUnderlineIcon}>
                <Underline className="textBarIcon" />
              </button>
            </div>
            <div
              className={
                (state.selectedElement ? state.selectedElement.isItalic : false)
                  ? 'selectedTextBtnDiv'
                  : 'textBoldBtnDiv'
              }
            >
              <button
                className="textBoldBtn"
                key={'italic'}
                onMouseDown={(evt) => {
                  evt.preventDefault(); // Avoids loosing focus from the editable area
                  onClickItalicIcon();
                  // document.execCommand('italic', false, 'i'); // Send the command to the browser
                }}
              >
                <Italic className="textBarIcon" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {state.alignmentV ? ( */}
      <div
        className={
          userState.isArabic
            ? 'd-flex w-100 align-items-center my-4  flex-row-reverse'
            : 'w-100 d-flex align-items-center my-4'
        }
      >
        <div
          className={
            userState.isArabic
              ? 'textBarFontSidebar_Ar w-25 text-right'
              : 'textBarFontSidebar w-25'
          }
        >
          <FormattedMessage id="txtAlign" defaultMessage="Text Align" />
        </div>
        <div className="d-flex">
          <div
            className={
              state.selectedElement.textAlign === 'left'
                ? 'selectedTextBtnDiv'
                : 'textBoldBtnDiv '
            }
          >
            <div className="textBoldBtn">
              <TextLeftAlign
                className="alignRightIcon"
                id={2}
                onClick={onClickAlignment}
              />
            </div>
          </div>
          <div className="">
            <div
              className={
                state.selectedElement.textAlign === 'center'
                  ? 'selectedTextBtnDiv'
                  : 'textBoldBtnDiv '
              }
            >
              <div className="textBoldBtn">
                <TextCenterAlign
                  className="alignRightIcon"
                  id={0}
                  onClick={onClickAlignment}
                />
              </div>
            </div>
          </div>
          <div
            className={
              state.selectedElement.textAlign === 'right'
                ? 'selectedTextBtnDiv'
                : 'textBoldBtnDiv '
            }
          >
            <div className="textBoldBtn">
              <TextRightAlign
                className="alignRightIcon"
                id={1}
                onClick={onClickAlignment}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className={
            userState.isArabic
              ? 'd-flex w-100 align-items-center flex-row-reverse'
              : 'w-100 d-flex align-items-center'
          }
        >
          <div
            className={
              userState.isArabic
                ? 'textBarFontSidebar_Ar w-25 text-right'
                : 'textBarFontSidebar w-25'
            }
          >
            <FormattedMessage id="txtList" defaultMessage="Text List" />
          </div>

          <div
            className={
              state.selectedElement.list === 0
                ? 'selectedTextBtnDiv'
                : 'textBoldBtnDiv '
            }
          >
            <div className="textBoldBtn">
              <NoList className="alignRightIcon" id={0} onClick={onClickList} />
            </div>
          </div>
          <div
            className={
              state.selectedElement.list === 1
                ? 'selectedTextBtnDiv'
                : 'textBoldBtnDiv '
            }
          >
            <div className="textBoldBtn">
              <List className="alignRightIcon" id={1} onClick={onClickList} />
            </div>
          </div>
          <div
            className={
              state.selectedElement.list === 2
                ? 'selectedTextBtnDiv'
                : 'textBoldBtnDiv '
            }
          >
            <div className="textBoldBtn">
              <Numbering
                className="alignRightIcon"
                id={2}
                onClick={onClickList}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconButtons;
