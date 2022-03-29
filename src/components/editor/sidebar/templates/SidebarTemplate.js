import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';  //Shaheer code-refactoring-removing-unused-variables
import Context from '../../../store/store';
import userContext from '../../../../userContext/UserContext';
import SidebarPosters from '../SidebarPosters';
import SidebarPostersDetails from '../SidebarPostersDetails';
import './SidebarTemplate.css';
import SidebarCloseComponent from '../close/SidebarCloseComponent';
// import { createFrame } from '../../../../utils/index'; //Shaheer code-refactoring-removing-unused-variables
import API from '../../../../api/Api';
import { ReactComponent as CrossIconEditor } from './../../../../icons/CrossIconEditor.svg';

import { showloopofskeleton, Spinner } from '../../../../utils/index';
import { FormattedMessage, useIntl } from 'react-intl';
import { debounce } from 'lodash';
import SidebarSearchedTemplates from '../SidebarSearchedTemplates';
import Cookies from 'js-cookie';

const SidebarTemplate = (props) => {
  const [state, dispatch] = useContext(Context); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayAll, setDisplayAll] = useState(false);
  const [templateId, setTemplateId] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [allTemplatesPage, setAllTemplatesPage] = useState(1);
  const [allSearchedTemplatesPage, setAllSearchedTemplatesPage] = useState(1);
  const [allTemplatePerPage, setAllTemplatePerPage] = useState(8);
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);
  const [isFetchingMoreTemplates, setIsFetchingMoreTemplates] = useState(false);
  const [isFetchedAllTemplates, setIsFetchedAllTemplates] = useState(false);

  const [cancelbtn, setcancelbtn] = useState(false);
  const [searchTemplateQuery, setSearchTemplateQuery] = useState('');
  const [searchTemplateValue, setSearchTemplateValue] = useState('');

  //when search value is updated
  // useEffect(() => {
  //   if (!searchTemplateValue) {
  //     setIsLoading(true);
  //     const urlSegments = window.location.pathname.split('/');
  //     const id = urlSegments.length === 4 ? urlSegments.pop() : '';
  //     if (window.location.pathname.substr(8, 1) === 'D') {
  //       API.get(
  //         `${process.env.REACT_APP_BASE_URL}${getTemplatesByDesign(
  //           state.categoryID,
  //           1,
  //           allTemplatePerPage,
  //         )}`,
  //       ).then(result => {
  //         if (result.meta.code === 200) {
  //           dispatch({ type: 'SET_TEMPLATES', payload: result.data });
  //           setTemplates(result.data);
  //           setIsLoading(false);
  //           setAllTemplatesPage(2);
  //         }
  //       });
  //     } else {
  //       API.get(
  //         `${process.env.REACT_APP_BASE_URL}${getTemplatesByPage(
  //           id,
  //           1,
  //           allTemplatePerPage,
  //         )}`,
  //       ).then(result => {
  //         if (result.meta.code === 200) {
  //           dispatch({ type: 'SET_TEMPLATES', payload: result.data });
  //           setTemplates(result.data);
  //           setAllTemplatesPage(2);
  //         }
  //       });
  //     }
  //   }
  // }, [searchTemplateValue, state.categoryID]);
  useEffect(() => {
    return () => {
      dispatch({
        type: 'SET_TEMPLATES_PAGINATION_PAGE',
        payload: 0,
      });
    };
  }, []);
  //when component mounts
  useEffect(() => {
    // if(Cookies.get('CookieConsent') !== undefined){
    const urlSegments = window.location.pathname.split('/');
    const id = urlSegments.length === 4 ? urlSegments.pop() : '';
    if (window.location.pathname.substr(8, 1) === 'D') {
    } else {
    }
    // }else {
    //   setIsLoading(false)
    // }
  }, [state.categoryID]);

  //when see all or cancel button is clicked
  const onClickSeeAll = (e, id) => {
    setIsFetchingMoreTemplates(false);
    setIsFetchedAllTemplates(false);
    //when see all button is clicked
    if (id !== 'none') {
      dispatch({ type: 'SET_TEMPLATES_PAGINATION_PAGE', payload: 0 });
      dispatch({ type: 'SET_TEMPLATES', payload: [] });
      setIsLoading(true);
      //make api call to fetch all designs and apend the fetched array in templates array
    } else {
      //when cancel button is clicked
      dispatch({ type: 'SET_TEMPLATES_PAGINATION_PAGE', payload: 0 });
      setPage(1);
      setItemsPerPage(10);
      if (searchTemplateValue !== '' && searchTemplateValue.length) {
      } else {
        //wehen search input field is empty
        const urlSegments = window.location.pathname.split('/');
        const id = urlSegments.length === 4 ? urlSegments.pop() : '';
      }
    }

    if (id) {
      setTemplateId(id);
    }
    setDisplayAll(!displayAll);
  };

  //handle infinite scroll for templates
  const handleScroll = (e) => {
    let scrollTop = document.getElementById(e.target.id).scrollTop;
    let scrollHeight = document.getElementById(e.target.id).scrollHeight;
    let offsetHeight = document.getElementById(e.target.id).offsetHeight;
    let contentHeight = scrollHeight - offsetHeight - 5;
    //when templates designs scroll is pulled down
    if (
      // scrollTop > 0 &&
      contentHeight <= Math.round(scrollTop) &&
      state.isTemplatesDetailOpen &&
      !isSearchModeOn &&
      !isFetchedAllTemplates
    ) {
      fetchMoreTemplatesDesigns();
    } else if (
      //when all templates scroll is pulled down
      // scrollTop > 0 &&
      contentHeight <= Math.round(scrollTop) &&
      !state.isTemplatesDetailOpen &&
      !isSearchModeOn &&
      !isFetchedAllTemplates
    ) {
      fetchMoreTemplates();
    } else if (
      contentHeight <= scrollTop &&
      isSearchModeOn &&
      !isFetchedAllTemplates
    ) {
      fetchMoreSearchedDesigns();
    }
  };
  const fetchMoreSearchedDesigns = () => {
    if (allSearchedTemplatesPage > state.templatesPaginationPage) {
      dispatch({
        type: 'SET_TEMPLATES_PAGINATION_PAGE',
        payload: state.templatesPaginationPage + 1,
      });
      setIsFetchingMoreTemplates(true);
      const urlSegments = window.location.pathname.split('/');
      const id = urlSegments.length === 4 ? urlSegments.pop() : '';
    }
  };
  const fetchMoreTemplates = () => {
    if (allTemplatesPage > state.templatesPaginationPage) {
      dispatch({
        type: 'SET_TEMPLATES_PAGINATION_PAGE',
        payload: state.templatesPaginationPage + 1,
      });
      setIsFetchingMoreTemplates(true);
      if (!searchTemplateValue.length) {
        const urlSegments = window.location.pathname.split('/');
        const id = urlSegments.length === 4 ? urlSegments.pop() : '';
        if (window.location.pathname.substr(8, 1) === 'D') {
        } else {
        }
      } else {
      }
    }
  };
  const fetchMoreTemplatesDesigns = () => {
    if (page > state.templatesPaginationPage) {
      dispatch({
        type: 'SET_TEMPLATES_PAGINATION_PAGE',
        payload: state.templatesPaginationPage + 1,
      });
      setIsFetchingMoreTemplates(true);
    }
  };
  const cancelSearch = () => {
    setIsSearchModeOn(false);
    setcancelbtn(false);
    setSearchTemplateQuery('');
    dispatch({ type: 'SET_SEARCHED_TEMPLATE_DESIGNS', payload: [] });
    dispatch({
      type: 'SET_TEMPLATES_PAGINATION_PAGE',
      payload: 1,
    });
    setAllSearchedTemplatesPage(1);
    setIsFetchingMoreTemplates(false);
    setIsFetchedAllTemplates(false);
  };
  const debouncedSearchIcons = useCallback(
    debounce(
      (searchValue, locale) => SearchTemplates(searchValue, locale),
      1000,
    ),
    [],
  );
  const SearchTemplates = (value, locale) => {
    dispatch({
      type: 'SET_TEMPLATES_PAGINATION_PAGE',
      payload: 1,
    });
    const urlSegments = window.location.pathname.split('/');
    const id = urlSegments.length === 4 ? urlSegments.pop() : '';
    if (value === '') {
      dispatch({ type: 'SET_SEARCHED_TEMPLATE_DESIGNS', payload: [] });
      setIsLoading(false);
    } else {
    }
  };
  const onChangeTemplates = (e, locale) => {
    setIsFetchingMoreTemplates(false);
    setIsFetchedAllTemplates(false);
    setIsLoading(true);
    setcancelbtn(true);
    setIsSearchModeOn(true);
    setSearchTemplateQuery(e.target.value);
    debouncedSearchIcons(e.target.value, locale);
  };
  const placeholder = useIntl().formatMessage({ id: 'SearchTemplates' });

  const onClickSidebar = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'SET_SELECTED_EDITOR_BTN',
      payload: null,
    });
    dispatch({
      type: 'REMOVE_SELECTION',
    });
    dispatch({
      type: 'SET_SHORTCUT_KEY',
      payload: false,
    });
  };
  return (
    <>
      <SidebarCloseComponent />
      <div className="sidebarContent" onClick={onClickSidebar}>
        <>
          <div className="templatesHead">
            <h1 className={userState.isArabic ? 'arabicMode' : ''}>
              <FormattedMessage id="templates" defaultMessage="Templates" />
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
              onChange={(e) =>
                onChangeTemplates(e, userState.isArabic ? 'ar' : '')
              }
              value={searchTemplateQuery}
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
            id="templatesWrapperDiv"
            onScroll={(e) => handleScroll(e)}
          >
            <div className="directionDiv">
              <div className="sidebarContentPicsContainer">
                <div
                  className={
                    props.uploaded ? '' : 'sidebarContentPicsContainerDiv'
                  }
                >
                  {isLoading ? (
                    <div className="sidebarContentTemplatesContainer">
                      <div className="loader">{showloopofskeleton(2)}</div>
                    </div>
                  ) : !isSearchModeOn ? (
                    !!state.templates &&
                    state.templates.map((obj, index) => {
                      if (obj?.images.length > 0) {
                        if (!displayAll) {
                          return (
                            <SidebarPosters
                              onClickSeeAll={(e, id, title) =>
                                onClickSeeAll(e, id, title)
                              }
                              displayAll={displayAll}
                              key={index}
                              title={
                                userState.isArabic ? obj.name_ar : obj.name
                              }
                              images={obj.images.slice(0, 2)}
                              seeAllLink={
                                <FormattedMessage
                                  id="seeAll"
                                  defaultMessage="See All"
                                />
                              }
                              id={obj.id}
                              isTemplate={true}
                            />
                          );
                        } else if (obj.id == templateId) {
                          return (
                            <SidebarPostersDetails
                              id={obj.id}
                              isTemplate={true}
                              displayAll={displayAll}
                              onClickSeeAll={(e, title) =>
                                onClickSeeAll(e, title)
                              }
                              images={obj.images}
                              templatesTitle={
                                userState.isArabic ? obj.name_ar : obj.name
                              }
                            />
                          );
                        }
                      }
                    })
                  ) : isSearchModeOn && state.searchedTemplateDesigns ? (
                    <SidebarSearchedTemplates
                      searchQuery={searchTemplateQuery}
                      images={state.searchedTemplateDesigns}
                      templatesTitle={
                        userState.isArabic
                          ? 'Searched Templates ar'
                          : 'Searched Templates'
                      }
                    />
                  ) : (
                    <></>
                  )}
                </div>
                {isFetchingMoreTemplates && !isLoading && (
                  <div className="iconsPaginationLoader">
                    <Spinner />
                  </div>
                )}
                {isFetchedAllTemplates && !isLoading && (
                  <div className="iconsPaginationEnd">
                    <span>You have reached the end</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default SidebarTemplate;
