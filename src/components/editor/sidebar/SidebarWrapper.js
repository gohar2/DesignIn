import React, { useContext } from 'react';
import Context from '../../store/store';
import SidebarPhotoTemplate from './photos/SidebarPhotoTemplate';
import SidebarBackgroundTemplate from './background/SidebarBackgroundTemplate';
import SidebarUploadTemplate from './uploads/SidebarUploadTemplate';
import SidebarTextTemplate from './text/SidebarTextTemplate';
import CollorEffects from '../sidebar/CollorEffects';
import CollorBalance from '../sidebar/CollorBalance';
import Sidebar from './Sidebar';
import SidebarClosedComponent from './close/SidebarClosedComponent';
import IconColorBar from './iconCollorPicker/IconColorBar';
import './SidebarWrapper.css';

const SidebarWrapper = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(Context); //Shaheer code-refactoring-removing-unused-variables cant comment var from this
  var sidebarComponent;
  if (state.sidebarType === '') {
    sidebarComponent = <SidebarClosedComponent />;
  } else if (state.sidebarType === 'Photos') {
    sidebarComponent = <SidebarPhotoTemplate />;
  } else if (state.sidebarType === 'Text') {
    sidebarComponent = <SidebarTextTemplate />;
  } else if (state.sidebarType === 'Background') {
    sidebarComponent = <SidebarBackgroundTemplate />;
  } else if (state.sidebarType === 'Upload') {
    sidebarComponent = <SidebarUploadTemplate />;
  } else if (state.sidebarType === 'effects') {
    sidebarComponent = <CollorEffects />;
  } else if (state.sidebarType === 'balance') {
    sidebarComponent = <CollorBalance />;
  } else if (
    state.selectedElement &&
    state.selectedElement.type === 'svg' &&
    state.sidebarType === 'IconColorBar'
  ) {
    sidebarComponent = <IconColorBar />;
  } else {
    sidebarComponent = <SidebarPhotoTemplate />;
  }
  return (
    <>
      <div className="sidebarContentContainer">{sidebarComponent}</div>
      <div className="sidebarContainer">
        {!state.showSidebar ? <Sidebar /> : null}
      </div>
    </>
  );
};

export default SidebarWrapper;
