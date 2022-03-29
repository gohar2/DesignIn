import React from 'react';
import './ColorPicker.scss';
import ColorBackground from '../../../../../images/ColorPickerBackground.png';
export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#1569a8',
      active: false,
    };
  }

  clickHandler = (e) => {
    this.setState({
      oldColor: this.state.color,
      color: e.target.value,
      active: !this.state.active,
    });
  };
  handleChange = (e) => {
    this.setState({
      oldColor: this.state.color,
      color: e.target.value,
      active: !this.state.active,
    });
    this.props.newcolor(this.state.color);
  };

  render() {
    return (
      <label className="color-selector" onClick={this.clickHandler}>
        {/* <span className="circle" style={{ background: this.state.color }} /> */}
        {/* <span>{this.state.color}</span> */}
        <input
          type="color"
          value={this.state.color}
          onChange={this.handleChange}
          className="hidden"
        />
      </label>
    );
  }
}
