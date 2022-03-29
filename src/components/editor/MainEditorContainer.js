import React, { useReducer } from 'react';
import Editor from './editor/Editor';
import Navbar from './navbar/Navbar';
import SidebarWrapper from './sidebar/SidebarWrapper';
import EditorBar from './editorBar/EditorBar';
import { Provider } from '../store/store';
import { reducer, initialState } from '../store/reducer';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import './MainEditorContainer.css';

const MainEditorContainer = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Provider value={[state, dispatch]}>
      <DndProvider backend={Backend}>
        <div className="mainContainer">
          <div className="navbarContainer">
            <Navbar />
          </div>
          <div
            className={
              state.pageWidth > 600 && state.sidebarType === ''
                ? 'editorBarFullContainerPageSize1000'
                : state.sidebarType === ''
                ? 'editorBarFullContainer'
                : 'editorBarContainer'
            }
          >
            <EditorBar />
          </div>
          <div
            className={
              state.pageWidth > 600 && state.sidebarType === ''
                ? 'lowerContainerPageSize1000'
                : 'lowerContainer'
            }
          >
            <div className="editorContainer" id="ec0">
              <Editor />
            </div>
            <div
              className={
                state.pageWidth > 600 && state.sidebarType === ''
                  ? 'sidebarWrapperContainerPageSize1000'
                  : 'sidebarWrapperContainer'
              }
            >
              <SidebarWrapper />
            </div>
          </div>
        </div>
      </DndProvider>
    </Provider>
  );
};

export default MainEditorContainer;
