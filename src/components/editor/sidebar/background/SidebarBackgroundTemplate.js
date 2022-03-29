/* eslint-disable no-unused-vars */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Context from '../../../store/store';
import userContext from '../../../../userContext/UserContext';
import SidebarCloseComponent from '../close/SidebarCloseComponent';
import DraggableImage from '../DraggableImage';
import { debounce } from 'lodash';
import API from '../../../../api/Api';
import { showloopofskeleton } from '../../../../utils/index';
import { FormattedMessage, useIntl } from 'react-intl';
import './SidebarBackgroundTemplate.css';
import {
  getAllBackgroundImages,
  getAllSearchedBackgroundImages,
} from '../../../../api/constants';

const SidebarBackgroundTemplate = (props) => {
  const [state, dispatch] = useContext(Context); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const [background, setBackground] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [shouldFetchPhotos, setShouldFetchPhotos] = useState(false);
  const [isFetchingMoreBackgrounds, setIsFetchingMoreBackgrounds] =
    useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setShouldFetchPhotos(true);
  }, [state.backgrounds]);
  useEffect(() => {
    // if (Cookies.get('CookieConsent') !== undefined) {
    API.get(`${getAllBackgroundImages(page, perPage)}`).then((result) => {
      let imagesObj = {};
      let temp = [];
      result.results.forEach((el) => {
        temp.push({
          id: el.id,
          image: {
            height: el.height,
            thumb: el.urls.thumb,
            url: el.urls.full,
            width: el.width,
          },
        });
        imagesObj = {
          unsplash: temp,
        };
      });
      dispatch({ type: 'SET_BACKGROUNDS', payload: imagesObj.unsplash });
      setBackground(result.data);
      setIsLoading(false);
      setPage(page + 1);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleScroll = (e) => {
    let scrollTop = document.getElementById(e.target.id).scrollTop;
    let scrollHeight = document.getElementById(e.target.id).scrollHeight;
    let offsetHeight = document.getElementById(e.target.id).offsetHeight;
    let contentHeight = scrollHeight - offsetHeight - 5;
    if (contentHeight <= scrollTop && shouldFetchPhotos) {
      fetchMoreData();
    }
  };
  const fetchMoreData = () => {
    if (!searchValue.length) {
      setIsFetchingMoreBackgrounds(true);
      setShouldFetchPhotos(false);
      API.get(`${getAllBackgroundImages(page, perPage)}`)
        .then((result) => {
          let imagesObj = {};
          let temp = [];
          result.results.forEach((el) => {
            temp.push({
              id: el.id,
              image: {
                height: el.height,
                thumb: el.urls.thumb,
                url: el.urls.full,
                width: el.width,
              },
            });
            imagesObj = {
              unsplash: temp,
            };
          });
          setIsFetchingMoreBackgrounds(false);
          let backgrounds = state.backgrounds;
          let newBackgrounds = backgrounds.concat(imagesObj.unsplash);
          dispatch({ type: 'SET_BACKGROUNDS', payload: newBackgrounds });
          setPage(page + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsFetchingMoreBackgrounds(true);
      setShouldFetchPhotos(false);
      API.get(`${getAllSearchedBackgroundImages(page, perPage, searchValue)}`)
        .then((result) => {
          setIsFetchingMoreBackgrounds(false);
          let imagesObj = {};
          let temp = [];
          result.results.forEach((el) => {
            temp.push({
              id: el.id,
              image: {
                height: el.height,
                thumb: el.urls.thumb,
                url: el.urls.full,
                width: el.width,
              },
            });
            imagesObj = {
              unsplash: temp,
            };
          });
          let backgrounds = state.backgrounds;
          let newBackgrounds = backgrounds.concat(imagesObj.unsplash);
          dispatch({ type: 'SET_BACKGROUNDS', payload: newBackgrounds });
          setPage(page + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onClickImage = (e, image) => {
    dispatch({
      type: 'SET_BACKGROUND_IMAGE',
      payload: image,
    });
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };

  const placeholder = useIntl().formatMessage({ id: 'SearchBackground' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearchBackgrounds = useCallback(
    debounce((searchValue) => getBackgrounds(searchValue), 1000),
    [],
  );
  const getBackgrounds = (searchValue) => {
    if (searchValue.length) {
      setSearchValue(searchValue);
      dispatch({ type: 'SET_BACKGROUNDS', payload: [] });
      setIsFetchingMoreBackgrounds(false);
      setIsLoading(true);
      API.get(
        `${getAllSearchedBackgroundImages(page, perPage, searchValue)}`,
      ).then((result) => {
        let imagesObj = {};
        let temp = [];
        result.results.forEach((el) => {
          temp.push({
            id: el.id,
            image: {
              height: el.height,
              thumb: el.urls.thumb,
              url: el.urls.full,
              width: el.width,
            },
          });
          imagesObj = {
            unsplash: temp,
          };
        });
        dispatch({ type: 'SET_BACKGROUNDS', payload: imagesObj.unsplash });
        setBackground(imagesObj.unsplash);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  };
  const onChangeBackground = (e) => {
    debouncedSearchBackgrounds(e.target.value);
  };
  const onClickSidebar = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'SET_SHORTCUT_KEY',
      payload: false,
    });
  };
  const Spinner = () => (
    <div className="post loading">
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#49d1e0"
          strokeWidth="10"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
          transform="rotate(275.845 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
  return (
    <>
      <SidebarCloseComponent />
      <div className="sidebarContent" onClick={onClickSidebar}>
        <div className="templatesHead">
          <h1 className={userState.isArabic ? 'arabicMode' : ''}>
            <FormattedMessage id="background" defaultMessage="Background" />
          </h1>
        </div>
        <div className="sidebarContentSearchBarDiv">
          <input
            className={
              userState.isArabic
                ? 'sidebarContentSearchBar arabicMode'
                : 'sidebarContentSearchBar'
            }
            type="text"
            placeholder={placeholder}
            onChange={onChangeBackground}
          />
        </div>
        <div
          className="wraperDiv"
          id="backgroundWrapperDiv"
          onScroll={(e) => handleScroll(e)}
        >
          <div className="directionDiv">
            <div className="sidebarContentPicsContainer">
              <div className="sidebarContentBackgroundContainer">
                {isLoading ? (
                  <div className="loader">{showloopofskeleton(3)}</div>
                ) : (
                  <>
                    <div>
                      {state.backgrounds.map((images, index) => {
                        return (
                          <>
                            {index % 2 === 0 && (
                              <div className="bgPhototsDiv">
                                <span
                                  className="photo"
                                  onClick={(e) =>
                                    onClickImage(e, images.image.url)
                                  }
                                >
                                  <DraggableImage
                                    image={{ src: images.image.thumb }}
                                    defaultImage={{ src: images.image.url }}
                                  />
                                </span>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                    <div>
                      {state.backgrounds.map((images, index) => {
                        return (
                          <>
                            {index % 2 !== 0 && (
                              <div className="bgPhototsDiv">
                                <span
                                  className="photo"
                                  onClick={(e) =>
                                    onClickImage(e, images.image.url)
                                  }
                                >
                                  <DraggableImage
                                    image={{ src: images.image.thumb }}
                                    defaultImage={{ src: images.image.url }}
                                  />
                                </span>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                  </>
                )}
                {isFetchingMoreBackgrounds && !isLoading && (
                  <div className="backgroundsPaginationLoader">
                    <Spinner />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarBackgroundTemplate;
