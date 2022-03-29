import React, { useContext } from 'react';
import SliderW from '../SliderW';
import Context from '../../../store/store';
import userContext from '../../../../userContext/UserContext.js';
import './Opacity.css';

const Opacity = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext); //Shaheer import React, { useContext } from 'react';

  const onChangeOpacity = (changeEvent) => {
    dispatch({
      type: 'SET_OPACITY',
      payload: parseFloat(changeEvent.target.value),
    });
  };
  const onAfterChange = (changeEvent) => {
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  return (
    <>
      <div className="opacityTriangleUp d-none"></div>
      <div className="opacityDiv">
        <div className="opacityIconsDiv">
          <SliderW
            heading="Opacity"
            id="opacity"
            headingDivClassName={
              userState.isArabic ? 'opacitySlider arabicMode' : 'opacitySlider'
            }
            valueClassName="textBarColorDiv"
            min={0}
            max={1}
            step={0.1}
            onAfterChange={onAfterChange}
            onChange={onChangeOpacity}
            value={state.selectedElement ? state.selectedElement.opacity : 1}
          />
        </div>
      </div>
    </>
  );
};

export default Opacity;
