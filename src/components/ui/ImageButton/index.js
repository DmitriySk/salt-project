"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var s = require('./index.css');
var ImageButton = (function (_super) {
    __extends(ImageButton, _super);
    function ImageButton() {
        return _super.apply(this, arguments) || this;
    }
    ImageButton.prototype.render = function () {
        return React.createElement("div", { className: s.image_button, style: this.props.style || {} },
            React.createElement("img", { style: {
                    width: this.props.width || 50
                }, src: this.props.image }));
    };
    return ImageButton;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageButton;
//# sourceMappingURL=index.js.map