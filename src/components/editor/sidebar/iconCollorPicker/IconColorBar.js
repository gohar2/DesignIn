import React, { useContext } from 'react';
//Shaheer code-refactoring-import React, { useContext } from 'react';
import { TwitterPicker } from 'react-color';
import { ReactComponent as CrossIconEditor } from '../../../../icons/CrossIconEditor.svg';
import SidebarCloseComponent from '../close/SidebarCloseComponent';
import { FormattedMessage } from 'react-intl';
import userContext from '../../../../userContext/UserContext';
import './IconColorBar.css';
import Context from '../../../store/store';
import PageColorPicker from '../../editorBar/PageColor';
const IconColorBar = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  // const [svgColors, setSvgColors] = useState([]); Shaheer code-refactoring-removing-unused-variables
  const handleDefaultColors = (color, event) => {
    dispatch({
      type: 'SET_COLOR_TO_ICON',
      payload: color.hex,
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const handleDocumentColors = (color, event) => {
    dispatch({
      type: 'SET_COLOR_TO_ICON',
      payload: color.hex,
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const handleNewColors = (color) => {
    dispatch({
      type: 'SET_COLOR_TO_ICON',
      payload: color,
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const handleSelectedSvgColors = (color, event) => {
    const newcolorobj = state.selectedElement.colors.filter(
      (el) => el.color.toLowerCase() === color.hex.toLowerCase(),
    );
    dispatch({
      type: 'SET_COLOR_CLASS',
      payload: newcolorobj[0],
    });
    dispatch({
      type: 'SHOW_SIDEBAR',
      payload: 'IconColorBar',
    });
  };
  const colorstyles = {
    default: {
      wrap: { display: 'none' },
      input: { display: 'none', float: userState.isArabic ? 'right' : 'left' },
      label: { display: 'none' },
      hash: { display: 'none' },
      swatch: { float: userState.isArabic ? 'right' : 'left' },
    },
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
  const closeTextBar = (val) => {};
  return (
    <>
      <SidebarCloseComponent />
      <div className="sidebarContent" onClick={onClickSidebar}>
        <div className="templatesHead">
          <h1 className={userState.isArabic ? 'arabicMode' : ''}>
            <FormattedMessage id="icons" defaultMessage="Icons" />
          </h1>
        </div>
        <div className="wraperDiv">
          <div
            className={
              userState.isArabic ? 'createPageDiv arabicMode' : 'createPageDiv'
            }
          >
            <div>
              <CrossIconEditor
                className="createFolderIcon mt-4 paddlR2"
                onClick={() => closeTextBar(false)}
              />
            </div>
          </div>
          <div className="IconColorPicker">
            <div className="IconColorsGrid">
              {state.selectedElement && state.selectedElement.colors && (
                <div class="Iconcolors">
                  <div
                    className={
                      userState.isArabic
                        ? 'IconColorheading arabicMode'
                        : 'IconColorheading'
                    }
                  >
                    <FormattedMessage
                      id="IconColors"
                      defaultMessage="Icon Colors"
                    />
                  </div>
                  <TwitterPicker
                    colors={
                      state.selectedElement
                        ? state.selectedElement.colors &&
                          state.selectedElement.colors.map((el) => el.color)
                        : null
                    }
                    triangle="hide"
                    width="100%"
                    onChange={handleSelectedSvgColors}
                    styles={colorstyles}
                  />
                </div>
              )}

              {/* {state.selectedElement && state.selectedElement.colors && (
                <div class="Iconcolors">
                  <div
                    className={
                      userState.isArabic
                        ? 'IconColorheading arabicMode'
                        : 'IconColorheading'
                    }
                  >
                    <FormattedMessage
                      id="Documentcolors"
                      defaultMessage="Document colors"
                    />
                  </div>
                  <TwitterPicker
                    colors={
                      state.pages[state.selectedPage.pageId].documentColors
                    }
                    triangle="hide"
                    width="100%"
                    onChange={handleDocumentColors}
                    styles={colorstyles}
                  />
                </div>
              )} */}

              <div className="Iconcolors">
                <div
                  className={
                    userState.isArabic
                      ? 'IconColorheading arabicMode'
                      : 'IconColorheading'
                  }
                >
                  <FormattedMessage
                    id="DefaultColors"
                    defaultMessage="Default Colors"
                  />
                </div>
                <TwitterPicker
                  colors={state.defaultColors}
                  triangle="hide"
                  width="100%"
                  onChange={handleDefaultColors}
                  styles={colorstyles}
                />
              </div>
              <div
                className={
                  userState.isArabic
                    ? 'Iconcolors mt-5 d-flex aligh-items-center justify-content-between'
                    : 'Iconcolors mt-5 d-flex aligh-items-center justify-content-between flex-row-reverse'
                }
              >
                <div
                  className={
                    userState.isArabic
                      ? 'IconColorheading arabicMode'
                      : 'IconColorheading'
                  }
                >
                  <FormattedMessage id="Newcolor" defaultMessage="New color" />
                </div>
                <PageColorPicker
                  selectedColor={state.LayerColor}
                  newcolor={handleNewColors}
                  styles={colorstyles}
                  isArabic={userState.isArabic}
                ></PageColorPicker>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default IconColorBar;
