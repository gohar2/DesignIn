import React, { useContext } from 'react';
import Context from '../../../store/store';
import userContext from '../../../../userContext/UserContext';
import Header from '../Header';
import Slider from '../Slider';
import { ReactComponent as AnimationNoneEffect } from '../../../../icons/AnimationNoneEffect.svg';
import { ReactComponent as AnimationZoomInEffect } from '../../../../icons/AnimationZoomInEffect.svg';
import { ReactComponent as FallDownAnimationEffect } from '../../../../icons/FallDownAnimationEffect.svg';
import { ReactComponent as FadeInAnimationEffect } from '../../../../icons/FadeInAnimationEffect.svg';
import { ReactComponent as FlyInAnimationEffect } from '../../../../icons/FlyInAnimationEffect.svg';
import { ReactComponent as ZoomOutAnimationEffect } from '../../../../icons/ZoomOutAnimationEffect.svg';
import AnimationIcon from './AnimationIcon';
import './Animation.css';

const Animation = (props) => {
  const [state, dispatch] = useContext(Context);
  // const [userState, userDispatch] = useContext(userContext);

  const onClickCloseBtn = () => {
    dispatch({ type: 'SET_SELECTED_EDITOR_BTN', payload: null });
  };
  const onClickZoom = (e) => {
    dispatch({ type: 'ZOOM', payload: e.target.id });
  };

  return (
    <>
      <div className="animationTriangleUp"></div>
      <div className="animationDiv">
        <Header
          heading="Animation"
          isArabic={userState.isArabic}
          id="animations"
          onClick={onClickCloseBtn}
        />
        <div className="animationIconsDiv">
          <AnimationIcon
            icon={<AnimationNoneEffect className="animationIcon" />}
            iconName="None"
            messageId="none"
            isArabic={userState.isArabic}
          />
          <AnimationIcon
            icon={<AnimationZoomInEffect className="animationIcon" id="ZI" />}
            iconName="Zoom In"
            messageId="zoomIn"
            isArabic={userState.isArabic}
            id="ZI"
            onClick={onClickZoom}
          />
          <AnimationIcon
            icon={<ZoomOutAnimationEffect className="animationIcon" id="ZO" />}
            iconName="Zoom Out"
            messageId="zoomOut"
            isArabic={userState.isArabic}
            id="ZO"
            onClick={onClickZoom}
          />
          <AnimationIcon
            icon={<FallDownAnimationEffect className="animationIcon" />}
            iconName="Fall Down"
            messageId="fallDown"
            isArabic={userState.isArabic}
          />
          <AnimationIcon
            icon={<FlyInAnimationEffect className="animationIcon" />}
            iconName="Fly In"
            messageId="flyIn"
            isArabic={userState.isArabic}
          />
          <AnimationIcon
            icon={<FadeInAnimationEffect className="animationIcon" />}
            iconName="Fade In"
            messageId="fadeIn"
            isArabic={userState.isArabic}
          />
        </div>
        <Slider
          heading="Duration"
          id="duration"
          headingClassName={
            userState.isArabic ? 'sliderHeading arabicMode' : 'sliderHeading'
          }
          valueClassName="textBarColorDiv"
          min={0}
          max={100}
          step={1}
          value={18}
        />
      </div>
    </>
  );
};

export default Animation;
