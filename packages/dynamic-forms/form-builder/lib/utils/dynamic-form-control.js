"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicFormControl = void 0;

var _forms = require("@angular/forms");

var _core = require("@oop-dynmic-forms/core");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DynamicFormControl = function (_FormControl) {
  _inherits(DynamicFormControl, _FormControl);

  function DynamicFormControl(fieldDefinition) {
    var _this;

    _classCallCheck(this, DynamicFormControl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DynamicFormControl).call(this, fieldDefinition.data, fieldDefinition.validationFunctions));
    _this.validationDefinitions = void 0;
    _this.validationDefinitions = fieldDefinition.validationDefinitions;
    return _this;
  }

  _createClass(DynamicFormControl, [{
    key: "metaData",
    value: function metaData(key) {
      return Reflect.getMetadata(key, this.formModel, this.ControlName);
    }
  }, {
    key: "formModel",
    get: function get() {
      return this.parent.object;
    }
  }, {
    key: "hint",
    get: function get() {
      return this.metaData(_core.MetadataKeys.HINT);
    }
  }, {
    key: "readableName",
    get: function get() {
      return this.metaData(_core.MetadataKeys.DISPLAY_NAME) || this.ControlName;
    }
  }, {
    key: "placeholder",
    get: function get() {
      return this.metaData(_core.MetadataKeys.PLACEHOLDER);
    }
  }, {
    key: "ControlName",
    get: function get() {
      var _this2 = this;

      var controls = this.parent.controls;
      return Object.keys(controls).find(function (name) {
        return _this2 === controls[name];
      });
    }
  }, {
    key: "radioOptions",
    get: function get() {
      return this.metaData(_core.MetadataKeys.RADIO_OPTIONS) || [];
    }
  }, {
    key: "textareaOptions",
    get: function get() {
      return this.metaData(_core.MetadataKeys.TEXTAREA_OPTIONS);
    }
  }]);

  return DynamicFormControl;
}(_forms.FormControl);

