import React from 'react';
import './SidebarTextTemplate.css';

const MyFonts = (props) => {
  return (
    <>
      <div className="sidebarContentSearchBarDiv">
        <button className="uploadImage">upload</button>
      </div>
      <div className="wraperDivText">
        <div className="directionDiv">
          <div className="fontsDiv">
            <p>PT Scans Web</p>
            <p>quattrocentro</p>
            <p>Quicksand</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyFonts;
