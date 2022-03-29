import React, { useContext } from 'react';
import SidebarCloseComponent from '../close/SidebarCloseComponent';
import Context from '../../../store/store';
import userContext from '../../../../userContext/UserContext';
import { ReactComponent as PageManagerIcon } from '../../../../icons/PageManagerIcon.svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SidebarPage from './SidebarPage';
import { showloopofskeleton } from '../../../../utils/index';
import { FormattedMessage } from 'react-intl';
import './PageManager.css';

const PageManager = (props) => {
  const [state, dispatch] = useContext(Context);
  const [userState, userDispatch] = useContext(userContext); //Shaheer code-refactoring-removing-unused-variables cant comment var from this

  const addPage = () => {
    dispatch({ type: 'ADD_NEW_PAGE' });
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    margin: `0`,
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    width: '100%',
    float: 'left',
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(state.pages, source.index, destination.index);
      dispatch({
        type: 'REORDER',
        payload: items,
      });
    }
  };

  const pageManagerMessages = {
    pageManager: 'مدير الصفحة',
    addNewPage: 'أضف صفحة جديدة',
    page: 'صفحة',
  };

  const onClickSidebar = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'SET_SELECTED_EDITOR_BTN',
      payload: null,
    });
    dispatch({
      type: 'REMOVE_SELECTION',
    });
  };
  return (
    <>
      <SidebarCloseComponent />
      <div className="sidebarContent" onClick={onClickSidebar}>
        <div className="templatesHead">
          <h1 className={state.isArabic ? 'arabicMode' : ''}>
            <FormattedMessage id="pageManager" defaultMessage="Page Manager" />
          </h1>
        </div>
        <div className="pagesContainer">
          <div className="createPageDiv" onClick={addPage}>
            <PageManagerIcon className="createFolderIcon" />
            <div
              className={
                userState.isArabic
                  ? 'createFolderHeading arabicMode'
                  : 'createFolderHeading'
              }
            >
              <FormattedMessage id="addNewPage" defaultMessage="Add New Page" />
            </div>
          </div>
        </div>
        <div className="wraperDivPageManager">
          <div className="pageContainerSidebar">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {state.pages.map((page, index) => (
                      <Draggable
                        key={page.pageId}
                        draggableId={`page-${page.pageId}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <>
                            <div
                              className="sidebarPageDiv"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                              )}
                            >
                              {state.pageManagerLoader ? (
                                showloopofskeleton(1)
                              ) : (
                                <SidebarPage
                                  page={page}
                                  arabicPageName={pageManagerMessages.page}
                                />
                              )}
                            </div>
                          </>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageManager;
