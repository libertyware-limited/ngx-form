"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClassValidators = getClassValidators;
exports.DynamicFormGroup = void 0;

var _forms = require("@angular/forms");

var _classTransformer = require("class-transformer");

var _classValidator = require("class-validator");

require("reflect-metadata");

var _rxjs = require("rxjs");

var _foreverInvalid = require("../validators/forever-invalid.validator");

var _dynamicFormControl = require("./dynamic-form-control");

var _ngxFormCore = require("@libertyware/ngx-form-core");

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _lodash2 = _interopRequireDefault(require("lodash.mergewith"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DynamicFormGroup = function (_FormGroup) {
  _inherits(DynamicFormGroup, _FormGroup);

  function DynamicFormGroup(factoryModel, fields, validatorOrOpts, asyncValidator) {
    var _this;

    _classCallCheck(this, DynamicFormGroup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DynamicFormGroup).call(this, {}, validatorOrOpts, asyncValidator));
    _this.factoryModel = factoryModel;
    _this.fields = fields;
    _this.nativeValidateErrors = new _rxjs.BehaviorSubject({});
    _this.customValidateErrors = new _rxjs.BehaviorSubject({});
    _this.formErrors = null;
    _this.formFields = void 0;
    _this.objectChange = new _rxjs.Subject();
    _this.FormControlClass = _dynamicFormControl.DynamicFormControl;
    _this._object = null;
    _this._externalErrors = null;
    _this._validatorOptions = null;
    _this._fb = new _forms.FormBuilder();
    _this._formGen = void 0;
    _this.formFields = _this.onlyFields(fields);
    _this._formGen = (0, _ngxFormCore.getFormFieldsOptions)(factoryModel);
    return _this;
  }

  _createClass(DynamicFormGroup, [{
    key: "getFormGenData",
    value: function getFormGenData() {
      return this._formGen;
    }
  }, {
    key: "validate",
    value: function validate(externalErrors, validatorOptions) {
      this.validateAsync(externalErrors, validatorOptions).then(function () {}, function (error) {
        throw error;
      });
    }
  }, {
    key: "validateAsync",
    value: function () {
      var _validateAsync = _asyncToGenerator(regeneratorRuntime.mark(function _callee(externalErrors, validatorOptions) {
        var result, validationErrors, allErrors, usedForeverInvalid;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (externalErrors === undefined) {
                  externalErrors = (0, _lodash["default"])(this._externalErrors);
                }

                if (validatorOptions === undefined) {
                  validatorOptions = (0, _lodash["default"])(this._validatorOptions);
                }

                if (!externalErrors) {
                  externalErrors = {};
                }

                _context.prev = 3;
                _context.next = 6;
                return (0, _classValidator.validate)(this.object, validatorOptions);

              case 6:
                result = _context.sent;
                validationErrors = this.transformValidationErrors(result);
                allErrors = this.mergeErrors(externalErrors, validationErrors);
                this.markAsInvalidForExternalErrors(externalErrors);
                this.setCustomErrors(allErrors);
                usedForeverInvalid = false;

                if (Object.keys(allErrors).filter(function (key) {
                  return key !== _foreverInvalid.FOREVER_INVALID_NAME;
                }).length === 0 && this.get(_foreverInvalid.FOREVER_INVALID_NAME)) {
                  this.removeControl(_foreverInvalid.FOREVER_INVALID_NAME);
                  usedForeverInvalid = true;
                }

                if (this.valid && Object.keys(allErrors).length > 0 && !this.get(_foreverInvalid.FOREVER_INVALID_NAME)) {
                  this.addControl(_foreverInvalid.FOREVER_INVALID_NAME, new _forms.FormControl('', [_foreverInvalid.foreverInvalid]));
                  usedForeverInvalid = true;
                }

                if (usedForeverInvalid) {
                  this.updateValueAndValidity({
                    onlySelf: true,
                    emitEvent: false
                  });
                }

                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](3);
                throw _context.t0;

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 17]]);
      }));

      function validateAsync(_x, _x2) {
        return _validateAsync.apply(this, arguments);
      }

      return validateAsync;
    }()
  }, {
    key: "setCustomErrors",
    value: function setCustomErrors(allErrors) {
      this.formErrors = allErrors;
      this.customValidateErrors.next(this.formErrors);
      this.nativeValidateErrors.next(this.collectErrors(this));
    }
  }, {
    key: "collectErrors",
    value: function collectErrors(control) {
      var _this2 = this;

      var isRoot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (control.controls) {
        return _objectSpread({}, isRoot ? this.errors : {}, {}, Object.entries(control.controls).reduce(function (acc, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              childControl = _ref2[1];

          var childErrors = _this2.collectErrors(childControl, false);

          if (childErrors && key !== 'foreverInvalid' && Object.keys(childErrors).length > 0) {
            acc = _objectSpread({}, acc, _defineProperty({}, key, _objectSpread({}, acc && acc[key] ? acc[key] : {}, {}, childErrors)));
          }

          return acc;
        }, {}));
      } else {
        return control.errors;
      }
    }
  }, {
    key: "validateAllFormFields",
    value: function validateAllFormFields() {
      var _this3 = this;

      Object.keys(this.controls).forEach(function (field) {
        var control = _this3.get(field);

        if (control instanceof _forms.FormControl) {
          control.markAsTouched({
            onlySelf: true
          });
        } else if (control instanceof DynamicFormGroup) {
            control.validateAllFormFields();
          } else if (control instanceof _forms.FormArray) {
              for (var i = 0; i < control.controls.length; i++) {
                if (control.controls[i] instanceof _forms.FormControl) {
                  control.controls[i].markAsTouched({
                    onlySelf: true
                  });
                } else if (control.controls[i] instanceof DynamicFormGroup) {
                    control.controls[i].validateAllFormFields();
                  }
              }
            }
      });
    }
  }, {
    key: "resetValidateAllFormFields",
    value: function resetValidateAllFormFields() {
      var _this4 = this;

      this.markAsInvalidForExternalErrors({});
      Object.keys(this.controls).forEach(function (field) {
        var control = _this4.get(field);

        if (control instanceof _forms.FormControl) {
          control.setErrors(null, {
            emitEvent: false
          });
          control.markAsUntouched({
            onlySelf: true
          });
          control.markAsPristine({
            onlySelf: true
          });
        } else if (control instanceof DynamicFormGroup) {
            control.resetValidateAllFormFields();
          } else if (control instanceof _forms.FormArray) {
              for (var i = 0; i < control.controls.length; i++) {
                if (control.controls[i] instanceof _forms.FormControl) {
                  control.controls[i].setErrors(null, {
                    emitEvent: false
                  });
                  control.controls[i].markAsUntouched({
                    onlySelf: true
                  });
                  control.controls[i].markAsPristine({
                    onlySelf: true
                  });
                } else if (control.controls[i] instanceof DynamicFormGroup) {
                    control.controls[i].resetValidateAllFormFields();
                  }
              }
            }
      });
      this.setCustomErrors({});
    }
  }, {
    key: "classToClass",
    value: function classToClass(object) {
      return (0, _classTransformer.classToClass)(object, {
        ignoreDecorators: true
      });
    }
  }, {
    key: "plainToClass",
    value: function plainToClass(cls, plain) {
      return (0, _classTransformer.plainToClass)(cls, plain, {
        ignoreDecorators: true
      });
    }
  }, {
    key: "setExternalErrorsAsync",
    value: function () {
      var _setExternalErrorsAsync = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(externalErrors) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._externalErrors = externalErrors;
                _context2.prev = 1;
                _context2.next = 4;
                return this.validateAsync();

              case 4:
                return _context2.abrupt("return", _context2.sent);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](1);
                throw _context2.t0;

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 7]]);
      }));

      function setExternalErrorsAsync(_x3) {
        return _setExternalErrorsAsync.apply(this, arguments);
      }

      return setExternalErrorsAsync;
    }()
  }, {
    key: "setExternalErrors",
    value: function setExternalErrors(externalErrors) {
      this.setExternalErrorsAsync(externalErrors).then(function () {}, function (error) {
        throw error;
      });
    }
  }, {
    key: "getExternalErrors",
    value: function getExternalErrors() {
      return this._externalErrors;
    }
  }, {
    key: "clearExternalErrors",
    value: function clearExternalErrors() {
      this.setExternalErrors({});
    }
  }, {
    key: "clearExternalErrorsAsync",
    value: function clearExternalErrorsAsync() {
      return this.setExternalErrorsAsync({});
    }
  }, {
    key: "setValidatorOptionsAsync",
    value: function () {
      var _setValidatorOptionsAsync = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(validatorOptions) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._validatorOptions = validatorOptions;
                _context3.prev = 1;
                _context3.next = 4;
                return this.validateAsync();

              case 4:
                return _context3.abrupt("return", _context3.sent);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](1);
                throw _context3.t0;

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 7]]);
      }));

      function setValidatorOptionsAsync(_x4) {
        return _setValidatorOptionsAsync.apply(this, arguments);
      }

      return setValidatorOptionsAsync;
    }()
  }, {
    key: "setValidatorOptions",
    value: function setValidatorOptions(validatorOptions) {
      this.setValidatorOptionsAsync(validatorOptions).then(function () {}, function (error) {
        throw error;
      });
    }
  }, {
    key: "getValidatorOptions",
    value: function getValidatorOptions() {
      return this._validatorOptions;
    }
  }, {
    key: "onlyFields",
    value: function onlyFields(fields) {
      var _this5 = this;

      var newFields = {};

      if (fields !== undefined) {
        Object.keys(fields).forEach(function (key) {
          if (fields[key] instanceof DynamicFormGroup) {
            newFields[key] = _this5.onlyFields(fields[key].formFields);
          } else {
            if (fields[key] instanceof _forms.FormArray) {
              if (fields[key].controls[0] instanceof DynamicFormGroup) {
                newFields[key] = _this5.onlyFields(fields[key].controls[0].formFields);
              } else {
                newFields[key] = fields[key].controls[0].value;
              }
            } else {
              newFields[key] = fields[key];
            }
          }
        });
      }

      return newFields;
    }
  }, {
    key: "transformValidationErrors",
    value: function transformValidationErrors(errors) {
      var _this6 = this;

      var customErrors = {};
      errors.forEach(function (error) {
        if (error && error.constraints !== undefined) {
          Object.keys(error.constraints).forEach(function (key) {
            if (!customErrors[error.property]) {
              customErrors[error.property] = [];
            }

            if (customErrors[error.property].indexOf(error.constraints[key]) === -1) {
              customErrors[error.property].push(error.constraints[key]);
            }
          });
        }

        if (error.children !== undefined && error.children.length) {
          customErrors[error.property] = _this6.transformValidationErrors(error.children);
        }
      });
      return customErrors;
    }
  }, {
    key: "mergeErrors",
    value: function mergeErrors(externalErrors, validationErrors) {
      var clonedExternalErrors = (0, _lodash["default"])(externalErrors);
      return (0, _lodash2["default"])(clonedExternalErrors, validationErrors, function (objValue, srcValue) {
        if (canMerge()) {
          return objValue.concat(srcValue);
        }

        function canMerge() {
          return Array.isArray(objValue) && Array.isArray(srcValue) && objValue.filter(function (objItem) {
            return srcValue.indexOf(objItem) !== -1;
          }).length === 0;
        }
      });
    }
  }, {
    key: "markAsInvalidForExternalErrors",
    value: function markAsInvalidForExternalErrors(errors, controls) {
      if (!controls) {
        controls = this.controls;
      }

      Object.keys(controls).forEach(function (field) {
        var control = controls[field];

        if (control instanceof _forms.FormControl) {
          if (errors && errors[field]) {
            control.setErrors({
              externalError: true
            });
          } else {
            if (control.errors && control.errors.externalError === true) {
              control.setErrors(null);
            }
          }
        } else if (control instanceof DynamicFormGroup) {
            control.markAsInvalidForExternalErrors(errors && errors[field] ? errors[field] : {});
          } else if (control instanceof _forms.FormArray) {
              for (var i = 0; i < control.length; i++) {
                if (control[i] instanceof _forms.FormControl) {
                  if (errors && errors[i] && errors[i][field]) {
                    control[i].setErrors({
                      externalError: true
                    });
                  } else if (control[i].errors && control[i].errors.externalError === true) {
                    control[i].setErrors(null);
                  }
                } else if (control[i] instanceof DynamicFormGroup) {
                    control[i].markAsInvalidForExternalErrors(errors && errors[i] && errors[i][field] ? errors[i][field] : {});
                  }
              }
            }
      });
    }
  }, {
    key: "getObject",
    value: function getObject() {
      var _this7 = this;

      var object = this._object ? this.classToClass(this._object) : this.factoryModel ? new this.factoryModel() : undefined;

      if (object !== undefined) {
        Object.keys(this.controls).filter(function (name) {
          return name !== _foreverInvalid.FOREVER_INVALID_NAME;
        }).forEach(function (key) {
          if (_this7.controls[key] instanceof DynamicFormGroup) {
            object[key] = _this7.controls[key].object;
          } else if (_this7.controls[key] instanceof _forms.FormArray) {
              object[key] = [];

              for (var i = 0; i < _this7.controls[key].controls.length; i++) {
                var value = void 0;

                if (_this7.controls[key].controls[i] instanceof DynamicFormGroup) {
                  value = _this7.controls[key].controls[i].object;
                } else {
                  value = _this7.controls[key].controls[i].value;
                }

                if (value && Object.keys(value).length > 0) {
                  object[key].push(value);
                }
              }
            } else {
                object[key] = _this7.controls[key].value;
              }
        });
      }

      return this.factoryModel ? this.plainToClass(this.factoryModel, object) : object;
    }
  }, {
    key: "setObject",
    value: function setObject(object) {
      var _this8 = this;

      if (object instanceof this.factoryModel) {
        this._object = this.classToClass(object);
      } else {
        this._object = this.plainToClass(this.factoryModel, object);
      }

      Object.keys(this.controls).forEach(function (key) {
        if (_this8.controls[key] instanceof DynamicFormGroup) {
          _this8.controls[key].object = _this8._object ? _this8._object[key] : {};
        } else if (_this8.controls[key] instanceof _forms.FormArray) {
            var objectArray = _this8._object ? _this8._object[key] : [];
            var formArray = _this8.controls[key];
            var isFormGroup = formArray.controls[0] instanceof DynamicFormGroup;
            var firstFormGroup = formArray.controls[0];
            var formControl = formArray.controls[0];

            while (formArray.length !== 0) {
              formArray.removeAt(0);
            }

            for (var i = 0; i < objectArray.length; i++) {
              if (isFormGroup) {
                (function () {
                  var dynamicFormGroup = new DynamicFormGroup(firstFormGroup.factoryModel, firstFormGroup.formFields);
                  dynamicFormGroup.setParent(_this8);
                  var classValidators = getClassValidators(firstFormGroup.factoryModel, firstFormGroup.formFields, undefined, _this8.FormControlClass);

                  var formGroup = _this8._fb.group(classValidators);

                  Object.keys(formGroup.controls).forEach(function (ctrlKey) {
                    dynamicFormGroup.addControl(ctrlKey, formGroup.controls[ctrlKey]);
                  });
                  dynamicFormGroup.valueChanges.subscribe(function (data) {
                    dynamicFormGroup.validate(undefined, _this8._validatorOptions);
                  });
                  formArray.controls.push(dynamicFormGroup);
                  formArray.controls[i].object = _this8._object && objectArray && objectArray[i] ? objectArray[i] : {};
                })();
              } else {
                var controlValue = _this8._object && objectArray && objectArray[i] ? objectArray[i] : undefined;
                var newFormControl = new _forms.FormControl(controlValue, formControl.validator);
                newFormControl.setParent(_this8);
                formArray.controls.push(newFormControl);
              }
            }
          } else {
              var newObject = _this8._object ? _this8._object[key] : [];

              _this8.controls[key].setValue(_this8._object && newObject ? newObject : undefined);
            }
      });
      this.objectChange.next(this._object);
    }
  }, {
    key: "externalErrors",
    set: function set(externalErrors) {
      this._externalErrors = externalErrors;
      this.validate();
    },
    get: function get() {
      return this._externalErrors;
    }
  }, {
    key: "validatorOptions",
    set: function set(validatorOptions) {
      this._validatorOptions = validatorOptions;
      this.validate();
    },
    get: function get() {
      return this._validatorOptions;
    }
  }, {
    key: "object",
    set: function set(object) {
      this.setObject(object);
    },
    get: function get() {
      return this.getObject();
    }
  }]);

  return DynamicFormGroup;
}(_forms.FormGroup);

