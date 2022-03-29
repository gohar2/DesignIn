import React, { useContext, useState } from 'react';
import SidebarCloseComponent from './close/SidebarCloseComponent';
import { FormattedMessage } from 'react-intl';
import userContext from '../../../userContext/UserContext';
import Slider from '../editorBar/Slider';
import Context from '../../store/store';
import { ReactComponent as CrossIconEditor } from '../../../icons/CrossIconEditor.svg';
import { imageEffects } from '../../../constants/index';
import './CollorEffects.css';
import none from '../../../images/none.png';
import shadow from '../../../images/shadow.png';
import gray from '../../../images/gray.png';
import sepia from '../../../images/sepia.png';
import { grep } from 'jquery';
const CollorEffects = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext);

  const onChangeSepia = (changeEvent) => {
    dispatch({
      type: 'SET_EFFECT',
      payload: {
        value: parseFloat(changeEvent.target.value),
        effect: 'Sepia',
      },
    });
  };
  const onChangeGray = (changeEvent) => {
    dispatch({
      type: 'SET_EFFECT',
      payload: {
        value: parseFloat(changeEvent.target.value),
        effect: 'Gray',
      },
    });
  };
  const setShadow = () => {
    dispatch({
      type: 'PLACE_SHADOW',
    });
    setDisplayInput(!displayInput);
    setDisplaySepia(false);
    setDisplayGray(false);
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const onChangeshadowX = (changeEvent) => {
    dispatch({
      type: 'CHANGESHADOWX',
      payload: parseFloat(changeEvent.target.value),
    });
  };
  const onChangeshadowY = (changeEvent) => {
    dispatch({
      type: 'CHANGESHADOWY',
      payload: parseFloat(changeEvent.target.value),
    });
  };
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
  const onChangeshadowB = (changeEvent) => {
    dispatch({
      type: 'CHANGESHADOWB',
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
  const changeEffects = (action, effect) => () => {
    dispatch({
      type: 'SET_EFFECT',
      payload: { value: action, effect: effect },
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
    if (action === null) {
      setDisplayGray(false);
      setDisplaySepia(false);
      setDisplayInput(false);
    }
  };
  const handleChange = (e) => {
    setColor(e.target.value);
    dispatch({
      type: 'SET_SHADOWCOLOR',
      payload: e.target.value,
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const back = () => {
    dispatch({ type: 'BACK_FOLDER' });
  };
  const [displayInput, setDisplayInput] = useState(false);
  const [displayGray, setDisplayGray] = useState(false);
  const [displaySepia, setDisplaySepia] = useState(false);
  const showSepia = () => {
    setDisplaySepia(!displaySepia);
    setDisplayGray(false);
    setDisplayInput(false);
  };
  const showGray = () => {
    setDisplayGray(!displayGray);
    setDisplaySepia(false);
    setDisplayInput(false);
  };
  const [color, setColor] = useState('#ffffff');
  return (
    <>
      <SidebarCloseComponent />
      <div className="sidebarContent" onClick={onClickSidebar}>
        <div className="templatesHead">
          <h1
            className={
              userState.isArabic ? 'arabicarabicModeMode arabicMode' : ''
            }
          >
            <FormattedMessage
              id="imageEffects"
              defaultMessage="Image Effects"
            />
          </h1>
        </div>
        <div className="wraperDivEditor">
          <div className="pageContainerSidebar">
            <CrossIconEditor className="backFolderIcon mt-4" onClick={back} />
            <div className="imageEffectsIconsDiv mt-5">
              <div className="imageEffectIconDivContainer">
                <img
                  src={none}
                  className="imageEffectIconDiv"
                  alt="effect"
                  onClick={changeEffects(null, 'None')}
                />
                <h5
                  className={
                    userState.isArabic ? 'a text-center arabicMode' : ''
                  }
                >
                  <FormattedMessage id="None" defaultMessage="Effect" />
                </h5>
              </div>

              <div className="imageEffectIconDivContainer">
                <img
                  src={gray}
                  className="imageEffectIconDiv"
                  alt="effect"
                  onClick={showGray}
                />

                <h5
                  className={
                    userState.isArabic ? 'a arabicMode text-center' : ''
                  }
                >
                  <FormattedMessage id="Gray" defaultMessage="Effect" />
                </h5>
              </div>
              <div className="imageEffectIconDivContainer">
                <img
                  src={sepia}
                  className="imageEffectIconDiv"
                  alt="effect"
                  onClick={showSepia}
                />
                <h5
                  className={
                    userState.isArabic ? 'a arabicMode text-center' : ''
                  }
                >
                  <FormattedMessage id="Sepia" defaultMessage="Effect" />
                </h5>
              </div>
              <div className="imageEffectIconDivContainer">
                <img
                  src={shadow}
                  className="imageEffectIconDiv"
                  alt="effect"
                  // onClick={setShadow}
                />
                <h5
                  className={
                    userState.isArabic ? 'a arabicMode text-center' : ''
                  }
                >
                  <FormattedMessage id="Retro" defaultMessage="Retro" />
                </h5>
              </div>
            </div>

            {displaySepia ? (
              <Slider
                heading="Sepia"
                id="sepia"
                headingDivClassName="colorBalanceHeading"
                headingClassName="textBarFontSidebarEditor"
                valueClassName="BalanceColorDiv"
                min={0}
                max={100}
                step={1}
                onAfterChange={onAfterChange}
                onChange={onChangeSepia}
                value={state.selectedElement ? state.selectedElement.sepia : 0}
              />
            ) : (
              ''
            )}
            {displayGray ? (
              <Slider
                heading="Gray"
                id="gray"
                headingDivClassName="colorBalanceHeading"
                headingClassName="textBarFontSidebarEditor"
                valueClassName="BalanceColorDiv"
                min={0}
                max={100}
                step={1}
                onAfterChange={onAfterChange}
                onChange={onChangeGray}
                value={
                  state.selectedElement ? state.selectedElement.grayscale : 0
                }
              />
            ) : (
              ''
            )}
          </div>
          <div className="pageContainerSidebar pt-0">
            <div
              className={
                userState.isArabic
                  ? 'createFolderHeading_Ar text-right'
                  : 'createFolderHeading'
              }
            >
              <FormattedMessage
                id="colorBalance"
                defaultMessage="Color Balance"
              />
            </div>
          </div>
          <div className="pageContainerSidebar">
            <Slider
              heading="Brightness"
              id="brightness"
              headingDivClassName="colorBalanceHeading"
              headingClassName="textBarFontSidebarEditor "
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
              headingClassName="textBarFontSidebarEditor"
              valueClassName="BalanceColorDiv"
              min={0}
              max={200}
              step={1}
              onAfterChange={onAfterChange}
              onChange={onChangeContrast}
              value={
                state.selectedElement ? state.selectedElement.contrast : 100
              }
            />
            <Slider
              heading="Saturation"
              id="saturation"
              headingDivClassName="colorBalanceHeading"
              headingClassName="textBarFontSidebarEditor"
              valueClassName="BalanceColorDiv"
              min={0}
              max={200}
              step={1}
              onAfterChange={onAfterChange}
              onChange={onChangeSaturation}
              value={
                state.selectedElement ? state.selectedElement.saturate : 100
              }
            />
            <Slider
              heading="Blur"
              id="blur"
              headingDivClassName="colorBalanceHeading"
              headingClassName="textBarFontSidebarEditor"
              valueClassName="BalanceColorDiv"
              min={0}
              max={3}
              step={0.5}
              onAfterChange={onAfterChange}
              onChange={onChangeBlur}
              value={state.selectedElement ? state.selectedElement.blur : 0}
            />
          </div>
          <div className="pageContainerSidebar py-0">
            <hr className="customHrEditor mt-0 pb-4" />
            <div
              className={
                userState.isArabic
                  ? 'd-flex my-4 align-items-center flex-row-reverse'
                  : 'd-flex my-4 align-items-center'
              }
            >
              <div
                className={
                  userState.isArabic
                    ? 'createFolderHeading_Ar text-right flex_1'
                    : 'createFolderHeading flex_1'
                }
              >
                <FormattedMessage
                  id="imageShadow"
                  defaultMessage="Image Shadow"
                />
              </div>
              <button
                className={
                  userState.isArabic
                    ? 'btnUploadFonts_Ar flex_1 mt-0 '
                    : 'btnUploadFonts flex_1 mt-0 '
                }
                onClick={setShadow}
              >
                {userState.isArabic
                  ? displayInput
                    ? 'إزالة الظل'
                    : 'أضف الظل'
                  : displayInput
                  ? 'Remove Shadow'
                  : 'Add Shadow'}
              </button>
            </div>

            {displayInput ? (
              <>
                <div
                  className={
                    userState.isArabic
                      ? 'createFolderHeading_Ar text-right flex_1 pb-4 pt-3'
                      : 'createFolderHeading flex_1 pb-4 pt-3'
                  }
                >
                  <FormattedMessage
                    id="adjustShadow"
                    defaultMessage="Adjust Shadow"
                  />
                </div>
                <Slider
                  heading={userState.isArabic ? 'العتامة' : 'Opacity'}
                  id="pacity"
                  headingDivClassName="colorBalanceHeading"
                  headingClassName="textBarFontSidebarEditor"
                  valueClassName="BalanceColorDiv"
                  min={-20}
                  max={20}
                  step={1}
                  // onAfterChange={onAfterChange}
                  // onChange={onChangeshadowX}
                  value={
                    state.selectedElement?.opacity
                      ? state.selectedElement.opacity
                      : 4
                  }
                />
                <Slider
                  heading={userState.isArabic ? 'عرضي' : 'Horizontal'}
                  id="x-axis"
                  headingDivClassName="colorBalanceHeading"
                  headingClassName="textBarFontSidebarEditor"
                  valueClassName="BalanceColorDiv"
                  min={-20}
                  max={20}
                  step={1}
                  onAfterChange={onAfterChange}
                  onChange={onChangeshadowX}
                  value={
                    state.selectedElement?.boxShadowX
                      ? state.selectedElement.boxShadowX
                      : 3
                  }
                />
                <Slider
                  heading={userState.isArabic ? ' عمودي' : 'Vertical'}
                  id="y-axis"
                  headingDivClassName="colorBalanceHeading"
                  headingClassName="textBarFontSidebarEditor"
                  valueClassName="BalanceColorDiv"
                  min={-20}
                  max={20}
                  step={1}
                  onAfterChange={onAfterChange}
                  onChange={onChangeshadowY}
                  value={
                    state.selectedElement?.boxShadowY
                      ? state.selectedElement.boxShadowY
                      : 3
                  }
                />
                <Slider
                  heading={userState.isArabic ? 'طمس' : 'Blur'}
                  id="shadowB"
                  headingDivClassName="colorBalanceHeading"
                  headingClassName="textBarFontSidebarEditor"
                  valueClassName="BalanceColorDiv"
                  min={0}
                  max={20}
                  step={1}
                  onAfterChange={onAfterChange}
                  onChange={onChangeshadowB}
                  value={
                    state.selectedElement?.boxShadowB
                      ? state.selectedElement.boxShadowB
                      : 3
                  }
                />
                <div
                  className={
                    userState.isArabic
                      ? 'd-flex my-5 align-items-center justify-content-between flex-row-reverse'
                      : 'd-flex my-5 align-items-center justify-content-between'
                  }
                >
                  <div
                    className={
                      userState.isArabic
                        ? 'createFolderHeading_Ar'
                        : 'createFolderHeading'
                    }
                  >
                    <FormattedMessage
                      id="shadowColor"
                      defaultMessage="Shadow Color"
                    />
                  </div>
                  <label
                    className={
                      props.isArabic && props.isArabic
                        ? 'arabicModecolorPicker page-color-selector'
                        : 'page-color-selector'
                    }
                  >
                    <input
                      type="color"
                      value={color}
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollorEffects;
