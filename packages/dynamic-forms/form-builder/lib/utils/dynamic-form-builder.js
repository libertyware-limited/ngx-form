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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9keW5hbWljLWZvcm0tYnVpbGRlci50cyJdLCJuYW1lcyI6WyJEeW5hbWljRm9ybUJ1aWxkZXIiLCJGb3JtR3JvdXBDbGFzcyIsIkR5bmFtaWNGb3JtR3JvdXAiLCJGb3JtQ29udHJvbENsYXNzIiwiRHluYW1pY0Zvcm1Db250cm9sIiwiZmFjdG9yeU1vZGVsIiwiY29udHJvbHNDb25maWciLCJvcHRpb25zIiwiZ3JvdXAiLCJ1bmRlZmluZWQiLCJtb2RlbCIsImZpZWxkcyIsImdldEZvcm1GaWVsZHMiLCJtYXAiLCJmaWVsZCIsImZpZWxkTmFtZSIsInJlZHVjZSIsInJldiIsImN1cnJlbnQiLCJleHRyYSIsInZhbGlkYXRvcnMiLCJhc3luY1ZhbGlkYXRvcnMiLCJ1cGRhdGVPbiIsInZhbGlkYXRvciIsInB1c2giLCJhc3luY1ZhbGlkYXRvciIsImN1c3RvbVZhbGlkYXRvck9wdGlvbnMiLCJ2YWxpZGF0aW9uRXJyb3IiLCJ0YXJnZXQiLCJuZXdDb250cm9sc0NvbmZpZyIsImNyZWF0ZUVtcHR5T2JqZWN0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjYW5DcmVhdGVHcm91cCIsImNvbnN0cnVjdG9yIiwiY2FuQ3JlYXRlQXJyYXkiLCJuZXdDb250cm9sc0NvbmZpZ0l0ZW0iLCJjb250cm9sIiwiY2FuZGlkYXRlIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiZmlsdGVyIiwiY2xhc3NWYWxpZGF0b3JzIiwiZm9ybUdyb3VwIiwiZHluYW1pY0Zvcm1Hcm91cCIsImNvbnRyb2xzIiwiYWRkQ29udHJvbCIsInZhbHVlQ2hhbmdlcyIsInN1YnNjcmliZSIsInZhbGlkYXRlIiwiZGF0YSIsIm1vZGlmaWVkIiwib2JqZWN0IiwiRm9ybUJ1aWxkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFHQTs7QUFNQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBR2FB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QU8sS0FBS3hCLGlCQUFMLENBQXVCekIsWUFBdkIsRUFBcUNnRCxJQUFyQyxDQUFQO0FBQ0Q7O0FBRUQsYUFBT0UsTUFBUDtBQUNEOzs7O0VBeE9xQ0Msa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuXG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2xPcHRpb25zLCBBc3luY1ZhbGlkYXRvckZuLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBwbGFpblRvQ2xhc3MgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBDbGFzc1R5cGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lci9DbGFzc1RyYW5zZm9ybWVyJztcblxuaW1wb3J0IHtcbiAgRHluYW1pY0Zvcm1Hcm91cENvbmZpZyxcbiAgaXNBYnN0cmFjdENvbnRyb2xPcHRpb25zLFxuICBpc0R5bmFtaWNGb3JtR3JvdXBDb25maWcsXG4gIGlzTGVnYWN5T3JPcHRzXG59IGZyb20gJy4uL21vZGVscy9keW5hbWljLWZvcm0tZ3JvdXAtY29uZmlnJztcbmltcG9ydCB7IER5bmFtaWNGb3JtR3JvdXAsIEZvcm1Nb2RlbCwgZ2V0Q2xhc3NWYWxpZGF0b3JzIH0gZnJvbSAnLi9keW5hbWljLWZvcm0tZ3JvdXAnO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm1Db250cm9sIH0gZnJvbSAnLi9keW5hbWljLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBEeW5hbWljRm9ybSB9IGZyb20gJ0Bvb3AtZHlubWljLWZvcm1zL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1CdWlsZGVyIGV4dGVuZHMgRm9ybUJ1aWxkZXIge1xuXG4gIHByb3RlY3RlZCBGb3JtR3JvdXBDbGFzcyA9IER5bmFtaWNGb3JtR3JvdXA7XG4gIHByb3RlY3RlZCBGb3JtQ29udHJvbENsYXNzID0gRHluYW1pY0Zvcm1Db250cm9sO1xuICBncm91cDxUTW9kZWw+KFxuICAgIGZhY3RvcnlNb2RlbDogQ2xhc3NUeXBlPFRNb2RlbD4sXG4gICAgY29udHJvbHNDb25maWc/OlxuICAgICAgfCBGb3JtTW9kZWw8VE1vZGVsPlxuICAgICAgfCBEeW5hbWljRm9ybUdyb3VwQ29uZmlnXG4gICAgICB8IHsgW2tleTogc3RyaW5nXTogYW55IH0sXG4gICAgb3B0aW9ucz86IEFic3RyYWN0Q29udHJvbE9wdGlvbnMgfCBEeW5hbWljRm9ybUdyb3VwQ29uZmlnXG4gICk6IER5bmFtaWNGb3JtR3JvdXA8VE1vZGVsPiB7XG4gICAgLy8gUHJvY2VzcyB0aGUgZ3JvdXAgd2l0aCB0aGUgY29udHJvbHNDb25maWcgcGFzc2VkIGludG8gZXh0cmEgaW5zdGVhZC4gKFdoYXQgZG9lcyB0aGlzIGFjY29tcGxpc2g/KVxuICAgIGlmIChcbiAgICAgIGNvbnRyb2xzQ29uZmlnICYmXG4gICAgICAoaXNBYnN0cmFjdENvbnRyb2xPcHRpb25zKGNvbnRyb2xzQ29uZmlnKSB8fFxuICAgICAgICBpc0xlZ2FjeU9yT3B0cyhjb250cm9sc0NvbmZpZykgfHxcbiAgICAgICAgaXNEeW5hbWljRm9ybUdyb3VwQ29uZmlnKGNvbnRyb2xzQ29uZmlnKSkgJiZcbiAgICAgICFvcHRpb25zXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5ncm91cChmYWN0b3J5TW9kZWwsIHVuZGVmaW5lZCwgY29udHJvbHNDb25maWcpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgc2VjdGlvbiBvZiBjb2RlIHdhcyBhZGRlZCBpbiBmcm9tIHRoZSBvcmlnaW5hbCBjb2RlIC0gSm9yZGFuXG4gICAgaWYgKCFjb250cm9sc0NvbmZpZykge1xuICAgICAgY29uc3QgbW9kZWwgPSAobmV3IGZhY3RvcnlNb2RlbCgpIGFzIHVua25vd24pIGFzIER5bmFtaWNGb3JtO1xuICAgICAgY29uc3QgZmllbGRzID0gbW9kZWwuZ2V0Rm9ybUZpZWxkcygpO1xuICAgICAgY29udHJvbHNDb25maWcgPSB7XG4gICAgICAgIC4uLigoZmllbGRzXG4gICAgICAgICAgLm1hcCgoZmllbGQ6IGFueSkgPT4gKHtcbiAgICAgICAgICAgIFtmaWVsZC5maWVsZE5hbWVdOiAnJ1xuICAgICAgICAgIH0pKVxuICAgICAgICAgIC5yZWR1Y2UoXG4gICAgICAgICAgICAocmV2OiBhbnksIGN1cnJlbnQ6IGFueSkgPT4gKHsgLi4ucmV2LCAuLi5jdXJyZW50IH0pLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApIGFzIHVua25vd24pIGFzIEZvcm1Nb2RlbDxUTW9kZWw+KVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCBleHRyYTogRHluYW1pY0Zvcm1Hcm91cENvbmZpZyA9IG9wdGlvbnMgYXMgRHluYW1pY0Zvcm1Hcm91cENvbmZpZztcblxuICAgIGxldCB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdIHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGFzeW5jVmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXSAgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgdXBkYXRlT246IGFueTtcblxuICAgIGlmIChleHRyYSAhPSBudWxsKSB7XG4gICAgICBpZiAoaXNBYnN0cmFjdENvbnRyb2xPcHRpb25zKGV4dHJhKSkge1xuICAgICAgICAvLyBgZXh0cmFgIGFyZSBgQWJzdHJhY3RDb250cm9sT3B0aW9uc2BcbiAgICAgICAgdmFsaWRhdG9ycyA9IGV4dHJhLnZhbGlkYXRvcnMgIT0gbnVsbCA/IGV4dHJhLnZhbGlkYXRvcnMgOiBudWxsO1xuICAgICAgICBhc3luY1ZhbGlkYXRvcnMgPSBleHRyYS5hc3luY1ZhbGlkYXRvcnMgIT0gbnVsbCA/IGV4dHJhLmFzeW5jVmFsaWRhdG9ycyA6IG51bGw7XG4gICAgICAgIHVwZGF0ZU9uID0gZXh0cmEudXBkYXRlT24gIT0gbnVsbCA/IGV4dHJhLnVwZGF0ZU9uIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKGlzTGVnYWN5T3JPcHRzKGV4dHJhKSkge1xuICAgICAgICAvLyBgZXh0cmFgIGFyZSBsZWdhY3kgZm9ybSBncm91cCBvcHRpb25zXG4gICAgICAgIHZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzIHx8IFtdO1xuICAgICAgICBpZiAoZXh0cmEudmFsaWRhdG9yKSB2YWxpZGF0b3JzLnB1c2goZXh0cmEudmFsaWRhdG9yKTtcblxuICAgICAgICBhc3luY1ZhbGlkYXRvcnMgPSBhc3luY1ZhbGlkYXRvcnMgfHwgW107XG4gICAgICAgIGlmIChleHRyYS5hc3luY1ZhbGlkYXRvcikgdmFsaWRhdG9ycy5wdXNoKGV4dHJhLmFzeW5jVmFsaWRhdG9yKTtcbiAgICAgIH1cbiAgICAgIC8vIFNldCBkZWZhdWx0IGN1c3RvbVZhbGlkYXRvck9wdGlvbnNcbiAgICAgIGlmICghaXNEeW5hbWljRm9ybUdyb3VwQ29uZmlnKGV4dHJhKSkge1xuICAgICAgICBleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zID0geyB2YWxpZGF0aW9uRXJyb3I6IHsgdGFyZ2V0OiBmYWxzZSB9IH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IG5ld0NvbnRyb2xzQ29uZmlnOiBGb3JtTW9kZWw8VE1vZGVsPiB8IGFueTtcblxuICAgIGlmIChjb250cm9sc0NvbmZpZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdDb250cm9sc0NvbmZpZyA9IGNvbnRyb2xzQ29uZmlnIGFzIEZvcm1Nb2RlbDxUTW9kZWw+O1xuICAgIH1cblxuICAgIC8vIGV4cGVyaW1lbnRhbFxuICAgIGlmIChjb250cm9sc0NvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdDb250cm9sc0NvbmZpZyA9IHsgLi4udGhpcy5jcmVhdGVFbXB0eU9iamVjdChmYWN0b3J5TW9kZWwpIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKG5ld0NvbnRyb2xzQ29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChjYW5DcmVhdGVHcm91cCgpKSB7XG4gICAgICAgICAgLy8gcmVjdXJzaXZlbHkgY3JlYXRlIGEgZHluYW1pYyBncm91cCBmb3IgdGhlIG5lc3RlZCBvYmplY3RcbiAgICAgICAgICBuZXdDb250cm9sc0NvbmZpZ1trZXldID0gdGhpcy5ncm91cChcbiAgICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0uY29uc3RydWN0b3IsXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIC4uLihleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zXG4gICAgICAgICAgICAgICAgPyB7IGN1c3RvbVZhbGlkYXRvck9wdGlvbnM6IGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnMgfVxuICAgICAgICAgICAgICAgIDoge30pLFxuICAgICAgICAgICAgICBhc3luY1ZhbGlkYXRvcnMsXG4gICAgICAgICAgICAgIHVwZGF0ZU9uLFxuICAgICAgICAgICAgICB2YWxpZGF0b3JzXG4gICAgICAgICAgICB9IGFzIGFueVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNhbkNyZWF0ZUFycmF5KCkpIHtcbiAgICAgICAgICAgIGlmIChuZXdDb250cm9sc0NvbmZpZ1trZXldWzBdLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGNyZWF0ZSBhbiBhcnJheSB3aXRoIGEgZ3JvdXBcbiAgICAgICAgICAgICAgbmV3Q29udHJvbHNDb25maWdba2V5XSA9IHN1cGVyLmFycmF5KFxuICAgICAgICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0ubWFwKChuZXdDb250cm9sc0NvbmZpZ0l0ZW06IGFueSkgPT5cbiAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXAobmV3Q29udHJvbHNDb25maWdJdGVtLmNvbnN0cnVjdG9yLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uKGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICA/IHsgY3VzdG9tVmFsaWRhdG9yT3B0aW9uczogZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9ucyB9XG4gICAgICAgICAgICAgICAgICAgICAgOiB7fSksXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jVmFsaWRhdG9ycyxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlT24sXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnNcbiAgICAgICAgICAgICAgICAgIH0gYXMgYW55KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIENyZWF0ZSBhbiBhcnJheSBvZiBmb3JtIGNvbnRyb2xzXG4gICAgICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0gPSBzdXBlci5hcnJheShcbiAgICAgICAgICAgICAgICBuZXdDb250cm9sc0NvbmZpZ1trZXldLm1hcCgobmV3Q29udHJvbHNDb25maWdJdGVtOiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2wobmV3Q29udHJvbHNDb25maWdJdGVtKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjYW5DcmVhdGVHcm91cCgpIHtcbiAgICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSBuZXdDb250cm9sc0NvbmZpZ1trZXldO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGNhbmRpZGF0ZSAmJlxuICAgICAgICAgICAgIUFycmF5LmlzQXJyYXkoY2FuZGlkYXRlKSAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLmNvbnN0cnVjdG9yICYmXG4gICAgICAgICAgICB0eXBlb2YgY2FuZGlkYXRlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5sZW5ndGggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAoY2FuZGlkYXRlLmxlbmd0aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY2FuZGlkYXRlKS5sZW5ndGggPT09IGNhbmRpZGF0ZS5sZW5ndGgpKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjYW5DcmVhdGVBcnJheSgpIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdDb250cm9sc0NvbmZpZ1trZXldKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSBuZXdDb250cm9sc0NvbmZpZ1trZXldWzBdO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5jb25zdHJ1Y3RvciAmJlxuICAgICAgICAgICAgdHlwZW9mIGNhbmRpZGF0ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUubGVuZ3RoID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgKGNhbmRpZGF0ZS5sZW5ndGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNhbmRpZGF0ZSkubGVuZ3RoID09PSBjYW5kaWRhdGUubGVuZ3RoKSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgZW1wdHlcbiAgICB2YWxpZGF0b3JzID0gdmFsaWRhdG9ycyAmJiB2YWxpZGF0b3JzLmZpbHRlcih2YWxpZGF0b3IgPT4gdmFsaWRhdG9yKTtcbiAgICBhc3luY1ZhbGlkYXRvcnMgPVxuICAgICAgYXN5bmNWYWxpZGF0b3JzICYmIGFzeW5jVmFsaWRhdG9ycy5maWx0ZXIodmFsaWRhdG9yID0+IHZhbGlkYXRvcik7XG5cbiAgICAvLyBDcmVhdGUgYW4gQW5ndWxhciBncm91cCBmcm9tIHRoZSB0b3AtbGV2ZWwgb2JqZWN0XG4gICAgY29uc3QgY2xhc3NWYWxpZGF0b3JzID0gZ2V0Q2xhc3NWYWxpZGF0b3JzPFRNb2RlbD4oXG4gICAgICBmYWN0b3J5TW9kZWwsXG4gICAgICBuZXdDb250cm9sc0NvbmZpZyxcbiAgICAgIGV4dHJhICYmIGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnMsXG4gICAgICB0aGlzLkZvcm1Db250cm9sQ2xhc3NcbiAgICApO1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHN1cGVyLmdyb3VwKGNsYXNzVmFsaWRhdG9ycywge1xuICAgICAgLi4uKGFzeW5jVmFsaWRhdG9ycyB8fCB7fSksXG4gICAgICAuLi4odXBkYXRlT24gfHwge30pLFxuICAgICAgLi4uKHZhbGlkYXRvcnMgfHwge30pXG4gICAgfSk7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSByZXN1bHRpbmcgZ3JvdXBcbiAgICAvLyBDaGFuZ2VkIGZyb20gaW50ZXJuYWwgRm9ybUdyb3VwIHRvIER5bmFtaWNGb3JtR3JvdXBcbiAgICBjb25zdCBkeW5hbWljRm9ybUdyb3VwID0gbmV3IER5bmFtaWNGb3JtR3JvdXA8VE1vZGVsPihcbiAgICAgIGZhY3RvcnlNb2RlbCxcbiAgICAgIG5ld0NvbnRyb2xzQ29uZmlnLFxuICAgICAge1xuICAgICAgICBhc3luY1ZhbGlkYXRvcnMsXG4gICAgICAgIHVwZGF0ZU9uLFxuICAgICAgICB2YWxpZGF0b3JzXG4gICAgICB9IGFzIGFueVxuICAgICk7XG5cbiAgICAvLyBBZGQgYWxsIGFuZ3VsYXIgY29udHJvbHMgdG8gdGhlIHJlc3VsdGluZyBkeW5hbWljIGdyb3VwXG4gICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBkeW5hbWljRm9ybUdyb3VwLmFkZENvbnRyb2woa2V5LCBmb3JtR3JvdXAuY29udHJvbHNba2V5XSk7XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgYSBsaXN0ZW5lciB0byB0aGUgZHluYW1pYyBncm91cCBmb3IgdmFsdWUgY2hhbmdlczsgb24gY2hhbmdlLCBleGVjdXRlIHZhbGlkYXRpb25cbiAgICBkeW5hbWljRm9ybUdyb3VwLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gZHluYW1pY0Zvcm1Hcm91cC52YWxpZGF0ZSh1bmRlZmluZWQsIGV4dHJhICYmIGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnMpKTtcblxuICAgIHJldHVybiBkeW5hbWljRm9ybUdyb3VwO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKlxuICAvLyBIZWxwZXJzXG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGNyZWF0ZXMgYW4gZW1wdHkgb2JqZWN0IGZyb20gdGhlIGRhdGEgcHJvdmlkZWRcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlRW1wdHlPYmplY3Q8VE1vZGVsPihcbiAgICBmYWN0b3J5TW9kZWw6IENsYXNzVHlwZTxUTW9kZWw+LFxuICAgIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge31cbiAgKTogYW55IHtcbiAgICBsZXQgbW9kaWZpZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IG9iamVjdDogYW55ID0gZmFjdG9yeU1vZGVsID8gcGxhaW5Ub0NsYXNzKGZhY3RvcnlNb2RlbCwgZGF0YSkgOiBkYXRhO1xuICAgIGNvbnN0IGZpZWxkcyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG5cbiAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGROYW1lOiBhbnkpID0+IHtcbiAgICAgIGlmIChvYmplY3RbZmllbGROYW1lXSAmJiBvYmplY3RbZmllbGROYW1lXS5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgb2JqZWN0W2ZpZWxkTmFtZV0ubGVuZ3RoID09PSAxICYmXG4gICAgICAgICAgT2JqZWN0LmtleXMob2JqZWN0W2ZpZWxkTmFtZV1bMF0pLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICBvYmplY3RbZmllbGROYW1lXVswXS5jb25zdHJ1Y3RvclxuICAgICAgICApIHtcbiAgICAgICAgICBvYmplY3RbZmllbGROYW1lXSA9IFtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRW1wdHlPYmplY3Qob2JqZWN0W2ZpZWxkTmFtZV1bMF0uY29uc3RydWN0b3IpXG4gICAgICAgICAgXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvYmplY3RbZmllbGROYW1lXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBkYXRhW2ZpZWxkTmFtZV0gPSBbe31dO1xuICAgICAgICAgIG1vZGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YVtmaWVsZE5hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG1vZGlmaWVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVFbXB0eU9iamVjdChmYWN0b3J5TW9kZWwsIGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbn1cbiJdfQ==