exports.DynamicFormControl = DynamicFormControl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9keW5hbWljLWZvcm0tY29udHJvbC50cyJdLCJuYW1lcyI6WyJEeW5hbWljRm9ybUNvbnRyb2wiLCJmaWVsZERlZmluaXRpb24iLCJkYXRhIiwidmFsaWRhdGlvbkZ1bmN0aW9ucyIsInZhbGlkYXRpb25EZWZpbml0aW9ucyIsImtleSIsIlJlZmxlY3QiLCJnZXRNZXRhZGF0YSIsImZvcm1Nb2RlbCIsIkNvbnRyb2xOYW1lIiwicGFyZW50Iiwib2JqZWN0IiwibWV0YURhdGEiLCJNZXRhZGF0YUtleXMiLCJISU5UIiwiRElTUExBWV9OQU1FIiwiUExBQ0VIT0xERVIiLCJjb250cm9scyIsIk9iamVjdCIsImtleXMiLCJmaW5kIiwibmFtZSIsIlJBRElPX09QVElPTlMiLCJURVhUQVJFQV9PUFRJT05TIiwiRm9ybUNvbnRyb2wiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLYUEsa0I7OztBQUdYLDhCQUFZQyxlQUFaLEVBQW9EO0FBQUE7O0FBQUE7O0FBQ2xELDRGQUFNQSxlQUFlLENBQUNDLElBQXRCLEVBQTRCRCxlQUFlLENBQUNFLG1CQUE1QztBQURrRCxVQUY3Q0MscUJBRTZDO0FBR2xELFVBQUtBLHFCQUFMLEdBQTZCSCxlQUFlLENBQUNHLHFCQUE3QztBQUhrRDtBQUluRDs7Ozs2QkFtQmdCQyxHLEVBQWtCO0FBQ2pDLGFBQU9DLE9BQU8sQ0FBQ0MsV0FBUixDQUFvQkYsR0FBcEIsRUFBeUIsS0FBS0csU0FBOUIsRUFBeUMsS0FBS0MsV0FBOUMsQ0FBUDtBQUNEOzs7d0JBbkI0QjtBQUMzQixhQUFRLEtBQUtDLE1BQU4sQ0FBdUNDLE1BQTlDO0FBQ0Q7Ozt3QkFHa0I7QUFDakIsYUFBTyxLQUFLQyxRQUFMLENBQWNDLG1CQUFhQyxJQUEzQixDQUFQO0FBQ0Q7Ozt3QkFFMEI7QUFDekIsYUFBTyxLQUFLRixRQUFMLENBQWNDLG1CQUFhRSxZQUEzQixLQUE0QyxLQUFLTixXQUF4RDtBQUNEOzs7d0JBRXlCO0FBQ3hCLGFBQU8sS0FBS0csUUFBTCxDQUFjQyxtQkFBYUcsV0FBM0IsQ0FBUDtBQUNEOzs7d0JBTXlCO0FBQUE7O0FBQ3hCLFVBQU1DLFFBQWEsR0FBRyxLQUFLUCxNQUFMLENBQVlPLFFBQWxDO0FBQ0EsYUFBT0MsTUFBTSxDQUFDQyxJQUFQLENBQVlGLFFBQVosRUFBc0JHLElBQXRCLENBQTJCLFVBQUFDLElBQUk7QUFBQSxlQUFJLE1BQUksS0FBS0osUUFBUSxDQUFDSSxJQUFELENBQXJCO0FBQUEsT0FBL0IsQ0FBUDtBQUNEOzs7d0JBRWlDO0FBQ2hDLGFBQU8sS0FBS1QsUUFBTCxDQUFjQyxtQkFBYVMsYUFBM0IsS0FBNkMsRUFBcEQ7QUFDRDs7O3dCQUVxQztBQUNwQyxhQUFPLEtBQUtWLFFBQUwsQ0FBY0MsbUJBQWFVLGdCQUEzQixDQUFQO0FBQ0Q7Ozs7RUF6Q3FDQyxrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbk1ldGFkYXRhIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yL21ldGFkYXRhL1ZhbGlkYXRpb25NZXRhZGF0YSc7XG5pbXBvcnQgeyBNZXRhZGF0YUtleXMsIFJhZGlvT3B0aW9uLCBUZXh0YXJlYU9wdGlvbiB9IGZyb20gJ0Bvb3AtZHlubWljLWZvcm1zL2NvcmUnO1xuXG5pbXBvcnQgeyBEeW5hbWljRm9ybUdyb3VwRmllbGQgfSBmcm9tICcuLi9tb2RlbHMvZHluYW1pYy1mb3JtLWdyb3VwLWZpZWxkJztcbmltcG9ydCB7IER5bmFtaWNGb3JtR3JvdXAgfSBmcm9tICcuL2R5bmFtaWMtZm9ybS1ncm91cCc7XG5cbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUNvbnRyb2wgZXh0ZW5kcyBGb3JtQ29udHJvbCB7XG4gIHB1YmxpYyB2YWxpZGF0aW9uRGVmaW5pdGlvbnM6IFZhbGlkYXRpb25NZXRhZGF0YVtdO1xuXG4gIGNvbnN0cnVjdG9yKGZpZWxkRGVmaW5pdGlvbjogRHluYW1pY0Zvcm1Hcm91cEZpZWxkKSB7XG4gICAgc3VwZXIoZmllbGREZWZpbml0aW9uLmRhdGEsIGZpZWxkRGVmaW5pdGlvbi52YWxpZGF0aW9uRnVuY3Rpb25zKTtcblxuICAgIHRoaXMudmFsaWRhdGlvbkRlZmluaXRpb25zID0gZmllbGREZWZpbml0aW9uLnZhbGlkYXRpb25EZWZpbml0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGZvcm1Nb2RlbCgpOiBhbnkge1xuICAgIHJldHVybiAodGhpcy5wYXJlbnQgYXMgRHluYW1pY0Zvcm1Hcm91cDxhbnk+KS5vYmplY3Q7XG4gIH1cblxuXG4gIGdldCBoaW50KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubWV0YURhdGEoTWV0YWRhdGFLZXlzLkhJTlQpO1xuICB9XG5cbiAgZ2V0IHJlYWRhYmxlTmFtZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1ldGFEYXRhKE1ldGFkYXRhS2V5cy5ESVNQTEFZX05BTUUpIHx8IHRoaXMuQ29udHJvbE5hbWU7XG4gIH1cblxuICBnZXQgcGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tZXRhRGF0YShNZXRhZGF0YUtleXMuUExBQ0VIT0xERVIpO1xuICB9XG5cbiAgcHJpdmF0ZSBtZXRhRGF0YShrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIFJlZmxlY3QuZ2V0TWV0YWRhdGEoa2V5LCB0aGlzLmZvcm1Nb2RlbCwgdGhpcy5Db250cm9sTmFtZSk7XG4gIH1cblxuICBnZXQgQ29udHJvbE5hbWUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBjb250cm9sczogYW55ID0gdGhpcy5wYXJlbnQuY29udHJvbHM7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGNvbnRyb2xzKS5maW5kKG5hbWUgPT4gdGhpcyA9PT0gY29udHJvbHNbbmFtZV0pIGFzIHN0cmluZztcbiAgfVxuXG4gIGdldCByYWRpb09wdGlvbnMoKTogUmFkaW9PcHRpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMubWV0YURhdGEoTWV0YWRhdGFLZXlzLlJBRElPX09QVElPTlMpIHx8IFtdO1xuICB9XG5cbiAgZ2V0IHRleHRhcmVhT3B0aW9ucygpOiBUZXh0YXJlYU9wdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMubWV0YURhdGEoTWV0YWRhdGFLZXlzLlRFWFRBUkVBX09QVElPTlMpO1xuICB9XG59XG4iXX0=