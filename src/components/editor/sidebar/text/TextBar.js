import React, { useContext } from 'react';
import { ReactComponent as CrossIconEditor } from '../../../../icons/CrossIconEditor.svg';
// import { ReactComponent as DropdownArrow } from '../../../../icons/dropdownArrow.svg';
import { ReactComponent as NewCreateBtnDownIcon } from '../../../../icons/NewCreateBtnDownIcon.svg';
import { FormattedMessage } from 'react-intl';
import Context from '../../../store/store';
import userContext from '../../../../userContext/UserContext';
import Slider from '../../editorBar/Slider';
import IconButtons from './IconButtons';
import './TextBar.css';
import { formatText } from '../../../../utils';
// import { removeTextFrame } from '../../../../utils/index'; Shaheer code-refactoring-removing-unused-variables

const TextBar = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this

  const onChangeFontSize = (changeEvent) => {
    // removeTextFrame();
    dispatch({ type: 'REMOVE_SELECTIONN' });
    dispatch({
      type: 'SET_FONT_SCALE',
      payload: parseInt(changeEvent.target.value),
    });
    dispatch({
      type: 'SET_TARGET_NULL',
      payload: parseInt(changeEvent.target.value),
    });
    dispatch({
      type: 'SET_FONTSIZE',
      payload: parseInt(changeEvent.target.value),
    });
  };
  const onAfterChange = (changeEvent) => {
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  const onChangeLineHeight = (changeEvent) => {
    let tlist = new Promise((onSuccess) => {
      dispatch({ type: 'REMOVE_SELECTIONN' });
      dispatch({
        type: 'SET_TARGET_NULL',
        payload: parseInt(changeEvent.target.value),
      });
      dispatch({
        type: 'SET_LINE_HEIGHT',
        payload: parseFloat(changeEvent.target.value),
      });
      onSuccess(true);
    });
    tlist.then((result) => {
      dispatch({
        type: 'SAVE_HISTORY',
      });
    });
  };

  const onChangeSpacing = (changeEvent) => {
    dispatch({ type: 'REMOVE_SELECTIONN' });
    dispatch({
      type: 'SET_TARGET_NULL',
      payload: parseInt(changeEvent.target.value),
    });
    if (!state.selectedElement.isArabic) {
      dispatch({
        type: 'SET_LETTER_SPACING',
        payload: parseInt(changeEvent.target.value),
      });
    } else {
      dispatch({
        type: 'SET_WORD_SPACING',
        payload: parseInt(changeEvent.target.value),
      });
    }
  };

  const showFonts = (val) => {
    dispatch({
      type: 'SHOW_FONTS',
      payload: val,
    });
  };

  const closeTextBar = (val) => {
    dispatch({
      type: 'SHOW_TEXT_BAR',
      payload: val,
    });
  };

  return (
    <>
      <div className="pagesContainer">
        <div
          className={
            userState.isArabic ? 'createPageDiv arabicMode' : 'createPageDiv'
          }
        >
          <div>
            <CrossIconEditor
              className="createFolderIcon mt-4 "
              onClick={() => closeTextBar(false)}
            />
          </div>
        </div>
      </div>
      <div className="textBarDiv">
        {/* <div
          className={
            userState.isArabic ? 'headingTextSidebar_Ar' : 'headingTextSidebar'
          }
        >
          <FormattedMessage id="FontName" defaultMessage="Font Name" />
        </div> */}

        <div
          class="input-group w-100 mb-5 pb-4"
          onClick={() => showFonts(true)}
        >
          <div className="headingTextSidebarName w-75">
            {state.selectedElement
              ? state.selectedElement.fontFamily
                ? state.selectedElement.fontFamily
                : ''
              : ''}
          </div>
          <div class="input-group-append w-25">
            <div class="tickFolderIconDiv w-100">
              <NewCreateBtnDownIcon className="textBarIconDD mt-n1" />
            </div>
          </div>
        </div>

        {/* <div
          className={
            userState.isArabic ? 'fontSizeDiv arabicMode' : 'fontSizeDiv'
          }
          onClick={() => showFonts(true)}
        >
          <div className="headingTextSidebarName">
            {state.selectedElement
              ? state.selectedElement.fontFamily
                ? state.selectedElement.fontFamily
                : ''
              : ''}
          </div>
          <DropdownArrow className="textBarIconDD" />
        </div> */}
        <div
          className={
            userState.isArabic
              ? 'createPageDiv arabicMode mb-5'
              : 'createPageDiv mb-5'
          }
        >
          <div
            className={
              userState.isArabic
                ? 'createFolderHeading_Ar arabicMode'
                : 'createFolderHeading'
            }
          >
            <FormattedMessage id="editText" defaultMessage="EDIT TEXT" />
          </div>
        </div>
        <Slider
          heading="Font Size"
          id="fontSize"
          headingDivClassName="textBarFontDiv"
          headingClassName={
            userState.isArabic
              ? 'textBarFontSidebar_Ar w-25'
              : 'textBarFontSidebar w-25'
          }
          valueClassName={
            userState.isArabic ? 'valueDivSidebar_Ar' : 'valueDivSidebar'
          }
          min={6}
          max={144}
          step={1}
          onAfterChange={onAfterChange}
          onChange={onChangeFontSize}
          value={(() => {
            if (state.selectedElement) {
              let fsixe = state.selectedElement.fontSize + '';
              fsixe = fsixe.includes('px') ? fsixe.split('px')[0] : fsixe;
              return parseInt(fsixe);
            }
            return 18;
          })()}
        />
        <Slider
          headingDivClassName="textBarFontDiv"
          heading="Line Height"
          id="lineHeight"
          headingClassName={
            userState.isArabic
              ? 'textBarFontSidebar_Ar w-25 text-right'
              : 'textBarFontSidebar w-25'
          }
          valueClassName={
            userState.isArabic ? 'valueDivSidebar_Ar' : 'valueDivSidebar'
          }
          min={0}
          max={4}
          step={0.1}
          onAfterChange={onAfterChange}
          onChange={onChangeLineHeight}
          value={state.selectedElement ? state.selectedElement.lineHeight : 1}
        />
        <Slider
          headingDivClassName="textBarFontDiv"
          heading="Spacing"
          id="spacing"
          headingClassName={
            userState.isArabic
              ? 'textBarFontSidebar_Ar w-25 text-right'
              : 'textBarFontSidebar w-25'
          }
          valueClassName={
            userState.isArabic ? 'valueDivSidebar_Ar' : 'valueDivSidebar'
          }
          min={-5}
          max={5}
          step={1}
          onAfterChange={onAfterChange}
          onChange={onChangeSpacing}
          value={
            state.selectedElement && !state.selectedElement.isArabic
              ? state.selectedElement.letterSpacing
              : state.selectedElement.wordSpacing
          }
        />
        <hr className="textBarSeparationLine" />
        <IconButtons />
      </div>
    </>
  );
};

export default TextBar;
