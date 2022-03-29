import React, { useContext, useState, useEffect, useCallback } from 'react';
import Context from '../../../store/store';
import SidebarPosterIcon from './SidebarPosterIcon';
import './ElementTemplate.css';
import { ReactComponent as CrossIconEditor } from './../../../../icons/CrossIconEditor.svg';
import SidebarCloseComponent from '../close/SidebarCloseComponent';

import API from '../../../../api/Api';
import userContext from '../../../../userContext/UserContext';
import { FormattedMessage, useIntl } from 'react-intl';
import { debounce } from 'lodash';
import SidebarIconsDetail from './SidebarIconsDetail';
import { showloopofskeleton, Spinner } from '../../../../utils/index';
import Cookies from 'js-cookie';
const ElementTemplate = (props) => {
  const [state, dispatch] = useContext(Context); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const placeholder = useIntl().formatMessage({ id: 'SearchIcons' });
  const [icons, setIcons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nosearch, setNosearch] = useState(true);
  const [cancelbtn, setcancelbtn] = useState(false);
  const [displayAll, setDisplayAll] = useState(false);
  const [isFetchingMoreIcons, setIsFetchingMoreIcons] = useState(false);
  const [isFetchedAllIcons, setIsFetchedAllIcons] = useState(false);
  const [iconsTitle, setIconsTitle] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(18);
  const [isSearched, setIsSearched] = useState(false);
  const [shouldetchIcons, setShouldetchIcons] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState();
  const [allIconsPage, setAllIconsPage] = useState(2);
  const [allIconsPerPage, setAllIconsPerPage] = useState(6);
  const [selectedIconId, setSelectedIconId] = useState(0);

  // const setSvgString = data => {   Shaheer code-refactoring-removing-unused-variables
  //   let icons = data[3].images;
  //   if (icons)
  //     icons.forEach((el, index1) => {
  //       el.description = el.description.replaceAll(
  //         '<path d',
  //         '<path fill="#000000" d',
  //       );

  //       let temp = el.description.match(/fill="#\w*\d*\w*\d*"/g);
  //       let newspecs = [];

  //       if (temp)
  //         temp.forEach((str, index) => {
  //           icons[index1].description = el.description.replaceAll(
  //             str,
  //             `${str} class="${el.title}_${data[0].name}_${str.split('"')[1]}"`,
  //           );
  //           const temspec = {
  //             id: `${el.title}_${data[0].name}_${index}`,
  //             class: `${el.title}_${data[0].name}_${str.split('"')[1]}`,
  //             color: `${str.split('"')[1]}`,
  //           };
  //           newspecs.push(temspec);
  //           icons[index1].specs = newspecs;
  //         });
  //     });
  //   const newdata = [];
  //   const newicons = data[3];
  //   newicons.images = icons;
  //   newdata.push(newicons);
  //   newdata.push(data[1]);
  //   return newdata;
  // };

  //handle infinite scroll
  const handleScroll = (e) => {
    let scrollTop = document.getElementById(e.target.id).scrollTop;
    let scrollHeight = document.getElementById(e.target.id).scrollHeight;
    let offsetHeight = document.getElementById(e.target.id).offsetHeight;
    let contentHeight = scrollHeight - offsetHeight - 5;
    if (
      contentHeight <= scrollTop &&
      Math.round(scrollTop) > 0 &&
      displayAll &&
      state.isIconsDetailOpen &&
      !isFetchedAllIcons &&
      !isFetchingMoreIcons
    ) {
      fetchMoreIcons();
    } else if (
      contentHeight <= Math.round(scrollTop) &&
      Math.round(scrollTop) > 0 &&
      !displayAll &&
      !state.isIconsDetailOpen &&
      !isFetchedAllIcons &&
      !isFetchingMoreIcons
    ) {
      fetchMoreIconsCategories();
    }
  };
  const fetchMoreIconsCategories = () => {
    if (searchValue.length) {
      if (page > state.iconsPaginationPage) {
        dispatch({
          type: 'SET_ICONS_PAGINATION_PAGE',
          payload: state.iconsPaginationPage + 1,
        });
        setIsFetchingMoreIcons(true);
      }
    } else {
      if (allIconsPage > state.iconsPaginationPage) {
        dispatch({
          type: 'SET_ICONS_PAGINATION_PAGE',
          payload: state.iconsPaginationPage + 1,
        });
        setIsFetchingMoreIcons(true);
      }
    }
  };
  const fetchMoreIcons = () => {
    if (page > state.iconsPaginationPage) {
      dispatch({
        type: 'SET_ICONS_PAGINATION_PAGE',
        payload: state.iconsPaginationPage + 1,
      });
      setIsFetchingMoreIcons(true);
    }
  };
  const onClickSeeAll = (e, title, id) => {
    if (title !== 'none') {
      dispatch({ type: 'SET_ICONS_PAGINATION_PAGE', payload: 0 });
      dispatch({ type: 'SET_ICONS', payload: [] });
      setSelectedCatId(id);
      setIconsTitle(title);
      setIsLoading(true);
    } else {
      dispatch({ type: 'SET_ICONS_PAGINATION_PAGE', payload: 0 });
      dispatch({ type: 'SET_ICONS', payload: [] });
      setIsLoading(true);
      setPage(1);
      setPerPage(18);
      setAllIconsPage(2);
    }
    setDisplayAll(!displayAll);
    setSelectedIconId(id);
    setIsFetchedAllIcons(false);
    setIsFetchingMoreIcons(false);
  };
  // const paidBtnClick = () => {
  //   dispatch({ type: 'setOpacityPaid' });
  // };

  // const freeBtnClick = () => {
  //   dispatch({ type: 'setOpacityFree' });
  // };
  const debouncedSearchIcons = useCallback(
    debounce((searchValue, locale) => SearchIcons(searchValue, locale), 1000),
    [],
  );
  const onChangeIcons = (e, locale) => {
    setcancelbtn(true);
    setIsLoading(true);
    debouncedSearchIcons(e.target.value, locale);
  };
  const SearchIcons = (value, locale) => {
    dispatch({ type: 'SET_ICONS_PAGINATION_PAGE', payload: 0 });
    setIsFetchedAllIcons(false);
    setIsFetchingMoreIcons(false);
    setSearchValue(value);
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
  const cancelSearch = () => {
    setIsLoading(true);
    document.getElementById('searchIcons').value = '';
    setSearchValue('');
    setNosearch(!nosearch);
    setcancelbtn(false);
    setDisplayAll(false);
    setIsSearched(!isSearched);
    dispatch({ type: 'SET_ICONS_PAGINATION_PAGE', payload: 0 });
  };
  useEffect(() => {
    return () => {
      dispatch({
        type: 'SET_ICONS_PAGINATION_PAGE',
        payload: 0,
      });
    };
  }, []);
  return (
    <>
      <SidebarCloseComponent />
      <div className="sidebarContent" onClick={onClickSidebar}>
        <div className="templatesHead">
          <h1 className={userState.isArabic ? 'arabicMode' : ''}>
            <FormattedMessage id="icons" defaultMessage="Icons" />
          </h1>
        </div>
        {/* <div className="sidebarContentBtnsDiv">
          <button
            className="sidebarContentPaidBtn"
            id={state.opacityFree ? 'paidBtnIdDull' : 'paidBtnId'}
            onClick={paidBtnClick}
          >
            Paid <hr className="paidBtnLine" />
          </button>
          <button
            className="sidebarContentFreeBtn"
            id={state.opacityPaid ? 'freeBtnIdDull' : 'freeBtnId'}
            onClick={freeBtnClick}
          >
            Free <hr className="freeBtnLine" />
          </button>
        </div> */}
        <div className="sidebarContentSearchBarDiv">
          <input
            className={
              userState.isArabic
                ? 'sidebarContentSearchBar arabicMode'
                : 'sidebarContentSearchBar'
            }
            type="text"
            id="searchIcons"
            placeholder={placeholder}
            onChange={(e) => onChangeIcons(e, userState.isArabic ? 'ar' : '')}
          />
          <div
            className={
              cancelbtn === true
                ? userState.isArabic
                  ? 'CancelSearch Arabic'
                  : 'CancelSearch'
                : 'CancelSearch hiddenElement'
            }
            id="erase"
            onClick={cancelSearch}
          >
            <CrossIconEditor />
          </div>
        </div>
        <div
          className="wraperDiv"
          id="iconsWrapperDiv"
          onScroll={(e) => handleScroll(e)}
        >
          <div className="directionDiv">
            <div className="sidebarContentPicsContainer">
              {isLoading ? (
                <div className="sidebarContentIconsContainer">
                  <div className="loaderIcon">{showloopofskeleton(3)}</div>
                </div>
              ) : (
                state.icons.map((obj) => {
                  if (obj !== undefined && obj?.images.length > 0)
                    if (!displayAll) {
                      return (
                        <SidebarPosterIcon
                          title_ar={obj.name_ar}
                          onClickSeeAll={(e, title, id) =>
                            onClickSeeAll(e, title, id)
                          }
                          id={obj.id}
                          displayAll={displayAll}
                          title={obj.name}
                          images={
                            !isSearched ? obj.images.slice(0, 3) : obj.images
                          }
                          seeAllLink={
                            <FormattedMessage
                              id="seeAll"
                              defaultMessage="See All"
                            />
                          }
                          isLoading={isLoading}
                        />
                      );
                    } else {
                      if (obj.id === selectedIconId) {
                        return (
                          <SidebarIconsDetail
                            title_ar={obj.name_ar}
                            displayAll={displayAll}
                            onClickSeeAll={(e, title) =>
                              onClickSeeAll(e, title)
                            }
                            images={obj.images}
                            iconsTitle={iconsTitle}
                          />
                        );
                      }
                    }
                })
              )}
              {isFetchingMoreIcons && !isLoading && (
                <div className="iconsPaginationLoader">
                  <Spinner />
                </div>
              )}
              {isFetchedAllIcons && !isLoading && (
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

export default ElementTemplate;
