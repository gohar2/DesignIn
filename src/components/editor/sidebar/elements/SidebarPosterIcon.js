import React, { useContext, useEffect, useState } from 'react';
import Context from '../../../store/store';
import { createFrame } from '../../../../utils/index';
import './SidebarPosterIcon.css';
import DraggableImage from '../DraggableImage';
import { cloneDeep } from 'lodash';
import userContext from '../../../../userContext/UserContext';
import API from '../../../../api/Api';
import { getSelectedIcon } from '../../../../api/constants';
import { setDimensionsOfSVG } from '../../../../utils/index';

const SidebarPosterIcon = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const [selectedIcon, setSelectedIcon] = useState({});
  const [selectedIconDetails, setSelectedIconDetails] = useState({});
  let isFrameExist = false;
  // useEffect(() => {
  //   console.log(props.images);
  // },[props.images])
  useEffect(() => {
    if (selectedIconDetails && selectedIcon) {
      if (selectedIconDetails.tagname === 'IMG') {
        const type =
          selectedIconDetails.subCatId === 34 &&
          props.title === 'Searched Result'
            ? 'frame'
            : selectedIconDetails.id.substring(0, 5);
        if (type === 'grids') {
          dispatch({
            type: 'STORE_GRID',
            payload: {
              type: 'grid',
              name: selectedIconDetails.id.substring(6),
              grid: true,
              frame: createFrame(
                `${state.pageWidth}px`,
                `${state.pageHeight}px`,
              ),
            },
          });
        } else if (type === 'frame') {
          let temp = selectedIconDetails.id.split(' ');
          var last_element = temp[temp.length - 1];
          state.pages[state.selectedPage.pageId].elements.forEach((el) => {
            if (el.type === 'frame') {
              isFrameExist = true;
            }
          });
          if (!isFrameExist) {
            const left = `${
              state.pageWidth / 2 -
              selectedIconDetails.width / 2 -
              selectedIconDetails.width
            }px`;
            const top = `${
              state.pageHeight / 2 -
              selectedIconDetails.width / 2 -
              selectedIconDetails.width
            }px`;
            dispatch({
              type: 'STORE_FRAME',
              payload: {
                type: 'frame',
                name: last_element,
                frames: true,
                zIndex: 0,
                frame: createFrame(`400px`, `400px`, top, left),
                images: [
                  {
                    moveableId: '',
                    className: 'gridDiv',
                    selectedClassName: 'gridDiv selectedGridImg',
                    moveableClassName:
                      'moveableImgFullPage gridDiv selectedGridImg',
                    id: '',
                    src: null,
                    selected: false,
                    opacity: 1,
                    brightness: 100,
                    contrast: 100,
                    saturate: 100,
                    blur: 0,
                    padding: 0,
                    isflipX: false,
                    isflipY: false,
                    frame: createFrame(`100px`, `100px`),
                    imageHeight: 0,
                    imageWidth: 0,
                  },
                ],
              },
            });
          }
        } else {
          let temp = [];
          let newColor = null;
          const left = `${
            state.pageWidth / 2 - selectedIconDetails.width / 2
          }px`;
          const top = `${
            state.pageHeight / 2 - selectedIconDetails.width / 2
          }px`;

          dispatch({
            type: 'STORE_ELEMENT',
            payload: {
              type: 'svg',
              src: selectedIcon.svg.url,
              description: selectedIcon.description,
              colors: selectedIcon.specs
                ? (newColor = selectedIcon.specs.filter((el) => {
                    if (el.color[0] === '#') {
                      if (!temp.includes(el.color)) {
                        temp.push(el.color);
                        return el;
                      }
                    }
                  }))
                : [],
              selectedColor: '',
              frame: createFrame(
                setDimensionsOfSVG(selectedIcon.description)[0],
                setDimensionsOfSVG(selectedIcon.description)[1],
                top,
                left,
              ),
              opacity: 1,
              brightness: 100,
              contrast: 100,
              saturate: 100,
              filter: null,
              blur: 0,
              padding: 0,
              isflipX: false,
              isflipY: false,
              lock: false,
            },
          });
        }
        dispatch({
          type: 'SAVE_HISTORY',
        });
      }
    }
  }, [selectedIcon]);

  const getIcon = (id) => {
    API.get(`${process.env.REACT_APP_BASE_URL}${getSelectedIcon(id)}`).then(
      (result) => {
        setSelectedIcon(result.data);
      },
    );
  };
  const onClickImage = (colors, description, id, subCatId) => (e) => {
    let details = {
      width: e.target.clientWidth,
      height: e.target.clientHeight,
      tagname: e.target.tagName,
      id: e.target.id,
      context: e.currentTarget.textContent,
      subCatId: subCatId,
    };
    getIcon(id);
    setSelectedIconDetails(details);
    // if (e.target.tagName === 'IMG') {
    //   const type = e.target.id.substring(0, 5);
    //   if (type === 'grids') {
    //     dispatch({
    //       type: 'STORE_GRID',
    //       payload: {
    //         type: 'grid',
    //         name: e.target.id.substring(6),
    //         grid: true,
    //         frame: createFrame(`${state.pageWidth}px`, `${state.pageHeight}px`),
    //       },
    //     });
    //   } else if (type === 'frame') {
    //     dispatch({
    //       type: 'STORE_FRAME',
    //       payload: {
    //         type: 'frame',
    //         name: e.target.id.substring(6).trim(),
    //         frames: true,
    //         zIndex: 0,
    //         frame: createFrame(`100px`, `100px`),
    //         images: [
    //           {
    //             className: 'gridDiv',
    //             selectedClassName: 'gridDiv selectedGridImg',
    //             moveableClassName: 'moveableImgFullPage',
    //             id: '',
    //             src: null,
    //             selected: false,
    //             opacity: 1,
    //             brightness: 100,
    //             contrast: 100,
    //             saturate: 100,
    //             blur: 0,
    //             padding: 0,
    //             isflipX: false,
    //             isflipY: false,
    //             frame: createFrame(`100px`, `100px`),
    //           },
    //         ],
    //       },
    //     });
    //   } else {
    //     let temp = [];
    //     let newColor = null;
    //     const left = `${state.pageWidth / 2 - e.target.clientWidth / 2}px`;
    //     const top = `${state.pageHeight / 2 - e.target.clientWidth / 2}px`;
    //     dispatch({
    //       type: 'STORE_ELEMENT',
    //       payload: {
    //         type: 'svg',
    //         src: e.target.src,
    //         description: description,
    //         colors: colors
    //           ? (newColor = colors.filter(el => {
    //               if (el.color[0] === '#') {
    //                 if (!temp.includes(el.color)) {
    //                   temp.push(el.color);
    //                   return el;
    //                 }
    //               }
    //             }))
    //           : [],
    //         selectedColor: '',
    //         frame: createFrame('100px', '100px', top, left),
    //         opacity: 1,
    //         brightness: 100,
    //         contrast: 100,
    //         saturate: 100,
    //         filter: null,
    //         blur: 0,
    //         padding: 0,
    //         isflipX: false,
    //         isflipY: false,
    //         lock: false,
    //       },
    //     });
    //   }
    // } else {
    //   dispatch({
    //     type: 'STORE_ELEMENT',
    //     payload: {
    //       type: 'text',
    //       text: e.currentTarget.textContent,
    //       textArray: [],
    //       frame: createFrame(
    //         `${e.currentTarget.clientWidth}px`,
    //         `${e.currentTarget.clientHeight}px`,
    //       ),
    //       isBold: false,
    //       isItalic: false,
    //       isUnderline: false,
    //       isUppercase: false,
    //       isAlignTop: false,
    //       isAlignBottom: false,
    //       isAlignCenter: false,
    //       isColorPicker: false,
    //       fontSize: 18,
    //       fontFamily: 'open sans',
    //       lineHeight: 2,
    //       letterSpacing: 1,
    //       color: '#111111',
    //       textAlign: state.alignment.types[state.alignment.indexNo],
    //       list: 0,
    //       opacity: 1,
    //     },
    //   });
    // }
  };
  return (
    <div className="sidebarContentPicsContainerDiv">
      {!props.displayAll ? (
        <div
          className={userState.isArabic ? 'titleDiv arabicMode' : 'titleDiv'}
        >
          <label className={userState.isArabic ? 'title_Ar' : 'title_En'}>
            {userState.isArabic ? props.title_ar : props.title}
          </label>
          {props.title !== 'Searched Result' ? (
            <a
              onClick={(e) => props.onClickSeeAll(e, props.title, props.id)}
              className={
                userState.isArabic
                  ? 'sidebarContentSeeAllLink_Ar'
                  : 'sidebarContentSeeAllLink'
              }
            >
              {props.seeAllLink}
            </a>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      <div className="sidebarContentIconsDiv">
        {!props.displayAll ? (
          props.images.map((images, index) => {
            return (
              <a
                onClick={onClickImage(
                  cloneDeep(images.specs),
                  images.description,
                  images.id,
                  images.sub_category_id,
                )}
                key={index}
              >
                {images.stocktype === 'svg' ? (
                  <DraggableImage
                    description={images.description}
                    image={{ src: images.svg_thumb.thumb.url }}
                    type={images.stocktype}
                    id={images.title}
                    iconId={images.id}
                    colors={cloneDeep(images.specs)}
                  />
                ) : (
                  <DraggableImage
                    selectedIconDetail={selectedIconDetails}
                    image={{ src: images.url }}
                    type={props.title}
                    id={images.title}
                    iconId={images.id}
                    isFrame={true}
                    sub_category_id={images.sub_category_id}
                  />
                )}
              </a>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SidebarPosterIcon;
