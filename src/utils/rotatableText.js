import { getElementDimensions } from './moveableText.js';

export function rotateMe(el, callback_dispatch) {
  el = document.getElementById(el);
  var init,
    rotate,
    start,
    stop,
    active = false,
    angle = 0,
    rotation = 0,
    startAngle = 0,
    center = {
      x: 0,
      y: 0,
    },
    R2D = 180 / Math.PI,
    rot = document.getElementById(el.id),
    rotb = document.getElementById(`${el.id}rot`),
    init = () => {
      rotb.addEventListener('mousedown', start, false);
    };

  start = (e) => {
    e.preventDefault();
    var bb = el.getBoundingClientRect(),
      t = bb.top,
      l = bb.left,
      h = bb.height,
      w = bb.width,
      x,
      y;
    center = {
      x: l + w / 2,
      y: t + h / 2,
    };
    x = e.clientX - center.x;
    y = e.clientY - center.y;
    startAngle = R2D * Math.atan2(y, x);

    document.addEventListener('mousemove', onmousemiving);
    document.addEventListener('mouseup', onmouseup);
    return (active = true);
  };
  const onmousemiving = (event) => {
    if (active === true) {
      event.preventDefault();
      rotate(event);
    }
  };
  const onmouseup = (event) => {
    event.preventDefault();
    stop(event);
  };
  rotate = (e) => {
    e.preventDefault();
    var x = e.clientX - center.x,
      y = e.clientY - center.y,
      d = R2D * Math.atan2(y, x);
    rotation = d - startAngle;
    let { tx, ty } = getElementDimensions(rot);

    let transform = `scaleX(1) scaleY(1) translateX(${tx}px) translateY(${ty}px) rotate(${
      angle + rotation
    }deg)`;
    return (rot.style.webkitTransform = transform);
  };

  stop = (e) => {
    angle += rotation;
    let { tx, ty } = getElementDimensions(rot);
    let rota = getElementDimensions(rot).rot;
    let text = document.getElementById(el.id.split('t')[0]);
    if (callback_dispatch) {
      callback_dispatch(
        e,
        el.id.split('t')[0],
        text.offsetWidth.toFixed(4),
        text.offsetHeight.toFixed(4),
        tx.toFixed(4),
        ty.toFixed(4),
        text.style.fontSize,
        rota,
      );
    }
    window.removeEventListener('mousemove', onmousemiving);
    window.removeEventListener('mouseup', onmouseup);
    return (active = false);
  };

  init();
}
