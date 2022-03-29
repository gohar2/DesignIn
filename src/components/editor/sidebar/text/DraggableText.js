import React from 'react';
import { useDrag } from 'react-dnd';
import './SidebarTextTemplate.css';

const DraggableImage = (props) => {
  const [{ opacity }, drag] = useDrag({
    item: {
      type: 'IMG',
      id: props.englishTextId ? props.englishTextId : props.arabicTextId,
      heading: props.englishTextHeading
        ? props.englishTextHeading
        : props.arabicTextHeading,
    },
    begin: (component) => {},
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 1 : 1,
    }),
  });
  return (
    <>
      {/* check if english headings are passed */}
      {props && props.englishTextclassName !== undefined ? (
        <button
          ref={drag}
          className={
            props &&
            props.englishTextclassName &&
            `textBtn textBtns ${props.englishTextclassName}`
          }
          id={props && props.englishTextId !== undefined && props.englishTextId}
          onClick={(e) => props.onClickText(e, true)}
          // style={{
          //   opacity,
          //   fontSize: 25,
          //   fontWeight: 'bold',
          //   cursor: 'move',
          // }}
        >
          {props &&
            props.englishTextHeading !== undefined &&
            props.englishTextHeading}
        </button>
      ) : (
        <></>
      )}
      {/* check if arabic headings are passed */}
      {props && props.arabicTextclassName !== undefined ? (
        <button
          ref={drag}
          className={
            props &&
            props.arabicTextclassName &&
            `textBtn textBtns ${props.arabicTextclassName}`
          }
          id={props && props.arabicTextId !== undefined && props.arabicTextId}
          onClick={(e) => props.onClickText(e, true)}
          // style={{
          //   opacity,
          //   fontSize: 25,
          //   fontWeight: 'bold',
          //   cursor: 'move',
          // }}
        >
          {props &&
            props.arabicTextHeading !== undefined &&
            props.arabicTextHeading}
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default DraggableImage;
