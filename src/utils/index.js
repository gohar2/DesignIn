import { Frame } from 'scenejs';
import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import parse from 'html-react-parser';

export const converttolist = (txt, type, el) => {
  let dom = document.getElementById(el.id);
  txt = dom.innerText;

  if (type !== 0) {
    let tar = txt.split('\n');
    let tar2 = [];
    tar.forEach((el) => {
      let temp = `<li>${el}</li>`;
      tar2.push(temp);
    });

    if (type === 1) {
      txt = `<ul>${tar2.join('')}</ul>`;
    } else if (type === 2) {
      txt = `<ol>${tar2.join('')}</ol>`;
    }
  } else if (type === 0) {
    let tar = txt.split('\n');
    let tar2 = [];
    tar.forEach((el) => {
      let temp = `<div>${el}</div>`;
      tar2.push(temp);
    });
    txt = tar2.join('');
  }
  return txt;
};
export function getText(n) {
  var rv = '';
  if (n.nodeType == 3) {
    rv = `${n.nodeValue}`;
  } else {
    for (var i = 0; i < n.childNodes.length; i++) {
      rv += getText(n.childNodes[i]);
    }
    var d = getComputedStyle(n).getPropertyValue('display');
    if (d.match(/^block/) || d.match(/list/) || n.tagName == 'BR') {
      rv += '\n';
    }
  }
  // rv = rv.replaceAll(/<div><\/div>/g,'');
  // rv = rv.replaceAll(/<span/g,'');
  return rv;
}
export const resetText = (text, elId) => {
  let parse = new DOMParser();
  let textHtml = parse.parseFromString(text, 'text/html');
  let textNodes = [...textHtml.body.childNodes];
  let isList = false;
  if (textHtml.body.childNodes[0]?.nodeName.match(/UL|OL/)) {
    isList = true;
    textNodes = [...textHtml.body.childNodes[0].childNodes];
  }
  let newTextHtml = textNodes.map((el) => {
    return `<div>${
      el.textContent.length > 0
        ? el.textContent
        : el.children[0]?.nodeName === 'BR'
        ? '<br>'
        : ''
    }</div>`;
  });

  let newText = newTextHtml.join('');
  if (!isList) return newText;
  else return text;
};
export const addLineHeight = (e, elem) => {
  let domel = document.getElementById(elem.id);
  if (domel) {
    if (elem.list === 0) {
      let childs = domel.children;
      if (childs.length > 1) {
        for (let i = 0; i < childs.length; i++)
          childs[i].style = `line-height:${1}; margin-bottom:${
            elem.lineHeight > 1 ? elem.lineHeight / 2 : 0
          }rem`;
      }
      domel.lastChild.style = `line-height:${1}; margin-bottom:${0}rem`;
    } else {
    }
  }
};
export const highestElementid = (pages, selectedPage) => {
  if (pages[selectedPage.pageId].elements.length > 0) {
    let idElArr = [];
    pages[selectedPage.pageId].elements.forEach((el) =>
      idElArr.push(parseInt(el.id.substring(13))),
    );
    return Math.max(...idElArr) + 1;
  } else return 0;
};
export const convertStringtolist = (txt, element) => {
  let txtArray = txt.split('\n\n');
  let newText = '';
  if (element.list !== 0) {
    txtArray.forEach((el) => (newText = newText + `<div>${el}</div>`));
    //  newText = newText.replaceAll(/<div><\/div>/g,'')
  } else {
    let marginTop = element.lineHeight / 2;
    if (element.lineHeight <= 1) marginTop = 0;

    txtArray.forEach((el, index) => {
      if (txtArray.length === 1)
        newText =
          newText +
          `<div style="line-height:${1};margin-top:-${0}rem;margin-bottom:${0}rem;">${el}</div>`;
      else if (index === 0)
        newText =
          newText +
          `<div style="line-height:${1};margin-top:-${0}rem; margin-bottom:${marginTop}rem;">${el}</div>`;
      else if (index === txtArray.length - 1)
        newText =
          newText +
          `<div style="line-height:${1};margin-top:${0}rem; margin-bottom:${0}rem;">${el}</div>`;
      else
        newText =
          newText +
          `<div style="line-height:${1}; margin-top:${0}rem; margin-bottom:${marginTop}rem;">${el}</div>`;
    });
    // newText = newText.replaceAll(/<div style="line-height:[0-9][.]*[0-9]*;margin-top:-[0-9][.]*[0-9]*rem;"><\/div>/g,'')
  }
  //  newText = newText+'<div></div>'
  return newText;
};
export const formatText = (el) => {
  return el.list !== 0
    ? converttolist(
        convertStringtolist(getText(document.getElementById(el.id)), el),
        el.list,
        el.lineHeight,
      )
    : convertStringtolist(getText(document.getElementById(el.id)), el);
};
export const setDimensionsOfEditorContainer = (type, userState, state) => {
  if (document.getElementById('ec0')) {
    let editorcontainer = document
      .getElementById('ec0')
      .getBoundingClientRect();

    let width =
      type === 'Template'
        ? userState.pageWidth * state.pages[0].scaleX + 100 >
          editorcontainer.width
          ? userState.pageWidth * state.pages[0].scaleX + 100
          : editorcontainer.width
        : state.pageWidth * state.pages[0].scaleX + 100 > editorcontainer.width
        ? state.pageWidth * state.pages[0].scaleX + 100
        : editorcontainer.width;
    let height =
      type === 'Template'
        ? userState.pageHeight * state.pages[0].scaleY + 100 >
          editorcontainer.height
          ? userState.pageHeight * state.pages[0].scaleY + 100
          : editorcontainer.height
        : state.pageHeight * state.pages[0].scaleY + 100 >
          editorcontainer.height
        ? state.pageHeight * state.pages[0].scaleY + 100
        : editorcontainer.height;
    return [width, height];
  } else return [500, 500];
};
export const createFrame = (width, height, top, left) => {
  const frame = new Frame({
    width: width,
    height: 'auto',
    left: left ? left : '0px',
    top: top ? top : '0px',
    transform: {
      rotate: '0deg',
      scaleX: 1,
      scaleY: 1,
      matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    },
    translate: [0, 0],
    scale: [setScaleOfNewElement(width), setScaleOfNewElement(width)],
  });
  return frame;
};
export const setScaleOfNewElement = (w) => {
  let width = document.getElementById('page0').offsetWidth;
  let height = document.getElementById('page0').offsetHeight;

  let svg_width = width / 2;
  if (width > height) svg_width = height / 2;
  let scale = svg_width / parseFloat(w.split('px')[0]);
  if (scale > 5) return 5;

  return scale;
};
export const setDimensionsOfSVG = (svg) => {
  let SVG = parse(svg);
  let width = parseFloat(SVG.props.viewBox.split(' ')[2]);
  let height = parseFloat(SVG.props.viewBox.split(' ')[3]);

  return [width + 'px', height + 'px'];
};
export const setStylesOnSVG = (svg, scaleY, scaleX) => {
  let split = svg.split('<svg');
  let widthHeight = setDimensionsOfSVG(svg);
  split[0] = `<svg style="float:left;position: relative; width: ${
    widthHeight[0]
  };height: ${widthHeight[1]};left: 50%;transform: translateX(-50%) scaleX(${
    scaleX ? -1 : 1
  }) scaleY(${scaleY ? -1 : 1});"`;
  let SVG = split.join();

  return SVG;
};
export const removeTextFrame = () => {
  for (
    var index = 0;
    index < document.getElementsByClassName('marker').length;
    ++index
  ) {
    document.getElementsByClassName('marker')[index].style.display = 'none';
  }
  for (
    var index = 0;
    index < document.getElementsByClassName('resizable').length;
    ++index
  ) {
    document.getElementsByClassName('resizable')[index].style.border = '0px';
  }
  if (document.getElementsByClassName('moveable inputText')) {
    for (
      var index = 0;
      index < document.getElementsByClassName('moveable inputText').length;
      ++index
    ) {
      document.getElementsByClassName('moveable inputText')[
        index
      ].style.border = '0px';
    }
  }
  for (
    var index = 0;
    index < document.getElementsByClassName('resizer').length;
    ++index
  ) {
    document.getElementsByClassName('resizer')[index].style.display = 'none';
  }
  for (
    var index = 0;
    index < document.getElementsByClassName('mydivheader').length;
    ++index
  ) {
    document.getElementsByClassName('mydivheader')[index].style.display =
      'none';
  }
  // if (document.getElementsByClassName('selectedPage')[0]) {
  //   document.getElementsByClassName('selectedPage')[0].style.border = '0px';
  // }
};

