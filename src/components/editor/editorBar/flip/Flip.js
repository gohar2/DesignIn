import React, { useContext } from 'react';
import userContext from '../../../../userContext/UserContext';
import Context from '../../../store/store';
import { ReactComponent as Flip1 } from '../../../../icons/Flip1.svg';
import { ReactComponent as Flip2 } from '../../../../icons/Flip2.svg';
import './Flip.css';

const Flip = (props) => {
  const [state, dispatch] = useContext(Context); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const [userState, userDispatch] = useContext(userContext);

  const onClickCloseBtn = () => {
    dispatch({ type: 'SET_SELECTED_EDITOR_BTN', payload: null });
  };

  const flip = (e) => {
    dispatch({ type: 'FLIP', payload: e.currentTarget.id });
    onClickCloseBtn();
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  return (
    <>
      <div className="flipTriangleUp"></div>
      <div className="flipDiv">
        <div
          className={
            userState.isArabic
              ? 'flipIconsDiv flex-row-reverse'
              : 'flipIconsDiv'
          }
        >
          <div className="f-1">
            <Flip2 className="flipIcons" id="flipX" onClick={flip} />
          </div>
          <div className="f-1">
            <Flip1 className="flipIcons" id="flipY" onClick={flip} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Flip;
