import React, { useContext } from 'react';
import Context from '../../../store/store';
import HeaderW from '../HeaderW';
import Slider from '../Slider';
import './ColorBalance.css';

const ColorBalance = (props) => {
  const [state, dispatch] = useContext(Context);

  const onClickCloseBtn = () => {
    dispatch({ type: 'SET_SELECTED_EDITOR_BTN', payload: null });
  };
  const onChangeBrightness = (changeEvent) => {
    dispatch({
      type: 'SAVE_HISTORY',
    });
    dispatch({
      type: 'SET_BRIGHTNESS',
      payload: parseFloat(changeEvent.target.value),
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const onChangeContrast = (changeEvent) => {
    dispatch({
      type: 'SAVE_HISTORY',
    });
    dispatch({
      type: 'SET_CONTRAST',
      payload: parseFloat(changeEvent.target.value),
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const onChangeSaturation = (changeEvent) => {
    dispatch({
      type: 'SAVE_HISTORY',
    });
    dispatch({
      type: 'SET_SATURATE',
      payload: parseFloat(changeEvent.target.value),
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const onChangeBlur = (changeEvent) => {
    dispatch({
      type: 'SAVE_HISTORY',
    });
    dispatch({
      type: 'SET_BLUR',
      payload: parseFloat(changeEvent.target.value),
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  return (
    <>
      <div className="colorBalanceTriangleUp"></div>
      <div className="colorBalanceDiv">
        <HeaderW
          heading="Color Balance"
          id="colorBalance"
          onClick={onClickCloseBtn}
        />
        <div className="sliderDiv">
          <Slider
            heading="Brightness"
            id="brightness"
            headingDivClassName="colorBalanceHeading"
            headingClassName="sliderHeading"
            valueClassName="BalanceColorDiv"
            min={0}
            max={200}
            step={1}
            onChange={onChangeBrightness}
            value={
              state.selectedElement ? state.selectedElement.brightness : 100
            }
          />
          <Slider
            heading="Contrast"
            id="contrast"
            headingDivClassName="colorBalanceHeading"
            headingClassName="sliderHeading"
            valueClassName="BalanceColorDiv"
            min={0}
            max={200}
            step={1}
            onChange={onChangeContrast}
            value={state.selectedElement ? state.selectedElement.contrast : 100}
          />
          <Slider
            heading="Saturation"
            id="saturation"
            headingDivClassName="colorBalanceHeading"
            headingClassName="sliderHeading"
            valueClassName="BalanceColorDiv"
            min={0}
            max={200}
            step={1}
            onChange={onChangeSaturation}
            value={state.selectedElement ? state.selectedElement.saturate : 100}
          />
          {/* <Slider
            heading="X-Process"
            id="xProcess"
            headingDivClassName="colorBalanceHeading"
            headingClassName="sliderHeading"
            valueClassName="BalanceColorDiv"
            min={0}
            max={100}
            step={1}
            value={18}
          />
          <Slider
            heading="Vignette"
            id="vignette"
            headingDivClassName="colorBalanceHeading"
            headingClassName="sliderHeading"
            valueClassName="BalanceColorDiv"
            min={0}
            max={100}
            step={1}
            value={18}
          />
          <Slider
            heading="Tint"
            id="tint"
            headingDivClassName="colorBalanceHeading"
            headingClassName="sliderHeading"
            valueClassName="BalanceColorDiv"
            min={0}
            max={100}
            step={1}
            value={18}
          /> */}
          <Slider
            heading="Blur"
            id="blur"
            headingDivClassName="colorBalanceHeading"
            headingClassName="sliderHeading"
            valueClassName="BalanceColorDiv"
            min={0}
            max={3}
            step={0.5}
            onChange={onChangeBlur}
            value={state.selectedElement ? state.selectedElement.blur : 0}
          />
        </div>
      </div>
    </>
  );
};

export default ColorBalance;
