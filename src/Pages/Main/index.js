"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var header_1 = require("../../containers/header");
var Main = (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            click_count: 0
        };
        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }
    Main.prototype.onClick = function () {
        this.setState({
            click_count: this.state.click_count + 1
        });
    };
    Main.prototype.render = function () {
        return React.createElement("div", { className: "main_page" },
            React.createElement(header_1.default, null));
    };
    return Main;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Main;
//# sourceMappingURL=index.js.map