import React, { useContext } from 'react';
import Context from '../../../store/store';
import userContext from '../../../../userContext/UserContext';
import Header from '../Header';
import { ReactComponent as TopAlign } from '../../../../icons/TopAlign.svg';
import { ReactComponent as LeftAlign } from '../../../../icons/LeftAlign.svg';
import { ReactComponent as CenterAlign } from '../../../../icons/CenterAlign.svg';
import { ReactComponent as RightAlign } from '../../../../icons/RightAlign.svg';
import { ReactComponent as MiddleAlign } from '../../../../icons/MiddleAlign.svg';
import { ReactComponent as BottomAlign } from '../../../../icons/BottomAlign.svg';
import { ReactComponent as SendToBack } from '../../../../icons/SendToBack.svg';
import { ReactComponent as SendToBackward } from '../../../../icons/SendToBackward.svg';
import { ReactComponent as SendToFront } from '../../../../icons/SendToFront.svg';
import { ReactComponent as SendToForward } from '../../../../icons/SendToForward.svg';
import ObjectAlignmentIcon from './ObjectAlignmentIcon';
import { FormattedMessage } from 'react-intl';
import './ObjectAlignment.css';

const ObjectAlignment = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variimport React, { useContext } from 'react';

  const ObjectAlignment = (props) => {
    const [state, dispatch] = useContext(Context);
    const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this

    const onClickCloseBtn = (e) => {
      e.stopPropagation();
      dispatch({ type: 'SET_SELECTED_EDITOR_BTN', payload: null });
    };

    const onClickHorizontalAlignment = (e) => {
      e.stopPropagation();
      dispatch({ type: 'HORIZONTAL_ALIGN', payload: e.currentTarget.id });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    };

    const onClickVerticalAlignment = (e) => {
      e.stopPropagation();
      dispatch({ type: 'VERTICAL_ALIGN', payload: e.currentTarget.id });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    };

    const onClickObjectPosition = (e) => {
      e.stopPropagation();
      dispatch({ type: 'OBJECT_POSITION', payload: e.currentTarget.id });
      dispatch({
        type: 'SAVE_HISTORY',
      });
    };
    return (
      <>
        <div className="objectAlignmentTriangleUp"></div>
        <div className="objectAlignmentDiv">
          <Header
            className={
              userState.isArabic
                ? 'textBarHeadingDiv text-left'
                : 'textBarHeadingDiv'
            }
            heading="Align Objects"
            id="alignObjects"
            onClick={onClickCloseBtn}
          />
          <div className="objectAlignmentIconsDiv">
            <ObjectAlignmentIcon
              id="left"
              onClick={onClickHorizontalAlignment}
              icon={
                <LeftAlign
                  className="objectAlignmentIcon"
                  id="left"
                  onClick={onClickHorizontalAlignment}
                />
              }
              iconName="Left"
              iconDivClassName={
                state.horizontalAlignment
                  ? state.horizontalAlignment === 'left'
                    ? 'selectedObjectPositionIconDiv'
                    : 'objectPositionIconDiv'
                  : 'objectPositionIconDiv'
              }
            />
            <ObjectAlignmentIcon
              onClick={onClickHorizontalAlignment}
              id={'center'}
              icon={
                <CenterAlign
                  className="objectAlignmentIcon"
                  onClick={onClickHorizontalAlignment}
                  id={'center'}
                />
              }
              iconName="Center"
              iconDivClassName={
                state.horizontalAlignment
                  ? state.horizontalAlignment === 'center'
                    ? 'selectedObjectPositionIconDiv'
                    : 'objectPositionIconDiv'
                  : 'objectPositionIconDiv'
              }
            />
            <ObjectAlignmentIcon
              onClick={onClickHorizontalAlignment}
              id={'right'}
              icon={
                <RightAlign
                  className="objectAlignmentIcon"
                  onClick={onClickHorizontalAlignment}
                  id={'right'}
                />
              }
              iconName="Right"
              iconDivClassName={
                state.horizontalAlignment
                  ? state.horizontalAlignment === 'right'
                    ? 'selectedObjectPositionIconDiv'
                    : 'objectPositionIconDiv'
                  : 'objectPositionIconDiv'
              }
            />
            <ObjectAlignmentIcon
              onClick={onClickVerticalAlignment}
              id={'top'}
              icon={
                <TopAlign
                  className="objectAlignmentIcon"
                  onClick={onClickVerticalAlignment}
                  id={'top'}
                />
              }
              iconName="Top"
              iconDivClassName={
                state.verticalAlignment
                  ? state.verticalAlignment === 'top'
                    ? 'selectedObjectPositionIconDiv'
                    : 'objectPositionIconDiv'
                  : 'objectPositionIconDiv'
              }
            />
            <ObjectAlignmentIcon
              onClick={onClickVerticalAlignment}
              id={'middle'}
              icon={
                <MiddleAlign
                  className="objectAlignmentIcon"
                  onClick={onClickVerticalAlignment}
                  id={'middle'}
                />
              }
              iconName="Middle"
              iconDivClassName={
                state.verticalAlignment
                  ? state.verticalAlignment === 'middle'
                    ? 'selectedObjectPositionIconDiv'
                    : 'objectPositionIconDiv'
                  : 'objectPositionIconDiv'
              }
            />
            <ObjectAlignmentIcon
              onClick={onClickVerticalAlignment}
              id={'bottom'}
              icon={
                <BottomAlign
                  className="objectAlignmentIcon"
                  onClick={onClickVerticalAlignment}
                  id={'bottom'}
                />
              }
              iconName="Bottom"
              iconDivClassName={
                state.verticalAlignment
                  ? state.verticalAlignment === 'bottom'
                    ? 'selectedObjectPositionIconDiv'
                    : 'objectPositionIconDiv'
                  : 'objectPositionIconDiv'
              }
            />
          </div>
          {/* { state?.targets?.length >= 3 &&
          <div className="objectAlignmentIconsDiv">
          <ObjectAlignmentIcon
            id="horizontal"
            onClick={onClickHorizontalAlignment}
            icon={
              <LeftAlign
                className="objectAlignmentIcon"
                id="horizontal"
                onClick={onClickHorizontalAlignment}
              />
            }
            iconName="Horizontal"
            iconDivClassName={
              state.horizontalAlignment
                ? state.horizontalAlignment.substring(6) === 'horizontal'
                  ? 'selectedObjectPositionIconDiv'
                  : 'objectPositionIconDiv'
                : 'objectPositionIconDiv'
            }
          />
          <ObjectAlignmentIcon
            onClick={onClickHorizontalAlignment}
            id={'vertical'}
            icon={
              <CenterAlign
                className="objectAlignmentIcon"
                onClick={onClickHorizontalAlignment}
                id={'vertical'}
              />
            }
            iconName="Vertical"
            iconDivClassName={
              state.horizontalAlignment
                ? state.horizontalAlignment.substring(6) === 'vertical'
                  ? 'selectedObjectPositionIconDiv'
                  : 'objectPositionIconDiv'
                : 'objectPositionIconDiv'
            }
          />
          <ObjectAlignmentIcon
            onClick={onClickHorizontalAlignment}
            id={'tidyUp'}
            icon={
              <RightAlign
                className="objectAlignmentIcon"
                onClick={onClickHorizontalAlignment}
                id={'tidyUp'}
              />
            }
            iconName="Tidy Up"
            iconDivClassName={
              state.horizontalAlignment
                ? state.horizontalAlignment.substring(0, 6) === 'tidyUp'
                  ? 'selectedObjectPositionIconDiv'
                  : 'objectPositionIconDiv'
                : 'objectPositionIconDiv'
            }
          />
        </div>
        } */}
          {!state.targets && (
            <>
              <div
                className={
                  userState.isArabic
                    ? 'textBarHeadingDiv text-left arabicMode'
                    : 'textBarHeadingDiv'
                }
              ></div>
            </>
          )}
        </div>
      </>
    );
  };
};
export default ObjectAlignment;
