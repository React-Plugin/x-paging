"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _jsxInput = require("jsx-input");

var _xI18n = require("x-i18n");

var _xI18n2 = _interopRequireDefault(_xI18n);

var _zh_CN = require("../local/zh_CN");

var _zh_CN2 = _interopRequireDefault(_zh_CN);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

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

        _this.renderContent = function (local, localCode) {
            var obj = _this.state;
            return _react2.default.createElement(
                "div",
                { className: "x-paging" },
                _react2.default.createElement(
                    "button",
                    { onClick: _this.goFirst, className: _this.state.isFirst ? 'disabled' : '' },
                    _react2.default.createElement("i", { className: "xui icon-last" })
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: _this.goPrev, className: _this.state.isFirst ? 'disabled' : '' },
                    _react2.default.createElement("i", { className: "xui icon-last1" })
                ),
                _react2.default.createElement(
                    "span",
                    null,
                    local.go,
                    _react2.default.createElement(_jsxInput.PosInterInput, { onChange: _this.onChangeHandle, onBlur: _this.onBlur, onKeyUp: _this.onKeyup, value: _this.state.current, placeholder: local.pageNum }),
                    local.page,
                    _react2.default.createElement(
                        "span",
                        { className: "sum" },
                        local.sum,
                        obj.sumPage,
                        local.page
                    )
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: _this.goNext, className: _this.state.isLast ? 'disabled' : '' },
                    _react2.default.createElement("i", { className: "xui icon-next" })
                ),
                _react2.default.createElement(
                    "button",
                    { onClick: _this.goLast, className: _this.state.isLast ? 'disabled' : '' },
                    _react2.default.createElement("i", { className: "xui icon-next1" })
                )
            );
        };

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
                this.setState({ current: +this.state.current - 1 }, function () {
                    _this4.reComputeState();
                });
            }
        }
    }, {
        key: "goNext",
        value: function goNext() {
            var _this5 = this;

            if (!this.state.isLast) {
                this.setState({ current: +this.state.current + 1 }, function () {
                    _this5.reComputeState();
                });
            }
        }
    }, {
        key: "onBlur",
        value: function onBlur() {
            this.setState({ current: +this.state.current });
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
                    this.setState({ current: +this.state.current });
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
            var defaultValue = {};
            var localData = this.props.local;
            defaultValue = _extends({}, _zh_CN2.default, localData);
            return _react2.default.createElement(
                _xI18n2.default,
                { componentName: "Paging", defaultValue: defaultValue },
                this.renderContent
            );
        }
    }]);

    return Paging;
}(_react.Component);

Paging.propTypes = {
    current: _propTypes2.default.number.isRequired,
    pagesize: _propTypes2.default.number.isRequired,
    total: _propTypes2.default.number.isRequired
};
Paging.defaultProps = {
    current: 1,
    pagesize: 10,
    total: 0
};
exports.default = Paging;