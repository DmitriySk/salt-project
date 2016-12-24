"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var s = require("./style.css");
var Header = (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super.apply(this, arguments) || this;
    }
    Header.prototype.render = function () {
        return React.createElement("div", { className: s["m-header-wrapper"] }, "Header");
    };
    return Header;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
//# sourceMappingURL=index.js.map