"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicFormControl = void 0;

var _forms = require("@angular/forms");

var _ngxFormCore = require("@libertyware/ngx-form-core");

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
      return this.metaData(_ngxFormCore.MetadataKeys.HINT);
    }
  }, {
    key: "readableName",
    get: function get() {
      return this.metaData(_ngxFormCore.MetadataKeys.DISPLAY_NAME) || this.ControlName;
    }
  }, {
    key: "placeholder",
    get: function get() {
      return this.metaData(_ngxFormCore.MetadataKeys.PLACEHOLDER);
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
      return this.metaData(_ngxFormCore.MetadataKeys.RADIO_OPTIONS) || [];
    }
  }, {
    key: "textareaOptions",
    get: function get() {
      return this.metaData(_ngxFormCore.MetadataKeys.TEXTAREA_OPTIONS);
    }
  }]);

  return DynamicFormControl;
}(_forms.FormControl);

exports.DynamicFormControl = DynamicFormControl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9keW5hbWljLWZvcm0tY29udHJvbC50cyJdLCJuYW1lcyI6WyJEeW5hbWljRm9ybUNvbnRyb2wiLCJmaWVsZERlZmluaXRpb24iLCJkYXRhIiwidmFsaWRhdGlvbkZ1bmN0aW9ucyIsInZhbGlkYXRpb25EZWZpbml0aW9ucyIsImtleSIsIlJlZmxlY3QiLCJnZXRNZXRhZGF0YSIsImZvcm1Nb2RlbCIsIkNvbnRyb2xOYW1lIiwicGFyZW50Iiwib2JqZWN0IiwibWV0YURhdGEiLCJNZXRhZGF0YUtleXMiLCJISU5UIiwiRElTUExBWV9OQU1FIiwiUExBQ0VIT0xERVIiLCJjb250cm9scyIsIk9iamVjdCIsImtleXMiLCJmaW5kIiwibmFtZSIsIlJBRElPX09QVElPTlMiLCJURVhUQVJFQV9PUFRJT05TIiwiRm9ybUNvbnRyb2wiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLYUEsa0I7OztBQUdYLDhCQUFZQyxlQUFaLEVBQW9EO0FBQUE7O0FBQUE7O0FBQ2xELDRGQUFNQSxlQUFlLENBQUNDLElBQXRCLEVBQTRCRCxlQUFlLENBQUNFLG1CQUE1QztBQURrRCxVQUY3Q0MscUJBRTZDO0FBR2xELFVBQUtBLHFCQUFMLEdBQTZCSCxlQUFlLENBQUNHLHFCQUE3QztBQUhrRDtBQUluRDs7Ozs2QkFtQmdCQyxHLEVBQWtCO0FBQ2pDLGFBQU9DLE9BQU8sQ0FBQ0MsV0FBUixDQUFvQkYsR0FBcEIsRUFBeUIsS0FBS0csU0FBOUIsRUFBeUMsS0FBS0MsV0FBOUMsQ0FBUDtBQUNEOzs7d0JBbkI0QjtBQUMzQixhQUFRLEtBQUtDLE1BQU4sQ0FBdUNDLE1BQTlDO0FBQ0Q7Ozt3QkFHa0I7QUFDakIsYUFBTyxLQUFLQyxRQUFMLENBQWNDLDBCQUFhQyxJQUEzQixDQUFQO0FBQ0Q7Ozt3QkFFMEI7QUFDekIsYUFBTyxLQUFLRixRQUFMLENBQWNDLDBCQUFhRSxZQUEzQixLQUE0QyxLQUFLTixXQUF4RDtBQUNEOzs7d0JBRXlCO0FBQ3hCLGFBQU8sS0FBS0csUUFBTCxDQUFjQywwQkFBYUcsV0FBM0IsQ0FBUDtBQUNEOzs7d0JBTXlCO0FBQUE7O0FBQ3hCLFVBQU1DLFFBQWEsR0FBRyxLQUFLUCxNQUFMLENBQVlPLFFBQWxDO0FBQ0EsYUFBT0MsTUFBTSxDQUFDQyxJQUFQLENBQVlGLFFBQVosRUFBc0JHLElBQXRCLENBQTJCLFVBQUFDLElBQUk7QUFBQSxlQUFJLE1BQUksS0FBS0osUUFBUSxDQUFDSSxJQUFELENBQXJCO0FBQUEsT0FBL0IsQ0FBUDtBQUNEOzs7d0JBRWlDO0FBQ2hDLGFBQU8sS0FBS1QsUUFBTCxDQUFjQywwQkFBYVMsYUFBM0IsS0FBNkMsRUFBcEQ7QUFDRDs7O3dCQUVxQztBQUNwQyxhQUFPLEtBQUtWLFFBQUwsQ0FBY0MsMEJBQWFVLGdCQUEzQixDQUFQO0FBQ0Q7Ozs7RUF6Q3FDQyxrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbk1ldGFkYXRhIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yL21ldGFkYXRhL1ZhbGlkYXRpb25NZXRhZGF0YSc7XG5pbXBvcnQgeyBNZXRhZGF0YUtleXMsIFJhZGlvT3B0aW9uLCBUZXh0YXJlYU9wdGlvbiB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1jb3JlJztcblxuaW1wb3J0IHsgRHluYW1pY0Zvcm1Hcm91cEZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL2R5bmFtaWMtZm9ybS1ncm91cC1maWVsZCc7XG5pbXBvcnQgeyBEeW5hbWljRm9ybUdyb3VwIH0gZnJvbSAnLi9keW5hbWljLWZvcm0tZ3JvdXAnO1xuXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1Db250cm9sIGV4dGVuZHMgRm9ybUNvbnRyb2wge1xuICBwdWJsaWMgdmFsaWRhdGlvbkRlZmluaXRpb25zOiBWYWxpZGF0aW9uTWV0YWRhdGFbXTtcblxuICBjb25zdHJ1Y3RvcihmaWVsZERlZmluaXRpb246IER5bmFtaWNGb3JtR3JvdXBGaWVsZCkge1xuICAgIHN1cGVyKGZpZWxkRGVmaW5pdGlvbi5kYXRhLCBmaWVsZERlZmluaXRpb24udmFsaWRhdGlvbkZ1bmN0aW9ucyk7XG5cbiAgICB0aGlzLnZhbGlkYXRpb25EZWZpbml0aW9ucyA9IGZpZWxkRGVmaW5pdGlvbi52YWxpZGF0aW9uRGVmaW5pdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIGdldCBmb3JtTW9kZWwoKTogYW55IHtcbiAgICByZXR1cm4gKHRoaXMucGFyZW50IGFzIER5bmFtaWNGb3JtR3JvdXA8YW55Pikub2JqZWN0O1xuICB9XG5cblxuICBnZXQgaGludCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1ldGFEYXRhKE1ldGFkYXRhS2V5cy5ISU5UKTtcbiAgfVxuXG4gIGdldCByZWFkYWJsZU5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tZXRhRGF0YShNZXRhZGF0YUtleXMuRElTUExBWV9OQU1FKSB8fCB0aGlzLkNvbnRyb2xOYW1lO1xuICB9XG5cbiAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubWV0YURhdGEoTWV0YWRhdGFLZXlzLlBMQUNFSE9MREVSKTtcbiAgfVxuXG4gIHByaXZhdGUgbWV0YURhdGEoa2V5OiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiBSZWZsZWN0LmdldE1ldGFkYXRhKGtleSwgdGhpcy5mb3JtTW9kZWwsIHRoaXMuQ29udHJvbE5hbWUpO1xuICB9XG5cbiAgZ2V0IENvbnRyb2xOYW1lKCk6IHN0cmluZyB7XG4gICAgY29uc3QgY29udHJvbHM6IGFueSA9IHRoaXMucGFyZW50LmNvbnRyb2xzO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhjb250cm9scykuZmluZChuYW1lID0+IHRoaXMgPT09IGNvbnRyb2xzW25hbWVdKSBhcyBzdHJpbmc7XG4gIH1cblxuICBnZXQgcmFkaW9PcHRpb25zKCk6IFJhZGlvT3B0aW9uW10ge1xuICAgIHJldHVybiB0aGlzLm1ldGFEYXRhKE1ldGFkYXRhS2V5cy5SQURJT19PUFRJT05TKSB8fCBbXTtcbiAgfVxuXG4gIGdldCB0ZXh0YXJlYU9wdGlvbnMoKTogVGV4dGFyZWFPcHRpb24ge1xuICAgIHJldHVybiB0aGlzLm1ldGFEYXRhKE1ldGFkYXRhS2V5cy5URVhUQVJFQV9PUFRJT05TKTtcbiAgfVxufVxuIl19