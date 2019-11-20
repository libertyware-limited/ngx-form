"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormGenModel = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("regenerator-runtime/runtime");

var _classValidator = require("class-validator");

var _classTransformer = require("class-transformer");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FormGenModel = function () {
  function FormGenModel(data) {
    _classCallCheck(this, FormGenModel);

    (0, _classTransformer.plainToClassFromExist)(this, data);
  }

  _createClass(FormGenModel, [{
    key: "isValid",
    value: function () {
      var _isValid = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var errors;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _classValidator.validate)(this);

              case 2:
                errors = _context.sent;
                return _context.abrupt("return", errors.length === 0);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function isValid() {
        return _isValid.apply(this, arguments);
      }

      return isValid;
    }()
  }]);

  return FormGenModel;
}();

exports.FormGenModel = FormGenModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvZm9ybS1nZW4tbW9kZWwudHMiXSwibmFtZXMiOlsiRm9ybUdlbk1vZGVsIiwiZGF0YSIsImVycm9ycyIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVzQkEsWTtBQUNwQix3QkFBWUMsSUFBWixFQUF3QjtBQUFBOztBQUN0QixpREFBc0IsSUFBdEIsRUFBNEJBLElBQTVCO0FBQ0Q7Ozs7Ozs7Ozs7Ozt1QkFFc0IsOEJBQVMsSUFBVCxDOzs7QUFBZkMsZ0JBQUFBLE07aURBQ0NBLE1BQU0sQ0FBQ0MsTUFBUCxLQUFrQixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdmFsaWRhdGUgfSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xuaW1wb3J0IHsgcGxhaW5Ub0NsYXNzRnJvbUV4aXN0IH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRm9ybUdlbk1vZGVsIHtcbiAgY29uc3RydWN0b3IoZGF0YT86IGFueSkge1xuICAgIHBsYWluVG9DbGFzc0Zyb21FeGlzdCh0aGlzLCBkYXRhKTtcbiAgfVxuICBhc3luYyBpc1ZhbGlkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IGVycm9ycyA9IGF3YWl0IHZhbGlkYXRlKHRoaXMpO1xuICAgIHJldHVybiBlcnJvcnMubGVuZ3RoID09PSAwO1xuICB9XG59XG4iXX0=