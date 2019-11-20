"use strict";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9keW5hbWljLWZvcm0tYnVpbGRlci50cyJdLCJuYW1lcyI6WyJEeW5hbWljRm9ybUJ1aWxkZXIiLCJGb3JtR3JvdXBDbGFzcyIsIkR5bmFtaWNGb3JtR3JvdXAiLCJGb3JtQ29udHJvbENsYXNzIiwiRHluYW1pY0Zvcm1Db250cm9sIiwiZmFjdG9yeU1vZGVsIiwiY29udHJvbHNDb25maWciLCJvcHRpb25zIiwiZ3JvdXAiLCJ1bmRlZmluZWQiLCJtb2RlbCIsImZpZWxkcyIsImdldEZvcm1GaWVsZHMiLCJtYXAiLCJmaWVsZCIsImZpZWxkTmFtZSIsInJlZHVjZSIsInJldiIsImN1cnJlbnQiLCJleHRyYSIsInZhbGlkYXRvcnMiLCJhc3luY1ZhbGlkYXRvcnMiLCJ1cGRhdGVPbiIsInZhbGlkYXRvciIsInB1c2giLCJhc3luY1ZhbGlkYXRvciIsImN1c3RvbVZhbGlkYXRvck9wdGlvbnMiLCJ2YWxpZGF0aW9uRXJyb3IiLCJ0YXJnZXQiLCJuZXdDb250cm9sc0NvbmZpZyIsImNyZWF0ZUVtcHR5T2JqZWN0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjYW5DcmVhdGVHcm91cCIsImNvbnN0cnVjdG9yIiwiY2FuQ3JlYXRlQXJyYXkiLCJuZXdDb250cm9sc0NvbmZpZ0l0ZW0iLCJjb250cm9sIiwiY2FuZGlkYXRlIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiZmlsdGVyIiwiY2xhc3NWYWxpZGF0b3JzIiwiZm9ybUdyb3VwIiwiZHluYW1pY0Zvcm1Hcm91cCIsImNvbnRyb2xzIiwiYWRkQ29udHJvbCIsInZhbHVlQ2hhbmdlcyIsInN1YnNjcmliZSIsInZhbGlkYXRlIiwiZGF0YSIsIm1vZGlmaWVkIiwib2JqZWN0IiwiRm9ybUJ1aWxkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFHQTs7QUFNQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR2FB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QU8sS0FBS3hCLGlCQUFMLENBQXVCekIsWUFBdkIsRUFBcUNnRCxJQUFyQyxDQUFQO0FBQ0Q7O0FBRUQsYUFBT0UsTUFBUDtBQUNEOzs7O0VBeE9xQ0Msa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2xPcHRpb25zLCBBc3luY1ZhbGlkYXRvckZuLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBwbGFpblRvQ2xhc3MgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBDbGFzc1R5cGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lci9DbGFzc1RyYW5zZm9ybWVyJztcblxuaW1wb3J0IHtcbiAgRHluYW1pY0Zvcm1Hcm91cENvbmZpZyxcbiAgaXNBYnN0cmFjdENvbnRyb2xPcHRpb25zLFxuICBpc0R5bmFtaWNGb3JtR3JvdXBDb25maWcsXG4gIGlzTGVnYWN5T3JPcHRzXG59IGZyb20gJy4uL21vZGVscy9keW5hbWljLWZvcm0tZ3JvdXAtY29uZmlnJztcbmltcG9ydCB7IER5bmFtaWNGb3JtR3JvdXAsIEZvcm1Nb2RlbCwgZ2V0Q2xhc3NWYWxpZGF0b3JzIH0gZnJvbSAnLi9keW5hbWljLWZvcm0tZ3JvdXAnO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm1Db250cm9sIH0gZnJvbSAnLi9keW5hbWljLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBEeW5hbWljRm9ybSB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1jb3JlJztcblxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtQnVpbGRlciBleHRlbmRzIEZvcm1CdWlsZGVyIHtcblxuICBwcm90ZWN0ZWQgRm9ybUdyb3VwQ2xhc3MgPSBEeW5hbWljRm9ybUdyb3VwO1xuICBwcm90ZWN0ZWQgRm9ybUNvbnRyb2xDbGFzcyA9IER5bmFtaWNGb3JtQ29udHJvbDtcbiAgZ3JvdXA8VE1vZGVsPihcbiAgICBmYWN0b3J5TW9kZWw6IENsYXNzVHlwZTxUTW9kZWw+LFxuICAgIGNvbnRyb2xzQ29uZmlnPzpcbiAgICAgIHwgRm9ybU1vZGVsPFRNb2RlbD5cbiAgICAgIHwgRHluYW1pY0Zvcm1Hcm91cENvbmZpZ1xuICAgICAgfCB7IFtrZXk6IHN0cmluZ106IGFueSB9LFxuICAgIG9wdGlvbnM/OiBBYnN0cmFjdENvbnRyb2xPcHRpb25zIHwgRHluYW1pY0Zvcm1Hcm91cENvbmZpZ1xuICApOiBEeW5hbWljRm9ybUdyb3VwPFRNb2RlbD4ge1xuICAgIC8vIFByb2Nlc3MgdGhlIGdyb3VwIHdpdGggdGhlIGNvbnRyb2xzQ29uZmlnIHBhc3NlZCBpbnRvIGV4dHJhIGluc3RlYWQuIChXaGF0IGRvZXMgdGhpcyBhY2NvbXBsaXNoPylcbiAgICBpZiAoXG4gICAgICBjb250cm9sc0NvbmZpZyAmJlxuICAgICAgKGlzQWJzdHJhY3RDb250cm9sT3B0aW9ucyhjb250cm9sc0NvbmZpZykgfHxcbiAgICAgICAgaXNMZWdhY3lPck9wdHMoY29udHJvbHNDb25maWcpIHx8XG4gICAgICAgIGlzRHluYW1pY0Zvcm1Hcm91cENvbmZpZyhjb250cm9sc0NvbmZpZykpICYmXG4gICAgICAhb3B0aW9uc1xuICAgICkge1xuICAgICAgcmV0dXJuIHRoaXMuZ3JvdXAoZmFjdG9yeU1vZGVsLCB1bmRlZmluZWQsIGNvbnRyb2xzQ29uZmlnKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIHNlY3Rpb24gb2YgY29kZSB3YXMgYWRkZWQgaW4gZnJvbSB0aGUgb3JpZ2luYWwgY29kZSAtIEpvcmRhblxuICAgIGlmICghY29udHJvbHNDb25maWcpIHtcbiAgICAgIGNvbnN0IG1vZGVsID0gKG5ldyBmYWN0b3J5TW9kZWwoKSBhcyB1bmtub3duKSBhcyBEeW5hbWljRm9ybTtcbiAgICAgIGNvbnN0IGZpZWxkcyA9IG1vZGVsLmdldEZvcm1GaWVsZHMoKTtcbiAgICAgIGNvbnRyb2xzQ29uZmlnID0ge1xuICAgICAgICAuLi4oKGZpZWxkc1xuICAgICAgICAgIC5tYXAoKGZpZWxkOiBhbnkpID0+ICh7XG4gICAgICAgICAgICBbZmllbGQuZmllbGROYW1lXTogJydcbiAgICAgICAgICB9KSlcbiAgICAgICAgICAucmVkdWNlKFxuICAgICAgICAgICAgKHJldjogYW55LCBjdXJyZW50OiBhbnkpID0+ICh7IC4uLnJldiwgLi4uY3VycmVudCB9KSxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKSBhcyB1bmtub3duKSBhcyBGb3JtTW9kZWw8VE1vZGVsPilcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgZXh0cmE6IER5bmFtaWNGb3JtR3JvdXBDb25maWcgPSBvcHRpb25zIGFzIER5bmFtaWNGb3JtR3JvdXBDb25maWc7XG5cbiAgICBsZXQgdmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXSB8IG51bGwgPSBudWxsO1xuICAgIGxldCBhc3luY1ZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10gIHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IHVwZGF0ZU9uOiBhbnk7XG5cbiAgICBpZiAoZXh0cmEgIT0gbnVsbCkge1xuICAgICAgaWYgKGlzQWJzdHJhY3RDb250cm9sT3B0aW9ucyhleHRyYSkpIHtcbiAgICAgICAgLy8gYGV4dHJhYCBhcmUgYEFic3RyYWN0Q29udHJvbE9wdGlvbnNgXG4gICAgICAgIHZhbGlkYXRvcnMgPSBleHRyYS52YWxpZGF0b3JzICE9IG51bGwgPyBleHRyYS52YWxpZGF0b3JzIDogbnVsbDtcbiAgICAgICAgYXN5bmNWYWxpZGF0b3JzID0gZXh0cmEuYXN5bmNWYWxpZGF0b3JzICE9IG51bGwgPyBleHRyYS5hc3luY1ZhbGlkYXRvcnMgOiBudWxsO1xuICAgICAgICB1cGRhdGVPbiA9IGV4dHJhLnVwZGF0ZU9uICE9IG51bGwgPyBleHRyYS51cGRhdGVPbiA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChpc0xlZ2FjeU9yT3B0cyhleHRyYSkpIHtcbiAgICAgICAgLy8gYGV4dHJhYCBhcmUgbGVnYWN5IGZvcm0gZ3JvdXAgb3B0aW9uc1xuICAgICAgICB2YWxpZGF0b3JzID0gdmFsaWRhdG9ycyB8fCBbXTtcbiAgICAgICAgaWYgKGV4dHJhLnZhbGlkYXRvcikgdmFsaWRhdG9ycy5wdXNoKGV4dHJhLnZhbGlkYXRvcik7XG5cbiAgICAgICAgYXN5bmNWYWxpZGF0b3JzID0gYXN5bmNWYWxpZGF0b3JzIHx8IFtdO1xuICAgICAgICBpZiAoZXh0cmEuYXN5bmNWYWxpZGF0b3IpIHZhbGlkYXRvcnMucHVzaChleHRyYS5hc3luY1ZhbGlkYXRvcik7XG4gICAgICB9XG4gICAgICAvLyBTZXQgZGVmYXVsdCBjdXN0b21WYWxpZGF0b3JPcHRpb25zXG4gICAgICBpZiAoIWlzRHluYW1pY0Zvcm1Hcm91cENvbmZpZyhleHRyYSkpIHtcbiAgICAgICAgZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9ucyA9IHsgdmFsaWRhdGlvbkVycm9yOiB7IHRhcmdldDogZmFsc2UgfSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBuZXdDb250cm9sc0NvbmZpZzogRm9ybU1vZGVsPFRNb2RlbD4gfCBhbnk7XG5cbiAgICBpZiAoY29udHJvbHNDb25maWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbmV3Q29udHJvbHNDb25maWcgPSBjb250cm9sc0NvbmZpZyBhcyBGb3JtTW9kZWw8VE1vZGVsPjtcbiAgICB9XG5cbiAgICAvLyBleHBlcmltZW50YWxcbiAgICBpZiAoY29udHJvbHNDb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbmV3Q29udHJvbHNDb25maWcgPSB7IC4uLnRoaXMuY3JlYXRlRW1wdHlPYmplY3QoZmFjdG9yeU1vZGVsKSB9O1xuXG4gICAgICBPYmplY3Qua2V5cyhuZXdDb250cm9sc0NvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoY2FuQ3JlYXRlR3JvdXAoKSkge1xuICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGNyZWF0ZSBhIGR5bmFtaWMgZ3JvdXAgZm9yIHRoZSBuZXN0ZWQgb2JqZWN0XG4gICAgICAgICAgbmV3Q29udHJvbHNDb25maWdba2V5XSA9IHRoaXMuZ3JvdXAoXG4gICAgICAgICAgICBuZXdDb250cm9sc0NvbmZpZ1trZXldLmNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAuLi4oZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9uc1xuICAgICAgICAgICAgICAgID8geyBjdXN0b21WYWxpZGF0b3JPcHRpb25zOiBleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zIH1cbiAgICAgICAgICAgICAgICA6IHt9KSxcbiAgICAgICAgICAgICAgYXN5bmNWYWxpZGF0b3JzLFxuICAgICAgICAgICAgICB1cGRhdGVPbixcbiAgICAgICAgICAgICAgdmFsaWRhdG9yc1xuICAgICAgICAgICAgfSBhcyBhbnlcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjYW5DcmVhdGVBcnJheSgpKSB7XG4gICAgICAgICAgICBpZiAobmV3Q29udHJvbHNDb25maWdba2V5XVswXS5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAvLyByZWN1cnNpdmVseSBjcmVhdGUgYW4gYXJyYXkgd2l0aCBhIGdyb3VwXG4gICAgICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0gPSBzdXBlci5hcnJheShcbiAgICAgICAgICAgICAgICBuZXdDb250cm9sc0NvbmZpZ1trZXldLm1hcCgobmV3Q29udHJvbHNDb25maWdJdGVtOiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwKG5ld0NvbnRyb2xzQ29uZmlnSXRlbS5jb25zdHJ1Y3RvciwgdW5kZWZpbmVkLCB7XG4gICAgICAgICAgICAgICAgICAgIC4uLihleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgPyB7IGN1c3RvbVZhbGlkYXRvck9wdGlvbnM6IGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnMgfVxuICAgICAgICAgICAgICAgICAgICAgIDoge30pLFxuICAgICAgICAgICAgICAgICAgICBhc3luY1ZhbGlkYXRvcnMsXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZU9uLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzXG4gICAgICAgICAgICAgICAgICB9IGFzIGFueSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBDcmVhdGUgYW4gYXJyYXkgb2YgZm9ybSBjb250cm9sc1xuICAgICAgICAgICAgICBuZXdDb250cm9sc0NvbmZpZ1trZXldID0gc3VwZXIuYXJyYXkoXG4gICAgICAgICAgICAgICAgbmV3Q29udHJvbHNDb25maWdba2V5XS5tYXAoKG5ld0NvbnRyb2xzQ29uZmlnSXRlbTogYW55KSA9PlxuICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sKG5ld0NvbnRyb2xzQ29uZmlnSXRlbSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2FuQ3JlYXRlR3JvdXAoKSB7XG4gICAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gbmV3Q29udHJvbHNDb25maWdba2V5XTtcblxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBjYW5kaWRhdGUgJiZcbiAgICAgICAgICAgICFBcnJheS5pc0FycmF5KGNhbmRpZGF0ZSkgJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5jb25zdHJ1Y3RvciAmJlxuICAgICAgICAgICAgdHlwZW9mIGNhbmRpZGF0ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUubGVuZ3RoID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgKGNhbmRpZGF0ZS5sZW5ndGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNhbmRpZGF0ZSkubGVuZ3RoID09PSBjYW5kaWRhdGUubGVuZ3RoKSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2FuQ3JlYXRlQXJyYXkoKSB7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmV3Q29udHJvbHNDb25maWdba2V5XSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gbmV3Q29udHJvbHNDb25maWdba2V5XVswXTtcblxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBjYW5kaWRhdGUuY29uc3RydWN0b3IgJiZcbiAgICAgICAgICAgIHR5cGVvZiBjYW5kaWRhdGUgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIChjYW5kaWRhdGUubGVuZ3RoICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjYW5kaWRhdGUpLmxlbmd0aCA9PT0gY2FuZGlkYXRlLmxlbmd0aCkpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGVtcHR5XG4gICAgdmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMgJiYgdmFsaWRhdG9ycy5maWx0ZXIodmFsaWRhdG9yID0+IHZhbGlkYXRvcik7XG4gICAgYXN5bmNWYWxpZGF0b3JzID1cbiAgICAgIGFzeW5jVmFsaWRhdG9ycyAmJiBhc3luY1ZhbGlkYXRvcnMuZmlsdGVyKHZhbGlkYXRvciA9PiB2YWxpZGF0b3IpO1xuXG4gICAgLy8gQ3JlYXRlIGFuIEFuZ3VsYXIgZ3JvdXAgZnJvbSB0aGUgdG9wLWxldmVsIG9iamVjdFxuICAgIGNvbnN0IGNsYXNzVmFsaWRhdG9ycyA9IGdldENsYXNzVmFsaWRhdG9yczxUTW9kZWw+KFxuICAgICAgZmFjdG9yeU1vZGVsLFxuICAgICAgbmV3Q29udHJvbHNDb25maWcsXG4gICAgICBleHRyYSAmJiBleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zLFxuICAgICAgdGhpcy5Gb3JtQ29udHJvbENsYXNzXG4gICAgKTtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSBzdXBlci5ncm91cChjbGFzc1ZhbGlkYXRvcnMsIHtcbiAgICAgIC4uLihhc3luY1ZhbGlkYXRvcnMgfHwge30pLFxuICAgICAgLi4uKHVwZGF0ZU9uIHx8IHt9KSxcbiAgICAgIC4uLih2YWxpZGF0b3JzIHx8IHt9KVxuICAgIH0pO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgcmVzdWx0aW5nIGdyb3VwXG4gICAgLy8gQ2hhbmdlZCBmcm9tIGludGVybmFsIEZvcm1Hcm91cCB0byBEeW5hbWljRm9ybUdyb3VwXG4gICAgY29uc3QgZHluYW1pY0Zvcm1Hcm91cCA9IG5ldyBEeW5hbWljRm9ybUdyb3VwPFRNb2RlbD4oXG4gICAgICBmYWN0b3J5TW9kZWwsXG4gICAgICBuZXdDb250cm9sc0NvbmZpZyxcbiAgICAgIHtcbiAgICAgICAgYXN5bmNWYWxpZGF0b3JzLFxuICAgICAgICB1cGRhdGVPbixcbiAgICAgICAgdmFsaWRhdG9yc1xuICAgICAgfSBhcyBhbnlcbiAgICApO1xuXG4gICAgLy8gQWRkIGFsbCBhbmd1bGFyIGNvbnRyb2xzIHRvIHRoZSByZXN1bHRpbmcgZHluYW1pYyBncm91cFxuICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgZHluYW1pY0Zvcm1Hcm91cC5hZGRDb250cm9sKGtleSwgZm9ybUdyb3VwLmNvbnRyb2xzW2tleV0pO1xuICAgIH0pO1xuXG4gICAgLy8gQWRkIGEgbGlzdGVuZXIgdG8gdGhlIGR5bmFtaWMgZ3JvdXAgZm9yIHZhbHVlIGNoYW5nZXM7IG9uIGNoYW5nZSwgZXhlY3V0ZSB2YWxpZGF0aW9uXG4gICAgZHluYW1pY0Zvcm1Hcm91cC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IGR5bmFtaWNGb3JtR3JvdXAudmFsaWRhdGUodW5kZWZpbmVkLCBleHRyYSAmJiBleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zKSk7XG5cbiAgICByZXR1cm4gZHluYW1pY0Zvcm1Hcm91cDtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKipcbiAgLy8gSGVscGVyc1xuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBjcmVhdGVzIGFuIGVtcHR5IG9iamVjdCBmcm9tIHRoZSBkYXRhIHByb3ZpZGVkXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUVtcHR5T2JqZWN0PFRNb2RlbD4oXG4gICAgZmFjdG9yeU1vZGVsOiBDbGFzc1R5cGU8VE1vZGVsPixcbiAgICBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9XG4gICk6IGFueSB7XG4gICAgbGV0IG1vZGlmaWVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBvYmplY3Q6IGFueSA9IGZhY3RvcnlNb2RlbCA/IHBsYWluVG9DbGFzcyhmYWN0b3J5TW9kZWwsIGRhdGEpIDogZGF0YTtcbiAgICBjb25zdCBmaWVsZHMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuXG4gICAgZmllbGRzLmZvckVhY2goKGZpZWxkTmFtZTogYW55KSA9PiB7XG4gICAgICBpZiAob2JqZWN0W2ZpZWxkTmFtZV0gJiYgb2JqZWN0W2ZpZWxkTmFtZV0ubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG9iamVjdFtmaWVsZE5hbWVdLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICAgIE9iamVjdC5rZXlzKG9iamVjdFtmaWVsZE5hbWVdWzBdKS5sZW5ndGggPiAwICYmXG4gICAgICAgICAgb2JqZWN0W2ZpZWxkTmFtZV1bMF0uY29uc3RydWN0b3JcbiAgICAgICAgKSB7XG4gICAgICAgICAgb2JqZWN0W2ZpZWxkTmFtZV0gPSBbXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUVtcHR5T2JqZWN0KG9iamVjdFtmaWVsZE5hbWVdWzBdLmNvbnN0cnVjdG9yKVxuICAgICAgICAgIF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2JqZWN0W2ZpZWxkTmFtZV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZGF0YVtmaWVsZE5hbWVdID0gW3t9XTtcbiAgICAgICAgICBtb2RpZmllZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGFbZmllbGROYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChtb2RpZmllZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRW1wdHlPYmplY3QoZmFjdG9yeU1vZGVsLCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG59XG4iXX0=