export const setImageWidthHeight = (
  origialWidth,
  originalHeight,
  frameWidth,
  frameHeight,
  lastFrameWidth,
  lastFrameHeight,
  lastImageWidth,
  lastImageHeight,
) => {
  origialWidth = parseInt(origialWidth);
  originalHeight = parseInt(originalHeight);
  frameWidth = parseInt(frameWidth);
  frameHeight = parseInt(frameHeight);
  lastFrameWidth = parseInt(lastFrameWidth);
  lastFrameHeight = parseInt(lastFrameHeight);
  lastImageWidth = parseInt(lastImageWidth);
  lastImageHeight = parseInt(lastImageHeight);

  // For Landscape images
  if (getImageAspectRatio(origialWidth, originalHeight) > 1) {
    if (lastFrameWidth === frameWidth) {
      if (frameHeight > lastFrameHeight) {
        return landscapeImageHeightMaximizeOnly(
          origialWidth,
          originalHeight,
          frameHeight,
          lastImageWidth,
          lastImageHeight,
          lastFrameWidth,
        );
      } else {
        return landscapeImageHeightMinimizeOnly(
          lastImageWidth,
          lastImageHeight,
          frameHeight,
          lastFrameWidth,
        );
      }
    } else {
      if (frameWidth < lastImageWidth && frameHeight === lastFrameHeight) {
        return landscapeImageWidthMinimizeOnly(
          lastImageWidth,
          lastImageHeight,
          frameWidth,
          lastFrameHeight,
        );
      } else {
        return landscapeImageDiagonally(
          origialWidth,
          originalHeight,
          frameWidth,
        );
      }
    }
  } // For Portrait / Square Images
  else {
    if (lastFrameHeight === frameHeight) {
      if (frameWidth > lastFrameWidth) {
        return portraitImageWidthMaximizeOnly(
          origialWidth,
          originalHeight,
          frameWidth,
          lastImageWidth,
          lastImageHeight,
          lastFrameHeight,
        );
      } else {
        return portraitImageWidthMinimizeOnly(
          lastImageWidth,
          lastImageHeight,
          frameWidth,
          lastFrameHeight,
        );
      }
    } else {
      if (frameHeight < lastImageHeight && frameWidth === lastFrameWidth) {
        return portraitImageHeightMinimizeOnly(
          lastImageWidth,
          lastImageHeight,
          lastFrameWidth,
          frameHeight,
        );
      } else {
        return portraitImageDiagonally(
          origialWidth,
          originalHeight,
          frameHeight,
        );
      }
    }
  }
};

