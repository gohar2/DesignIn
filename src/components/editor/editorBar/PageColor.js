import React, { useState, useContext } from 'react';
import '../sidebar/iconCollorPicker/NewColorPicker/ColorPicker.scss';
import Context from '../../store/store';

const PageColorPicker = (props) => {
  const [color, setColor] = useState('#1569a8');
  const [active, setActive] = useState(false);
  const [state, dispatch] = useContext(Context);

  const clickHandler = (e) => {
    setColor(e.target.value);
    setActive(!active);
  };
  const handleChange = (e) => {
    setColor(e.target.value);
    setActive(!active);
    props.newcolor(e.target.value);
    // dispatch({
    //   type: 'SAVE_HISTORY',
    // });
  };
  return (
    <>
      <label
        className={
          props.isArabic && props.isArabic
            ? 'arabicModecolorPicker page-color-selector'
            : 'page-color-selector'
        }
        onClick={clickHandler}
      >
        {/* <span className="circle" style={{ background: this.state.color }} />  */}
        {/* <span>{this.state.color}</span> */}
        <input
          type="color"
          value={props.selectedColor ? props.selectedColor : color}
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </>
  );
};

export default PageColorPicker;
