import React, { useContext } from 'react';
import Context from '../../store/store';
import GridElement from './GridElement';
import { createFrame } from '../../../utils/index';

const FullPageGrid = (props) => {
  const [state, dispatch] = useContext(Context);

  const drop = (id, src) => {
    dispatch({
      type: 'SET_BCK_IMG',
      payload: {
        name: props.name,
        id: id,
        src: src,
        frame: createFrame(`${state.pageWidth}`, `auto`),
      },
    });
  };

  return (
    <div
      style={{
        height: state.pageHeight,
        width: state.pageWidth,
        overflow: 'hidden',
        left: `${props.left}`,
        top: `${props.top}`,
      }}
      id={props.id}
      className={props.className}
      onClick={props.onClick}
    >
      {state.grids[props.name].images.map((image) => {
        return (
          <GridElement
            image={image}
            moveableId={image.moveableId}
            gridName={props.name}
            droppedImage={drop}
            frame={props.frame}
          ></GridElement>
        );
      })}
    </div>
  );
};
export default FullPageGrid;
