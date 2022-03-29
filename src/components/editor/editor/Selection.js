import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Selection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: true,
      mouseDown: false,
      startPoint: null,
      endPoint: null,
      selectionBox: null,
      selectedItems: {},
      appendMode: false,
    };
  }
  componentWillMount() {
    this.selectedChildren = {};
  }
  componentWillReceiveProps(nextProps) {
    var nextState = {};
    if (!nextProps.enabled) {
      nextState.selectedItems = {};
    }
    this.setState(nextState);
  }
  componentDidUpdate() {
    if (this.state.mouseDown && !(this.state.selectionBox === null)) {
      this._updateCollidingChildren(this.state.selectionBox);
    }
  }
  _onMouseDown = (e) => {
    if (!this.props.enabled || e.button === 2 || e.nativeEvent.which === 2) {
      return;
    }
    var nextState = {};
    if (e.ctrlKey || e.altKey || e.shiftKey) {
      nextState.appendMode = true;
    }
    nextState.mouseDown = true;
    nextState.startPoint = {
      x: e.pageX,
      y: e.pageY,
    };
    this.setState(nextState);
    window.document.addEventListener('mousemove', this._onMouseMove);
    window.document.addEventListener('mouseup', this._onMouseUp);
  };
  _onMouseUp = (e) => {
    window.document.removeEventListener('mousemove', this._onMouseMove);
    window.document.removeEventListener('mouseup', this._onMouseUp);
    this.setState({
      mouseDown: false,
      startPoint: null,
      endPoint: null,
      selectionBox: null,
      appendMode: false,
    });
    this.props.onSelectionChange.call(null, Object.keys(this.selectedChildren));
  };
  _onMouseMove = (e) => {
    e.preventDefault();
    if (this.state.mouseDown) {
      var endPoint = {
        x: e.pageX,
        y: e.pageY,
      };
      this.setState({
        endPoint: endPoint,
        selectionBox: this._calculateSelectionBox(
          this.state.startPoint,
          endPoint,
        ),
      });
    }
  };
  _onMouseMove = (e) => {
    e.preventDefault();
    if (this.state.mouseDown) {
      var endPoint = {
        x: e.pageX,
        y: e.pageY,
      };
      this.setState({
        endPoint: endPoint,
        selectionBox: this._calculateSelectionBox(
          this.state.startPoint,
          endPoint,
        ),
      });
    }
  };
  renderChildren = () => {
    var index = 0;
    var _this = this;
    var tmpChild;
    return React.Children.map(this.props.children, function (child) {
      var tmpKey = child.key === null ? index++ : child.key;
      var isSelected = Object.hasOwnProperty(_this.selectedChildren, tmpKey);
      tmpChild = React.cloneElement(child, {
        ref: tmpKey,
        selectionParent: _this,
        isSelected: isSelected,
      });
      return React.createElement(
        'div',
        ({
          className: 'select-box ' + (isSelected ? 'selected' : ''),
          onClickCapture: function (e) {
            if ((e.ctrlKey || e.altKey || e.shiftKey) && _this.props.enabled) {
              e.preventDefault();
              e.stopPropagation();
              _this.selectItem(
                tmpKey,
                !Object.hasOwnProperty(_this.selectedChildren, tmpKey),
              );
            }
          },
        },
        tmpChild),
      );
    });
  };
  renderSelectionBox = () => {
    if (
      !this.state.mouseDown ||
      this.state.endPoint === null ||
      this.state.startPoint === null
    ) {
      return null;
    }
    return (
      <div className="selection-border" style={this.state.selectionBox}></div>
    );
  };
  selectItem = (key, isSelected) => {
    if (isSelected) {
      this.selectedChildren[key] = isSelected;
    } else {
      delete this.selectedChildren[key];
    }
    this.props.onSelectionChange.call(null, Object.keys(this.selectedChildren));
    this.forceUpdate();
  };
  selectAll = () => {
    this.refs.forEach((ref, key) => {
      if (key !== 'selectionBox') {
        this.selectedChildren[key] = true;
      }
    });
  };
  clearSelection = () => {
    this.selectedChildren = {};
    this.props.onSelectionChange.call(null, []);
    this.forceUpdate();
  };
  _boxIntersects = (boxA, boxB) => {
    if (
      boxA.left <= boxB.left + boxB.width &&
      boxA.left + boxA.width >= boxB.left &&
      boxA.top <= boxB.top + boxB.height &&
      boxA.top + boxA.height >= boxB.top
    ) {
      return true;
    }
    return false;
  };
  _updateCollidingChildren = (selectionBox) => {
    var tmpNode = null;
    var tmpBox = null;
    var _this = this;
    this.refs.forEach((ref, key) => {
      if (key !== 'selectionBox') {
        tmpNode = React.findDOMNode(ref);
        tmpBox = {
          top: tmpNode.offsetTop,
          left: tmpNode.offsetLeft,
          width: tmpNode.clientWidth,
          height: tmpNode.clientHeight,
        };
        if (_this._boxIntersects(selectionBox, tmpBox)) {
          _this.selectedChildren[key] = true;
        } else {
          if (!_this.state.appendMode) {
            delete _this.selectedChildren[key];
          }
        }
      }
    });
  };
  _calculateSelectionBox = (startPoint, endPoint) => {
    if (!this.state.mouseDown || endPoint === null || startPoint === null) {
      return null;
    }
    var parentNode = this.refs.selectionBox.getDOMNode();
    var left = Math.min(startPoint.x, endPoint.x) - parentNode.offsetLeft;
    var top = Math.min(startPoint.y, endPoint.y) - parentNode.offsetTop;
    var width = Math.abs(startPoint.x - endPoint.x);
    var height = Math.abs(startPoint.y - endPoint.y);
    return {
      left: left,
      top: top,
      width: width,
      height: height,
    };
  };

  render() {
    var className = 'selection ' + (this.state.mouseDown ? 'dragging' : '');
    return (
      <div
        className={className}
        ref="selectionBox"
        onMouseDown={this._onMouseDown}
      >
        {this.renderChildren()}
        {this.renderSelectionBox()}
      </div>
    );
  }
}
export default Selection;
