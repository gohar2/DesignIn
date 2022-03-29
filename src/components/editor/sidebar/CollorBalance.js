import React, { useContext } from 'react';
import SidebarCloseComponent from './close/SidebarCloseComponent';
import { FormattedMessage } from 'react-intl';
import Context from '../../store/store';
import Slider from '../editorBar/Slider';
// import HeaderW from '../editorBar/HeaderW'; //Shaheer code-refactoring-removing-unused-variables
import './CollorBalance.css';

const CollorBalance = (props) => {
  const [state, dispatch] = useContext(Context);

  // const onClickCloseBtn = () => {                                  //Shaheer code-refactoring-removing-unused-variables
  //   dispatch({ type: 'SET_SELECTED_EDITOR_BTN', payload: null });
  // };
  const onChangeBrightness = (changeEvent) => {
    dispatch({
      type: 'SET_BRIGHTNESS',
      payload: parseFloat(changeEvent.target.value),
    });
  };
  const onChangeContrast = (changeEvent) => {
    dispatch({
      type: 'SET_CONTRAST',
      payload: parseFloat(changeEvent.target.value),
    });
  };
  const onChangeSaturation = (changeEvent) => {
    dispatch({
      type: 'SET_SATURATE',
      payload: parseFloat(changeEvent.target.value),
    });
  };
  const onChangeBlur = (changeEvent) => {
    dispatch({
      type: 'SET_BLUR',
      payload: parseFloat(changeEvent.target.value),
    });
  };
  const onAfterChange = (changeEvent) => {
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
      type: 'REMOVE_SELECTION',
    });
  };
  return (
    <>
      <SidebarCloseComponent />
      <div className="sidebarContent" onClick={onClickSidebar}>
        <div className="templatesHead">
          <h1
            className={state.isArabic ? 'arabicarabicModeMode arabicMode' : ''}
          >
            <FormattedMessage id="balance" defaultMessage="Balance" />
          </h1>
        </div>

        <div className="pageContainerSidebar">
          <Slider
            heading="Brightness"
            id="brightness"
            headingDivClassName="colorBalanceHeading"
            headingClassName="sliderHeading"
            valueClassName="BalanceColorDiv"
            min={0}
            max={200}
            step={1}
            onAfterChange={onAfterChange}
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
            onAfterChange={onAfterChange}
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
            onAfterChange={onAfterChange}
            onChange={onChangeSaturation}
            value={state.selectedElement ? state.selectedElement.saturate : 100}
          />
          <Slider
            heading="Blur"
            id="blur"
            headingDivClassName="colorBalanceHeading"
            headingClassName="sliderHeading"
            valueClassName="BalanceColorDiv"
            min={0}
            max={3}
            step={0.5}
            onAfterChange={onAfterChange}
            onChange={onChangeBlur}
            value={state.selectedElement ? state.selectedElement.blur : 0}
          />
        </div>
      </div>
    </>
  );
};

export default CollorBalance;
