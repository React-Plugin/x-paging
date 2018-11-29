"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _jsxInput = require("jsx-input");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created with Visual Studio Code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * github: https://github.com/react-xui/x-paging
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * User: 田想兵
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 2018-11-29
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 20:00:00
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Contact: 55342775@qq.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Paging = function (_Component) {
    _inherits(Paging, _Component);

    function Paging(props) {
        _classCallCheck(this, Paging);

        var _this = _possibleConstructorReturn(this, (Paging.__proto__ || Object.getPrototypeOf(Paging)).call(this, props));

        var current = props.current || 1;
        _this.state = _extends({ current: current }, _this.compute(props, current));
        _this.onChangeHandle = _this.onChangeHandle.bind(_this);
        _this.goFirst = _this.goFirst.bind(_this);
        _this.goNext = _this.goNext.bind(_this);
        _this.goPrev = _this.goPrev.bind(_this);
        _this.goLast = _this.goLast.bind(_this);
        _this.onKeyup = _this.onKeyup.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        return _this;
    }

    _createClass(Paging, [{
        key: "compute",
        value: function compute(props, curr) {
            var current = curr || this.state.current;
            this.obj = {
                sumPage: props.total % props.pagesize === 0 ? parseInt(props.total / props.pagesize, 0) : parseInt(props.total / props.pagesize + 1, 0),
                pagesize: props.pagesize || 1,
                total: props.total
            };
            return _extends({ isFirst: current <= 1, isLast: current >= this.obj.sumPage }, this.obj);
        }
    }, {
        key: "reComputeState",
        value: function reComputeState() {
            var _this2 = this;

            var state = this.compute(this.state);
            this.setState(_extends({}, state), function () {
                _this2.props.callback && _this2.props.callback(_this2.state.current);
            });
        }
    }, {
        key: "onChangeHandle",
        value: function onChangeHandle(e) {}
    }, {
        key: "UNSAFE_componentWillReceiveProps",
        value: function UNSAFE_componentWillReceiveProps(newProps, newState) {
            if (newProps && (newProps.pagesize !== this.state.pagesize || newProps.total !== this.state.total || newProps.current !== this.state.current)) {
                var state = this.compute(newProps);
                this.setState(_extends({}, state));
            }
        }
    }, {
        key: "goFirst",
        value: function goFirst() {
            var _this3 = this;

            if (this.state.current !== 1) {
                this.setState({ current: 1 }, function () {
                    _this3.reComputeState();
                });
            }
        }
    }, {
        key: "goPrev",
        value: function goPrev() {
            var _this4 = this;

            if (this.state.current > 1) {
                this.setState({ current: this.state.current - 1 }, function () {
                    _this4.reComputeState();
                });
            }
        }
    }, {
        key: "goNext",
        value: function goNext() {
            var _this5 = this;

            if (!this.state.isLast) {
                this.setState({ current: this.state.current + 1 }, function () {
                    _this5.reComputeState();
                });
            }
        }
    }, {
        key: "onBlur",
        value: function onBlur() {
            this.setState({ current: this.state.current });
        }
    }, {
        key: "goLast",
        value: function goLast() {
            var _this6 = this;

            if (!this.state.isLast) {
                this.setState({ current: this.state.sumPage }, function () {
                    _this6.reComputeState();
                });
            }
        }
    }, {
        key: "onKeyup",
        value: function onKeyup(e) {
            var _this7 = this;

            if (e.keyCode === 13) {
                if (this.state.sumPage < e.target.value || e.target.value < 1) {
                    this.setState({ current: this.state.current });
                    // e.target.value = this.state.current;
                } else {
                    this.setState({ current: parseInt(e.target.value, 0) }, function () {
                        _this7.reComputeState();
                    });
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            var obj = this.state;
            return _react2.default.createElement(
                "div",
                { className: "x-paging" },
                _react2.default.createElement(
                    "button",
                    { onClick: this.goFirst, className: this.state.isFirst ? 'disabled' : '' },
                    _react2.default.createElement("i", { className: "xui icon-last" })
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: this.goPrev, className: this.state.isFirst ? 'disabled' : '' },
                    _react2.default.createElement("i", { className: "xui icon-last1" })
                ),
                _react2.default.createElement(
                    "span",
                    null,
                    "\u7B2C",
                    _react2.default.createElement(_jsxInput.PosInterInput, { onChange: this.onChangeHandle, onBlur: this.onBlur, onKeyUp: this.onKeyup, value: this.state.current, placeholder: "\u9875\u7801\u6570" }),
                    "\u9875",
                    _react2.default.createElement(
                        "span",
                        { className: "sum" },
                        "\u5171",
                        obj.sumPage,
                        "\u9875"
                    )
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: this.goNext, className: this.state.isLast ? 'disabled' : '' },
                    _react2.default.createElement("i", { className: "xui icon-next" })
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: this.goLast, className: this.state.isLast ? 'disabled' : '' },
                    _react2.default.createElement("i", { className: "xui icon-next1" })
                )
            );
        }
    }]);

    return Paging;
}(_react.Component);

exports.default = Paging;