exports.DynamicFormGroup = DynamicFormGroup;

function getClassValidators(factoryModel, fields, validatorOptions) {
  var FormControlClass = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _dynamicFormControl.DynamicFormControl;
  var allValidationMetadatas = (0, _classValidator.getFromContainer)(_classValidator.MetadataStorage).getTargetValidationMetadatas(factoryModel, '');
  var validationGroupMetadatas = (0, _classValidator.getFromContainer)(_classValidator.MetadataStorage).getTargetValidationMetadatas(factoryModel, '', validatorOptions && validatorOptions.groups ? validatorOptions.groups : undefined);
  var formGroupFields = {};
  var validator = new _classValidator.Validator();
  Object.keys(fields).filter(function (key) {
    return key.indexOf('__') !== 0;
  }).forEach(function (fieldName) {
    var conditionalValidations = [];
    validationGroupMetadatas.forEach(function (validationMetadata) {
      if (isPropertyValidatorOfType(validationMetadata, fieldName, ValidationKeys.conditional.type)) {
        conditionalValidations.push(validationMetadata);
      }
    });
    var allNestedValidations = [];
    allValidationMetadatas.forEach(function (validationMetadata) {
      if (isPropertyValidatorOfType(validationMetadata, fieldName, ValidationKeys.nested.type)) {
        allNestedValidations.push(validationMetadata);
      }
    });
    var nestedGroupValidations = [];
    validationGroupMetadatas.forEach(function (validationMetadata) {
      if (isPropertyValidatorOfType(validationMetadata, fieldName, ValidationKeys.nested.type)) {
        nestedGroupValidations.push(validationMetadata);
      }
    });
    var fieldDefinition = {
      data: formGroupFields[fieldName],
      validationFunctions: [],
      validationDefinitions: []
    };

    if (fieldDefinition.data === undefined) {
      fieldDefinition.data = fields[fieldName];
    }

    if (Array.isArray(fieldDefinition.data) && fieldDefinition.data.length > 1 && fieldDefinition.data.filter(function (validationFunction, index) {
      return index > 0 && typeof validationFunction === 'function';
    }).length > 0) {
      fieldDefinition.data.filter(function (validationFunction, index) {
        return index > 0 && typeof validationFunction === 'function';
      }).forEach(function (validationFunction) {
        return fieldDefinition.validationFunctions.push(validationFunction);
      });
      fieldDefinition.data = fieldDefinition.data[0];
    }

    validationGroupMetadatas.forEach(function (validationMetadata) {
      if (validationMetadata.propertyName === fieldName && validationMetadata.type !== ValidationKeys.conditional.type) {
        if (validationMetadata.type !== ValidationKeys.nested.type) {
          fieldDefinition.validationDefinitions.push(validationMetadata);
        }

        for (var typeKey in _classValidator.ValidationTypes) {
          if (_classValidator.ValidationTypes.hasOwnProperty(typeKey)) {
            if (checkWithAllNestedValidations(allNestedValidations, nestedGroupValidations, fieldName)) {
              if (isNestedValidate(validationMetadata, typeKey)) {
                var objectToValidate = fields[fieldName] instanceof DynamicFormGroup ? fields[fieldName].object : undefined;
                var nestedValidate = createNestedValidate(objectToValidate, validationMetadata);
                setFieldData(fieldName, fieldDefinition, nestedValidate);
              }
            }

            if (isCustomValidate(validationMetadata, typeKey)) {
              var customValidation = createCustomValidation(fieldName, validationMetadata);
              setFieldData(fieldName, fieldDefinition, customValidation);
            }

            if (isDynamicValidate(validationMetadata, typeKey)) {
              var dynamicValidate = createDynamicValidate(validationMetadata, conditionalValidations, fieldName);
              setFieldData(fieldName, fieldDefinition, dynamicValidate);
            }
          }
        }
      }
    });

    if (fieldDefinition.data instanceof DynamicFormGroup || fieldDefinition.data instanceof _forms.FormArray) {
      formGroupFields[fieldName] = fieldDefinition.data;
    } else {
      formGroupFields[fieldName] = new FormControlClass(fieldDefinition);
    }
  });
  return formGroupFields;

  function createNestedValidate(objectToValidate, validationMetadata) {
    return function (control) {
      var isValid = getValidateErrors(control, objectToValidate !== undefined ? objectToValidate : control.value, validatorOptions).length === 0;
      return getIsValidResult(isValid, validationMetadata, 'nestedValidate');
    };
  }

  function createDynamicValidate(validationMetadata, conditionalValidations, fieldName) {
    return function (control) {
      if (!control) {
        return null;
      }

      var isValid = control.parent && control.parent.value ? validator.validateValueByMetadata(control.value, validationMetadata) : true;

      if (!isValid && conditionalValidations.length > 0) {
        var validateErrors = setObjectValueAndGetValidationErrors(control, fieldName, validatorOptions);
        isValid = validateErrors.filter(function (error) {
          return error.property === fieldName;
        }).length === 0;
      }

      return getIsValidResult(isValid, validationMetadata, 'dynamicValidate');
    };
  }

  function createCustomValidation(fieldName, validationMetadata) {
    return function (control) {
      var validateErrors = setObjectValueAndGetValidationErrors(control, fieldName, validatorOptions);
      var isValid = getAllErrors(validateErrors, fieldName).length === 0;
      return getIsValidResult(isValid, validationMetadata, 'customValidation');
    };
  }

  function checkWithAllNestedValidations(allNestedValidations, nestedValidations, key) {
    return allNestedValidations.length === nestedValidations.length || (fields[key] instanceof DynamicFormGroup || fields[key] instanceof _forms.FormArray) && allNestedValidations.length > 0 && nestedValidations.length === 0;
  }

  function isDynamicValidate(validationMetadata, typeKey) {
    return validationMetadata.type === _classValidator.ValidationTypes[typeKey] && validator[validationMetadata.type] !== undefined;
  }

  function isCustomValidate(validationMetadata, typeKey) {
    return isNotPropertyValidation(validationMetadata, typeKey) && validationMetadata.type === ValidationKeys.custom.type && typeKey === ValidationKeys.custom.typeKey;
  }

  function isNestedValidate(validationMetadata, typeKey) {
    return isNotPropertyValidation(validationMetadata, typeKey) && validationMetadata.type === ValidationKeys.nested.type && typeKey === ValidationKeys.nested.typeKey;
  }

  function isNotPropertyValidation(validationMetadata, typeKey) {
    return validationMetadata.type === _classValidator.ValidationTypes[typeKey] && validator[validationMetadata.type] === undefined;
  }

  function setFieldData(fieldName, fieldDefinition, validationFunction) {
    if (fieldDefinition.data === undefined) {
      fieldDefinition.data = fields[fieldName];
    }

    fieldDefinition.validationFunctions.push(validationFunction);
  }

  function getAllErrors(validateErrors, fieldName) {
    return validateErrors.filter(function (error) {
      return error.children.length && error.children.filter(function (children) {
        return children.property === fieldName;
      }) || error.property === fieldName;
    });
  }
}

function isPropertyValidatorOfType(validationMetadata, fieldName, validationMetadataType) {
  return validationMetadata.propertyName === fieldName && validationMetadata.type === validationMetadataType;
}

function setObjectValueAndGetValidationErrors(control, key, validatorOptions) {
  var object = control.parent instanceof DynamicFormGroup ? control.parent.object : control.parent ? control.parent.value : {};

  if (object) {
    object[key] = control.value;
  }

  return getValidateErrors(control, object, validatorOptions);
}

function getValidateErrors(control, dataToValidate, validatorOptions) {
  var validateErrors = control.parent && control.parent.value ? (0, _classValidator.validateSync)(dataToValidate, validatorOptions) : [];
  return validateErrors;
}

function getIsValidResult(isValid, validationMetadata, errorType) {
  return isValid ? null : _defineProperty({}, errorType, {
    valid: false,
    type: validationMetadata.type
  });
}

