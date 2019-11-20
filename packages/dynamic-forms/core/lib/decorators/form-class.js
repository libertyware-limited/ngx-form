"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.has-instance");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.has-instance");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dynamicForm = dynamicForm;

var _metaKeys = require("./meta-keys");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var typeTag = Symbol("type");

function dynamicForm() {
  return function (constructor) {
    var _class, _temp;

    var _Symbol$hasInstance;

    return _temp = (_Symbol$hasInstance = Symbol.hasInstance, _class = function (_constructor) {
      _inherits(_class, _constructor);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
      }

      _createClass(_class, [{
        key: "getFormFields",
        value: function getFormFields() {
          var _this = this;

          return (Reflect.getMetadata(_metaKeys.MetadataKeys.FIELDS, this) || []).map(function (field) {
            return Reflect.getMetadata(_metaKeys.MetadataKeys.FORM_FIELD, _this, field);
          });
        }
      }], [{
        key: _Symbol$hasInstance,
        value: function value(instance) {
          return instance.constructor.__isDynamicFormModelInstance__ === typeTag;
        }
      }]);

      return _class;
    }(constructor)), _class.__isDynamicFormModelInstance__ = typeTag, _temp;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2Zvcm0tY2xhc3MudHMiXSwibmFtZXMiOlsidHlwZVRhZyIsIlN5bWJvbCIsImR5bmFtaWNGb3JtIiwiY29uc3RydWN0b3IiLCJoYXNJbnN0YW5jZSIsIlJlZmxlY3QiLCJnZXRNZXRhZGF0YSIsIk1ldGFkYXRhS2V5cyIsIkZJRUxEUyIsIm1hcCIsImZpZWxkIiwiRk9STV9GSUVMRCIsImluc3RhbmNlIiwiX19pc0R5bmFtaWNGb3JtTW9kZWxJbnN0YW5jZV9fIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLElBQU1BLE9BQU8sR0FBR0MsTUFBTSxDQUFDLE1BQUQsQ0FBdEI7O0FBRU8sU0FBU0MsV0FBVCxHQUF1QjtBQUU1QixTQUFPLFVBQStDQyxXQUEvQyxFQUErRDtBQUFBOztBQUFBOztBQUNwRSwwQ0FHVUYsTUFBTSxDQUFDRyxXQUhqQjtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsd0NBT21DO0FBQUE7O0FBQy9CLGlCQUFPLENBQUNDLE9BQU8sQ0FBQ0MsV0FBUixDQUFvQkMsdUJBQWFDLE1BQWpDLEVBQXlDLElBQXpDLEtBQWtELEVBQW5ELEVBQXVEQyxHQUF2RCxDQUNMLFVBQUNDLEtBQUQ7QUFBQSxtQkFDRUwsT0FBTyxDQUFDQyxXQUFSLENBQW9CQyx1QkFBYUksVUFBakMsRUFBNkMsS0FBN0MsRUFBbURELEtBQW5ELENBREY7QUFBQSxXQURLLENBQVA7QUFJRDtBQVpIO0FBQUE7QUFBQSw4QkFHOEJFLFFBSDlCLEVBRytHO0FBQzNHLGlCQUFPQSxRQUFRLENBQUNULFdBQVQsQ0FBcUJVLDhCQUFyQixLQUF3RGIsT0FBL0Q7QUFDRDtBQUxIOztBQUFBO0FBQUEsTUFBcUJHLFdBQXJCLFdBRVNVLDhCQUZULEdBRTBDYixPQUYxQztBQWNELEdBZkQ7QUFnQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXRhZGF0YUtleXMgfSBmcm9tIFwiLi9tZXRhLWtleXNcIjtcbmltcG9ydCB7IFdpZGdldE9wdGlvbnMgfSBmcm9tIFwiLi4vbW9kZWxzL3dpZGdldC1vcHRpb25zXCI7XG5cbmNvbnN0IHR5cGVUYWcgPSBTeW1ib2woXCJ0eXBlXCIpO1xuXG5leHBvcnQgZnVuY3Rpb24gZHluYW1pY0Zvcm0oKSB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogb25seS1hcnJvdy1mdW5jdGlvbnNcbiAgcmV0dXJuIGZ1bmN0aW9uPFQgZXh0ZW5kcyBuZXcgKC4uLmFyZ3M6IGFueVtdKSA9PiB7fT4oY29uc3RydWN0b3I6IFQpIHtcbiAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBjb25zdHJ1Y3RvciB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcbiAgICAgIHN0YXRpYyBfX2lzRHluYW1pY0Zvcm1Nb2RlbEluc3RhbmNlX18gPSB0eXBlVGFnO1xuICAgICAgc3RhdGljIFtTeW1ib2wuaGFzSW5zdGFuY2VdKGluc3RhbmNlOiB7IGNvbnN0cnVjdG9yOiB7IF9faXNEeW5hbWljRm9ybU1vZGVsSW5zdGFuY2VfXzogdHlwZW9mIHR5cGVUYWc7IH07IH0pIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlLmNvbnN0cnVjdG9yLl9faXNEeW5hbWljRm9ybU1vZGVsSW5zdGFuY2VfXyA9PT0gdHlwZVRhZztcbiAgICAgIH1cblxuICAgICAgZ2V0Rm9ybUZpZWxkcygpOiBXaWRnZXRPcHRpb25zW10ge1xuICAgICAgICByZXR1cm4gKFJlZmxlY3QuZ2V0TWV0YWRhdGEoTWV0YWRhdGFLZXlzLkZJRUxEUywgdGhpcykgfHwgW10pLm1hcChcbiAgICAgICAgICAoZmllbGQ6IHN0cmluZykgPT5cbiAgICAgICAgICAgIFJlZmxlY3QuZ2V0TWV0YWRhdGEoTWV0YWRhdGFLZXlzLkZPUk1fRklFTEQsIHRoaXMsIGZpZWxkKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG4gIH07XG59XG4iXX0=