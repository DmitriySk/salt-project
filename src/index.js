"use strict";
var React = require("react");
var ReactDom = require("react-dom");
var react_router_1 = require("react-router");
var routes_1 = require("./routes");
ReactDom.render(React.createElement(react_router_1.Router, { routes: routes_1.default, history: react_router_1.browserHistory }), document.getElementById('app'));
//# sourceMappingURL=index.js.map