import React, { useContext } from 'react';
import Slider from '../Slider';
import IconButtons from '../../sidebar/text/IconButtons';
import Context from '../../../store/store';
import Header from '../Header';
import './TextBar.css';

const TextBar = (props) => {
  const [state, dispatch] = useContext(Context);
  const onChangeFontSize = (changeEvent) => {
    dispatch({
      type: 'SET_FONT_SCALE',
      payload: parseInt(changeEvent.target.value),
    });
    dispatch({
      type: 'SET_FONTSIZE',
      payload: parseInt(changeEvent.target.value),
    });
  };

  const onChangeLineHeight = (changeEvent) => {
    dispatch({
      type: 'SET_LINE_HEIGHT',
      payload: parseInt(changeEvent.target.value),
    });
  };

  const onChangeSpacing = (changeEvent) => {
    dispatch({
      type: 'SET_LETTER_SPACING',
      payload: parseInt(changeEvent.target.value),
    });
  };

  const onClickCloseBtn = () => {
    dispatch({ type: 'SET_SELECTED_EDITOR_BTN', payload: null });
  };

  return (
    <>
      <div className="textBarTriangleUp"></div>
      <div className="textBarDiv">
        <Header
          heading="Text Settings"
          id="textSettings"
          onClick={onClickCloseBtn}
        />
        <div className="textBarFontColorDiv"></div>
        <Slider
          heading="Font Size"
          id="fontSize"
          headingClassName="textBarFont"
          min={20}
          max={50}
          step={1}
          onChange={onChangeFontSize}
          value={state.selectedElement ? state.selectedElement.fontSize : 18}
        />
        <Slider
          heading="Line Height"
          id="lineHeight"
          headingClassName="textBarFont"
          min={1}
          max={15}
          step={1}
          onChange={onChangeLineHeight}
          value={state.selectedElement ? state.selectedElement.lineHeight : 1}
        />
        <Slider
          heading="Spacing"
          id="spacing"
          headingClassName="textBarFont"
          min={1}
          max={5}
          step={1}
          onChange={onChangeSpacing}
          value={
            state.selectedElement ? state.selectedElement.letterSpacing : 1
          }
        />
        <hr className="textBarSeparationLine" />
        <IconButtons />
      </div>
    </>
  );
};

export default TextBar;
