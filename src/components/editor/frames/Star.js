import React, { useContext } from 'react';
import Context from '../../store/store';
import FrameElement from './FrameElement';
import { createFrame } from '../../../utils/index';
//star
const Star = (props) => {
  const [state, dispatch] = useContext(Context);

  const drop = (id, src, height, width) => {
    dispatch({
      type: 'SET_BCK_IMG_FRAME',
      payload: {
        height: height,
        width: width,
        name: props.name,
        id: props.id,
        src: src,
        frame: createFrame(`350px`, `auto`),
      },
    });
  };
  return (
    <div
      style={{
        height: state.frames[props.name].height,
        width: state.frames[props.name].width,
        overflow: 'hidden',
        left: props.frame.properties.left,
        top: props.frame.properties.top,
        clipPath:
          'polygon(50% 0%, 61% 35%, 100% 35%, 68% 57%, 79% 100%, 50% 72%, 21% 100%, 32% 57%, 0% 35%, 39% 35%)',
        transform: `
      translate(${props.frame.properties.translate[0]}px, ${
          props.frame.properties.translate[1]
        }px)
      scaleX(${props.frame.properties.scale[0]}) 
      scaleY(${props.frame.properties.scale[1]})          
      rotate(${
        props.frame && props.frame.properties.transform.rotate
      }) matrix3d(${props.frame && props.frame.properties.transform.matrix3d})`,
        zIndex: props.zIndex,
      }}
      id={props.id}
      className="moveable"
      onClick={props.onClick}
    >
      {state.frames[props.name].images.map((image) => {
        return (
          <FrameElement
            image={image}
            moveableId={props.id}
            frameName={props.name}
            droppedImage={drop}
            frame={props.frame}
            className={state.doubleClick ? image.moveableClassName : ''}
          ></FrameElement>
        );
      })}
    </div>
  );
};
export default Star;
