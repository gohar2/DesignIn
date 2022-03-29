import React, { useContext } from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import userContext from '../../../userContext/UserContext';
import './Slider.css';

const SliderW = (props) => {
  // const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables
  const [userState, userDispatch] = useContext(userContext);
  return (
    <>
      <div
        className={
          userState.isArabic
            ? ' OpacitySliderDiv arabicMode'
            : 'OpacitySliderDiv'
        }
      >
        <div className={props.headingDivClassName}>
          <RangeSlider
            tooltip="off"
            value={props.value}
            onAfterChange={props.onAfterChange}
            onChange={props.onChange}
            min={props.min}
            max={props.max}
            step={props.step}
            variant="light"
            size="sm"
          />
        </div>
        <div className={props.valueClassName}>
          <label className="textBarFontSizeValue">{props.value}</label>
        </div>
      </div>
    </>
  );
};

export default SliderW;
