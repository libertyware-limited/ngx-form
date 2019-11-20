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

var _core = require("@libertyware/ngx-form-core");

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
    _this._formGen = (0, _core.getFormFieldsOptions)(factoryModel);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9keW5hbWljLWZvcm0tZ3JvdXAudHMiXSwibmFtZXMiOlsiRHluYW1pY0Zvcm1Hcm91cCIsImZhY3RvcnlNb2RlbCIsImZpZWxkcyIsInZhbGlkYXRvck9yT3B0cyIsImFzeW5jVmFsaWRhdG9yIiwibmF0aXZlVmFsaWRhdGVFcnJvcnMiLCJCZWhhdmlvclN1YmplY3QiLCJjdXN0b21WYWxpZGF0ZUVycm9ycyIsImZvcm1FcnJvcnMiLCJmb3JtRmllbGRzIiwib2JqZWN0Q2hhbmdlIiwiU3ViamVjdCIsIkZvcm1Db250cm9sQ2xhc3MiLCJEeW5hbWljRm9ybUNvbnRyb2wiLCJfb2JqZWN0IiwiX2V4dGVybmFsRXJyb3JzIiwiX3ZhbGlkYXRvck9wdGlvbnMiLCJfZmIiLCJGb3JtQnVpbGRlciIsIl9mb3JtR2VuIiwib25seUZpZWxkcyIsImV4dGVybmFsRXJyb3JzIiwidmFsaWRhdG9yT3B0aW9ucyIsInZhbGlkYXRlQXN5bmMiLCJ0aGVuIiwiZXJyb3IiLCJ1bmRlZmluZWQiLCJvYmplY3QiLCJyZXN1bHQiLCJ2YWxpZGF0aW9uRXJyb3JzIiwidHJhbnNmb3JtVmFsaWRhdGlvbkVycm9ycyIsImFsbEVycm9ycyIsIm1lcmdlRXJyb3JzIiwibWFya0FzSW52YWxpZEZvckV4dGVybmFsRXJyb3JzIiwic2V0Q3VzdG9tRXJyb3JzIiwidXNlZEZvcmV2ZXJJbnZhbGlkIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsImtleSIsIkZPUkVWRVJfSU5WQUxJRF9OQU1FIiwibGVuZ3RoIiwiZ2V0IiwicmVtb3ZlQ29udHJvbCIsInZhbGlkIiwiYWRkQ29udHJvbCIsIkZvcm1Db250cm9sIiwiZm9yZXZlckludmFsaWQiLCJ1cGRhdGVWYWx1ZUFuZFZhbGlkaXR5Iiwib25seVNlbGYiLCJlbWl0RXZlbnQiLCJuZXh0IiwiY29sbGVjdEVycm9ycyIsImNvbnRyb2wiLCJpc1Jvb3QiLCJjb250cm9scyIsImVycm9ycyIsImVudHJpZXMiLCJyZWR1Y2UiLCJhY2MiLCJjaGlsZENvbnRyb2wiLCJjaGlsZEVycm9ycyIsImZvckVhY2giLCJmaWVsZCIsIm1hcmtBc1RvdWNoZWQiLCJ2YWxpZGF0ZUFsbEZvcm1GaWVsZHMiLCJGb3JtQXJyYXkiLCJpIiwic2V0RXJyb3JzIiwibWFya0FzVW50b3VjaGVkIiwibWFya0FzUHJpc3RpbmUiLCJyZXNldFZhbGlkYXRlQWxsRm9ybUZpZWxkcyIsImlnbm9yZURlY29yYXRvcnMiLCJjbHMiLCJwbGFpbiIsInNldEV4dGVybmFsRXJyb3JzQXN5bmMiLCJzZXRFeHRlcm5hbEVycm9ycyIsInNldFZhbGlkYXRvck9wdGlvbnNBc3luYyIsIm5ld0ZpZWxkcyIsInZhbHVlIiwiY3VzdG9tRXJyb3JzIiwiY29uc3RyYWludHMiLCJwcm9wZXJ0eSIsImluZGV4T2YiLCJwdXNoIiwiY2hpbGRyZW4iLCJjbG9uZWRFeHRlcm5hbEVycm9ycyIsIm9ialZhbHVlIiwic3JjVmFsdWUiLCJjYW5NZXJnZSIsImNvbmNhdCIsIkFycmF5IiwiaXNBcnJheSIsIm9iakl0ZW0iLCJleHRlcm5hbEVycm9yIiwiY2xhc3NUb0NsYXNzIiwibmFtZSIsInBsYWluVG9DbGFzcyIsIm9iamVjdEFycmF5IiwiZm9ybUFycmF5IiwiaXNGb3JtR3JvdXAiLCJmaXJzdEZvcm1Hcm91cCIsImZvcm1Db250cm9sIiwicmVtb3ZlQXQiLCJkeW5hbWljRm9ybUdyb3VwIiwic2V0UGFyZW50IiwiY2xhc3NWYWxpZGF0b3JzIiwiZ2V0Q2xhc3NWYWxpZGF0b3JzIiwiZm9ybUdyb3VwIiwiZ3JvdXAiLCJjdHJsS2V5IiwidmFsdWVDaGFuZ2VzIiwic3Vic2NyaWJlIiwiZGF0YSIsInZhbGlkYXRlIiwiY29udHJvbFZhbHVlIiwibmV3Rm9ybUNvbnRyb2wiLCJ2YWxpZGF0b3IiLCJuZXdPYmplY3QiLCJzZXRWYWx1ZSIsInNldE9iamVjdCIsImdldE9iamVjdCIsIkZvcm1Hcm91cCIsImFsbFZhbGlkYXRpb25NZXRhZGF0YXMiLCJNZXRhZGF0YVN0b3JhZ2UiLCJnZXRUYXJnZXRWYWxpZGF0aW9uTWV0YWRhdGFzIiwidmFsaWRhdGlvbkdyb3VwTWV0YWRhdGFzIiwiZ3JvdXBzIiwiZm9ybUdyb3VwRmllbGRzIiwiVmFsaWRhdG9yIiwiZmllbGROYW1lIiwiY29uZGl0aW9uYWxWYWxpZGF0aW9ucyIsInZhbGlkYXRpb25NZXRhZGF0YSIsImlzUHJvcGVydHlWYWxpZGF0b3JPZlR5cGUiLCJWYWxpZGF0aW9uS2V5cyIsImNvbmRpdGlvbmFsIiwidHlwZSIsImFsbE5lc3RlZFZhbGlkYXRpb25zIiwibmVzdGVkIiwibmVzdGVkR3JvdXBWYWxpZGF0aW9ucyIsImZpZWxkRGVmaW5pdGlvbiIsInZhbGlkYXRpb25GdW5jdGlvbnMiLCJ2YWxpZGF0aW9uRGVmaW5pdGlvbnMiLCJ2YWxpZGF0aW9uRnVuY3Rpb24iLCJpbmRleCIsInByb3BlcnR5TmFtZSIsInR5cGVLZXkiLCJWYWxpZGF0aW9uVHlwZXMiLCJoYXNPd25Qcm9wZXJ0eSIsImNoZWNrV2l0aEFsbE5lc3RlZFZhbGlkYXRpb25zIiwiaXNOZXN0ZWRWYWxpZGF0ZSIsIm9iamVjdFRvVmFsaWRhdGUiLCJuZXN0ZWRWYWxpZGF0ZSIsImNyZWF0ZU5lc3RlZFZhbGlkYXRlIiwic2V0RmllbGREYXRhIiwiaXNDdXN0b21WYWxpZGF0ZSIsImN1c3RvbVZhbGlkYXRpb24iLCJjcmVhdGVDdXN0b21WYWxpZGF0aW9uIiwiaXNEeW5hbWljVmFsaWRhdGUiLCJkeW5hbWljVmFsaWRhdGUiLCJjcmVhdGVEeW5hbWljVmFsaWRhdGUiLCJpc1ZhbGlkIiwiZ2V0VmFsaWRhdGVFcnJvcnMiLCJnZXRJc1ZhbGlkUmVzdWx0IiwicGFyZW50IiwidmFsaWRhdGVWYWx1ZUJ5TWV0YWRhdGEiLCJ2YWxpZGF0ZUVycm9ycyIsInNldE9iamVjdFZhbHVlQW5kR2V0VmFsaWRhdGlvbkVycm9ycyIsImdldEFsbEVycm9ycyIsIm5lc3RlZFZhbGlkYXRpb25zIiwiaXNOb3RQcm9wZXJ0eVZhbGlkYXRpb24iLCJjdXN0b20iLCJ2YWxpZGF0aW9uTWV0YWRhdGFUeXBlIiwiZGF0YVRvVmFsaWRhdGUiLCJlcnJvclR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBVUE7O0FBRUE7O0FBV0E7O0FBQ0E7O0FBTUE7O0FBSUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFPYUEsZ0I7OztBQWNYLDRCQUNTQyxZQURULEVBRVNDLE1BRlQsRUFHRUMsZUFIRixFQVFFQyxjQVJGLEVBU0U7QUFBQTs7QUFBQTs7QUFDQSwwRkFBTSxFQUFOLEVBQVVELGVBQVYsRUFBMkJDLGNBQTNCO0FBREEsVUFST0gsWUFRUCxHQVJPQSxZQVFQO0FBQUEsVUFQT0MsTUFPUCxHQVBPQSxNQU9QO0FBQUEsVUF0QktHLG9CQXNCTCxHQXRCNEIsSUFBSUMscUJBQUosQ0FBZ0MsRUFBaEMsQ0FzQjVCO0FBQUEsVUFyQktDLG9CQXFCTCxHQXJCNEIsSUFBSUQscUJBQUosQ0FBMkMsRUFBM0MsQ0FxQjVCO0FBQUEsVUFwQktFLFVBb0JMLEdBcEJnRCxJQW9CaEQ7QUFBQSxVQW5CS0MsVUFtQkw7QUFBQSxVQWxCS0MsWUFrQkwsR0FsQm9CLElBQUlDLGFBQUosRUFrQnBCO0FBQUEsVUFoQlFDLGdCQWdCUixHQWhCMkJDLHNDQWdCM0I7QUFBQSxVQWZRQyxPQWVSLEdBZmlDLElBZWpDO0FBQUEsVUFkUUMsZUFjUixHQWR3RCxJQWN4RDtBQUFBLFVBYlFDLGlCQWFSLEdBYnFELElBYXJEO0FBQUEsVUFaUUMsR0FZUixHQVpjLElBQUlDLGtCQUFKLEVBWWQ7QUFBQSxVQVhNQyxRQVdOO0FBb0JBLFVBQUtWLFVBQUwsR0FBa0IsTUFBS1csVUFBTCxDQUFnQmxCLE1BQWhCLENBQWxCO0FBQ0EsVUFBS2lCLFFBQUwsR0FBZ0IsZ0NBQXFCbEIsWUFBckIsQ0FBaEI7QUFyQkE7QUFzQkQ7Ozs7cUNBRWdCO0FBQ2YsYUFBTyxLQUFLa0IsUUFBWjtBQUNEOzs7NkJBNEJDRSxjLEVBQ0FDLGdCLEVBQ0E7QUFDQSxXQUFLQyxhQUFMLENBQW1CRixjQUFuQixFQUFtQ0MsZ0JBQW5DLEVBQXFERSxJQUFyRCxDQUNFLFlBQU0sQ0FBRSxDQURWLEVBRUUsVUFBQUMsS0FBSyxFQUFJO0FBQ1AsY0FBTUEsS0FBTjtBQUNELE9BSkg7QUFNRDs7OztzRkFHQ0osYyxFQUNBQyxnQjs7Ozs7O0FBRUEsb0JBQUlELGNBQWMsS0FBS0ssU0FBdkIsRUFBa0M7QUFDaENMLGtCQUFBQSxjQUFjLEdBQUcsd0JBQVUsS0FBS04sZUFBZixDQUFqQjtBQUNEOztBQUVELG9CQUFJTyxnQkFBZ0IsS0FBS0ksU0FBekIsRUFBb0M7QUFDbENKLGtCQUFBQSxnQkFBZ0IsR0FBRyx3QkFBVSxLQUFLTixpQkFBZixDQUFuQjtBQUNEOztBQUVELG9CQUFJLENBQUNLLGNBQUwsRUFBcUI7QUFDbkJBLGtCQUFBQSxjQUFjLEdBQUcsRUFBakI7QUFDRDs7Ozt1QkFHc0IsOEJBQVMsS0FBS00sTUFBZCxFQUFzQkwsZ0JBQXRCLEM7OztBQUFmTSxnQkFBQUEsTTtBQUNBQyxnQkFBQUEsZ0IsR0FBbUIsS0FBS0MseUJBQUwsQ0FBK0JGLE1BQS9CLEM7QUFDbkJHLGdCQUFBQSxTLEdBQVksS0FBS0MsV0FBTCxDQUFpQlgsY0FBakIsRUFBaUNRLGdCQUFqQyxDO0FBRWxCLHFCQUFLSSw4QkFBTCxDQUFvQ1osY0FBcEM7QUFDQSxxQkFBS2EsZUFBTCxDQUFxQkgsU0FBckI7QUFHSUksZ0JBQUFBLGtCLEdBQXFCLEs7O0FBQ3pCLG9CQUNFQyxNQUFNLENBQUNDLElBQVAsQ0FBWU4sU0FBWixFQUF1Qk8sTUFBdkIsQ0FBOEIsVUFBQUMsR0FBRztBQUFBLHlCQUFJQSxHQUFHLEtBQUtDLG9DQUFaO0FBQUEsaUJBQWpDLEVBQ0dDLE1BREgsS0FDYyxDQURkLElBRUEsS0FBS0MsR0FBTCxDQUFTRixvQ0FBVCxDQUhGLEVBSUU7QUFDQSx1QkFBS0csYUFBTCxDQUFtQkgsb0NBQW5CO0FBQ0FMLGtCQUFBQSxrQkFBa0IsR0FBRyxJQUFyQjtBQUNEOztBQUNELG9CQUNFLEtBQUtTLEtBQUwsSUFDQVIsTUFBTSxDQUFDQyxJQUFQLENBQVlOLFNBQVosRUFBdUJVLE1BQXZCLEdBQWdDLENBRGhDLElBRUEsQ0FBQyxLQUFLQyxHQUFMLENBQVNGLG9DQUFULENBSEgsRUFJRTtBQUNBLHVCQUFLSyxVQUFMLENBQ0VMLG9DQURGLEVBRUUsSUFBSU0sa0JBQUosQ0FBZ0IsRUFBaEIsRUFBb0IsQ0FBQ0MsOEJBQUQsQ0FBcEIsQ0FGRjtBQUlBWixrQkFBQUEsa0JBQWtCLEdBQUcsSUFBckI7QUFDRDs7QUFDRCxvQkFBSUEsa0JBQUosRUFBd0I7QUFDdEIsdUJBQUthLHNCQUFMLENBQTRCO0FBQzFCQyxvQkFBQUEsUUFBUSxFQUFFLElBRGdCO0FBRTFCQyxvQkFBQUEsU0FBUyxFQUFFO0FBRmUsbUJBQTVCO0FBSUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQU1XbkIsUyxFQUFnQjtBQUM5QixXQUFLdkIsVUFBTCxHQUFrQnVCLFNBQWxCO0FBQ0EsV0FBS3hCLG9CQUFMLENBQTBCNEMsSUFBMUIsQ0FBK0IsS0FBSzNDLFVBQXBDO0FBQ0EsV0FBS0gsb0JBQUwsQ0FBMEI4QyxJQUExQixDQUErQixLQUFLQyxhQUFMLENBQW1CLElBQW5CLENBQS9CO0FBQ0Q7OztrQ0FFdUJDLE8sRUFBZ0Q7QUFBQTs7QUFBQSxVQUEzQkMsTUFBMkIsdUVBQWxCLElBQWtCOztBQUN0RSxVQUFJRCxPQUFPLENBQUNFLFFBQVosRUFBc0I7QUFDcEIsaUNBQ01ELE1BQU0sR0FBRyxLQUFLRSxNQUFSLEdBQWlCLEVBRDdCLE1BRUtwQixNQUFNLENBQUNxQixPQUFQLENBQWVKLE9BQU8sQ0FBQ0UsUUFBdkIsRUFBaUNHLE1BQWpDLENBQ0QsVUFBQ0MsR0FBRCxRQUFtQztBQUFBO0FBQUEsY0FBdkJwQixHQUF1QjtBQUFBLGNBQWxCcUIsWUFBa0I7O0FBQ2pDLGNBQU1DLFdBQVcsR0FBRyxNQUFJLENBQUNULGFBQUwsQ0FBbUJRLFlBQW5CLEVBQW9ELEtBQXBELENBQXBCOztBQUNBLGNBQ0VDLFdBQVcsSUFDWHRCLEdBQUcsS0FBSyxnQkFEUixJQUVBSCxNQUFNLENBQUNDLElBQVAsQ0FBWXdCLFdBQVosRUFBeUJwQixNQUF6QixHQUFrQyxDQUhwQyxFQUlFO0FBQ0FrQixZQUFBQSxHQUFHLHFCQUNFQSxHQURGLHNCQUVBcEIsR0FGQSxvQkFHS29CLEdBQUcsSUFBSUEsR0FBRyxDQUFDcEIsR0FBRCxDQUFWLEdBQWtCb0IsR0FBRyxDQUFDcEIsR0FBRCxDQUFyQixHQUE2QixFQUhsQyxNQUlJc0IsV0FKSixHQUFIO0FBT0Q7O0FBQ0QsaUJBQU9GLEdBQVA7QUFDRCxTQWpCQSxFQWtCRCxFQWxCQyxDQUZMO0FBdUJELE9BeEJELE1Bd0JPO0FBQ0wsZUFBT04sT0FBTyxDQUFDRyxNQUFmO0FBQ0Q7QUFDRjs7OzRDQUV1QjtBQUFBOztBQUN0QnBCLE1BQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLEtBQUtrQixRQUFqQixFQUEyQk8sT0FBM0IsQ0FBbUMsVUFBQUMsS0FBSyxFQUFJO0FBQzFDLFlBQU1WLE9BQU8sR0FBRyxNQUFJLENBQUNYLEdBQUwsQ0FBU3FCLEtBQVQsQ0FBaEI7O0FBR0EsWUFBSVYsT0FBTyxZQUFZUCxrQkFBdkIsRUFBb0M7QUFDbENPLFVBQUFBLE9BQU8sQ0FBQ1csYUFBUixDQUFzQjtBQUFFZixZQUFBQSxRQUFRLEVBQUU7QUFBWixXQUF0QjtBQUNELFNBRkQsTUFJSyxJQUFJSSxPQUFPLFlBQVlyRCxnQkFBdkIsRUFBeUM7QUFDNUNxRCxZQUFBQSxPQUFPLENBQUNZLHFCQUFSO0FBQ0QsV0FGSSxNQUlBLElBQUlaLE9BQU8sWUFBWWEsZ0JBQXZCLEVBQWtDO0FBQ3JDLG1CQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUlkLE9BQUQsQ0FBdUJFLFFBQXZCLENBQWdDZCxNQUFwRCxFQUE0RDBCLENBQUMsRUFBN0QsRUFBaUU7QUFFL0Qsb0JBQUtkLE9BQUQsQ0FBdUJFLFFBQXZCLENBQWdDWSxDQUFoQyxhQUE4Q3JCLGtCQUFsRCxFQUErRDtBQUMzRE8sa0JBQUFBLE9BQUQsQ0FBdUJFLFFBQXZCLENBQWdDWSxDQUFoQyxDQUFELENBQW9ESCxhQUFwRCxDQUFrRTtBQUNoRWYsb0JBQUFBLFFBQVEsRUFBRTtBQURzRCxtQkFBbEU7QUFHRCxpQkFKRCxNQU1LLElBQ0ZJLE9BQUQsQ0FBdUJFLFFBQXZCLENBQWdDWSxDQUFoQyxhQUE4Q25FLGdCQUQzQyxFQUVIO0FBQ0VxRCxvQkFBQUEsT0FBRCxDQUF1QkUsUUFBdkIsQ0FBZ0NZLENBQWhDLENBQUQsQ0FFR0YscUJBRkg7QUFHRDtBQUNGO0FBQ0Y7QUFDRixPQTlCRDtBQStCRDs7O2lEQUU0QjtBQUFBOztBQUMzQixXQUFLaEMsOEJBQUwsQ0FBb0MsRUFBcEM7QUFFQUcsTUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVksS0FBS2tCLFFBQWpCLEVBQTJCTyxPQUEzQixDQUFtQyxVQUFBQyxLQUFLLEVBQUk7QUFDMUMsWUFBTVYsT0FBTyxHQUFHLE1BQUksQ0FBQ1gsR0FBTCxDQUFTcUIsS0FBVCxDQUFoQjs7QUFHQSxZQUFJVixPQUFPLFlBQVlQLGtCQUF2QixFQUFvQztBQUNsQ08sVUFBQUEsT0FBTyxDQUFDZSxTQUFSLENBQWtCLElBQWxCLEVBQXdCO0FBQUVsQixZQUFBQSxTQUFTLEVBQUU7QUFBYixXQUF4QjtBQUNBRyxVQUFBQSxPQUFPLENBQUNnQixlQUFSLENBQXdCO0FBQUVwQixZQUFBQSxRQUFRLEVBQUU7QUFBWixXQUF4QjtBQUNBSSxVQUFBQSxPQUFPLENBQUNpQixjQUFSLENBQXVCO0FBQUVyQixZQUFBQSxRQUFRLEVBQUU7QUFBWixXQUF2QjtBQUNELFNBSkQsTUFNSyxJQUFJSSxPQUFPLFlBQVlyRCxnQkFBdkIsRUFBeUM7QUFDNUNxRCxZQUFBQSxPQUFPLENBQUNrQiwwQkFBUjtBQUNELFdBRkksTUFJQSxJQUFJbEIsT0FBTyxZQUFZYSxnQkFBdkIsRUFBa0M7QUFDckMsbUJBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBSWQsT0FBRCxDQUF1QkUsUUFBdkIsQ0FBZ0NkLE1BQXBELEVBQTREMEIsQ0FBQyxFQUE3RCxFQUFpRTtBQUUvRCxvQkFBS2QsT0FBRCxDQUF1QkUsUUFBdkIsQ0FBZ0NZLENBQWhDLGFBQThDckIsa0JBQWxELEVBQStEO0FBQzNETyxrQkFBQUEsT0FBRCxDQUF1QkUsUUFBdkIsQ0FDQ1ksQ0FERCxDQUFELENBRWtCQyxTQUZsQixDQUU0QixJQUY1QixFQUVrQztBQUFFbEIsb0JBQUFBLFNBQVMsRUFBRTtBQUFiLG1CQUZsQztBQUdFRyxrQkFBQUEsT0FBRCxDQUF1QkUsUUFBdkIsQ0FDQ1ksQ0FERCxDQUFELENBRWtCRSxlQUZsQixDQUVrQztBQUFFcEIsb0JBQUFBLFFBQVEsRUFBRTtBQUFaLG1CQUZsQztBQUdFSSxrQkFBQUEsT0FBRCxDQUF1QkUsUUFBdkIsQ0FBZ0NZLENBQWhDLENBQUQsQ0FBb0RHLGNBQXBELENBQW1FO0FBQ2pFckIsb0JBQUFBLFFBQVEsRUFBRTtBQUR1RCxtQkFBbkU7QUFHRCxpQkFWRCxNQVlLLElBQ0ZJLE9BQUQsQ0FBdUJFLFFBQXZCLENBQWdDWSxDQUFoQyxhQUE4Q25FLGdCQUQzQyxFQUVIO0FBQ0VxRCxvQkFBQUEsT0FBRCxDQUF1QkUsUUFBdkIsQ0FBZ0NZLENBQWhDLENBQUQsQ0FFR0ksMEJBRkg7QUFHRDtBQUNGO0FBQ0Y7QUFDRixPQXRDRDtBQXVDQSxXQUFLckMsZUFBTCxDQUFxQixFQUFyQjtBQUNEOzs7aUNBRXlCUCxNLEVBQXFCO0FBQzdDLGFBQU8sb0NBQWFBLE1BQWIsRUFBcUI7QUFBRTZDLFFBQUFBLGdCQUFnQixFQUFFO0FBQXBCLE9BQXJCLENBQVA7QUFDRDs7O2lDQUdDQyxHLEVBQ0FDLEssRUFDQTtBQUNBLGFBQU8sb0NBQWFELEdBQWIsRUFBa0JDLEtBQWxCLEVBQXlCO0FBQUVGLFFBQUFBLGdCQUFnQixFQUFFO0FBQXBCLE9BQXpCLENBQVA7QUFDRDs7OztnR0FFNEJuRCxjOzs7OztBQUMzQixxQkFBS04sZUFBTCxHQUF1Qk0sY0FBdkI7Ozt1QkFFZSxLQUFLRSxhQUFMLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NDQU1DRixjLEVBQXVDO0FBQ3ZELFdBQUtzRCxzQkFBTCxDQUE0QnRELGNBQTVCLEVBQTRDRyxJQUE1QyxDQUNFLFlBQU0sQ0FBRSxDQURWLEVBRUUsVUFBQUMsS0FBSyxFQUFJO0FBQ1AsY0FBTUEsS0FBTjtBQUNELE9BSkg7QUFNRDs7O3dDQUUwQztBQUN6QyxhQUFPLEtBQUtWLGVBQVo7QUFDRDs7OzBDQUVxQjtBQUNwQixXQUFLNkQsaUJBQUwsQ0FBdUIsRUFBdkI7QUFDRDs7OytDQUMwQjtBQUN6QixhQUFPLEtBQUtELHNCQUFMLENBQTRCLEVBQTVCLENBQVA7QUFDRDs7OztrR0FFOEJyRCxnQjs7Ozs7QUFDN0IscUJBQUtOLGlCQUFMLEdBQXlCTSxnQkFBekI7Ozt1QkFFZSxLQUFLQyxhQUFMLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dDQU1HRCxnQixFQUFvQztBQUN0RCxXQUFLdUQsd0JBQUwsQ0FBOEJ2RCxnQkFBOUIsRUFBZ0RFLElBQWhELENBQ0UsWUFBTSxDQUFFLENBRFYsRUFFRSxVQUFBQyxLQUFLLEVBQUk7QUFDUCxjQUFNQSxLQUFOO0FBQ0QsT0FKSDtBQU1EOzs7MENBRXVDO0FBQ3RDLGFBQU8sS0FBS1QsaUJBQVo7QUFDRDs7OytCQUdvQmQsTSxFQUFvQztBQUFBOztBQUN2RCxVQUFNNEUsU0FBcUIsR0FBRyxFQUE5Qjs7QUFFQSxVQUFJNUUsTUFBTSxLQUFLd0IsU0FBZixFQUEwQjtBQUN4QlUsUUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVluQyxNQUFaLEVBQW9CNEQsT0FBcEIsQ0FBNEIsVUFBQXZCLEdBQUcsRUFBSTtBQUNqQyxjQUFJckMsTUFBTSxDQUFDcUMsR0FBRCxDQUFOLFlBQXVCdkMsZ0JBQTNCLEVBQTZDO0FBRTNDOEUsWUFBQUEsU0FBUyxDQUFDdkMsR0FBRCxDQUFULEdBQWlCLE1BQUksQ0FBQ25CLFVBQUwsQ0FDZGxCLE1BQU0sQ0FBQ3FDLEdBQUQsQ0FBUCxDQUF1QzlCLFVBRHhCLENBQWpCO0FBR0QsV0FMRCxNQUtPO0FBRUwsZ0JBQUlQLE1BQU0sQ0FBQ3FDLEdBQUQsQ0FBTixZQUF1QjJCLGdCQUEzQixFQUFzQztBQUNwQyxrQkFDR2hFLE1BQU0sQ0FBQ3FDLEdBQUQsQ0FBUCxDQUEyQmdCLFFBQTNCLENBQW9DLENBQXBDLGFBQWtEdkQsZ0JBRHBELEVBRUU7QUFFQThFLGdCQUFBQSxTQUFTLENBQUN2QyxHQUFELENBQVQsR0FBaUIsTUFBSSxDQUFDbkIsVUFBTCxDQUNibEIsTUFBTSxDQUFDcUMsR0FBRCxDQUFQLENBQTJCZ0IsUUFBM0IsQ0FBb0MsQ0FBcEMsQ0FBRCxDQUVHOUMsVUFIWSxDQUFqQjtBQUtELGVBVEQsTUFTTztBQUVMcUUsZ0JBQUFBLFNBQVMsQ0FBQ3ZDLEdBQUQsQ0FBVCxHQUFrQnJDLE1BQU0sQ0FBQ3FDLEdBQUQsQ0FBUCxDQUEyQmdCLFFBQTNCLENBQW9DLENBQXBDLEVBQXVDd0IsS0FBeEQ7QUFDRDtBQUNGLGFBZEQsTUFjTztBQUVMRCxjQUFBQSxTQUFTLENBQUN2QyxHQUFELENBQVQsR0FBaUJyQyxNQUFNLENBQUNxQyxHQUFELENBQXZCO0FBQ0Q7QUFDRjtBQUNGLFNBM0JEO0FBNEJEOztBQUVELGFBQU91QyxTQUFQO0FBQ0Q7Ozs4Q0FFeUJ0QixNLEVBQWtEO0FBQUE7O0FBQzFFLFVBQU13QixZQUFtQyxHQUFHLEVBQTVDO0FBRUF4QixNQUFBQSxNQUFNLENBQUNNLE9BQVAsQ0FBZSxVQUFDckMsS0FBRCxFQUE0QjtBQUN6QyxZQUFJQSxLQUFLLElBQUlBLEtBQUssQ0FBQ3dELFdBQU4sS0FBc0J2RCxTQUFuQyxFQUE4QztBQUM1Q1UsVUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVlaLEtBQUssQ0FBQ3dELFdBQWxCLEVBQStCbkIsT0FBL0IsQ0FBdUMsVUFBQ3ZCLEdBQUQsRUFBaUI7QUFDdEQsZ0JBQUksQ0FBQ3lDLFlBQVksQ0FBQ3ZELEtBQUssQ0FBQ3lELFFBQVAsQ0FBakIsRUFBbUM7QUFDakNGLGNBQUFBLFlBQVksQ0FBQ3ZELEtBQUssQ0FBQ3lELFFBQVAsQ0FBWixHQUErQixFQUEvQjtBQUNEOztBQUVELGdCQUNHRixZQUFZLENBQUN2RCxLQUFLLENBQUN5RCxRQUFQLENBQWIsQ0FBMkNDLE9BQTNDLENBQ0UxRCxLQUFLLENBQUN3RCxXQUFOLENBQWtCMUMsR0FBbEIsQ0FERixNQUVNLENBQUMsQ0FIVCxFQUlFO0FBQ0N5QyxjQUFBQSxZQUFZLENBQUN2RCxLQUFLLENBQUN5RCxRQUFQLENBQWIsQ0FBMkNFLElBQTNDLENBQ0UzRCxLQUFLLENBQUN3RCxXQUFOLENBQWtCMUMsR0FBbEIsQ0FERjtBQUdEO0FBQ0YsV0FkRDtBQWVEOztBQUVELFlBQUlkLEtBQUssQ0FBQzRELFFBQU4sS0FBbUIzRCxTQUFuQixJQUFnQ0QsS0FBSyxDQUFDNEQsUUFBTixDQUFlNUMsTUFBbkQsRUFBMkQ7QUFDekR1QyxVQUFBQSxZQUFZLENBQUN2RCxLQUFLLENBQUN5RCxRQUFQLENBQVosR0FBK0IsTUFBSSxDQUFDcEQseUJBQUwsQ0FDN0JMLEtBQUssQ0FBQzRELFFBRHVCLENBQS9CO0FBR0Q7QUFDRixPQXhCRDtBQTBCQSxhQUFPTCxZQUFQO0FBQ0Q7OztnQ0FHQzNELGMsRUFDQVEsZ0IsRUFDQTtBQUNBLFVBQU15RCxvQkFBb0IsR0FBRyx3QkFBVWpFLGNBQVYsQ0FBN0I7QUFDQSxhQUFPLHlCQUNMaUUsb0JBREssRUFFTHpELGdCQUZLLEVBR0wsVUFBQzBELFFBQUQsRUFBV0MsUUFBWCxFQUF3QjtBQUN0QixZQUFJQyxRQUFRLEVBQVosRUFBZ0I7QUFDZCxpQkFBT0YsUUFBUSxDQUFDRyxNQUFULENBQWdCRixRQUFoQixDQUFQO0FBQ0Q7O0FBRUQsaUJBQVNDLFFBQVQsR0FBb0I7QUFDbEIsaUJBQ0VFLEtBQUssQ0FBQ0MsT0FBTixDQUFjTCxRQUFkLEtBQ0FJLEtBQUssQ0FBQ0MsT0FBTixDQUFjSixRQUFkLENBREEsSUFFQUQsUUFBUSxDQUFDakQsTUFBVCxDQUFnQixVQUFBdUQsT0FBTztBQUFBLG1CQUFJTCxRQUFRLENBQUNMLE9BQVQsQ0FBaUJVLE9BQWpCLE1BQThCLENBQUMsQ0FBbkM7QUFBQSxXQUF2QixFQUNHcEQsTUFESCxLQUNjLENBSmhCO0FBTUQ7QUFDRixPQWhCSSxDQUFQO0FBa0JEOzs7bURBR0NlLE0sRUFDQUQsUSxFQUNBO0FBQ0EsVUFBSSxDQUFDQSxRQUFMLEVBQWU7QUFDYkEsUUFBQUEsUUFBUSxHQUFHLEtBQUtBLFFBQWhCO0FBQ0Q7O0FBQ0RuQixNQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWWtCLFFBQVosRUFBc0JPLE9BQXRCLENBQThCLFVBQUFDLEtBQUssRUFBSTtBQUNyQyxZQUFNVixPQUFPLEdBQUdFLFFBQVEsQ0FBRVEsS0FBRixDQUF4Qjs7QUFHQSxZQUFJVixPQUFPLFlBQVlQLGtCQUF2QixFQUFvQztBQUNsQyxjQUFJVSxNQUFNLElBQUlBLE1BQU0sQ0FBQ08sS0FBRCxDQUFwQixFQUE2QjtBQUMzQlYsWUFBQUEsT0FBTyxDQUFDZSxTQUFSLENBQWtCO0FBQUUwQixjQUFBQSxhQUFhLEVBQUU7QUFBakIsYUFBbEI7QUFDRCxXQUZELE1BRU87QUFDTCxnQkFBSXpDLE9BQU8sQ0FBQ0csTUFBUixJQUFrQkgsT0FBTyxDQUFDRyxNQUFSLENBQWVzQyxhQUFmLEtBQWlDLElBQXZELEVBQTZEO0FBQzNEekMsY0FBQUEsT0FBTyxDQUFDZSxTQUFSLENBQWtCLElBQWxCO0FBQ0Q7QUFDRjtBQUNGLFNBUkQsTUFVSyxJQUFJZixPQUFPLFlBQVlyRCxnQkFBdkIsRUFBeUM7QUFDNUNxRCxZQUFBQSxPQUFPLENBQUNwQiw4QkFBUixDQUNFdUIsTUFBTSxJQUFJQSxNQUFNLENBQUNPLEtBQUQsQ0FBaEIsR0FDS1AsTUFBTSxDQUFDTyxLQUFELENBRFgsR0FFSSxFQUhOO0FBS0QsV0FOSSxNQVFBLElBQUlWLE9BQU8sWUFBWWEsZ0JBQXZCLEVBQWtDO0FBQ3JDLG1CQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUlkLE9BQUQsQ0FBdUJaLE1BQTNDLEVBQW1EMEIsQ0FBQyxFQUFwRCxFQUF3RDtBQUV0RCxvQkFBSWQsT0FBTyxDQUFDYyxDQUFELENBQVAsWUFBc0JyQixrQkFBMUIsRUFBdUM7QUFDckMsc0JBQUlVLE1BQU0sSUFBSUEsTUFBTSxDQUFDVyxDQUFELENBQWhCLElBQXVCWCxNQUFNLENBQUNXLENBQUQsQ0FBTixDQUFVSixLQUFWLENBQTNCLEVBQTZDO0FBQzNDVixvQkFBQUEsT0FBTyxDQUFDYyxDQUFELENBQVAsQ0FBV0MsU0FBWCxDQUFxQjtBQUFFMEIsc0JBQUFBLGFBQWEsRUFBRTtBQUFqQixxQkFBckI7QUFDRCxtQkFGRCxNQUVPLElBQ0x6QyxPQUFPLENBQUNjLENBQUQsQ0FBUCxDQUFXWCxNQUFYLElBQ0FILE9BQU8sQ0FBQ2MsQ0FBRCxDQUFQLENBQVdYLE1BQVgsQ0FBa0JzQyxhQUFsQixLQUFvQyxJQUYvQixFQUdMO0FBQ0F6QyxvQkFBQUEsT0FBTyxDQUFDYyxDQUFELENBQVAsQ0FBV0MsU0FBWCxDQUFxQixJQUFyQjtBQUNEO0FBQ0YsaUJBVEQsTUFXSyxJQUFJZixPQUFPLENBQUNjLENBQUQsQ0FBUCxZQUFzQm5FLGdCQUExQixFQUE0QztBQUMvQ3FELG9CQUFBQSxPQUFPLENBQUNjLENBQUQsQ0FBUCxDQUFXbEMsOEJBQVgsQ0FDRXVCLE1BQU0sSUFBSUEsTUFBTSxDQUFDVyxDQUFELENBQWhCLElBQXVCWCxNQUFNLENBQUNXLENBQUQsQ0FBTixDQUFVSixLQUFWLENBQXZCLEdBQ0tQLE1BQU0sQ0FBQ1csQ0FBRCxDQUFOLENBQVVKLEtBQVYsQ0FETCxHQUVJLEVBSE47QUFLRDtBQUNGO0FBQ0Y7QUFDRixPQTdDRDtBQThDRDs7O2dDQU02QjtBQUFBOztBQUU1QixVQUFNcEMsTUFBTSxHQUFHLEtBQUtiLE9BQUwsR0FDWCxLQUFLaUYsWUFBTCxDQUFrQixLQUFLakYsT0FBdkIsQ0FEVyxHQUVYLEtBQUtiLFlBQUwsR0FDQSxJQUFJLEtBQUtBLFlBQVQsRUFEQSxHQUVBeUIsU0FKSjs7QUFNQSxVQUFJQyxNQUFNLEtBQUtELFNBQWYsRUFBMEI7QUFFeEJVLFFBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLEtBQUtrQixRQUFqQixFQUNHakIsTUFESCxDQUNVLFVBQUEwRCxJQUFJO0FBQUEsaUJBQUlBLElBQUksS0FBS3hELG9DQUFiO0FBQUEsU0FEZCxFQUVHc0IsT0FGSCxDQUVXLFVBQUF2QixHQUFHLEVBQUk7QUFFZCxjQUFJLE1BQUksQ0FBQ2dCLFFBQUwsQ0FBY2hCLEdBQWQsYUFBOEJ2QyxnQkFBbEMsRUFBb0Q7QUFDbEQyQixZQUFBQSxNQUFNLENBQUNZLEdBQUQsQ0FBTixHQUFlLE1BQUksQ0FBQ2dCLFFBQUwsQ0FBY2hCLEdBQWQsQ0FBRCxDQUE4Q1osTUFBNUQ7QUFDRCxXQUZELE1BS0ssSUFBSSxNQUFJLENBQUM0QixRQUFMLENBQWNoQixHQUFkLGFBQThCMkIsZ0JBQWxDLEVBQTZDO0FBRWhEdkMsY0FBQUEsTUFBTSxDQUFDWSxHQUFELENBQU4sR0FBYyxFQUFkOztBQUVBLG1CQUNFLElBQUk0QixDQUFDLEdBQUcsQ0FEVixFQUVFQSxDQUFDLEdBQUksTUFBSSxDQUFDWixRQUFMLENBQWNoQixHQUFkLENBQUQsQ0FBa0NnQixRQUFsQyxDQUEyQ2QsTUFGakQsRUFHRTBCLENBQUMsRUFISCxFQUlFO0FBQ0Esb0JBQUlZLEtBQUssU0FBVDs7QUFFQSxvQkFDRyxNQUFJLENBQUN4QixRQUFMLENBQWNoQixHQUFkLENBQUQsQ0FBa0NnQixRQUFsQyxDQUEyQ1ksQ0FBM0MsYUFDQW5FLGdCQUZGLEVBR0U7QUFFQStFLGtCQUFBQSxLQUFLLEdBQUssTUFBSSxDQUFDeEIsUUFBTCxDQUFjaEIsR0FBZCxDQUFELENBQWtDZ0IsUUFBbEMsQ0FDUFksQ0FETyxDQUFELENBRW9CeEMsTUFGNUI7QUFHRCxpQkFSRCxNQVFPO0FBQ0xvRCxrQkFBQUEsS0FBSyxHQUFJLE1BQUksQ0FBQ3hCLFFBQUwsQ0FBY2hCLEdBQWQsQ0FBRCxDQUFrQ2dCLFFBQWxDLENBQTJDWSxDQUEzQyxFQUE4Q1ksS0FBdEQ7QUFDRDs7QUFDRCxvQkFBSUEsS0FBSyxJQUFJM0MsTUFBTSxDQUFDQyxJQUFQLENBQVkwQyxLQUFaLEVBQW1CdEMsTUFBbkIsR0FBNEIsQ0FBekMsRUFBNEM7QUFDMUNkLGtCQUFBQSxNQUFNLENBQUNZLEdBQUQsQ0FBTixDQUFZNkMsSUFBWixDQUFpQkwsS0FBakI7QUFDRDtBQUNGO0FBQ0YsYUExQkksTUE2QkE7QUFDSHBELGdCQUFBQSxNQUFNLENBQUNZLEdBQUQsQ0FBTixHQUFjLE1BQUksQ0FBQ2dCLFFBQUwsQ0FBY2hCLEdBQWQsRUFBbUJ3QyxLQUFqQztBQUNEO0FBQ0YsU0F6Q0g7QUEwQ0Q7O0FBQ0QsYUFBUSxLQUFLOUUsWUFBTCxHQUNKLEtBQUtnRyxZQUFMLENBQWtCLEtBQUtoRyxZQUF2QixFQUFxQzBCLE1BQXJDLENBREksR0FFSkEsTUFGSjtBQUdEOzs7OEJBUW1CQSxNLEVBQWdCO0FBQUE7O0FBQ2xDLFVBQUlBLE1BQU0sWUFBWSxLQUFLMUIsWUFBM0IsRUFBeUM7QUFDdkMsYUFBS2EsT0FBTCxHQUFlLEtBQUtpRixZQUFMLENBQWtCcEUsTUFBbEIsQ0FBZjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUtiLE9BQUwsR0FBZSxLQUFLbUYsWUFBTCxDQUFrQixLQUFLaEcsWUFBdkIsRUFBcUMwQixNQUFyQyxDQUFmO0FBQ0Q7O0FBR0RTLE1BQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLEtBQUtrQixRQUFqQixFQUEyQk8sT0FBM0IsQ0FBbUMsVUFBQXZCLEdBQUcsRUFBSTtBQUV4QyxZQUFJLE1BQUksQ0FBQ2dCLFFBQUwsQ0FBY2hCLEdBQWQsYUFBOEJ2QyxnQkFBbEMsRUFBb0Q7QUFDakQsVUFBQSxNQUFJLENBQUN1RCxRQUFMLENBQWNoQixHQUFkLENBQUQsQ0FBOENaLE1BQTlDLEdBQXVELE1BQUksQ0FBQ2IsT0FBTCxHQUNuRCxNQUFJLENBQUNBLE9BQUwsQ0FBYXlCLEdBQWIsQ0FEbUQsR0FFbkQsRUFGSjtBQUdELFNBSkQsTUFPSyxJQUFJLE1BQUksQ0FBQ2dCLFFBQUwsQ0FBY2hCLEdBQWQsYUFBOEIyQixnQkFBbEMsRUFBNkM7QUFDaEQsZ0JBQU1nQyxXQUFXLEdBQUcsTUFBSSxDQUFDcEYsT0FBTCxHQUFlLE1BQUksQ0FBQ0EsT0FBTCxDQUFheUIsR0FBYixDQUFmLEdBQW1DLEVBQXZEO0FBQ0EsZ0JBQU00RCxTQUFTLEdBQUcsTUFBSSxDQUFDNUMsUUFBTCxDQUFjaEIsR0FBZCxDQUFsQjtBQUNBLGdCQUFNNkQsV0FBVyxHQUFHRCxTQUFTLENBQUM1QyxRQUFWLENBQW1CLENBQW5CLGFBQWlDdkQsZ0JBQXJEO0FBQ0EsZ0JBQU1xRyxjQUFjLEdBQUdGLFNBQVMsQ0FBQzVDLFFBQVYsQ0FBbUIsQ0FBbkIsQ0FBdkI7QUFDQSxnQkFBTStDLFdBQVcsR0FBR0gsU0FBUyxDQUFDNUMsUUFBVixDQUFtQixDQUFuQixDQUFwQjs7QUFHQSxtQkFBTzRDLFNBQVMsQ0FBQzFELE1BQVYsS0FBcUIsQ0FBNUIsRUFBK0I7QUFDN0IwRCxjQUFBQSxTQUFTLENBQUNJLFFBQVYsQ0FBbUIsQ0FBbkI7QUFDRDs7QUFFRCxpQkFBSyxJQUFJcEMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRytCLFdBQVcsQ0FBQ3pELE1BQWhDLEVBQXdDMEIsQ0FBQyxFQUF6QyxFQUE2QztBQUMzQyxrQkFBSWlDLFdBQUosRUFBaUI7QUFBQTtBQUVmLHNCQUFNSSxnQkFBZ0IsR0FBRyxJQUFJeEcsZ0JBQUosQ0FDdkJxRyxjQUFjLENBQUNwRyxZQURRLEVBRXZCb0csY0FBYyxDQUFDNUYsVUFGUSxDQUF6QjtBQUtBK0Ysa0JBQUFBLGdCQUFnQixDQUFDQyxTQUFqQixDQUEyQixNQUEzQjtBQUVBLHNCQUFNQyxlQUFlLEdBQUdDLGtCQUFrQixDQUN4Q04sY0FBYyxDQUFDcEcsWUFEeUIsRUFFeENvRyxjQUFjLENBQUM1RixVQUZ5QixFQUd4Q2lCLFNBSHdDLEVBSXhDLE1BQUksQ0FBQ2QsZ0JBSm1DLENBQTFDOztBQU1BLHNCQUFNZ0csU0FBUyxHQUFHLE1BQUksQ0FBQzNGLEdBQUwsQ0FBUzRGLEtBQVQsQ0FBZUgsZUFBZixDQUFsQjs7QUFHQXRFLGtCQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWXVFLFNBQVMsQ0FBQ3JELFFBQXRCLEVBQWdDTyxPQUFoQyxDQUF3QyxVQUFBZ0QsT0FBTyxFQUFJO0FBQ2pETixvQkFBQUEsZ0JBQWdCLENBQUMzRCxVQUFqQixDQUE0QmlFLE9BQTVCLEVBQXFDRixTQUFTLENBQUNyRCxRQUFWLENBQW1CdUQsT0FBbkIsQ0FBckM7QUFDRCxtQkFGRDtBQUtBTixrQkFBQUEsZ0JBQWdCLENBQUNPLFlBQWpCLENBQThCQyxTQUE5QixDQUF3QyxVQUFBQyxJQUFJLEVBQUk7QUFDOUNULG9CQUFBQSxnQkFBZ0IsQ0FBQ1UsUUFBakIsQ0FBMEJ4RixTQUExQixFQUFxQyxNQUFJLENBQUNWLGlCQUExQztBQUNELG1CQUZEO0FBSUFtRixrQkFBQUEsU0FBUyxDQUFDNUMsUUFBVixDQUFtQjZCLElBQW5CLENBQXdCb0IsZ0JBQXhCO0FBR0NMLGtCQUFBQSxTQUFTLENBQUM1QyxRQUFWLENBQW1CWSxDQUFuQixDQUFELENBQWlEeEMsTUFBakQsR0FDRSxNQUFJLENBQUNiLE9BQUwsSUFBZ0JvRixXQUFoQixJQUErQkEsV0FBVyxDQUFDL0IsQ0FBRCxDQUExQyxHQUNJK0IsV0FBVyxDQUFDL0IsQ0FBRCxDQURmLEdBRUksRUFITjtBQTlCZTtBQWtDaEIsZUFsQ0QsTUFrQ087QUFFTCxvQkFBTWdELFlBQVksR0FDaEIsTUFBSSxDQUFDckcsT0FBTCxJQUFnQm9GLFdBQWhCLElBQStCQSxXQUFXLENBQUMvQixDQUFELENBQTFDLEdBQ0krQixXQUFXLENBQUMvQixDQUFELENBRGYsR0FFSXpDLFNBSE47QUFJQSxvQkFBTTBGLGNBQWMsR0FBRyxJQUFJdEUsa0JBQUosQ0FDckJxRSxZQURxQixFQUVyQmIsV0FBVyxDQUFDZSxTQUZTLENBQXZCO0FBSUFELGdCQUFBQSxjQUFjLENBQUNYLFNBQWYsQ0FBeUIsTUFBekI7QUFHQU4sZ0JBQUFBLFNBQVMsQ0FBQzVDLFFBQVYsQ0FBbUI2QixJQUFuQixDQUF3QmdDLGNBQXhCO0FBQ0Q7QUFDRjtBQUNGLFdBL0RJLE1Ba0VBO0FBQ0gsa0JBQU1FLFNBQVMsR0FBRyxNQUFJLENBQUN4RyxPQUFMLEdBQWUsTUFBSSxDQUFDQSxPQUFMLENBQWF5QixHQUFiLENBQWYsR0FBbUMsRUFBckQ7O0FBQ0EsY0FBQSxNQUFJLENBQUNnQixRQUFMLENBQWNoQixHQUFkLEVBQW1CZ0YsUUFBbkIsQ0FDRSxNQUFJLENBQUN6RyxPQUFMLElBQWdCd0csU0FBaEIsR0FBNEJBLFNBQTVCLEdBQXdDNUYsU0FEMUM7QUFHRDtBQUNGLE9BakZEO0FBa0ZBLFdBQUtoQixZQUFMLENBQWtCeUMsSUFBbEIsQ0FBdUIsS0FBS3JDLE9BQTVCO0FBQ0Q7OztzQkFsa0JrQk8sYyxFQUE4QztBQUMvRCxXQUFLTixlQUFMLEdBQXVCTSxjQUF2QjtBQUNBLFdBQUs2RixRQUFMO0FBQ0QsSzt3QkFDa0Q7QUFDakQsYUFBTyxLQUFLbkcsZUFBWjtBQUNEOzs7c0JBRW9CTyxnQixFQUEyQztBQUM5RCxXQUFLTixpQkFBTCxHQUF5Qk0sZ0JBQXpCO0FBQ0EsV0FBSzRGLFFBQUw7QUFDRCxLO3dCQUMrQztBQUM5QyxhQUFPLEtBQUtsRyxpQkFBWjtBQUNEOzs7c0JBRVVXLE0sRUFBZ0I7QUFDekIsV0FBSzZGLFNBQUwsQ0FBZTdGLE1BQWY7QUFDRCxLO3dCQUNZO0FBQ1gsYUFBTyxLQUFLOEYsU0FBTCxFQUFQO0FBQ0Q7Ozs7RUF6RTJDQyxnQjs7OztBQXluQnZDLFNBQVNmLGtCQUFULENBQ0wxRyxZQURLLEVBRUxDLE1BRkssRUFHTG9CLGdCQUhLLEVBS0w7QUFBQSxNQURBVixnQkFDQSx1RUFEd0JDLHNDQUN4QjtBQUVBLE1BQU04RyxzQkFBNEMsR0FBRyxzQ0FDbkRDLCtCQURtRCxFQUVuREMsNEJBRm1ELENBRXRCNUgsWUFGc0IsRUFFUixFQUZRLENBQXJEO0FBS0EsTUFBTTZILHdCQUE4QyxHQUFHLHNDQUNyREYsK0JBRHFELEVBRXJEQyw0QkFGcUQsQ0FHckQ1SCxZQUhxRCxFQUlyRCxFQUpxRCxFQUtyRHFCLGdCQUFnQixJQUFJQSxnQkFBZ0IsQ0FBQ3lHLE1BQXJDLEdBQ0l6RyxnQkFBZ0IsQ0FBQ3lHLE1BRHJCLEdBRUlyRyxTQVBpRCxDQUF2RDtBQVVBLE1BQU1zRyxlQUFlLEdBQUcsRUFBeEI7QUFDQSxNQUFNWCxTQUFTLEdBQUcsSUFBSVkseUJBQUosRUFBbEI7QUFHQTdGLEVBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZbkMsTUFBWixFQUNHb0MsTUFESCxDQUNVLFVBQUFDLEdBQUc7QUFBQSxXQUFJQSxHQUFHLENBQUM0QyxPQUFKLENBQVksSUFBWixNQUFzQixDQUExQjtBQUFBLEdBRGIsRUFFR3JCLE9BRkgsQ0FFVyxVQUFBb0UsU0FBUyxFQUFJO0FBRXBCLFFBQU1DLHNCQUE0QyxHQUFHLEVBQXJEO0FBQ0FMLElBQUFBLHdCQUF3QixDQUFDaEUsT0FBekIsQ0FBaUMsVUFBQXNFLGtCQUFrQixFQUFJO0FBQ3JELFVBQ0VDLHlCQUF5QixDQUN2QkQsa0JBRHVCLEVBRXZCRixTQUZ1QixFQUd2QkksY0FBYyxDQUFDQyxXQUFmLENBQTJCQyxJQUhKLENBRDNCLEVBTUU7QUFDQUwsUUFBQUEsc0JBQXNCLENBQUMvQyxJQUF2QixDQUE0QmdELGtCQUE1QjtBQUNEO0FBQ0YsS0FWRDtBQWFBLFFBQU1LLG9CQUEwQyxHQUFHLEVBQW5EO0FBQ0FkLElBQUFBLHNCQUFzQixDQUFDN0QsT0FBdkIsQ0FBK0IsVUFBQXNFLGtCQUFrQixFQUFJO0FBQ25ELFVBQ0VDLHlCQUF5QixDQUN2QkQsa0JBRHVCLEVBRXZCRixTQUZ1QixFQUd2QkksY0FBYyxDQUFDSSxNQUFmLENBQXNCRixJQUhDLENBRDNCLEVBTUU7QUFDQUMsUUFBQUEsb0JBQW9CLENBQUNyRCxJQUFyQixDQUEwQmdELGtCQUExQjtBQUNEO0FBQ0YsS0FWRDtBQWFBLFFBQU1PLHNCQUE0QyxHQUFHLEVBQXJEO0FBQ0FiLElBQUFBLHdCQUF3QixDQUFDaEUsT0FBekIsQ0FBaUMsVUFBQXNFLGtCQUFrQixFQUFJO0FBQ3JELFVBQ0VDLHlCQUF5QixDQUN2QkQsa0JBRHVCLEVBRXZCRixTQUZ1QixFQUd2QkksY0FBYyxDQUFDSSxNQUFmLENBQXNCRixJQUhDLENBRDNCLEVBTUU7QUFDQUcsUUFBQUEsc0JBQXNCLENBQUN2RCxJQUF2QixDQUE0QmdELGtCQUE1QjtBQUNEO0FBQ0YsS0FWRDtBQVlBLFFBQU1RLGVBQXNDLEdBQUc7QUFDN0MzQixNQUFBQSxJQUFJLEVBQUVlLGVBQWUsQ0FBQ0UsU0FBRCxDQUR3QjtBQUU3Q1csTUFBQUEsbUJBQW1CLEVBQUUsRUFGd0I7QUFHN0NDLE1BQUFBLHFCQUFxQixFQUFFO0FBSHNCLEtBQS9DOztBQU1BLFFBQUlGLGVBQWUsQ0FBQzNCLElBQWhCLEtBQXlCdkYsU0FBN0IsRUFBd0M7QUFDdENrSCxNQUFBQSxlQUFlLENBQUMzQixJQUFoQixHQUF1Qi9HLE1BQU0sQ0FBQ2dJLFNBQUQsQ0FBN0I7QUFDRDs7QUFFRCxRQUNFdkMsS0FBSyxDQUFDQyxPQUFOLENBQWNnRCxlQUFlLENBQUMzQixJQUE5QixLQUNBMkIsZUFBZSxDQUFDM0IsSUFBaEIsQ0FBcUJ4RSxNQUFyQixHQUE4QixDQUQ5QixJQUVBbUcsZUFBZSxDQUFDM0IsSUFBaEIsQ0FBcUIzRSxNQUFyQixDQUNFLFVBQUN5RyxrQkFBRCxFQUFxQkMsS0FBckI7QUFBQSxhQUNFQSxLQUFLLEdBQUcsQ0FBUixJQUFhLE9BQU9ELGtCQUFQLEtBQThCLFVBRDdDO0FBQUEsS0FERixFQUdFdEcsTUFIRixHQUdXLENBTmIsRUFPRTtBQUNBbUcsTUFBQUEsZUFBZSxDQUFDM0IsSUFBaEIsQ0FDRzNFLE1BREgsQ0FFSSxVQUFDeUcsa0JBQUQsRUFBcUJDLEtBQXJCO0FBQUEsZUFDRUEsS0FBSyxHQUFHLENBQVIsSUFBYSxPQUFPRCxrQkFBUCxLQUE4QixVQUQ3QztBQUFBLE9BRkosRUFLR2pGLE9BTEgsQ0FLVyxVQUFBaUYsa0JBQWtCO0FBQUEsZUFDekJILGVBQWUsQ0FBQ0MsbUJBQWhCLENBQW9DekQsSUFBcEMsQ0FBeUMyRCxrQkFBekMsQ0FEeUI7QUFBQSxPQUw3QjtBQVFBSCxNQUFBQSxlQUFlLENBQUMzQixJQUFoQixHQUF1QjJCLGVBQWUsQ0FBQzNCLElBQWhCLENBQXFCLENBQXJCLENBQXZCO0FBQ0Q7O0FBRURhLElBQUFBLHdCQUF3QixDQUFDaEUsT0FBekIsQ0FBaUMsVUFBQXNFLGtCQUFrQixFQUFJO0FBQ3JELFVBQ0VBLGtCQUFrQixDQUFDYSxZQUFuQixLQUFvQ2YsU0FBcEMsSUFDQUUsa0JBQWtCLENBQUNJLElBQW5CLEtBQTRCRixjQUFjLENBQUNDLFdBQWYsQ0FBMkJDLElBRnpELEVBR0U7QUFHQSxZQUFJSixrQkFBa0IsQ0FBQ0ksSUFBbkIsS0FBNEJGLGNBQWMsQ0FBQ0ksTUFBZixDQUFzQkYsSUFBdEQsRUFBNEQ7QUFDMURJLFVBQUFBLGVBQWUsQ0FBQ0UscUJBQWhCLENBQXNDMUQsSUFBdEMsQ0FBMkNnRCxrQkFBM0M7QUFDRDs7QUFFRCxhQUFLLElBQU1jLE9BQVgsSUFBc0JDLCtCQUF0QixFQUF1QztBQUNyQyxjQUFJQSxnQ0FBZ0JDLGNBQWhCLENBQStCRixPQUEvQixDQUFKLEVBQTZDO0FBRTNDLGdCQUNFRyw2QkFBNkIsQ0FDM0JaLG9CQUQyQixFQUUzQkUsc0JBRjJCLEVBRzNCVCxTQUgyQixDQUQvQixFQU1FO0FBQ0Esa0JBQUlvQixnQkFBZ0IsQ0FBQ2xCLGtCQUFELEVBQXFCYyxPQUFyQixDQUFwQixFQUFtRDtBQUNqRCxvQkFBTUssZ0JBQWdCLEdBQ3BCckosTUFBTSxDQUFDZ0ksU0FBRCxDQUFOLFlBQTZCbEksZ0JBQTdCLEdBQ0lFLE1BQU0sQ0FBQ2dJLFNBQUQsQ0FBTixDQUFrQnZHLE1BRHRCLEdBRUlELFNBSE47QUFJQSxvQkFBTThILGNBQWMsR0FBR0Msb0JBQW9CLENBQ3pDRixnQkFEeUMsRUFFekNuQixrQkFGeUMsQ0FBM0M7QUFJQXNCLGdCQUFBQSxZQUFZLENBQUN4QixTQUFELEVBQVlVLGVBQVosRUFBNkJZLGNBQTdCLENBQVo7QUFDRDtBQUNGOztBQUdELGdCQUFJRyxnQkFBZ0IsQ0FBQ3ZCLGtCQUFELEVBQXFCYyxPQUFyQixDQUFwQixFQUFtRDtBQUNqRCxrQkFBTVUsZ0JBQWdCLEdBQUdDLHNCQUFzQixDQUM3QzNCLFNBRDZDLEVBRTdDRSxrQkFGNkMsQ0FBL0M7QUFJQXNCLGNBQUFBLFlBQVksQ0FBQ3hCLFNBQUQsRUFBWVUsZUFBWixFQUE2QmdCLGdCQUE3QixDQUFaO0FBQ0Q7O0FBR0QsZ0JBQUlFLGlCQUFpQixDQUFDMUIsa0JBQUQsRUFBcUJjLE9BQXJCLENBQXJCLEVBQW9EO0FBQ2xELGtCQUFNYSxlQUFlLEdBQUdDLHFCQUFxQixDQUMzQzVCLGtCQUQyQyxFQUUzQ0Qsc0JBRjJDLEVBRzNDRCxTQUgyQyxDQUE3QztBQUtBd0IsY0FBQUEsWUFBWSxDQUFDeEIsU0FBRCxFQUFZVSxlQUFaLEVBQTZCbUIsZUFBN0IsQ0FBWjtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0YsS0F2REQ7O0FBeURBLFFBQ0VuQixlQUFlLENBQUMzQixJQUFoQixZQUFnQ2pILGdCQUFoQyxJQUNBNEksZUFBZSxDQUFDM0IsSUFBaEIsWUFBZ0MvQyxnQkFGbEMsRUFHRTtBQUNBOEQsTUFBQUEsZUFBZSxDQUFDRSxTQUFELENBQWYsR0FBNkJVLGVBQWUsQ0FBQzNCLElBQTdDO0FBQ0QsS0FMRCxNQUtPO0FBQ0xlLE1BQUFBLGVBQWUsQ0FBQ0UsU0FBRCxDQUFmLEdBQTZCLElBQUl0SCxnQkFBSixDQUFxQmdJLGVBQXJCLENBQTdCO0FBQ0Q7QUFDRixHQTNJSDtBQTZJQSxTQUFPWixlQUFQOztBQU1BLFdBQVN5QixvQkFBVCxDQUNFRixnQkFERixFQUVFbkIsa0JBRkYsRUFHRTtBQUNBLFdBQU8sVUFBUy9FLE9BQVQsRUFBK0I7QUFDcEMsVUFBTTRHLE9BQU8sR0FDWEMsaUJBQWlCLENBQ2Y3RyxPQURlLEVBRWZrRyxnQkFBZ0IsS0FBSzdILFNBQXJCLEdBQWlDNkgsZ0JBQWpDLEdBQW9EbEcsT0FBTyxDQUFDMEIsS0FGN0MsRUFHZnpELGdCQUhlLENBQWpCLENBSUVtQixNQUpGLEtBSWEsQ0FMZjtBQU1BLGFBQU8wSCxnQkFBZ0IsQ0FBQ0YsT0FBRCxFQUFVN0Isa0JBQVYsRUFBOEIsZ0JBQTlCLENBQXZCO0FBQ0QsS0FSRDtBQVNEOztBQUVELFdBQVM0QixxQkFBVCxDQUNFNUIsa0JBREYsRUFFRUQsc0JBRkYsRUFHRUQsU0FIRixFQUlFO0FBQ0EsV0FBTyxVQUFTN0UsT0FBVCxFQUErQjtBQUNwQyxVQUFJLENBQUNBLE9BQUwsRUFBYztBQUNaLGVBQU8sSUFBUDtBQUNEOztBQUVELFVBQUk0RyxPQUFPLEdBQ1Q1RyxPQUFPLENBQUMrRyxNQUFSLElBQWtCL0csT0FBTyxDQUFDK0csTUFBUixDQUFlckYsS0FBakMsR0FDSXNDLFNBQVMsQ0FBQ2dELHVCQUFWLENBQWtDaEgsT0FBTyxDQUFDMEIsS0FBMUMsRUFBaURxRCxrQkFBakQsQ0FESixHQUVJLElBSE47O0FBS0EsVUFBSSxDQUFDNkIsT0FBRCxJQUFZOUIsc0JBQXNCLENBQUMxRixNQUF2QixHQUFnQyxDQUFoRCxFQUFtRDtBQUNqRCxZQUFNNkgsY0FBYyxHQUFHQyxvQ0FBb0MsQ0FDekRsSCxPQUR5RCxFQUV6RDZFLFNBRnlELEVBR3pENUcsZ0JBSHlELENBQTNEO0FBS0EySSxRQUFBQSxPQUFPLEdBQ0xLLGNBQWMsQ0FBQ2hJLE1BQWYsQ0FDRSxVQUFDYixLQUFEO0FBQUEsaUJBQTRCQSxLQUFLLENBQUN5RCxRQUFOLEtBQW1CZ0QsU0FBL0M7QUFBQSxTQURGLEVBRUV6RixNQUZGLEtBRWEsQ0FIZjtBQUlEOztBQUVELGFBQU8wSCxnQkFBZ0IsQ0FBQ0YsT0FBRCxFQUFVN0Isa0JBQVYsRUFBOEIsaUJBQTlCLENBQXZCO0FBQ0QsS0F2QkQ7QUF3QkQ7O0FBRUQsV0FBU3lCLHNCQUFULENBQ0UzQixTQURGLEVBRUVFLGtCQUZGLEVBR0U7QUFDQSxXQUFPLFVBQVMvRSxPQUFULEVBQStCO0FBQ3BDLFVBQU1pSCxjQUFpQyxHQUFHQyxvQ0FBb0MsQ0FDNUVsSCxPQUQ0RSxFQUU1RTZFLFNBRjRFLEVBRzVFNUcsZ0JBSDRFLENBQTlFO0FBS0EsVUFBTTJJLE9BQU8sR0FBR08sWUFBWSxDQUFDRixjQUFELEVBQWlCcEMsU0FBakIsQ0FBWixDQUF3Q3pGLE1BQXhDLEtBQW1ELENBQW5FO0FBQ0EsYUFBTzBILGdCQUFnQixDQUFDRixPQUFELEVBQVU3QixrQkFBVixFQUE4QixrQkFBOUIsQ0FBdkI7QUFDRCxLQVJEO0FBU0Q7O0FBRUQsV0FBU2lCLDZCQUFULENBQ0VaLG9CQURGLEVBRUVnQyxpQkFGRixFQUdFbEksR0FIRixFQUlFO0FBQ0EsV0FDRWtHLG9CQUFvQixDQUFDaEcsTUFBckIsS0FBZ0NnSSxpQkFBaUIsQ0FBQ2hJLE1BQWxELElBQ0MsQ0FBQ3ZDLE1BQU0sQ0FBQ3FDLEdBQUQsQ0FBTixZQUF1QnZDLGdCQUF2QixJQUNBRSxNQUFNLENBQUNxQyxHQUFELENBQU4sWUFBdUIyQixnQkFEeEIsS0FFQ3VFLG9CQUFvQixDQUFDaEcsTUFBckIsR0FBOEIsQ0FGL0IsSUFFb0NnSSxpQkFBaUIsQ0FBQ2hJLE1BQWxCLEtBQTZCLENBSnBFO0FBTUQ7O0FBRUQsV0FBU3FILGlCQUFULENBQ0UxQixrQkFERixFQUVFYyxPQUZGLEVBR0U7QUFDQSxXQUNFZCxrQkFBa0IsQ0FBQ0ksSUFBbkIsS0FBNEJXLGdDQUFnQkQsT0FBaEIsQ0FBNUIsSUFDQTdCLFNBQVMsQ0FBQ2Usa0JBQWtCLENBQUNJLElBQXBCLENBQVQsS0FBdUM5RyxTQUZ6QztBQUlEOztBQU1ELFdBQVNpSSxnQkFBVCxDQUNFdkIsa0JBREYsRUFFRWMsT0FGRixFQUdFO0FBQ0EsV0FDRXdCLHVCQUF1QixDQUFDdEMsa0JBQUQsRUFBcUJjLE9BQXJCLENBQXZCLElBQ0FkLGtCQUFrQixDQUFDSSxJQUFuQixLQUE0QkYsY0FBYyxDQUFDcUMsTUFBZixDQUFzQm5DLElBRGxELElBRUFVLE9BQU8sS0FBS1osY0FBYyxDQUFDcUMsTUFBZixDQUFzQnpCLE9BSHBDO0FBS0Q7O0FBTUQsV0FBU0ksZ0JBQVQsQ0FDRWxCLGtCQURGLEVBRUVjLE9BRkYsRUFHRTtBQUNBLFdBQ0V3Qix1QkFBdUIsQ0FBQ3RDLGtCQUFELEVBQXFCYyxPQUFyQixDQUF2QixJQUNBZCxrQkFBa0IsQ0FBQ0ksSUFBbkIsS0FBNEJGLGNBQWMsQ0FBQ0ksTUFBZixDQUFzQkYsSUFEbEQsSUFFQVUsT0FBTyxLQUFLWixjQUFjLENBQUNJLE1BQWYsQ0FBc0JRLE9BSHBDO0FBS0Q7O0FBRUQsV0FBU3dCLHVCQUFULENBQ0V0QyxrQkFERixFQUVFYyxPQUZGLEVBR0U7QUFDQSxXQUNFZCxrQkFBa0IsQ0FBQ0ksSUFBbkIsS0FBNEJXLGdDQUFnQkQsT0FBaEIsQ0FBNUIsSUFDQTdCLFNBQVMsQ0FBQ2Usa0JBQWtCLENBQUNJLElBQXBCLENBQVQsS0FBdUM5RyxTQUZ6QztBQUlEOztBQUVELFdBQVNnSSxZQUFULENBQ0V4QixTQURGLEVBRUVVLGVBRkYsRUFHRUcsa0JBSEYsRUFJRTtBQU9BLFFBQUlILGVBQWUsQ0FBQzNCLElBQWhCLEtBQXlCdkYsU0FBN0IsRUFBd0M7QUFDdENrSCxNQUFBQSxlQUFlLENBQUMzQixJQUFoQixHQUF1Qi9HLE1BQU0sQ0FBQ2dJLFNBQUQsQ0FBN0I7QUFDRDs7QUFFRFUsSUFBQUEsZUFBZSxDQUFDQyxtQkFBaEIsQ0FBb0N6RCxJQUFwQyxDQUF5QzJELGtCQUF6QztBQUNEOztBQUVELFdBQVN5QixZQUFULENBQ0VGLGNBREYsRUFFRXBDLFNBRkYsRUFHcUI7QUFDbkIsV0FBT29DLGNBQWMsQ0FBQ2hJLE1BQWYsQ0FDTCxVQUFDYixLQUFEO0FBQUEsYUFFR0EsS0FBSyxDQUFDNEQsUUFBTixDQUFlNUMsTUFBZixJQUNDaEIsS0FBSyxDQUFDNEQsUUFBTixDQUFlL0MsTUFBZixDQUFzQixVQUFBK0MsUUFBUTtBQUFBLGVBQUlBLFFBQVEsQ0FBQ0gsUUFBVCxLQUFzQmdELFNBQTFCO0FBQUEsT0FBOUIsQ0FERixJQUVBekcsS0FBSyxDQUFDeUQsUUFBTixLQUFtQmdELFNBSnJCO0FBQUEsS0FESyxDQUFQO0FBT0Q7QUFDRjs7QUFNRCxTQUFTRyx5QkFBVCxDQUNFRCxrQkFERixFQUVFRixTQUZGLEVBR0UwQyxzQkFIRixFQUlFO0FBQ0EsU0FDRXhDLGtCQUFrQixDQUFDYSxZQUFuQixLQUFvQ2YsU0FBcEMsSUFDQUUsa0JBQWtCLENBQUNJLElBQW5CLEtBQTRCb0Msc0JBRjlCO0FBSUQ7O0FBRUQsU0FBU0wsb0NBQVQsQ0FDRWxILE9BREYsRUFFRWQsR0FGRixFQUdFakIsZ0JBSEYsRUFJRTtBQUNBLE1BQU1LLE1BQU0sR0FDVjBCLE9BQU8sQ0FBQytHLE1BQVIsWUFBMEJwSyxnQkFBMUIsR0FDS3FELE9BQU8sQ0FBQytHLE1BQVQsQ0FBMEN6SSxNQUQ5QyxHQUVJMEIsT0FBTyxDQUFDK0csTUFBUixHQUNBL0csT0FBTyxDQUFDK0csTUFBUixDQUFlckYsS0FEZixHQUVBLEVBTE47O0FBT0EsTUFBSXBELE1BQUosRUFBWTtBQUNWQSxJQUFBQSxNQUFNLENBQUNZLEdBQUQsQ0FBTixHQUFjYyxPQUFPLENBQUMwQixLQUF0QjtBQUNEOztBQUVELFNBQU9tRixpQkFBaUIsQ0FBQzdHLE9BQUQsRUFBVTFCLE1BQVYsRUFBa0JMLGdCQUFsQixDQUF4QjtBQUNEOztBQUVELFNBQVM0SSxpQkFBVCxDQUNFN0csT0FERixFQUVFd0gsY0FGRixFQUdFdkosZ0JBSEYsRUFJRTtBQUNBLE1BQU1nSixjQUFpQyxHQUNyQ2pILE9BQU8sQ0FBQytHLE1BQVIsSUFBa0IvRyxPQUFPLENBQUMrRyxNQUFSLENBQWVyRixLQUFqQyxHQUNJLGtDQUFhOEYsY0FBYixFQUE2QnZKLGdCQUE3QixDQURKLEdBRUksRUFITjtBQUlBLFNBQU9nSixjQUFQO0FBQ0Q7O0FBRUQsU0FBU0gsZ0JBQVQsQ0FDRUYsT0FERixFQUVFN0Isa0JBRkYsRUFHRTBDLFNBSEYsRUFJRTtBQUNBLFNBQU9iLE9BQU8sR0FDVixJQURVLHVCQUdQYSxTQUhPLEVBR0s7QUFDWGxJLElBQUFBLEtBQUssRUFBRSxLQURJO0FBRVg0RixJQUFBQSxJQUFJLEVBQUVKLGtCQUFrQixDQUFDSTtBQUZkLEdBSEwsQ0FBZDtBQVFEOztBQU9ELElBQU1GLGNBQWMsR0FBRztBQUNyQkksRUFBQUEsTUFBTSxFQUFFO0FBQ05GLElBQUFBLElBQUksRUFBRSxrQkFEQTtBQUVOVSxJQUFBQSxPQUFPLEVBQUU7QUFGSCxHQURhO0FBS3JCWCxFQUFBQSxXQUFXLEVBQUU7QUFDWEMsSUFBQUEsSUFBSSxFQUFFO0FBREssR0FMUTtBQVFyQm1DLEVBQUFBLE1BQU0sRUFBRTtBQUNObkMsSUFBQUEsSUFBSSxFQUFFLGtCQURBO0FBRU5VLElBQUFBLE9BQU8sRUFBRTtBQUZIO0FBUmEsQ0FBdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBYnN0cmFjdENvbnRyb2wsXG4gIEFic3RyYWN0Q29udHJvbE9wdGlvbnMsXG4gIEFzeW5jVmFsaWRhdG9yRm4sXG4gIEZvcm1BcnJheSxcbiAgRm9ybUJ1aWxkZXIsXG4gIEZvcm1Db250cm9sLFxuICBGb3JtR3JvdXAsXG4gIFZhbGlkYXRvckZuXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGNsYXNzVG9DbGFzcywgcGxhaW5Ub0NsYXNzIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgQ2xhc3NUeXBlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXIvQ2xhc3NUcmFuc2Zvcm1lcic7XG5pbXBvcnQge1xuICBnZXRGcm9tQ29udGFpbmVyLFxuICBNZXRhZGF0YVN0b3JhZ2UsXG4gIHZhbGlkYXRlLFxuICB2YWxpZGF0ZVN5bmMsXG4gIFZhbGlkYXRpb25FcnJvcixcbiAgVmFsaWRhdGlvblR5cGVzLFxuICBWYWxpZGF0b3IsXG4gIFZhbGlkYXRvck9wdGlvbnNcbn0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcbmltcG9ydCB7IFZhbGlkYXRpb25NZXRhZGF0YSB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvci9tZXRhZGF0YS9WYWxpZGF0aW9uTWV0YWRhdGEnO1xuaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgRGljdGlvbmFyeSxcbiAgRHluYW1pY0Zvcm1Hcm91cEZpZWxkLFxuICBTaG9ydFZhbGlkYXRpb25FcnJvcnNcbn0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7XG4gIGZvcmV2ZXJJbnZhbGlkLFxuICBGT1JFVkVSX0lOVkFMSURfTkFNRVxufSBmcm9tICcuLi92YWxpZGF0b3JzL2ZvcmV2ZXItaW52YWxpZC52YWxpZGF0b3InO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm1Db250cm9sIH0gZnJvbSAnLi9keW5hbWljLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBXaWRnZXRPcHRpb25zLCBnZXRGb3JtRmllbGRzT3B0aW9ucyB9IGZyb20gJ0Bvb3AtZHlubWljLWZvcm1zL2NvcmUnO1xuXG5pbXBvcnQgY2xvbmVEZWVwIGZyb20gJ2xvZGFzaC5jbG9uZWRlZXAnO1xuaW1wb3J0IG1lcmdlV2l0aCBmcm9tICdsb2Rhc2gubWVyZ2V3aXRoJztcblxuLy8gRW5mb3JjZXMgdGhlIHByb3BlcnRpZXMgb2YgdGhlIG9iamVjdCwgaWYgc3VwcGxpZWQsIHRvIGJlIG9mIHRoZSBvcmlnaW5hbCB0eXBlIG9yIER5bmFtaWNGb3JtR3JvdXAgb3IsIEZvcm1BcnJheVxuZXhwb3J0IHR5cGUgRm9ybU1vZGVsPFQ+ID0ge1xuICBbUCBpbiBrZXlvZiBUXT86IFRbUF0gfCBEeW5hbWljRm9ybUdyb3VwPGFueT4gfCBGb3JtQXJyYXk7XG59O1xuXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1Hcm91cDxUTW9kZWw+IGV4dGVuZHMgRm9ybUdyb3VwIHtcbiAgcHVibGljIG5hdGl2ZVZhbGlkYXRlRXJyb3JzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEaWN0aW9uYXJ5Pih7fSk7XG4gIHB1YmxpYyBjdXN0b21WYWxpZGF0ZUVycm9ycyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2hvcnRWYWxpZGF0aW9uRXJyb3JzPih7fSk7XG4gIHB1YmxpYyBmb3JtRXJyb3JzOiBTaG9ydFZhbGlkYXRpb25FcnJvcnMgfCBudWxsID0gbnVsbDtcbiAgcHVibGljIGZvcm1GaWVsZHM6IERpY3Rpb25hcnk7XG4gIHB1YmxpYyBvYmplY3RDaGFuZ2UgPSBuZXcgU3ViamVjdCgpO1xuXG4gIHByb3RlY3RlZCBGb3JtQ29udHJvbENsYXNzID0gRHluYW1pY0Zvcm1Db250cm9sO1xuICBwcm90ZWN0ZWQgX29iamVjdDogVE1vZGVsIHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCBfZXh0ZXJuYWxFcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgX3ZhbGlkYXRvck9wdGlvbnM6IFZhbGlkYXRvck9wdGlvbnMgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkIF9mYiA9IG5ldyBGb3JtQnVpbGRlcigpO1xuICBwcml2YXRlIF9mb3JtR2VuOiBXaWRnZXRPcHRpb25zW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGZhY3RvcnlNb2RlbDogQ2xhc3NUeXBlPFRNb2RlbD4sXG4gICAgcHVibGljIGZpZWxkczogRm9ybU1vZGVsPFRNb2RlbD4sXG4gICAgdmFsaWRhdG9yT3JPcHRzPzpcbiAgICAgIHwgVmFsaWRhdG9yRm5cbiAgICAgIHwgVmFsaWRhdG9yRm5bXVxuICAgICAgfCBBYnN0cmFjdENvbnRyb2xPcHRpb25zXG4gICAgICB8IG51bGwsXG4gICAgYXN5bmNWYWxpZGF0b3I/OiBBc3luY1ZhbGlkYXRvckZuIHwgQXN5bmNWYWxpZGF0b3JGbltdIHwgbnVsbFxuICApIHtcbiAgICBzdXBlcih7fSwgdmFsaWRhdG9yT3JPcHRzLCBhc3luY1ZhbGlkYXRvcik7XG4gICAgLypcbiAgICBjb25zdCBjbGFzc1ZhbGlkYXRvcnMgPSBEeW5hbWljRm9ybUdyb3VwLmdldENsYXNzVmFsaWRhdG9yczxUTW9kZWw+KFxuICAgICAgdGhpcy5mYWN0b3J5TW9kZWwsXG4gICAgICB0aGlzLmZpZWxkcyxcbiAgICAgIHRoaXMuZGVmYXVsdFZhbGlkYXRvck9wdGlvbnNcbiAgICApO1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2ZiLmdyb3VwKFxuICAgICAgY2xhc3NWYWxpZGF0b3JzXG4gICAgKTtcbiAgICBPYmplY3Qua2V5cyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMuYWRkQ29udHJvbChrZXksIGZvcm1Hcm91cC5jb250cm9sc1trZXldKTtcbiAgICB9KTtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICB0aGlzLnZhbGlkYXRlKFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbGlkYXRvck9wdGlvbnNcbiAgICAgICk7XG4gICAgfSk7Ki9cbiAgICB0aGlzLmZvcm1GaWVsZHMgPSB0aGlzLm9ubHlGaWVsZHMoZmllbGRzKTtcbiAgICB0aGlzLl9mb3JtR2VuID0gZ2V0Rm9ybUZpZWxkc09wdGlvbnMoZmFjdG9yeU1vZGVsKTtcbiAgfVxuXG4gIGdldEZvcm1HZW5EYXRhKCkge1xuICAgIHJldHVybiB0aGlzLl9mb3JtR2VuO1xuICB9XG5cbiAgLy8gR2V0dGVycyAmIFNldHRlcnNcbiAgc2V0IGV4dGVybmFsRXJyb3JzKGV4dGVybmFsRXJyb3JzOiBTaG9ydFZhbGlkYXRpb25FcnJvcnMgfCBudWxsKSB7XG4gICAgdGhpcy5fZXh0ZXJuYWxFcnJvcnMgPSBleHRlcm5hbEVycm9ycztcbiAgICB0aGlzLnZhbGlkYXRlKCk7XG4gIH1cbiAgZ2V0IGV4dGVybmFsRXJyb3JzKCk6IFNob3J0VmFsaWRhdGlvbkVycm9ycyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9leHRlcm5hbEVycm9ycztcbiAgfVxuXG4gIHNldCB2YWxpZGF0b3JPcHRpb25zKHZhbGlkYXRvck9wdGlvbnM6IFZhbGlkYXRvck9wdGlvbnMgfCBudWxsKSB7XG4gICAgdGhpcy5fdmFsaWRhdG9yT3B0aW9ucyA9IHZhbGlkYXRvck9wdGlvbnM7XG4gICAgdGhpcy52YWxpZGF0ZSgpO1xuICB9XG4gIGdldCB2YWxpZGF0b3JPcHRpb25zKCk6IFZhbGlkYXRvck9wdGlvbnMgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWRhdG9yT3B0aW9ucztcbiAgfVxuXG4gIHNldCBvYmplY3Qob2JqZWN0OiBUTW9kZWwpIHtcbiAgICB0aGlzLnNldE9iamVjdChvYmplY3QpO1xuICB9XG4gIGdldCBvYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T2JqZWN0KCk7XG4gIH1cblxuICAvLyBQdWJsaWMgQVBJXG4gIHZhbGlkYXRlKFxuICAgIGV4dGVybmFsRXJyb3JzPzogU2hvcnRWYWxpZGF0aW9uRXJyb3JzLFxuICAgIHZhbGlkYXRvck9wdGlvbnM/OiBWYWxpZGF0b3JPcHRpb25zXG4gICkge1xuICAgIHRoaXMudmFsaWRhdGVBc3luYyhleHRlcm5hbEVycm9ycywgdmFsaWRhdG9yT3B0aW9ucykudGhlbihcbiAgICAgICgpID0+IHt9LFxuICAgICAgZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgYXN5bmMgdmFsaWRhdGVBc3luYyhcbiAgICBleHRlcm5hbEVycm9ycz86IFNob3J0VmFsaWRhdGlvbkVycm9ycyxcbiAgICB2YWxpZGF0b3JPcHRpb25zPzogVmFsaWRhdG9yT3B0aW9uc1xuICApIHtcbiAgICBpZiAoZXh0ZXJuYWxFcnJvcnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXh0ZXJuYWxFcnJvcnMgPSBjbG9uZURlZXAodGhpcy5fZXh0ZXJuYWxFcnJvcnMpO1xuICAgIH1cblxuICAgIGlmICh2YWxpZGF0b3JPcHRpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbGlkYXRvck9wdGlvbnMgPSBjbG9uZURlZXAodGhpcy5fdmFsaWRhdG9yT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKCFleHRlcm5hbEVycm9ycykge1xuICAgICAgZXh0ZXJuYWxFcnJvcnMgPSB7fTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdmFsaWRhdGUodGhpcy5vYmplY3QsIHZhbGlkYXRvck9wdGlvbnMpO1xuICAgICAgY29uc3QgdmFsaWRhdGlvbkVycm9ycyA9IHRoaXMudHJhbnNmb3JtVmFsaWRhdGlvbkVycm9ycyhyZXN1bHQpO1xuICAgICAgY29uc3QgYWxsRXJyb3JzID0gdGhpcy5tZXJnZUVycm9ycyhleHRlcm5hbEVycm9ycywgdmFsaWRhdGlvbkVycm9ycyk7XG5cbiAgICAgIHRoaXMubWFya0FzSW52YWxpZEZvckV4dGVybmFsRXJyb3JzKGV4dGVybmFsRXJyb3JzKTtcbiAgICAgIHRoaXMuc2V0Q3VzdG9tRXJyb3JzKGFsbEVycm9ycyk7XG5cbiAgICAgIC8vIHRvZG86IHJlZmFjdG9yLCBpbnZhbGlkYXRlIGZvcm0gaWYgZXhpc3RzIGFueSBhbGxFcnJvcnNcbiAgICAgIGxldCB1c2VkRm9yZXZlckludmFsaWQgPSBmYWxzZTtcbiAgICAgIGlmIChcbiAgICAgICAgT2JqZWN0LmtleXMoYWxsRXJyb3JzKS5maWx0ZXIoa2V5ID0+IGtleSAhPT0gRk9SRVZFUl9JTlZBTElEX05BTUUpXG4gICAgICAgICAgLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICB0aGlzLmdldChGT1JFVkVSX0lOVkFMSURfTkFNRSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLnJlbW92ZUNvbnRyb2woRk9SRVZFUl9JTlZBTElEX05BTUUpO1xuICAgICAgICB1c2VkRm9yZXZlckludmFsaWQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnZhbGlkICYmXG4gICAgICAgIE9iamVjdC5rZXlzKGFsbEVycm9ycykubGVuZ3RoID4gMCAmJlxuICAgICAgICAhdGhpcy5nZXQoRk9SRVZFUl9JTlZBTElEX05BTUUpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5hZGRDb250cm9sKFxuICAgICAgICAgIEZPUkVWRVJfSU5WQUxJRF9OQU1FLFxuICAgICAgICAgIG5ldyBGb3JtQ29udHJvbCgnJywgW2ZvcmV2ZXJJbnZhbGlkIGFzIGFueV0pXG4gICAgICAgICk7XG4gICAgICAgIHVzZWRGb3JldmVySW52YWxpZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAodXNlZEZvcmV2ZXJJbnZhbGlkKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7XG4gICAgICAgICAgb25seVNlbGY6IHRydWUsXG4gICAgICAgICAgZW1pdEV2ZW50OiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgc2V0Q3VzdG9tRXJyb3JzKGFsbEVycm9yczogYW55KSB7XG4gICAgdGhpcy5mb3JtRXJyb3JzID0gYWxsRXJyb3JzO1xuICAgIHRoaXMuY3VzdG9tVmFsaWRhdGVFcnJvcnMubmV4dCh0aGlzLmZvcm1FcnJvcnMgYXMgU2hvcnRWYWxpZGF0aW9uRXJyb3JzICk7XG4gICAgdGhpcy5uYXRpdmVWYWxpZGF0ZUVycm9ycy5uZXh0KHRoaXMuY29sbGVjdEVycm9ycyh0aGlzKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29sbGVjdEVycm9ycyhjb250cm9sOiBEaWN0aW9uYXJ5LCBpc1Jvb3QgPSB0cnVlKTogYW55IHwgbnVsbCB7XG4gICAgaWYgKGNvbnRyb2wuY29udHJvbHMpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLihpc1Jvb3QgPyB0aGlzLmVycm9ycyA6IHt9KSxcbiAgICAgICAgLi4uT2JqZWN0LmVudHJpZXMoY29udHJvbC5jb250cm9scykucmVkdWNlKFxuICAgICAgICAgIChhY2M6IGFueSwgW2tleSwgY2hpbGRDb250cm9sXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRFcnJvcnMgPSB0aGlzLmNvbGxlY3RFcnJvcnMoY2hpbGRDb250cm9sIGFzIERpY3Rpb25hcnk8YW55PiwgZmFsc2UpO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjaGlsZEVycm9ycyAmJlxuICAgICAgICAgICAgICBrZXkgIT09ICdmb3JldmVySW52YWxpZCcgJiZcbiAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY2hpbGRFcnJvcnMpLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBhY2MgPSB7XG4gICAgICAgICAgICAgICAgLi4uYWNjLFxuICAgICAgICAgICAgICAgIFtrZXldOiB7XG4gICAgICAgICAgICAgICAgICAuLi4oYWNjICYmIGFjY1trZXldID8gYWNjW2tleV0gOiB7fSksXG4gICAgICAgICAgICAgICAgICAuLi5jaGlsZEVycm9yc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7fVxuICAgICAgICApXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29udHJvbC5lcnJvcnM7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVBbGxGb3JtRmllbGRzKCkge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuY29udHJvbHMpLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgY29uc3QgY29udHJvbCA9IHRoaXMuZ2V0KGZpZWxkKTtcblxuICAgICAgLy8gQ29udHJvbFxuICAgICAgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xuICAgICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICAgIC8vIEdyb3VwOiByZWN1cnNpdmVcbiAgICAgIGVsc2UgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwKSB7XG4gICAgICAgIGNvbnRyb2wudmFsaWRhdGVBbGxGb3JtRmllbGRzKCk7XG4gICAgICB9XG4gICAgICAvLyBBcnJheVxuICAgICAgZWxzZSBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAvLyBDb250cm9sIGluIEFycmF5XG4gICAgICAgICAgaWYgKChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgKChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gYXMgRm9ybUNvbnRyb2wpLm1hcmtBc1RvdWNoZWQoe1xuICAgICAgICAgICAgICBvbmx5U2VsZjogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEdyb3VwIGluIEFycmF5OiByZWN1cnNpdmVcbiAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgIChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBhcyBEeW5hbWljRm9ybUdyb3VwPFxuICAgICAgICAgICAgICBhbnlcbiAgICAgICAgICAgID4pLnZhbGlkYXRlQWxsRm9ybUZpZWxkcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVzZXRWYWxpZGF0ZUFsbEZvcm1GaWVsZHMoKSB7XG4gICAgdGhpcy5tYXJrQXNJbnZhbGlkRm9yRXh0ZXJuYWxFcnJvcnMoe30pO1xuXG4gICAgT2JqZWN0LmtleXModGhpcy5jb250cm9scykuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXQoZmllbGQpO1xuXG4gICAgICAvLyBDb250cm9sXG4gICAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XG4gICAgICAgIGNvbnRyb2wuc2V0RXJyb3JzKG51bGwsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgY29udHJvbC5tYXJrQXNVbnRvdWNoZWQoeyBvbmx5U2VsZjogdHJ1ZSB9KTtcbiAgICAgICAgY29udHJvbC5tYXJrQXNQcmlzdGluZSh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgfVxuICAgICAgLy8gR3JvdXA6IHJlY3Vyc2l2ZVxuICAgICAgZWxzZSBpZiAoY29udHJvbCBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgY29udHJvbC5yZXNldFZhbGlkYXRlQWxsRm9ybUZpZWxkcygpO1xuICAgICAgfVxuICAgICAgLy8gQXJyYXlcbiAgICAgIGVsc2UgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAoY29udHJvbCBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gQ29udHJvbCBpbiBBcnJheVxuICAgICAgICAgIGlmICgoY29udHJvbCBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW2ldIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgICgoY29udHJvbCBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW1xuICAgICAgICAgICAgICBpXG4gICAgICAgICAgICBdIGFzIEZvcm1Db250cm9sKS5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICAgICAgKChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgIF0gYXMgRm9ybUNvbnRyb2wpLm1hcmtBc1VudG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgICAgICAgKChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gYXMgRm9ybUNvbnRyb2wpLm1hcmtBc1ByaXN0aW5lKHtcbiAgICAgICAgICAgICAgb25seVNlbGY6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBHcm91cCBpbiBBcnJheTogcmVjdXJzaXZlXG4gICAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgICAoY29udHJvbCBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW2ldIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgKChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gYXMgRHluYW1pY0Zvcm1Hcm91cDxcbiAgICAgICAgICAgICAgYW55XG4gICAgICAgICAgICA+KS5yZXNldFZhbGlkYXRlQWxsRm9ybUZpZWxkcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc2V0Q3VzdG9tRXJyb3JzKHt9KTtcbiAgfVxuXG4gIGNsYXNzVG9DbGFzczxUQ2xhc3NNb2RlbD4ob2JqZWN0OiBUQ2xhc3NNb2RlbCkge1xuICAgIHJldHVybiBjbGFzc1RvQ2xhc3Mob2JqZWN0LCB7IGlnbm9yZURlY29yYXRvcnM6IHRydWUgfSk7XG4gIH1cblxuICBwbGFpblRvQ2xhc3M8VENsYXNzTW9kZWwsIE9iamVjdD4oXG4gICAgY2xzOiBDbGFzc1R5cGU8VENsYXNzTW9kZWw+LFxuICAgIHBsYWluOiBPYmplY3RcbiAgKSB7XG4gICAgcmV0dXJuIHBsYWluVG9DbGFzcyhjbHMsIHBsYWluLCB7IGlnbm9yZURlY29yYXRvcnM6IHRydWUgfSk7XG4gIH1cblxuICBhc3luYyBzZXRFeHRlcm5hbEVycm9yc0FzeW5jKGV4dGVybmFsRXJyb3JzOiBTaG9ydFZhbGlkYXRpb25FcnJvcnMpIHtcbiAgICB0aGlzLl9leHRlcm5hbEVycm9ycyA9IGV4dGVybmFsRXJyb3JzO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy52YWxpZGF0ZUFzeW5jKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHNldEV4dGVybmFsRXJyb3JzKGV4dGVybmFsRXJyb3JzOiBTaG9ydFZhbGlkYXRpb25FcnJvcnMpIHtcbiAgICB0aGlzLnNldEV4dGVybmFsRXJyb3JzQXN5bmMoZXh0ZXJuYWxFcnJvcnMpLnRoZW4oXG4gICAgICAoKSA9PiB7fSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGdldEV4dGVybmFsRXJyb3JzKCk6IFNob3J0VmFsaWRhdGlvbkVycm9ycyB7XG4gICAgcmV0dXJuIHRoaXMuX2V4dGVybmFsRXJyb3JzIGFzIFNob3J0VmFsaWRhdGlvbkVycm9ycztcbiAgfVxuXG4gIGNsZWFyRXh0ZXJuYWxFcnJvcnMoKSB7XG4gICAgdGhpcy5zZXRFeHRlcm5hbEVycm9ycyh7fSk7XG4gIH1cbiAgY2xlYXJFeHRlcm5hbEVycm9yc0FzeW5jKCkge1xuICAgIHJldHVybiB0aGlzLnNldEV4dGVybmFsRXJyb3JzQXN5bmMoe30pO1xuICB9XG5cbiAgYXN5bmMgc2V0VmFsaWRhdG9yT3B0aW9uc0FzeW5jKHZhbGlkYXRvck9wdGlvbnM6IFZhbGlkYXRvck9wdGlvbnMpIHtcbiAgICB0aGlzLl92YWxpZGF0b3JPcHRpb25zID0gdmFsaWRhdG9yT3B0aW9ucztcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMudmFsaWRhdGVBc3luYygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBzZXRWYWxpZGF0b3JPcHRpb25zKHZhbGlkYXRvck9wdGlvbnM6IFZhbGlkYXRvck9wdGlvbnMpIHtcbiAgICB0aGlzLnNldFZhbGlkYXRvck9wdGlvbnNBc3luYyh2YWxpZGF0b3JPcHRpb25zKS50aGVuKFxuICAgICAgKCkgPT4ge30sXG4gICAgICBlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBnZXRWYWxpZGF0b3JPcHRpb25zKCk6IFZhbGlkYXRvck9wdGlvbnMge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0b3JPcHRpb25zIGFzIFZhbGlkYXRvck9wdGlvbnM7XG4gIH1cblxuICAvLyBIZWxwZXJzXG4gIHByb3RlY3RlZCBvbmx5RmllbGRzKGZpZWxkczogRm9ybU1vZGVsPGFueT4pOiBEaWN0aW9uYXJ5IHtcbiAgICBjb25zdCBuZXdGaWVsZHM6IERpY3Rpb25hcnkgPSB7fTtcblxuICAgIGlmIChmaWVsZHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgT2JqZWN0LmtleXMoZmllbGRzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChmaWVsZHNba2V5XSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgICAvLyBHcm91cDogcmVjdXJzaXZlXG4gICAgICAgICAgbmV3RmllbGRzW2tleV0gPSB0aGlzLm9ubHlGaWVsZHMoXG4gICAgICAgICAgICAoZmllbGRzW2tleV0gYXMgRHluYW1pY0Zvcm1Hcm91cDxhbnk+KS5mb3JtRmllbGRzXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBBcnJheVxuICAgICAgICAgIGlmIChmaWVsZHNba2V5XSBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoZmllbGRzW2tleV0gYXMgRm9ybUFycmF5KS5jb250cm9sc1swXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAvLyBHcm91cCB3aXRoaW4gQXJyYXk6IHJlY3Vyc2l2ZVxuICAgICAgICAgICAgICBuZXdGaWVsZHNba2V5XSA9IHRoaXMub25seUZpZWxkcyhcbiAgICAgICAgICAgICAgICAoKGZpZWxkc1trZXldIGFzIEZvcm1BcnJheSkuY29udHJvbHNbMF0gYXMgRHluYW1pY0Zvcm1Hcm91cDxcbiAgICAgICAgICAgICAgICAgIGFueVxuICAgICAgICAgICAgICAgID4pLmZvcm1GaWVsZHNcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIENvbnRyb2wgd2l0aGluIEFycmF5XG4gICAgICAgICAgICAgIG5ld0ZpZWxkc1trZXldID0gKGZpZWxkc1trZXldIGFzIEZvcm1BcnJheSkuY29udHJvbHNbMF0udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBDb250cm9sXG4gICAgICAgICAgICBuZXdGaWVsZHNba2V5XSA9IGZpZWxkc1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld0ZpZWxkcztcbiAgfVxuXG4gIHRyYW5zZm9ybVZhbGlkYXRpb25FcnJvcnMoZXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JbXSk6IFNob3J0VmFsaWRhdGlvbkVycm9ycyB7XG4gICAgY29uc3QgY3VzdG9tRXJyb3JzOiBTaG9ydFZhbGlkYXRpb25FcnJvcnMgPSB7fTtcblxuICAgIGVycm9ycy5mb3JFYWNoKChlcnJvcjogVmFsaWRhdGlvbkVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3IgJiYgZXJyb3IuY29uc3RyYWludHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3Qua2V5cyhlcnJvci5jb25zdHJhaW50cykuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBpZiAoIWN1c3RvbUVycm9yc1tlcnJvci5wcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgIGN1c3RvbUVycm9yc1tlcnJvci5wcm9wZXJ0eV0gPSBbXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoY3VzdG9tRXJyb3JzW2Vycm9yLnByb3BlcnR5XSBhcyBzdHJpbmdbXSkuaW5kZXhPZihcbiAgICAgICAgICAgICAgZXJyb3IuY29uc3RyYWludHNba2V5XVxuICAgICAgICAgICAgKSA9PT0gLTFcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIChjdXN0b21FcnJvcnNbZXJyb3IucHJvcGVydHldIGFzIHN0cmluZ1tdKS5wdXNoKFxuICAgICAgICAgICAgICBlcnJvci5jb25zdHJhaW50c1trZXldXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnJvci5jaGlsZHJlbiAhPT0gdW5kZWZpbmVkICYmIGVycm9yLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICBjdXN0b21FcnJvcnNbZXJyb3IucHJvcGVydHldID0gdGhpcy50cmFuc2Zvcm1WYWxpZGF0aW9uRXJyb3JzKFxuICAgICAgICAgIGVycm9yLmNoaWxkcmVuXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY3VzdG9tRXJyb3JzO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1lcmdlRXJyb3JzKFxuICAgIGV4dGVybmFsRXJyb3JzPzogU2hvcnRWYWxpZGF0aW9uRXJyb3JzLFxuICAgIHZhbGlkYXRpb25FcnJvcnM/OiBTaG9ydFZhbGlkYXRpb25FcnJvcnNcbiAgKSB7XG4gICAgY29uc3QgY2xvbmVkRXh0ZXJuYWxFcnJvcnMgPSBjbG9uZURlZXAoZXh0ZXJuYWxFcnJvcnMpO1xuICAgIHJldHVybiBtZXJnZVdpdGgoXG4gICAgICBjbG9uZWRFeHRlcm5hbEVycm9ycyxcbiAgICAgIHZhbGlkYXRpb25FcnJvcnMsXG4gICAgICAob2JqVmFsdWUsIHNyY1ZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChjYW5NZXJnZSgpKSB7XG4gICAgICAgICAgcmV0dXJuIG9ialZhbHVlLmNvbmNhdChzcmNWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjYW5NZXJnZSgpIHtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShvYmpWYWx1ZSkgJiZcbiAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoc3JjVmFsdWUpICYmXG4gICAgICAgICAgICBvYmpWYWx1ZS5maWx0ZXIob2JqSXRlbSA9PiBzcmNWYWx1ZS5pbmRleE9mKG9iakl0ZW0pICE9PSAtMSlcbiAgICAgICAgICAgICAgLmxlbmd0aCA9PT0gMFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIG1hcmtBc0ludmFsaWRGb3JFeHRlcm5hbEVycm9ycyhcbiAgICBlcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycyxcbiAgICBjb250cm9scz86IERpY3Rpb25hcnk8QWJzdHJhY3RDb250cm9sPlxuICApIHtcbiAgICBpZiAoIWNvbnRyb2xzKSB7XG4gICAgICBjb250cm9scyA9IHRoaXMuY29udHJvbHM7XG4gICAgfVxuICAgIE9iamVjdC5rZXlzKGNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBjb250cm9scyFbZmllbGRdO1xuXG4gICAgICAvLyBDb250cm9sXG4gICAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XG4gICAgICAgIGlmIChlcnJvcnMgJiYgZXJyb3JzW2ZpZWxkXSkge1xuICAgICAgICAgIGNvbnRyb2wuc2V0RXJyb3JzKHsgZXh0ZXJuYWxFcnJvcjogdHJ1ZSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY29udHJvbC5lcnJvcnMgJiYgY29udHJvbC5lcnJvcnMuZXh0ZXJuYWxFcnJvciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29udHJvbC5zZXRFcnJvcnMobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBHcm91cFxuICAgICAgZWxzZSBpZiAoY29udHJvbCBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgY29udHJvbC5tYXJrQXNJbnZhbGlkRm9yRXh0ZXJuYWxFcnJvcnMoXG4gICAgICAgICAgZXJyb3JzICYmIGVycm9yc1tmaWVsZF1cbiAgICAgICAgICAgID8gKGVycm9yc1tmaWVsZF0gYXMgU2hvcnRWYWxpZGF0aW9uRXJyb3JzKVxuICAgICAgICAgICAgOiB7fVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gQXJyYXlcbiAgICAgIGVsc2UgaWYgKGNvbnRyb2wgaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAoY29udHJvbCBhcyBGb3JtQXJyYXkpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgLy8gQ29udHJvbCBpbiBBcnJheVxuICAgICAgICAgIGlmIChjb250cm9sW2ldIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgIGlmIChlcnJvcnMgJiYgZXJyb3JzW2ldICYmIGVycm9yc1tpXVtmaWVsZF0pIHtcbiAgICAgICAgICAgICAgY29udHJvbFtpXS5zZXRFcnJvcnMoeyBleHRlcm5hbEVycm9yOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgY29udHJvbFtpXS5lcnJvcnMgJiZcbiAgICAgICAgICAgICAgY29udHJvbFtpXS5lcnJvcnMuZXh0ZXJuYWxFcnJvciA9PT0gdHJ1ZVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbnRyb2xbaV0uc2V0RXJyb3JzKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBHcm91cCBpbiBBcnJheVxuICAgICAgICAgIGVsc2UgaWYgKGNvbnRyb2xbaV0gaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwKSB7XG4gICAgICAgICAgICBjb250cm9sW2ldLm1hcmtBc0ludmFsaWRGb3JFeHRlcm5hbEVycm9ycyhcbiAgICAgICAgICAgICAgZXJyb3JzICYmIGVycm9yc1tpXSAmJiBlcnJvcnNbaV1bZmllbGRdXG4gICAgICAgICAgICAgICAgPyAoZXJyb3JzW2ldW2ZpZWxkXSBhcyBTaG9ydFZhbGlkYXRpb25FcnJvcnMpXG4gICAgICAgICAgICAgICAgOiB7fVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBnZXRzIGFsbCB2YWx1ZXMgZnJvbSB0aGUgZm9ybSBjb250cm9scyBhbmQgYWxsIHN1YiBmb3JtIGdyb3VwIGFuZCBhcnJheSBjb250cm9scyBhbmQgcmV0dXJucyBpdCBhc1xuICAgKiBhbiBvYmplY3RcbiAgICovXG4gIHByb3RlY3RlZCBnZXRPYmplY3QoKTogVE1vZGVsIHtcbiAgICAvLyBJbml0aWFsaXplIHRoZSBzaGFwZSBvZiB0aGUgcmVzcG9uc2VcbiAgICBjb25zdCBvYmplY3QgPSB0aGlzLl9vYmplY3RcbiAgICAgID8gdGhpcy5jbGFzc1RvQ2xhc3ModGhpcy5fb2JqZWN0KVxuICAgICAgOiB0aGlzLmZhY3RvcnlNb2RlbFxuICAgICAgPyBuZXcgdGhpcy5mYWN0b3J5TW9kZWwoKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAob2JqZWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIFJlY3Vyc2l2ZWx5IGdldCB0aGUgdmFsdWUgb2YgYWxsIGZpZWxkc1xuICAgICAgT2JqZWN0LmtleXModGhpcy5jb250cm9scylcbiAgICAgICAgLmZpbHRlcihuYW1lID0+IG5hbWUgIT09IEZPUkVWRVJfSU5WQUxJRF9OQU1FKVxuICAgICAgICAuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgIC8vIEhhbmRsZSBHcm91cFxuICAgICAgICAgIGlmICh0aGlzLmNvbnRyb2xzW2tleV0gaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwKSB7XG4gICAgICAgICAgICBvYmplY3Rba2V5XSA9ICh0aGlzLmNvbnRyb2xzW2tleV0gYXMgRHluYW1pY0Zvcm1Hcm91cDxhbnk+KS5vYmplY3Q7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSGFuZGxlIEZvcm0gQXJyYXlcbiAgICAgICAgICBlbHNlIGlmICh0aGlzLmNvbnRyb2xzW2tleV0gaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdmFsdWVcbiAgICAgICAgICAgIG9iamVjdFtrZXldID0gW107XG5cbiAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgICAgaSA8ICh0aGlzLmNvbnRyb2xzW2tleV0gYXMgRm9ybUFycmF5KS5jb250cm9scy5sZW5ndGg7XG4gICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGxldCB2YWx1ZTtcblxuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgKHRoaXMuY29udHJvbHNba2V5XSBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW2ldIGluc3RhbmNlb2ZcbiAgICAgICAgICAgICAgICBEeW5hbWljRm9ybUdyb3VwXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGdldCBvYmplY3QgZ3JvdXBcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICgodGhpcy5jb250cm9sc1trZXldIGFzIEZvcm1BcnJheSkuY29udHJvbHNbXG4gICAgICAgICAgICAgICAgICBpXG4gICAgICAgICAgICAgICAgXSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT4pLm9iamVjdDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICh0aGlzLmNvbnRyb2xzW2tleV0gYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXS52YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAodmFsdWUgJiYgT2JqZWN0LmtleXModmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBvYmplY3Rba2V5XS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEhhbmRsZSBDb250cm9sXG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBvYmplY3Rba2V5XSA9IHRoaXMuY29udHJvbHNba2V5XS52YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gKHRoaXMuZmFjdG9yeU1vZGVsXG4gICAgICA/IHRoaXMucGxhaW5Ub0NsYXNzKHRoaXMuZmFjdG9yeU1vZGVsLCBvYmplY3QpXG4gICAgICA6IG9iamVjdCkgYXMgVE1vZGVsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIHZhbHVlIG9mIGV2ZXJ5IGNvbnRyb2wgb24gdGhlIGZvcm0gYW5kIHJlY3Vyc2l2ZWx5IHNldHMgdGhlIHZhbHVlcyBvZiB0aGUgY29udHJvbHNcbiAgICogb24gYWxsIHN1YiBmb3JtIGdyb3Vwc1xuICAgKlxuICAgKiBAcGFyYW0gb2JqZWN0IHRoZSBkYXRhIHRvIGFzc2lnbiB0byBhbGwgY29udHJvbHMgb2YgdGhlIGZvcm0gZ3JvdXAgYW5kIHN1YiBncm91cHNcbiAgICovXG4gIHByb3RlY3RlZCBzZXRPYmplY3Qob2JqZWN0OiBUTW9kZWwpIHtcbiAgICBpZiAob2JqZWN0IGluc3RhbmNlb2YgdGhpcy5mYWN0b3J5TW9kZWwpIHtcbiAgICAgIHRoaXMuX29iamVjdCA9IHRoaXMuY2xhc3NUb0NsYXNzKG9iamVjdCk7IC8vIEVuc3VyZSBjb3JyZWN0IHR5cGVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fb2JqZWN0ID0gdGhpcy5wbGFpblRvQ2xhc3ModGhpcy5mYWN0b3J5TW9kZWwsIG9iamVjdCBhcyBPYmplY3QpOyAvLyBDb252ZXJ0IHRvIE1vZGVsIHR5cGVcbiAgICB9XG5cbiAgICAvLyBSZWN1cnNpdmVseSBzZXQgdGhlIHZhbHVlIG9mIGFsbCBmaWVsZHNcbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbnRyb2xzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAvLyBIYW5kbGUgR3JvdXBcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xzW2tleV0gaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwKSB7XG4gICAgICAgICh0aGlzLmNvbnRyb2xzW2tleV0gYXMgRHluYW1pY0Zvcm1Hcm91cDxhbnk+KS5vYmplY3QgPSB0aGlzLl9vYmplY3RcbiAgICAgICAgICA/IHRoaXMuX29iamVjdFtrZXldXG4gICAgICAgICAgOiB7fTtcbiAgICAgIH1cblxuICAgICAgLy8gSGFuZGxlIEZvcm1BcnJheVxuICAgICAgZWxzZSBpZiAodGhpcy5jb250cm9sc1trZXldIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICAgIGNvbnN0IG9iamVjdEFycmF5ID0gdGhpcy5fb2JqZWN0ID8gdGhpcy5fb2JqZWN0W2tleV0gOiBbXTtcbiAgICAgICAgY29uc3QgZm9ybUFycmF5ID0gdGhpcy5jb250cm9sc1trZXldIGFzIEZvcm1BcnJheTtcbiAgICAgICAgY29uc3QgaXNGb3JtR3JvdXAgPSBmb3JtQXJyYXkuY29udHJvbHNbMF0gaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwO1xuICAgICAgICBjb25zdCBmaXJzdEZvcm1Hcm91cCA9IGZvcm1BcnJheS5jb250cm9sc1swXSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT47XG4gICAgICAgIGNvbnN0IGZvcm1Db250cm9sID0gZm9ybUFycmF5LmNvbnRyb2xzWzBdIGFzIEZvcm1Db250cm9sO1xuXG4gICAgICAgIC8vIENsZWFyIEZvcm1BcnJheSB3aGlsZSByZXRhaW5pbmcgdGhlIHJlZmVyZW5jZVxuICAgICAgICB3aGlsZSAoZm9ybUFycmF5Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIGZvcm1BcnJheS5yZW1vdmVBdCgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaXNGb3JtR3JvdXApIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBGb3JtR3JvdXBcbiAgICAgICAgICAgIGNvbnN0IGR5bmFtaWNGb3JtR3JvdXAgPSBuZXcgRHluYW1pY0Zvcm1Hcm91cChcbiAgICAgICAgICAgICAgZmlyc3RGb3JtR3JvdXAuZmFjdG9yeU1vZGVsLFxuICAgICAgICAgICAgICBmaXJzdEZvcm1Hcm91cC5mb3JtRmllbGRzXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBkeW5hbWljRm9ybUdyb3VwLnNldFBhcmVudCh0aGlzKTtcblxuICAgICAgICAgICAgY29uc3QgY2xhc3NWYWxpZGF0b3JzID0gZ2V0Q2xhc3NWYWxpZGF0b3JzPFRNb2RlbD4oXG4gICAgICAgICAgICAgIGZpcnN0Rm9ybUdyb3VwLmZhY3RvcnlNb2RlbCxcbiAgICAgICAgICAgICAgZmlyc3RGb3JtR3JvdXAuZm9ybUZpZWxkcyxcbiAgICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICB0aGlzLkZvcm1Db250cm9sQ2xhc3NcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mYi5ncm91cChjbGFzc1ZhbGlkYXRvcnMpO1xuXG4gICAgICAgICAgICAvLyBBZGQgYWxsIGNvbnRyb2xzIHRvIHRoZSBmb3JtIGdyb3VwXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goY3RybEtleSA9PiB7XG4gICAgICAgICAgICAgIGR5bmFtaWNGb3JtR3JvdXAuYWRkQ29udHJvbChjdHJsS2V5LCBmb3JtR3JvdXAuY29udHJvbHNbY3RybEtleV0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBhIHZhbHVlIGNoYW5nZSBsaXN0ZW5lciB0byB0aGUgZ3JvdXAuIG9uIGNoYW5nZSwgdmFsaWRhdGVcbiAgICAgICAgICAgIGR5bmFtaWNGb3JtR3JvdXAudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgICAgZHluYW1pY0Zvcm1Hcm91cC52YWxpZGF0ZSh1bmRlZmluZWQsIHRoaXMuX3ZhbGlkYXRvck9wdGlvbnMgYXMgVmFsaWRhdG9yT3B0aW9ucyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZm9ybUFycmF5LmNvbnRyb2xzLnB1c2goZHluYW1pY0Zvcm1Hcm91cCk7XG5cbiAgICAgICAgICAgIC8vIFJlY3Vzcml2ZWx5IHNldCB0aGUgb2JqZWN0IHZhbHVlXG4gICAgICAgICAgICAoZm9ybUFycmF5LmNvbnRyb2xzW2ldIGFzIER5bmFtaWNGb3JtR3JvdXA8YW55Pikub2JqZWN0ID1cbiAgICAgICAgICAgICAgdGhpcy5fb2JqZWN0ICYmIG9iamVjdEFycmF5ICYmIG9iamVjdEFycmF5W2ldXG4gICAgICAgICAgICAgICAgPyBvYmplY3RBcnJheVtpXVxuICAgICAgICAgICAgICAgIDoge307XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBjb250cm9sXG4gICAgICAgICAgICBjb25zdCBjb250cm9sVmFsdWUgPVxuICAgICAgICAgICAgICB0aGlzLl9vYmplY3QgJiYgb2JqZWN0QXJyYXkgJiYgb2JqZWN0QXJyYXlbaV1cbiAgICAgICAgICAgICAgICA/IG9iamVjdEFycmF5W2ldXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjb25zdCBuZXdGb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChcbiAgICAgICAgICAgICAgY29udHJvbFZhbHVlLFxuICAgICAgICAgICAgICBmb3JtQ29udHJvbC52YWxpZGF0b3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBuZXdGb3JtQ29udHJvbC5zZXRQYXJlbnQodGhpcyk7XG5cbiAgICAgICAgICAgIC8vIEFkZCB0aGUgY29udHJvbCB0byB0aGUgRm9ybUFycmF5XG4gICAgICAgICAgICBmb3JtQXJyYXkuY29udHJvbHMucHVzaChuZXdGb3JtQ29udHJvbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEhhbmRsZSBDb250cm9sXG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgbmV3T2JqZWN0ID0gdGhpcy5fb2JqZWN0ID8gdGhpcy5fb2JqZWN0W2tleV0gOiBbXTtcbiAgICAgICAgdGhpcy5jb250cm9sc1trZXldLnNldFZhbHVlKFxuICAgICAgICAgIHRoaXMuX29iamVjdCAmJiBuZXdPYmplY3QgPyBuZXdPYmplY3QgOiB1bmRlZmluZWRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm9iamVjdENoYW5nZS5uZXh0KHRoaXMuX29iamVjdCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENsYXNzVmFsaWRhdG9yczxUTW9kZWw+KFxuICBmYWN0b3J5TW9kZWw6IENsYXNzVHlwZTxUTW9kZWw+LFxuICBmaWVsZHM6IERpY3Rpb25hcnksXG4gIHZhbGlkYXRvck9wdGlvbnM/OiBWYWxpZGF0b3JPcHRpb25zLFxuICBGb3JtQ29udHJvbENsYXNzOiBhbnkgPSBEeW5hbWljRm9ybUNvbnRyb2xcbikge1xuICAvLyBHZXQgdGhlIHZhbGlkYXRpb24gcnVsZXMgZnJvbSB0aGUgb2JqZWN0IGRlY29yYXRvcnNcbiAgY29uc3QgYWxsVmFsaWRhdGlvbk1ldGFkYXRhczogVmFsaWRhdGlvbk1ldGFkYXRhW10gPSBnZXRGcm9tQ29udGFpbmVyKFxuICAgIE1ldGFkYXRhU3RvcmFnZVxuICApLmdldFRhcmdldFZhbGlkYXRpb25NZXRhZGF0YXMoZmFjdG9yeU1vZGVsLCAnJyk7XG5cbiAgLy8gR2V0IHRoZSB2YWxpZGF0aW9uIHJ1bGVzIGZvciB0aGUgdmFsaWRhdGlvbiBncm91cDogaHR0cHM6Ly9naXRodWIuY29tL3R5cGVzdGFjay9jbGFzcy12YWxpZGF0b3IjdmFsaWRhdGlvbi1ncm91cHNcbiAgY29uc3QgdmFsaWRhdGlvbkdyb3VwTWV0YWRhdGFzOiBWYWxpZGF0aW9uTWV0YWRhdGFbXSA9IGdldEZyb21Db250YWluZXIoXG4gICAgTWV0YWRhdGFTdG9yYWdlXG4gICkuZ2V0VGFyZ2V0VmFsaWRhdGlvbk1ldGFkYXRhcyhcbiAgICBmYWN0b3J5TW9kZWwsXG4gICAgJycsXG4gICAgdmFsaWRhdG9yT3B0aW9ucyAmJiB2YWxpZGF0b3JPcHRpb25zLmdyb3Vwc1xuICAgICAgPyB2YWxpZGF0b3JPcHRpb25zLmdyb3Vwc1xuICAgICAgOiB1bmRlZmluZWRcbiAgKTtcblxuICBjb25zdCBmb3JtR3JvdXBGaWVsZHMgPSB7fTtcbiAgY29uc3QgdmFsaWRhdG9yID0gbmV3IFZhbGlkYXRvcigpO1xuXG4gIC8vIExvb3AgdGhyb3VnaCBhbGwgZmllbGRzIGluIHRoZSBmb3JtIGRlZmluaXRpb25cbiAgT2JqZWN0LmtleXMoZmllbGRzKVxuICAgIC5maWx0ZXIoa2V5ID0+IGtleS5pbmRleE9mKCdfXycpICE9PSAwKVxuICAgIC5mb3JFYWNoKGZpZWxkTmFtZSA9PiB7XG4gICAgICAvLyBDb25kaXRpb25hbCBWYWxpZGF0aW9uIGZvciB0aGUgZmllbGRcbiAgICAgIGNvbnN0IGNvbmRpdGlvbmFsVmFsaWRhdGlvbnM6IFZhbGlkYXRpb25NZXRhZGF0YVtdID0gW107XG4gICAgICB2YWxpZGF0aW9uR3JvdXBNZXRhZGF0YXMuZm9yRWFjaCh2YWxpZGF0aW9uTWV0YWRhdGEgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaXNQcm9wZXJ0eVZhbGlkYXRvck9mVHlwZShcbiAgICAgICAgICAgIHZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICAgIFZhbGlkYXRpb25LZXlzLmNvbmRpdGlvbmFsLnR5cGVcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbmRpdGlvbmFsVmFsaWRhdGlvbnMucHVzaCh2YWxpZGF0aW9uTWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gQWxsIE5lc3RlZCBWYWxpZGF0aW9uIGZvciB0aGUgZmllbGRcbiAgICAgIGNvbnN0IGFsbE5lc3RlZFZhbGlkYXRpb25zOiBWYWxpZGF0aW9uTWV0YWRhdGFbXSA9IFtdO1xuICAgICAgYWxsVmFsaWRhdGlvbk1ldGFkYXRhcy5mb3JFYWNoKHZhbGlkYXRpb25NZXRhZGF0YSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpc1Byb3BlcnR5VmFsaWRhdG9yT2ZUeXBlKFxuICAgICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgICAgICAgICAgZmllbGROYW1lLFxuICAgICAgICAgICAgVmFsaWRhdGlvbktleXMubmVzdGVkLnR5cGVcbiAgICAgICAgICApXG4gICAgICAgICkge1xuICAgICAgICAgIGFsbE5lc3RlZFZhbGlkYXRpb25zLnB1c2godmFsaWRhdGlvbk1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIE5lc3RlZCBWYWxpZGF0aW9uIGZvciB0aGUgZmllbGQgZm9yIHRoZSByZXF1ZXN0ZWQgY2xhc3MtdmFsaWRhdG9yIGdyb3VwXG4gICAgICBjb25zdCBuZXN0ZWRHcm91cFZhbGlkYXRpb25zOiBWYWxpZGF0aW9uTWV0YWRhdGFbXSA9IFtdO1xuICAgICAgdmFsaWRhdGlvbkdyb3VwTWV0YWRhdGFzLmZvckVhY2godmFsaWRhdGlvbk1ldGFkYXRhID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlzUHJvcGVydHlWYWxpZGF0b3JPZlR5cGUoXG4gICAgICAgICAgICB2YWxpZGF0aW9uTWV0YWRhdGEsXG4gICAgICAgICAgICBmaWVsZE5hbWUsXG4gICAgICAgICAgICBWYWxpZGF0aW9uS2V5cy5uZXN0ZWQudHlwZVxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgbmVzdGVkR3JvdXBWYWxpZGF0aW9ucy5wdXNoKHZhbGlkYXRpb25NZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBmaWVsZERlZmluaXRpb246IER5bmFtaWNGb3JtR3JvdXBGaWVsZCA9IHtcbiAgICAgICAgZGF0YTogZm9ybUdyb3VwRmllbGRzW2ZpZWxkTmFtZV0sXG4gICAgICAgIHZhbGlkYXRpb25GdW5jdGlvbnM6IFtdLFxuICAgICAgICB2YWxpZGF0aW9uRGVmaW5pdGlvbnM6IFtdXG4gICAgICB9O1xuXG4gICAgICBpZiAoZmllbGREZWZpbml0aW9uLmRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YSA9IGZpZWxkc1tmaWVsZE5hbWVdO1xuICAgICAgfVxuICAgICAgLy8gVFJZIExJTksgRVhJU1RTIE5BVElWRSBWQUxJREFUSU9OUywgVU5TVEFCTEUgISEhXG4gICAgICBpZiAoXG4gICAgICAgIEFycmF5LmlzQXJyYXkoZmllbGREZWZpbml0aW9uLmRhdGEpICYmXG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbi5kYXRhLmxlbmd0aCA+IDEgJiZcbiAgICAgICAgZmllbGREZWZpbml0aW9uLmRhdGEuZmlsdGVyKFxuICAgICAgICAgICh2YWxpZGF0aW9uRnVuY3Rpb24sIGluZGV4KSA9PlxuICAgICAgICAgICAgaW5kZXggPiAwICYmIHR5cGVvZiB2YWxpZGF0aW9uRnVuY3Rpb24gPT09ICdmdW5jdGlvbidcbiAgICAgICAgKS5sZW5ndGggPiAwXG4gICAgICApIHtcbiAgICAgICAgZmllbGREZWZpbml0aW9uLmRhdGFcbiAgICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICAgKHZhbGlkYXRpb25GdW5jdGlvbiwgaW5kZXgpID0+XG4gICAgICAgICAgICAgIGluZGV4ID4gMCAmJiB0eXBlb2YgdmFsaWRhdGlvbkZ1bmN0aW9uID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgKVxuICAgICAgICAgIC5mb3JFYWNoKHZhbGlkYXRpb25GdW5jdGlvbiA9PlxuICAgICAgICAgICAgZmllbGREZWZpbml0aW9uLnZhbGlkYXRpb25GdW5jdGlvbnMucHVzaCh2YWxpZGF0aW9uRnVuY3Rpb24pXG4gICAgICAgICAgKTtcbiAgICAgICAgZmllbGREZWZpbml0aW9uLmRhdGEgPSBmaWVsZERlZmluaXRpb24uZGF0YVswXTtcbiAgICAgIH1cblxuICAgICAgdmFsaWRhdGlvbkdyb3VwTWV0YWRhdGFzLmZvckVhY2godmFsaWRhdGlvbk1ldGFkYXRhID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHZhbGlkYXRpb25NZXRhZGF0YS5wcm9wZXJ0eU5hbWUgPT09IGZpZWxkTmFtZSAmJlxuICAgICAgICAgIHZhbGlkYXRpb25NZXRhZGF0YS50eXBlICE9PSBWYWxpZGF0aW9uS2V5cy5jb25kaXRpb25hbC50eXBlXG4gICAgICAgICkge1xuICAgICAgICAgIC8vIEFkZCBhbGwgdmFsaWRhdGlvbiB0byB0aGUgZmllbGQgZXhjZXB0IHRoZSBATmVzdGVkVmFsaWRhdGlvbiBkZWZpbml0aW9uIGFzXG4gICAgICAgICAgLy8gYmVpbmcgcGFydCBvZiB0aGUgZm9ybSB3b3VsZCBpbXBseSBpdCBpcyB2YWxpZGF0ZWQgaWYgYW55IG90aGVyIHJ1bGVzIGFyZSBwcmVzZW50XG4gICAgICAgICAgaWYgKHZhbGlkYXRpb25NZXRhZGF0YS50eXBlICE9PSBWYWxpZGF0aW9uS2V5cy5uZXN0ZWQudHlwZSkge1xuICAgICAgICAgICAgZmllbGREZWZpbml0aW9uLnZhbGlkYXRpb25EZWZpbml0aW9ucy5wdXNoKHZhbGlkYXRpb25NZXRhZGF0YSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yIChjb25zdCB0eXBlS2V5IGluIFZhbGlkYXRpb25UeXBlcykge1xuICAgICAgICAgICAgaWYgKFZhbGlkYXRpb25UeXBlcy5oYXNPd25Qcm9wZXJ0eSh0eXBlS2V5KSkge1xuICAgICAgICAgICAgICAvLyBIYW5kbGUgTmVzdGVkIFZhbGlkYXRpb25cbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGNoZWNrV2l0aEFsbE5lc3RlZFZhbGlkYXRpb25zKFxuICAgICAgICAgICAgICAgICAgYWxsTmVzdGVkVmFsaWRhdGlvbnMsXG4gICAgICAgICAgICAgICAgICBuZXN0ZWRHcm91cFZhbGlkYXRpb25zLFxuICAgICAgICAgICAgICAgICAgZmllbGROYW1lXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNOZXN0ZWRWYWxpZGF0ZSh2YWxpZGF0aW9uTWV0YWRhdGEsIHR5cGVLZXkpKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBvYmplY3RUb1ZhbGlkYXRlID1cbiAgICAgICAgICAgICAgICAgICAgZmllbGRzW2ZpZWxkTmFtZV0gaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgPyBmaWVsZHNbZmllbGROYW1lXS5vYmplY3RcbiAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG5lc3RlZFZhbGlkYXRlID0gY3JlYXRlTmVzdGVkVmFsaWRhdGUoXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdFRvVmFsaWRhdGUsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25NZXRhZGF0YVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHNldEZpZWxkRGF0YShmaWVsZE5hbWUsIGZpZWxkRGVmaW5pdGlvbiwgbmVzdGVkVmFsaWRhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIEhhbmRsZSBDdXN0b20gVmFsaWRhdGlvblxuICAgICAgICAgICAgICBpZiAoaXNDdXN0b21WYWxpZGF0ZSh2YWxpZGF0aW9uTWV0YWRhdGEsIHR5cGVLZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VzdG9tVmFsaWRhdGlvbiA9IGNyZWF0ZUN1c3RvbVZhbGlkYXRpb24oXG4gICAgICAgICAgICAgICAgICBmaWVsZE5hbWUsXG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uTWV0YWRhdGFcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHNldEZpZWxkRGF0YShmaWVsZE5hbWUsIGZpZWxkRGVmaW5pdGlvbiwgY3VzdG9tVmFsaWRhdGlvbik7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBIYW5kbGUgcmVtYWluaW5nIHZhbGlkYXRpb25cbiAgICAgICAgICAgICAgaWYgKGlzRHluYW1pY1ZhbGlkYXRlKHZhbGlkYXRpb25NZXRhZGF0YSwgdHlwZUtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkeW5hbWljVmFsaWRhdGUgPSBjcmVhdGVEeW5hbWljVmFsaWRhdGUoXG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uTWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgICBjb25kaXRpb25hbFZhbGlkYXRpb25zLFxuICAgICAgICAgICAgICAgICAgZmllbGROYW1lXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBzZXRGaWVsZERhdGEoZmllbGROYW1lLCBmaWVsZERlZmluaXRpb24sIGR5bmFtaWNWYWxpZGF0ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQ29udmVydCB0byBhIHN0cnVjdHVyZSwgYW5ndWxhciB1bmRlcnN0YW5kc1xuICAgICAgaWYgKFxuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXAgfHxcbiAgICAgICAgZmllbGREZWZpbml0aW9uLmRhdGEgaW5zdGFuY2VvZiBGb3JtQXJyYXlcbiAgICAgICkge1xuICAgICAgICBmb3JtR3JvdXBGaWVsZHNbZmllbGROYW1lXSA9IGZpZWxkRGVmaW5pdGlvbi5kYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybUdyb3VwRmllbGRzW2ZpZWxkTmFtZV0gPSBuZXcgRm9ybUNvbnRyb2xDbGFzcyhmaWVsZERlZmluaXRpb24pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIHJldHVybiBmb3JtR3JvdXBGaWVsZHM7XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIExvY2FsIEhlbHBlciBmdW5jdGlvbnMgdG8gaGVscCBtYWtlIHRoZSBtYWluIGNvZGUgbW9yZSByZWFkYWJsZVxuICAvL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5lc3RlZFZhbGlkYXRlKFxuICAgIG9iamVjdFRvVmFsaWRhdGU6IGFueSxcbiAgICB2YWxpZGF0aW9uTWV0YWRhdGE6IFZhbGlkYXRpb25NZXRhZGF0YVxuICApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oY29udHJvbDogRm9ybUNvbnRyb2wpIHtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPVxuICAgICAgICBnZXRWYWxpZGF0ZUVycm9ycyhcbiAgICAgICAgICBjb250cm9sLFxuICAgICAgICAgIG9iamVjdFRvVmFsaWRhdGUgIT09IHVuZGVmaW5lZCA/IG9iamVjdFRvVmFsaWRhdGUgOiBjb250cm9sLnZhbHVlLFxuICAgICAgICAgIHZhbGlkYXRvck9wdGlvbnMgYXMgVmFsaWRhdG9yT3B0aW9uc1xuICAgICAgICApLmxlbmd0aCA9PT0gMDtcbiAgICAgIHJldHVybiBnZXRJc1ZhbGlkUmVzdWx0KGlzVmFsaWQsIHZhbGlkYXRpb25NZXRhZGF0YSwgJ25lc3RlZFZhbGlkYXRlJyk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUR5bmFtaWNWYWxpZGF0ZShcbiAgICB2YWxpZGF0aW9uTWV0YWRhdGE6IFZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICBjb25kaXRpb25hbFZhbGlkYXRpb25zOiBWYWxpZGF0aW9uTWV0YWRhdGFbXSxcbiAgICBmaWVsZE5hbWU6IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oY29udHJvbDogRm9ybUNvbnRyb2wpIHtcbiAgICAgIGlmICghY29udHJvbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgbGV0IGlzVmFsaWQgPVxuICAgICAgICBjb250cm9sLnBhcmVudCAmJiBjb250cm9sLnBhcmVudC52YWx1ZVxuICAgICAgICAgID8gdmFsaWRhdG9yLnZhbGlkYXRlVmFsdWVCeU1ldGFkYXRhKGNvbnRyb2wudmFsdWUsIHZhbGlkYXRpb25NZXRhZGF0YSlcbiAgICAgICAgICA6IHRydWU7XG5cbiAgICAgIGlmICghaXNWYWxpZCAmJiBjb25kaXRpb25hbFZhbGlkYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGVFcnJvcnMgPSBzZXRPYmplY3RWYWx1ZUFuZEdldFZhbGlkYXRpb25FcnJvcnMoXG4gICAgICAgICAgY29udHJvbCxcbiAgICAgICAgICBmaWVsZE5hbWUsXG4gICAgICAgICAgdmFsaWRhdG9yT3B0aW9ucyBhcyBWYWxpZGF0b3JPcHRpb25zXG4gICAgICAgICk7XG4gICAgICAgIGlzVmFsaWQgPVxuICAgICAgICAgIHZhbGlkYXRlRXJyb3JzLmZpbHRlcihcbiAgICAgICAgICAgIChlcnJvcjogVmFsaWRhdGlvbkVycm9yKSA9PiBlcnJvci5wcm9wZXJ0eSA9PT0gZmllbGROYW1lXG4gICAgICAgICAgKS5sZW5ndGggPT09IDA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRJc1ZhbGlkUmVzdWx0KGlzVmFsaWQsIHZhbGlkYXRpb25NZXRhZGF0YSwgJ2R5bmFtaWNWYWxpZGF0ZScpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVDdXN0b21WYWxpZGF0aW9uKFxuICAgIGZpZWxkTmFtZTogc3RyaW5nLFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhXG4gICkge1xuICAgIHJldHVybiBmdW5jdGlvbihjb250cm9sOiBGb3JtQ29udHJvbCkge1xuICAgICAgY29uc3QgdmFsaWRhdGVFcnJvcnM6IFZhbGlkYXRpb25FcnJvcltdID0gc2V0T2JqZWN0VmFsdWVBbmRHZXRWYWxpZGF0aW9uRXJyb3JzKFxuICAgICAgICBjb250cm9sLFxuICAgICAgICBmaWVsZE5hbWUsXG4gICAgICAgIHZhbGlkYXRvck9wdGlvbnMgYXMgVmFsaWRhdG9yT3B0aW9uc1xuICAgICAgKTtcbiAgICAgIGNvbnN0IGlzVmFsaWQgPSBnZXRBbGxFcnJvcnModmFsaWRhdGVFcnJvcnMsIGZpZWxkTmFtZSkubGVuZ3RoID09PSAwO1xuICAgICAgcmV0dXJuIGdldElzVmFsaWRSZXN1bHQoaXNWYWxpZCwgdmFsaWRhdGlvbk1ldGFkYXRhLCAnY3VzdG9tVmFsaWRhdGlvbicpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja1dpdGhBbGxOZXN0ZWRWYWxpZGF0aW9ucyhcbiAgICBhbGxOZXN0ZWRWYWxpZGF0aW9uczogVmFsaWRhdGlvbk1ldGFkYXRhW10sXG4gICAgbmVzdGVkVmFsaWRhdGlvbnM6IFZhbGlkYXRpb25NZXRhZGF0YVtdLFxuICAgIGtleTogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiAoXG4gICAgICBhbGxOZXN0ZWRWYWxpZGF0aW9ucy5sZW5ndGggPT09IG5lc3RlZFZhbGlkYXRpb25zLmxlbmd0aCB8fFxuICAgICAgKChmaWVsZHNba2V5XSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXAgfHxcbiAgICAgICAgZmllbGRzW2tleV0gaW5zdGFuY2VvZiBGb3JtQXJyYXkpICYmXG4gICAgICAgIGFsbE5lc3RlZFZhbGlkYXRpb25zLmxlbmd0aCA+IDAgJiYgbmVzdGVkVmFsaWRhdGlvbnMubGVuZ3RoID09PSAwKVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0R5bmFtaWNWYWxpZGF0ZShcbiAgICB2YWxpZGF0aW9uTWV0YWRhdGE6IFZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICB0eXBlS2V5OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHZhbGlkYXRpb25NZXRhZGF0YS50eXBlID09PSBWYWxpZGF0aW9uVHlwZXNbdHlwZUtleV0gJiZcbiAgICAgIHZhbGlkYXRvclt2YWxpZGF0aW9uTWV0YWRhdGEudHlwZV0gIT09IHVuZGVmaW5lZFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogbWFya2VkIHdpdGggQFZhbGlkYXRlKC4uLilcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3R5cGVzdGFjay9jbGFzcy12YWxpZGF0b3IjY3VzdG9tLXZhbGlkYXRpb24tY2xhc3Nlc1xuICAgKi9cbiAgZnVuY3Rpb24gaXNDdXN0b21WYWxpZGF0ZShcbiAgICB2YWxpZGF0aW9uTWV0YWRhdGE6IFZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICB0eXBlS2V5OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGlzTm90UHJvcGVydHlWYWxpZGF0aW9uKHZhbGlkYXRpb25NZXRhZGF0YSwgdHlwZUtleSkgJiZcbiAgICAgIHZhbGlkYXRpb25NZXRhZGF0YS50eXBlID09PSBWYWxpZGF0aW9uS2V5cy5jdXN0b20udHlwZSAmJlxuICAgICAgdHlwZUtleSA9PT0gVmFsaWRhdGlvbktleXMuY3VzdG9tLnR5cGVLZXlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIG1hcmtlZCB3aXRoIEBWYWxpZGF0ZU5lc3RlZCgpXG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS90eXBlc3RhY2svY2xhc3MtdmFsaWRhdG9yI3ZhbGlkYXRpbmctbmVzdGVkLW9iamVjdHNcbiAgICovXG4gIGZ1bmN0aW9uIGlzTmVzdGVkVmFsaWRhdGUoXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGEsXG4gICAgdHlwZUtleTogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiAoXG4gICAgICBpc05vdFByb3BlcnR5VmFsaWRhdGlvbih2YWxpZGF0aW9uTWV0YWRhdGEsIHR5cGVLZXkpICYmXG4gICAgICB2YWxpZGF0aW9uTWV0YWRhdGEudHlwZSA9PT0gVmFsaWRhdGlvbktleXMubmVzdGVkLnR5cGUgJiZcbiAgICAgIHR5cGVLZXkgPT09IFZhbGlkYXRpb25LZXlzLm5lc3RlZC50eXBlS2V5XG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm90UHJvcGVydHlWYWxpZGF0aW9uKFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgIHR5cGVLZXk6IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gKFxuICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgPT09IFZhbGlkYXRpb25UeXBlc1t0eXBlS2V5XSAmJlxuICAgICAgdmFsaWRhdG9yW3ZhbGlkYXRpb25NZXRhZGF0YS50eXBlXSA9PT0gdW5kZWZpbmVkXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEZpZWxkRGF0YShcbiAgICBmaWVsZE5hbWU6IHN0cmluZyxcbiAgICBmaWVsZERlZmluaXRpb246IER5bmFtaWNGb3JtR3JvdXBGaWVsZCxcbiAgICB2YWxpZGF0aW9uRnVuY3Rpb246IEZ1bmN0aW9uXG4gICkge1xuICAgIC8qIHRvZG86IG1heWJlIG5vdCBuZWVkLCBpZiBlbmFibGUgdGhpcyBjb2RlLCBleHBlcmVtZW50YWwgbW9kZSBub3Qgd29ya1xuICAgIGlmIChmaWVsZHNbZmllbGROYW1lXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgIGZpZWxkc1tmaWVsZE5hbWVdLm9iamVjdCA9IGZpZWxkc1tmaWVsZE5hbWVdLmZpZWxkcztcbiAgICB9Ki9cblxuICAgIC8vIEZpbGwgZmllbGQgZGF0YSBpZiBlbXB0eVxuICAgIGlmIChmaWVsZERlZmluaXRpb24uZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmaWVsZERlZmluaXRpb24uZGF0YSA9IGZpZWxkc1tmaWVsZE5hbWVdO1xuICAgIH1cblxuICAgIGZpZWxkRGVmaW5pdGlvbi52YWxpZGF0aW9uRnVuY3Rpb25zLnB1c2godmFsaWRhdGlvbkZ1bmN0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFsbEVycm9ycyhcbiAgICB2YWxpZGF0ZUVycm9yczogVmFsaWRhdGlvbkVycm9yW10sXG4gICAgZmllbGROYW1lOiBzdHJpbmdcbiAgKTogVmFsaWRhdGlvbkVycm9yW10ge1xuICAgIHJldHVybiB2YWxpZGF0ZUVycm9ycy5maWx0ZXIoXG4gICAgICAoZXJyb3I6IFZhbGlkYXRpb25FcnJvcikgPT5cbiAgICAgICAgLy8gQ2hlY2sgZm9yIG5lc3RlZC9jaGlsZCBlcnJvcnNcbiAgICAgICAgKGVycm9yLmNoaWxkcmVuLmxlbmd0aCAmJlxuICAgICAgICAgIGVycm9yLmNoaWxkcmVuLmZpbHRlcihjaGlsZHJlbiA9PiBjaGlsZHJlbi5wcm9wZXJ0eSA9PT0gZmllbGROYW1lKSkgfHxcbiAgICAgICAgZXJyb3IucHJvcGVydHkgPT09IGZpZWxkTmFtZVxuICAgICk7XG4gIH1cbn1cblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyBHbG9iYWwgSGVscGVyIGZ1bmN0aW9uc1xuLy9cblxuZnVuY3Rpb24gaXNQcm9wZXJ0eVZhbGlkYXRvck9mVHlwZShcbiAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGEsXG4gIGZpZWxkTmFtZTogc3RyaW5nLFxuICB2YWxpZGF0aW9uTWV0YWRhdGFUeXBlOiBzdHJpbmdcbikge1xuICByZXR1cm4gKFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YS5wcm9wZXJ0eU5hbWUgPT09IGZpZWxkTmFtZSAmJlxuICAgIHZhbGlkYXRpb25NZXRhZGF0YS50eXBlID09PSB2YWxpZGF0aW9uTWV0YWRhdGFUeXBlXG4gICk7XG59XG5cbmZ1bmN0aW9uIHNldE9iamVjdFZhbHVlQW5kR2V0VmFsaWRhdGlvbkVycm9ycyhcbiAgY29udHJvbDogRm9ybUNvbnRyb2wsXG4gIGtleTogc3RyaW5nLFxuICB2YWxpZGF0b3JPcHRpb25zOiBWYWxpZGF0b3JPcHRpb25zXG4pIHtcbiAgY29uc3Qgb2JqZWN0ID1cbiAgICBjb250cm9sLnBhcmVudCBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXBcbiAgICAgID8gKGNvbnRyb2wucGFyZW50IGFzIER5bmFtaWNGb3JtR3JvdXA8YW55Pikub2JqZWN0XG4gICAgICA6IGNvbnRyb2wucGFyZW50XG4gICAgICA/IGNvbnRyb2wucGFyZW50LnZhbHVlXG4gICAgICA6IHt9O1xuXG4gIGlmIChvYmplY3QpIHtcbiAgICBvYmplY3Rba2V5XSA9IGNvbnRyb2wudmFsdWU7XG4gIH1cblxuICByZXR1cm4gZ2V0VmFsaWRhdGVFcnJvcnMoY29udHJvbCwgb2JqZWN0LCB2YWxpZGF0b3JPcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gZ2V0VmFsaWRhdGVFcnJvcnMoXG4gIGNvbnRyb2w6IEZvcm1Db250cm9sLFxuICBkYXRhVG9WYWxpZGF0ZTogYW55LFxuICB2YWxpZGF0b3JPcHRpb25zOiBWYWxpZGF0b3JPcHRpb25zXG4pIHtcbiAgY29uc3QgdmFsaWRhdGVFcnJvcnM6IFZhbGlkYXRpb25FcnJvcltdID1cbiAgICBjb250cm9sLnBhcmVudCAmJiBjb250cm9sLnBhcmVudC52YWx1ZVxuICAgICAgPyB2YWxpZGF0ZVN5bmMoZGF0YVRvVmFsaWRhdGUsIHZhbGlkYXRvck9wdGlvbnMpXG4gICAgICA6IFtdO1xuICByZXR1cm4gdmFsaWRhdGVFcnJvcnM7XG59XG5cbmZ1bmN0aW9uIGdldElzVmFsaWRSZXN1bHQoXG4gIGlzVmFsaWQ6IGJvb2xlYW4sXG4gIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhLFxuICBlcnJvclR5cGU6IEVycm9yUHJvcGVydHlOYW1lXG4pIHtcbiAgcmV0dXJuIGlzVmFsaWRcbiAgICA/IG51bGxcbiAgICA6IHtcbiAgICAgICAgW2Vycm9yVHlwZV06IHtcbiAgICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICAgICAgdHlwZTogdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGVcbiAgICAgICAgfVxuICAgICAgfTtcbn1cblxudHlwZSBFcnJvclByb3BlcnR5TmFtZSA9XG4gIHwgJ25lc3RlZFZhbGlkYXRlJ1xuICB8ICdjdXN0b21WYWxpZGF0aW9uJ1xuICB8ICdkeW5hbWljVmFsaWRhdGUnO1xuXG5jb25zdCBWYWxpZGF0aW9uS2V5cyA9IHtcbiAgbmVzdGVkOiB7XG4gICAgdHlwZTogJ25lc3RlZFZhbGlkYXRpb24nLFxuICAgIHR5cGVLZXk6ICdORVNURURfVkFMSURBVElPTidcbiAgfSxcbiAgY29uZGl0aW9uYWw6IHtcbiAgICB0eXBlOiAnY29uZGl0aW9uYWxWYWxpZGF0aW9uJ1xuICB9LFxuICBjdXN0b206IHtcbiAgICB0eXBlOiAnY3VzdG9tVmFsaWRhdGlvbicsXG4gICAgdHlwZUtleTogJ0NVU1RPTV9WQUxJREFUSU9OJ1xuICB9XG59O1xuIl19
