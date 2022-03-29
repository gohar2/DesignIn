import React, { useContext } from 'react';
import Header from '../Header';
import Slider from '../Slider';
import Context from '../../../store/store';
import userContext from '../../../../userContext/UserContext.js';
import './Spacing.css';

const Spacing = (props) => {
  const [state, dispatch] = useContext(Context);

  const onClickCloseBtn = () => {
    dispatch({ type: 'SET_SELECTED_EDITOR_BTN', payload: null });
  };
  const onChangeSpacing = (changeEvent) => {
    dispatch({
      type: 'SET_SPACING',
      payload: parseInt(changeEvent.target.value),
    });
  };

  return (
    <>
      <div className="spacingTriangleUp"></div>
      <div className="spacingDiv">
        <Header
          heading="Spacing Setting"
          id="spacing"
          onClick={onClickCloseBtn}
        />
        <div className="spacingIconsDiv">
          <Slider
            heading="Spacing"
            id="spacing"
            headingClassName={
              userState.isArabic ? 'textBarFont arabicMode' : 'textBarFont'
            }
            valueClassName="textBarColorDiv"
            min={1}
            max={100}
            step={1}
            onChange={onChangeSpacing}
            value={
              state.selectedElement
                ? state.selectedElement && state.selectedElement.spacing
                : 10
            }
          />
        </div>
      </div>
    </>
  );
};

export default Spacing;
