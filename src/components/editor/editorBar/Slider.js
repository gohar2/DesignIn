import React, { useContext } from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import userContext from '../../../userContext/UserContext';
import { FormattedMessage } from 'react-intl';
import './Slider.css';

const Slider = (props) => {
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant coment var from this

  return (
    <>
      <div
        className={
          userState.isArabic
            ? 'textBarFontSizeDiv w-100 arabicMode '
            : 'textBarFontSizeDiv w-100'
        }
      >
        <div className="colorBalanceEditor">
          <div className={props.headingDivClassName}>
            <h5
              className={
                userState.isArabic
                  ? `${props.headingClassName} arabicMode`
                  : `${props.headingClassName} `
              }
            >
              <FormattedMessage id={props.id} defaultMessage={props.heading} />
            </h5>
            <div className="w-75">
              <RangeSlider
                tooltip="off"
                value={props.value}
                onChange={props.onChange}
                onAfterChange={props.onAfterChange}
                min={props.min}
                max={props.max}
                step={props.step}
                variant="light"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
