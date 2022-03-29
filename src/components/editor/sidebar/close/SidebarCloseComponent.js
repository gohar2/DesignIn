import React, { useContext } from 'react';
import Context from '../../../store/store';
import userContext from '../../../../userContext/UserContext';
import { ReactComponent as CloseBtn } from '../../../../icons/SideBarClose.svg';
// import { FormattedMessage } from 'react-intl';  //Shaheer code-refactoring-removing-unused-variables
// import domtoimage from 'dom-to-image'; //Shaheer code-refactoring-removing-unused-variables
import './SidebarCloseComponent.css';
import { setDimensionsOfEditorContainer } from '../../../../utils/index';

const SidebarCloseComponent = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext);
  const type = window.location.pathname.split('/')[2];

  const closeSidebar = (state, dispatch) => {
    let setDimension = new Promise((onSuccess) => {
      dispatch({ type: 'CLOSE_SIDEBAR' });
      onSuccess(true);
    });
    setDimension.then((result) => {
      document.getElementById('p0').style.width = `${
        setDimensionsOfEditorContainer(type, userState, state)[0]
      }px`;
      document.getElementById('p0').style.height = `${
        setDimensionsOfEditorContainer(type, userState, state)[1]
      }px`;
    });
  };
  // const onClickMenuItem = e => {                              //Shaheer code-refactoring-removing-unused-variables
  //   dispatch({ type: 'SET_LOADER', payload: true});
  //   dispatch({ type: 'SHOW_SIDEBAR', payload: e.currentTarget.value });
  //   for(let page of state.pages) {
  //     domtoimage
  //     .toJpeg(document.getElementById(`page${page.pageId}`), {
  //       quality: 0.95,
  //     })
  //     .then(function(dataUrl) {
  //       dispatch({ type: 'GET_SNAPSHOT',
  //         payload: { pageId: page.pageId, src: dataUrl }
  //       });
  //       if((state.pages.length - 1) === page.pageId)
  //       dispatch({ type: 'SET_LOADER', payload: false});
  //     });
  //   }
  // };
  return (
    <div className="sidebarCloseBtn">
      <div className="editorBarCloseBtn"></div>
      <button className="closeBtn mt-5">
        <CloseBtn
          className="closeBtnIcon"
          onClick={() => closeSidebar(state, dispatch)}
        />
      </button>
      {/* <button
        className={userState.isArabic ? "pageManagerBtn arabicMode": "pageManagerBtn"}
        value="PageManager"
        onClick={onClickMenuItem}
      >
        <FormattedMessage
          id="pageManager"
          defaultMessage="Page Manager"
        />  
      </button> */}
    </div>
  );
};
export default SidebarCloseComponent;
