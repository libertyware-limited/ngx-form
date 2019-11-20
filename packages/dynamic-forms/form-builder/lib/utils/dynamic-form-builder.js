"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicFormBuilder = void 0;

require("reflect-metadata");

var _forms = require("@angular/forms");

var _classTransformer = require("class-transformer");

var _dynamicFormGroupConfig = require("../models/dynamic-form-group-config");

var _dynamicFormGroup = require("./dynamic-form-group");

var _dynamicFormControl = require("./dynamic-form-control");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DynamicFormBuilder = function (_FormBuilder) {
  _inherits(DynamicFormBuilder, _FormBuilder);

  function DynamicFormBuilder() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DynamicFormBuilder);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DynamicFormBuilder)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.FormGroupClass = _dynamicFormGroup.DynamicFormGroup;
    _this.FormControlClass = _dynamicFormControl.DynamicFormControl;
    return _this;
  }

  _createClass(DynamicFormBuilder, [{
    key: "group",
    value: function group(factoryModel, controlsConfig, options) {
      var _this2 = this;

      if (controlsConfig && ((0, _dynamicFormGroupConfig.isAbstractControlOptions)(controlsConfig) || (0, _dynamicFormGroupConfig.isLegacyOrOpts)(controlsConfig) || (0, _dynamicFormGroupConfig.isDynamicFormGroupConfig)(controlsConfig)) && !options) {
        return this.group(factoryModel, undefined, controlsConfig);
      }

      if (!controlsConfig) {
        var model = new factoryModel();
        var fields = model.getFormFields();
        controlsConfig = _objectSpread({}, fields.map(function (field) {
          return _defineProperty({}, field.fieldName, '');
        }).reduce(function (rev, current) {
          return _objectSpread({}, rev, {}, current);
        }, {}));
      }

      var extra = options;
      var validators = null;
      var asyncValidators = null;
      var updateOn;

      if (extra != null) {
        if ((0, _dynamicFormGroupConfig.isAbstractControlOptions)(extra)) {
          validators = extra.validators != null ? extra.validators : null;
          asyncValidators = extra.asyncValidators != null ? extra.asyncValidators : null;
          updateOn = extra.updateOn != null ? extra.updateOn : undefined;
        }

        if ((0, _dynamicFormGroupConfig.isLegacyOrOpts)(extra)) {
          validators = validators || [];
          if (extra.validator) validators.push(extra.validator);
          asyncValidators = asyncValidators || [];
          if (extra.asyncValidator) validators.push(extra.asyncValidator);
        }

        if (!(0, _dynamicFormGroupConfig.isDynamicFormGroupConfig)(extra)) {
          extra.customValidatorOptions = {
            validationError: {
              target: false
            }
          };
        }
      }

      var newControlsConfig;

      if (controlsConfig !== undefined) {
        newControlsConfig = controlsConfig;
      }

      if (controlsConfig === undefined) {
        newControlsConfig = _objectSpread({}, this.createEmptyObject(factoryModel));
        Object.keys(newControlsConfig).forEach(function (key) {
          if (canCreateGroup()) {
            newControlsConfig[key] = _this2.group(newControlsConfig[key].constructor, undefined, _objectSpread({}, extra.customValidatorOptions ? {
              customValidatorOptions: extra.customValidatorOptions
            } : {}, {
              asyncValidators: asyncValidators,
              updateOn: updateOn,
              validators: validators
            }));
          } else {
            if (canCreateArray()) {
              if (newControlsConfig[key][0].constructor) {
                newControlsConfig[key] = _get(_getPrototypeOf(DynamicFormBuilder.prototype), "array", _this2).call(_this2, newControlsConfig[key].map(function (newControlsConfigItem) {
                  return _this2.group(newControlsConfigItem.constructor, undefined, _objectSpread({}, extra.customValidatorOptions ? {
                    customValidatorOptions: extra.customValidatorOptions
                  } : {}, {
                    asyncValidators: asyncValidators,
                    updateOn: updateOn,
                    validators: validators
                  }));
                }));
              } else {
                newControlsConfig[key] = _get(_getPrototypeOf(DynamicFormBuilder.prototype), "array", _this2).call(_this2, newControlsConfig[key].map(function (newControlsConfigItem) {
                  return _this2.control(newControlsConfigItem);
                }));
              }
            }
          }

          function canCreateGroup() {
            var candidate = newControlsConfig[key];
            return candidate && !Array.isArray(candidate) && candidate.constructor && _typeof(candidate) === 'object' && (candidate.length === undefined || candidate.length !== undefined && Object.keys(candidate).length === candidate.length);
          }

          function canCreateArray() {
            if (Array.isArray(newControlsConfig[key]) === false) {
              return false;
            }

            var candidate = newControlsConfig[key][0];
            return candidate.constructor && _typeof(candidate) === 'object' && (candidate.length === undefined || candidate.length !== undefined && Object.keys(candidate).length === candidate.length);
          }
        });
      }

      validators = validators && validators.filter(function (validator) {
        return validator;
      });
      asyncValidators = asyncValidators && asyncValidators.filter(function (validator) {
        return validator;
      });
      var classValidators = (0, _dynamicFormGroup.getClassValidators)(factoryModel, newControlsConfig, extra && extra.customValidatorOptions, this.FormControlClass);

      var formGroup = _get(_getPrototypeOf(DynamicFormBuilder.prototype), "group", this).call(this, classValidators, _objectSpread({}, asyncValidators || {}, {}, updateOn || {}, {}, validators || {}));

      var dynamicFormGroup = new _dynamicFormGroup.DynamicFormGroup(factoryModel, newControlsConfig, {
        asyncValidators: asyncValidators,
        updateOn: updateOn,
        validators: validators
      });
      Object.keys(formGroup.controls).forEach(function (key) {
        dynamicFormGroup.addControl(key, formGroup.controls[key]);
      });
      dynamicFormGroup.valueChanges.subscribe(function () {
        return dynamicFormGroup.validate(undefined, extra && extra.customValidatorOptions);
      });
      return dynamicFormGroup;
    }
  }, {
    key: "createEmptyObject",
    value: function createEmptyObject(factoryModel) {
      var _this3 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var modified = false;
      var object = factoryModel ? (0, _classTransformer.plainToClass)(factoryModel, data) : data;
      var fields = Object.keys(object);
      fields.forEach(function (fieldName) {
        if (object[fieldName] && object[fieldName].length !== undefined) {
          if (object[fieldName].length === 1 && Object.keys(object[fieldName][0]).length > 0 && object[fieldName][0].constructor) {
            object[fieldName] = [_this3.createEmptyObject(object[fieldName][0].constructor)];
          }

          if (object[fieldName].length === 0) {
            data[fieldName] = [{}];
            modified = true;
          }
        } else {
          data[fieldName] = undefined;
        }
      });

      if (modified) {
        return this.createEmptyObject(factoryModel, data);
      }

      return object;
    }
  }]);

  return DynamicFormBuilder;
}(_forms.FormBuilder);