export const getImageAspectRatio = (width, height) => {
  const parsedWidth = parseInt(width);
  const parsedHeight = parseInt(height);

  return parsedWidth / parsedHeight;
};

const landscapeImageDiagonally = (origialWidth, originalHeight, frameWidth) => {
  const calculatedHeight = landspaceImageHeight(
    origialWidth,
    originalHeight,
    frameWidth,
  );
  return {
    W: frameWidth,
    H: calculatedHeight,
    FW: frameWidth,
    FH: calculatedHeight,
    LFW: frameWidth,
    LFH: calculatedHeight,
    LIW: frameWidth,
    LIH: calculatedHeight,
  };
};

const landscapeImageWidthMinimizeOnly = (
  lastImageWidth,
  lastImageHeight,
  frameWidth,
  lastFrameHeight,
) => {
  return {
    W: lastImageWidth,
    H: lastImageHeight,
    FW: frameWidth,
    FH: lastFrameHeight,
    LFW: frameWidth,
    LFH: lastFrameHeight,
    LIW: lastImageWidth,
    LIH: lastImageHeight,
  };
};

const landscapeImageHeightMaximizeOnly = (
  origialWidth,
  originalHeight,
  frameHeight,
  lastImageWidth,
  lastImageHeight,
  lastFrameWidth,
) => {
  const calculatedWidth = landscapeImageWidth(
    origialWidth,
    originalHeight,
    frameHeight,
  );
  return {
    W: frameHeight <= lastImageHeight ? lastImageWidth : calculatedWidth,
    H: frameHeight <= lastImageHeight ? lastImageHeight : frameHeight,
    FW: lastFrameWidth,
    FH: frameHeight,
    LFW: lastFrameWidth,
    LFH: frameHeight,
    LIW: frameHeight <= lastImageHeight ? lastImageWidth : calculatedWidth,
    LIH: frameHeight <= lastImageHeight ? lastImageHeight : frameHeight,
  };
};

