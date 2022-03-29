/* eslint-disable no-loop-func */
export function dragElement(elmnt, callback_dispatch, movebyheader) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  let rotation;
  if (!movebyheader) {
    elmnt.onmousedown = dragMouseDown;
  } else if (document.getElementById(elmnt.id + 'header')) {
    document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    rotation = getElementDimensions(elmnt).rot;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  const elementDrag = (e) => {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    let { tx, ty } = getElementDimensions(elmnt);

    elmnt.style.transform = `scaleX(1) scaleY(1) translateX(${
      tx - pos1
    }px) translateY(${ty - pos2}px) rotate(${rotation}deg)`;
  };

  const closeDragElement = (e) => {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    let { tx, ty } = getElementDimensions(elmnt);
    let text = document.getElementById(elmnt.id.split('t')[0]);
    if (callback_dispatch)
      callback_dispatch(
        e,
        elmnt.id.split('t')[0],
        text.offsetWidth.toFixed(4),
        text.offsetHeight.toFixed(4),
        tx.toFixed(4),
        ty.toFixed(4),
        text.style.fontSize,
        rotation,
      );
  };
}
export function makeResizableDiv(
  div,
  // framePrpos,
  callback_dispatch,
  setBoundingXY,
  // bounds,  //Shaheer code-refactoring-removing-unused-variables
) {
  const element = document.querySelector(div);

  const resizers = document.querySelectorAll(div + ' .resizer');

  // const minimum_size = 10; //Shaheer code-refactoring-removing-unused-variables
  let original_width = 0;
  let original_height = 0;
  // let original_x = 0; //Shaheer code-refactoring-removing-unused-variables
  // let original_y = 0; //Shaheer code-refactoring-removing-unused-variables
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  // let prevx = 0; //Shaheer code-refactoring-removing-unused-variables
  // let prevy = 0; //Shaheer code-refactoring-removing-unused-variables
  let prevw = 0;
  // let prevh = 0; //Shaheer code-refactoring-removing-unused-variables
  // let currentWidth = 0; //Shaheer code-refactoring-removing-unused-variables
  // let currentHeight = 0; //Shaheer code-refactoring-removing-unused-variables
  // let initialHeight = 0; //Shaheer code-refactoring-removing-unused-variables
  // let initialY = 0; //Shaheer code-refactoring-removing-unused-variables
  let el_transform = null;
  let click = '';
  for (let i = 0; i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function (e) {
      e.preventDefault();
      original_width = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue('width')
          .replace('px', ''),
      );
      original_height = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue('height')
          .replace('px', ''),
      );
      el_transform = getElementDimensions(element);
      original_x = el_transform.tx.toFixed(4);
      original_y = el_transform.ty.toFixed(4);
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      prevx = e.pageX;
      prevy = e.pageY;
      prevw = element.offsetWidth;
      prevh = element.offsetHeight;
      currentWidth = element.offsetWidth;
      currentHeight = element.offsetHeight;
      initialHeight = element.offsetHeight;
      initialY = element;

      window.addEventListener('mousemove', resize);

      window.addEventListener('mouseup', stopResize);
    });

    function resize(e) {
      document.getElementById(`${element.id}rot`).style.display = 'none';
      document.getElementById(`${element.id}header`).style.display = 'none';
      document
        .querySelectorAll(`.${element.id.split('t')[0]}resizable .resizer`)
        .forEach((el) => {
          el.style.display = 'none';
        });
      element.style.border = '0px';
      element.style.width = element.offsetWidth.toFixed(4) + 'px';
      element.style.height = element.offsetHeight.toFixed(4) + 'px';
      let text = document.getElementById(element.id.split('t')[0]);
      // text.style.border = '1px solid #00d9e0';

      if (currentResizer.classList.contains('right')) {
        click = 'Right';
        const width = original_width + (e.pageX - original_mouse_x);
        // let diff = prevw - width; //Shaheer code-refactoring-removing-unused-variables
        prevw = width;

        let { tx, ty, rot } = getElementDimensions(element);

        element.style.transform = `scaleX(1) scaleY(1) translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg)`;

        element.style.width = width.toFixed(4) + 'px';

        let article = document.getElementById(element.id.split('t')[0]);
        article.style.width = width.toFixed(4) + 'px';
      } else if (currentResizer.classList.contains('left')) {
        click = 'Left';
        const width = original_width - (e.pageX - original_mouse_x);
        element.style.width = width.toFixed(4) + 'px';
        let article = document.getElementById(element.id.split('t')[0]);
        article.style.width = element.style.width;
        let { tx, ty, rot } = getElementDimensions(element);
        tx = el_transform.tx + (el_transform.width - element.offsetWidth);
        element.style.transform = `scaleX(1) scaleY(1) translateX(${tx.toFixed(
          4,
        )}px) translateY(${ty.toFixed(4)}px) rotate(${rot}deg)`;
      } else if (currentResizer.classList.contains('bottom-right')) {
        click = 'BottomRight';
        const width = original_width + (e.pageX - original_mouse_x);
        // const height = original_height + (e.pageY - original_mouse_y);  //Shaheer code-refactoring-removing-unused-variables

        let { tx, ty, rot } = getElementDimensions(element);
        const diff = width - prevw;
        element.style.transform = `scaleX(1) scaleY(1) translateX(${tx.toFixed(
          4,
        )}px) translateY(${ty.toFixed(4)}px) rotate(${rot}deg)`;
        element.style.height =
          (element.offsetHeight + diff * 0.1934).toFixed(4) + 'px';
        element.style.width = width + 'px';
        let ps = parseFloat(
          text.style.transform.split('scaleX(')[1].split(')')[0],
        );
        text.style.transformOrigin = 'left top';
        text.style.transform = `scaleX(${(ps + diff * 0.0025).toFixed(
          4,
        )}) scaleY(${(ps + diff * 0.0025).toFixed(4)})`;

        prevx = e.pageX;
        prevy = e.pageY;
        prevw = width;
      } else if (currentResizer.classList.contains('bottom-left')) {
        // const height = original_height + (e.pageY - original_mouse_y);  //Shaheer code-refactoring-removing-unused-variables
        const width = original_width - (e.pageX - original_mouse_x);

        click = 'BottomLeft';

        let { tx, ty, rot } = getElementDimensions(element);
        const diff = width - prevw;

        element.style.transform = `scaleX(1) scaleY(1) translateX(${tx.toFixed(
          4,
        )}px) translateY(${ty.toFixed(4)}px) rotate(${rot}deg)`;
        element.style.height =
          element.offsetHeight + diff * (0.1111).toFixed(4) + 'px';
        element.style.width = width.toFixed(4) + 'px';
        let ps = parseFloat(
          text.style.transform.split('scaleX(')[1].split(')')[0],
        );
        text.style.transformOrigin = 'right top';
        text.style.transform = `scaleX(${
          ps + diff * (0.0022).toFixed(4)
        }) scaleY(${(ps + diff * 0.0022).toFixed(4)})`;

        prevx = e.pageX;
        prevy = e.pageY;
        prevw = width;
      } else if (currentResizer.classList.contains('top-right')) {
        const width = original_width + (e.pageX - original_mouse_x);
        // const height = original_height - (e.pageY - original_mouse_y); //Shaheer code-refactoring-removing-unused-variables
        click = 'TopRight';

        let { tx, ty, rot } = getElementDimensions(element);
        const diff = width - prevw;

        element.style.transform = `scaleX(1) scaleY(1) translateX(${tx.toFixed(
          4,
        )}px) translateY(${ty.toFixed(4)}px) rotate(${rot}deg)`;
        element.style.width = width + 'px';
        let ps = parseFloat(
          text.style.transform.split('scaleX(')[1].split(')')[0],
        );
        text.style.transformOrigin = 'left bottom';
        text.style.transform = `scaleX(${(ps + diff * 0.0025).toFixed(
          4,
        )}) scaleY(${(ps + diff * 0.0025).toFixed(4)})`;

        prevx = e.pageX;
        prevy = e.pageY;
        prevw = width;
      } else {
        const width = original_width - (e.pageX - original_mouse_x);
        // const height = original_height - (e.pageY - original_mouse_y);  //Shaheer code-refactoring-removing-unused-variables

        click = 'TopLeft';

        let { tx, ty, rot } = getElementDimensions(element);
        const diff = width - prevw;

        element.style.transform = `scaleX(1) scaleY(1) translateX(${tx.toFixed(
          4,
        )}px) translateY(${ty.toFixed(4)}px) rotate(${rot}deg)`;
        element.style.height =
          (element.offsetHeight + diff * 0.1111).toFixed(4) + 'px';
        element.style.width = width.toFixed(4) + 'px';
        let ps = parseFloat(
          text.style.transform.split('scaleX(')[1].split(')')[0],
        );
        text.style.transformOrigin = 'right bottom';
        text.style.transform = `scaleX(${(ps + diff * 0.0022).toFixed(
          4,
        )}) scaleY(${(ps + diff * 0.0022).toFixed(4)})`;

        prevx = e.pageX;
        prevy = e.pageY;
        prevw = width;
      }
    }

    function stopResize(e) {
      let text = document.getElementById(element.id.split('t')[0]);
      text.style.height = 'auto';
      text.style.width = text.getBoundingClientRect().width.toFixed(4) + 'px';

      const fMul = parseFloat(
        text.style.transform.split('scaleX(')[1].split(')')[0],
      );
      text.style.fontSize =
        parseFloat(text.style.fontSize.split('px')[0] * fMul).toFixed(4) + 'px';
      text.style.transform = `scaleX(${1}) scaleY(${1})`;
      let { tx, ty, rot } = getElementDimensions(element);
      if (click === 'TopRight') {
        ty =
          el_transform.ty +
          (el_transform.height - text.getBoundingClientRect().height);
      } else if (click === 'TopLeft') {
        ty =
          el_transform.ty +
          (el_transform.height - text.getBoundingClientRect().height);
        tx =
          el_transform.tx +
          (el_transform.width - text.getBoundingClientRect().width);
      } else if (click === 'BottomLeft') {
        tx =
          el_transform.tx +
          (el_transform.width - text.getBoundingClientRect().width);
      } else if (click === 'Right') {
      }
      if (callback_dispatch) {
        callback_dispatch(
          e,
          element.id.split('t')[0],
          text.offsetWidth.toFixed(4),
          text.offsetHeight.toFixed(4),
          tx.toFixed(4),
          ty.toFixed(4),
          text.style.fontSize,
          el_transform.rot,
        );
      }
      document
        .querySelectorAll(`.${element.id.split('t')[0]}resizable .resizer`)
        .forEach((el) => {
          el.style.display = 'block';
        });
      document.getElementById(`${element.id}rot`).style.display = 'block';
      document.getElementById(`${element.id}header`).style.display = 'block';
      setBoundingXY(
        element.id.split('t')[0],
        element.getBoundingClientRect().x,
        element.getBoundingClientRect().y,
        rot,
      );
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResize);
    }
  }
}
export const getBoundingClientRectDimensions = (el) => {
  let ntop = (
    el.getBoundingClientRect().x -
    el.getBoundingClientRect().width / 2
  ).toFixed(4);
  let nleft = (
    el.getBoundingClientRect().y -
    el.getBoundingClientRect().height / 2
  ).toFixed(4);
  ntop = parseFloat(ntop);
  nleft = parseFloat(nleft);
  return { ntop, nleft };
};
export const getElementDimensions = (el) => {
  let transform = el.style.transform.split(' ');
  let sx, sy, tx, ty, width, height, rot;
  if (transform.length > 1) {
    rot = parseFloat(transform[4].split('rotate(')[1].split('deg')[0]);
    sx = parseFloat(transform[0].split('(')[1].split(')')[0]);
    sy = parseFloat(transform[1].split('(')[1].split(')')[0]);
    tx = parseFloat(transform[2].split('(')[1].split(')')[0].split('px')[0]);
    ty = parseFloat(transform[3].split('(')[1].split(')')[0].split('px')[0]);

    height = el.getBoundingClientRect().height;
    width = el.getBoundingClientRect().width;
    return { sx, sy, tx, ty, height, width, rot };
  } else {
    sx = null;
    sy = null;
    tx = null;
    ty = null;
    height = null;
    width = null;
    rot = null;
    return { sx, sy, tx, ty, height, width, rot };
  }
};