exports.DynamicFormBuilder = DynamicFormBuilder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9keW5hbWljLWZvcm0tYnVpbGRlci50cyJdLCJuYW1lcyI6WyJEeW5hbWljRm9ybUJ1aWxkZXIiLCJGb3JtR3JvdXBDbGFzcyIsIkR5bmFtaWNGb3JtR3JvdXAiLCJGb3JtQ29udHJvbENsYXNzIiwiRHluYW1pY0Zvcm1Db250cm9sIiwiZmFjdG9yeU1vZGVsIiwiY29udHJvbHNDb25maWciLCJvcHRpb25zIiwiZ3JvdXAiLCJ1bmRlZmluZWQiLCJtb2RlbCIsImZpZWxkcyIsImdldEZvcm1GaWVsZHMiLCJtYXAiLCJmaWVsZCIsImZpZWxkTmFtZSIsInJlZHVjZSIsInJldiIsImN1cnJlbnQiLCJleHRyYSIsInZhbGlkYXRvcnMiLCJhc3luY1ZhbGlkYXRvcnMiLCJ1cGRhdGVPbiIsInZhbGlkYXRvciIsInB1c2giLCJhc3luY1ZhbGlkYXRvciIsImN1c3RvbVZhbGlkYXRvck9wdGlvbnMiLCJ2YWxpZGF0aW9uRXJyb3IiLCJ0YXJnZXQiLCJuZXdDb250cm9sc0NvbmZpZyIsImNyZWF0ZUVtcHR5T2JqZWN0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjYW5DcmVhdGVHcm91cCIsImNvbnN0cnVjdG9yIiwiY2FuQ3JlYXRlQXJyYXkiLCJuZXdDb250cm9sc0NvbmZpZ0l0ZW0iLCJjb250cm9sIiwiY2FuZGlkYXRlIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiZmlsdGVyIiwiY2xhc3NWYWxpZGF0b3JzIiwiZm9ybUdyb3VwIiwiZHluYW1pY0Zvcm1Hcm91cCIsImNvbnRyb2xzIiwiYWRkQ29udHJvbCIsInZhbHVlQ2hhbmdlcyIsInN1YnNjcmliZSIsInZhbGlkYXRlIiwiZGF0YSIsIm1vZGlmaWVkIiwib2JqZWN0IiwiRm9ybUJ1aWxkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBR0E7O0FBTUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUdhQSxrQjs7Ozs7Ozs7Ozs7Ozs7O1VBRURDLGMsR0FBaUJDLGtDO1VBQ2pCQyxnQixHQUFtQkMsc0M7Ozs7OzswQkFFM0JDLFksRUFDQUMsYyxFQUlBQyxPLEVBQzBCO0FBQUE7O0FBRTFCLFVBQ0VELGNBQWMsS0FDYixzREFBeUJBLGNBQXpCLEtBQ0MsNENBQWVBLGNBQWYsQ0FERCxJQUVDLHNEQUF5QkEsY0FBekIsQ0FIWSxDQUFkLElBSUEsQ0FBQ0MsT0FMSCxFQU1FO0FBQ0EsZUFBTyxLQUFLQyxLQUFMLENBQVdILFlBQVgsRUFBeUJJLFNBQXpCLEVBQW9DSCxjQUFwQyxDQUFQO0FBQ0Q7O0FBR0QsVUFBSSxDQUFDQSxjQUFMLEVBQXFCO0FBQ25CLFlBQU1JLEtBQUssR0FBSSxJQUFJTCxZQUFKLEVBQWY7QUFDQSxZQUFNTSxNQUFNLEdBQUdELEtBQUssQ0FBQ0UsYUFBTixFQUFmO0FBQ0FOLFFBQUFBLGNBQWMscUJBQ1BLLE1BQU0sQ0FDUkUsR0FERSxDQUNFLFVBQUNDLEtBQUQ7QUFBQSxxQ0FDRkEsS0FBSyxDQUFDQyxTQURKLEVBQ2dCLEVBRGhCO0FBQUEsU0FERixFQUlGQyxNQUpFLENBS0QsVUFBQ0MsR0FBRCxFQUFXQyxPQUFYO0FBQUEsbUNBQWtDRCxHQUFsQyxNQUEwQ0MsT0FBMUM7QUFBQSxTQUxDLEVBTUQsRUFOQyxDQURPLENBQWQ7QUFVRDs7QUFFRCxVQUFNQyxLQUE2QixHQUFHWixPQUF0QztBQUVBLFVBQUlhLFVBQWdDLEdBQUcsSUFBdkM7QUFDQSxVQUFJQyxlQUFzQyxHQUFHLElBQTdDO0FBQ0EsVUFBSUMsUUFBSjs7QUFFQSxVQUFJSCxLQUFLLElBQUksSUFBYixFQUFtQjtBQUNqQixZQUFJLHNEQUF5QkEsS0FBekIsQ0FBSixFQUFxQztBQUVuQ0MsVUFBQUEsVUFBVSxHQUFHRCxLQUFLLENBQUNDLFVBQU4sSUFBb0IsSUFBcEIsR0FBMkJELEtBQUssQ0FBQ0MsVUFBakMsR0FBOEMsSUFBM0Q7QUFDQUMsVUFBQUEsZUFBZSxHQUFHRixLQUFLLENBQUNFLGVBQU4sSUFBeUIsSUFBekIsR0FBZ0NGLEtBQUssQ0FBQ0UsZUFBdEMsR0FBd0QsSUFBMUU7QUFDQUMsVUFBQUEsUUFBUSxHQUFHSCxLQUFLLENBQUNHLFFBQU4sSUFBa0IsSUFBbEIsR0FBeUJILEtBQUssQ0FBQ0csUUFBL0IsR0FBMENiLFNBQXJEO0FBQ0Q7O0FBQ0QsWUFBSSw0Q0FBZVUsS0FBZixDQUFKLEVBQTJCO0FBRXpCQyxVQUFBQSxVQUFVLEdBQUdBLFVBQVUsSUFBSSxFQUEzQjtBQUNBLGNBQUlELEtBQUssQ0FBQ0ksU0FBVixFQUFxQkgsVUFBVSxDQUFDSSxJQUFYLENBQWdCTCxLQUFLLENBQUNJLFNBQXRCO0FBRXJCRixVQUFBQSxlQUFlLEdBQUdBLGVBQWUsSUFBSSxFQUFyQztBQUNBLGNBQUlGLEtBQUssQ0FBQ00sY0FBVixFQUEwQkwsVUFBVSxDQUFDSSxJQUFYLENBQWdCTCxLQUFLLENBQUNNLGNBQXRCO0FBQzNCOztBQUVELFlBQUksQ0FBQyxzREFBeUJOLEtBQXpCLENBQUwsRUFBc0M7QUFDcENBLFVBQUFBLEtBQUssQ0FBQ08sc0JBQU4sR0FBK0I7QUFBRUMsWUFBQUEsZUFBZSxFQUFFO0FBQUVDLGNBQUFBLE1BQU0sRUFBRTtBQUFWO0FBQW5CLFdBQS9CO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJQyxpQkFBSjs7QUFFQSxVQUFJdkIsY0FBYyxLQUFLRyxTQUF2QixFQUFrQztBQUNoQ29CLFFBQUFBLGlCQUFpQixHQUFHdkIsY0FBcEI7QUFDRDs7QUFHRCxVQUFJQSxjQUFjLEtBQUtHLFNBQXZCLEVBQWtDO0FBQ2hDb0IsUUFBQUEsaUJBQWlCLHFCQUFRLEtBQUtDLGlCQUFMLENBQXVCekIsWUFBdkIsQ0FBUixDQUFqQjtBQUVBMEIsUUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVlILGlCQUFaLEVBQStCSSxPQUEvQixDQUF1QyxVQUFBQyxHQUFHLEVBQUk7QUFDNUMsY0FBSUMsY0FBYyxFQUFsQixFQUFzQjtBQUVwQk4sWUFBQUEsaUJBQWlCLENBQUNLLEdBQUQsQ0FBakIsR0FBeUIsTUFBSSxDQUFDMUIsS0FBTCxDQUN2QnFCLGlCQUFpQixDQUFDSyxHQUFELENBQWpCLENBQXVCRSxXQURBLEVBRXZCM0IsU0FGdUIsb0JBSWpCVSxLQUFLLENBQUNPLHNCQUFOLEdBQ0E7QUFBRUEsY0FBQUEsc0JBQXNCLEVBQUVQLEtBQUssQ0FBQ087QUFBaEMsYUFEQSxHQUVBLEVBTmlCO0FBT3JCTCxjQUFBQSxlQUFlLEVBQWZBLGVBUHFCO0FBUXJCQyxjQUFBQSxRQUFRLEVBQVJBLFFBUnFCO0FBU3JCRixjQUFBQSxVQUFVLEVBQVZBO0FBVHFCLGVBQXpCO0FBWUQsV0FkRCxNQWNPO0FBQ0wsZ0JBQUlpQixjQUFjLEVBQWxCLEVBQXNCO0FBQ3BCLGtCQUFJUixpQkFBaUIsQ0FBQ0ssR0FBRCxDQUFqQixDQUF1QixDQUF2QixFQUEwQkUsV0FBOUIsRUFBMkM7QUFFekNQLGdCQUFBQSxpQkFBaUIsQ0FBQ0ssR0FBRCxDQUFqQixxRkFDRUwsaUJBQWlCLENBQUNLLEdBQUQsQ0FBakIsQ0FBdUJyQixHQUF2QixDQUEyQixVQUFDeUIscUJBQUQ7QUFBQSx5QkFDekIsTUFBSSxDQUFDOUIsS0FBTCxDQUFXOEIscUJBQXFCLENBQUNGLFdBQWpDLEVBQThDM0IsU0FBOUMsb0JBQ01VLEtBQUssQ0FBQ08sc0JBQU4sR0FDQTtBQUFFQSxvQkFBQUEsc0JBQXNCLEVBQUVQLEtBQUssQ0FBQ087QUFBaEMsbUJBREEsR0FFQSxFQUhOO0FBSUVMLG9CQUFBQSxlQUFlLEVBQWZBLGVBSkY7QUFLRUMsb0JBQUFBLFFBQVEsRUFBUkEsUUFMRjtBQU1FRixvQkFBQUEsVUFBVSxFQUFWQTtBQU5GLHFCQUR5QjtBQUFBLGlCQUEzQixDQURGO0FBWUQsZUFkRCxNQWNPO0FBRUxTLGdCQUFBQSxpQkFBaUIsQ0FBQ0ssR0FBRCxDQUFqQixxRkFDRUwsaUJBQWlCLENBQUNLLEdBQUQsQ0FBakIsQ0FBdUJyQixHQUF2QixDQUEyQixVQUFDeUIscUJBQUQ7QUFBQSx5QkFDekIsTUFBSSxDQUFDQyxPQUFMLENBQWFELHFCQUFiLENBRHlCO0FBQUEsaUJBQTNCLENBREY7QUFLRDtBQUNGO0FBQ0Y7O0FBRUQsbUJBQVNILGNBQVQsR0FBMEI7QUFDeEIsZ0JBQU1LLFNBQVMsR0FBR1gsaUJBQWlCLENBQUNLLEdBQUQsQ0FBbkM7QUFFQSxtQkFDRU0sU0FBUyxJQUNULENBQUNDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixTQUFkLENBREQsSUFFQUEsU0FBUyxDQUFDSixXQUZWLElBR0EsUUFBT0ksU0FBUCxNQUFxQixRQUhyQixLQUlDQSxTQUFTLENBQUNHLE1BQVYsS0FBcUJsQyxTQUFyQixJQUNFK0IsU0FBUyxDQUFDRyxNQUFWLEtBQXFCbEMsU0FBckIsSUFDQ3NCLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZUSxTQUFaLEVBQXVCRyxNQUF2QixLQUFrQ0gsU0FBUyxDQUFDRyxNQU5oRCxDQURGO0FBU0Q7O0FBRUQsbUJBQVNOLGNBQVQsR0FBMEI7QUFDeEIsZ0JBQUlJLEtBQUssQ0FBQ0MsT0FBTixDQUFjYixpQkFBaUIsQ0FBQ0ssR0FBRCxDQUEvQixNQUEwQyxLQUE5QyxFQUFxRDtBQUNuRCxxQkFBTyxLQUFQO0FBQ0Q7O0FBRUQsZ0JBQU1NLFNBQVMsR0FBR1gsaUJBQWlCLENBQUNLLEdBQUQsQ0FBakIsQ0FBdUIsQ0FBdkIsQ0FBbEI7QUFFQSxtQkFDRU0sU0FBUyxDQUFDSixXQUFWLElBQ0EsUUFBT0ksU0FBUCxNQUFxQixRQURyQixLQUVDQSxTQUFTLENBQUNHLE1BQVYsS0FBcUJsQyxTQUFyQixJQUNFK0IsU0FBUyxDQUFDRyxNQUFWLEtBQXFCbEMsU0FBckIsSUFDQ3NCLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZUSxTQUFaLEVBQXVCRyxNQUF2QixLQUFrQ0gsU0FBUyxDQUFDRyxNQUpoRCxDQURGO0FBT0Q7QUFDRixTQXZFRDtBQXdFRDs7QUFHRHZCLE1BQUFBLFVBQVUsR0FBR0EsVUFBVSxJQUFJQSxVQUFVLENBQUN3QixNQUFYLENBQWtCLFVBQUFyQixTQUFTO0FBQUEsZUFBSUEsU0FBSjtBQUFBLE9BQTNCLENBQTNCO0FBQ0FGLE1BQUFBLGVBQWUsR0FDYkEsZUFBZSxJQUFJQSxlQUFlLENBQUN1QixNQUFoQixDQUF1QixVQUFBckIsU0FBUztBQUFBLGVBQUlBLFNBQUo7QUFBQSxPQUFoQyxDQURyQjtBQUlBLFVBQU1zQixlQUFlLEdBQUcsMENBQ3RCeEMsWUFEc0IsRUFFdEJ3QixpQkFGc0IsRUFHdEJWLEtBQUssSUFBSUEsS0FBSyxDQUFDTyxzQkFITyxFQUl0QixLQUFLdkIsZ0JBSmlCLENBQXhCOztBQU1BLFVBQU0yQyxTQUFTLGlGQUFlRCxlQUFmLG9CQUNUeEIsZUFBZSxJQUFJLEVBRFYsTUFFVEMsUUFBUSxJQUFJLEVBRkgsTUFHVEYsVUFBVSxJQUFJLEVBSEwsRUFBZjs7QUFRQSxVQUFNMkIsZ0JBQWdCLEdBQUcsSUFBSTdDLGtDQUFKLENBQ3ZCRyxZQUR1QixFQUV2QndCLGlCQUZ1QixFQUd2QjtBQUNFUixRQUFBQSxlQUFlLEVBQWZBLGVBREY7QUFFRUMsUUFBQUEsUUFBUSxFQUFSQSxRQUZGO0FBR0VGLFFBQUFBLFVBQVUsRUFBVkE7QUFIRixPQUh1QixDQUF6QjtBQVdBVyxNQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWWMsU0FBUyxDQUFDRSxRQUF0QixFQUFnQ2YsT0FBaEMsQ0FBd0MsVUFBQUMsR0FBRyxFQUFJO0FBQzdDYSxRQUFBQSxnQkFBZ0IsQ0FBQ0UsVUFBakIsQ0FBNEJmLEdBQTVCLEVBQWlDWSxTQUFTLENBQUNFLFFBQVYsQ0FBbUJkLEdBQW5CLENBQWpDO0FBQ0QsT0FGRDtBQUtBYSxNQUFBQSxnQkFBZ0IsQ0FBQ0csWUFBakIsQ0FBOEJDLFNBQTlCLENBQXdDO0FBQUEsZUFBTUosZ0JBQWdCLENBQUNLLFFBQWpCLENBQTBCM0MsU0FBMUIsRUFBcUNVLEtBQUssSUFBSUEsS0FBSyxDQUFDTyxzQkFBcEQsQ0FBTjtBQUFBLE9BQXhDO0FBRUEsYUFBT3FCLGdCQUFQO0FBQ0Q7OztzQ0FTQzFDLFksRUFFSztBQUFBOztBQUFBLFVBRExnRCxJQUNLLHVFQUR3QixFQUN4QjtBQUNMLFVBQUlDLFFBQVEsR0FBRyxLQUFmO0FBRUEsVUFBTUMsTUFBVyxHQUFHbEQsWUFBWSxHQUFHLG9DQUFhQSxZQUFiLEVBQTJCZ0QsSUFBM0IsQ0FBSCxHQUFzQ0EsSUFBdEU7QUFDQSxVQUFNMUMsTUFBTSxHQUFHb0IsTUFBTSxDQUFDQyxJQUFQLENBQVl1QixNQUFaLENBQWY7QUFFQTVDLE1BQUFBLE1BQU0sQ0FBQ3NCLE9BQVAsQ0FBZSxVQUFDbEIsU0FBRCxFQUFvQjtBQUNqQyxZQUFJd0MsTUFBTSxDQUFDeEMsU0FBRCxDQUFOLElBQXFCd0MsTUFBTSxDQUFDeEMsU0FBRCxDQUFOLENBQWtCNEIsTUFBbEIsS0FBNkJsQyxTQUF0RCxFQUFpRTtBQUMvRCxjQUNFOEMsTUFBTSxDQUFDeEMsU0FBRCxDQUFOLENBQWtCNEIsTUFBbEIsS0FBNkIsQ0FBN0IsSUFDQVosTUFBTSxDQUFDQyxJQUFQLENBQVl1QixNQUFNLENBQUN4QyxTQUFELENBQU4sQ0FBa0IsQ0FBbEIsQ0FBWixFQUFrQzRCLE1BQWxDLEdBQTJDLENBRDNDLElBRUFZLE1BQU0sQ0FBQ3hDLFNBQUQsQ0FBTixDQUFrQixDQUFsQixFQUFxQnFCLFdBSHZCLEVBSUU7QUFDQW1CLFlBQUFBLE1BQU0sQ0FBQ3hDLFNBQUQsQ0FBTixHQUFvQixDQUNsQixNQUFJLENBQUNlLGlCQUFMLENBQXVCeUIsTUFBTSxDQUFDeEMsU0FBRCxDQUFOLENBQWtCLENBQWxCLEVBQXFCcUIsV0FBNUMsQ0FEa0IsQ0FBcEI7QUFHRDs7QUFFRCxjQUFJbUIsTUFBTSxDQUFDeEMsU0FBRCxDQUFOLENBQWtCNEIsTUFBbEIsS0FBNkIsQ0FBakMsRUFBb0M7QUFDbENVLFlBQUFBLElBQUksQ0FBQ3RDLFNBQUQsQ0FBSixHQUFrQixDQUFDLEVBQUQsQ0FBbEI7QUFDQXVDLFlBQUFBLFFBQVEsR0FBRyxJQUFYO0FBQ0Q7QUFDRixTQWZELE1BZU87QUFDTEQsVUFBQUEsSUFBSSxDQUFDdEMsU0FBRCxDQUFKLEdBQWtCTixTQUFsQjtBQUNEO0FBQ0YsT0FuQkQ7O0FBcUJBLFVBQUk2QyxRQUFKLEVBQWM7QUFDWixlQUFPLEtBQUt4QixpQkFBTCxDQUF1QnpCLFlBQXZCLEVBQXFDZ0QsSUFBckMsQ0FBUDtBQUNEOztBQUVELGFBQU9FLE1BQVA7QUFDRDs7OztFQXhPcUNDLGtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcblxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sT3B0aW9ucywgQXN5bmNWYWxpZGF0b3JGbiwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgcGxhaW5Ub0NsYXNzIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgQ2xhc3NUeXBlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXIvQ2xhc3NUcmFuc2Zvcm1lcic7XG5cbmltcG9ydCB7XG4gIER5bmFtaWNGb3JtR3JvdXBDb25maWcsXG4gIGlzQWJzdHJhY3RDb250cm9sT3B0aW9ucyxcbiAgaXNEeW5hbWljRm9ybUdyb3VwQ29uZmlnLFxuICBpc0xlZ2FjeU9yT3B0c1xufSBmcm9tICcuLi9tb2RlbHMvZHluYW1pYy1mb3JtLWdyb3VwLWNvbmZpZyc7XG5pbXBvcnQgeyBEeW5hbWljRm9ybUdyb3VwLCBGb3JtTW9kZWwsIGdldENsYXNzVmFsaWRhdG9ycyB9IGZyb20gJy4vZHluYW1pYy1mb3JtLWdyb3VwJztcbmltcG9ydCB7IER5bmFtaWNGb3JtQ29udHJvbCB9IGZyb20gJy4vZHluYW1pYy1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm0gfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUJ1aWxkZXIgZXh0ZW5kcyBGb3JtQnVpbGRlciB7XG5cbiAgcHJvdGVjdGVkIEZvcm1Hcm91cENsYXNzID0gRHluYW1pY0Zvcm1Hcm91cDtcbiAgcHJvdGVjdGVkIEZvcm1Db250cm9sQ2xhc3MgPSBEeW5hbWljRm9ybUNvbnRyb2w7XG4gIGdyb3VwPFRNb2RlbD4oXG4gICAgZmFjdG9yeU1vZGVsOiBDbGFzc1R5cGU8VE1vZGVsPixcbiAgICBjb250cm9sc0NvbmZpZz86XG4gICAgICB8IEZvcm1Nb2RlbDxUTW9kZWw+XG4gICAgICB8IER5bmFtaWNGb3JtR3JvdXBDb25maWdcbiAgICAgIHwgeyBba2V5OiBzdHJpbmddOiBhbnkgfSxcbiAgICBvcHRpb25zPzogQWJzdHJhY3RDb250cm9sT3B0aW9ucyB8IER5bmFtaWNGb3JtR3JvdXBDb25maWdcbiAgKTogRHluYW1pY0Zvcm1Hcm91cDxUTW9kZWw+IHtcbiAgICAvLyBQcm9jZXNzIHRoZSBncm91cCB3aXRoIHRoZSBjb250cm9sc0NvbmZpZyBwYXNzZWQgaW50byBleHRyYSBpbnN0ZWFkLiAoV2hhdCBkb2VzIHRoaXMgYWNjb21wbGlzaD8pXG4gICAgaWYgKFxuICAgICAgY29udHJvbHNDb25maWcgJiZcbiAgICAgIChpc0Fic3RyYWN0Q29udHJvbE9wdGlvbnMoY29udHJvbHNDb25maWcpIHx8XG4gICAgICAgIGlzTGVnYWN5T3JPcHRzKGNvbnRyb2xzQ29uZmlnKSB8fFxuICAgICAgICBpc0R5bmFtaWNGb3JtR3JvdXBDb25maWcoY29udHJvbHNDb25maWcpKSAmJlxuICAgICAgIW9wdGlvbnNcbiAgICApIHtcbiAgICAgIHJldHVybiB0aGlzLmdyb3VwKGZhY3RvcnlNb2RlbCwgdW5kZWZpbmVkLCBjb250cm9sc0NvbmZpZyk7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBzZWN0aW9uIG9mIGNvZGUgd2FzIGFkZGVkIGluIGZyb20gdGhlIG9yaWdpbmFsIGNvZGUgLSBKb3JkYW5cbiAgICBpZiAoIWNvbnRyb2xzQ29uZmlnKSB7XG4gICAgICBjb25zdCBtb2RlbCA9IChuZXcgZmFjdG9yeU1vZGVsKCkgYXMgdW5rbm93bikgYXMgRHluYW1pY0Zvcm07XG4gICAgICBjb25zdCBmaWVsZHMgPSBtb2RlbC5nZXRGb3JtRmllbGRzKCk7XG4gICAgICBjb250cm9sc0NvbmZpZyA9IHtcbiAgICAgICAgLi4uKChmaWVsZHNcbiAgICAgICAgICAubWFwKChmaWVsZDogYW55KSA9PiAoe1xuICAgICAgICAgICAgW2ZpZWxkLmZpZWxkTmFtZV06ICcnXG4gICAgICAgICAgfSkpXG4gICAgICAgICAgLnJlZHVjZShcbiAgICAgICAgICAgIChyZXY6IGFueSwgY3VycmVudDogYW55KSA9PiAoeyAuLi5yZXYsIC4uLmN1cnJlbnQgfSksXG4gICAgICAgICAgICB7fVxuICAgICAgICAgICkgYXMgdW5rbm93bikgYXMgRm9ybU1vZGVsPFRNb2RlbD4pXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IGV4dHJhOiBEeW5hbWljRm9ybUdyb3VwQ29uZmlnID0gb3B0aW9ucyBhcyBEeW5hbWljRm9ybUdyb3VwQ29uZmlnO1xuXG4gICAgbGV0IHZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10gfCBudWxsID0gbnVsbDtcbiAgICBsZXQgYXN5bmNWYWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdICB8IG51bGwgPSBudWxsO1xuICAgIGxldCB1cGRhdGVPbjogYW55O1xuXG4gICAgaWYgKGV4dHJhICE9IG51bGwpIHtcbiAgICAgIGlmIChpc0Fic3RyYWN0Q29udHJvbE9wdGlvbnMoZXh0cmEpKSB7XG4gICAgICAgIC8vIGBleHRyYWAgYXJlIGBBYnN0cmFjdENvbnRyb2xPcHRpb25zYFxuICAgICAgICB2YWxpZGF0b3JzID0gZXh0cmEudmFsaWRhdG9ycyAhPSBudWxsID8gZXh0cmEudmFsaWRhdG9ycyA6IG51bGw7XG4gICAgICAgIGFzeW5jVmFsaWRhdG9ycyA9IGV4dHJhLmFzeW5jVmFsaWRhdG9ycyAhPSBudWxsID8gZXh0cmEuYXN5bmNWYWxpZGF0b3JzIDogbnVsbDtcbiAgICAgICAgdXBkYXRlT24gPSBleHRyYS51cGRhdGVPbiAhPSBudWxsID8gZXh0cmEudXBkYXRlT24gOiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoaXNMZWdhY3lPck9wdHMoZXh0cmEpKSB7XG4gICAgICAgIC8vIGBleHRyYWAgYXJlIGxlZ2FjeSBmb3JtIGdyb3VwIG9wdGlvbnNcbiAgICAgICAgdmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMgfHwgW107XG4gICAgICAgIGlmIChleHRyYS52YWxpZGF0b3IpIHZhbGlkYXRvcnMucHVzaChleHRyYS52YWxpZGF0b3IpO1xuXG4gICAgICAgIGFzeW5jVmFsaWRhdG9ycyA9IGFzeW5jVmFsaWRhdG9ycyB8fCBbXTtcbiAgICAgICAgaWYgKGV4dHJhLmFzeW5jVmFsaWRhdG9yKSB2YWxpZGF0b3JzLnB1c2goZXh0cmEuYXN5bmNWYWxpZGF0b3IpO1xuICAgICAgfVxuICAgICAgLy8gU2V0IGRlZmF1bHQgY3VzdG9tVmFsaWRhdG9yT3B0aW9uc1xuICAgICAgaWYgKCFpc0R5bmFtaWNGb3JtR3JvdXBDb25maWcoZXh0cmEpKSB7XG4gICAgICAgIGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnMgPSB7IHZhbGlkYXRpb25FcnJvcjogeyB0YXJnZXQ6IGZhbHNlIH0gfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbmV3Q29udHJvbHNDb25maWc6IEZvcm1Nb2RlbDxUTW9kZWw+IHwgYW55O1xuXG4gICAgaWYgKGNvbnRyb2xzQ29uZmlnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG5ld0NvbnRyb2xzQ29uZmlnID0gY29udHJvbHNDb25maWcgYXMgRm9ybU1vZGVsPFRNb2RlbD47XG4gICAgfVxuXG4gICAgLy8gZXhwZXJpbWVudGFsXG4gICAgaWYgKGNvbnRyb2xzQ29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5ld0NvbnRyb2xzQ29uZmlnID0geyAuLi50aGlzLmNyZWF0ZUVtcHR5T2JqZWN0KGZhY3RvcnlNb2RlbCkgfTtcblxuICAgICAgT2JqZWN0LmtleXMobmV3Q29udHJvbHNDb25maWcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGNhbkNyZWF0ZUdyb3VwKCkpIHtcbiAgICAgICAgICAvLyByZWN1cnNpdmVseSBjcmVhdGUgYSBkeW5hbWljIGdyb3VwIGZvciB0aGUgbmVzdGVkIG9iamVjdFxuICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0gPSB0aGlzLmdyb3VwKFxuICAgICAgICAgICAgbmV3Q29udHJvbHNDb25maWdba2V5XS5jb25zdHJ1Y3RvcixcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgLi4uKGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnNcbiAgICAgICAgICAgICAgICA/IHsgY3VzdG9tVmFsaWRhdG9yT3B0aW9uczogZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9ucyB9XG4gICAgICAgICAgICAgICAgOiB7fSksXG4gICAgICAgICAgICAgIGFzeW5jVmFsaWRhdG9ycyxcbiAgICAgICAgICAgICAgdXBkYXRlT24sXG4gICAgICAgICAgICAgIHZhbGlkYXRvcnNcbiAgICAgICAgICAgIH0gYXMgYW55XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY2FuQ3JlYXRlQXJyYXkoKSkge1xuICAgICAgICAgICAgaWYgKG5ld0NvbnRyb2xzQ29uZmlnW2tleV1bMF0uY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgLy8gcmVjdXJzaXZlbHkgY3JlYXRlIGFuIGFycmF5IHdpdGggYSBncm91cFxuICAgICAgICAgICAgICBuZXdDb250cm9sc0NvbmZpZ1trZXldID0gc3VwZXIuYXJyYXkoXG4gICAgICAgICAgICAgICAgbmV3Q29udHJvbHNDb25maWdba2V5XS5tYXAoKG5ld0NvbnRyb2xzQ29uZmlnSXRlbTogYW55KSA9PlxuICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cChuZXdDb250cm9sc0NvbmZpZ0l0ZW0uY29uc3RydWN0b3IsIHVuZGVmaW5lZCwge1xuICAgICAgICAgICAgICAgICAgICAuLi4oZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgID8geyBjdXN0b21WYWxpZGF0b3JPcHRpb25zOiBleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zIH1cbiAgICAgICAgICAgICAgICAgICAgICA6IHt9KSxcbiAgICAgICAgICAgICAgICAgICAgYXN5bmNWYWxpZGF0b3JzLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVPbixcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yc1xuICAgICAgICAgICAgICAgICAgfSBhcyBhbnkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFuIGFycmF5IG9mIGZvcm0gY29udHJvbHNcbiAgICAgICAgICAgICAgbmV3Q29udHJvbHNDb25maWdba2V5XSA9IHN1cGVyLmFycmF5KFxuICAgICAgICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0ubWFwKChuZXdDb250cm9sc0NvbmZpZ0l0ZW06IGFueSkgPT5cbiAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbChuZXdDb250cm9sc0NvbmZpZ0l0ZW0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNhbkNyZWF0ZUdyb3VwKCkge1xuICAgICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IG5ld0NvbnRyb2xzQ29uZmlnW2tleV07XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgY2FuZGlkYXRlICYmXG4gICAgICAgICAgICAhQXJyYXkuaXNBcnJheShjYW5kaWRhdGUpICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUuY29uc3RydWN0b3IgJiZcbiAgICAgICAgICAgIHR5cGVvZiBjYW5kaWRhdGUgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIChjYW5kaWRhdGUubGVuZ3RoICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjYW5kaWRhdGUpLmxlbmd0aCA9PT0gY2FuZGlkYXRlLmxlbmd0aCkpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNhbkNyZWF0ZUFycmF5KCkge1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5ld0NvbnRyb2xzQ29uZmlnW2tleV0pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IG5ld0NvbnRyb2xzQ29uZmlnW2tleV1bMF07XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgY2FuZGlkYXRlLmNvbnN0cnVjdG9yICYmXG4gICAgICAgICAgICB0eXBlb2YgY2FuZGlkYXRlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5sZW5ndGggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAoY2FuZGlkYXRlLmxlbmd0aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY2FuZGlkYXRlKS5sZW5ndGggPT09IGNhbmRpZGF0ZS5sZW5ndGgpKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSBlbXB0eVxuICAgIHZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzICYmIHZhbGlkYXRvcnMuZmlsdGVyKHZhbGlkYXRvciA9PiB2YWxpZGF0b3IpO1xuICAgIGFzeW5jVmFsaWRhdG9ycyA9XG4gICAgICBhc3luY1ZhbGlkYXRvcnMgJiYgYXN5bmNWYWxpZGF0b3JzLmZpbHRlcih2YWxpZGF0b3IgPT4gdmFsaWRhdG9yKTtcblxuICAgIC8vIENyZWF0ZSBhbiBBbmd1bGFyIGdyb3VwIGZyb20gdGhlIHRvcC1sZXZlbCBvYmplY3RcbiAgICBjb25zdCBjbGFzc1ZhbGlkYXRvcnMgPSBnZXRDbGFzc1ZhbGlkYXRvcnM8VE1vZGVsPihcbiAgICAgIGZhY3RvcnlNb2RlbCxcbiAgICAgIG5ld0NvbnRyb2xzQ29uZmlnLFxuICAgICAgZXh0cmEgJiYgZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9ucyxcbiAgICAgIHRoaXMuRm9ybUNvbnRyb2xDbGFzc1xuICAgICk7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gc3VwZXIuZ3JvdXAoY2xhc3NWYWxpZGF0b3JzLCB7XG4gICAgICAuLi4oYXN5bmNWYWxpZGF0b3JzIHx8IHt9KSxcbiAgICAgIC4uLih1cGRhdGVPbiB8fCB7fSksXG4gICAgICAuLi4odmFsaWRhdG9ycyB8fCB7fSlcbiAgICB9KTtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIHJlc3VsdGluZyBncm91cFxuICAgIC8vIENoYW5nZWQgZnJvbSBpbnRlcm5hbCBGb3JtR3JvdXAgdG8gRHluYW1pY0Zvcm1Hcm91cFxuICAgIGNvbnN0IGR5bmFtaWNGb3JtR3JvdXAgPSBuZXcgRHluYW1pY0Zvcm1Hcm91cDxUTW9kZWw+KFxuICAgICAgZmFjdG9yeU1vZGVsLFxuICAgICAgbmV3Q29udHJvbHNDb25maWcsXG4gICAgICB7XG4gICAgICAgIGFzeW5jVmFsaWRhdG9ycyxcbiAgICAgICAgdXBkYXRlT24sXG4gICAgICAgIHZhbGlkYXRvcnNcbiAgICAgIH0gYXMgYW55XG4gICAgKTtcblxuICAgIC8vIEFkZCBhbGwgYW5ndWxhciBjb250cm9scyB0byB0aGUgcmVzdWx0aW5nIGR5bmFtaWMgZ3JvdXBcbiAgICBPYmplY3Qua2V5cyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGR5bmFtaWNGb3JtR3JvdXAuYWRkQ29udHJvbChrZXksIGZvcm1Hcm91cC5jb250cm9sc1trZXldKTtcbiAgICB9KTtcblxuICAgIC8vIEFkZCBhIGxpc3RlbmVyIHRvIHRoZSBkeW5hbWljIGdyb3VwIGZvciB2YWx1ZSBjaGFuZ2VzOyBvbiBjaGFuZ2UsIGV4ZWN1dGUgdmFsaWRhdGlvblxuICAgIGR5bmFtaWNGb3JtR3JvdXAudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiBkeW5hbWljRm9ybUdyb3VwLnZhbGlkYXRlKHVuZGVmaW5lZCwgZXh0cmEgJiYgZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9ucykpO1xuXG4gICAgcmV0dXJuIGR5bmFtaWNGb3JtR3JvdXA7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqXG4gIC8vIEhlbHBlcnNcblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgY3JlYXRlcyBhbiBlbXB0eSBvYmplY3QgZnJvbSB0aGUgZGF0YSBwcm92aWRlZFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVFbXB0eU9iamVjdDxUTW9kZWw+KFxuICAgIGZhY3RvcnlNb2RlbDogQ2xhc3NUeXBlPFRNb2RlbD4sXG4gICAgZGF0YToge1trZXk6IHN0cmluZ106IGFueX0gPSB7fVxuICApOiBhbnkge1xuICAgIGxldCBtb2RpZmllZCA9IGZhbHNlO1xuXG4gICAgY29uc3Qgb2JqZWN0OiBhbnkgPSBmYWN0b3J5TW9kZWwgPyBwbGFpblRvQ2xhc3MoZmFjdG9yeU1vZGVsLCBkYXRhKSA6IGRhdGE7XG4gICAgY29uc3QgZmllbGRzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcblxuICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZE5hbWU6IGFueSkgPT4ge1xuICAgICAgaWYgKG9iamVjdFtmaWVsZE5hbWVdICYmIG9iamVjdFtmaWVsZE5hbWVdLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBvYmplY3RbZmllbGROYW1lXS5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgICBPYmplY3Qua2V5cyhvYmplY3RbZmllbGROYW1lXVswXSkubGVuZ3RoID4gMCAmJlxuICAgICAgICAgIG9iamVjdFtmaWVsZE5hbWVdWzBdLmNvbnN0cnVjdG9yXG4gICAgICAgICkge1xuICAgICAgICAgIG9iamVjdFtmaWVsZE5hbWVdID0gW1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVFbXB0eU9iamVjdChvYmplY3RbZmllbGROYW1lXVswXS5jb25zdHJ1Y3RvcilcbiAgICAgICAgICBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9iamVjdFtmaWVsZE5hbWVdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGRhdGFbZmllbGROYW1lXSA9IFt7fV07XG4gICAgICAgICAgbW9kaWZpZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhW2ZpZWxkTmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobW9kaWZpZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUVtcHR5T2JqZWN0KGZhY3RvcnlNb2RlbCwgZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxufVxuIl19