'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bool = _react.PropTypes.bool;
var shape = _react.PropTypes.shape;
var string = _react.PropTypes.string;
var object = _react.PropTypes.object;


var transitionDuration = 300;

var defaults = {
  styles: {
    image: {
      cursor: 'zoom-in'
    },
    zoomImage: {
      cursor: 'zoom-out',
      position: 'absolute',
      transition: 'transform ' + transitionDuration + 'ms',
      transform: 'translate3d(0, 0, 0) scale(1)',
      transformOrigin: 'center center',
      willChange: 'transform, top, left'
    },
    zoomContainer: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 9999
    },
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: '#fff',
      opacity: 0,
      transition: 'opacity ' + transitionDuration + 'ms'
    }
  }
};

var ImageZoom = function (_Component) {
  _inherits(ImageZoom, _Component);

  function ImageZoom(props) {
    _classCallCheck(this, ImageZoom);

    var _this = _possibleConstructorReturn(this, (ImageZoom.__proto__ || Object.getPrototypeOf(ImageZoom)).call(this, props));

    _this.state = {
      isZoomed: props.isZoomed,
      src: null
    };

    _this.handleZoom = _this.handleZoom.bind(_this);
    _this.handleUnzoom = _this.handleUnzoom.bind(_this);
    return _this;
  }

  _createClass(ImageZoom, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.portal = document.createElement('div');
      document.body.appendChild(this.portal);
      if (this.state.isZoomed) this.renderZoomed();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.removeChild(this.portal);
      delete this.portal;
      delete this.portalInstance;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.isZoomed !== this.props.isZoomed && this.portalInstance) {
        this.props.isZoomed ? this.renderZoomed() : this.portalInstance.handleUnzoom();
      } else if (prevState.isZoomed !== this.state.isZoomed) {
        this.state.isZoomed ? this.renderZoomed() : this.removeZoomed();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('img', {
        src: this.state.src || this.props.image.src,
        alt: this.props.image.alt,
        className: this.props.image.className,
        style: this.getImageStyle(),
        onClick: this.handleZoom
      });
    }
  }, {
    key: 'renderZoomed',
    value: function renderZoomed() {
      var image = _reactDom2.default.findDOMNode(this);

      this.portalInstance = _reactDom2.default.render(_react2.default.createElement(Zoom, _extends({}, this.props.zoomImage, {
        image: image,
        hasAlreadyLoaded: !!this.state.src,
        shouldRespectMaxDimension: this.props.shouldRespectMaxDimension,
        zoomMargin: this.props.zoomMargin,
        onClick: this.handleUnzoom
      })), this.portal);
    }
  }, {
    key: 'removeZoomed',
    value: function removeZoomed() {
      if (this.portal) _reactDom2.default.unmountComponentAtNode(this.portal);
    }
  }, {
    key: 'getImageStyle',
    value: function getImageStyle() {
      var style = {};
      if (this.state.isZoomed) style.visibility = 'hidden';
      return Object.assign({}, defaults.styles.image, style, this.props.image.style);
    }
  }, {
    key: 'handleZoom',
    value: function handleZoom() {
      this.setState({ isZoomed: true });
    }
  }, {
    key: 'handleUnzoom',
    value: function handleUnzoom(src) {
      var _this2 = this;

      return function () {
        var opts = { isZoomed: false };
        if (_this2.props.shouldReplaceImage) opts.src = src;
        _this2.setState(opts);
      };
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return {
        isZoomed: false,
        shouldReplaceImage: true,
        shouldRespectMaxDimension: false,
        zoomMargin: 40
      };
    }
  }]);

  return ImageZoom;
}(_react.Component);

exports.default = ImageZoom;


ImageZoom.propTypes = {
  image: shape({
    src: string.isRequired,
    alt: string,
    className: string,
    style: object
  }).isRequired,
  zoomImage: shape({
    src: string,
    alt: string,
    className: string,
    style: object
  }),
  isZoomed: bool,
  shouldReplaceImage: bool,
  shouldRespectMaxDimension: bool
};

//====================================================

