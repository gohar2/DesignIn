import React, { useContext, useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Context from '../../../store/store';
import userContext from '../../../../userContext/UserContext';
import './SidebarPhotoTemplate.css';
import SidebarCloseComponent from '../close/SidebarCloseComponent';
import { createFrame, showloopofskeleton } from '../../../../utils/index';
import DraggableImage from '../DraggableImage';
import API from '../../../../api/Api';
import { FormattedMessage, useIntl } from 'react-intl';
import { toast, ToastContainer } from 'react-toastify';
import { getAllImages, getAllSeachedImages } from '../../../../api/constants';

const SidebarPhotoTemplate = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState] = useContext(userContext);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldFetchPhotos, setShouldFetchPhotos] = useState(false);
  const [isFetchingMorePhotos, setIsFetchingMorePhotos] = useState(false);
  const [isFetchedAllPhotos, setIsFetchedAllPhotos] = useState(false);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const placeholder = useIntl().formatMessage({ id: 'SearchPhotos' });
  const notify = (message) => toast(message);

  useEffect(() => {
    setShouldFetchPhotos(true);
  }, [state.photos?.length]);
  useEffect(() => {
    // if (Cookies.get('CookieConsent') !== undefined) {
    API.get(`${getAllImages(page, 30)}`)
      .then((result) => {
        let imagesObj = {};
        let temp = [];
        result.forEach((el) => {
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
        dispatch({ type: 'SET_PHOTOS', payload: imagesObj.unsplash });
        setIsLoading(false);
        setPage(page + 1);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //for infinite scroll
  const handleScroll = (e) => {
    let scrollTop = document.getElementById(e.target.id).scrollTop;
    let scrollHeight = document.getElementById(e.target.id).scrollHeight;
    let offsetHeight = document.getElementById(e.target.id).offsetHeight;
    let contentHeight = scrollHeight - offsetHeight - 10;
    if (contentHeight <= scrollTop && scrollTop > 0 && shouldFetchPhotos) {
      fetchMoreData();
    }
  };

  const fetchMoreData = () => {
    if (!searchValue.length) {
      setIsFetchingMorePhotos(true);
      setShouldFetchPhotos(false);
      API.get(`${getAllImages(page, 30)}`)
        .then((result) => {
          console.log(result);
          setTimeout(function () {
            if (!result.length) {
              setIsFetchingMorePhotos(false);
              setIsFetchedAllPhotos(true);
            } else {
              setIsFetchedAllPhotos(false);
              setIsFetchingMorePhotos(false);
              let imagesObj = {};
              let temp = [];
              result.forEach((el) => {
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
              let images = state.photos;
              let newImages = images.concat(imagesObj.unsplash);
              dispatch({ type: 'SET_PHOTOS', payload: newImages });
              setPage(page + 1);
            }
          }, 4000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsFetchingMorePhotos(true);
      setShouldFetchPhotos(false);
      API.get(`${getAllSeachedImages(page, 30, searchValue)}`)
        .then((result) => {
          setTimeout(function () {
            if (!result.results.length) {
              setIsFetchingMorePhotos(false);
              setIsFetchedAllPhotos(true);
            } else {
              setIsFetchingMorePhotos(false);
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
              let images = state.photos;
              let newImages = images.concat(imagesObj.unsplash);
              dispatch({ type: 'SET_PHOTOS', payload: newImages });
              setPage(page + 1);
            }
          }, 4000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearchPhotos = useCallback(
    debounce((searchValue) => getphotos(searchValue), 1000),
    [],
  );
  const onChangePhotos = (e) => {
    debouncedSearchPhotos(e.target.value);
  };
  const getphotos = (searchValue) => {
    if (searchValue.length) {
      setSearchValue(searchValue);
      setIsLoading(true);
      let clearPhotos = new Promise((onSuccess) => {
        dispatch({ type: 'SET_PHOTOS', payload: [] });
        onSuccess(true);
      });
      clearPhotos.then((result) => {
        API.get(`${getAllSeachedImages(page, 30, searchValue)}`).then(
          (result) => {
            if (result.results.length) {
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
              dispatch({ type: 'SET_PHOTOS', payload: imagesObj.unsplash });
              setIsLoading(false);
              setIsFetchedAllPhotos(false);
            } else {
              setIsLoading(false);
              setIsFetchedAllPhotos(false);
              notify('Images not found');
            }
          },
        );
      });
    }
  };

  const onClickImage = (e, images) => {
    if (e.target.tagName === 'IMG') {
      const left = `${
        document.getElementById(state.selectedPage.pageId).offsetWidth / 2 -
        e.target.clientWidth / 2
      }px`;
      const top = `${
        document.getElementById(state.selectedPage.pageId).offsetHeight / 2 -
        e.target.clientWidth / 2
      }px`;

      dispatch({
        type: 'STORE_ELEMENT',
        payload: {
          type: 'img',
          src: images.image.url,
          frame: createFrame('200px', '200px', top, left),
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
      dispatch({
        type: 'SAVE_HISTORY',
      });
    }
  };

  const onClickSidebar = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'SET_SHORTCUT_KEY',
      payload: false,
    });
    dispatch({
      type: 'SET_SELECTED_EDITOR_BTN',
      payload: null,
    });
    dispatch({
      type: 'REMOVE_SELECTION',
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
      <ToastContainer />
      <SidebarCloseComponent />
      <div className="sidebarContent" onClick={onClickSidebar}>
        <div className="templatesHead">
          <h1 className={userState.isArabic ? 'arabicMode' : ''}>
            <FormattedMessage id="photos" defaultMessage="Photos" />
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
            onChange={onChangePhotos}
          />
        </div>
        <div
          className="wraperDiv"
          id="photoContainer1"
          onScroll={(e) => handleScroll(e)}
        >
          <div className="directionDiv">
            <div className="sidebarContentPicsContainer">
              <div
                className="sidebarContentPhotosContainer"
                id="photoContainer2"
              >
                {isLoading ? (
                  <div className="loader">{showloopofskeleton(2)}</div>
                ) : (
                  <>
                    <div className="left">
                      {state.photos.map((images, index) => {
                        return (
                          <>
                            {index % 2 === 0 && (
                              <div className="photoContainerS" id={index}>
                                <span
                                  className="photoS"
                                  onClick={(e) => onClickImage(e, images)}
                                  key={index}
                                >
                                  <DraggableImage
                                    image={{
                                      src: images.image.thumb,
                                      defaultUrl: images.image.url,
                                      id: images.id,
                                      isPhotos: true,
                                      height: images.image.height,
                                      width: images.image.width,
                                    }}
                                  />
                                </span>
                              </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                    <div className="right">
                      {state.photos.map((images, index) => {
                        return (
                          <>
                            {index % 2 !== 0 && (
                              <div className="photoContainerS" id={index}>
                                <span
                                  className="photoS"
                                  onClick={(e) => onClickImage(e, images)}
                                  key={index}
                                >
                                  <DraggableImage
                                    image={{
                                      src: images.image.thumb,
                                      defaultUrl: images.image.url,
                                      id: images.id,
                                      isPhotos: true,
                                      height: images.image.height,
                                      width: images.image.width,
                                    }}
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
              </div>
              {isFetchingMorePhotos && !isLoading && (
                <div className="paginationLoader">
                  <Spinner />
                </div>
              )}
              {isFetchedAllPhotos && !isLoading && (
                <div className="iconsPaginationEnd">
                  <span>You have reached the end</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarPhotoTemplate;
