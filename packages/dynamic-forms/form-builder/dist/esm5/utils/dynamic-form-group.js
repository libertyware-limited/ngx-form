import * as tslib_1 from "tslib";
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { classToClass, plainToClass } from 'class-transformer';
import { getFromContainer, MetadataStorage, validate, validateSync, ValidationTypes, Validator } from 'class-validator';
import 'reflect-metadata';
import { BehaviorSubject, Subject } from 'rxjs';
import { foreverInvalid, FOREVER_INVALID_NAME } from '../validators/forever-invalid.validator';
import { DynamicFormControl } from './dynamic-form-control';
import { getFormFieldsOptions } from '@libertyware/ngx-form-core';
import cloneDeep from 'lodash.clonedeep';
import mergeWith from 'lodash.mergewith';
var DynamicFormGroup = /** @class */ (function (_super) {
    tslib_1.__extends(DynamicFormGroup, _super);
    function DynamicFormGroup(factoryModel, fields, validatorOrOpts, asyncValidator) {
        var _this = _super.call(this, {}, validatorOrOpts, asyncValidator) || this;
        _this.factoryModel = factoryModel;
        _this.fields = fields;
        _this.nativeValidateErrors = new BehaviorSubject({});
        _this.customValidateErrors = new BehaviorSubject({});
        _this.formErrors = null;
        _this.objectChange = new Subject();
        _this.FormControlClass = DynamicFormControl;
        _this._object = null;
        _this._externalErrors = null;
        _this._validatorOptions = null;
        _this._fb = new FormBuilder();
        /*
        const classValidators = DynamicFormGroup.getClassValidators<TModel>(
          this.factoryModel,
          this.fields,
          this.defaultValidatorOptions
        );
        const formGroup = this._fb.group(
          classValidators
        );
        Object.keys(formGroup.controls).forEach(key => {
          this.addControl(key, formGroup.controls[key]);
        });
        this.valueChanges.subscribe(data => {
          this.validate(
            undefined,
            this.defaultValidatorOptions
          );
        });*/
        _this.formFields = _this.onlyFields(fields);
        _this._formGen = getFormFieldsOptions(factoryModel);
        return _this;
    }
    DynamicFormGroup.prototype.getFormGenData = function () {
        return this._formGen;
    };
    Object.defineProperty(DynamicFormGroup.prototype, "externalErrors", {
        get: function () {
            return this._externalErrors;
        },
        // Getters & Setters
        set: function (externalErrors) {
            this._externalErrors = externalErrors;
            this.validate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormGroup.prototype, "validatorOptions", {
        get: function () {
            return this._validatorOptions;
        },
        set: function (validatorOptions) {
            this._validatorOptions = validatorOptions;
            this.validate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormGroup.prototype, "object", {
        get: function () {
            return this.getObject();
        },
        set: function (object) {
            this.setObject(object);
        },
        enumerable: true,
        configurable: true
    });
    // Public API
    DynamicFormGroup.prototype.validate = function (externalErrors, validatorOptions) {
        this.validateAsync(externalErrors, validatorOptions).then(function () { }, function (error) {
            throw error;
        });
    };
    DynamicFormGroup.prototype.validateAsync = function (externalErrors, validatorOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, validationErrors, allErrors, usedForeverInvalid, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (externalErrors === undefined) {
                            externalErrors = cloneDeep(this._externalErrors);
                        }
                        if (validatorOptions === undefined) {
                            validatorOptions = cloneDeep(this._validatorOptions);
                        }
                        if (!externalErrors) {
                            externalErrors = {};
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, validate(this.object, validatorOptions)];
                    case 2:
                        result = _a.sent();
                        validationErrors = this.transformValidationErrors(result);
                        allErrors = this.mergeErrors(externalErrors, validationErrors);
                        this.markAsInvalidForExternalErrors(externalErrors);
                        this.setCustomErrors(allErrors);
                        usedForeverInvalid = false;
                        if (Object.keys(allErrors).filter(function (key) { return key !== FOREVER_INVALID_NAME; })
                            .length === 0 &&
                            this.get(FOREVER_INVALID_NAME)) {
                            this.removeControl(FOREVER_INVALID_NAME);
                            usedForeverInvalid = true;
                        }
                        if (this.valid &&
                            Object.keys(allErrors).length > 0 &&
                            !this.get(FOREVER_INVALID_NAME)) {
                            this.addControl(FOREVER_INVALID_NAME, new FormControl('', [foreverInvalid]));
                            usedForeverInvalid = true;
                        }
                        if (usedForeverInvalid) {
                            this.updateValueAndValidity({
                                onlySelf: true,
                                emitEvent: false
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DynamicFormGroup.prototype.setCustomErrors = function (allErrors) {
        this.formErrors = allErrors;
        this.customValidateErrors.next(this.formErrors);
        this.nativeValidateErrors.next(this.collectErrors(this));
    };
    DynamicFormGroup.prototype.collectErrors = function (control, isRoot) {
        var _this = this;
        if (isRoot === void 0) { isRoot = true; }
        if (control.controls) {
            return tslib_1.__assign({}, (isRoot ? this.errors : {}), Object.entries(control.controls).reduce(function (acc, _a) {
                var _b;
                var _c = tslib_1.__read(_a, 2), key = _c[0], childControl = _c[1];
                var childErrors = _this.collectErrors(childControl, false);
                if (childErrors &&
                    key !== 'foreverInvalid' &&
                    Object.keys(childErrors).length > 0) {
                    acc = tslib_1.__assign({}, acc, (_b = {}, _b[key] = tslib_1.__assign({}, (acc && acc[key] ? acc[key] : {}), childErrors), _b));
                }
                return acc;
            }, {}));
        }
        else {
            return control.errors;
        }
    };
    DynamicFormGroup.prototype.validateAllFormFields = function () {
        var _this = this;
        Object.keys(this.controls).forEach(function (field) {
            var control = _this.get(field);
            // Control
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            }
            // Group: recursive
            else if (control instanceof DynamicFormGroup) {
                control.validateAllFormFields();
            }
            // Array
            else if (control instanceof FormArray) {
                for (var i = 0; i < control.controls.length; i++) {
                    // Control in Array
                    if (control.controls[i] instanceof FormControl) {
                        control.controls[i].markAsTouched({
                            onlySelf: true
                        });
                    }
                    // Group in Array: recursive
                    else if (control.controls[i] instanceof DynamicFormGroup) {
                        control.controls[i].validateAllFormFields();
                    }
                }
            }
        });
    };
    DynamicFormGroup.prototype.resetValidateAllFormFields = function () {
        var _this = this;
        this.markAsInvalidForExternalErrors({});
        Object.keys(this.controls).forEach(function (field) {
            var control = _this.get(field);
            // Control
            if (control instanceof FormControl) {
                control.setErrors(null, { emitEvent: false });
                control.markAsUntouched({ onlySelf: true });
                control.markAsPristine({ onlySelf: true });
            }
            // Group: recursive
            else if (control instanceof DynamicFormGroup) {
                control.resetValidateAllFormFields();
            }
            // Array
            else if (control instanceof FormArray) {
                for (var i = 0; i < control.controls.length; i++) {
                    // Control in Array
                    if (control.controls[i] instanceof FormControl) {
                        control.controls[i].setErrors(null, { emitEvent: false });
                        control.controls[i].markAsUntouched({ onlySelf: true });
                        control.controls[i].markAsPristine({
                            onlySelf: true
                        });
                    }
                    // Group in Array: recursive
                    else if (control.controls[i] instanceof DynamicFormGroup) {
                        control.controls[i].resetValidateAllFormFields();
                    }
                }
            }
        });
        this.setCustomErrors({});
    };
    DynamicFormGroup.prototype.classToClass = function (object) {
        return classToClass(object, { ignoreDecorators: true });
    };
    DynamicFormGroup.prototype.plainToClass = function (cls, plain) {
        return plainToClass(cls, plain, { ignoreDecorators: true });
    };
    DynamicFormGroup.prototype.setExternalErrorsAsync = function (externalErrors) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._externalErrors = externalErrors;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.validateAsync()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_2 = _a.sent();
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DynamicFormGroup.prototype.setExternalErrors = function (externalErrors) {
        this.setExternalErrorsAsync(externalErrors).then(function () { }, function (error) {
            throw error;
        });
    };
    DynamicFormGroup.prototype.getExternalErrors = function () {
        return this._externalErrors;
    };
    DynamicFormGroup.prototype.clearExternalErrors = function () {
        this.setExternalErrors({});
    };
    DynamicFormGroup.prototype.clearExternalErrorsAsync = function () {
        return this.setExternalErrorsAsync({});
    };
    DynamicFormGroup.prototype.setValidatorOptionsAsync = function (validatorOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._validatorOptions = validatorOptions;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.validateAsync()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_3 = _a.sent();
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DynamicFormGroup.prototype.setValidatorOptions = function (validatorOptions) {
        this.setValidatorOptionsAsync(validatorOptions).then(function () { }, function (error) {
            throw error;
        });
    };
    DynamicFormGroup.prototype.getValidatorOptions = function () {
        return this._validatorOptions;
    };
    // Helpers
    DynamicFormGroup.prototype.onlyFields = function (fields) {
        var _this = this;
        var newFields = {};
        if (fields !== undefined) {
            Object.keys(fields).forEach(function (key) {
                if (fields[key] instanceof DynamicFormGroup) {
                    // Group: recursive
                    newFields[key] = _this.onlyFields(fields[key].formFields);
                }
                else {
                    // Array
                    if (fields[key] instanceof FormArray) {
                        if (fields[key].controls[0] instanceof DynamicFormGroup) {
                            // Group within Array: recursive
                            newFields[key] = _this.onlyFields(fields[key].controls[0].formFields);
                        }
                        else {
                            // Control within Array
                            newFields[key] = fields[key].controls[0].value;
                        }
                    }
                    else {
                        // Handle Control
                        newFields[key] = fields[key];
                    }
                }
            });
        }
        return newFields;
    };
    DynamicFormGroup.prototype.transformValidationErrors = function (errors) {
        var _this = this;
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
                customErrors[error.property] = _this.transformValidationErrors(error.children);
            }
        });
        return customErrors;
    };
    DynamicFormGroup.prototype.mergeErrors = function (externalErrors, validationErrors) {
        var clonedExternalErrors = cloneDeep(externalErrors);
        return mergeWith(clonedExternalErrors, validationErrors, function (objValue, srcValue) {
            if (canMerge()) {
                return objValue.concat(srcValue);
            }
            function canMerge() {
                return (Array.isArray(objValue) &&
                    Array.isArray(srcValue) &&
                    objValue.filter(function (objItem) { return srcValue.indexOf(objItem) !== -1; })
                        .length === 0);
            }
        });
    };
    DynamicFormGroup.prototype.markAsInvalidForExternalErrors = function (errors, controls) {
        if (!controls) {
            controls = this.controls;
        }
        Object.keys(controls).forEach(function (field) {
            var control = controls[field];
            // Control
            if (control instanceof FormControl) {
                if (errors && errors[field]) {
                    control.setErrors({ externalError: true });
                }
                else {
                    if (control.errors && control.errors.externalError === true) {
                        control.setErrors(null);
                    }
                }
            }
            // Group
            else if (control instanceof DynamicFormGroup) {
                control.markAsInvalidForExternalErrors(errors && errors[field]
                    ? errors[field]
                    : {});
            }
            // Array
            else if (control instanceof FormArray) {
                for (var i = 0; i < control.length; i++) {
                    // Control in Array
                    if (control[i] instanceof FormControl) {
                        if (errors && errors[i] && errors[i][field]) {
                            control[i].setErrors({ externalError: true });
                        }
                        else if (control[i].errors &&
                            control[i].errors.externalError === true) {
                            control[i].setErrors(null);
                        }
                    }
                    // Group in Array
                    else if (control[i] instanceof DynamicFormGroup) {
                        control[i].markAsInvalidForExternalErrors(errors && errors[i] && errors[i][field]
                            ? errors[i][field]
                            : {});
                    }
                }
            }
        });
    };
    /**
     * Recursively gets all values from the form controls and all sub form group and array controls and returns it as
     * an object
     */
    DynamicFormGroup.prototype.getObject = function () {
        var _this = this;
        // Initialize the shape of the response
        var object = this._object
            ? this.classToClass(this._object)
            : this.factoryModel
                ? new this.factoryModel()
                : undefined;
        if (object !== undefined) {
            // Recursively get the value of all fields
            Object.keys(this.controls)
                .filter(function (name) { return name !== FOREVER_INVALID_NAME; })
                .forEach(function (key) {
                // Handle Group
                if (_this.controls[key] instanceof DynamicFormGroup) {
                    object[key] = _this.controls[key].object;
                }
                // Handle Form Array
                else if (_this.controls[key] instanceof FormArray) {
                    // Initialize value
                    object[key] = [];
                    for (var i = 0; i < _this.controls[key].controls.length; i++) {
                        var value = void 0;
                        if (_this.controls[key].controls[i] instanceof
                            DynamicFormGroup) {
                            // Recursively get object group
                            value = _this.controls[key].controls[i].object;
                        }
                        else {
                            value = _this.controls[key].controls[i].value;
                        }
                        if (value && Object.keys(value).length > 0) {
                            object[key].push(value);
                        }
                    }
                }
                // Handle Control
                else {
                    object[key] = _this.controls[key].value;
                }
            });
        }
        return (this.factoryModel
            ? this.plainToClass(this.factoryModel, object)
            : object);
    };
    /**
     * Sets the value of every control on the form and recursively sets the values of the controls
     * on all sub form groups
     *
     * @param object the data to assign to all controls of the form group and sub groups
     */
    DynamicFormGroup.prototype.setObject = function (object) {
        var _this = this;
        if (object instanceof this.factoryModel) {
            this._object = this.classToClass(object); // Ensure correct type
        }
        else {
            this._object = this.plainToClass(this.factoryModel, object); // Convert to Model type
        }
        // Recursively set the value of all fields
        Object.keys(this.controls).forEach(function (key) {
            // Handle Group
            if (_this.controls[key] instanceof DynamicFormGroup) {
                _this.controls[key].object = _this._object
                    ? _this._object[key]
                    : {};
            }
            // Handle FormArray
            else if (_this.controls[key] instanceof FormArray) {
                var objectArray = _this._object ? _this._object[key] : [];
                var formArray = _this.controls[key];
                var isFormGroup = formArray.controls[0] instanceof DynamicFormGroup;
                var firstFormGroup = formArray.controls[0];
                var formControl = formArray.controls[0];
                // Clear FormArray while retaining the reference
                while (formArray.length !== 0) {
                    formArray.removeAt(0);
                }
                var _loop_1 = function (i) {
                    if (isFormGroup) {
                        // Create FormGroup
                        var dynamicFormGroup_1 = new DynamicFormGroup(firstFormGroup.factoryModel, firstFormGroup.formFields);
                        dynamicFormGroup_1.setParent(_this);
                        var classValidators = getClassValidators(firstFormGroup.factoryModel, firstFormGroup.formFields, undefined, _this.FormControlClass);
                        var formGroup_1 = _this._fb.group(classValidators);
                        // Add all controls to the form group
                        Object.keys(formGroup_1.controls).forEach(function (ctrlKey) {
                            dynamicFormGroup_1.addControl(ctrlKey, formGroup_1.controls[ctrlKey]);
                        });
                        // Add a value change listener to the group. on change, validate
                        dynamicFormGroup_1.valueChanges.subscribe(function (data) {
                            dynamicFormGroup_1.validate(undefined, _this._validatorOptions);
                        });
                        formArray.controls.push(dynamicFormGroup_1);
                        // Recusrively set the object value
                        formArray.controls[i].object =
                            _this._object && objectArray && objectArray[i]
                                ? objectArray[i]
                                : {};
                    }
                    else {
                        // Create control
                        var controlValue = _this._object && objectArray && objectArray[i]
                            ? objectArray[i]
                            : undefined;
                        var newFormControl = new FormControl(controlValue, formControl.validator);
                        newFormControl.setParent(_this);
                        // Add the control to the FormArray
                        formArray.controls.push(newFormControl);
                    }
                };
                for (var i = 0; i < objectArray.length; i++) {
                    _loop_1(i);
                }
            }
            // Handle Control
            else {
                var newObject = _this._object ? _this._object[key] : [];
                _this.controls[key].setValue(_this._object && newObject ? newObject : undefined);
            }
        });
        this.objectChange.next(this._object);
    };
    return DynamicFormGroup;
}(FormGroup));
export { DynamicFormGroup };
export function getClassValidators(factoryModel, fields, validatorOptions, FormControlClass) {
    if (FormControlClass === void 0) { FormControlClass = DynamicFormControl; }
    // Get the validation rules from the object decorators
    var allValidationMetadatas = getFromContainer(MetadataStorage).getTargetValidationMetadatas(factoryModel, '');
    // Get the validation rules for the validation group: https://github.com/typestack/class-validator#validation-groups
    var validationGroupMetadatas = getFromContainer(MetadataStorage).getTargetValidationMetadatas(factoryModel, '', validatorOptions && validatorOptions.groups
        ? validatorOptions.groups
        : undefined);
    var formGroupFields = {};
    var validator = new Validator();
    // Loop through all fields in the form definition
    Object.keys(fields)
        .filter(function (key) { return key.indexOf('__') !== 0; })
        .forEach(function (fieldName) {
        // Conditional Validation for the field
        var conditionalValidations = [];
        validationGroupMetadatas.forEach(function (validationMetadata) {
            if (isPropertyValidatorOfType(validationMetadata, fieldName, ValidationKeys.conditional.type)) {
                conditionalValidations.push(validationMetadata);
            }
        });
        // All Nested Validation for the field
        var allNestedValidations = [];
        allValidationMetadatas.forEach(function (validationMetadata) {
            if (isPropertyValidatorOfType(validationMetadata, fieldName, ValidationKeys.nested.type)) {
                allNestedValidations.push(validationMetadata);
            }
        });
        // Nested Validation for the field for the requested class-validator group
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
        // TRY LINK EXISTS NATIVE VALIDATIONS, UNSTABLE !!!
        if (Array.isArray(fieldDefinition.data) &&
            fieldDefinition.data.length > 1 &&
            fieldDefinition.data.filter(function (validationFunction, index) {
                return index > 0 && typeof validationFunction === 'function';
            }).length > 0) {
            fieldDefinition.data
                .filter(function (validationFunction, index) {
                return index > 0 && typeof validationFunction === 'function';
            })
                .forEach(function (validationFunction) {
                return fieldDefinition.validationFunctions.push(validationFunction);
            });
            fieldDefinition.data = fieldDefinition.data[0];
        }
        validationGroupMetadatas.forEach(function (validationMetadata) {
            if (validationMetadata.propertyName === fieldName &&
                validationMetadata.type !== ValidationKeys.conditional.type) {
                // Add all validation to the field except the @NestedValidation definition as
                // being part of the form would imply it is validated if any other rules are present
                if (validationMetadata.type !== ValidationKeys.nested.type) {
                    fieldDefinition.validationDefinitions.push(validationMetadata);
                }
                for (var typeKey in ValidationTypes) {
                    if (ValidationTypes.hasOwnProperty(typeKey)) {
                        // Handle Nested Validation
                        if (checkWithAllNestedValidations(allNestedValidations, nestedGroupValidations, fieldName)) {
                            if (isNestedValidate(validationMetadata, typeKey)) {
                                var objectToValidate = fields[fieldName] instanceof DynamicFormGroup
                                    ? fields[fieldName].object
                                    : undefined;
                                var nestedValidate = createNestedValidate(objectToValidate, validationMetadata);
                                setFieldData(fieldName, fieldDefinition, nestedValidate);
                            }
                        }
                        // Handle Custom Validation
                        if (isCustomValidate(validationMetadata, typeKey)) {
                            var customValidation = createCustomValidation(fieldName, validationMetadata);
                            setFieldData(fieldName, fieldDefinition, customValidation);
                        }
                        // Handle remaining validation
                        if (isDynamicValidate(validationMetadata, typeKey)) {
                            var dynamicValidate = createDynamicValidate(validationMetadata, conditionalValidations, fieldName);
                            setFieldData(fieldName, fieldDefinition, dynamicValidate);
                        }
                    }
                }
            }
        });
        // Convert to a structure, angular understands
        if (fieldDefinition.data instanceof DynamicFormGroup ||
            fieldDefinition.data instanceof FormArray) {
            formGroupFields[fieldName] = fieldDefinition.data;
        }
        else {
            formGroupFields[fieldName] = new FormControlClass(fieldDefinition);
        }
    });
    return formGroupFields;
    // ******************************************************************************************
    // Local Helper functions to help make the main code more readable
    //
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
            var isValid = control.parent && control.parent.value
                ? validator.validateValueByMetadata(control.value, validationMetadata)
                : true;
            if (!isValid && conditionalValidations.length > 0) {
                var validateErrors = setObjectValueAndGetValidationErrors(control, fieldName, validatorOptions);
                isValid =
                    validateErrors.filter(function (error) { return error.property === fieldName; }).length === 0;
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
        return (allNestedValidations.length === nestedValidations.length ||
            ((fields[key] instanceof DynamicFormGroup ||
                fields[key] instanceof FormArray) &&
                allNestedValidations.length > 0 && nestedValidations.length === 0));
    }
    function isDynamicValidate(validationMetadata, typeKey) {
        return (validationMetadata.type === ValidationTypes[typeKey] &&
            validator[validationMetadata.type] !== undefined);
    }
    /**
     * marked with @Validate(...)
     * https://github.com/typestack/class-validator#custom-validation-classes
     */
    function isCustomValidate(validationMetadata, typeKey) {
        return (isNotPropertyValidation(validationMetadata, typeKey) &&
            validationMetadata.type === ValidationKeys.custom.type &&
            typeKey === ValidationKeys.custom.typeKey);
    }
    /**
     * marked with @ValidateNested()
     * https://github.com/typestack/class-validator#validating-nested-objects
     */
    function isNestedValidate(validationMetadata, typeKey) {
        return (isNotPropertyValidation(validationMetadata, typeKey) &&
            validationMetadata.type === ValidationKeys.nested.type &&
            typeKey === ValidationKeys.nested.typeKey);
    }
    function isNotPropertyValidation(validationMetadata, typeKey) {
        return (validationMetadata.type === ValidationTypes[typeKey] &&
            validator[validationMetadata.type] === undefined);
    }
    function setFieldData(fieldName, fieldDefinition, validationFunction) {
        /* todo: maybe not need, if enable this code, experemental mode not work
        if (fields[fieldName] instanceof DynamicFormGroup) {
          fields[fieldName].object = fields[fieldName].fields;
        }*/
        // Fill field data if empty
        if (fieldDefinition.data === undefined) {
            fieldDefinition.data = fields[fieldName];
        }
        fieldDefinition.validationFunctions.push(validationFunction);
    }
    function getAllErrors(validateErrors, fieldName) {
        return validateErrors.filter(function (error) {
            // Check for nested/child errors
            return (error.children.length &&
                error.children.filter(function (children) { return children.property === fieldName; })) ||
                error.property === fieldName;
        });
    }
}
// ***************************************************************
// Global Helper functions
//
function isPropertyValidatorOfType(validationMetadata, fieldName, validationMetadataType) {
    return (validationMetadata.propertyName === fieldName &&
        validationMetadata.type === validationMetadataType);
}
function setObjectValueAndGetValidationErrors(control, key, validatorOptions) {
    var object = control.parent instanceof DynamicFormGroup
        ? control.parent.object
        : control.parent
            ? control.parent.value
            : {};
    if (object) {
        object[key] = control.value;
    }
    return getValidateErrors(control, object, validatorOptions);
}
function getValidateErrors(control, dataToValidate, validatorOptions) {
    var validateErrors = control.parent && control.parent.value
        ? validateSync(dataToValidate, validatorOptions)
        : [];
    return validateErrors;
}
function getIsValidResult(isValid, validationMetadata, errorType) {
    var _a;
    return isValid
        ? null
        : (_a = {},
            _a[errorType] = {
                valid: false,
                type: validationMetadata.type
            },
            _a);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWdyb3VwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLWJ1aWxkZXIvIiwic291cmNlcyI6WyJ1dGlscy9keW5hbWljLWZvcm0tZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFJTCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFdBQVcsRUFDWCxTQUFTLEVBRVYsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRS9ELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLFFBQVEsRUFDUixZQUFZLEVBRVosZUFBZSxFQUNmLFNBQVMsRUFFVixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFNaEQsT0FBTyxFQUNMLGNBQWMsRUFDZCxvQkFBb0IsRUFDckIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM1RCxPQUFPLEVBQWlCLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFakYsT0FBTyxTQUFTLE1BQU0sa0JBQWtCLENBQUM7QUFDekMsT0FBTyxTQUFTLE1BQU0sa0JBQWtCLENBQUM7QUFPekM7SUFBOEMsNENBQVM7SUFjckQsMEJBQ1MsWUFBK0IsRUFDL0IsTUFBeUIsRUFDaEMsZUFJUSxFQUNSLGNBQTZEO1FBUi9ELFlBVUUsa0JBQU0sRUFBRSxFQUFFLGVBQWUsRUFBRSxjQUFjLENBQUMsU0FxQjNDO1FBOUJRLGtCQUFZLEdBQVosWUFBWSxDQUFtQjtRQUMvQixZQUFNLEdBQU4sTUFBTSxDQUFtQjtRQWYzQiwwQkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBYSxFQUFFLENBQUMsQ0FBQztRQUMz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c0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWJzdHJhY3RDb250cm9sLFxuICBBYnN0cmFjdENvbnRyb2xPcHRpb25zLFxuICBBc3luY1ZhbGlkYXRvckZuLFxuICBGb3JtQXJyYXksXG4gIEZvcm1CdWlsZGVyLFxuICBGb3JtQ29udHJvbCxcbiAgRm9ybUdyb3VwLFxuICBWYWxpZGF0b3JGblxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBjbGFzc1RvQ2xhc3MsIHBsYWluVG9DbGFzcyB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IENsYXNzVHlwZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyL0NsYXNzVHJhbnNmb3JtZXInO1xuaW1wb3J0IHtcbiAgZ2V0RnJvbUNvbnRhaW5lcixcbiAgTWV0YWRhdGFTdG9yYWdlLFxuICB2YWxpZGF0ZSxcbiAgdmFsaWRhdGVTeW5jLFxuICBWYWxpZGF0aW9uRXJyb3IsXG4gIFZhbGlkYXRpb25UeXBlcyxcbiAgVmFsaWRhdG9yLFxuICBWYWxpZGF0b3JPcHRpb25zXG59IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5pbXBvcnQgeyBWYWxpZGF0aW9uTWV0YWRhdGEgfSBmcm9tICdjbGFzcy12YWxpZGF0b3IvbWV0YWRhdGEvVmFsaWRhdGlvbk1ldGFkYXRhJztcbmltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIERpY3Rpb25hcnksXG4gIER5bmFtaWNGb3JtR3JvdXBGaWVsZCxcbiAgU2hvcnRWYWxpZGF0aW9uRXJyb3JzXG59IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQge1xuICBmb3JldmVySW52YWxpZCxcbiAgRk9SRVZFUl9JTlZBTElEX05BTUVcbn0gZnJvbSAnLi4vdmFsaWRhdG9ycy9mb3JldmVyLWludmFsaWQudmFsaWRhdG9yJztcbmltcG9ydCB7IER5bmFtaWNGb3JtQ29udHJvbCB9IGZyb20gJy4vZHluYW1pYy1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgV2lkZ2V0T3B0aW9ucywgZ2V0Rm9ybUZpZWxkc09wdGlvbnMgfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tY29yZSc7XG5cbmltcG9ydCBjbG9uZURlZXAgZnJvbSAnbG9kYXNoLmNsb25lZGVlcCc7XG5pbXBvcnQgbWVyZ2VXaXRoIGZyb20gJ2xvZGFzaC5tZXJnZXdpdGgnO1xuXG4vLyBFbmZvcmNlcyB0aGUgcHJvcGVydGllcyBvZiB0aGUgb2JqZWN0LCBpZiBzdXBwbGllZCwgdG8gYmUgb2YgdGhlIG9yaWdpbmFsIHR5cGUgb3IgRHluYW1pY0Zvcm1Hcm91cCBvciwgRm9ybUFycmF5XG5leHBvcnQgdHlwZSBGb3JtTW9kZWw8VD4gPSB7XG4gIFtQIGluIGtleW9mIFRdPzogVFtQXSB8IER5bmFtaWNGb3JtR3JvdXA8YW55PiB8IEZvcm1BcnJheTtcbn07XG5cbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUdyb3VwPFRNb2RlbD4gZXh0ZW5kcyBGb3JtR3JvdXAge1xuICBwdWJsaWMgbmF0aXZlVmFsaWRhdGVFcnJvcnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERpY3Rpb25hcnk+KHt9KTtcbiAgcHVibGljIGN1c3RvbVZhbGlkYXRlRXJyb3JzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTaG9ydFZhbGlkYXRpb25FcnJvcnM+KHt9KTtcbiAgcHVibGljIGZvcm1FcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgZm9ybUZpZWxkczogRGljdGlvbmFyeTtcbiAgcHVibGljIG9iamVjdENoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgcHJvdGVjdGVkIEZvcm1Db250cm9sQ2xhc3MgPSBEeW5hbWljRm9ybUNvbnRyb2w7XG4gIHByb3RlY3RlZCBfb2JqZWN0OiBUTW9kZWwgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkIF9leHRlcm5hbEVycm9yczogU2hvcnRWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCBfdmFsaWRhdG9yT3B0aW9uczogVmFsaWRhdG9yT3B0aW9ucyB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgX2ZiID0gbmV3IEZvcm1CdWlsZGVyKCk7XG4gIHByaXZhdGUgX2Zvcm1HZW46IFdpZGdldE9wdGlvbnNbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZmFjdG9yeU1vZGVsOiBDbGFzc1R5cGU8VE1vZGVsPixcbiAgICBwdWJsaWMgZmllbGRzOiBGb3JtTW9kZWw8VE1vZGVsPixcbiAgICB2YWxpZGF0b3JPck9wdHM/OlxuICAgICAgfCBWYWxpZGF0b3JGblxuICAgICAgfCBWYWxpZGF0b3JGbltdXG4gICAgICB8IEFic3RyYWN0Q29udHJvbE9wdGlvbnNcbiAgICAgIHwgbnVsbCxcbiAgICBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm4gfCBBc3luY1ZhbGlkYXRvckZuW10gfCBudWxsXG4gICkge1xuICAgIHN1cGVyKHt9LCB2YWxpZGF0b3JPck9wdHMsIGFzeW5jVmFsaWRhdG9yKTtcbiAgICAvKlxuICAgIGNvbnN0IGNsYXNzVmFsaWRhdG9ycyA9IER5bmFtaWNGb3JtR3JvdXAuZ2V0Q2xhc3NWYWxpZGF0b3JzPFRNb2RlbD4oXG4gICAgICB0aGlzLmZhY3RvcnlNb2RlbCxcbiAgICAgIHRoaXMuZmllbGRzLFxuICAgICAgdGhpcy5kZWZhdWx0VmFsaWRhdG9yT3B0aW9uc1xuICAgICk7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZmIuZ3JvdXAoXG4gICAgICBjbGFzc1ZhbGlkYXRvcnNcbiAgICApO1xuICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpcy5hZGRDb250cm9sKGtleSwgZm9ybUdyb3VwLmNvbnRyb2xzW2tleV0pO1xuICAgIH0pO1xuICAgIHRoaXMudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIHRoaXMudmFsaWRhdGUoXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgdGhpcy5kZWZhdWx0VmFsaWRhdG9yT3B0aW9uc1xuICAgICAgKTtcbiAgICB9KTsqL1xuICAgIHRoaXMuZm9ybUZpZWxkcyA9IHRoaXMub25seUZpZWxkcyhmaWVsZHMpO1xuICAgIHRoaXMuX2Zvcm1HZW4gPSBnZXRGb3JtRmllbGRzT3B0aW9ucyhmYWN0b3J5TW9kZWwpO1xuICB9XG5cbiAgZ2V0Rm9ybUdlbkRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1HZW47XG4gIH1cblxuICAvLyBHZXR0ZXJzICYgU2V0dGVyc1xuICBzZXQgZXh0ZXJuYWxFcnJvcnMoZXh0ZXJuYWxFcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycyB8IG51bGwpIHtcbiAgICB0aGlzLl9leHRlcm5hbEVycm9ycyA9IGV4dGVybmFsRXJyb3JzO1xuICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgfVxuICBnZXQgZXh0ZXJuYWxFcnJvcnMoKTogU2hvcnRWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2V4dGVybmFsRXJyb3JzO1xuICB9XG5cbiAgc2V0IHZhbGlkYXRvck9wdGlvbnModmFsaWRhdG9yT3B0aW9uczogVmFsaWRhdG9yT3B0aW9ucyB8IG51bGwpIHtcbiAgICB0aGlzLl92YWxpZGF0b3JPcHRpb25zID0gdmFsaWRhdG9yT3B0aW9ucztcbiAgICB0aGlzLnZhbGlkYXRlKCk7XG4gIH1cbiAgZ2V0IHZhbGlkYXRvck9wdGlvbnMoKTogVmFsaWRhdG9yT3B0aW9ucyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0b3JPcHRpb25zO1xuICB9XG5cbiAgc2V0IG9iamVjdChvYmplY3Q6IFRNb2RlbCkge1xuICAgIHRoaXMuc2V0T2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgZ2V0IG9iamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPYmplY3QoKTtcbiAgfVxuXG4gIC8vIFB1YmxpYyBBUElcbiAgdmFsaWRhdGUoXG4gICAgZXh0ZXJuYWxFcnJvcnM/OiBTaG9ydFZhbGlkYXRpb25FcnJvcnMsXG4gICAgdmFsaWRhdG9yT3B0aW9ucz86IFZhbGlkYXRvck9wdGlvbnNcbiAgKSB7XG4gICAgdGhpcy52YWxpZGF0ZUFzeW5jKGV4dGVybmFsRXJyb3JzLCB2YWxpZGF0b3JPcHRpb25zKS50aGVuKFxuICAgICAgKCkgPT4ge30sXG4gICAgICBlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBhc3luYyB2YWxpZGF0ZUFzeW5jKFxuICAgIGV4dGVybmFsRXJyb3JzPzogU2hvcnRWYWxpZGF0aW9uRXJyb3JzLFxuICAgIHZhbGlkYXRvck9wdGlvbnM/OiBWYWxpZGF0b3JPcHRpb25zXG4gICkge1xuICAgIGlmIChleHRlcm5hbEVycm9ycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBleHRlcm5hbEVycm9ycyA9IGNsb25lRGVlcCh0aGlzLl9leHRlcm5hbEVycm9ycyk7XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkYXRvck9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsaWRhdG9yT3B0aW9ucyA9IGNsb25lRGVlcCh0aGlzLl92YWxpZGF0b3JPcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoIWV4dGVybmFsRXJyb3JzKSB7XG4gICAgICBleHRlcm5hbEVycm9ycyA9IHt9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB2YWxpZGF0ZSh0aGlzLm9iamVjdCwgdmFsaWRhdG9yT3B0aW9ucyk7XG4gICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3JzID0gdGhpcy50cmFuc2Zvcm1WYWxpZGF0aW9uRXJyb3JzKHJlc3VsdCk7XG4gICAgICBjb25zdCBhbGxFcnJvcnMgPSB0aGlzLm1lcmdlRXJyb3JzKGV4dGVybmFsRXJyb3JzLCB2YWxpZGF0aW9uRXJyb3JzKTtcblxuICAgICAgdGhpcy5tYXJrQXNJbnZhbGlkRm9yRXh0ZXJuYWxFcnJvcnMoZXh0ZXJuYWxFcnJvcnMpO1xuICAgICAgdGhpcy5zZXRDdXN0b21FcnJvcnMoYWxsRXJyb3JzKTtcblxuICAgICAgLy8gdG9kbzogcmVmYWN0b3IsIGludmFsaWRhdGUgZm9ybSBpZiBleGlzdHMgYW55IGFsbEVycm9yc1xuICAgICAgbGV0IHVzZWRGb3JldmVySW52YWxpZCA9IGZhbHNlO1xuICAgICAgaWYgKFxuICAgICAgICBPYmplY3Qua2V5cyhhbGxFcnJvcnMpLmZpbHRlcihrZXkgPT4ga2V5ICE9PSBGT1JFVkVSX0lOVkFMSURfTkFNRSlcbiAgICAgICAgICAubGVuZ3RoID09PSAwICYmXG4gICAgICAgIHRoaXMuZ2V0KEZPUkVWRVJfSU5WQUxJRF9OQU1FKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ29udHJvbChGT1JFVkVSX0lOVkFMSURfTkFNRSk7XG4gICAgICAgIHVzZWRGb3JldmVySW52YWxpZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudmFsaWQgJiZcbiAgICAgICAgT2JqZWN0LmtleXMoYWxsRXJyb3JzKS5sZW5ndGggPiAwICYmXG4gICAgICAgICF0aGlzLmdldChGT1JFVkVSX0lOVkFMSURfTkFNRSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLmFkZENvbnRyb2woXG4gICAgICAgICAgRk9SRVZFUl9JTlZBTElEX05BTUUsXG4gICAgICAgICAgbmV3IEZvcm1Db250cm9sKCcnLCBbZm9yZXZlckludmFsaWQgYXMgYW55XSlcbiAgICAgICAgKTtcbiAgICAgICAgdXNlZEZvcmV2ZXJJbnZhbGlkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh1c2VkRm9yZXZlckludmFsaWQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtcbiAgICAgICAgICBvbmx5U2VsZjogdHJ1ZSxcbiAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBzZXRDdXN0b21FcnJvcnMoYWxsRXJyb3JzOiBhbnkpIHtcbiAgICB0aGlzLmZvcm1FcnJvcnMgPSBhbGxFcnJvcnM7XG4gICAgdGhpcy5jdXN0b21WYWxpZGF0ZUVycm9ycy5uZXh0KHRoaXMuZm9ybUVycm9ycyBhcyBTaG9ydFZhbGlkYXRpb25FcnJvcnMgKTtcbiAgICB0aGlzLm5hdGl2ZVZhbGlkYXRlRXJyb3JzLm5leHQodGhpcy5jb2xsZWN0RXJyb3JzKHRoaXMpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb2xsZWN0RXJyb3JzKGNvbnRyb2w6IERpY3Rpb25hcnksIGlzUm9vdCA9IHRydWUpOiBhbnkgfCBudWxsIHtcbiAgICBpZiAoY29udHJvbC5jb250cm9scykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uKGlzUm9vdCA/IHRoaXMuZXJyb3JzIDoge30pLFxuICAgICAgICAuLi5PYmplY3QuZW50cmllcyhjb250cm9sLmNvbnRyb2xzKS5yZWR1Y2UoXG4gICAgICAgICAgKGFjYzogYW55LCBba2V5LCBjaGlsZENvbnRyb2xdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZEVycm9ycyA9IHRoaXMuY29sbGVjdEVycm9ycyhjaGlsZENvbnRyb2wgYXMgRGljdGlvbmFyeTxhbnk+LCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNoaWxkRXJyb3JzICYmXG4gICAgICAgICAgICAgIGtleSAhPT0gJ2ZvcmV2ZXJJbnZhbGlkJyAmJlxuICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjaGlsZEVycm9ycykubGVuZ3RoID4gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGFjYyA9IHtcbiAgICAgICAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgICAgICAgW2tleV06IHtcbiAgICAgICAgICAgICAgICAgIC4uLihhY2MgJiYgYWNjW2tleV0gPyBhY2Nba2V5XSA6IHt9KSxcbiAgICAgICAgICAgICAgICAgIC4uLmNoaWxkRXJyb3JzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9LFxuICAgICAgICAgIHt9XG4gICAgICAgIClcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb250cm9sLmVycm9ycztcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUFsbEZvcm1GaWVsZHMoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5jb250cm9scykuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXQoZmllbGQpO1xuXG4gICAgICAvLyBDb250cm9sXG4gICAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XG4gICAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgfVxuICAgICAgLy8gR3JvdXA6IHJlY3Vyc2l2ZVxuICAgICAgZWxzZSBpZiAoY29udHJvbCBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgY29udHJvbC52YWxpZGF0ZUFsbEZvcm1GaWVsZHMoKTtcbiAgICAgIH1cbiAgICAgIC8vIEFycmF5XG4gICAgICBlbHNlIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9scy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vIENvbnRyb2wgaW4gQXJyYXlcbiAgICAgICAgICBpZiAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBhcyBGb3JtQ29udHJvbCkubWFya0FzVG91Y2hlZCh7XG4gICAgICAgICAgICAgIG9ubHlTZWxmOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gR3JvdXAgaW4gQXJyYXk6IHJlY3Vyc2l2ZVxuICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXBcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgICgoY29udHJvbCBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW2ldIGFzIER5bmFtaWNGb3JtR3JvdXA8XG4gICAgICAgICAgICAgIGFueVxuICAgICAgICAgICAgPikudmFsaWRhdGVBbGxGb3JtRmllbGRzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXNldFZhbGlkYXRlQWxsRm9ybUZpZWxkcygpIHtcbiAgICB0aGlzLm1hcmtBc0ludmFsaWRGb3JFeHRlcm5hbEVycm9ycyh7fSk7XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldChmaWVsZCk7XG5cbiAgICAgIC8vIENvbnRyb2xcbiAgICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgY29udHJvbC5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICBjb250cm9sLm1hcmtBc1VudG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgICBjb250cm9sLm1hcmtBc1ByaXN0aW5lKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICB9XG4gICAgICAvLyBHcm91cDogcmVjdXJzaXZlXG4gICAgICBlbHNlIGlmIChjb250cm9sIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgICBjb250cm9sLnJlc2V0VmFsaWRhdGVBbGxGb3JtRmllbGRzKCk7XG4gICAgICB9XG4gICAgICAvLyBBcnJheVxuICAgICAgZWxzZSBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAvLyBDb250cm9sIGluIEFycmF5XG4gICAgICAgICAgaWYgKChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgKChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgIF0gYXMgRm9ybUNvbnRyb2wpLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgICAgICAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tcbiAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgXSBhcyBGb3JtQ29udHJvbCkubWFya0FzVW50b3VjaGVkKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICAgICAgICAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBhcyBGb3JtQ29udHJvbCkubWFya0FzUHJpc3RpbmUoe1xuICAgICAgICAgICAgICBvbmx5U2VsZjogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEdyb3VwIGluIEFycmF5OiByZWN1cnNpdmVcbiAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgIChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBhcyBEeW5hbWljRm9ybUdyb3VwPFxuICAgICAgICAgICAgICBhbnlcbiAgICAgICAgICAgID4pLnJlc2V0VmFsaWRhdGVBbGxGb3JtRmllbGRzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zZXRDdXN0b21FcnJvcnMoe30pO1xuICB9XG5cbiAgY2xhc3NUb0NsYXNzPFRDbGFzc01vZGVsPihvYmplY3Q6IFRDbGFzc01vZGVsKSB7XG4gICAgcmV0dXJuIGNsYXNzVG9DbGFzcyhvYmplY3QsIHsgaWdub3JlRGVjb3JhdG9yczogdHJ1ZSB9KTtcbiAgfVxuXG4gIHBsYWluVG9DbGFzczxUQ2xhc3NNb2RlbCwgT2JqZWN0PihcbiAgICBjbHM6IENsYXNzVHlwZTxUQ2xhc3NNb2RlbD4sXG4gICAgcGxhaW46IE9iamVjdFxuICApIHtcbiAgICByZXR1cm4gcGxhaW5Ub0NsYXNzKGNscywgcGxhaW4sIHsgaWdub3JlRGVjb3JhdG9yczogdHJ1ZSB9KTtcbiAgfVxuXG4gIGFzeW5jIHNldEV4dGVybmFsRXJyb3JzQXN5bmMoZXh0ZXJuYWxFcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycykge1xuICAgIHRoaXMuX2V4dGVybmFsRXJyb3JzID0gZXh0ZXJuYWxFcnJvcnM7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnZhbGlkYXRlQXN5bmMoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgc2V0RXh0ZXJuYWxFcnJvcnMoZXh0ZXJuYWxFcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycykge1xuICAgIHRoaXMuc2V0RXh0ZXJuYWxFcnJvcnNBc3luYyhleHRlcm5hbEVycm9ycykudGhlbihcbiAgICAgICgpID0+IHt9LFxuICAgICAgZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZ2V0RXh0ZXJuYWxFcnJvcnMoKTogU2hvcnRWYWxpZGF0aW9uRXJyb3JzIHtcbiAgICByZXR1cm4gdGhpcy5fZXh0ZXJuYWxFcnJvcnMgYXMgU2hvcnRWYWxpZGF0aW9uRXJyb3JzO1xuICB9XG5cbiAgY2xlYXJFeHRlcm5hbEVycm9ycygpIHtcbiAgICB0aGlzLnNldEV4dGVybmFsRXJyb3JzKHt9KTtcbiAgfVxuICBjbGVhckV4dGVybmFsRXJyb3JzQXN5bmMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0RXh0ZXJuYWxFcnJvcnNBc3luYyh7fSk7XG4gIH1cblxuICBhc3luYyBzZXRWYWxpZGF0b3JPcHRpb25zQXN5bmModmFsaWRhdG9yT3B0aW9uczogVmFsaWRhdG9yT3B0aW9ucykge1xuICAgIHRoaXMuX3ZhbGlkYXRvck9wdGlvbnMgPSB2YWxpZGF0b3JPcHRpb25zO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy52YWxpZGF0ZUFzeW5jKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbGlkYXRvck9wdGlvbnModmFsaWRhdG9yT3B0aW9uczogVmFsaWRhdG9yT3B0aW9ucykge1xuICAgIHRoaXMuc2V0VmFsaWRhdG9yT3B0aW9uc0FzeW5jKHZhbGlkYXRvck9wdGlvbnMpLnRoZW4oXG4gICAgICAoKSA9PiB7fSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGdldFZhbGlkYXRvck9wdGlvbnMoKTogVmFsaWRhdG9yT3B0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRvck9wdGlvbnMgYXMgVmFsaWRhdG9yT3B0aW9ucztcbiAgfVxuXG4gIC8vIEhlbHBlcnNcbiAgcHJvdGVjdGVkIG9ubHlGaWVsZHMoZmllbGRzOiBGb3JtTW9kZWw8YW55Pik6IERpY3Rpb25hcnkge1xuICAgIGNvbnN0IG5ld0ZpZWxkczogRGljdGlvbmFyeSA9IHt9O1xuXG4gICAgaWYgKGZpZWxkcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBPYmplY3Qua2V5cyhmaWVsZHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGZpZWxkc1trZXldIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgICAgIC8vIEdyb3VwOiByZWN1cnNpdmVcbiAgICAgICAgICBuZXdGaWVsZHNba2V5XSA9IHRoaXMub25seUZpZWxkcyhcbiAgICAgICAgICAgIChmaWVsZHNba2V5XSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT4pLmZvcm1GaWVsZHNcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEFycmF5XG4gICAgICAgICAgaWYgKGZpZWxkc1trZXldIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChmaWVsZHNba2V5XSBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzWzBdIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIC8vIEdyb3VwIHdpdGhpbiBBcnJheTogcmVjdXJzaXZlXG4gICAgICAgICAgICAgIG5ld0ZpZWxkc1trZXldID0gdGhpcy5vbmx5RmllbGRzKFxuICAgICAgICAgICAgICAgICgoZmllbGRzW2tleV0gYXMgRm9ybUFycmF5KS5jb250cm9sc1swXSBhcyBEeW5hbWljRm9ybUdyb3VwPFxuICAgICAgICAgICAgICAgICAgYW55XG4gICAgICAgICAgICAgICAgPikuZm9ybUZpZWxkc1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gQ29udHJvbCB3aXRoaW4gQXJyYXlcbiAgICAgICAgICAgICAgbmV3RmllbGRzW2tleV0gPSAoZmllbGRzW2tleV0gYXMgRm9ybUFycmF5KS5jb250cm9sc1swXS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSGFuZGxlIENvbnRyb2xcbiAgICAgICAgICAgIG5ld0ZpZWxkc1trZXldID0gZmllbGRzW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RmllbGRzO1xuICB9XG5cbiAgdHJhbnNmb3JtVmFsaWRhdGlvbkVycm9ycyhlcnJvcnM6IFZhbGlkYXRpb25FcnJvcltdKTogU2hvcnRWYWxpZGF0aW9uRXJyb3JzIHtcbiAgICBjb25zdCBjdXN0b21FcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycyA9IHt9O1xuXG4gICAgZXJyb3JzLmZvckVhY2goKGVycm9yOiBWYWxpZGF0aW9uRXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvciAmJiBlcnJvci5jb25zdHJhaW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGVycm9yLmNvbnN0cmFpbnRzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlmICghY3VzdG9tRXJyb3JzW2Vycm9yLnByb3BlcnR5XSkge1xuICAgICAgICAgICAgY3VzdG9tRXJyb3JzW2Vycm9yLnByb3BlcnR5XSA9IFtdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChjdXN0b21FcnJvcnNbZXJyb3IucHJvcGVydHldIGFzIHN0cmluZ1tdKS5pbmRleE9mKFxuICAgICAgICAgICAgICBlcnJvci5jb25zdHJhaW50c1trZXldXG4gICAgICAgICAgICApID09PSAtMVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgKGN1c3RvbUVycm9yc1tlcnJvci5wcm9wZXJ0eV0gYXMgc3RyaW5nW10pLnB1c2goXG4gICAgICAgICAgICAgIGVycm9yLmNvbnN0cmFpbnRzW2tleV1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9yLmNoaWxkcmVuICE9PSB1bmRlZmluZWQgJiYgZXJyb3IuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIGN1c3RvbUVycm9yc1tlcnJvci5wcm9wZXJ0eV0gPSB0aGlzLnRyYW5zZm9ybVZhbGlkYXRpb25FcnJvcnMoXG4gICAgICAgICAgZXJyb3IuY2hpbGRyZW5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjdXN0b21FcnJvcnM7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWVyZ2VFcnJvcnMoXG4gICAgZXh0ZXJuYWxFcnJvcnM/OiBTaG9ydFZhbGlkYXRpb25FcnJvcnMsXG4gICAgdmFsaWRhdGlvbkVycm9ycz86IFNob3J0VmFsaWRhdGlvbkVycm9yc1xuICApIHtcbiAgICBjb25zdCBjbG9uZWRFeHRlcm5hbEVycm9ycyA9IGNsb25lRGVlcChleHRlcm5hbEVycm9ycyk7XG4gICAgcmV0dXJuIG1lcmdlV2l0aChcbiAgICAgIGNsb25lZEV4dGVybmFsRXJyb3JzLFxuICAgICAgdmFsaWRhdGlvbkVycm9ycyxcbiAgICAgIChvYmpWYWx1ZSwgc3JjVmFsdWUpID0+IHtcbiAgICAgICAgaWYgKGNhbk1lcmdlKCkpIHtcbiAgICAgICAgICByZXR1cm4gb2JqVmFsdWUuY29uY2F0KHNyY1ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNhbk1lcmdlKCkge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KG9ialZhbHVlKSAmJlxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShzcmNWYWx1ZSkgJiZcbiAgICAgICAgICAgIG9ialZhbHVlLmZpbHRlcihvYmpJdGVtID0+IHNyY1ZhbHVlLmluZGV4T2Yob2JqSXRlbSkgIT09IC0xKVxuICAgICAgICAgICAgICAubGVuZ3RoID09PSAwXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFya0FzSW52YWxpZEZvckV4dGVybmFsRXJyb3JzKFxuICAgIGVycm9yczogU2hvcnRWYWxpZGF0aW9uRXJyb3JzLFxuICAgIGNvbnRyb2xzPzogRGljdGlvbmFyeTxBYnN0cmFjdENvbnRyb2w+XG4gICkge1xuICAgIGlmICghY29udHJvbHMpIHtcbiAgICAgIGNvbnRyb2xzID0gdGhpcy5jb250cm9scztcbiAgICB9XG4gICAgT2JqZWN0LmtleXMoY29udHJvbHMpLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgY29uc3QgY29udHJvbCA9IGNvbnRyb2xzIVtmaWVsZF07XG5cbiAgICAgIC8vIENvbnRyb2xcbiAgICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgaWYgKGVycm9ycyAmJiBlcnJvcnNbZmllbGRdKSB7XG4gICAgICAgICAgY29udHJvbC5zZXRFcnJvcnMoeyBleHRlcm5hbEVycm9yOiB0cnVlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjb250cm9sLmVycm9ycyAmJiBjb250cm9sLmVycm9ycy5leHRlcm5hbEVycm9yID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb250cm9sLnNldEVycm9ycyhudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEdyb3VwXG4gICAgICBlbHNlIGlmIChjb250cm9sIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgICBjb250cm9sLm1hcmtBc0ludmFsaWRGb3JFeHRlcm5hbEVycm9ycyhcbiAgICAgICAgICBlcnJvcnMgJiYgZXJyb3JzW2ZpZWxkXVxuICAgICAgICAgICAgPyAoZXJyb3JzW2ZpZWxkXSBhcyBTaG9ydFZhbGlkYXRpb25FcnJvcnMpXG4gICAgICAgICAgICA6IHt9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICAvLyBBcnJheVxuICAgICAgZWxzZSBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IChjb250cm9sIGFzIEZvcm1BcnJheSkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAvLyBDb250cm9sIGluIEFycmF5XG4gICAgICAgICAgaWYgKGNvbnRyb2xbaV0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgaWYgKGVycm9ycyAmJiBlcnJvcnNbaV0gJiYgZXJyb3JzW2ldW2ZpZWxkXSkge1xuICAgICAgICAgICAgICBjb250cm9sW2ldLnNldEVycm9ycyh7IGV4dGVybmFsRXJyb3I6IHRydWUgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICBjb250cm9sW2ldLmVycm9ycyAmJlxuICAgICAgICAgICAgICBjb250cm9sW2ldLmVycm9ycy5leHRlcm5hbEVycm9yID09PSB0cnVlXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29udHJvbFtpXS5zZXRFcnJvcnMobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEdyb3VwIGluIEFycmF5XG4gICAgICAgICAgZWxzZSBpZiAoY29udHJvbFtpXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgICAgIGNvbnRyb2xbaV0ubWFya0FzSW52YWxpZEZvckV4dGVybmFsRXJyb3JzKFxuICAgICAgICAgICAgICBlcnJvcnMgJiYgZXJyb3JzW2ldICYmIGVycm9yc1tpXVtmaWVsZF1cbiAgICAgICAgICAgICAgICA/IChlcnJvcnNbaV1bZmllbGRdIGFzIFNob3J0VmFsaWRhdGlvbkVycm9ycylcbiAgICAgICAgICAgICAgICA6IHt9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGdldHMgYWxsIHZhbHVlcyBmcm9tIHRoZSBmb3JtIGNvbnRyb2xzIGFuZCBhbGwgc3ViIGZvcm0gZ3JvdXAgYW5kIGFycmF5IGNvbnRyb2xzIGFuZCByZXR1cm5zIGl0IGFzXG4gICAqIGFuIG9iamVjdFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldE9iamVjdCgpOiBUTW9kZWwge1xuICAgIC8vIEluaXRpYWxpemUgdGhlIHNoYXBlIG9mIHRoZSByZXNwb25zZVxuICAgIGNvbnN0IG9iamVjdCA9IHRoaXMuX29iamVjdFxuICAgICAgPyB0aGlzLmNsYXNzVG9DbGFzcyh0aGlzLl9vYmplY3QpXG4gICAgICA6IHRoaXMuZmFjdG9yeU1vZGVsXG4gICAgICA/IG5ldyB0aGlzLmZhY3RvcnlNb2RlbCgpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChvYmplY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gUmVjdXJzaXZlbHkgZ2V0IHRoZSB2YWx1ZSBvZiBhbGwgZmllbGRzXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmNvbnRyb2xzKVxuICAgICAgICAuZmlsdGVyKG5hbWUgPT4gbmFtZSAhPT0gRk9SRVZFUl9JTlZBTElEX05BTUUpXG4gICAgICAgIC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgLy8gSGFuZGxlIEdyb3VwXG4gICAgICAgICAgaWYgKHRoaXMuY29udHJvbHNba2V5XSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgICAgIG9iamVjdFtrZXldID0gKHRoaXMuY29udHJvbHNba2V5XSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT4pLm9iamVjdDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBIYW5kbGUgRm9ybSBBcnJheVxuICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY29udHJvbHNba2V5XSBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB2YWx1ZVxuICAgICAgICAgICAgb2JqZWN0W2tleV0gPSBbXTtcblxuICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgICBpIDwgKHRoaXMuY29udHJvbHNba2V5XSBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzLmxlbmd0aDtcbiAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgbGV0IHZhbHVlO1xuXG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAodGhpcy5jb250cm9sc1trZXldIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gaW5zdGFuY2VvZlxuICAgICAgICAgICAgICAgIER5bmFtaWNGb3JtR3JvdXBcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgZ2V0IG9iamVjdCBncm91cFxuICAgICAgICAgICAgICAgIHZhbHVlID0gKCh0aGlzLmNvbnRyb2xzW2tleV0gYXMgRm9ybUFycmF5KS5jb250cm9sc1tcbiAgICAgICAgICAgICAgICAgIGlcbiAgICAgICAgICAgICAgICBdIGFzIER5bmFtaWNGb3JtR3JvdXA8YW55Pikub2JqZWN0O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gKHRoaXMuY29udHJvbHNba2V5XSBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW2ldLnZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG9iamVjdFtrZXldLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSGFuZGxlIENvbnRyb2xcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9iamVjdFtrZXldID0gdGhpcy5jb250cm9sc1trZXldLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAodGhpcy5mYWN0b3J5TW9kZWxcbiAgICAgID8gdGhpcy5wbGFpblRvQ2xhc3ModGhpcy5mYWN0b3J5TW9kZWwsIG9iamVjdClcbiAgICAgIDogb2JqZWN0KSBhcyBUTW9kZWw7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgb2YgZXZlcnkgY29udHJvbCBvbiB0aGUgZm9ybSBhbmQgcmVjdXJzaXZlbHkgc2V0cyB0aGUgdmFsdWVzIG9mIHRoZSBjb250cm9sc1xuICAgKiBvbiBhbGwgc3ViIGZvcm0gZ3JvdXBzXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgdGhlIGRhdGEgdG8gYXNzaWduIHRvIGFsbCBjb250cm9scyBvZiB0aGUgZm9ybSBncm91cCBhbmQgc3ViIGdyb3Vwc1xuICAgKi9cbiAgcHJvdGVjdGVkIHNldE9iamVjdChvYmplY3Q6IFRNb2RlbCkge1xuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiB0aGlzLmZhY3RvcnlNb2RlbCkge1xuICAgICAgdGhpcy5fb2JqZWN0ID0gdGhpcy5jbGFzc1RvQ2xhc3Mob2JqZWN0KTsgLy8gRW5zdXJlIGNvcnJlY3QgdHlwZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9vYmplY3QgPSB0aGlzLnBsYWluVG9DbGFzcyh0aGlzLmZhY3RvcnlNb2RlbCwgb2JqZWN0IGFzIE9iamVjdCk7IC8vIENvbnZlcnQgdG8gTW9kZWwgdHlwZVxuICAgIH1cblxuICAgIC8vIFJlY3Vyc2l2ZWx5IHNldCB0aGUgdmFsdWUgb2YgYWxsIGZpZWxkc1xuICAgIE9iamVjdC5rZXlzKHRoaXMuY29udHJvbHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIC8vIEhhbmRsZSBHcm91cFxuICAgICAgaWYgKHRoaXMuY29udHJvbHNba2V5XSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgKHRoaXMuY29udHJvbHNba2V5XSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT4pLm9iamVjdCA9IHRoaXMuX29iamVjdFxuICAgICAgICAgID8gdGhpcy5fb2JqZWN0W2tleV1cbiAgICAgICAgICA6IHt9O1xuICAgICAgfVxuXG4gICAgICAvLyBIYW5kbGUgRm9ybUFycmF5XG4gICAgICBlbHNlIGlmICh0aGlzLmNvbnRyb2xzW2tleV0gaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcbiAgICAgICAgY29uc3Qgb2JqZWN0QXJyYXkgPSB0aGlzLl9vYmplY3QgPyB0aGlzLl9vYmplY3Rba2V5XSA6IFtdO1xuICAgICAgICBjb25zdCBmb3JtQXJyYXkgPSB0aGlzLmNvbnRyb2xzW2tleV0gYXMgRm9ybUFycmF5O1xuICAgICAgICBjb25zdCBpc0Zvcm1Hcm91cCA9IGZvcm1BcnJheS5jb250cm9sc1swXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGZpcnN0Rm9ybUdyb3VwID0gZm9ybUFycmF5LmNvbnRyb2xzWzBdIGFzIER5bmFtaWNGb3JtR3JvdXA8YW55PjtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRyb2wgPSBmb3JtQXJyYXkuY29udHJvbHNbMF0gYXMgRm9ybUNvbnRyb2w7XG5cbiAgICAgICAgLy8gQ2xlYXIgRm9ybUFycmF5IHdoaWxlIHJldGFpbmluZyB0aGUgcmVmZXJlbmNlXG4gICAgICAgIHdoaWxlIChmb3JtQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgZm9ybUFycmF5LnJlbW92ZUF0KDApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChpc0Zvcm1Hcm91cCkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIEZvcm1Hcm91cFxuICAgICAgICAgICAgY29uc3QgZHluYW1pY0Zvcm1Hcm91cCA9IG5ldyBEeW5hbWljRm9ybUdyb3VwKFxuICAgICAgICAgICAgICBmaXJzdEZvcm1Hcm91cC5mYWN0b3J5TW9kZWwsXG4gICAgICAgICAgICAgIGZpcnN0Rm9ybUdyb3VwLmZvcm1GaWVsZHNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGR5bmFtaWNGb3JtR3JvdXAuc2V0UGFyZW50KHRoaXMpO1xuXG4gICAgICAgICAgICBjb25zdCBjbGFzc1ZhbGlkYXRvcnMgPSBnZXRDbGFzc1ZhbGlkYXRvcnM8VE1vZGVsPihcbiAgICAgICAgICAgICAgZmlyc3RGb3JtR3JvdXAuZmFjdG9yeU1vZGVsLFxuICAgICAgICAgICAgICBmaXJzdEZvcm1Hcm91cC5mb3JtRmllbGRzLFxuICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHRoaXMuRm9ybUNvbnRyb2xDbGFzc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2ZiLmdyb3VwKGNsYXNzVmFsaWRhdG9ycyk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBhbGwgY29udHJvbHMgdG8gdGhlIGZvcm0gZ3JvdXBcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaChjdHJsS2V5ID0+IHtcbiAgICAgICAgICAgICAgZHluYW1pY0Zvcm1Hcm91cC5hZGRDb250cm9sKGN0cmxLZXksIGZvcm1Hcm91cC5jb250cm9sc1tjdHJsS2V5XSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQWRkIGEgdmFsdWUgY2hhbmdlIGxpc3RlbmVyIHRvIHRoZSBncm91cC4gb24gY2hhbmdlLCB2YWxpZGF0ZVxuICAgICAgICAgICAgZHluYW1pY0Zvcm1Hcm91cC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICBkeW5hbWljRm9ybUdyb3VwLnZhbGlkYXRlKHVuZGVmaW5lZCwgdGhpcy5fdmFsaWRhdG9yT3B0aW9ucyBhcyBWYWxpZGF0b3JPcHRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmb3JtQXJyYXkuY29udHJvbHMucHVzaChkeW5hbWljRm9ybUdyb3VwKTtcblxuICAgICAgICAgICAgLy8gUmVjdXNyaXZlbHkgc2V0IHRoZSBvYmplY3QgdmFsdWVcbiAgICAgICAgICAgIChmb3JtQXJyYXkuY29udHJvbHNbaV0gYXMgRHluYW1pY0Zvcm1Hcm91cDxhbnk+KS5vYmplY3QgPVxuICAgICAgICAgICAgICB0aGlzLl9vYmplY3QgJiYgb2JqZWN0QXJyYXkgJiYgb2JqZWN0QXJyYXlbaV1cbiAgICAgICAgICAgICAgICA/IG9iamVjdEFycmF5W2ldXG4gICAgICAgICAgICAgICAgOiB7fTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGNvbnRyb2xcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9XG4gICAgICAgICAgICAgIHRoaXMuX29iamVjdCAmJiBvYmplY3RBcnJheSAmJiBvYmplY3RBcnJheVtpXVxuICAgICAgICAgICAgICAgID8gb2JqZWN0QXJyYXlbaV1cbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Zvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFxuICAgICAgICAgICAgICBjb250cm9sVmFsdWUsXG4gICAgICAgICAgICAgIGZvcm1Db250cm9sLnZhbGlkYXRvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG5ld0Zvcm1Db250cm9sLnNldFBhcmVudCh0aGlzKTtcblxuICAgICAgICAgICAgLy8gQWRkIHRoZSBjb250cm9sIHRvIHRoZSBGb3JtQXJyYXlcbiAgICAgICAgICAgIGZvcm1BcnJheS5jb250cm9scy5wdXNoKG5ld0Zvcm1Db250cm9sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSGFuZGxlIENvbnRyb2xcbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBuZXdPYmplY3QgPSB0aGlzLl9vYmplY3QgPyB0aGlzLl9vYmplY3Rba2V5XSA6IFtdO1xuICAgICAgICB0aGlzLmNvbnRyb2xzW2tleV0uc2V0VmFsdWUoXG4gICAgICAgICAgdGhpcy5fb2JqZWN0ICYmIG5ld09iamVjdCA/IG5ld09iamVjdCA6IHVuZGVmaW5lZFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub2JqZWN0Q2hhbmdlLm5leHQodGhpcy5fb2JqZWN0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xhc3NWYWxpZGF0b3JzPFRNb2RlbD4oXG4gIGZhY3RvcnlNb2RlbDogQ2xhc3NUeXBlPFRNb2RlbD4sXG4gIGZpZWxkczogRGljdGlvbmFyeSxcbiAgdmFsaWRhdG9yT3B0aW9ucz86IFZhbGlkYXRvck9wdGlvbnMsXG4gIEZvcm1Db250cm9sQ2xhc3M6IGFueSA9IER5bmFtaWNGb3JtQ29udHJvbFxuKSB7XG4gIC8vIEdldCB0aGUgdmFsaWRhdGlvbiBydWxlcyBmcm9tIHRoZSBvYmplY3QgZGVjb3JhdG9yc1xuICBjb25zdCBhbGxWYWxpZGF0aW9uTWV0YWRhdGFzOiBWYWxpZGF0aW9uTWV0YWRhdGFbXSA9IGdldEZyb21Db250YWluZXIoXG4gICAgTWV0YWRhdGFTdG9yYWdlXG4gICkuZ2V0VGFyZ2V0VmFsaWRhdGlvbk1ldGFkYXRhcyhmYWN0b3J5TW9kZWwsICcnKTtcblxuICAvLyBHZXQgdGhlIHZhbGlkYXRpb24gcnVsZXMgZm9yIHRoZSB2YWxpZGF0aW9uIGdyb3VwOiBodHRwczovL2dpdGh1Yi5jb20vdHlwZXN0YWNrL2NsYXNzLXZhbGlkYXRvciN2YWxpZGF0aW9uLWdyb3Vwc1xuICBjb25zdCB2YWxpZGF0aW9uR3JvdXBNZXRhZGF0YXM6IFZhbGlkYXRpb25NZXRhZGF0YVtdID0gZ2V0RnJvbUNvbnRhaW5lcihcbiAgICBNZXRhZGF0YVN0b3JhZ2VcbiAgKS5nZXRUYXJnZXRWYWxpZGF0aW9uTWV0YWRhdGFzKFxuICAgIGZhY3RvcnlNb2RlbCxcbiAgICAnJyxcbiAgICB2YWxpZGF0b3JPcHRpb25zICYmIHZhbGlkYXRvck9wdGlvbnMuZ3JvdXBzXG4gICAgICA/IHZhbGlkYXRvck9wdGlvbnMuZ3JvdXBzXG4gICAgICA6IHVuZGVmaW5lZFxuICApO1xuXG4gIGNvbnN0IGZvcm1Hcm91cEZpZWxkcyA9IHt9O1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKCk7XG5cbiAgLy8gTG9vcCB0aHJvdWdoIGFsbCBmaWVsZHMgaW4gdGhlIGZvcm0gZGVmaW5pdGlvblxuICBPYmplY3Qua2V5cyhmaWVsZHMpXG4gICAgLmZpbHRlcihrZXkgPT4ga2V5LmluZGV4T2YoJ19fJykgIT09IDApXG4gICAgLmZvckVhY2goZmllbGROYW1lID0+IHtcbiAgICAgIC8vIENvbmRpdGlvbmFsIFZhbGlkYXRpb24gZm9yIHRoZSBmaWVsZFxuICAgICAgY29uc3QgY29uZGl0aW9uYWxWYWxpZGF0aW9uczogVmFsaWRhdGlvbk1ldGFkYXRhW10gPSBbXTtcbiAgICAgIHZhbGlkYXRpb25Hcm91cE1ldGFkYXRhcy5mb3JFYWNoKHZhbGlkYXRpb25NZXRhZGF0YSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpc1Byb3BlcnR5VmFsaWRhdG9yT2ZUeXBlKFxuICAgICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgICAgICAgICAgZmllbGROYW1lLFxuICAgICAgICAgICAgVmFsaWRhdGlvbktleXMuY29uZGl0aW9uYWwudHlwZVxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uZGl0aW9uYWxWYWxpZGF0aW9ucy5wdXNoKHZhbGlkYXRpb25NZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBBbGwgTmVzdGVkIFZhbGlkYXRpb24gZm9yIHRoZSBmaWVsZFxuICAgICAgY29uc3QgYWxsTmVzdGVkVmFsaWRhdGlvbnM6IFZhbGlkYXRpb25NZXRhZGF0YVtdID0gW107XG4gICAgICBhbGxWYWxpZGF0aW9uTWV0YWRhdGFzLmZvckVhY2godmFsaWRhdGlvbk1ldGFkYXRhID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlzUHJvcGVydHlWYWxpZGF0b3JPZlR5cGUoXG4gICAgICAgICAgICB2YWxpZGF0aW9uTWV0YWRhdGEsXG4gICAgICAgICAgICBmaWVsZE5hbWUsXG4gICAgICAgICAgICBWYWxpZGF0aW9uS2V5cy5uZXN0ZWQudHlwZVxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgYWxsTmVzdGVkVmFsaWRhdGlvbnMucHVzaCh2YWxpZGF0aW9uTWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gTmVzdGVkIFZhbGlkYXRpb24gZm9yIHRoZSBmaWVsZCBmb3IgdGhlIHJlcXVlc3RlZCBjbGFzcy12YWxpZGF0b3IgZ3JvdXBcbiAgICAgIGNvbnN0IG5lc3RlZEdyb3VwVmFsaWRhdGlvbnM6IFZhbGlkYXRpb25NZXRhZGF0YVtdID0gW107XG4gICAgICB2YWxpZGF0aW9uR3JvdXBNZXRhZGF0YXMuZm9yRWFjaCh2YWxpZGF0aW9uTWV0YWRhdGEgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaXNQcm9wZXJ0eVZhbGlkYXRvck9mVHlwZShcbiAgICAgICAgICAgIHZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICAgIFZhbGlkYXRpb25LZXlzLm5lc3RlZC50eXBlXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBuZXN0ZWRHcm91cFZhbGlkYXRpb25zLnB1c2godmFsaWRhdGlvbk1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGZpZWxkRGVmaW5pdGlvbjogRHluYW1pY0Zvcm1Hcm91cEZpZWxkID0ge1xuICAgICAgICBkYXRhOiBmb3JtR3JvdXBGaWVsZHNbZmllbGROYW1lXSxcbiAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uczogW10sXG4gICAgICAgIHZhbGlkYXRpb25EZWZpbml0aW9uczogW11cbiAgICAgIH07XG5cbiAgICAgIGlmIChmaWVsZERlZmluaXRpb24uZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbi5kYXRhID0gZmllbGRzW2ZpZWxkTmFtZV07XG4gICAgICB9XG4gICAgICAvLyBUUlkgTElOSyBFWElTVFMgTkFUSVZFIFZBTElEQVRJT05TLCBVTlNUQUJMRSAhISFcbiAgICAgIGlmIChcbiAgICAgICAgQXJyYXkuaXNBcnJheShmaWVsZERlZmluaXRpb24uZGF0YSkgJiZcbiAgICAgICAgZmllbGREZWZpbml0aW9uLmRhdGEubGVuZ3RoID4gMSAmJlxuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YS5maWx0ZXIoXG4gICAgICAgICAgKHZhbGlkYXRpb25GdW5jdGlvbiwgaW5kZXgpID0+XG4gICAgICAgICAgICBpbmRleCA+IDAgJiYgdHlwZW9mIHZhbGlkYXRpb25GdW5jdGlvbiA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICApLmxlbmd0aCA+IDBcbiAgICAgICkge1xuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YVxuICAgICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgICAodmFsaWRhdGlvbkZ1bmN0aW9uLCBpbmRleCkgPT5cbiAgICAgICAgICAgICAgaW5kZXggPiAwICYmIHR5cGVvZiB2YWxpZGF0aW9uRnVuY3Rpb24gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICApXG4gICAgICAgICAgLmZvckVhY2godmFsaWRhdGlvbkZ1bmN0aW9uID0+XG4gICAgICAgICAgICBmaWVsZERlZmluaXRpb24udmFsaWRhdGlvbkZ1bmN0aW9ucy5wdXNoKHZhbGlkYXRpb25GdW5jdGlvbilcbiAgICAgICAgICApO1xuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YSA9IGZpZWxkRGVmaW5pdGlvbi5kYXRhWzBdO1xuICAgICAgfVxuXG4gICAgICB2YWxpZGF0aW9uR3JvdXBNZXRhZGF0YXMuZm9yRWFjaCh2YWxpZGF0aW9uTWV0YWRhdGEgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLnByb3BlcnR5TmFtZSA9PT0gZmllbGROYW1lICYmXG4gICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgIT09IFZhbGlkYXRpb25LZXlzLmNvbmRpdGlvbmFsLnR5cGVcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy8gQWRkIGFsbCB2YWxpZGF0aW9uIHRvIHRoZSBmaWVsZCBleGNlcHQgdGhlIEBOZXN0ZWRWYWxpZGF0aW9uIGRlZmluaXRpb24gYXNcbiAgICAgICAgICAvLyBiZWluZyBwYXJ0IG9mIHRoZSBmb3JtIHdvdWxkIGltcGx5IGl0IGlzIHZhbGlkYXRlZCBpZiBhbnkgb3RoZXIgcnVsZXMgYXJlIHByZXNlbnRcbiAgICAgICAgICBpZiAodmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgIT09IFZhbGlkYXRpb25LZXlzLm5lc3RlZC50eXBlKSB7XG4gICAgICAgICAgICBmaWVsZERlZmluaXRpb24udmFsaWRhdGlvbkRlZmluaXRpb25zLnB1c2godmFsaWRhdGlvbk1ldGFkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IHR5cGVLZXkgaW4gVmFsaWRhdGlvblR5cGVzKSB7XG4gICAgICAgICAgICBpZiAoVmFsaWRhdGlvblR5cGVzLmhhc093blByb3BlcnR5KHR5cGVLZXkpKSB7XG4gICAgICAgICAgICAgIC8vIEhhbmRsZSBOZXN0ZWQgVmFsaWRhdGlvblxuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY2hlY2tXaXRoQWxsTmVzdGVkVmFsaWRhdGlvbnMoXG4gICAgICAgICAgICAgICAgICBhbGxOZXN0ZWRWYWxpZGF0aW9ucyxcbiAgICAgICAgICAgICAgICAgIG5lc3RlZEdyb3VwVmFsaWRhdGlvbnMsXG4gICAgICAgICAgICAgICAgICBmaWVsZE5hbWVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmIChpc05lc3RlZFZhbGlkYXRlKHZhbGlkYXRpb25NZXRhZGF0YSwgdHlwZUtleSkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG9iamVjdFRvVmFsaWRhdGUgPVxuICAgICAgICAgICAgICAgICAgICBmaWVsZHNbZmllbGROYW1lXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICA/IGZpZWxkc1tmaWVsZE5hbWVdLm9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgY29uc3QgbmVzdGVkVmFsaWRhdGUgPSBjcmVhdGVOZXN0ZWRWYWxpZGF0ZShcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0VG9WYWxpZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgc2V0RmllbGREYXRhKGZpZWxkTmFtZSwgZmllbGREZWZpbml0aW9uLCBuZXN0ZWRWYWxpZGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gSGFuZGxlIEN1c3RvbSBWYWxpZGF0aW9uXG4gICAgICAgICAgICAgIGlmIChpc0N1c3RvbVZhbGlkYXRlKHZhbGlkYXRpb25NZXRhZGF0YSwgdHlwZUtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXN0b21WYWxpZGF0aW9uID0gY3JlYXRlQ3VzdG9tVmFsaWRhdGlvbihcbiAgICAgICAgICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25NZXRhZGF0YVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgc2V0RmllbGREYXRhKGZpZWxkTmFtZSwgZmllbGREZWZpbml0aW9uLCBjdXN0b21WYWxpZGF0aW9uKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIEhhbmRsZSByZW1haW5pbmcgdmFsaWRhdGlvblxuICAgICAgICAgICAgICBpZiAoaXNEeW5hbWljVmFsaWRhdGUodmFsaWRhdGlvbk1ldGFkYXRhLCB0eXBlS2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGR5bmFtaWNWYWxpZGF0ZSA9IGNyZWF0ZUR5bmFtaWNWYWxpZGF0ZShcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbmFsVmFsaWRhdGlvbnMsXG4gICAgICAgICAgICAgICAgICBmaWVsZE5hbWVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHNldEZpZWxkRGF0YShmaWVsZE5hbWUsIGZpZWxkRGVmaW5pdGlvbiwgZHluYW1pY1ZhbGlkYXRlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBDb252ZXJ0IHRvIGEgc3RydWN0dXJlLCBhbmd1bGFyIHVuZGVyc3RhbmRzXG4gICAgICBpZiAoXG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbi5kYXRhIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCB8fFxuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YSBpbnN0YW5jZW9mIEZvcm1BcnJheVxuICAgICAgKSB7XG4gICAgICAgIGZvcm1Hcm91cEZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGREZWZpbml0aW9uLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtR3JvdXBGaWVsZHNbZmllbGROYW1lXSA9IG5ldyBGb3JtQ29udHJvbENsYXNzKGZpZWxkRGVmaW5pdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgcmV0dXJuIGZvcm1Hcm91cEZpZWxkcztcblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gTG9jYWwgSGVscGVyIGZ1bmN0aW9ucyB0byBoZWxwIG1ha2UgdGhlIG1haW4gY29kZSBtb3JlIHJlYWRhYmxlXG4gIC8vXG5cbiAgZnVuY3Rpb24gY3JlYXRlTmVzdGVkVmFsaWRhdGUoXG4gICAgb2JqZWN0VG9WYWxpZGF0ZTogYW55LFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhXG4gICkge1xuICAgIHJldHVybiBmdW5jdGlvbihjb250cm9sOiBGb3JtQ29udHJvbCkge1xuICAgICAgY29uc3QgaXNWYWxpZCA9XG4gICAgICAgIGdldFZhbGlkYXRlRXJyb3JzKFxuICAgICAgICAgIGNvbnRyb2wsXG4gICAgICAgICAgb2JqZWN0VG9WYWxpZGF0ZSAhPT0gdW5kZWZpbmVkID8gb2JqZWN0VG9WYWxpZGF0ZSA6IGNvbnRyb2wudmFsdWUsXG4gICAgICAgICAgdmFsaWRhdG9yT3B0aW9ucyBhcyBWYWxpZGF0b3JPcHRpb25zXG4gICAgICAgICkubGVuZ3RoID09PSAwO1xuICAgICAgcmV0dXJuIGdldElzVmFsaWRSZXN1bHQoaXNWYWxpZCwgdmFsaWRhdGlvbk1ldGFkYXRhLCAnbmVzdGVkVmFsaWRhdGUnKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRHluYW1pY1ZhbGlkYXRlKFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgIGNvbmRpdGlvbmFsVmFsaWRhdGlvbnM6IFZhbGlkYXRpb25NZXRhZGF0YVtdLFxuICAgIGZpZWxkTmFtZTogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiBmdW5jdGlvbihjb250cm9sOiBGb3JtQ29udHJvbCkge1xuICAgICAgaWYgKCFjb250cm9sKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBsZXQgaXNWYWxpZCA9XG4gICAgICAgIGNvbnRyb2wucGFyZW50ICYmIGNvbnRyb2wucGFyZW50LnZhbHVlXG4gICAgICAgICAgPyB2YWxpZGF0b3IudmFsaWRhdGVWYWx1ZUJ5TWV0YWRhdGEoY29udHJvbC52YWx1ZSwgdmFsaWRhdGlvbk1ldGFkYXRhKVxuICAgICAgICAgIDogdHJ1ZTtcblxuICAgICAgaWYgKCFpc1ZhbGlkICYmIGNvbmRpdGlvbmFsVmFsaWRhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZUVycm9ycyA9IHNldE9iamVjdFZhbHVlQW5kR2V0VmFsaWRhdGlvbkVycm9ycyhcbiAgICAgICAgICBjb250cm9sLFxuICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICB2YWxpZGF0b3JPcHRpb25zIGFzIFZhbGlkYXRvck9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgICAgaXNWYWxpZCA9XG4gICAgICAgICAgdmFsaWRhdGVFcnJvcnMuZmlsdGVyKFxuICAgICAgICAgICAgKGVycm9yOiBWYWxpZGF0aW9uRXJyb3IpID0+IGVycm9yLnByb3BlcnR5ID09PSBmaWVsZE5hbWVcbiAgICAgICAgICApLmxlbmd0aCA9PT0gMDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdldElzVmFsaWRSZXN1bHQoaXNWYWxpZCwgdmFsaWRhdGlvbk1ldGFkYXRhLCAnZHluYW1pY1ZhbGlkYXRlJyk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUN1c3RvbVZhbGlkYXRpb24oXG4gICAgZmllbGROYW1lOiBzdHJpbmcsXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGFcbiAgKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRyb2w6IEZvcm1Db250cm9sKSB7XG4gICAgICBjb25zdCB2YWxpZGF0ZUVycm9yczogVmFsaWRhdGlvbkVycm9yW10gPSBzZXRPYmplY3RWYWx1ZUFuZEdldFZhbGlkYXRpb25FcnJvcnMoXG4gICAgICAgIGNvbnRyb2wsXG4gICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgdmFsaWRhdG9yT3B0aW9ucyBhcyBWYWxpZGF0b3JPcHRpb25zXG4gICAgICApO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGdldEFsbEVycm9ycyh2YWxpZGF0ZUVycm9ycywgZmllbGROYW1lKS5sZW5ndGggPT09IDA7XG4gICAgICByZXR1cm4gZ2V0SXNWYWxpZFJlc3VsdChpc1ZhbGlkLCB2YWxpZGF0aW9uTWV0YWRhdGEsICdjdXN0b21WYWxpZGF0aW9uJyk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrV2l0aEFsbE5lc3RlZFZhbGlkYXRpb25zKFxuICAgIGFsbE5lc3RlZFZhbGlkYXRpb25zOiBWYWxpZGF0aW9uTWV0YWRhdGFbXSxcbiAgICBuZXN0ZWRWYWxpZGF0aW9uczogVmFsaWRhdGlvbk1ldGFkYXRhW10sXG4gICAga2V5OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGFsbE5lc3RlZFZhbGlkYXRpb25zLmxlbmd0aCA9PT0gbmVzdGVkVmFsaWRhdGlvbnMubGVuZ3RoIHx8XG4gICAgICAoKGZpZWxkc1trZXldIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCB8fFxuICAgICAgICBmaWVsZHNba2V5XSBpbnN0YW5jZW9mIEZvcm1BcnJheSkgJiZcbiAgICAgICAgYWxsTmVzdGVkVmFsaWRhdGlvbnMubGVuZ3RoID4gMCAmJiBuZXN0ZWRWYWxpZGF0aW9ucy5sZW5ndGggPT09IDApXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRHluYW1pY1ZhbGlkYXRlKFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgIHR5cGVLZXk6IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gKFxuICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgPT09IFZhbGlkYXRpb25UeXBlc1t0eXBlS2V5XSAmJlxuICAgICAgdmFsaWRhdG9yW3ZhbGlkYXRpb25NZXRhZGF0YS50eXBlXSAhPT0gdW5kZWZpbmVkXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtYXJrZWQgd2l0aCBAVmFsaWRhdGUoLi4uKVxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vdHlwZXN0YWNrL2NsYXNzLXZhbGlkYXRvciNjdXN0b20tdmFsaWRhdGlvbi1jbGFzc2VzXG4gICAqL1xuICBmdW5jdGlvbiBpc0N1c3RvbVZhbGlkYXRlKFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgIHR5cGVLZXk6IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gKFxuICAgICAgaXNOb3RQcm9wZXJ0eVZhbGlkYXRpb24odmFsaWRhdGlvbk1ldGFkYXRhLCB0eXBlS2V5KSAmJlxuICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgPT09IFZhbGlkYXRpb25LZXlzLmN1c3RvbS50eXBlICYmXG4gICAgICB0eXBlS2V5ID09PSBWYWxpZGF0aW9uS2V5cy5jdXN0b20udHlwZUtleVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogbWFya2VkIHdpdGggQFZhbGlkYXRlTmVzdGVkKClcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3R5cGVzdGFjay9jbGFzcy12YWxpZGF0b3IjdmFsaWRhdGluZy1uZXN0ZWQtb2JqZWN0c1xuICAgKi9cbiAgZnVuY3Rpb24gaXNOZXN0ZWRWYWxpZGF0ZShcbiAgICB2YWxpZGF0aW9uTWV0YWRhdGE6IFZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICB0eXBlS2V5OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGlzTm90UHJvcGVydHlWYWxpZGF0aW9uKHZhbGlkYXRpb25NZXRhZGF0YSwgdHlwZUtleSkgJiZcbiAgICAgIHZhbGlkYXRpb25NZXRhZGF0YS50eXBlID09PSBWYWxpZGF0aW9uS2V5cy5uZXN0ZWQudHlwZSAmJlxuICAgICAgdHlwZUtleSA9PT0gVmFsaWRhdGlvbktleXMubmVzdGVkLnR5cGVLZXlcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb3RQcm9wZXJ0eVZhbGlkYXRpb24oXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGEsXG4gICAgdHlwZUtleTogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiAoXG4gICAgICB2YWxpZGF0aW9uTWV0YWRhdGEudHlwZSA9PT0gVmFsaWRhdGlvblR5cGVzW3R5cGVLZXldICYmXG4gICAgICB2YWxpZGF0b3JbdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGVdID09PSB1bmRlZmluZWRcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RmllbGREYXRhKFxuICAgIGZpZWxkTmFtZTogc3RyaW5nLFxuICAgIGZpZWxkRGVmaW5pdGlvbjogRHluYW1pY0Zvcm1Hcm91cEZpZWxkLFxuICAgIHZhbGlkYXRpb25GdW5jdGlvbjogRnVuY3Rpb25cbiAgKSB7XG4gICAgLyogdG9kbzogbWF5YmUgbm90IG5lZWQsIGlmIGVuYWJsZSB0aGlzIGNvZGUsIGV4cGVyZW1lbnRhbCBtb2RlIG5vdCB3b3JrXG4gICAgaWYgKGZpZWxkc1tmaWVsZE5hbWVdIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgZmllbGRzW2ZpZWxkTmFtZV0ub2JqZWN0ID0gZmllbGRzW2ZpZWxkTmFtZV0uZmllbGRzO1xuICAgIH0qL1xuXG4gICAgLy8gRmlsbCBmaWVsZCBkYXRhIGlmIGVtcHR5XG4gICAgaWYgKGZpZWxkRGVmaW5pdGlvbi5kYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZpZWxkRGVmaW5pdGlvbi5kYXRhID0gZmllbGRzW2ZpZWxkTmFtZV07XG4gICAgfVxuXG4gICAgZmllbGREZWZpbml0aW9uLnZhbGlkYXRpb25GdW5jdGlvbnMucHVzaCh2YWxpZGF0aW9uRnVuY3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QWxsRXJyb3JzKFxuICAgIHZhbGlkYXRlRXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JbXSxcbiAgICBmaWVsZE5hbWU6IHN0cmluZ1xuICApOiBWYWxpZGF0aW9uRXJyb3JbXSB7XG4gICAgcmV0dXJuIHZhbGlkYXRlRXJyb3JzLmZpbHRlcihcbiAgICAgIChlcnJvcjogVmFsaWRhdGlvbkVycm9yKSA9PlxuICAgICAgICAvLyBDaGVjayBmb3IgbmVzdGVkL2NoaWxkIGVycm9yc1xuICAgICAgICAoZXJyb3IuY2hpbGRyZW4ubGVuZ3RoICYmXG4gICAgICAgICAgZXJyb3IuY2hpbGRyZW4uZmlsdGVyKGNoaWxkcmVuID0+IGNoaWxkcmVuLnByb3BlcnR5ID09PSBmaWVsZE5hbWUpKSB8fFxuICAgICAgICBlcnJvci5wcm9wZXJ0eSA9PT0gZmllbGROYW1lXG4gICAgKTtcbiAgfVxufVxuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIEdsb2JhbCBIZWxwZXIgZnVuY3Rpb25zXG4vL1xuXG5mdW5jdGlvbiBpc1Byb3BlcnR5VmFsaWRhdG9yT2ZUeXBlKFxuICB2YWxpZGF0aW9uTWV0YWRhdGE6IFZhbGlkYXRpb25NZXRhZGF0YSxcbiAgZmllbGROYW1lOiBzdHJpbmcsXG4gIHZhbGlkYXRpb25NZXRhZGF0YVR5cGU6IHN0cmluZ1xuKSB7XG4gIHJldHVybiAoXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhLnByb3BlcnR5TmFtZSA9PT0gZmllbGROYW1lICYmXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgPT09IHZhbGlkYXRpb25NZXRhZGF0YVR5cGVcbiAgKTtcbn1cblxuZnVuY3Rpb24gc2V0T2JqZWN0VmFsdWVBbmRHZXRWYWxpZGF0aW9uRXJyb3JzKFxuICBjb250cm9sOiBGb3JtQ29udHJvbCxcbiAga2V5OiBzdHJpbmcsXG4gIHZhbGlkYXRvck9wdGlvbnM6IFZhbGlkYXRvck9wdGlvbnNcbikge1xuICBjb25zdCBvYmplY3QgPVxuICAgIGNvbnRyb2wucGFyZW50IGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cFxuICAgICAgPyAoY29udHJvbC5wYXJlbnQgYXMgRHluYW1pY0Zvcm1Hcm91cDxhbnk+KS5vYmplY3RcbiAgICAgIDogY29udHJvbC5wYXJlbnRcbiAgICAgID8gY29udHJvbC5wYXJlbnQudmFsdWVcbiAgICAgIDoge307XG5cbiAgaWYgKG9iamVjdCkge1xuICAgIG9iamVjdFtrZXldID0gY29udHJvbC52YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBnZXRWYWxpZGF0ZUVycm9ycyhjb250cm9sLCBvYmplY3QsIHZhbGlkYXRvck9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBnZXRWYWxpZGF0ZUVycm9ycyhcbiAgY29udHJvbDogRm9ybUNvbnRyb2wsXG4gIGRhdGFUb1ZhbGlkYXRlOiBhbnksXG4gIHZhbGlkYXRvck9wdGlvbnM6IFZhbGlkYXRvck9wdGlvbnNcbikge1xuICBjb25zdCB2YWxpZGF0ZUVycm9yczogVmFsaWRhdGlvbkVycm9yW10gPVxuICAgIGNvbnRyb2wucGFyZW50ICYmIGNvbnRyb2wucGFyZW50LnZhbHVlXG4gICAgICA/IHZhbGlkYXRlU3luYyhkYXRhVG9WYWxpZGF0ZSwgdmFsaWRhdG9yT3B0aW9ucylcbiAgICAgIDogW107XG4gIHJldHVybiB2YWxpZGF0ZUVycm9ycztcbn1cblxuZnVuY3Rpb24gZ2V0SXNWYWxpZFJlc3VsdChcbiAgaXNWYWxpZDogYm9vbGVhbixcbiAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGEsXG4gIGVycm9yVHlwZTogRXJyb3JQcm9wZXJ0eU5hbWVcbikge1xuICByZXR1cm4gaXNWYWxpZFxuICAgID8gbnVsbFxuICAgIDoge1xuICAgICAgICBbZXJyb3JUeXBlXToge1xuICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICB0eXBlOiB2YWxpZGF0aW9uTWV0YWRhdGEudHlwZVxuICAgICAgICB9XG4gICAgICB9O1xufVxuXG50eXBlIEVycm9yUHJvcGVydHlOYW1lID1cbiAgfCAnbmVzdGVkVmFsaWRhdGUnXG4gIHwgJ2N1c3RvbVZhbGlkYXRpb24nXG4gIHwgJ2R5bmFtaWNWYWxpZGF0ZSc7XG5cbmNvbnN0IFZhbGlkYXRpb25LZXlzID0ge1xuICBuZXN0ZWQ6IHtcbiAgICB0eXBlOiAnbmVzdGVkVmFsaWRhdGlvbicsXG4gICAgdHlwZUtleTogJ05FU1RFRF9WQUxJREFUSU9OJ1xuICB9LFxuICBjb25kaXRpb25hbDoge1xuICAgIHR5cGU6ICdjb25kaXRpb25hbFZhbGlkYXRpb24nXG4gIH0sXG4gIGN1c3RvbToge1xuICAgIHR5cGU6ICdjdXN0b21WYWxpZGF0aW9uJyxcbiAgICB0eXBlS2V5OiAnQ1VTVE9NX1ZBTElEQVRJT04nXG4gIH1cbn07XG4iXX0=