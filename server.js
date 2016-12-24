/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//require('node-jsx-babel').install();

	let express = __webpack_require__(1);
	let path = __webpack_require__(2);
	let favicon = __webpack_require__(3);
	let logger = __webpack_require__(4);
	let cookieParser = __webpack_require__(5);
	let bodyParser = __webpack_require__(6);
	let React = __webpack_require__(7);
	let ReactServer = __webpack_require__(8);
	let Router = __webpack_require__(9);

	let routes = __webpack_require__(10).default;

	let app = express();

	if (process.env.NODE_ENV !== 'production') {
		const webpack = __webpack_require__(22);
		const webpack_hot = __webpack_require__(23);
		const webpackConfig = __webpack_require__(24);
		const webpackCompiler = webpack(webpackConfig);
		app.use(__webpack_require__(29)(webpackCompiler, {
			publicPath: webpackConfig.output.publicPath,
			stats: {colors: true},
			noInfo: true,
			hot: true,
			inline: true,
			lazy: false,
			historyApiFallback: true,
			quiet: true,
		}));
		app.use(webpack_hot(webpackCompiler));
		app.set('port', process.env.PORT || 3000);
	}

	// view engine setup
	app.set('views', path.resolve(__dirname, './src/Views'));
	app.set('view engine', 'jade');

	app.use(favicon(__dirname + '/public/favicon.ico'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, 'public')));

	app.use(function(req, res) {

		Router.match({ routes: routes, location: req.url }, function(error, redirectLocation, renderProps) {
			if (error) {
				console.log(error);
				res.status(500).send(error.message);
			} else if (redirectLocation) {
				res.redirect(302, redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				// You can also check renderProps.components or renderProps.routes for
				// your "not found" component or route respectively, and send a 404 as
				// below, if you're using a catch-all route.
				let html = ReactServer.renderToString(React.createElement(Router.RouterContext, renderProps));
				//console.log(renderProps);
				res.render('index', {html: html});
			} else {
				res.status(404).send('Not found');
			}
		});

	});

	/// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		let err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	/// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use(function(err, req, res) {
			res.status(err.status || 500);
			res.render('index', {
				message: err.message,
				error: err.stack
			});
		});
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res) {
		res.status(err.status || 500);
		res.render('index', {
			message: err.message,
			error: {}
		});
	});

	let server = app.listen(app.get('port'), function() {
		console.log('Express server listening on port ' + server.address().port);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Main_1 = __webpack_require__(11);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    path: '/',
	    indexRoute: { component: Main_1.default },
	    childRoutes: []
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(7);
	var header_1 = __webpack_require__(12);
	var footer_1 = __webpack_require__(20);
	var center_1 = __webpack_require__(21);
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
	            React.createElement(header_1.default, null),
	            React.createElement(center_1.default, null),
	            React.createElement(footer_1.default, null));
	    };
	    return Main;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Main;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(7);
	var s = __webpack_require__(13);
	var Header = (function (_super) {
	    __extends(Header, _super);
	    function Header() {
	        return _super.apply(this, arguments) || this;
	    }
	    Header.prototype.render = function () {
	        return React.createElement("div", { className: s["m-header"] }, "Header");
	    };
	    return Header;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Header;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	
	    var content = __webpack_require__(14);
	    var insertCss = __webpack_require__(16);

	    if (typeof content === 'string') {
	      content = [[module.id, content, '']];
	    }

	    module.exports = content.locals || {};
	    module.exports._getContent = function() { return content; };
	    module.exports._getCss = function() { return content.toString(); };
	    module.exports._insertCss = function(options) { return insertCss(content, options) };
	    
	    // Hot Module Replacement
	    // https://webpack.github.io/docs/hot-module-replacement
	    // Only activated in browser context
	    if (false) {
	      var removeCss = function() {};
	      module.hot.accept("!!./../../../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./style.css", function() {
	        content = require("!!./../../../node_modules/css-loader/index.js?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!./style.css");

	        if (typeof content === 'string') {
	          content = [[module.id, content, '']];
	        }

	        removeCss = insertCss(content, { replace: true });
	      });
	      module.hot.dispose(function() { removeCss(); });
	    }
	  

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	// imports


	// module
	exports.push([module.id, ".m-header___FDGle {\r\n\theight: 200px;\r\n\tbackground: yellow;\r\n}", "", {"version":3,"sources":["/./src/containers/header/style.css"],"names":[],"mappings":"AAAA;CACC,cAAc;CACd,mBAAmB;CACnB","file":"style.css","sourcesContent":[".m-header {\r\n\theight: 200px;\r\n\tbackground: yellow;\r\n}"],"sourceRoot":"webpack://"}]);

	// exports
	exports.locals = {
		"m-header": "m-header___FDGle"
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stringify = __webpack_require__(17);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _slicedToArray2 = __webpack_require__(18);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _getIterator2 = __webpack_require__(19);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Isomorphic CSS style loader for Webpack
	 *
	 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE.txt file in the root directory of this source tree.
	 */

	var prefix = 's';
	var inserted = {};

	// Base64 encoding and decoding - The "Unicode Problem"
	// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
	function b64EncodeUnicode(str) {
	  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
	    return String.fromCharCode('0x' + p1);
	  }));
	}

	/**
	 * Remove style/link elements for specified node IDs
	 * if they are no longer referenced by UI components.
	 */
	function removeCss(ids) {
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var id = _step.value;

	      if (--inserted[id] <= 0) {
	        var elem = document.getElementById(prefix + id);
	        if (elem) {
	          elem.parentNode.removeChild(elem);
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	}

	/**
	 * Example:
	 *   // Insert CSS styles object generated by `css-loader` into DOM
	 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
	 *
	 *   // Remove it from the DOM
	 *   removeCss();
	 */
	function insertCss(styles) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$replace = _ref.replace,
	      replace = _ref$replace === undefined ? false : _ref$replace,
	      _ref$prepend = _ref.prepend,
	      prepend = _ref$prepend === undefined ? false : _ref$prepend;

	  var ids = [];
	  for (var i = 0; i < styles.length; i++) {
	    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
	        moduleId = _styles$i[0],
	        css = _styles$i[1],
	        media = _styles$i[2],
	        sourceMap = _styles$i[3];

	    var id = moduleId + '-' + i;

	    ids.push(id);

	    if (inserted[id]) {
	      if (!replace) {
	        inserted[id]++;
	        continue;
	      }
	    }

	    inserted[id] = 1;

	    var elem = document.getElementById(prefix + id);
	    var create = false;

	    if (!elem) {
	      create = true;

	      elem = document.createElement('style');
	      elem.setAttribute('type', 'text/css');
	      elem.id = prefix + id;

	      if (media) {
	        elem.setAttribute('media', media);
	      }
	    }

	    var cssText = css;
	    if (sourceMap && btoa) {
	      // skip IE9 and below, see http://caniuse.com/atob-btoa
	      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
	      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
	    }

	    if ('textContent' in elem) {
	      elem.textContent = cssText;
	    } else {
	      elem.styleSheet.cssText = cssText;
	    }

	    if (create) {
	      if (prepend) {
	        document.head.insertBefore(elem, document.head.childNodes[0]);
	      } else {
	        document.head.appendChild(elem);
	      }
	    }
	  }

	  return removeCss.bind(null, ids);
	}

	module.exports = insertCss;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(7);
	var Footer = (function (_super) {
	    __extends(Footer, _super);
	    function Footer() {
	        return _super.apply(this, arguments) || this;
	    }
	    Footer.prototype.render = function () {
	        return React.createElement("div", null, "Footer");
	    };
	    return Footer;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Footer;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(7);
	var Center = (function (_super) {
	    __extends(Center, _super);
	    function Center() {
	        return _super.apply(this, arguments) || this;
	    }
	    Center.prototype.render = function () {
	        return React.createElement("div", null, "Center");
	    };
	    return Center;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Center;


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	let path = __webpack_require__(2);
	let colors = __webpack_require__(25);
	let rimraf = __webpack_require__(26);
	let webpack = __webpack_require__(22);
	let postcssAssets = __webpack_require__(27);
	let postcssNext = __webpack_require__(28);

	let config = {
		devtool: 'eval',

		debug: true,

		resolve: {
			alias: {
				_page: path.resolve(__dirname, "src/Pages"),
				_component: path.resolve(__dirname, "./src/components"),
				_container: path.resolve(__dirname, "./src/containers"),
			},
			root: __dirname,
			modulesDirectories: ["src", "node_modules"],
			extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.css']
		},

		entry: {
			mainpage: [
				'webpack-hot-middleware/client?reload=true',
				'./src/index.js',
			]
		},

		output: {
			path: path.resolve(__dirname, "public/js/"),
			publicPath: '/js/',
			filename: '[name].js',
			pathinfo: true
		},

		module: {
			loaders: [
				{
					test: /(\.tsx?|\.jsx)$/,
					loader: 'react-hot/webpack!ts'
				},
				{
					test: /\.json$/,
					loader: 'json'
				},
				{
					test: /\.css$/,
					include: [path.resolve('./src'), path.resolve('./node_modules')],
					loaders: [
						'style',
						'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
						'postcss'
					]
				},
				{
					test: /\.eot(\?.*)?$/,
					loader: 'file?name=h/[hash].[ext]'
				},
				{
					test: /\.(woff|woff2)(\?.*)?$/,
					loader: 'file?name=h/[hash].[ext]'
				},
				{
					test: /\.ttf(\?.*)?$/,
					loader: 'url?limit=10000&mimetype=application/octet-stream&name=h/[hash].[ext]'
				},
				{
					test: /\.svg(\?.*)?$/,
					loader: 'url?limit=10000&mimetype=image/svg+xml&name=h/[hash].[ext]'
				},
				{
					test: /\.(jpe?g|png|gif)$/i,
					loader: 'url?limit=1000&name=h/[hash].[ext]'
				}
			]
		},
		postcss: function () {
			return [
				postcssNext(),
				postcssAssets({ relative: true })
			];
		},

		plugins: [
			{
				apply: function(compiler) {
					console.log(__dirname);
					//rimraf.sync(path.resolve(__dirname, "public/js"));
				}
			},
			new webpack.DefinePlugin({
				'process.env.BROWSER': JSON.stringify(true),
				'process.env.NODE_ENV': JSON.stringify('development')
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new webpack.ProgressPlugin(function handler(percentage, msg) {
				var msgArr = msg.split(" "), allChanks = -1, curChank = -1;

				if (msgArr[0].indexOf("/") != -1) {
					curChank = parseInt(msgArr[0].split("/")[0]);
					allChanks = parseInt(msgArr[0].split("/")[1]);

					process.stdout.write("\r\x1b[K");

					var count = 25, hashes="";
					var c = allChanks / count;
					for (var i = 0; i < count; ++i) {
						hashes += curChank > i*c ? "#" : " ";
					}

					process.stdout.write(
						colors.red("progress:")
						+ colors.green(" ["+hashes+"] ")
						+ colors.blue(msg)
					);
				}
			})
		]
	};

	module.exports = config;


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("colors");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("rimraf");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("postcss-assets");

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = require("postcss-cssnext");

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ }
/******/ ]);