import React, { useContext } from 'react';
import { SketchPicker } from 'react-color';
import Context from '../../../store/store';
import userContext from '../../../../userContext/UserContext';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as CrossIconEditor } from '../../../../icons/CrossIconEditor.svg';
import PageColorPicker from '../../editorBar/PageColor';

const ColorPicker = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant coment var from this

  const handleChange = (color) => {
    dispatch({
      type: 'SET_TEXT_COLOR',
      payload: {
        isColorPicker: true,
        color: color.hex,
      },
    });
  };
  const handleNewColors = (color) => {
    dispatch({
      type: 'SET_TEXT_COLOR',
      payload: {
        isColorPicker: true,
        color: color,
      },
    });
  };
  const backToTextbar = (val) => {
    dispatch({
      type: 'SET_TEXT_COLOR',
      payload: {
        isColorPicker: val,
        color: state.selectedElement.color,
      },
    });
    dispatch({
      type: 'SHOW_TEXT_BAR',
      payload: val,
    });
  };

  const customStyle = {
    backgroundColor: 'transparent',
  };

  return (
    <>
      <div className="pagesContainer">
        <div
          className={
            userState.isArabic ? 'createPageDiv arabicMode' : 'createPageDiv'
          }
        >
          <CrossIconEditor
            className="createFolderIcon mt-4 paddlR2"
            onClick={() => backToTextbar(false)}
          />
          <div
            className={
              userState.isArabic
                ? 'createFolderHeading_Ar'
                : 'createFolderHeading'
            }
          >
            <FormattedMessage id="textColor" defaultMessage="Text Color" />
          </div>
        </div>
      </div>
      <p className={userState.isArabic ? 'customColor_Ar' : 'customColor'}>
        <FormattedMessage id="CustomColor" defaultMessage="Custom Color" />
      </p>
      <SketchPicker
        color={state.selectedElement.color}
        onChange={handleChange}
        disableAlpha={true}
        width="420"
        style={customStyle}
      />
      <div className="textColorPickerDiv">
        <hr className="textColorLineBreaker" />
        <PageColorPicker
          newcolor={(color) => {
            handleNewColors(color);
          }}
        ></PageColorPicker>
      </div>
    </>
  );
};

export default ColorPicker;
