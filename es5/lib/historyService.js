"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _routersEventRouterJs = require("./routers/eventRouter.js");

var _routersEventRouterJs2 = _interopRequireDefault(_routersEventRouterJs);

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

var callExternalMethod = Symbol();

/**
 * @class HistoryService
 */

var HistoryService = (function () {

	/**
  * Setup the router in private data
  *
  * @constructor
  */

	function HistoryService() {
		_classCallCheck(this, HistoryService);

		(0, _incognito2["default"])(this).router = new _routersEventRouterJs2["default"]();
	}

	/**
  * Start the service listening on the designated port.
  *
  * @method listen
  * @param  {Number}   portNumber Port number for the service to listen on.
  * @param  {Function} callback   Function to be called when the service is ready and listening.
  */

	_createClass(HistoryService, [{
		key: "listen",
		value: function listen(portNumber, callback) {
			this[callExternalMethod]("./historyService/listen.js", portNumber, callback);
		}

		/**
   * Close the service down
   *
   * @method close
   * @param  {Function} callback Function to be called when the service is fully closed.
   */
	}, {
		key: "close",
		value: function close(callback) {
			this[callExternalMethod]("./historyService/close.js", callback);
		}

		/**
   * Call an external method with `this` as the context.
   *
   * @method callExternalMethod
   * @param  {String} filePath           	The file path to the external method
   * @param  {*}		...methodArguments 	Any arguments that are to be passed to the external method
   * @private
   */
	}, {
		key: callExternalMethod,
		value: function value(filePath) {
			var _require;

			for (var _len = arguments.length, methodArguments = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				methodArguments[_key - 1] = arguments[_key];
			}

			(_require = require(filePath)).call.apply(_require, [this].concat(methodArguments));
		}
	}]);

	return HistoryService;
})();

exports["default"] = HistoryService;
module.exports = exports["default"];