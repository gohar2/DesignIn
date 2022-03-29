import React, { useContext, useState } from 'react';
import Context from '../../store/store';
import { ReactComponent as CrossCircle } from '../../../icons/CrossCircle.svg';
import EditorButton from './EditorButton';
import ResizePageInputField from './ResizePageInputField';
import { required } from '../../../constants/index';
import './ResizePage.css';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';

const ResizePage = (props) => {
  const [state, dispatch] = useContext(Context);
  const [componentState, setComponentState] = React.useState({
    width: 0,
    height: 0,
    errors: {
      width: '',
      height: '',
    },
  });

  const [measurmentUnitState, setmeasurmentUnitState] = useState('px');

  const onClickCloseBtn = () => {
    dispatch({ type: 'SET_SELECTED_EDITOR_BTN', payload: null });
  };

  const setPageSize = (evt) => {
    setComponentState({
      ...componentState,
      [evt.target.name]: evt.target.value,
    });
    validate(evt.target.name, evt.target.value);
  };

  const validate = (name, value) => {
    switch (name) {
      case 'width':
        componentState.errors.width = componentState.errors.width =
          value === ''
            ? required
            : value < 1
            ? 'width must be greater than 100'
            : value > 1000
            ? 'width must be smaller than 1000'
            : '';
        break;
      case 'height':
        componentState.errors.height = componentState.errors.height =
          value === ''
            ? required
            : value < 1
            ? 'height must be greater than 100'
            : value > 1000
            ? 'height must be smaller than 1000'
            : '';
        break;
      default:
        break;
    }
  };

  const onClickResizePage = (evt) => {
    state.target = null;
    let width, height;
    if (componentState.width === 0 || componentState.height === 0) {
      if (componentState.width === 0) {
        width = required;
      }
      if (componentState.height === 0) {
        height = required;
      }
      setComponentState({
        ...state,
        errors: {
          width,
          height,
        },
      });
    } else if (
      componentState.errors.width === '' &&
      componentState.errors.height === ''
    ) {
      dispatch({
        type: 'SET_PAGE_SIZE',
        payload: {
          width: componentState.width,
          height: componentState.height,
          measurmentUnit: measurmentUnitState,
        },
      });
    }
  };

  return (
    <>
      <div className="resizePageDiv">
        <div className="headerDiv">
          <div className="sidebarContentCloseBtnDiv">
            <button
              className="sidebarContentCloseBtn"
              onClick={onClickCloseBtn}
            >
              <CrossCircle className="headingBtnIcons" />
            </button>
          </div>
          <div className="customDimensionHeadingDiv">
            <h5 className="customDimensionHeading">Custom Dimensions</h5>
          </div>
        </div>
        <div className="resizePageInnerDiv">
          <div className="resizePageInputDiv">
            <ResizePageInputField
              labelName="width"
              onChange={setPageSize}
              name="width"
              width={componentState.errors.width}
              height={componentState.errors.height}
            />
            <div className="multiply">x</div>
            <ResizePageInputField
              labelName="height"
              onChange={setPageSize}
              name="height"
              width={componentState.errors.width}
              height={componentState.errors.height}
            />
            <div className="resizePageUnitBtnDiv">
              {/* <button className="resizePageUnitBtn">px</button> */}
              <DropdownButton
                as={ButtonGroup}
                key={measurmentUnitState}
                id={`dropdown-variants-'Info'`}
                variant={'Info'.toLowerCase()}
                title={measurmentUnitState}
              >
                <Dropdown.Item
                  eventKey="1"
                  onClick={() => {
                    setmeasurmentUnitState('Px');
                  }}
                >
                  Px
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => {
                    setmeasurmentUnitState('Inch');
                  }}
                >
                  Inch
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="3"
                  onClick={() => {
                    setmeasurmentUnitState('Cm');
                  }}
                >
                  Cm
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          {/* {componentState.errors.width === '' &&
          componentState.errors.height === '' ? (
            <div className="resizePageErrors">{required}</div>
          ) : null} */}
          {componentState.errors.width !== '' ? (
            <div className="resizePageErrors">
              {componentState.errors.width}
            </div>
          ) : null}
          {componentState.errors.height !== '' ? (
            <div className="resizePageErrors">
              {componentState.errors.height}
            </div>
          ) : null}
          <EditorButton
            buttonClassName="resizePageBtn"
            buttonName="Resize Page"
            id="pageResize"
            divClassName="resizePageBtnDiv"
            onClick={onClickResizePage}
          />
        </div>
      </div>
    </>
  );
};

export default ResizePage;
