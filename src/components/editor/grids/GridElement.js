import React, { useContext, useEffect, useState } from 'react';
import fullPageGridImage from '../../../images/FINAL GRIDS-01.svg';
import Context from '../../store/store';
import { useDrop } from 'react-dnd';
import './grids.css';

const GridElement = (props) => {
  const [state, dispatch] = useContext(Context);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    let singleClickTimer;
    if (clicks === 1) {
      singleClickTimer = setTimeout(() => {
        onClickGrid();
        setClicks(0);
      }, 250);
    } else if (clicks === 2) {
      doubleClick();
      setClicks(0);
    }
    return () => clearTimeout(singleClickTimer);
  }, [clicks]);

  const [{}, drop] = useDrop({
    accept: 'IMG',
    drop: (el) => {
      if (el.isSVG === true) {
        return;
      } else {
        props.droppedImage(props.image.id, el.element.src);
      }
    },
  });

  const doubleClick = () => {
    dispatch({
      type: 'SELECT_GRID_IMG',
      payload: {
        id: props.image.id,
        name: props.gridName,
        type: 'grid',
        opacity: 1,
        brightness: 100,
        contrast: 100,
        saturate: 100,
        blur: 0,
        padding: 0,
        isflipX: false,
        isflipY: false,
        spacing: state.selectedElement.spacing
          ? state.selectedElement.spacing
          : 10,
        frame: props.image.frame,
      },
    });
  };

  const onClickGrid = () => {
    dispatch({
      type: 'SELECT_GRID',
      payload: {
        id: props.image.id,
        name: props.gridName,
        type: 'grid',
        opacity: 1,
        brightness: 100,
        contrast: 100,
        saturate: 100,
        blur: 0,
        padding: 0,
        isflipX: false,
        isflipY: false,
        spacing: state.selectedElement.spacing
          ? state.selectedElement.spacing
          : 10,
        frame: props.frame,
      },
    });
  };

  return (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url("${
          state.grids[props.gridName].images[props.image.id].src
            ? null
            : fullPageGridImage
        }")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'grey',
        overflow: 'hidden',
        position: 'relative',
      }}
      onClick={() => setClicks(clicks + 1)}
    >
      {props.image.src ? (
        <img
          id={`img${props.image.id}`}
          className={
            state.doubleClick &&
            state.grids[props.gridName].images[props.image.id].selected
              ? `${props.image.moveableClassName}`
              : `${
                  state.grids[props.gridName].images[props.image.id].selected
                    ? props.image.selectedClassName
                    : props.image.className
                }`
          }
          style={{
            left: props.image.frame.properties.left,
            top: props.image.frame.properties.top,
            height: props.image.height,
            width: props.image.width,
            padding: props.image.padding,
            opacity: props.image.opacity,
            filter: `contrast(${props.image.contrast}%) brightness(${
              props.image.brightness
            }%) saturate(${props.image.saturate}%) blur(${
              props.image.blur
            }px) ${!!props.image.filter ? props.image.filter : ''}`,
            transform: `
      rotateX(${props.image.isflipX ? 180 : 0}deg)
      rotateY(${props.image.isflipY ? 180 : 0}deg) 
      scaleX(${
        props.image.isZoomIn
          ? 2
          : props.frame && props.frame.properties.transform.scaleX
      }) scaleY(${
              props.image.isZoomIn
                ? 2
                : props.frame && props.frame.properties.transform.scaleY
            }) rotate(${
              props.frame && props.frame.properties.transform.rotate
            }) matrix3d(${
              props.frame && props.frame.properties.transform.matrix3d
            })`,
            zIndex: props.image.zIndex,
          }}
          src={props.image.src}
          alt="img"
        />
      ) : null}
    </div>
  );
};
export default GridElement;
