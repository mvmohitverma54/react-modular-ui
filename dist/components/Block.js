'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AbstractComponent2 = require('./AbstractComponent');

var _AbstractComponent3 = _interopRequireDefault(_AbstractComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Block = function (_AbstractComponent) {
  _inherits(Block, _AbstractComponent);

  function Block() {
    _classCallCheck(this, Block);

    return _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).apply(this, arguments));
  }

  _createClass(Block, [{
    key: 'getModifierObject',
    value: function getModifierObject() {
      var _this2 = this;

      var modifiers = {
        layout: this.props.layout,
        wrap: this.props.wrap,
        padding: this.props.padding,
        margin: this.props.margin,
        hide: this.props.hide,
        fit: this.props.fit,
        grow: this.props.grow,
        shrink: this.props.shrink,
        order: this.props.order,
        grid: this.props.grid,
        align: this.props.align,
        justify: this.props.justify,
        center: this.props.center,
        scroll: this.props.scroll,
        spaceHorizontal: this.props.spaceHorizontal,
        spaceVertical: this.props.spaceVertical,
        height: this.props.height,
        width: this.props.width
      };
      if (this.props.modifiers) {
        this.props.modifiers.forEach(function (key) {
          modifiers[key] = _this2.props[key];
        });
      }
      return modifiers;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.getBlockName('block', this.getModifierObject()) },
        this.props.children
      );
    }
  }]);

  return Block;
}(_AbstractComponent3.default);

exports.default = Block;