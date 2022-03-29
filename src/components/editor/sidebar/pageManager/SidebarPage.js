import React, { useContext, useState } from 'react';
import Context from '../../../store/store';
import userContext from '../../../../userContext/UserContext.js';
import { InputGroup, FormControl } from 'react-bootstrap';
import { ReactComponent as BlackDots } from '../../../../icons/BlackDots.svg';
import { ReactComponent as TickFolder } from '../../../../icons/tickFolder.svg';
import './SidebarPage.css';
// import { left } from 'glamor'; //Shaheer code-refactoring-removing-unused-variables

const SidebarPage = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this

  const [pageNewName, setPageNewName] = useState(null);
  const [rename, setRename] = useState(false);

  const optionBtnClick = (e) => {
    dispatch({ type: 'PAGE_OPTION', payload: e.currentTarget.id });
  };

  const delPage = (e) => {
    dispatch({ type: 'DELETE_PAGE', payload: e.currentTarget.id });
  };

  const duplicatePage = (e) => {
    dispatch({
      type: 'REMOVE_OPTIONS',
    });
    dispatch({ type: 'COPY_PAGE', payload: e.currentTarget.id });
  };

  const onChangePageName = (e) => {
    dispatch({ type: 'EDIT_PAGE_NAME', payload: pageNewName });
    setRename(false);
  };

  const onKeyUp = (event) => {
    setPageNewName(event.target.value);
  };

  const renamePage = () => {
    dispatch({
      type: 'REMOVE_OPTIONS',
    });
    setRename(true);
  };

  const selectedPage = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'SET_SELECTED_PAGE',
      payload: props.page,
    });
  };

  return (
    <>
      <div className="designParentDiv">
        <button
          className="pageOptionBtn"
          id={props.page.pageId}
          onClick={optionBtnClick}
        >
          <BlackDots className="pageOptionIcon" />
        </button>
        <div className={props.page.pageOptions ? 'arrowLeft' : null}></div>
        <div
          className={
            props.page.pageOptions
              ? state.pages.length === 1
                ? 'deleteOptionsV'
                : 'optionsVPage'
              : 'optionsH'
          }
        >
          <div className="btnOptionDivPageManager">
            <div
              className="btnOptionPageManager"
              id={props.page.pageId}
              onClick={renamePage}
            >
              Rename Page
            </div>
            <div
              className="btnOptionPageManager"
              id={props.page.pageId}
              onClick={duplicatePage}
            >
              Duplicate Page
            </div>
            {state.pages.length > 1 ? (
              <div
                className="btnOptionPageManager"
                id={props.page.pageId}
                onClick={delPage}
              >
                Delete Page
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={
            props.page.className === 'newPage'
              ? `${props.page.className} sidebarPage`
              : `${props.page.className} selectedSidebarPage`
          }
          onClick={selectedPage}
        >
          {props.page.snapshot ? (
            <img
              style={{ height: '150px', border: '0px' }}
              onClick={selectedPage}
              src={props.page.snapshot}
              alt="img"
            />
          ) : null}
        </div>
        {rename ? (
          <div className="folderNameInputFeildDiv">
            <InputGroup className="mb-3 sidebarPageInputFieldDiv">
              <FormControl
                placeholder="Enter Name"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                className="sidebarPageInputField"
                onChange={onKeyUp}
              />
              <InputGroup.Append className="w-25">
                <div
                  className="tickFolderIconDiv w-100"
                  id={props.page.pageId}
                  onClick={onChangePageName}
                >
                  <TickFolder className="tickFolderIcon" />
                </div>
              </InputGroup.Append>
            </InputGroup>
          </div>
        ) : (
          <span className="pageNameSidebar">
            {`${userState.isArabic ? props.arabicPageName : 'Page'} ${
              props.page.pageId + 1
            } ${props.page.title ? props.page.title : 'Instagram Post'}`}
          </span>
        )}
      </div>
    </>
  );
};

export default SidebarPage;
