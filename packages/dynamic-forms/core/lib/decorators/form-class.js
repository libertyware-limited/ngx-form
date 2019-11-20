"use strict";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWNvcmF0b3JzL2Zvcm0tY2xhc3MudHMiXSwibmFtZXMiOlsidHlwZVRhZyIsIlN5bWJvbCIsImR5bmFtaWNGb3JtIiwiY29uc3RydWN0b3IiLCJoYXNJbnN0YW5jZSIsIlJlZmxlY3QiLCJnZXRNZXRhZGF0YSIsIk1ldGFkYXRhS2V5cyIsIkZJRUxEUyIsIm1hcCIsImZpZWxkIiwiRk9STV9GSUVMRCIsImluc3RhbmNlIiwiX19pc0R5bmFtaWNGb3JtTW9kZWxJbnN0YW5jZV9fIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTUEsT0FBTyxHQUFHQyxNQUFNLENBQUMsTUFBRCxDQUF0Qjs7QUFFTyxTQUFTQyxXQUFULEdBQXVCO0FBRTVCLFNBQU8sVUFBK0NDLFdBQS9DLEVBQStEO0FBQUE7O0FBQUE7O0FBQ3BFLDBDQUdVRixNQUFNLENBQUNHLFdBSGpCO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx3Q0FPbUM7QUFBQTs7QUFDL0IsaUJBQU8sQ0FBQ0MsT0FBTyxDQUFDQyxXQUFSLENBQW9CQyx1QkFBYUMsTUFBakMsRUFBeUMsSUFBekMsS0FBa0QsRUFBbkQsRUFBdURDLEdBQXZELENBQ0wsVUFBQ0MsS0FBRDtBQUFBLG1CQUNFTCxPQUFPLENBQUNDLFdBQVIsQ0FBb0JDLHVCQUFhSSxVQUFqQyxFQUE2QyxLQUE3QyxFQUFtREQsS0FBbkQsQ0FERjtBQUFBLFdBREssQ0FBUDtBQUlEO0FBWkg7QUFBQTtBQUFBLDhCQUc4QkUsUUFIOUIsRUFHK0c7QUFDM0csaUJBQU9BLFFBQVEsQ0FBQ1QsV0FBVCxDQUFxQlUsOEJBQXJCLEtBQXdEYixPQUEvRDtBQUNEO0FBTEg7O0FBQUE7QUFBQSxNQUFxQkcsV0FBckIsV0FFU1UsOEJBRlQsR0FFMENiLE9BRjFDO0FBY0QsR0FmRDtBQWdCRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1ldGFkYXRhS2V5cyB9IGZyb20gXCIuL21ldGEta2V5c1wiO1xuaW1wb3J0IHsgV2lkZ2V0T3B0aW9ucyB9IGZyb20gXCIuLi9tb2RlbHMvd2lkZ2V0LW9wdGlvbnNcIjtcblxuY29uc3QgdHlwZVRhZyA9IFN5bWJvbChcInR5cGVcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiBkeW5hbWljRm9ybSgpIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvbmx5LWFycm93LWZ1bmN0aW9uc1xuICByZXR1cm4gZnVuY3Rpb248VCBleHRlbmRzIG5ldyAoLi4uYXJnczogYW55W10pID0+IHt9Pihjb25zdHJ1Y3RvcjogVCkge1xuICAgIHJldHVybiBjbGFzcyBleHRlbmRzIGNvbnN0cnVjdG9yIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxuICAgICAgc3RhdGljIF9faXNEeW5hbWljRm9ybU1vZGVsSW5zdGFuY2VfXyA9IHR5cGVUYWc7XG4gICAgICBzdGF0aWMgW1N5bWJvbC5oYXNJbnN0YW5jZV0oaW5zdGFuY2U6IHsgY29uc3RydWN0b3I6IHsgX19pc0R5bmFtaWNGb3JtTW9kZWxJbnN0YW5jZV9fOiB0eXBlb2YgdHlwZVRhZzsgfTsgfSkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UuY29uc3RydWN0b3IuX19pc0R5bmFtaWNGb3JtTW9kZWxJbnN0YW5jZV9fID09PSB0eXBlVGFnO1xuICAgICAgfVxuXG4gICAgICBnZXRGb3JtRmllbGRzKCk6IFdpZGdldE9wdGlvbnNbXSB7XG4gICAgICAgIHJldHVybiAoUmVmbGVjdC5nZXRNZXRhZGF0YShNZXRhZGF0YUtleXMuRklFTERTLCB0aGlzKSB8fCBbXSkubWFwKFxuICAgICAgICAgIChmaWVsZDogc3RyaW5nKSA9PlxuICAgICAgICAgICAgUmVmbGVjdC5nZXRNZXRhZGF0YShNZXRhZGF0YUtleXMuRk9STV9GSUVMRCwgdGhpcywgZmllbGQpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==