var Zoom = function (_Component2) {
  _inherits(Zoom, _Component2);

  function Zoom(props) {
    _classCallCheck(this, Zoom);

    var _this3 = _possibleConstructorReturn(this, (Zoom.__proto__ || Object.getPrototypeOf(Zoom)).call(this, props));

    _this3.state = {
      hasLoaded: false,
      isZoomed: true,
      src: _this3.props.image.src
    };

    _this3.handleResize = _this3.handleResize.bind(_this3);
    _this3.handleUnzoom = _this3.handleUnzoom.bind(_this3);
    _this3.handleScroll = _this3.handleScroll.bind(_this3);
    _this3.handleKeyUp = _this3.handleKeyUp.bind(_this3);
    _this3.handleTouchStart = _this3.handleTouchStart.bind(_this3);
    _this3.handleTouchMove = _this3.handleTouchMove.bind(_this3);
    _this3.handleTouchEnd = _this3.handleTouchEnd.bind(_this3);
    return _this3;
  }

  _createClass(Zoom, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ hasLoaded: true });
      if (this.props.src && !this.props.hasAlreadyLoaded) this.fetchZoomImage();
      this.addListeners();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeListeners();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { onClick: this.handleUnzoom, style: defaults.styles.zoomContainer },
        _react2.default.createElement(Overlay, { isVisible: this.state.isZoomed }),
        _react2.default.createElement('img', {
          src: this.state.src,
          alt: this.props.alt,
          className: this.props.className,
          style: this.getZoomImageStyle()
        })
      );
    }
  }, {
    key: 'fetchZoomImage',
    value: function fetchZoomImage() {
      var _this4 = this;

      var src = this.props.src;

      var img = new Image();
      img.src = src;
      img.onload = function () {
        return _this4.setState({ hasLoaded: true, src: src });
      };
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      this.isTicking = false;
      window.addEventListener('resize', this.handleResize);
      window.addEventListener('scroll', this.handleScroll, true);
      window.addEventListener('keyup', this.handleKeyUp);
      window.addEventListener('ontouchstart', this.handleTouchStart);
      window.addEventListener('ontouchmove', this.handleTouchMove);
      window.addEventListener('ontouchend', this.handleTouchEnd);
      window.addEventListener('ontouchcancel', this.handleTouchEnd);
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('scroll', this.handleScroll, true);
      window.removeEventListener('keyup', this.handleKeyUp);
      window.removeEventListener('ontouchstart', this.handleTouchStart);
      window.removeEventListener('ontouchmove', this.handleTouchMove);
      window.removeEventListener('ontouchend', this.handleTouchEnd);
      window.removeEventListener('ontouchcancel', this.handleTouchEnd);
    }
  }, {
    key: 'handleResize',
    value: function handleResize() {
      this.forceUpdate();
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      this.forceUpdate();
      if (this.state.isZoomed) this.handleUnzoom();
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(_ref) {
      var which = _ref.which;

      var opts = {
        27: this.handleUnzoom
      };

      if (opts[which]) return opts[which]();
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      this.yTouchPosition = e.touches[0].clientY;
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      this.forceUpdate();
      var touchChange = Math.abs(e.touches[0].clientY - this.yTouchPosition);
      if (touchChange > 10 && this.state.isZoomed) this.handleUnzoom();
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      this.yTouchPosition = undefined;
    }
  }, {
    key: 'handleUnzoom',
    value: function handleUnzoom(e) {
      var _this5 = this;

      if (e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }
      this.setState({ isZoomed: false }, function () {
        return setTimeout(_this5.props.onClick(_this5.state.src), transitionDuration);
      });
    }
  }, {
    key: 'getZoomImageStyle',
    value: function getZoomImageStyle() {
      var _props = this.props;
      var image = _props.image;
      var shouldRespectMaxDimension = _props.shouldRespectMaxDimension;
      var src = _props.src;
      var zoomMargin = _props.zoomMargin;

      var imageOffset = image.getBoundingClientRect();

      var top = imageOffset.top;
      var left = imageOffset.left;
      var width = image.width;
      var height = image.height;
      var naturalWidth = image.naturalWidth;
      var naturalHeight = image.naturalHeight;


      var style = { top: top, left: left, width: width, height: height };

      if (!this.state.hasLoaded || !this.state.isZoomed) {
        return Object.assign({}, defaults.styles.zoomImage, this.props.style, style);
      }

      // Get the the coords for center of the viewport
      var viewportX = window.innerWidth / 2;
      var viewportY = window.innerHeight / 2;

      // Get the coords for center of the original image
      var imageCenterX = imageOffset.left + width / 2;
      var imageCenterY = imageOffset.top + height / 2;

      // Get offset amounts for image coords to be centered on screen
      var translateX = viewportX - imageCenterX;
      var translateY = viewportY - imageCenterY;

      // Figure out how much to scale the image
      var scale = shouldRespectMaxDimension && !src ? getMaxDimensionScale({ width: width, height: height, naturalWidth: naturalWidth, naturalHeight: naturalHeight, zoomMargin: zoomMargin }) : getScale({ width: width, height: height, zoomMargin: zoomMargin });

      var zoomStyle = {
        transform: 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0) scale(' + scale + ')'
      };

      return Object.assign({}, defaults.styles.zoomImage, this.props.style, style, zoomStyle);
    }
  }]);

  return Zoom;
}(_react.Component);

/**
 * Figure out how much to scale based
 * solely on no maxing out the browser
 */


function getScale(_ref2) {
  var width = _ref2.width;
  var height = _ref2.height;
  var zoomMargin = _ref2.zoomMargin;

  var scaleX = window.innerWidth / (width + zoomMargin);
  var scaleY = window.innerHeight / (height + zoomMargin);
  return Math.min(scaleX, scaleY);
}

/**
 * Figure out how much to scale so you're
 * not larger than the original image
 */
function getMaxDimensionScale(_ref3) {
  var width = _ref3.width;
  var height = _ref3.height;
  var naturalWidth = _ref3.naturalWidth;
  var naturalHeight = _ref3.naturalHeight;
  var zoomMargin = _ref3.zoomMargin;

  var scale = getScale({ width: naturalWidth, height: naturalHeight, zoomMargin: zoomMargin });
  var ratio = naturalWidth > naturalHeight ? naturalWidth / width : naturalHeight / height;
  return scale > 1 ? ratio : scale * ratio;
}

Zoom.propTypes = {
  src: string,
  alt: string,
  className: string,
  style: object,
  image: object.isRequired,
  hasAlreadyLoaded: bool.isRequired
};

//====================================================

var Overlay = function (_Component3) {
  _inherits(Overlay, _Component3);

  function Overlay(props) {
    _classCallCheck(this, Overlay);

    var _this6 = _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call(this, props));

    _this6.state = {
      isVisible: false
    };
    return _this6;
  }

  _createClass(Overlay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ isVisible: true });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.isVisible) this.setState({ isVisible: false });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.isVisible !== nextProps.isVisible || this.state.isVisible !== nextProps.isVisible;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { style: this.getStyle() });
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var opacity = this.state.isVisible & 1; // bitwise and; converts bool to 0 or 1
      return Object.assign({}, defaults.styles.overlay, { opacity: opacity });
    }
  }]);

  return Overlay;
}(_react.Component);

Overlay.propTypes = {
  isVisible: bool.isRequired
};