const landscapeImageHeightMinimizeOnly = (
  lastImageWidth,
  lastImageHeight,
  frameHeight,
  lastFrameWidth,
) => {
  return {
    W: lastImageWidth,
    H: lastImageHeight,
    FW: lastFrameWidth,
    FH: frameHeight,
    LFW: lastFrameWidth,
    LFH: frameHeight,
    LIW: lastImageWidth,
    LIH: lastImageHeight,
  };
};

const landspaceImageHeight = (origialWidth, originalHeight, frameWidth) => {
  return (
    originalHeight +
    (frameWidth - origialWidth) * (originalHeight / origialWidth)
  );
};

const landscapeImageWidth = (origialWidth, originalHeight, frameHeight) => {
  return (
    origialWidth +
    (frameHeight - originalHeight) * (origialWidth / originalHeight)
  );
};

const portraitImageWidthMaximizeOnly = (
  origialWidth,
  originalHeight,
  frameWidth,
  lastImageWidth,
  lastImageHeight,
  lastFrameHeight,
) => {
  const calculatedHeight = portraitImageHeight(
    origialWidth,
    originalHeight,
    frameWidth,
  );
  return {
    W: frameWidth <= lastImageWidth ? lastImageWidth : frameWidth,
    H: frameWidth <= lastImageWidth ? lastImageHeight : calculatedHeight,
    FW: frameWidth,
    FH: lastFrameHeight,
    LFW: frameWidth,
    LFH: lastFrameHeight,
    LIW: frameWidth <= lastImageWidth ? lastImageWidth : frameWidth,
    LIH: frameWidth <= lastImageWidth ? lastImageHeight : calculatedHeight,
  };
};

const portraitImageWidthMinimizeOnly = (
  lastImageWidth,
  lastImageHeight,
  frameWidth,
  lastFrameHeight,
) => {
  return {
    W: lastImageWidth,
    H: lastImageHeight,
    FW: frameWidth,
    FH: lastFrameHeight,
    LFW: frameWidth,
    LFH: lastFrameHeight,
    LIW: lastImageWidth,
    LIH: lastImageHeight,
  };
};

const portraitImageDiagonally = (origialWidth, originalHeight, frameHeight) => {
  const calculatedWidth = portraitImageWidth(
    origialWidth,
    originalHeight,
    frameHeight,
  );
  return {
    W: calculatedWidth,
    H: frameHeight,
    FW: calculatedWidth,
    FH: frameHeight,
    LFW: calculatedWidth,
    LFH: frameHeight,
    LIW: calculatedWidth,
    LIH: frameHeight,
  };
};

const portraitImageHeightMinimizeOnly = (
  lastImageWidth,
  lastImageHeight,
  lastFrameWidth,
  frameHeight,
) => {
  return {
    W: lastImageWidth,
    H: lastImageHeight,
    FW: lastFrameWidth,
    FH: frameHeight,
    LFW: lastFrameWidth,
    LFH: frameHeight,
    LIW: lastImageWidth,
    LIH: lastImageHeight,
  };
};

const portraitImageHeight = (origialWidth, originalHeight, frameWidth) => {
  return (
    originalHeight +
    (frameWidth - origialWidth) * (originalHeight / origialWidth)
  );
};

const portraitImageWidth = (origialWidth, originalHeight, frameHeight) => {
  return (
    origialWidth +
    (frameHeight - originalHeight) * (origialWidth / originalHeight)
  );
};
export const Spinner = () => (
  <div className="post loading">
    <svg
      className="loader-svg"
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
export const showloopofskeleton = (n) => {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(
      <div className="imagesDiv">
        <SkeletonTheme color="#202020" highlightColor="#444">
          <p>
            <Skeleton height={150} count={1} />
          </p>
        </SkeletonTheme>
      </div>,
    );
  }
  return arr;
};
export const checkTextElementsLength = (pages, selectedPage) => {
  let count = 0;
  let textElements = pages[selectedPage.pageId].elements;
  textElements.forEach((telement) => {
    if (telement.type === 'text') {
      if (count === 9) {
        count = 0;
      } else count = count + 1;
    }
  });
  return count;
};
