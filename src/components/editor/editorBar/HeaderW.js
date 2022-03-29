import React from 'react';
import { ReactComponent as CrossCircle } from '../../../icons/CrossCircle.svg';

import './Header.css';

const HeaderW = (props) => {
  return (
    <>
      <div className="textBarHeadingDivflip">
        <div className="sidebarContentCloseBtnDiv">
          <button className="sidebarContentCloseBtnW" onClick={props.onClick}>
            <CrossCircle className="headingBtnIcons" />
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderW;
