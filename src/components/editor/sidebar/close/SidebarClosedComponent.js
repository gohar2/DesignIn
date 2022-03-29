import React, { useContext } from 'react';
import Context from '../../../store/store';
// import userContext from '../../../../userContext/UserContext'; //Shaheer code-refactoring-removing-unused-variables
import { ReactComponent as CloseBtn } from '../../../../icons/SideBarClose.svg';
// import { FormattedMessage } from 'react-intl'; //Shaheer code-refactoring-removing-unused-variables
import './SidebarCloseComponent.css';

const SidebarCloseComponent = (props) => {
  const [state, dispatch] = useContext(Context);
  // const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables

  const closeSidebar = (state, dispatch) => {
    // dispatch({ type: 'SHOW_PHOTOBAR' });
  };
  return (
    <div className="sidebarClosedBtn">
      <button className="closedBtn">
        <CloseBtn
          className="closeBtnIcon"
          onClick={() => closeSidebar(state, dispatch)}
        />
      </button>
      {/* <button className={userState.isArabic ? "pageManagerBtnClosed arabicMode": "pageManagerBtnClosed"}>
        <FormattedMessage
          id="pageManager"
          defaultMessage="Page Manager"
        />  
      </button> */}
    </div>
  );
};
export default SidebarCloseComponent;
