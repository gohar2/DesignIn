import React, { useContext, useEffect, useState } from 'react';
import fullPageGridImage from '../../../images/FINAL GRIDS-01.svg';
import { useParams, withRouter } from 'react-router-dom';
import Context from '../../store/store';
import { useDrop } from 'react-dnd';
import '../grids/grids.css';

const FrameElement = (props) => {
  const [state, dispatch] = useContext(Context);
  const [clicks, setClicks] = useState(0);
  let url = props.location.pathname.split('/');
  let { id } = useParams();

  useEffect(() => {
    let singleClickTimer;
    if (state.selectedElement?.lock) {
      setClicks(0);
    }
    if (clicks === 1) {
      if (!state.selectedElement.lock) {
        singleClickTimer = setTimeout(() => {
          onClickFrame();
          setClicks(0);
        }, 250);
      }
    } else if (clicks === 2) {
      if (!state.selectedElement.lock) {
        doubleClick();
        setClicks(0);
      }
    }
    return () => clearTimeout(singleClickTimer);
  }, [clicks]);

  const [{}, drop] = useDrop({
    accept: 'IMG',
    drop: (el) => {
      if (el.isSVG === true) {
        return;
      } else {
        dispatch({ type: 'IS_FRAME', payload: true });
        props.droppedImage(props.image.id, el.element.src, el.height, el.width);
      }
    },
  });

  const doubleClick = () => {
    dispatch({
      type: 'SELECT_FRAME_IMG',
      payload: {
        id: props.moveableId,
        name: props.frameName,
        src: props.image.src,
        type: 'frame',
        opacity: 1,
        brightness: 100,
        contrast: 100,
        saturate: 100,
        blur: 0,
        padding: 0,
        isflipX: false,
        isflipY: false,
        frame: props.image.frame,
      },
    });
  };

  const onClickFrame = () => {
    dispatch({
      type: 'SELECT_FRAME',
      payload: {
        single: {
          id: props.moveableId,
          name: props.frameName,
          src: props.image.src,
          type: 'frame',
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
          zIndex: 0,
        },
        double: {
          id: props.moveableId,
          name: props.frameName,
          src: props.image.src,
          type: 'frame',
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          frame: props.image.frame,
        },
      },
    });
  };
  const frameImgHeight = state.frames[props.frameName].images[0].imageHeight;
  const frameImgWidth = state.frames[props.frameName].images[0].imageWidth;

  const getHieght = () => {
    if (state.doubleClick) {
      if (frameImgWidth > frameImgHeight) {
        return state.frames[state?.selectedElement?.name]?.height;
      } else {
        return 'auto';
      }
    } else if (state.frameDone && frameImgWidth < frameImgHeight) {
      return 'auto';
    } else if (url[3] === 'Design' && frameImgWidth < frameImgHeight) {
      return 'auto';
    } else if (id && frameImgWidth < frameImgHeight) {
      return 'auto';
    } else {
      return '100%';
    }
  };

  const getWidth = () => {
    if (state.doubleClick) {
      if (frameImgWidth < frameImgHeight) {
        return state.frames[state?.selectedElement?.name]?.width;
      } else {
        return 'auto';
      }
    } else if (state.frameDone && frameImgWidth > frameImgHeight) {
      return 'auto';
    } else if (url[3] === 'Design' && frameImgWidth > frameImgHeight) {
      return 'auto';
    } else if (id && frameImgWidth > frameImgHeight) {
      return 'auto';
    } else {
      return '100%';
    }
  };

  return (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url("${
          state.frames[props.frameName].images[0].src ? null : fullPageGridImage
        }")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: state.doubleClick && 'grey',
        overflow: 'hidden',
        position: 'relative',
      }}
      onClick={() => setClicks(clicks + 1)}
    >
      {props.image.src ? (
        <img
          id={`${props.moveableId}img${0}`}
          className={
            state.doubleClick &&
            state.frames[props.frameName].images[0].selected
              ? `${props.className}`
              : `${
                  state.frames[props.frameName].images[0].selected
                    ? props.image.selectedClassName
                    : props.image.className
                }`
          }
          style={{
            position: 'relative',
            left: props.image.frame.properties.left,
            top: props.image.frame.properties.top,
            height: getHieght(),
            width: getWidth(),
            padding: props.image.padding,
            opacity: props.image.opacity,
            filter: `contrast(${props.image.contrast}%) 
      brightness(${props.image.brightness}%) 
      saturate(${props.image.saturate}%) 
      blur(${props.image.blur}px) 
      ${!!props.image.filter ? props.image.filter : ''}`,
            transform: `
      translate(${props.image.frame.properties.translate[0]}px, ${
              props.image.frame.properties.translate[1]
            }px)
      rotateX(${props.image.isflipX ? 180 : 0}deg)
      rotateY(${props.image.isflipY ? 180 : 0}deg) 
      scaleX(${
        props.image.isZoomIn ? 2 : props?.image?.frame?.properties.scale[0]
      }) 
      scaleY(${
        props.image.isZoomIn ? 2 : props?.image?.frame?.properties.scale[1]
      }) 
      rotate(${props?.image?.frame?.properties?.transform?.rotate}) 
      matrix3d(${props?.image?.frame?.properties?.transform?.matrix3d})`,
            zIndex: props.image.zIndex,
            boxShadow: !!props.image.boxShadow ? props.image.boxShadow : 'none',
          }}
          src={props.image.src}
          alt="img"
        />
      ) : null}
    </div>
  );
};
export default withRouter(FrameElement);
