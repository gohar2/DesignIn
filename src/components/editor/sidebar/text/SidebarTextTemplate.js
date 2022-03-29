import React, { useContext } from 'react';
import Context from '../../../store/store';
import './SidebarTextTemplate.css';
import SidebarCloseComponent from '../close/SidebarCloseComponent';
import {
  createFrame,
  checkTextElementsLength,
  setScaleOfNewElement,
} from '../../../../utils/index';
import Fonts from './Fonts';
import { FormattedMessage } from 'react-intl';
import DraggableText from './DraggableText';
import { textHeadings } from '../../../../constants/index.js';
import TextBar from './TextBar';
import ColorPicker from './ColorPicker';

const SidebarTextTemplate = (props) => {
  const [state, dispatch] = useContext(Context);

  const onClickText = (e, val) => {
    dispatch({ type: 'IS_DRAGGED', payload: true });
    let fontSize,
      isArabic,
      isBold,
      direction,
      fontFamily,
      tWidth = 221,
      textType = 'heading';
    if (e.currentTarget.id === 'heading') {
      isArabic = false;
      fontSize = '35px';
      isBold = true;
      direction = 'ltr';
      fontFamily = 'NeoSans';
      tWidth = 221;
      textType = 'heading';
    } else if (e.currentTarget.id === 'subheading') {
      isArabic = false;
      fontSize = '15px';
      isBold = true;
      fontFamily = 'NeoSans';
      direction = 'ltr';
      tWidth = 120;
      textType = 'subHeading';
    } else if (e.currentTarget.id === 'heading_Ar') {
      isArabic = true;
      fontSize = '35px';
      isBold = true;
      fontFamily = 'NeoSans-Arabic';
      direction = 'rtl';
      tWidth = 160;
      textType = 'heading';
    } else if (e.currentTarget.id === 'subheading_Ar') {
      isArabic = true;
      fontSize = '15px';
      isBold = true;
      fontFamily = 'NeoSans-Arabic';
      direction = 'rtl';
      tWidth = 143;
      textType = 'subHeading';
    } else if (e.currentTarget.id === 'body_Ar') {
      isArabic = true;
      fontSize = '12px';
      isBold = false;
      fontFamily = 'NeoSans-Arabic';
      direction = 'rtl';
      tWidth = 148;
      textType = 'body';
    } else {
      isArabic = false;
      fontSize = '12px';
      isBold = false;
      fontFamily = 'NeoSans';
      direction = 'ltr';
      tWidth = 144;
      textType = 'body';
    }
    let tHeight = document.getElementById(e.currentTarget.id).offsetHeight;
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
        text: `<div>${e.currentTarget.textContent}</div>`,
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
        Textwidth: '400px',
        Textheight: `${400 * 0.1634}px`,
        fontSize: fontSize.split('px')[0] * setScaleOfNewElement(`${tWidth}px`),
        fontFamily: fontFamily,
        lineHeight: 1,
        letterSpacing: 0,
        wordSpacing: 0,
        isArabic: isArabic,
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
      payload: val,
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const onClickSidebar = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'SET_SELECTED_EDITOR_BTN',
      payload: null,
    });
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
  const EnglishHeadings = () => {
    return textHeadings.map((obj) => {
      return (
        <DraggableText
          englishTextclassName={obj.className}
          englishTextId={obj.id}
          englishTextHeading={obj.heading}
          onClickText={onClickText}
        />
      );
    });
  };

  return (
    <>
      <SidebarCloseComponent />
      <div className="sidebarContent" onClick={onClickSidebar}>
        <div className="templatesHead">
          <h1 className={''}>
            <FormattedMessage id="text" defaultMessage="Text" />
          </h1>
        </div>
        {state.showFonts && state.selectedElement ? (
          <Fonts />
        ) : state.showTextBar && state.selectedElement ? (
          <TextBar />
        ) : state.selectedElement?.isColorPicker ? (
          <ColorPicker />
        ) : (
          <>
            <div className="textSubHEadingDiv">
              <p className={'textSubHeading'}>
                <FormattedMessage
                  id="AddTextToPAge"
                  defaultMessage="Add any text to your page"
                />
              </p>
            </div>

            <div className="textBtnsDiv">
              <EnglishHeadings />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SidebarTextTemplate;
