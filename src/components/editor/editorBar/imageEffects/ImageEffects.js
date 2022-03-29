import React, { useContext } from 'react';
import Context from '../../../store/store';
import { imageEffects } from '../../../../constants/index';
import Header from '../Header';
import { FormattedMessage } from 'react-intl';
import './ImageEffects.css';

const ImageEffects = (props) => {
  const [state, dispatch] = useContext(Context);

  const onClickCloseBtn = () => {
    dispatch({ type: 'SET_SELECTED_EDITOR_BTN', payload: null });
  };

  const changeEffects = (effect) => () => {
    dispatch({ type: 'SET_EFFECT', payload: effect });
  };

  return (
    <>
      <div className="imageEffectsTriangleUp"></div>
      <div className="imageEffectsDiv">
        <Header
          heading="Image Effects"
          id="imageEffects"
          onClick={onClickCloseBtn}
        />
        <div className="imageEffectsIconsDiv">
          {Object.values(imageEffects).map((image) => {
            return (
              <div className="imageEffectIconDivContainer">
                <img
                  src={image.image}
                  className="imageEffectIconDiv"
                  onClick={changeEffects(image.action)}
                />
                <h6>
                  <FormattedMessage id={image.effect} defaultMessage="Effect" />
                </h6>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ImageEffects;
