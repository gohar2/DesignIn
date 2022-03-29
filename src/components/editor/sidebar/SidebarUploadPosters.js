import React, { useContext } from 'react';
import './SidebarPoster.css';
import DraggableImage from './DraggableImage';
import DraggableUploadedImage from './DraggableUploadedImage';
import Context from '../../store/store';
import { createFrame } from '../../../utils/index';
import LazyLoad from 'react-lazyload';

const SidebarUploadPosters = (props) => {
  const [state, dispatch] = useContext(Context);

  const onClickImage = (e, imageUrl) => {
    if (props.isTemplate) {
      let clickedel = props.images.filter((el) => {
        return el.id + '' === e.currentTarget.id;
      })[0];
      clickedel.json.page.pageId = state.selectedPage.pageId;
      clickedel.json.page.newTemplate = true;
      clickedel.json.page.elements = clickedel.json.page.elements.map(
        (el, ind) => {
          el.id = el.id.replace(/[0-9*]/, state.selectedPage.pageId);
          if (el.type === 'text') {
            let fs = el.fontSize + 'px';
            el.fontSize = fs;
          }
          return el;
        },
      );
      if (props.images) {
        // dispatch({
        //   type: 'SET_NEW_TEMPLATE',
        //   payload: clickedel.json.page,
        // });
        dispatch({
          type: 'SET_SELECTED_PAGE',
          payload: clickedel.json.page,
        });
      }
      // dispatch({type:'SET_SELECTED_FRAME',payload:})
      // dispatch({
      //   type: 'STORE_ELEMENT',
      //   payload: props.images[0].json.page.elements[0],
      // });
    } else if (e.target.tagName === 'IMG') {
      const left = `${state.pageWidth / 2 - e.target.clientWidth / 2}px`;
      const top = `${state.pageHeight / 2 - e.target.clientWidth / 2}px`;
      dispatch({
        type: 'STORE_ELEMENT',
        payload: {
          type: 'img',
          src: imageUrl,
          grid: false,
          frame: createFrame(
            `${e.target.clientWidth}px`,
            `${e.target.clientHeight}px`,
            top,
            left,
          ),
          opacity: 1,
          brightness: 100,
          contrast: 100,
          saturate: 100,
          blur: 0,
          padding: 0,
          isflipX: false,
          isflipY: false,
          lock: false,
          originalWidth: `${e.target.clientWidth}`,
          originalHeight: `${e.target.clientHeight}`,
          lastFrameWidth: `${e.target.clientWidth}`,
          lastFrameHeight: `${e.target.clientHeight}`,
          lastImageWidth: `${e.target.clientWidth}`,
          lastImageHeight: `${e.target.clientHeight}`,
          width: `${e.target.clientWidth}`,
          height: `${e.target.clientHeight}`,
        },
      });
    } else if (e.target.tagName === 'TEXT') {
      dispatch({
        type: 'STORE_ELEMENT',
        payload: {
          type: 'text',
          text: e.currentTarget.textContent,
          textArray: [],
          frame: createFrame(
            `${e.currentTarget.clientWidth}px`,
            `${e.currentTarget.clientHeight}px`,
          ),
          isBold: false,
          isItalic: false,
          isUnderline: false,
          isUppercase: false,
          isAlignTop: false,
          isAlignBottom: false,
          isAlignCenter: false,
          isColorPicker: false,
          fontSize: 18,
          fontFamily: 'open sans',
          lineHeight: 1,
          letterSpacing: 1,
          color: '#111111',
          textAlign: state.alignment.types[state.alignment.indexNo],
          list: 0,
          opacity: 1,
        },
      });
    }
    dispatch({
      type: 'SAVE_HISTORY',
    });
  };
  const Spinner = () => (
    <div className="post loading">
      <svg
        width="80"
        height="80"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#49d1e0"
          strokeWidth="10"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
          transform="rotate(275.845 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
  return (
    <div className={props.uploaded ? '' : 'sidebarContentPicsContainerDiv'}>
      <div className={props.uploaded ? '' : 'sidebarContentPicsDiv'}>
        {props.images.map((images, index) => {
          return (
            <span
              onClick={(e) => {
                onClickImage(e, images.default_url);
              }}
              key={index}
              id={images.id}
            >
              {props.uploaded ? (
                <LazyLoad
                  key={images.id}
                  placeholder={<Spinner />}
                  overflow={true}
                  debounce={true}
                >
                  <DraggableUploadedImage
                    image={{ src: images }}
                    imageId={props.imageId}
                    imageOptions={props.imageOptions}
                    defaultUrl={{ src: images }}
                  />
                </LazyLoad>
              ) : (
                <DraggableImage
                  image={{ src: images.url }}
                  defaultUrl={{ src: images.default_url }}
                />
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarUploadPosters;
