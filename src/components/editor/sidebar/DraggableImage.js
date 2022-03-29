import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';
// import Context from '../../store/store'; Shaheer code-refactoring-removing-unused-variables
// import { createFrame } from '../../../utils/index'; Shaheer code-refactoring-removing-unused-variables
import {
  // unsplashSearchUrl, Shaheer code-refactoring-removing-unused-variables
  triggerUnsplashDownload,
  // getSelectedIcon, Shaheer code-refactoring-removing-unused-variables
} from '../../../api/constants';
import API from '../../../api/Api';
import Context from '../../store/store';

const DraggableImage = (props) => {
  const [state, dispatch] = useContext(Context);

  let svgContent = {};
  if (props.type === 'svg') {
    svgContent['isSVG'] = true;
    svgContent['description'] = props.description;
  }
  if (!!props.colors) {
    svgContent['colors'] = props.colors;
  }
  const [{ opacity }, drag] = useDrag({
    item: {
      selectedIconDetail: props.selectedIconDetail
        ? props.selectedIconDetail
        : null,
      iconId: props.iconId,
      type: 'IMG',
      element: { src: props.image.defaultUrl },
      BackgroundImage: props.defaultImage ? props.defaultImage : '',
      templateUrl: props.templateUrl ? props.templateUrl : '',
      height: props.image.height,
      width: props.image.width,
      left: 967,
      top: 299,
      id: props.type ? props.type + ' ' + props.id : props.id,
      sub_category_id: props.sub_category_id,
      mode: props.type,
      ...svgContent,
    },
    begin: (component) => {
      if (props.image.id && props.image.isPhotos) {
        API.get(
          `${process.env.REACT_APP_BASE_URL}${triggerUnsplashDownload(
            props.image.id,
          )}`,
        );
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  return (
    <>
      {props.image.src ? (
        <img
          ref={drag}
          style={{
            opacity,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
          }}
          className="sidebarContentFirstImage"
          alt="IMG"
          src={props.image.src}
          id={props.isFrame ? `${props.type} ${props.id}` : props.id}
        />
      ) : (
        <h1 ref={drag} className="sidebarContentSecondImage">
          {props.image.text}
        </h1>
      )}
    </>
  );
};

export default DraggableImage;
