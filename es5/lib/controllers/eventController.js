"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _forbin = require("forbin");

var _forbin2 = _interopRequireDefault(_forbin);

var _incognito = require("incognito");

var _incognito2 = _interopRequireDefault(_incognito);

/**
 * Controls requests for events
 *
 * @class EventController
 */

var EventController = (function (_Controller) {
    _inherits(EventController, _Controller);

    function EventController() {
        _classCallCheck(this, EventController);

        _get(Object.getPrototypeOf(EventController.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(EventController, [{
        key: "initialize",

        /**
         * Initialize the event controller by passing the history service object to it.
         *
         * @constructor
         * @method initialize
         * @param  {HistoryService} service The service that the controller works for.
         */
        value: function initialize(service) {
            (0, _incognito2["default"])(this).service = service;
        }

        /**
         * Insert a "Create Event" task into the tasks queue
         *
         * @method create
         * @param  {Request} request  The request sent in
         * @param  {Response} response A promise to respond with
         */
    }, {
        key: "create",
        value: function create(request, response) {
            var queue = (0, _incognito2["default"])(this).service.queue;

            queue.create("createEvent", request.body).save(function () {
                response.ok();
            });
        }
    }]);

    return EventController;
})(_forbin2["default"]);

exports["default"] = EventController;
module.exports = exports["default"];