var ValidationKeys = {
  nested: {
    type: 'nestedValidation',
    typeKey: 'NESTED_VALIDATION'
  },
  conditional: {
    type: 'conditionalValidation'
  },
  custom: {
    type: 'customValidation',
    typeKey: 'CUSTOM_VALIDATION'
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9keW5hbWljLWZvcm0tZ3JvdXAudHMiXSwibmFtZXMiOlsiRHluYW1pY0Zvcm1Hcm91cCIsImZhY3RvcnlNb2RlbCIsImZpZWxkcyIsInZhbGlkYXRvck9yT3B0cyIsImFzeW5jVmFsaWRhdG9yIiwibmF0aXZlVmFsaWRhdGVFcnJvcnMiLCJCZWhhdmlvclN1YmplY3QiLCJjdXN0b21WYWxpZGF0ZUVycm9ycyIsImZvcm1FcnJvcnMiLCJmb3JtRmllbGRzIiwib2JqZWN0Q2hhbmdlIiwiU3ViamVjdCIsIkZvcm1Db250cm9sQ2xhc3MiLCJEeW5hbWljRm9ybUNvbnRyb2wiLCJfb2JqZWN0IiwiX2V4dGVybmFsRXJyb3JzIiwiX3ZhbGlkYXRvck9wdGlvbnMiLCJfZmIiLCJGb3JtQnVpbGRlciIsIl9mb3JtR2VuIiwib25seUZpZWxkcyIsImV4dGVybmFsRXJyb3JzIiwidmFsaWRhdG9yT3B0aW9ucyIsInZhbGlkYXRlQXN5bmMiLCJ0aGVuIiwiZXJyb3IiLCJ1bmRlZmluZWQiLCJvYmplY3QiLCJyZXN1bHQiLCJ2YWxpZGF0aW9uRXJyb3JzIiwidHJhbnNmb3JtVmFsaWRhdGlvbkVycm9ycyIsImFsbEVycm9ycyIsIm1lcmdlRXJyb3JzIiwibWFya0FzSW52YWxpZEZvckV4dGVybmFsRXJyb3JzIiwic2V0Q3VzdG9tRXJyb3JzIiwidXNlZEZvcmV2ZXJJbnZhbGlkIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsImtleSIsIkZPUkVWRVJfSU5WQUxJRF9OQU1FIiwibGVuZ3RoIiwiZ2V0IiwicmVtb3ZlQ29udHJvbCIsInZhbGlkIiwiYWRkQ29udHJvbCIsIkZvcm1Db250cm9sIiwiZm9yZXZlckludmFsaWQiLCJ1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5Iiwib25seVNlbGYiLCJlbWl0RXZlbnQiLCJuZXh0IiwiY29sbGVjdEVycm9ycyIsImNvbnRyb2wiLCJpc1Jvb3QiLCJjb250cm9scyIsImVycm9ycyIsImVudHJpZXMiLCJyZWR1Y2UiLCJhY2MiLCJjaGlsZENvbnRyb2wiLCJjaGlsZEVycm9ycyIsImZvckVhY2giLCJmaWVsZCIsIm1hcmtBc1RvdWNoZWQiLCJ2YWxpZGF0ZUFsbEZvcm1GaWVsZHMiLCJGb3JtQXJyYXkiLCJpIiwic2V0RXJyb3JzIiwibWFya0FzVW50b3VjaGVkIiwibWFya0FzUHJpc3RpbmUiLCJyZXNldFZhbGlkYXRlQWxsRm9ybUZpZWxkcyIsImlnbm9yZURlY29yYXRvcnMiLCJjbHMiLCJwbGFpbiIsInNldEV4dGVybmFsRXJyb3JzQXN5bmMiLCJzZXRFeHRlcm5hbEVycm9ycyIsInNldFZhbGlkYXRvck9wdGlvbnNBc3luYyIsIm5ld0ZpZWxkcyIsInZhbHVlIiwiY3VzdG9tRXJyb3JzIiwiY29uc3RyYWludHMiLCJwcm9wZXJ0eSIsImluZGV4T2YiLCJwdXNoIiwiY2hpbGRyZW4iLCJjbG9uZWRFeHRlcm5hbEVycm9ycyIsIm9ialZhbHVlIiwic3JjVmFsdWUiLCJjYW5NZXJnZSIsImNvbmNhdCIsIkFycmF5IiwiaXNBcnJheSIsIm9iakl0ZW0iLCJleHRlcm5hbEVycm9yIiwiY2xhc3NUb0NsYXNzIiwibmFtZSIsInBsYWluVG9DbGFzcyIsIm9iamVjdEFycmF5IiwiZm9ybUFycmF5IiwiaXNGb3JtR3JvdXAiLCJmaXJzdEZvcm1Hcm91cCIsImZvcm1Db250cm9sIiwicmVtb3ZlQXQiLCJkeW5hbWljRm9ybUdyb3VwIiwic2V0UGFyZW50IiwiY2xhc3NWYWxpZGF0b3JzIiwiZ2V0Q2xhc3NWYWxpZGF0b3JzIiwiZm9ybUdyb3VwIiwiZ3JvdXAiLCJjdHJsS2V5IiwidmFsdWVDaGFuZ2VzIiwic3Vic2NyaWJlIiwiZGF0YSIsInZhbGlkYXRlIiwiY29udHJvbFZhbHVlIiwibmV3Rm9ybUNvbnRyb2wiLCJ2YWxpZGF0b3IiLCJuZXdPYmplY3QiLCJzZXRWYWx1ZSIsInNldE9iamVjdCIsImdldE9iamVjdCIsIkZvcm1Hcm91cCIsImFsbFZhbGlkYXRpb25NZXRhZGF0YXMiLCJNZXRhZGF0YVN0b3JhZ2UiLCJnZXRUYXJnZXRWYWxpZGF0aW9uTWV0YWRhdGFzIiwidmFsaWRhdGlvbkdyb3VwTWV0YWRhdGFzIiwiZ3JvdXBzIiwiZm9ybUdyb3VwRmllbGRzIiwiVmFsaWRhdG9yIiwiZmllbGROYW1lIiwiY29uZGl0aW9uYWxWYWxpZGF0aW9ucyIsInZhbGlkYXRpb25NZXRhZGF0YSIsImlzUHJvcGVydHlWYWxpZGF0b3JPZlR5cGUiLCJWYWxpZGF0aW9uS2V5cyIsImNvbmRpdGlvbmFsIiwidHlwZSIsImFsbE5lc3RlZFZhbGlkYXRpb25zIiwibmVzdGVkIiwibmVzdGVkR3JvdXBWYWxpZGF0aW9ucyIsImZpZWxkRGVmaW5pdGlvbiIsInZhbGlkYXRpb25GdW5jdGlvbnMiLCJ2YWxpZGF0aW9uRGVmaW5pdGlvbnMiLCJ2YWxpZGF0aW9uRnVuY3Rpb24iLCJpbmRleCIsInByb3BlcnR5TmFtZSIsInR5cGVLZXkiLCJWYWxpZGF0aW9uVHlwZXMiLCJoYXNPd25Qcm9wZXJ0eSIsImNoZWNrV2l0aEFsbE5lc3RlZFZhbGlkYXRpb25zIiwiaXNOZXN0ZWRWYWxpZGF0ZSIsIm9iamVjdFRvVmFsaWRhdGUiLCJuZXN0ZWRWYWxpZGF0ZSIsImNyZWF0ZU5lc3RlZFZhbGlkYXRlIiwic2V0RmllbGREYXRhIiwiaXNDdXN0b21WYWxpZGF0ZSIsImN1c3RvbVZhbGlkYXRpb24iLCJjcmVhdGVDdXN0b21WYWxpZGF0aW9uIiwiaXNEeW5hbWljVmFsaWRhdGUiLCJkeW5hbWljVmFsaWRhdGUiLCJjcmVhdGVEeW5hbWljVmFsaWRhdGUiLCJpc1ZhbGlkIiwiZ2V0VmFsaWRhdGVFcnJvcnMiLCJnZXRJc1ZhbGlkUmVzdWx0IiwicGFyZW50IiwidmFsaWRhdGVWYWx1ZUJ5TWV0YWRhdGEiLCJ2YWxpZGF0ZUVycm9ycyIsInNldE9iamVjdFZhbHVlQW5kR2V0VmFsaWRhdGlvbkVycm9ycyIsImdldEFsbEVycm9ycyIsIm5lc3RlZFZhbGlkYXRpb25zIiwiaXNOb3RQcm9wZXJ0eVZhbGlkYXRpb24iLCJjdXN0b20iLCJ2YWxp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LEVBQUU7QUFGSCxHQURhO0FBS3JCWCxFQUFBQSxXQUFXLEVBQUU7QUFDWEMsSUFBQUEsSUFBSSxFQUFFO0FBREssR0FMUTtBQVFyQm1DLEVBQUFBLE1BQU0sRUFBRTtBQUNObkMsSUFBQUEsSUFBSSxFQUFFLGtCQURBO0FBRU5VLElBQUFBLE9BQU8sRUFBRTtBQUZIO0FBUmEsQ0FBdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBYnN0cmFjdENvbnRyb2wsXG4gIEFic3RyYWN0Q29udHJvbE9wdGlvbnMsXG4gIEFzeW5jVmFsaWRhdG9yRm4sXG4gIEZvcm1BcnJheSxcbiAgRm9ybUJ1aWxkZXIsXG4gIEZvcm1Db250cm9sLFxuICBGb3JtR3JvdXAsXG4gIFZhbGlkYXRvckZuXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGNsYXNzVG9DbGFzcywgcGxhaW5Ub0NsYXNzIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgQ2xhc3NUeXBlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXIvQ2xhc3NUcmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBnZXRGcm9tQ29udGFpbmVyLFxuICBNZXRhZGF0YVN0b3JhZ2UsXG4gIHZhbGlkYXRlLFxuICB2YWxpZGF0ZVN5bmMsXG4gIFZhbGlkYXRpb25FcnJvcixcbiAgVmFsaWRhdGlvblR5cGVzLFxuICBWYWxpZGF0b3IsXG4gIFZhbGlkYXRvck9wdGlvbnNcbn0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcbmltcG9ydCB7IFZhbGlkYXRpb25NZXRhZGF0YSB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvci9tZXRhZGF0YS9WYWxpZGF0aW9uTWV0YWRhdGEnO1xuaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgRGljdGlvbmFyeSxcbiAgRHluYW1pY0Zvcm1Hcm91cEZpZWxkLFxuICBTaG9ydFZhbGlkYXRpb25FcnJvcnNcbn0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7XG4gIGZvcmV2ZXJJbnZhbGlkLFxuICBGT1JFVkVSX0lOVkFMSURfTkFNRVxufSBmcm9tICcuLi92YWxpZGF0b3JzL2ZvcmV2ZXItaW52YWxpZC52YWxpZGF0b3InO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm1Db250cm9sIH0gZnJvbSAnLi9keW5hbWljLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBXaWRnZXRPcHRpb25zLCBnZXRGb3JtRmllbGRzT3B0aW9ucyB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1jb3JlJztcblxuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdsb2Rhc2guY2xvbmVkZWVwJztcbmltcG9ydCBtZXJnZVdpdGggZnJvbSAnbG9kYXNoLm1lcmdld2l0aCc7XG5cbi8vIEVuZm9yY2VzIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBvYmplY3QsIGlmIHN1cHBsaWVkLCB0byBiZSBvZiB0aGUgb3JpZ2luYWwgdHlwZSBvciBEeW5hbWljRm9ybUdyb3VwIG9yLCBGb3JtQXJyYXlcbmV4cG9ydCB0eXBlIEZvcm1Nb2RlbDxUPiA9IHtcbiAgW1AgaW4ga2V5b2YgVF0/OiBUW1BdIHwgRHluYW1pY0Zvcm1Hcm91cDxhbnk+IHwgRm9ybUFycmF5O1xufTtcblxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtR3JvdXA8VE1vZGVsPiBleHRlbmRzIEZvcm1Hcm91cCB7XG4gIHB1YmxpYyBuYXRpdmVWYWxpZGF0ZUVycm9ycyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGljdGlvbmFyeT4oe30pO1xuICBwdWJsaWMgY3VzdG9tVmFsaWRhdGVFcnJvcnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNob3J0VmFsaWRhdGlvbkVycm9ycz4oe30pO1xuICBwdWJsaWMgZm9ybUVycm9yczogU2hvcnRWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9IG51bGw7XG4gIHB1YmxpYyBmb3JtRmllbGRzOiBEaWN0aW9uYXJ5O1xuICBwdWJsaWMgb2JqZWN0Q2hhbmdlID0gbmV3IFN1YmplY3QoKTtcblxuICBwcm90ZWN0ZWQgRm9ybUNvbnRyb2xDbGFzcyA9IER5bmFtaWNGb3JtQ29udHJvbDtcbiAgcHJvdGVjdGVkIF9vYmplY3Q6IFRNb2RlbCB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgX2V4dGVybmFsRXJyb3JzOiBTaG9ydFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkIF92YWxpZGF0b3JPcHRpb25zOiBWYWxpZGF0b3JPcHRpb25zIHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCBfZmIgPSBuZXcgRm9ybUJ1aWxkZXIoKTtcbiAgcHJpdmF0ZSBfZm9ybUdlbjogV2lkZ2V0T3B0aW9uc1tdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBmYWN0b3J5TW9kZWw6IENsYXNzVHlwZTxUTW9kZWw+LFxuICAgIHB1YmxpYyBmaWVsZHM6IEZvcm1Nb2RlbDxUTW9kZWw+LFxuICAgIHZhbGlkYXRvck9yT3B0cz86XG4gICAgICB8IFZhbGlkYXRvckZuXG4gICAgICB8IFZhbGlkYXRvckZuW11cbiAgICAgIHwgQWJzdHJhY3RDb250cm9sT3B0aW9uc1xuICAgICAgfCBudWxsLFxuICAgIGFzeW5jVmFsaWRhdG9yPzogQXN5bmNWYWxpZGF0b3JGbiB8IEFzeW5jVmFsaWRhdG9yRm5bXSB8IG51bGxcbiAgKSB7XG4gICAgc3VwZXIoe30sIHZhbGlkYXRvck9yT3B0cywgYXN5bmNWYWxpZGF0b3IpO1xuICAgIC8qXG4gICAgY29uc3QgY2xhc3NWYWxpZGF0b3JzID0gRHluYW1pY0Zvcm1Hcm91cC5nZXRDbGFzc1ZhbGlkYXRvcnM8VE1vZGVsPihcbiAgICAgIHRoaXMuZmFjdG9yeU1vZGVsLFxuICAgICAgdGhpcy5maWVsZHMsXG4gICAgICB0aGlzLmRlZmF1bHRWYWxpZGF0b3JPcHRpb25zXG4gICAgKTtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mYi5ncm91cChcbiAgICAgIGNsYXNzVmFsaWRhdG9yc1xuICAgICk7XG4gICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICB0aGlzLmFkZENvbnRyb2woa2V5LCBmb3JtR3JvdXAuY29udHJvbHNba2V5XSk7XG4gICAgfSk7XG4gICAgdGhpcy52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgdGhpcy52YWxpZGF0ZShcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICB0aGlzLmRlZmF1bHRWYWxpZGF0b3JPcHRpb25zXG4gICAgICApO1xuICAgIH0pOyovXG4gICAgdGhpcy5mb3JtRmllbGRzID0gdGhpcy5vbmx5RmllbGRzKGZpZWxkcyk7XG4gICAgdGhpcy5fZm9ybUdlbiA9IGdldEZvcm1GaWVsZHNPcHRpb25zKGZhY3RvcnlNb2RlbCk7XG4gIH1cblxuICBnZXRGb3JtR2VuRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybUdlbjtcbiAgfVxuXG4gIC8vIEdldHRlcnMgJiBTZXR0ZXJzXG4gIHNldCBleHRlcm5hbEVycm9ycyhleHRlcm5hbEVycm9yczogU2hvcnRWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCkge1xuICAgIHRoaXMuX2V4dGVybmFsRXJyb3JzID0gZXh0ZXJuYWxFcnJvcnM7XG4gICAgdGhpcy52YWxpZGF0ZSgpO1xuICB9XG4gIGdldCBleHRlcm5hbEVycm9ycygpOiBTaG9ydFZhbGlkYXRpb25FcnJvcnMgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fZXh0ZXJuYWxFcnJvcnM7XG4gIH1cblxuICBzZXQgdmFsaWRhdG9yT3B0aW9ucyh2YWxpZGF0b3JPcHRpb25zOiBWYWxpZGF0b3JPcHRpb25zIHwgbnVsbCkge1xuICAgIHRoaXMuX3ZhbGlkYXRvck9wdGlvbnMgPSB2YWxpZGF0b3JPcHRpb25zO1xuICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgfVxuICBnZXQgdmFsaWRhdG9yT3B0aW9ucygpOiBWYWxpZGF0b3JPcHRpb25zIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRvck9wdGlvbnM7XG4gIH1cblxuICBzZXQgb2JqZWN0KG9iamVjdDogVE1vZGVsKSB7XG4gICAgdGhpcy5zZXRPYmplY3Qob2JqZWN0KTtcbiAgfVxuICBnZXQgb2JqZWN0KCkge1xuICAgIHJldHVybiB0aGlzLmdldE9iamVjdCgpO1xuICB9XG5cbiAgLy8gUHVibGljIEFQSVxuICB2YWxpZGF0ZShcbiAgICBleHRlcm5hbEVycm9ycz86IFNob3J0VmFsaWRhdGlvbkVycm9ycyxcbiAgICB2YWxpZGF0b3JPcHRpb25zPzogVmFsaWRhdG9yT3B0aW9uc1xuICApIHtcbiAgICB0aGlzLnZhbGlkYXRlQXN5bmMoZXh0ZXJuYWxFcnJvcnMsIHZhbGlkYXRvck9wdGlvbnMpLnRoZW4oXG4gICAgICAoKSA9PiB7fSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIHZhbGlkYXRlQXN5bmMoXG4gICAgZXh0ZXJuYWxFcnJvcnM/OiBTaG9ydFZhbGlkYXRpb25FcnJvcnMsXG4gICAgdmFsaWRhdG9yT3B0aW9ucz86IFZhbGlkYXRvck9wdGlvbnNcbiAgKSB7XG4gICAgaWYgKGV4dGVybmFsRXJyb3JzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGV4dGVybmFsRXJyb3JzID0gY2xvbmVEZWVwKHRoaXMuX2V4dGVybmFsRXJyb3JzKTtcbiAgICB9XG5cbiAgICBpZiAodmFsaWRhdG9yT3B0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YWxpZGF0b3JPcHRpb25zID0gY2xvbmVEZWVwKHRoaXMuX3ZhbGlkYXRvck9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmICghZXh0ZXJuYWxFcnJvcnMpIHtcbiAgICAgIGV4dGVybmFsRXJyb3JzID0ge307XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHZhbGlkYXRlKHRoaXMub2JqZWN0LCB2YWxpZGF0b3JPcHRpb25zKTtcbiAgICAgIGNvbnN0IHZhbGlkYXRpb25FcnJvcnMgPSB0aGlzLnRyYW5zZm9ybVZhbGlkYXRpb25FcnJvcnMocmVzdWx0KTtcbiAgICAgIGNvbnN0IGFsbEVycm9ycyA9IHRoaXMubWVyZ2VFcnJvcnMoZXh0ZXJuYWxFcnJvcnMsIHZhbGlkYXRpb25FcnJvcnMpO1xuXG4gICAgICB0aGlzLm1hcmtBc0ludmFsaWRGb3JFeHRlcm5hbEVycm9ycyhleHRlcm5hbEVycm9ycyk7XG4gICAgICB0aGlzLnNldEN1c3RvbUVycm9ycyhhbGxFcnJvcnMpO1xuXG4gICAgICAvLyB0b2RvOiByZWZhY3RvciwgaW52YWxpZGF0ZSBmb3JtIGlmIGV4aXN0cyBhbnkgYWxsRXJyb3JzXG4gICAgICBsZXQgdXNlZEZvcmV2ZXJJbnZhbGlkID0gZmFsc2U7XG4gICAgICBpZiAoXG4gICAgICAgIE9iamVjdC5rZXlzKGFsbEVycm9ycykuZmlsdGVyKGtleSA9PiBrZXkgIT09IEZPUkVWRVJfSU5WQUxJRF9OQU1FKVxuICAgICAgICAgIC5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgdGhpcy5nZXQoRk9SRVZFUl9JTlZBTElEX05BTUUpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDb250cm9sKEZPUkVWRVJfSU5WQUxJRF9OQU1FKTtcbiAgICAgICAgdXNlZEZvcmV2ZXJJbnZhbGlkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy52YWxpZCAmJlxuICAgICAgICBPYmplY3Qua2V5cyhhbGxFcnJvcnMpLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgIXRoaXMuZ2V0KEZPUkVWRVJfSU5WQUxJRF9OQU1FKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuYWRkQ29udHJvbChcbiAgICAgICAgICBGT1JFVkVSX0lOVkFMSURfTkFNRSxcbiAgICAgICAgICBuZXcgRm9ybUNvbnRyb2woJycsIFtmb3JldmVySW52YWxpZCBhcyBhbnldKVxuICAgICAgICApO1xuICAgICAgICB1c2VkRm9yZXZlckludmFsaWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHVzZWRGb3JldmVySW52YWxpZCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe1xuICAgICAgICAgIG9ubHlTZWxmOiB0cnVlLFxuICAgICAgICAgIGVtaXRFdmVudDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHNldEN1c3RvbUVycm9ycyhhbGxFcnJvcnM6IGFueSkge1xuICAgIHRoaXMuZm9ybUVycm9ycyA9IGFsbEVycm9ycztcbiAgICB0aGlzLmN1c3RvbVZhbGlkYXRlRXJyb3JzLm5leHQodGhpcy5mb3JtRXJyb3JzIGFzIFNob3J0VmFsaWRhdGlvbkVycm9ycyApO1xuICAgIHRoaXMubmF0aXZlVmFsaWRhdGVFcnJvcnMubmV4dCh0aGlzLmNvbGxlY3RFcnJvcnModGhpcykpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbGxlY3RFcnJvcnMoY29udHJvbDogRGljdGlvbmFyeSwgaXNSb290ID0gdHJ1ZSk6IGFueSB8IG51bGwge1xuICAgIGlmIChjb250cm9sLmNvbnRyb2xzKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi4oaXNSb290ID8gdGhpcy5lcnJvcnMgOiB7fSksXG4gICAgICAgIC4uLk9iamVjdC5lbnRyaWVzKGNvbnRyb2wuY29udHJvbHMpLnJlZHVjZShcbiAgICAgICAgICAoYWNjOiBhbnksIFtrZXksIGNoaWxkQ29udHJvbF0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRXJyb3JzID0gdGhpcy5jb2xsZWN0RXJyb3JzKGNoaWxkQ29udHJvbCBhcyBEaWN0aW9uYXJ5PGFueT4sIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY2hpbGRFcnJvcnMgJiZcbiAgICAgICAgICAgICAga2V5ICE9PSAnZm9yZXZlckludmFsaWQnICYmXG4gICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNoaWxkRXJyb3JzKS5sZW5ndGggPiAwXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgYWNjID0ge1xuICAgICAgICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICAgICAgICBba2V5XToge1xuICAgICAgICAgICAgICAgICAgLi4uKGFjYyAmJiBhY2Nba2V5XSA/IGFjY1trZXldIDoge30pLFxuICAgICAgICAgICAgICAgICAgLi4uY2hpbGRFcnJvcnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICAgIH0sXG4gICAgICAgICAge31cbiAgICAgICAgKVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbnRyb2wuZXJyb3JzO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlQWxsRm9ybUZpZWxkcygpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldChmaWVsZCk7XG5cbiAgICAgIC8vIENvbnRyb2xcbiAgICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICB9XG4gICAgICAvLyBHcm91cDogcmVjdXJzaXZlXG4gICAgICBlbHNlIGlmIChjb250cm9sIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgICBjb250cm9sLnZhbGlkYXRlQWxsRm9ybUZpZWxkcygpO1xuICAgICAgfVxuICAgICAgLy8gQXJyYXlcbiAgICAgIGVsc2UgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAoY29udHJvbCBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gQ29udHJvbCBpbiBBcnJheVxuICAgICAgICAgIGlmICgoY29udHJvbCBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW2ldIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgICgoY29udHJvbCBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW2ldIGFzIEZvcm1Db250cm9sKS5tYXJrQXNUb3VjaGVkKHtcbiAgICAgICAgICAgICAgb25seVNlbGY6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBHcm91cCBpbiBBcnJheTogcmVjdXJzaXZlXG4gICAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgICAoY29udHJvbCBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW2ldIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgKChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gYXMgRHluYW1pY0Zvcm1Hcm91cDxcbiAgICAgICAgICAgICAgYW55XG4gICAgICAgICAgICA+KS52YWxpZGF0ZUFsbEZvcm1GaWVsZHMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0VmFsaWRhdGVBbGxGb3JtRmllbGRzKCkge1xuICAgIHRoaXMubWFya0FzSW52YWxpZEZvckV4dGVybmFsRXJyb3JzKHt9KTtcblxuICAgIE9iamVjdC5rZXlzKHRoaXMuY29udHJvbHMpLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0KGZpZWxkKTtcblxuICAgICAgLy8gQ29udHJvbFxuICAgICAgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xuICAgICAgICBjb250cm9sLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgIGNvbnRyb2wubWFya0FzVW50b3VjaGVkKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICAgIGNvbnRyb2wubWFya0FzUHJpc3RpbmUoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICAgIC8vIEdyb3VwOiByZWN1cnNpdmVcbiAgICAgIGVsc2UgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwKSB7XG4gICAgICAgIGNvbnRyb2wucmVzZXRWYWxpZGF0ZUFsbEZvcm1GaWVsZHMoKTtcbiAgICAgIH1cbiAgICAgIC8vIEFycmF5XG4gICAgICBlbHNlIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9scy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vIENvbnRyb2wgaW4gQXJyYXlcbiAgICAgICAgICBpZiAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tcbiAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgXSBhcyBGb3JtQ29udHJvbCkuc2V0RXJyb3JzKG51bGwsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgICAgICgoY29udHJvbCBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW1xuICAgICAgICAgICAgICBpXG4gICAgICAgICAgICBdIGFzIEZvcm1Db250cm9sKS5tYXJrQXNVbnRvdWNoZWQoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgICAgICAgICgoY29udHJvbCBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW2ldIGFzIEZvcm1Db250cm9sKS5tYXJrQXNQcmlzdGluZSh7XG4gICAgICAgICAgICAgIG9ubHlTZWxmOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gR3JvdXAgaW4gQXJyYXk6IHJlY3Vyc2l2ZVxuICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXBcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgICgoY29udHJvbCBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW2ldIGFzIER5bmFtaWNGb3JtR3JvdXA8XG4gICAgICAgICAgICAgIGFueVxuICAgICAgICAgICAgPikucmVzZXRWYWxpZGF0ZUFsbEZvcm1GaWVsZHMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnNldEN1c3RvbUVycm9ycyh7fSk7XG4gIH1cblxuICBjbGFzc1RvQ2xhc3M8VENsYXNzTW9kZWw+KG9iamVjdDogVENsYXNzTW9kZWwpIHtcbiAgICByZXR1cm4gY2xhc3NUb0NsYXNzKG9iamVjdCwgeyBpZ25vcmVEZWNvcmF0b3JzOiB0cnVlIH0pO1xuICB9XG5cbiAgcGxhaW5Ub0NsYXNzPFRDbGFzc01vZGVsLCBPYmplY3Q+KFxuICAgIGNsczogQ2xhc3NUeXBlPFRDbGFzc01vZGVsPixcbiAgICBwbGFpbjogT2JqZWN0XG4gICkge1xuICAgIHJldHVybiBwbGFpblRvQ2xhc3MoY2xzLCBwbGFpbiwgeyBpZ25vcmVEZWNvcmF0b3JzOiB0cnVlIH0pO1xuICB9XG5cbiAgYXN5bmMgc2V0RXh0ZXJuYWxFcnJvcnNBc3luYyhleHRlcm5hbEVycm9yczogU2hvcnRWYWxpZGF0aW9uRXJyb3JzKSB7XG4gICAgdGhpcy5fZXh0ZXJuYWxFcnJvcnMgPSBleHRlcm5hbEVycm9ycztcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudmFsaWRhdGVBc3luYygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBzZXRFeHRlcm5hbEVycm9ycyhleHRlcm5hbEVycm9yczogU2hvcnRWYWxpZGF0aW9uRXJyb3JzKSB7XG4gICAgdGhpcy5zZXRFeHRlcm5hbEVycm9yc0FzeW5jKGV4dGVybmFsRXJyb3JzKS50aGVuKFxuICAgICAgKCkgPT4ge30sXG4gICAgICBlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBnZXRFeHRlcm5hbEVycm9ycygpOiBTaG9ydFZhbGlkYXRpb25FcnJvcnMge1xuICAgIHJldHVybiB0aGlzLl9leHRlcm5hbEVycm9ycyBhcyBTaG9ydFZhbGlkYXRpb25FcnJvcnM7XG4gIH1cblxuICBjbGVhckV4dGVybmFsRXJyb3JzKCkge1xuICAgIHRoaXMuc2V0RXh0ZXJuYWxFcnJvcnMoe30pO1xuICB9XG4gIGNsZWFyRXh0ZXJuYWxFcnJvcnNBc3luYygpIHtcbiAgICByZXR1cm4gdGhpcy5zZXRFeHRlcm5hbEVycm9yc0FzeW5jKHt9KTtcbiAgfVxuXG4gIGFzeW5jIHNldFZhbGlkYXRvck9wdGlvbnNBc3luYyh2YWxpZGF0b3JPcHRpb25zOiBWYWxpZGF0b3JPcHRpb25zKSB7XG4gICAgdGhpcy5fdmFsaWRhdG9yT3B0aW9ucyA9IHZhbGlkYXRvck9wdGlvbnM7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnZhbGlkYXRlQXN5bmMoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgc2V0VmFsaWRhdG9yT3B0aW9ucyh2YWxpZGF0b3JPcHRpb25zOiBWYWxpZGF0b3JPcHRpb25zKSB7XG4gICAgdGhpcy5zZXRWYWxpZGF0b3JPcHRpb25zQXN5bmModmFsaWRhdG9yT3B0aW9ucykudGhlbihcbiAgICAgICgpID0+IHt9LFxuICAgICAgZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZ2V0VmFsaWRhdG9yT3B0aW9ucygpOiBWYWxpZGF0b3JPcHRpb25zIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdG9yT3B0aW9ucyBhcyBWYWxpZGF0b3JPcHRpb25zO1xuICB9XG5cbiAgLy8gSGVscGVyc1xuICBwcm90ZWN0ZWQgb25seUZpZWxkcyhmaWVsZHM6IEZvcm1Nb2RlbDxhbnk+KTogRGljdGlvbmFyeSB7XG4gICAgY29uc3QgbmV3RmllbGRzOiBEaWN0aW9uYXJ5ID0ge307XG5cbiAgICBpZiAoZmllbGRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIE9iamVjdC5rZXlzKGZpZWxkcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoZmllbGRzW2tleV0gaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwKSB7XG4gICAgICAgICAgLy8gR3JvdXA6IHJlY3Vyc2l2ZVxuICAgICAgICAgIG5ld0ZpZWxkc1trZXldID0gdGhpcy5vbmx5RmllbGRzKFxuICAgICAgICAgICAgKGZpZWxkc1trZXldIGFzIER5bmFtaWNGb3JtR3JvdXA8YW55PikuZm9ybUZpZWxkc1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQXJyYXlcbiAgICAgICAgICBpZiAoZmllbGRzW2tleV0gaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgKGZpZWxkc1trZXldIGFzIEZvcm1BcnJheSkuY29udHJvbHNbMF0gaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgLy8gR3JvdXAgd2l0aGluIEFycmF5OiByZWN1cnNpdmVcbiAgICAgICAgICAgICAgbmV3RmllbGRzW2tleV0gPSB0aGlzLm9ubHlGaWVsZHMoXG4gICAgICAgICAgICAgICAgKChmaWVsZHNba2V5XSBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzWzBdIGFzIER5bmFtaWNGb3JtR3JvdXA8XG4gICAgICAgICAgICAgICAgICBhbnlcbiAgICAgICAgICAgICAgICA+KS5mb3JtRmllbGRzXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBDb250cm9sIHdpdGhpbiBBcnJheVxuICAgICAgICAgICAgICBuZXdGaWVsZHNba2V5XSA9IChmaWVsZHNba2V5XSBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzWzBdLnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgQ29udHJvbFxuICAgICAgICAgICAgbmV3RmllbGRzW2tleV0gPSBmaWVsZHNba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdGaWVsZHM7XG4gIH1cblxuICB0cmFuc2Zvcm1WYWxpZGF0aW9uRXJyb3JzKGVycm9yczogVmFsaWRhdGlvbkVycm9yW10pOiBTaG9ydFZhbGlkYXRpb25FcnJvcnMge1xuICAgIGNvbnN0IGN1c3RvbUVycm9yczogU2hvcnRWYWxpZGF0aW9uRXJyb3JzID0ge307XG5cbiAgICBlcnJvcnMuZm9yRWFjaCgoZXJyb3I6IFZhbGlkYXRpb25FcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yICYmIGVycm9yLmNvbnN0cmFpbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoZXJyb3IuY29uc3RyYWludHMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgaWYgKCFjdXN0b21FcnJvcnNbZXJyb3IucHJvcGVydHldKSB7XG4gICAgICAgICAgICBjdXN0b21FcnJvcnNbZXJyb3IucHJvcGVydHldID0gW107XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgKGN1c3RvbUVycm9yc1tlcnJvci5wcm9wZXJ0eV0gYXMgc3RyaW5nW10pLmluZGV4T2YoXG4gICAgICAgICAgICAgIGVycm9yLmNvbnN0cmFpbnRzW2tleV1cbiAgICAgICAgICAgICkgPT09IC0xXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAoY3VzdG9tRXJyb3JzW2Vycm9yLnByb3BlcnR5XSBhcyBzdHJpbmdbXSkucHVzaChcbiAgICAgICAgICAgICAgZXJyb3IuY29uc3RyYWludHNba2V5XVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXJyb3IuY2hpbGRyZW4gIT09IHVuZGVmaW5lZCAmJiBlcnJvci5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgY3VzdG9tRXJyb3JzW2Vycm9yLnByb3BlcnR5XSA9IHRoaXMudHJhbnNmb3JtVmFsaWRhdGlvbkVycm9ycyhcbiAgICAgICAgICBlcnJvci5jaGlsZHJlblxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGN1c3RvbUVycm9ycztcbiAgfVxuXG4gIHByb3RlY3RlZCBtZXJnZUVycm9ycyhcbiAgICBleHRlcm5hbEVycm9ycz86IFNob3J0VmFsaWRhdGlvbkVycm9ycyxcbiAgICB2YWxpZGF0aW9uRXJyb3JzPzogU2hvcnRWYWxpZGF0aW9uRXJyb3JzXG4gICkge1xuICAgIGNvbnN0IGNsb25lZEV4dGVybmFsRXJyb3JzID0gY2xvbmVEZWVwKGV4dGVybmFsRXJyb3JzKTtcbiAgICByZXR1cm4gbWVyZ2VXaXRoKFxuICAgICAgY2xvbmVkRXh0ZXJuYWxFcnJvcnMsXG4gICAgICB2YWxpZGF0aW9uRXJyb3JzLFxuICAgICAgKG9ialZhbHVlLCBzcmNWYWx1ZSkgPT4ge1xuICAgICAgICBpZiAoY2FuTWVyZ2UoKSkge1xuICAgICAgICAgIHJldHVybiBvYmpWYWx1ZS5jb25jYXQoc3JjVmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2FuTWVyZ2UoKSB7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkob2JqVmFsdWUpICYmXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KHNyY1ZhbHVlKSAmJlxuICAgICAgICAgICAgb2JqVmFsdWUuZmlsdGVyKG9iakl0ZW0gPT4gc3JjVmFsdWUuaW5kZXhPZihvYmpJdGVtKSAhPT0gLTEpXG4gICAgICAgICAgICAgIC5sZW5ndGggPT09IDBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBtYXJrQXNJbnZhbGlkRm9yRXh0ZXJuYWxFcnJvcnMoXG4gICAgZXJyb3JzOiBTaG9ydFZhbGlkYXRpb25FcnJvcnMsXG4gICAgY29udHJvbHM/OiBEaWN0aW9uYXJ5PEFic3RyYWN0Q29udHJvbD5cbiAgKSB7XG4gICAgaWYgKCFjb250cm9scykge1xuICAgICAgY29udHJvbHMgPSB0aGlzLmNvbnRyb2xzO1xuICAgIH1cbiAgICBPYmplY3Qua2V5cyhjb250cm9scykuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBjb25zdCBjb250cm9sID0gY29udHJvbHMhW2ZpZWxkXTtcblxuICAgICAgLy8gQ29udHJvbFxuICAgICAgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xuICAgICAgICBpZiAoZXJyb3JzICYmIGVycm9yc1tmaWVsZF0pIHtcbiAgICAgICAgICBjb250cm9sLnNldEVycm9ycyh7IGV4dGVybmFsRXJyb3I6IHRydWUgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNvbnRyb2wuZXJyb3JzICYmIGNvbnRyb2wuZXJyb3JzLmV4dGVybmFsRXJyb3IgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnRyb2wuc2V0RXJyb3JzKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gR3JvdXBcbiAgICAgIGVsc2UgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwKSB7XG4gICAgICAgIGNvbnRyb2wubWFya0FzSW52YWxpZEZvckV4dGVybmFsRXJyb3JzKFxuICAgICAgICAgIGVycm9ycyAmJiBlcnJvcnNbZmllbGRdXG4gICAgICAgICAgICA/IChlcnJvcnNbZmllbGRdIGFzIFNob3J0VmFsaWRhdGlvbkVycm9ycylcbiAgICAgICAgICAgIDoge31cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIC8vIEFycmF5XG4gICAgICBlbHNlIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vIENvbnRyb2wgaW4gQXJyYXlcbiAgICAgICAgICBpZiAoY29udHJvbFtpXSBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3JzICYmIGVycm9yc1tpXSAmJiBlcnJvcnNbaV1bZmllbGRdKSB7XG4gICAgICAgICAgICAgIGNvbnRyb2xbaV0uc2V0RXJyb3JzKHsgZXh0ZXJuYWxFcnJvcjogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgIGNvbnRyb2xbaV0uZXJyb3JzICYmXG4gICAgICAgICAgICAgIGNvbnRyb2xbaV0uZXJyb3JzLmV4dGVybmFsRXJyb3IgPT09IHRydWVcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb250cm9sW2ldLnNldEVycm9ycyhudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gR3JvdXAgaW4gQXJyYXlcbiAgICAgICAgICBlbHNlIGlmIChjb250cm9sW2ldIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgICAgICAgY29udHJvbFtpXS5tYXJrQXNJbnZhbGlkRm9yRXh0ZXJuYWxFcnJvcnMoXG4gICAgICAgICAgICAgIGVycm9ycyAmJiBlcnJvcnNbaV0gJiYgZXJyb3JzW2ldW2ZpZWxkXVxuICAgICAgICAgICAgICAgID8gKGVycm9yc1tpXVtmaWVsZF0gYXMgU2hvcnRWYWxpZGF0aW9uRXJyb3JzKVxuICAgICAgICAgICAgICAgIDoge31cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgZ2V0cyBhbGwgdmFsdWVzIGZyb20gdGhlIGZvcm0gY29udHJvbHMgYW5kIGFsbCBzdWIgZm9ybSBncm91cCBhbmQgYXJyYXkgY29udHJvbHMgYW5kIHJldHVybnMgaXQgYXNcbiAgICogYW4gb2JqZWN0XG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0T2JqZWN0KCk6IFRNb2RlbCB7XG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgc2hhcGUgb2YgdGhlIHJlc3BvbnNlXG4gICAgY29uc3Qgb2JqZWN0ID0gdGhpcy5fb2JqZWN0XG4gICAgICA/IHRoaXMuY2xhc3NUb0NsYXNzKHRoaXMuX29iamVjdClcbiAgICAgIDogdGhpcy5mYWN0b3J5TW9kZWxcbiAgICAgID8gbmV3IHRoaXMuZmFjdG9yeU1vZGVsKClcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKG9iamVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBSZWN1cnNpdmVseSBnZXQgdGhlIHZhbHVlIG9mIGFsbCBmaWVsZHNcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuY29udHJvbHMpXG4gICAgICAgIC5maWx0ZXIobmFtZSA9PiBuYW1lICE9PSBGT1JFVkVSX0lOVkFMSURfTkFNRSlcbiAgICAgICAgLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAvLyBIYW5kbGUgR3JvdXBcbiAgICAgICAgICBpZiAodGhpcy5jb250cm9sc1trZXldIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgICAgICAgb2JqZWN0W2tleV0gPSAodGhpcy5jb250cm9sc1trZXldIGFzIER5bmFtaWNGb3JtR3JvdXA8YW55Pikub2JqZWN0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEhhbmRsZSBGb3JtIEFycmF5XG4gICAgICAgICAgZWxzZSBpZiAodGhpcy5jb250cm9sc1trZXldIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHZhbHVlXG4gICAgICAgICAgICBvYmplY3Rba2V5XSA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgICAgICAgIGkgPCAodGhpcy5jb250cm9sc1trZXldIGFzIEZvcm1BcnJheSkuY29udHJvbHMubGVuZ3RoO1xuICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBsZXQgdmFsdWU7XG5cbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICh0aGlzLmNvbnRyb2xzW2tleV0gYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBpbnN0YW5jZW9mXG4gICAgICAgICAgICAgICAgRHluYW1pY0Zvcm1Hcm91cFxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyBSZWN1cnNpdmVseSBnZXQgb2JqZWN0IGdyb3VwXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAoKHRoaXMuY29udHJvbHNba2V5XSBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW1xuICAgICAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgICAgIF0gYXMgRHluYW1pY0Zvcm1Hcm91cDxhbnk+KS5vYmplY3Q7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSAodGhpcy5jb250cm9sc1trZXldIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0udmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHZhbHVlICYmIE9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0W2tleV0ucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBIYW5kbGUgQ29udHJvbFxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgb2JqZWN0W2tleV0gPSB0aGlzLmNvbnRyb2xzW2tleV0udmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuICh0aGlzLmZhY3RvcnlNb2RlbFxuICAgICAgPyB0aGlzLnBsYWluVG9DbGFzcyh0aGlzLmZhY3RvcnlNb2RlbCwgb2JqZWN0KVxuICAgICAgOiBvYmplY3QpIGFzIFRNb2RlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiBldmVyeSBjb250cm9sIG9uIHRoZSBmb3JtIGFuZCByZWN1cnNpdmVseSBzZXRzIHRoZSB2YWx1ZXMgb2YgdGhlIGNvbnRyb2xzXG4gICAqIG9uIGFsbCBzdWIgZm9ybSBncm91cHNcbiAgICpcbiAgICogQHBhcmFtIG9iamVjdCB0aGUgZGF0YSB0byBhc3NpZ24gdG8gYWxsIGNvbnRyb2xzIG9mIHRoZSBmb3JtIGdyb3VwIGFuZCBzdWIgZ3JvdXBzXG4gICAqL1xuICBwcm90ZWN0ZWQgc2V0T2JqZWN0KG9iamVjdDogVE1vZGVsKSB7XG4gICAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIHRoaXMuZmFjdG9yeU1vZGVsKSB7XG4gICAgICB0aGlzLl9vYmplY3QgPSB0aGlzLmNsYXNzVG9DbGFzcyhvYmplY3QpOyAvLyBFbnN1cmUgY29ycmVjdCB0eXBlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX29iamVjdCA9IHRoaXMucGxhaW5Ub0NsYXNzKHRoaXMuZmFjdG9yeU1vZGVsLCBvYmplY3QgYXMgT2JqZWN0KTsgLy8gQ29udmVydCB0byBNb2RlbCB0eXBlXG4gICAgfVxuXG4gICAgLy8gUmVjdXJzaXZlbHkgc2V0IHRoZSB2YWx1ZSBvZiBhbGwgZmllbGRzXG4gICAgT2JqZWN0LmtleXModGhpcy5jb250cm9scykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgLy8gSGFuZGxlIEdyb3VwXG4gICAgICBpZiAodGhpcy5jb250cm9sc1trZXldIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgICAodGhpcy5jb250cm9sc1trZXldIGFzIER5bmFtaWNGb3JtR3JvdXA8YW55Pikub2JqZWN0ID0gdGhpcy5fb2JqZWN0XG4gICAgICAgICAgPyB0aGlzLl9vYmplY3Rba2V5XVxuICAgICAgICAgIDoge307XG4gICAgICB9XG5cbiAgICAgIC8vIEhhbmRsZSBGb3JtQXJyYXlcbiAgICAgIGVsc2UgaWYgKHRoaXMuY29udHJvbHNba2V5XSBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgICBjb25zdCBvYmplY3RBcnJheSA9IHRoaXMuX29iamVjdCA/IHRoaXMuX29iamVjdFtrZXldIDogW107XG4gICAgICAgIGNvbnN0IGZvcm1BcnJheSA9IHRoaXMuY29udHJvbHNba2V5XSBhcyBGb3JtQXJyYXk7XG4gICAgICAgIGNvbnN0IGlzRm9ybUdyb3VwID0gZm9ybUFycmF5LmNvbnRyb2xzWzBdIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cDtcbiAgICAgICAgY29uc3QgZmlyc3RGb3JtR3JvdXAgPSBmb3JtQXJyYXkuY29udHJvbHNbMF0gYXMgRHluYW1pY0Zvcm1Hcm91cDxhbnk+O1xuICAgICAgICBjb25zdCBmb3JtQ29udHJvbCA9IGZvcm1BcnJheS5jb250cm9sc1swXSBhcyBGb3JtQ29udHJvbDtcblxuICAgICAgICAvLyBDbGVhciBGb3JtQXJyYXkgd2hpbGUgcmV0YWluaW5nIHRoZSByZWZlcmVuY2VcbiAgICAgICAgd2hpbGUgKGZvcm1BcnJheS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBmb3JtQXJyYXkucmVtb3ZlQXQoMCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdEFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGlzRm9ybUdyb3VwKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgRm9ybUdyb3VwXG4gICAgICAgICAgICBjb25zdCBkeW5hbWljRm9ybUdyb3VwID0gbmV3IER5bmFtaWNGb3JtR3JvdXAoXG4gICAgICAgICAgICAgIGZpcnN0Rm9ybUdyb3VwLmZhY3RvcnlNb2RlbCxcbiAgICAgICAgICAgICAgZmlyc3RGb3JtR3JvdXAuZm9ybUZpZWxkc1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZHluYW1pY0Zvcm1Hcm91cC5zZXRQYXJlbnQodGhpcyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNsYXNzVmFsaWRhdG9ycyA9IGdldENsYXNzVmFsaWRhdG9yczxUTW9kZWw+KFxuICAgICAgICAgICAgICBmaXJzdEZvcm1Hcm91cC5mYWN0b3J5TW9kZWwsXG4gICAgICAgICAgICAgIGZpcnN0Rm9ybUdyb3VwLmZvcm1GaWVsZHMsXG4gICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgdGhpcy5Gb3JtQ29udHJvbENsYXNzXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZmIuZ3JvdXAoY2xhc3NWYWxpZGF0b3JzKTtcblxuICAgICAgICAgICAgLy8gQWRkIGFsbCBjb250cm9scyB0byB0aGUgZm9ybSBncm91cFxuICAgICAgICAgICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGN0cmxLZXkgPT4ge1xuICAgICAgICAgICAgICBkeW5hbWljRm9ybUdyb3VwLmFkZENvbnRyb2woY3RybEtleSwgZm9ybUdyb3VwLmNvbnRyb2xzW2N0cmxLZXldKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBBZGQgYSB2YWx1ZSBjaGFuZ2UgbGlzdGVuZXIgdG8gdGhlIGdyb3VwLiBvbiBjaGFuZ2UsIHZhbGlkYXRlXG4gICAgICAgICAgICBkeW5hbWljRm9ybUdyb3VwLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgIGR5bmFtaWNGb3JtR3JvdXAudmFsaWRhdGUodW5kZWZpbmVkLCB0aGlzLl92YWxpZGF0b3JPcHRpb25zIGFzIFZhbGlkYXRvck9wdGlvbnMpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvcm1BcnJheS5jb250cm9scy5wdXNoKGR5bmFtaWNGb3JtR3JvdXApO1xuXG4gICAgICAgICAgICAvLyBSZWN1c3JpdmVseSBzZXQgdGhlIG9iamVjdCB2YWx1ZVxuICAgICAgICAgICAgKGZvcm1BcnJheS5jb250cm9sc1tpXSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT4pLm9iamVjdCA9XG4gICAgICAgICAgICAgIHRoaXMuX29iamVjdCAmJiBvYmplY3RBcnJheSAmJiBvYmplY3RBcnJheVtpXVxuICAgICAgICAgICAgICAgID8gb2JqZWN0QXJyYXlbaV1cbiAgICAgICAgICAgICAgICA6IHt9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgY29udHJvbFxuICAgICAgICAgICAgY29uc3QgY29udHJvbFZhbHVlID1cbiAgICAgICAgICAgICAgdGhpcy5fb2JqZWN0ICYmIG9iamVjdEFycmF5ICYmIG9iamVjdEFycmF5W2ldXG4gICAgICAgICAgICAgICAgPyBvYmplY3RBcnJheVtpXVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3QgbmV3Rm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woXG4gICAgICAgICAgICAgIGNvbnRyb2xWYWx1ZSxcbiAgICAgICAgICAgICAgZm9ybUNvbnRyb2wudmFsaWRhdG9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbmV3Rm9ybUNvbnRyb2wuc2V0UGFyZW50KHRoaXMpO1xuXG4gICAgICAgICAgICAvLyBBZGQgdGhlIGNvbnRyb2wgdG8gdGhlIEZvcm1BcnJheVxuICAgICAgICAgICAgZm9ybUFycmF5LmNvbnRyb2xzLnB1c2gobmV3Rm9ybUNvbnRyb2wpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBIYW5kbGUgQ29udHJvbFxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IG5ld09iamVjdCA9IHRoaXMuX29iamVjdCA/IHRoaXMuX29iamVjdFtrZXldIDogW107XG4gICAgICAgIHRoaXMuY29udHJvbHNba2V5XS5zZXRWYWx1ZShcbiAgICAgICAgICB0aGlzLl9vYmplY3QgJiYgbmV3T2JqZWN0ID8gbmV3T2JqZWN0IDogdW5kZWZpbmVkXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5vYmplY3RDaGFuZ2UubmV4dCh0aGlzLl9vYmplY3QpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGFzc1ZhbGlkYXRvcnM8VE1vZGVsPihcbiAgZmFjdG9yeU1vZGVsOiBDbGFzc1R5cGU8VE1vZGVsPixcbiAgZmllbGRzOiBEaWN0aW9uYXJ5LFxuICB2YWxpZGF0b3JPcHRpb25zPzogVmFsaWRhdG9yT3B0aW9ucyxcbiAgRm9ybUNvbnRyb2xDbGFzczogYW55ID0gRHluYW1pY0Zvcm1Db250cm9sXG4pIHtcbiAgLy8gR2V0IHRoZSB2YWxpZGF0aW9uIHJ1bGVzIGZyb20gdGhlIG9iamVjdCBkZWNvcmF0b3JzXG4gIGNvbnN0IGFsbFZhbGlkYXRpb25NZXRhZGF0YXM6IFZhbGlkYXRpb25NZXRhZGF0YVtdID0gZ2V0RnJvbUNvbnRhaW5lcihcbiAgICBNZXRhZGF0YVN0b3JhZ2VcbiAgKS5nZXRUYXJnZXRWYWxpZGF0aW9uTWV0YWRhdGFzKGZhY3RvcnlNb2RlbCwgJycpO1xuXG4gIC8vIEdldCB0aGUgdmFsaWRhdGlvbiBydWxlcyBmb3IgdGhlIHZhbGlkYXRpb24gZ3JvdXA6IGh0dHBzOi8vZ2l0aHViLmNvbS90eXBlc3RhY2svY2xhc3MtdmFsaWRhdG9yI3ZhbGlkYXRpb24tZ3JvdXBzXG4gIGNvbnN0IHZhbGlkYXRpb25Hcm91cE1ldGFkYXRhczogVmFsaWRhdGlvbk1ldGFkYXRhW10gPSBnZXRGcm9tQ29udGFpbmVyKFxuICAgIE1ldGFkYXRhU3RvcmFnZVxuICApLmdldFRhcmdldFZhbGlkYXRpb25NZXRhZGF0YXMoXG4gICAgZmFjdG9yeU1vZGVsLFxuICAgICcnLFxuICAgIHZhbGlkYXRvck9wdGlvbnMgJiYgdmFsaWRhdG9yT3B0aW9ucy5ncm91cHNcbiAgICAgID8gdmFsaWRhdG9yT3B0aW9ucy5ncm91cHNcbiAgICAgIDogdW5kZWZpbmVkXG4gICk7XG5cbiAgY29uc3QgZm9ybUdyb3VwRmllbGRzID0ge307XG4gIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBWYWxpZGF0b3IoKTtcblxuICAvLyBMb29wIHRocm91Z2ggYWxsIGZpZWxkcyBpbiB0aGUgZm9ybSBkZWZpbml0aW9uXG4gIE9iamVjdC5rZXlzKGZpZWxkcylcbiAgICAuZmlsdGVyKGtleSA9PiBrZXkuaW5kZXhPZignX18nKSAhPT0gMClcbiAgICAuZm9yRWFjaChmaWVsZE5hbWUgPT4ge1xuICAgICAgLy8gQ29uZGl0aW9uYWwgVmFsaWRhdGlvbiBmb3IgdGhlIGZpZWxkXG4gICAgICBjb25zdCBjb25kaXRpb25hbFZhbGlkYXRpb25zOiBWYWxpZGF0aW9uTWV0YWRhdGFbXSA9IFtdO1xuICAgICAgdmFsaWRhdGlvbkdyb3VwTWV0YWRhdGFzLmZvckVhY2godmFsaWRhdGlvbk1ldGFkYXRhID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlzUHJvcGVydHlWYWxpZGF0b3JPZlR5cGUoXG4gICAgICAgICAgICB2YWxpZGF0aW9uTWV0YWRhdGEsXG4gICAgICAgICAgICBmaWVsZE5hbWUsXG4gICAgICAgICAgICBWYWxpZGF0aW9uS2V5cy5jb25kaXRpb25hbC50eXBlXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25kaXRpb25hbFZhbGlkYXRpb25zLnB1c2godmFsaWRhdGlvbk1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIEFsbCBOZXN0ZWQgVmFsaWRhdGlvbiBmb3IgdGhlIGZpZWxkXG4gICAgICBjb25zdCBhbGxOZXN0ZWRWYWxpZGF0aW9uczogVmFsaWRhdGlvbk1ldGFkYXRhW10gPSBbXTtcbiAgICAgIGFsbFZhbGlkYXRpb25NZXRhZGF0YXMuZm9yRWFjaCh2YWxpZGF0aW9uTWV0YWRhdGEgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaXNQcm9wZXJ0eVZhbGlkYXRvck9mVHlwZShcbiAgICAgICAgICAgIHZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICAgIFZhbGlkYXRpb25LZXlzLm5lc3RlZC50eXBlXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBhbGxOZXN0ZWRWYWxpZGF0aW9ucy5wdXNoKHZhbGlkYXRpb25NZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBOZXN0ZWQgVmFsaWRhdGlvbiBmb3IgdGhlIGZpZWxkIGZvciB0aGUgcmVxdWVzdGVkIGNsYXNzLXZhbGlkYXRvciBncm91cFxuICAgICAgY29uc3QgbmVzdGVkR3JvdXBWYWxpZGF0aW9uczogVmFsaWRhdGlvbk1ldGFkYXRhW10gPSBbXTtcbiAgICAgIHZhbGlkYXRpb25Hcm91cE1ldGFkYXRhcy5mb3JFYWNoKHZhbGlkYXRpb25NZXRhZGF0YSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpc1Byb3BlcnR5VmFsaWRhdG9yT2ZUeXBlKFxuICAgICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgICAgICAgICAgZmllbGROYW1lLFxuICAgICAgICAgICAgVmFsaWRhdGlvbktleXMubmVzdGVkLnR5cGVcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIG5lc3RlZEdyb3VwVmFsaWRhdGlvbnMucHVzaCh2YWxpZGF0aW9uTWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZmllbGREZWZpbml0aW9uOiBEeW5hbWljRm9ybUdyb3VwRmllbGQgPSB7XG4gICAgICAgIGRhdGE6IGZvcm1Hcm91cEZpZWxkc1tmaWVsZE5hbWVdLFxuICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb25zOiBbXSxcbiAgICAgICAgdmFsaWRhdGlvbkRlZmluaXRpb25zOiBbXVxuICAgICAgfTtcblxuICAgICAgaWYgKGZpZWxkRGVmaW5pdGlvbi5kYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZmllbGREZWZpbml0aW9uLmRhdGEgPSBmaWVsZHNbZmllbGROYW1lXTtcbiAgICAgIH1cbiAgICAgIC8vIFRSWSBMSU5LIEVYSVNUUyBOQVRJVkUgVkFMSURBVElPTlMsIFVOU1RBQkxFICEhIVxuICAgICAgaWYgKFxuICAgICAgICBBcnJheS5pc0FycmF5KGZpZWxkRGVmaW5pdGlvbi5kYXRhKSAmJlxuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YS5sZW5ndGggPiAxICYmXG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbi5kYXRhLmZpbHRlcihcbiAgICAgICAgICAodmFsaWRhdGlvbkZ1bmN0aW9uLCBpbmRleCkgPT5cbiAgICAgICAgICAgIGluZGV4ID4gMCAmJiB0eXBlb2YgdmFsaWRhdGlvbkZ1bmN0aW9uID09PSAnZnVuY3Rpb24nXG4gICAgICAgICkubGVuZ3RoID4gMFxuICAgICAgKSB7XG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbi5kYXRhXG4gICAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAgICh2YWxpZGF0aW9uRnVuY3Rpb24sIGluZGV4KSA9PlxuICAgICAgICAgICAgICBpbmRleCA+IDAgJiYgdHlwZW9mIHZhbGlkYXRpb25GdW5jdGlvbiA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgIClcbiAgICAgICAgICAuZm9yRWFjaCh2YWxpZGF0aW9uRnVuY3Rpb24gPT5cbiAgICAgICAgICAgIGZpZWxkRGVmaW5pdGlvbi52YWxpZGF0aW9uRnVuY3Rpb25zLnB1c2godmFsaWRhdGlvbkZ1bmN0aW9uKVxuICAgICAgICAgICk7XG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbi5kYXRhID0gZmllbGREZWZpbml0aW9uLmRhdGFbMF07XG4gICAgICB9XG5cbiAgICAgIHZhbGlkYXRpb25Hcm91cE1ldGFkYXRhcy5mb3JFYWNoKHZhbGlkYXRpb25NZXRhZGF0YSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB2YWxpZGF0aW9uTWV0YWRhdGEucHJvcGVydHlOYW1lID09PSBmaWVsZE5hbWUgJiZcbiAgICAgICAgICB2YWxpZGF0aW9uTWV0YWRhdGEudHlwZSAhPT0gVmFsaWRhdGlvbktleXMuY29uZGl0aW9uYWwudHlwZVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBBZGQgYWxsIHZhbGlkYXRpb24gdG8gdGhlIGZpZWxkIGV4Y2VwdCB0aGUgQE5lc3RlZFZhbGlkYXRpb24gZGVmaW5pdGlvbiBhc1xuICAgICAgICAgIC8vIGJlaW5nIHBhcnQgb2YgdGhlIGZvcm0gd291bGQgaW1wbHkgaXQgaXMgdmFsaWRhdGVkIGlmIGFueSBvdGhlciBydWxlcyBhcmUgcHJlc2VudFxuICAgICAgICAgIGlmICh2YWxpZGF0aW9uTWV0YWRhdGEudHlwZSAhPT0gVmFsaWRhdGlvbktleXMubmVzdGVkLnR5cGUpIHtcbiAgICAgICAgICAgIGZpZWxkRGVmaW5pdGlvbi52YWxpZGF0aW9uRGVmaW5pdGlvbnMucHVzaCh2YWxpZGF0aW9uTWV0YWRhdGEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAoY29uc3QgdHlwZUtleSBpbiBWYWxpZGF0aW9uVHlwZXMpIHtcbiAgICAgICAgICAgIGlmIChWYWxpZGF0aW9uVHlwZXMuaGFzT3duUHJvcGVydHkodHlwZUtleSkpIHtcbiAgICAgICAgICAgICAgLy8gSGFuZGxlIE5lc3RlZCBWYWxpZGF0aW9uXG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBjaGVja1dpdGhBbGxOZXN0ZWRWYWxpZGF0aW9ucyhcbiAgICAgICAgICAgICAgICAgIGFsbE5lc3RlZFZhbGlkYXRpb25zLFxuICAgICAgICAgICAgICAgICAgbmVzdGVkR3JvdXBWYWxpZGF0aW9ucyxcbiAgICAgICAgICAgICAgICAgIGZpZWxkTmFtZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTmVzdGVkVmFsaWRhdGUodmFsaWRhdGlvbk1ldGFkYXRhLCB0eXBlS2V5KSkge1xuICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqZWN0VG9WYWxpZGF0ZSA9XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkc1tmaWVsZE5hbWVdIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgID8gZmllbGRzW2ZpZWxkTmFtZV0ub2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICBjb25zdCBuZXN0ZWRWYWxpZGF0ZSA9IGNyZWF0ZU5lc3RlZFZhbGlkYXRlKFxuICAgICAgICAgICAgICAgICAgICBvYmplY3RUb1ZhbGlkYXRlLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uTWV0YWRhdGFcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBzZXRGaWVsZERhdGEoZmllbGROYW1lLCBmaWVsZERlZmluaXRpb24sIG5lc3RlZFZhbGlkYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBIYW5kbGUgQ3VzdG9tIFZhbGlkYXRpb25cbiAgICAgICAgICAgICAgaWYgKGlzQ3VzdG9tVmFsaWRhdGUodmFsaWRhdGlvbk1ldGFkYXRhLCB0eXBlS2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1c3RvbVZhbGlkYXRpb24gPSBjcmVhdGVDdXN0b21WYWxpZGF0aW9uKFxuICAgICAgICAgICAgICAgICAgZmllbGROYW1lLFxuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBzZXRGaWVsZERhdGEoZmllbGROYW1lLCBmaWVsZERlZmluaXRpb24sIGN1c3RvbVZhbGlkYXRpb24pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gSGFuZGxlIHJlbWFpbmluZyB2YWxpZGF0aW9uXG4gICAgICAgICAgICAgIGlmIChpc0R5bmFtaWNWYWxpZGF0ZSh2YWxpZGF0aW9uTWV0YWRhdGEsIHR5cGVLZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZHluYW1pY1ZhbGlkYXRlID0gY3JlYXRlRHluYW1pY1ZhbGlkYXRlKFxuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgY29uZGl0aW9uYWxWYWxpZGF0aW9ucyxcbiAgICAgICAgICAgICAgICAgIGZpZWxkTmFtZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgc2V0RmllbGREYXRhKGZpZWxkTmFtZSwgZmllbGREZWZpbml0aW9uLCBkeW5hbWljVmFsaWRhdGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIENvbnZlcnQgdG8gYSBzdHJ1Y3R1cmUsIGFuZ3VsYXIgdW5kZXJzdGFuZHNcbiAgICAgIGlmIChcbiAgICAgICAgZmllbGREZWZpbml0aW9uLmRhdGEgaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwIHx8XG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbi5kYXRhIGluc3RhbmNlb2YgRm9ybUFycmF5XG4gICAgICApIHtcbiAgICAgICAgZm9ybUdyb3VwRmllbGRzW2ZpZWxkTmFtZV0gPSBmaWVsZERlZmluaXRpb24uZGF0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm1Hcm91cEZpZWxkc1tmaWVsZE5hbWVdID0gbmV3IEZvcm1Db250cm9sQ2xhc3MoZmllbGREZWZpbml0aW9uKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICByZXR1cm4gZm9ybUdyb3VwRmllbGRzO1xuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyBMb2NhbCBIZWxwZXIgZnVuY3Rpb25zIHRvIGhlbHAgbWFrZSB0aGUgbWFpbiBjb2RlIG1vcmUgcmVhZGFibGVcbiAgLy9cblxuICBmdW5jdGlvbiBjcmVhdGVOZXN0ZWRWYWxpZGF0ZShcbiAgICBvYmplY3RUb1ZhbGlkYXRlOiBhbnksXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGFcbiAgKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRyb2w6IEZvcm1Db250cm9sKSB7XG4gICAgICBjb25zdCBpc1ZhbGlkID1cbiAgICAgICAgZ2V0VmFsaWRhdGVFcnJvcnMoXG4gICAgICAgICAgY29udHJvbCxcbiAgICAgICAgICBvYmplY3RUb1ZhbGlkYXRlICE9PSB1bmRlZmluZWQgPyBvYmplY3RUb1ZhbGlkYXRlIDogY29udHJvbC52YWx1ZSxcbiAgICAgICAgICB2YWxpZGF0b3JPcHRpb25zIGFzIFZhbGlkYXRvck9wdGlvbnNcbiAgICAgICAgKS5sZW5ndGggPT09IDA7XG4gICAgICByZXR1cm4gZ2V0SXNWYWxpZFJlc3VsdChpc1ZhbGlkLCB2YWxpZGF0aW9uTWV0YWRhdGEsICduZXN0ZWRWYWxpZGF0ZScpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVEeW5hbWljVmFsaWRhdGUoXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGEsXG4gICAgY29uZGl0aW9uYWxWYWxpZGF0aW9uczogVmFsaWRhdGlvbk1ldGFkYXRhW10sXG4gICAgZmllbGROYW1lOiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRyb2w6IEZvcm1Db250cm9sKSB7XG4gICAgICBpZiAoIWNvbnRyb2wpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGxldCBpc1ZhbGlkID1cbiAgICAgICAgY29udHJvbC5wYXJlbnQgJiYgY29udHJvbC5wYXJlbnQudmFsdWVcbiAgICAgICAgICA/IHZhbGlkYXRvci52YWxpZGF0ZVZhbHVlQnlNZXRhZGF0YShjb250cm9sLnZhbHVlLCB2YWxpZGF0aW9uTWV0YWRhdGEpXG4gICAgICAgICAgOiB0cnVlO1xuXG4gICAgICBpZiAoIWlzVmFsaWQgJiYgY29uZGl0aW9uYWxWYWxpZGF0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRlRXJyb3JzID0gc2V0T2JqZWN0VmFsdWVBbmRHZXRWYWxpZGF0aW9uRXJyb3JzKFxuICAgICAgICAgIGNvbnRyb2wsXG4gICAgICAgICAgZmllbGROYW1lLFxuICAgICAgICAgIHZhbGlkYXRvck9wdGlvbnMgYXMgVmFsaWRhdG9yT3B0aW9uc1xuICAgICAgICApO1xuICAgICAgICBpc1ZhbGlkID1cbiAgICAgICAgICB2YWxpZGF0ZUVycm9ycy5maWx0ZXIoXG4gICAgICAgICAgICAoZXJyb3I6IFZhbGlkYXRpb25FcnJvcikgPT4gZXJyb3IucHJvcGVydHkgPT09IGZpZWxkTmFtZVxuICAgICAgICAgICkubGVuZ3RoID09PSAwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZ2V0SXNWYWxpZFJlc3VsdChpc1ZhbGlkLCB2YWxpZGF0aW9uTWV0YWRhdGEsICdkeW5hbWljVmFsaWRhdGUnKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ3VzdG9tVmFsaWRhdGlvbihcbiAgICBmaWVsZE5hbWU6IHN0cmluZyxcbiAgICB2YWxpZGF0aW9uTWV0YWRhdGE6IFZhbGlkYXRpb25NZXRhZGF0YVxuICApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oY29udHJvbDogRm9ybUNvbnRyb2wpIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRlRXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JbXSA9IHNldE9iamVjdFZhbHVlQW5kR2V0VmFsaWRhdGlvbkVycm9ycyhcbiAgICAgICAgY29udHJvbCxcbiAgICAgICAgZmllbGROYW1lLFxuICAgICAgICB2YWxpZGF0b3JPcHRpb25zIGFzIFZhbGlkYXRvck9wdGlvbnNcbiAgICAgICk7XG4gICAgICBjb25zdCBpc1ZhbGlkID0gZ2V0QWxsRXJyb3JzKHZhbGlkYXRlRXJyb3JzLCBmaWVsZE5hbWUpLmxlbmd0aCA9PT0gMDtcbiAgICAgIHJldHVybiBnZXRJc1ZhbGlkUmVzdWx0KGlzVmFsaWQsIHZhbGlkYXRpb25NZXRhZGF0YSwgJ2N1c3RvbVZhbGlkYXRpb24nKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tXaXRoQWxsTmVzdGVkVmFsaWRhdGlvbnMoXG4gICAgYWxsTmVzdGVkVmFsaWRhdGlvbnM6IFZhbGlkYXRpb25NZXRhZGF0YVtdLFxuICAgIG5lc3RlZFZhbGlkYXRpb25zOiBWYWxpZGF0aW9uTWV0YWRhdGFbXSxcbiAgICBrZXk6IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gKFxuICAgICAgYWxsTmVzdGVkVmFsaWRhdGlvbnMubGVuZ3RoID09PSBuZXN0ZWRWYWxpZGF0aW9ucy5sZW5ndGggfHxcbiAgICAgICgoZmllbGRzW2tleV0gaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwIHx8XG4gICAgICAgIGZpZWxkc1trZXldIGluc3RhbmNlb2YgRm9ybUFycmF5KSAmJlxuICAgICAgICBhbGxOZXN0ZWRWYWxpZGF0aW9ucy5sZW5ndGggPiAwICYmIG5lc3RlZFZhbGlkYXRpb25zLmxlbmd0aCA9PT0gMClcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNEeW5hbWljVmFsaWRhdGUoXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGEsXG4gICAgdHlwZUtleTogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiAoXG4gICAgICB2YWxpZGF0aW9uTWV0YWRhdGEudHlwZSA9PT0gVmFsaWRhdGlvblR5cGVzW3R5cGVLZXldICYmXG4gICAgICB2YWxpZGF0b3JbdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGVdICE9PSB1bmRlZmluZWRcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIG1hcmtlZCB3aXRoIEBWYWxpZGF0ZSguLi4pXG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS90eXBlc3RhY2svY2xhc3MtdmFsaWRhdG9yI2N1c3RvbS12YWxpZGF0aW9uLWNsYXNzZXNcbiAgICovXG4gIGZ1bmN0aW9uIGlzQ3VzdG9tVmFsaWRhdGUoXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGEsXG4gICAgdHlwZUtleTogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiAoXG4gICAgICBpc05vdFByb3BlcnR5VmFsaWRhdGlvbih2YWxpZGF0aW9uTWV0YWRhdGEsIHR5cGVLZXkpICYmXG4gICAgICB2YWxpZGF0aW9uTWV0YWRhdGEudHlwZSA9PT0gVmFsaWRhdGlvbktleXMuY3VzdG9tLnR5cGUgJiZcbiAgICAgIHR5cGVLZXkgPT09IFZhbGlkYXRpb25LZXlzLmN1c3RvbS50eXBlS2V5XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtYXJrZWQgd2l0aCBAVmFsaWRhdGVOZXN0ZWQoKVxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vdHlwZXN0YWNrL2NsYXNzLXZhbGlkYXRvciN2YWxpZGF0aW5nLW5lc3RlZC1vYmplY3RzXG4gICAqL1xuICBmdW5jdGlvbiBpc05lc3RlZFZhbGlkYXRlKFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgIHR5cGVLZXk6IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gKFxuICAgICAgaXNOb3RQcm9wZXJ0eVZhbGlkYXRpb24odmFsaWRhdGlvbk1ldGFkYXRhLCB0eXBlS2V5KSAmJlxuICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgPT09IFZhbGlkYXRpb25LZXlzLm5lc3RlZC50eXBlICYmXG4gICAgICB0eXBlS2V5ID09PSBWYWxpZGF0aW9uS2V5cy5uZXN0ZWQudHlwZUtleVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vdFByb3BlcnR5VmFsaWRhdGlvbihcbiAgICB2YWxpZGF0aW9uTWV0YWRhdGE6IFZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICB0eXBlS2V5OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHZhbGlkYXRpb25NZXRhZGF0YS50eXBlID09PSBWYWxpZGF0aW9uVHlwZXNbdHlwZUtleV0gJiZcbiAgICAgIHZhbGlkYXRvclt2YWxpZGF0aW9uTWV0YWRhdGEudHlwZV0gPT09IHVuZGVmaW5lZFxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRGaWVsZERhdGEoXG4gICAgZmllbGROYW1lOiBzdHJpbmcsXG4gICAgZmllbGREZWZpbml0aW9uOiBEeW5hbWljRm9ybUdyb3VwRmllbGQsXG4gICAgdmFsaWRhdGlvbkZ1bmN0aW9uOiBGdW5jdGlvblxuICApIHtcbiAgICAvKiB0b2RvOiBtYXliZSBub3QgbmVlZCwgaWYgZW5hYmxlIHRoaXMgY29kZSwgZXhwZXJlbWVudGFsIG1vZGUgbm90IHdvcmtcbiAgICBpZiAoZmllbGRzW2ZpZWxkTmFtZV0gaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwKSB7XG4gICAgICBmaWVsZHNbZmllbGROYW1lXS5vYmplY3QgPSBmaWVsZHNbZmllbGROYW1lXS5maWVsZHM7XG4gICAgfSovXG5cbiAgICAvLyBGaWxsIGZpZWxkIGRhdGEgaWYgZW1wdHlcbiAgICBpZiAoZmllbGREZWZpbml0aW9uLmRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZmllbGREZWZpbml0aW9uLmRhdGEgPSBmaWVsZHNbZmllbGROYW1lXTtcbiAgICB9XG5cbiAgICBmaWVsZERlZmluaXRpb24udmFsaWRhdGlvbkZ1bmN0aW9ucy5wdXNoKHZhbGlkYXRpb25GdW5jdGlvbik7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBbGxFcnJvcnMoXG4gICAgdmFsaWRhdGVFcnJvcnM6IFZhbGlkYXRpb25FcnJvcltdLFxuICAgIGZpZWxkTmFtZTogc3RyaW5nXG4gICk6IFZhbGlkYXRpb25FcnJvcltdIHtcbiAgICByZXR1cm4gdmFsaWRhdGVFcnJvcnMuZmlsdGVyKFxuICAgICAgKGVycm9yOiBWYWxpZGF0aW9uRXJyb3IpID0+XG4gICAgICAgIC8vIENoZWNrIGZvciBuZXN0ZWQvY2hpbGQgZXJyb3JzXG4gICAgICAgIChlcnJvci5jaGlsZHJlbi5sZW5ndGggJiZcbiAgICAgICAgICBlcnJvci5jaGlsZHJlbi5maWx0ZXIoY2hpbGRyZW4gPT4gY2hpbGRyZW4ucHJvcGVydHkgPT09IGZpZWxkTmFtZSkpIHx8XG4gICAgICAgIGVycm9yLnByb3BlcnR5ID09PSBmaWVsZE5hbWVcbiAgICApO1xuICB9XG59XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gR2xvYmFsIEhlbHBlciBmdW5jdGlvbnNcbi8vXG5cbmZ1bmN0aW9uIGlzUHJvcGVydHlWYWxpZGF0b3JPZlR5cGUoXG4gIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhLFxuICBmaWVsZE5hbWU6IHN0cmluZyxcbiAgdmFsaWRhdGlvbk1ldGFkYXRhVHlwZTogc3RyaW5nXG4pIHtcbiAgcmV0dXJuIChcbiAgICB2YWxpZGF0aW9uTWV0YWRhdGEucHJvcGVydHlOYW1lID09PSBmaWVsZE5hbWUgJiZcbiAgICB2YWxpZGF0aW9uTWV0YWRhdGEudHlwZSA9PT0gdmFsaWRhdGlvbk1ldGFkYXRhVHlwZVxuICApO1xufVxuXG5mdW5jdGlvbiBzZXRPYmplY3RWYWx1ZUFuZEdldFZhbGlkYXRpb25FcnJvcnMoXG4gIGNvbnRyb2w6IEZvcm1Db250cm9sLFxuICBrZXk6IHN0cmluZyxcbiAgdmFsaWRhdG9yT3B0aW9uczogVmFsaWRhdG9yT3B0aW9uc1xuKSB7XG4gIGNvbnN0IG9iamVjdCA9XG4gICAgY29udHJvbC5wYXJlbnQgaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwXG4gICAgICA/IChjb250cm9sLnBhcmVudCBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT4pLm9iamVjdFxuICAgICAgOiBjb250cm9sLnBhcmVudFxuICAgICAgPyBjb250cm9sLnBhcmVudC52YWx1ZVxuICAgICAgOiB7fTtcblxuICBpZiAob2JqZWN0KSB7XG4gICAgb2JqZWN0W2tleV0gPSBjb250cm9sLnZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIGdldFZhbGlkYXRlRXJyb3JzKGNvbnRyb2wsIG9iamVjdCwgdmFsaWRhdG9yT3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIGdldFZhbGlkYXRlRXJyb3JzKFxuICBjb250cm9sOiBGb3JtQ29udHJvbCxcbiAgZGF0YVRvVmFsaWRhdGU6IGFueSxcbiAgdmFsaWRhdG9yT3B0aW9uczogVmFsaWRhdG9yT3B0aW9uc1xuKSB7XG4gIGNvbnN0IHZhbGlkYXRlRXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JbXSA9XG4gICAgY29udHJvbC5wYXJlbnQgJiYgY29udHJvbC5wYXJlbnQudmFsdWVcbiAgICAgID8gdmFsaWRhdGVTeW5jKGRhdGFUb1ZhbGlkYXRlLCB2YWxpZGF0b3JPcHRpb25zKVxuICAgICAgOiBbXTtcbiAgcmV0dXJuIHZhbGlkYXRlRXJyb3JzO1xufVxuXG5mdW5jdGlvbiBnZXRJc1ZhbGlkUmVzdWx0KFxuICBpc1ZhbGlkOiBib29sZWFuLFxuICB2YWxpZGF0aW9uTWV0YWRhdGE6IFZhbGlkYXRpb25NZXRhZGF0YSxcbiAgZXJyb3JUeXBlOiBFcnJvclByb3BlcnR5TmFtZVxuKSB7XG4gIHJldHVybiBpc1ZhbGlkXG4gICAgPyBudWxsXG4gICAgOiB7XG4gICAgICAgIFtlcnJvclR5cGVdOiB7XG4gICAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgICAgIHR5cGU6IHZhbGlkYXRpb25NZXRhZGF0YS50eXBlXG4gICAgICAgIH1cbiAgICAgIH07XG59XG5cbnR5cGUgRXJyb3JQcm9wZXJ0eU5hbWUgPVxuICB8ICduZXN0ZWRWYWxpZGF0ZSdcbiAgfCAnY3VzdG9tVmFsaWRhdGlvbidcbiAgfCAnZHluYW1pY1ZhbGlkYXRlJztcblxuY29uc3QgVmFsaWRhdGlvbktleXMgPSB7XG4gIG5lc3RlZDoge1xuICAgIHR5cGU6ICduZXN0ZWRWYWxpZGF0aW9uJyxcbiAgICB0eXBlS2V5OiAnTkVTVEVEX1ZBTElEQVRJT04nXG4gIH0sXG4gIGNvbmRpdGlvbmFsOiB7XG4gICAgdHlwZTogJ2NvbmRpdGlvbmFsVmFsaWRhdGlvbidcbiAgfSxcbiAgY3VzdG9tOiB7XG4gICAgdHlwZTogJ2N1c3RvbVZhbGlkYXRpb24nLFxuICAgIHR5cGVLZXk6ICdDVVNUT01fVkFMSURBVElPTidcbiAgfVxufTtcbiJdfQ==