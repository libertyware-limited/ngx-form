import * as tslib_1 from "tslib";
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { classToClass, plainToClass } from 'class-transformer';
import { getFromContainer, MetadataStorage, validate, validateSync, ValidationTypes, Validator } from 'class-validator';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWdyb3VwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLWJ1aWxkZXIvIiwic291cmNlcyI6WyJ1dGlscy9keW5hbWljLWZvcm0tZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFJTCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFdBQVcsRUFDWCxTQUFTLEVBRVYsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRS9ELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLFFBQVEsRUFDUixZQUFZLEVBRVosZUFBZSxFQUNmLFNBQVMsRUFFVixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBVWhELE9BQU8sRUFDTCxjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3JCLE1BQU0seUNBQXlDLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFpQixvQkFBb0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWpGLE9BQU8sU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBQ3pDLE9BQU8sU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBT3pDO0lBQThDLDRDQUFTO0lBY3JELDBCQUNTLFlBQStCLEVBQy9CLE1BQXlCLEVBQ2hDLGVBSVEsRUFDUixjQUE2RDtRQVIvRCxZQVVFLGtCQUFNLEVBQUUsRUFBRSxlQUFlLEVBQUUsY0FBYyxDQUFDLFNBcUIzQztRQTlCUSxrQkFBWSxHQUFaLFlBQVksQ0FBbUI7UUFDL0IsWUFBTSxHQUFOLE1BQU0sQ0FBbUI7UUFmM0IsMEJBQW9CLEdBQUcsSUFBSSxlQUFlLENBQWEsRUFBRSxDQUFDLENBQUM7UUFDM0QsMEJBQW9CLEdBQUcsSUFBSSxlQUFl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IEFic3RyYWN0Q29udHJvbCxcbiAgQWJzdHJhY3RDb250cm9sT3B0aW9ucyxcbiAgQXN5bmNWYWxpZGF0b3JGbixcbiAgRm9ybUFycmF5LFxuICBGb3JtQnVpbGRlcixcbiAgRm9ybUNvbnRyb2wsXG4gIEZvcm1Hcm91cCxcbiAgVmFsaWRhdG9yRm5cbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgY2xhc3NUb0NsYXNzLCBwbGFpblRvQ2xhc3MgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBDbGFzc1R5cGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lci9DbGFzc1RyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIGdldEZyb21Db250YWluZXIsXG4gIE1ldGFkYXRhU3RvcmFnZSxcbiAgdmFsaWRhdGUsXG4gIHZhbGlkYXRlU3luYyxcbiAgVmFsaWRhdGlvbkVycm9yLFxuICBWYWxpZGF0aW9uVHlwZXMsXG4gIFZhbGlkYXRvcixcbiAgVmFsaWRhdG9yT3B0aW9uc1xufSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xuaW1wb3J0IHsgVmFsaWRhdGlvbk1ldGFkYXRhIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yL21ldGFkYXRhL1ZhbGlkYXRpb25NZXRhZGF0YSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIERpY3Rpb25hcnksXG59IGZyb20gJy4uL21vZGVscy9kaWN0aW9uYXJ5JztcbmltcG9ydCB7XG4gIFNob3J0VmFsaWRhdGlvbkVycm9ycyxcbn0gZnJvbSAnLi4vbW9kZWxzL3Nob3J0LXZhbGlkYXRpb24tZXJyb3JzJztcbmltcG9ydCB7XG4gIER5bmFtaWNGb3JtR3JvdXBGaWVsZCxcbn0gZnJvbSAnLi4vbW9kZWxzL2R5bmFtaWMtZm9ybS1ncm91cC1maWVsZCc7XG5pbXBvcnQge1xuICBmb3JldmVySW52YWxpZCxcbiAgRk9SRVZFUl9JTlZBTElEX05BTUVcbn0gZnJvbSAnLi4vdmFsaWRhdG9ycy9mb3JldmVyLWludmFsaWQudmFsaWRhdG9yJztcbmltcG9ydCB7IER5bmFtaWNGb3JtQ29udHJvbCB9IGZyb20gJy4vZHluYW1pYy1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgV2lkZ2V0T3B0aW9ucywgZ2V0Rm9ybUZpZWxkc09wdGlvbnMgfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tY29yZSc7XG5cbmltcG9ydCBjbG9uZURlZXAgZnJvbSAnbG9kYXNoLmNsb25lZGVlcCc7XG5pbXBvcnQgbWVyZ2VXaXRoIGZyb20gJ2xvZGFzaC5tZXJnZXdpdGgnO1xuXG4vLyBFbmZvcmNlcyB0aGUgcHJvcGVydGllcyBvZiB0aGUgb2JqZWN0LCBpZiBzdXBwbGllZCwgdG8gYmUgb2YgdGhlIG9yaWdpbmFsIHR5cGUgb3IgRHluYW1pY0Zvcm1Hcm91cCBvciwgRm9ybUFycmF5XG5leHBvcnQgdHlwZSBGb3JtTW9kZWw8VD4gPSB7XG4gIFtQIGluIGtleW9mIFRdPzogVFtQXSB8IER5bmFtaWNGb3JtR3JvdXA8YW55PiB8IEZvcm1BcnJheTtcbn07XG5cbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUdyb3VwPFRNb2RlbD4gZXh0ZW5kcyBGb3JtR3JvdXAge1xuICBwdWJsaWMgbmF0aXZlVmFsaWRhdGVFcnJvcnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERpY3Rpb25hcnk+KHt9KTtcbiAgcHVibGljIGN1c3RvbVZhbGlkYXRlRXJyb3JzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTaG9ydFZhbGlkYXRpb25FcnJvcnM+KHt9KTtcbiAgcHVibGljIGZvcm1FcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgZm9ybUZpZWxkczogRGljdGlvbmFyeTtcbiAgcHVibGljIG9iamVjdENoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgcHJvdGVjdGVkIEZvcm1Db250cm9sQ2xhc3MgPSBEeW5hbWljRm9ybUNvbnRyb2w7XG4gIHByb3RlY3RlZCBfb2JqZWN0OiBUTW9kZWwgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkIF9leHRlcm5hbEVycm9yczogU2hvcnRWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCBfdmFsaWRhdG9yT3B0aW9uczogVmFsaWRhdG9yT3B0aW9ucyB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgX2ZiID0gbmV3IEZvcm1CdWlsZGVyKCk7XG4gIHByaXZhdGUgX2Zvcm1HZW46IFdpZGdldE9wdGlvbnNbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZmFjdG9yeU1vZGVsOiBDbGFzc1R5cGU8VE1vZGVsPixcbiAgICBwdWJsaWMgZmllbGRzOiBGb3JtTW9kZWw8VE1vZGVsPixcbiAgICB2YWxpZGF0b3JPck9wdHM/OlxuICAgICAgfCBWYWxpZGF0b3JGblxuICAgICAgfCBWYWxpZGF0b3JGbltdXG4gICAgICB8IEFic3RyYWN0Q29udHJvbE9wdGlvbnNcbiAgICAgIHwgbnVsbCxcbiAgICBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm4gfCBBc3luY1ZhbGlkYXRvckZuW10gfCBudWxsXG4gICkge1xuICAgIHN1cGVyKHt9LCB2YWxpZGF0b3JPck9wdHMsIGFzeW5jVmFsaWRhdG9yKTtcbiAgICAvKlxuICAgIGNvbnN0IGNsYXNzVmFsaWRhdG9ycyA9IER5bmFtaWNGb3JtR3JvdXAuZ2V0Q2xhc3NWYWxpZGF0b3JzPFRNb2RlbD4oXG4gICAgICB0aGlzLmZhY3RvcnlNb2RlbCxcbiAgICAgIHRoaXMuZmllbGRzLFxuICAgICAgdGhpcy5kZWZhdWx0VmFsaWRhdG9yT3B0aW9uc1xuICAgICk7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZmIuZ3JvdXAoXG4gICAgICBjbGFzc1ZhbGlkYXRvcnNcbiAgICApO1xuICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpcy5hZGRDb250cm9sKGtleSwgZm9ybUdyb3VwLmNvbnRyb2xzW2tleV0pO1xuICAgIH0pO1xuICAgIHRoaXMudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIHRoaXMudmFsaWRhdGUoXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgdGhpcy5kZWZhdWx0VmFsaWRhdG9yT3B0aW9uc1xuICAgICAgKTtcbiAgICB9KTsqL1xuICAgIHRoaXMuZm9ybUZpZWxkcyA9IHRoaXMub25seUZpZWxkcyhmaWVsZHMpO1xuICAgIHRoaXMuX2Zvcm1HZW4gPSBnZXRGb3JtRmllbGRzT3B0aW9ucyhmYWN0b3J5TW9kZWwpO1xuICB9XG5cbiAgZ2V0Rm9ybUdlbkRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1HZW47XG4gIH1cblxuICAvLyBHZXR0ZXJzICYgU2V0dGVyc1xuICBzZXQgZXh0ZXJuYWxFcnJvcnMoZXh0ZXJuYWxFcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycyB8IG51bGwpIHtcbiAgICB0aGlzLl9leHRlcm5hbEVycm9ycyA9IGV4dGVybmFsRXJyb3JzO1xuICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgfVxuICBnZXQgZXh0ZXJuYWxFcnJvcnMoKTogU2hvcnRWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2V4dGVybmFsRXJyb3JzO1xuICB9XG5cbiAgc2V0IHZhbGlkYXRvck9wdGlvbnModmFsaWRhdG9yT3B0aW9uczogVmFsaWRhdG9yT3B0aW9ucyB8IG51bGwpIHtcbiAgICB0aGlzLl92YWxpZGF0b3JPcHRpb25zID0gdmFsaWRhdG9yT3B0aW9ucztcbiAgICB0aGlzLnZhbGlkYXRlKCk7XG4gIH1cbiAgZ2V0IHZhbGlkYXRvck9wdGlvbnMoKTogVmFsaWRhdG9yT3B0aW9ucyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0b3JPcHRpb25zO1xuICB9XG5cbiAgc2V0IG9iamVjdChvYmplY3Q6IFRNb2RlbCkge1xuICAgIHRoaXMuc2V0T2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgZ2V0IG9iamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPYmplY3QoKTtcbiAgfVxuXG4gIC8vIFB1YmxpYyBBUElcbiAgdmFsaWRhdGUoXG4gICAgZXh0ZXJuYWxFcnJvcnM/OiBTaG9ydFZhbGlkYXRpb25FcnJvcnMsXG4gICAgdmFsaWRhdG9yT3B0aW9ucz86IFZhbGlkYXRvck9wdGlvbnNcbiAgKSB7XG4gICAgdGhpcy52YWxpZGF0ZUFzeW5jKGV4dGVybmFsRXJyb3JzLCB2YWxpZGF0b3JPcHRpb25zKS50aGVuKFxuICAgICAgKCkgPT4ge30sXG4gICAgICBlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBhc3luYyB2YWxpZGF0ZUFzeW5jKFxuICAgIGV4dGVybmFsRXJyb3JzPzogU2hvcnRWYWxpZGF0aW9uRXJyb3JzLFxuICAgIHZhbGlkYXRvck9wdGlvbnM/OiBWYWxpZGF0b3JPcHRpb25zXG4gICkge1xuICAgIGlmIChleHRlcm5hbEVycm9ycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBleHRlcm5hbEVycm9ycyA9IGNsb25lRGVlcCh0aGlzLl9leHRlcm5hbEVycm9ycyk7XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkYXRvck9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsaWRhdG9yT3B0aW9ucyA9IGNsb25lRGVlcCh0aGlzLl92YWxpZGF0b3JPcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoIWV4dGVybmFsRXJyb3JzKSB7XG4gICAgICBleHRlcm5hbEVycm9ycyA9IHt9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB2YWxpZGF0ZSh0aGlzLm9iamVjdCwgdmFsaWRhdG9yT3B0aW9ucyk7XG4gICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3JzID0gdGhpcy50cmFuc2Zvcm1WYWxpZGF0aW9uRXJyb3JzKHJlc3VsdCk7XG4gICAgICBjb25zdCBhbGxFcnJvcnMgPSB0aGlzLm1lcmdlRXJyb3JzKGV4dGVybmFsRXJyb3JzLCB2YWxpZGF0aW9uRXJyb3JzKTtcblxuICAgICAgdGhpcy5tYXJrQXNJbnZhbGlkRm9yRXh0ZXJuYWxFcnJvcnMoZXh0ZXJuYWxFcnJvcnMpO1xuICAgICAgdGhpcy5zZXRDdXN0b21FcnJvcnMoYWxsRXJyb3JzKTtcblxuICAgICAgLy8gdG9kbzogcmVmYWN0b3IsIGludmFsaWRhdGUgZm9ybSBpZiBleGlzdHMgYW55IGFsbEVycm9yc1xuICAgICAgbGV0IHVzZWRGb3JldmVySW52YWxpZCA9IGZhbHNlO1xuICAgICAgaWYgKFxuICAgICAgICBPYmplY3Qua2V5cyhhbGxFcnJvcnMpLmZpbHRlcihrZXkgPT4ga2V5ICE9PSBGT1JFVkVSX0lOVkFMSURfTkFNRSlcbiAgICAgICAgICAubGVuZ3RoID09PSAwICYmXG4gICAgICAgIHRoaXMuZ2V0KEZPUkVWRVJfSU5WQUxJRF9OQU1FKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ29udHJvbChGT1JFVkVSX0lOVkFMSURfTkFNRSk7XG4gICAgICAgIHVzZWRGb3JldmVySW52YWxpZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudmFsaWQgJiZcbiAgICAgICAgT2JqZWN0LmtleXMoYWxsRXJyb3JzKS5sZW5ndGggPiAwICYmXG4gICAgICAgICF0aGlzLmdldChGT1JFVkVSX0lOVkFMSURfTkFNRSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLmFkZENvbnRyb2woXG4gICAgICAgICAgRk9SRVZFUl9JTlZBTElEX05BTUUsXG4gICAgICAgICAgbmV3IEZvcm1Db250cm9sKCcnLCBbZm9yZXZlckludmFsaWQgYXMgYW55XSlcbiAgICAgICAgKTtcbiAgICAgICAgdXNlZEZvcmV2ZXJJbnZhbGlkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh1c2VkRm9yZXZlckludmFsaWQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtcbiAgICAgICAgICBvbmx5U2VsZjogdHJ1ZSxcbiAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBzZXRDdXN0b21FcnJvcnMoYWxsRXJyb3JzOiBhbnkpIHtcbiAgICB0aGlzLmZvcm1FcnJvcnMgPSBhbGxFcnJvcnM7XG4gICAgdGhpcy5jdXN0b21WYWxpZGF0ZUVycm9ycy5uZXh0KHRoaXMuZm9ybUVycm9ycyBhcyBTaG9ydFZhbGlkYXRpb25FcnJvcnMgKTtcbiAgICB0aGlzLm5hdGl2ZVZhbGlkYXRlRXJyb3JzLm5leHQodGhpcy5jb2xsZWN0RXJyb3JzKHRoaXMpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb2xsZWN0RXJyb3JzKGNvbnRyb2w6IERpY3Rpb25hcnksIGlzUm9vdCA9IHRydWUpOiBhbnkgfCBudWxsIHtcbiAgICBpZiAoY29udHJvbC5jb250cm9scykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uKGlzUm9vdCA/IHRoaXMuZXJyb3JzIDoge30pLFxuICAgICAgICAuLi5PYmplY3QuZW50cmllcyhjb250cm9sLmNvbnRyb2xzKS5yZWR1Y2UoXG4gICAgICAgICAgKGFjYzogYW55LCBba2V5LCBjaGlsZENvbnRyb2xdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZEVycm9ycyA9IHRoaXMuY29sbGVjdEVycm9ycyhjaGlsZENvbnRyb2wgYXMgRGljdGlvbmFyeTxhbnk+LCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNoaWxkRXJyb3JzICYmXG4gICAgICAgICAgICAgIGtleSAhPT0gJ2ZvcmV2ZXJJbnZhbGlkJyAmJlxuICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjaGlsZEVycm9ycykubGVuZ3RoID4gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGFjYyA9IHtcbiAgICAgICAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgICAgICAgW2tleV06IHtcbiAgICAgICAgICAgICAgICAgIC4uLihhY2MgJiYgYWNjW2tleV0gPyBhY2Nba2V5XSA6IHt9KSxcbiAgICAgICAgICAgICAgICAgIC4uLmNoaWxkRXJyb3JzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9LFxuICAgICAgICAgIHt9XG4gICAgICAgIClcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb250cm9sLmVycm9ycztcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUFsbEZvcm1GaWVsZHMoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5jb250cm9scykuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXQoZmllbGQpO1xuXG4gICAgICAvLyBDb250cm9sXG4gICAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XG4gICAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgfVxuICAgICAgLy8gR3JvdXA6IHJlY3Vyc2l2ZVxuICAgICAgZWxzZSBpZiAoY29udHJvbCBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgY29udHJvbC52YWxpZGF0ZUFsbEZvcm1GaWVsZHMoKTtcbiAgICAgIH1cbiAgICAgIC8vIEFycmF5XG4gICAgICBlbHNlIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9scy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vIENvbnRyb2wgaW4gQXJyYXlcbiAgICAgICAgICBpZiAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBhcyBGb3JtQ29udHJvbCkubWFya0FzVG91Y2hlZCh7XG4gICAgICAgICAgICAgIG9ubHlTZWxmOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gR3JvdXAgaW4gQXJyYXk6IHJlY3Vyc2l2ZVxuICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXBcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgICgoY29udHJvbCBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW2ldIGFzIER5bmFtaWNGb3JtR3JvdXA8XG4gICAgICAgICAgICAgIGFueVxuICAgICAgICAgICAgPikudmFsaWRhdGVBbGxGb3JtRmllbGRzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXNldFZhbGlkYXRlQWxsRm9ybUZpZWxkcygpIHtcbiAgICB0aGlzLm1hcmtBc0ludmFsaWRGb3JFeHRlcm5hbEVycm9ycyh7fSk7XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldChmaWVsZCk7XG5cbiAgICAgIC8vIENvbnRyb2xcbiAgICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgY29udHJvbC5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICBjb250cm9sLm1hcmtBc1VudG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgICBjb250cm9sLm1hcmtBc1ByaXN0aW5lKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICB9XG4gICAgICAvLyBHcm91cDogcmVjdXJzaXZlXG4gICAgICBlbHNlIGlmIChjb250cm9sIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgICBjb250cm9sLnJlc2V0VmFsaWRhdGVBbGxGb3JtRmllbGRzKCk7XG4gICAgICB9XG4gICAgICAvLyBBcnJheVxuICAgICAgZWxzZSBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAvLyBDb250cm9sIGluIEFycmF5XG4gICAgICAgICAgaWYgKChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgKChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgIF0gYXMgRm9ybUNvbnRyb2wpLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgICAgICAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tcbiAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgXSBhcyBGb3JtQ29udHJvbCkubWFya0FzVW50b3VjaGVkKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICAgICAgICAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBhcyBGb3JtQ29udHJvbCkubWFya0FzUHJpc3RpbmUoe1xuICAgICAgICAgICAgICBvbmx5U2VsZjogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEdyb3VwIGluIEFycmF5OiByZWN1cnNpdmVcbiAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgIChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBhcyBEeW5hbWljRm9ybUdyb3VwPFxuICAgICAgICAgICAgICBhbnlcbiAgICAgICAgICAgID4pLnJlc2V0VmFsaWRhdGVBbGxGb3JtRmllbGRzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zZXRDdXN0b21FcnJvcnMoe30pO1xuICB9XG5cbiAgY2xhc3NUb0NsYXNzPFRDbGFzc01vZGVsPihvYmplY3Q6IFRDbGFzc01vZGVsKSB7XG4gICAgcmV0dXJuIGNsYXNzVG9DbGFzcyhvYmplY3QsIHsgaWdub3JlRGVjb3JhdG9yczogdHJ1ZSB9KTtcbiAgfVxuXG4gIHBsYWluVG9DbGFzczxUQ2xhc3NNb2RlbCwgT2JqZWN0PihcbiAgICBjbHM6IENsYXNzVHlwZTxUQ2xhc3NNb2RlbD4sXG4gICAgcGxhaW46IE9iamVjdFxuICApIHtcbiAgICByZXR1cm4gcGxhaW5Ub0NsYXNzKGNscywgcGxhaW4sIHsgaWdub3JlRGVjb3JhdG9yczogdHJ1ZSB9KTtcbiAgfVxuXG4gIGFzeW5jIHNldEV4dGVybmFsRXJyb3JzQXN5bmMoZXh0ZXJuYWxFcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycykge1xuICAgIHRoaXMuX2V4dGVybmFsRXJyb3JzID0gZXh0ZXJuYWxFcnJvcnM7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnZhbGlkYXRlQXN5bmMoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgc2V0RXh0ZXJuYWxFcnJvcnMoZXh0ZXJuYWxFcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycykge1xuICAgIHRoaXMuc2V0RXh0ZXJuYWxFcnJvcnNBc3luYyhleHRlcm5hbEVycm9ycykudGhlbihcbiAgICAgICgpID0+IHt9LFxuICAgICAgZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZ2V0RXh0ZXJuYWxFcnJvcnMoKTogU2hvcnRWYWxpZGF0aW9uRXJyb3JzIHtcbiAgICByZXR1cm4gdGhpcy5fZXh0ZXJuYWxFcnJvcnMgYXMgU2hvcnRWYWxpZGF0aW9uRXJyb3JzO1xuICB9XG5cbiAgY2xlYXJFeHRlcm5hbEVycm9ycygpIHtcbiAgICB0aGlzLnNldEV4dGVybmFsRXJyb3JzKHt9KTtcbiAgfVxuICBjbGVhckV4dGVybmFsRXJyb3JzQXN5bmMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0RXh0ZXJuYWxFcnJvcnNBc3luYyh7fSk7XG4gIH1cblxuICBhc3luYyBzZXRWYWxpZGF0b3JPcHRpb25zQXN5bmModmFsaWRhdG9yT3B0aW9uczogVmFsaWRhdG9yT3B0aW9ucykge1xuICAgIHRoaXMuX3ZhbGlkYXRvck9wdGlvbnMgPSB2YWxpZGF0b3JPcHRpb25zO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy52YWxpZGF0ZUFzeW5jKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbGlkYXRvck9wdGlvbnModmFsaWRhdG9yT3B0aW9uczogVmFsaWRhdG9yT3B0aW9ucykge1xuICAgIHRoaXMuc2V0VmFsaWRhdG9yT3B0aW9uc0FzeW5jKHZhbGlkYXRvck9wdGlvbnMpLnRoZW4oXG4gICAgICAoKSA9PiB7fSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGdldFZhbGlkYXRvck9wdGlvbnMoKTogVmFsaWRhdG9yT3B0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRvck9wdGlvbnMgYXMgVmFsaWRhdG9yT3B0aW9ucztcbiAgfVxuXG4gIC8vIEhlbHBlcnNcbiAgcHJvdGVjdGVkIG9ubHlGaWVsZHMoZmllbGRzOiBGb3JtTW9kZWw8YW55Pik6IERpY3Rpb25hcnkge1xuICAgIGNvbnN0IG5ld0ZpZWxkczogRGljdGlvbmFyeSA9IHt9O1xuXG4gICAgaWYgKGZpZWxkcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBPYmplY3Qua2V5cyhmaWVsZHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGZpZWxkc1trZXldIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgICAgIC8vIEdyb3VwOiByZWN1cnNpdmVcbiAgICAgICAgICBuZXdGaWVsZHNba2V5XSA9IHRoaXMub25seUZpZWxkcyhcbiAgICAgICAgICAgIChmaWVsZHNba2V5XSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT4pLmZvcm1GaWVsZHNcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEFycmF5XG4gICAgICAgICAgaWYgKGZpZWxkc1trZXldIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChmaWVsZHNba2V5XSBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzWzBdIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIC8vIEdyb3VwIHdpdGhpbiBBcnJheTogcmVjdXJzaXZlXG4gICAgICAgICAgICAgIG5ld0ZpZWxkc1trZXldID0gdGhpcy5vbmx5RmllbGRzKFxuICAgICAgICAgICAgICAgICgoZmllbGRzW2tleV0gYXMgRm9ybUFycmF5KS5jb250cm9sc1swXSBhcyBEeW5hbWljRm9ybUdyb3VwPFxuICAgICAgICAgICAgICAgICAgYW55XG4gICAgICAgICAgICAgICAgPikuZm9ybUZpZWxkc1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gQ29udHJvbCB3aXRoaW4gQXJyYXlcbiAgICAgICAgICAgICAgbmV3RmllbGRzW2tleV0gPSAoZmllbGRzW2tleV0gYXMgRm9ybUFycmF5KS5jb250cm9sc1swXS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSGFuZGxlIENvbnRyb2xcbiAgICAgICAgICAgIG5ld0ZpZWxkc1trZXldID0gZmllbGRzW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RmllbGRzO1xuICB9XG5cbiAgdHJhbnNmb3JtVmFsaWRhdGlvbkVycm9ycyhlcnJvcnM6IFZhbGlkYXRpb25FcnJvcltdKTogU2hvcnRWYWxpZGF0aW9uRXJyb3JzIHtcbiAgICBjb25zdCBjdXN0b21FcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycyA9IHt9O1xuXG4gICAgZXJyb3JzLmZvckVhY2goKGVycm9yOiBWYWxpZGF0aW9uRXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvciAmJiBlcnJvci5jb25zdHJhaW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGVycm9yLmNvbnN0cmFpbnRzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlmICghY3VzdG9tRXJyb3JzW2Vycm9yLnByb3BlcnR5XSkge1xuICAgICAgICAgICAgY3VzdG9tRXJyb3JzW2Vycm9yLnByb3BlcnR5XSA9IFtdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChjdXN0b21FcnJvcnNbZXJyb3IucHJvcGVydHldIGFzIHN0cmluZ1tdKS5pbmRleE9mKFxuICAgICAgICAgICAgICBlcnJvci5jb25zdHJhaW50c1trZXldXG4gICAgICAgICAgICApID09PSAtMVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgKGN1c3RvbUVycm9yc1tlcnJvci5wcm9wZXJ0eV0gYXMgc3RyaW5nW10pLnB1c2goXG4gICAgICAgICAgICAgIGVycm9yLmNvbnN0cmFpbnRzW2tleV1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9yLmNoaWxkcmVuICE9PSB1bmRlZmluZWQgJiYgZXJyb3IuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIGN1c3RvbUVycm9yc1tlcnJvci5wcm9wZXJ0eV0gPSB0aGlzLnRyYW5zZm9ybVZhbGlkYXRpb25FcnJvcnMoXG4gICAgICAgICAgZXJyb3IuY2hpbGRyZW5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjdXN0b21FcnJvcnM7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWVyZ2VFcnJvcnMoXG4gICAgZXh0ZXJuYWxFcnJvcnM/OiBTaG9ydFZhbGlkYXRpb25FcnJvcnMsXG4gICAgdmFsaWRhdGlvbkVycm9ycz86IFNob3J0VmFsaWRhdGlvbkVycm9yc1xuICApIHtcbiAgICBjb25zdCBjbG9uZWRFeHRlcm5hbEVycm9ycyA9IGNsb25lRGVlcChleHRlcm5hbEVycm9ycyk7XG4gICAgcmV0dXJuIG1lcmdlV2l0aChcbiAgICAgIGNsb25lZEV4dGVybmFsRXJyb3JzLFxuICAgICAgdmFsaWRhdGlvbkVycm9ycyxcbiAgICAgIChvYmpWYWx1ZSwgc3JjVmFsdWUpID0+IHtcbiAgICAgICAgaWYgKGNhbk1lcmdlKCkpIHtcbiAgICAgICAgICByZXR1cm4gb2JqVmFsdWUuY29uY2F0KHNyY1ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNhbk1lcmdlKCkge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KG9ialZhbHVlKSAmJlxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShzcmNWYWx1ZSkgJiZcbiAgICAgICAgICAgIG9ialZhbHVlLmZpbHRlcihvYmpJdGVtID0+IHNyY1ZhbHVlLmluZGV4T2Yob2JqSXRlbSkgIT09IC0xKVxuICAgICAgICAgICAgICAubGVuZ3RoID09PSAwXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFya0FzSW52YWxpZEZvckV4dGVybmFsRXJyb3JzKFxuICAgIGVycm9yczogU2hvcnRWYWxpZGF0aW9uRXJyb3JzLFxuICAgIGNvbnRyb2xzPzogRGljdGlvbmFyeTxBYnN0cmFjdENvbnRyb2w+XG4gICkge1xuICAgIGlmICghY29udHJvbHMpIHtcbiAgICAgIGNvbnRyb2xzID0gdGhpcy5jb250cm9scztcbiAgICB9XG4gICAgT2JqZWN0LmtleXMoY29udHJvbHMpLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgY29uc3QgY29udHJvbCA9IGNvbnRyb2xzIVtmaWVsZF07XG5cbiAgICAgIC8vIENvbnRyb2xcbiAgICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgaWYgKGVycm9ycyAmJiBlcnJvcnNbZmllbGRdKSB7XG4gICAgICAgICAgY29udHJvbC5zZXRFcnJvcnMoeyBleHRlcm5hbEVycm9yOiB0cnVlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjb250cm9sLmVycm9ycyAmJiBjb250cm9sLmVycm9ycy5leHRlcm5hbEVycm9yID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb250cm9sLnNldEVycm9ycyhudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEdyb3VwXG4gICAgICBlbHNlIGlmIChjb250cm9sIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgICBjb250cm9sLm1hcmtBc0ludmFsaWRGb3JFeHRlcm5hbEVycm9ycyhcbiAgICAgICAgICBlcnJvcnMgJiYgZXJyb3JzW2ZpZWxkXVxuICAgICAgICAgICAgPyAoZXJyb3JzW2ZpZWxkXSBhcyBTaG9ydFZhbGlkYXRpb25FcnJvcnMpXG4gICAgICAgICAgICA6IHt9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICAvLyBBcnJheVxuICAgICAgZWxzZSBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IChjb250cm9sIGFzIEZvcm1BcnJheSkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAvLyBDb250cm9sIGluIEFycmF5XG4gICAgICAgICAgaWYgKGNvbnRyb2xbaV0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgaWYgKGVycm9ycyAmJiBlcnJvcnNbaV0gJiYgZXJyb3JzW2ldW2ZpZWxkXSkge1xuICAgICAgICAgICAgICBjb250cm9sW2ldLnNldEVycm9ycyh7IGV4dGVybmFsRXJyb3I6IHRydWUgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICBjb250cm9sW2ldLmVycm9ycyAmJlxuICAgICAgICAgICAgICBjb250cm9sW2ldLmVycm9ycy5leHRlcm5hbEVycm9yID09PSB0cnVlXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29udHJvbFtpXS5zZXRFcnJvcnMobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEdyb3VwIGluIEFycmF5XG4gICAgICAgICAgZWxzZSBpZiAoY29udHJvbFtpXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgICAgIGNvbnRyb2xbaV0ubWFya0FzSW52YWxpZEZvckV4dGVybmFsRXJyb3JzKFxuICAgICAgICAgICAgICBlcnJvcnMgJiYgZXJyb3JzW2ldICYmIGVycm9yc1tpXVtmaWVsZF1cbiAgICAgICAgICAgICAgICA/IChlcnJvcnNbaV1bZmllbGRdIGFzIFNob3J0VmFsaWRhdGlvbkVycm9ycylcbiAgICAgICAgICAgICAgICA6IHt9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGdldHMgYWxsIHZhbHVlcyBmcm9tIHRoZSBmb3JtIGNvbnRyb2xzIGFuZCBhbGwgc3ViIGZvcm0gZ3JvdXAgYW5kIGFycmF5IGNvbnRyb2xzIGFuZCByZXR1cm5zIGl0IGFzXG4gICAqIGFuIG9iamVjdFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldE9iamVjdCgpOiBUTW9kZWwge1xuICAgIC8vIEluaXRpYWxpemUgdGhlIHNoYXBlIG9mIHRoZSByZXNwb25zZVxuICAgIGNvbnN0IG9iamVjdCA9IHRoaXMuX29iamVjdFxuICAgICAgPyB0aGlzLmNsYXNzVG9DbGFzcyh0aGlzLl9vYmplY3QpXG4gICAgICA6IHRoaXMuZmFjdG9yeU1vZGVsXG4gICAgICA/IG5ldyB0aGlzLmZhY3RvcnlNb2RlbCgpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChvYmplY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gUmVjdXJzaXZlbHkgZ2V0IHRoZSB2YWx1ZSBvZiBhbGwgZmllbGRzXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmNvbnRyb2xzKVxuICAgICAgICAuZmlsdGVyKG5hbWUgPT4gbmFtZSAhPT0gRk9SRVZFUl9JTlZBTElEX05BTUUpXG4gICAgICAgIC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgLy8gSGFuZGxlIEdyb3VwXG4gICAgICAgICAgaWYgKHRoaXMuY29udHJvbHNba2V5XSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgICAgIG9iamVjdFtrZXldID0gKHRoaXMuY29udHJvbHNba2V5XSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT4pLm9iamVjdDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBIYW5kbGUgRm9ybSBBcnJheVxuICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY29udHJvbHNba2V5XSBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB2YWx1ZVxuICAgICAgICAgICAgb2JqZWN0W2tleV0gPSBbXTtcblxuICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgICBpIDwgKHRoaXMuY29udHJvbHNba2V5XSBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzLmxlbmd0aDtcbiAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgbGV0IHZhbHVlO1xuXG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAodGhpcy5jb250cm9sc1trZXldIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gaW5zdGFuY2VvZlxuICAgICAgICAgICAgICAgIER5bmFtaWNGb3JtR3JvdXBcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgZ2V0IG9iamVjdCBncm91cFxuICAgICAgICAgICAgICAgIHZhbHVlID0gKCh0aGlzLmNvbnRyb2xzW2tleV0gYXMgRm9ybUFycmF5KS5jb250cm9sc1tcbiAgICAgICAgICAgICAgICAgIGlcbiAgICAgICAgICAgICAgICBdIGFzIER5bmFtaWNGb3JtR3JvdXA8YW55Pikub2JqZWN0O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gKHRoaXMuY29udHJvbHNba2V5XSBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW2ldLnZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG9iamVjdFtrZXldLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSGFuZGxlIENvbnRyb2xcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9iamVjdFtrZXldID0gdGhpcy5jb250cm9sc1trZXldLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAodGhpcy5mYWN0b3J5TW9kZWxcbiAgICAgID8gdGhpcy5wbGFpblRvQ2xhc3ModGhpcy5mYWN0b3J5TW9kZWwsIG9iamVjdClcbiAgICAgIDogb2JqZWN0KSBhcyBUTW9kZWw7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgb2YgZXZlcnkgY29udHJvbCBvbiB0aGUgZm9ybSBhbmQgcmVjdXJzaXZlbHkgc2V0cyB0aGUgdmFsdWVzIG9mIHRoZSBjb250cm9sc1xuICAgKiBvbiBhbGwgc3ViIGZvcm0gZ3JvdXBzXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgdGhlIGRhdGEgdG8gYXNzaWduIHRvIGFsbCBjb250cm9scyBvZiB0aGUgZm9ybSBncm91cCBhbmQgc3ViIGdyb3Vwc1xuICAgKi9cbiAgcHJvdGVjdGVkIHNldE9iamVjdChvYmplY3Q6IFRNb2RlbCkge1xuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiB0aGlzLmZhY3RvcnlNb2RlbCkge1xuICAgICAgdGhpcy5fb2JqZWN0ID0gdGhpcy5jbGFzc1RvQ2xhc3Mob2JqZWN0KTsgLy8gRW5zdXJlIGNvcnJlY3QgdHlwZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9vYmplY3QgPSB0aGlzLnBsYWluVG9DbGFzcyh0aGlzLmZhY3RvcnlNb2RlbCwgb2JqZWN0IGFzIE9iamVjdCk7IC8vIENvbnZlcnQgdG8gTW9kZWwgdHlwZVxuICAgIH1cblxuICAgIC8vIFJlY3Vyc2l2ZWx5IHNldCB0aGUgdmFsdWUgb2YgYWxsIGZpZWxkc1xuICAgIE9iamVjdC5rZXlzKHRoaXMuY29udHJvbHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIC8vIEhhbmRsZSBHcm91cFxuICAgICAgaWYgKHRoaXMuY29udHJvbHNba2V5XSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgKHRoaXMuY29udHJvbHNba2V5XSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT4pLm9iamVjdCA9IHRoaXMuX29iamVjdFxuICAgICAgICAgID8gdGhpcy5fb2JqZWN0W2tleV1cbiAgICAgICAgICA6IHt9O1xuICAgICAgfVxuXG4gICAgICAvLyBIYW5kbGUgRm9ybUFycmF5XG4gICAgICBlbHNlIGlmICh0aGlzLmNvbnRyb2xzW2tleV0gaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcbiAgICAgICAgY29uc3Qgb2JqZWN0QXJyYXkgPSB0aGlzLl9vYmplY3QgPyB0aGlzLl9vYmplY3Rba2V5XSA6IFtdO1xuICAgICAgICBjb25zdCBmb3JtQXJyYXkgPSB0aGlzLmNvbnRyb2xzW2tleV0gYXMgRm9ybUFycmF5O1xuICAgICAgICBjb25zdCBpc0Zvcm1Hcm91cCA9IGZvcm1BcnJheS5jb250cm9sc1swXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGZpcnN0Rm9ybUdyb3VwID0gZm9ybUFycmF5LmNvbnRyb2xzWzBdIGFzIER5bmFtaWNGb3JtR3JvdXA8YW55PjtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRyb2wgPSBmb3JtQXJyYXkuY29udHJvbHNbMF0gYXMgRm9ybUNvbnRyb2w7XG5cbiAgICAgICAgLy8gQ2xlYXIgRm9ybUFycmF5IHdoaWxlIHJldGFpbmluZyB0aGUgcmVmZXJlbmNlXG4gICAgICAgIHdoaWxlIChmb3JtQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgZm9ybUFycmF5LnJlbW92ZUF0KDApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChpc0Zvcm1Hcm91cCkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIEZvcm1Hcm91cFxuICAgICAgICAgICAgY29uc3QgZHluYW1pY0Zvcm1Hcm91cCA9IG5ldyBEeW5hbWljRm9ybUdyb3VwKFxuICAgICAgICAgICAgICBmaXJzdEZvcm1Hcm91cC5mYWN0b3J5TW9kZWwsXG4gICAgICAgICAgICAgIGZpcnN0Rm9ybUdyb3VwLmZvcm1GaWVsZHNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGR5bmFtaWNGb3JtR3JvdXAuc2V0UGFyZW50KHRoaXMpO1xuXG4gICAgICAgICAgICBjb25zdCBjbGFzc1ZhbGlkYXRvcnMgPSBnZXRDbGFzc1ZhbGlkYXRvcnM8VE1vZGVsPihcbiAgICAgICAgICAgICAgZmlyc3RGb3JtR3JvdXAuZmFjdG9yeU1vZGVsLFxuICAgICAgICAgICAgICBmaXJzdEZvcm1Hcm91cC5mb3JtRmllbGRzLFxuICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHRoaXMuRm9ybUNvbnRyb2xDbGFzc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2ZiLmdyb3VwKGNsYXNzVmFsaWRhdG9ycyk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBhbGwgY29udHJvbHMgdG8gdGhlIGZvcm0gZ3JvdXBcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaChjdHJsS2V5ID0+IHtcbiAgICAgICAgICAgICAgZHluYW1pY0Zvcm1Hcm91cC5hZGRDb250cm9sKGN0cmxLZXksIGZvcm1Hcm91cC5jb250cm9sc1tjdHJsS2V5XSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQWRkIGEgdmFsdWUgY2hhbmdlIGxpc3RlbmVyIHRvIHRoZSBncm91cC4gb24gY2hhbmdlLCB2YWxpZGF0ZVxuICAgICAgICAgICAgZHluYW1pY0Zvcm1Hcm91cC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICBkeW5hbWljRm9ybUdyb3VwLnZhbGlkYXRlKHVuZGVmaW5lZCwgdGhpcy5fdmFsaWRhdG9yT3B0aW9ucyBhcyBWYWxpZGF0b3JPcHRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmb3JtQXJyYXkuY29udHJvbHMucHVzaChkeW5hbWljRm9ybUdyb3VwKTtcblxuICAgICAgICAgICAgLy8gUmVjdXNyaXZlbHkgc2V0IHRoZSBvYmplY3QgdmFsdWVcbiAgICAgICAgICAgIChmb3JtQXJyYXkuY29udHJvbHNbaV0gYXMgRHluYW1pY0Zvcm1Hcm91cDxhbnk+KS5vYmplY3QgPVxuICAgICAgICAgICAgICB0aGlzLl9vYmplY3QgJiYgb2JqZWN0QXJyYXkgJiYgb2JqZWN0QXJyYXlbaV1cbiAgICAgICAgICAgICAgICA/IG9iamVjdEFycmF5W2ldXG4gICAgICAgICAgICAgICAgOiB7fTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGNvbnRyb2xcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9XG4gICAgICAgICAgICAgIHRoaXMuX29iamVjdCAmJiBvYmplY3RBcnJheSAmJiBvYmplY3RBcnJheVtpXVxuICAgICAgICAgICAgICAgID8gb2JqZWN0QXJyYXlbaV1cbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Zvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFxuICAgICAgICAgICAgICBjb250cm9sVmFsdWUsXG4gICAgICAgICAgICAgIGZvcm1Db250cm9sLnZhbGlkYXRvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG5ld0Zvcm1Db250cm9sLnNldFBhcmVudCh0aGlzKTtcblxuICAgICAgICAgICAgLy8gQWRkIHRoZSBjb250cm9sIHRvIHRoZSBGb3JtQXJyYXlcbiAgICAgICAgICAgIGZvcm1BcnJheS5jb250cm9scy5wdXNoKG5ld0Zvcm1Db250cm9sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSGFuZGxlIENvbnRyb2xcbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBuZXdPYmplY3QgPSB0aGlzLl9vYmplY3QgPyB0aGlzLl9vYmplY3Rba2V5XSA6IFtdO1xuICAgICAgICB0aGlzLmNvbnRyb2xzW2tleV0uc2V0VmFsdWUoXG4gICAgICAgICAgdGhpcy5fb2JqZWN0ICYmIG5ld09iamVjdCA/IG5ld09iamVjdCA6IHVuZGVmaW5lZFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub2JqZWN0Q2hhbmdlLm5leHQodGhpcy5fb2JqZWN0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xhc3NWYWxpZGF0b3JzPFRNb2RlbD4oXG4gIGZhY3RvcnlNb2RlbDogQ2xhc3NUeXBlPFRNb2RlbD4sXG4gIGZpZWxkczogRGljdGlvbmFyeSxcbiAgdmFsaWRhdG9yT3B0aW9ucz86IFZhbGlkYXRvck9wdGlvbnMsXG4gIEZvcm1Db250cm9sQ2xhc3M6IGFueSA9IER5bmFtaWNGb3JtQ29udHJvbFxuKSB7XG4gIC8vIEdldCB0aGUgdmFsaWRhdGlvbiBydWxlcyBmcm9tIHRoZSBvYmplY3QgZGVjb3JhdG9yc1xuICBjb25zdCBhbGxWYWxpZGF0aW9uTWV0YWRhdGFzOiBWYWxpZGF0aW9uTWV0YWRhdGFbXSA9IGdldEZyb21Db250YWluZXIoXG4gICAgTWV0YWRhdGFTdG9yYWdlXG4gICkuZ2V0VGFyZ2V0VmFsaWRhdGlvbk1ldGFkYXRhcyhmYWN0b3J5TW9kZWwsICcnKTtcblxuICAvLyBHZXQgdGhlIHZhbGlkYXRpb24gcnVsZXMgZm9yIHRoZSB2YWxpZGF0aW9uIGdyb3VwOiBodHRwczovL2dpdGh1Yi5jb20vdHlwZXN0YWNrL2NsYXNzLXZhbGlkYXRvciN2YWxpZGF0aW9uLWdyb3Vwc1xuICBjb25zdCB2YWxpZGF0aW9uR3JvdXBNZXRhZGF0YXM6IFZhbGlkYXRpb25NZXRhZGF0YVtdID0gZ2V0RnJvbUNvbnRhaW5lcihcbiAgICBNZXRhZGF0YVN0b3JhZ2VcbiAgKS5nZXRUYXJnZXRWYWxpZGF0aW9uTWV0YWRhdGFzKFxuICAgIGZhY3RvcnlNb2RlbCxcbiAgICAnJyxcbiAgICB2YWxpZGF0b3JPcHRpb25zICYmIHZhbGlkYXRvck9wdGlvbnMuZ3JvdXBzXG4gICAgICA/IHZhbGlkYXRvck9wdGlvbnMuZ3JvdXBzXG4gICAgICA6IHVuZGVmaW5lZFxuICApO1xuXG4gIGNvbnN0IGZvcm1Hcm91cEZpZWxkcyA9IHt9O1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKCk7XG5cbiAgLy8gTG9vcCB0aHJvdWdoIGFsbCBmaWVsZHMgaW4gdGhlIGZvcm0gZGVmaW5pdGlvblxuICBPYmplY3Qua2V5cyhmaWVsZHMpXG4gICAgLmZpbHRlcihrZXkgPT4ga2V5LmluZGV4T2YoJ19fJykgIT09IDApXG4gICAgLmZvckVhY2goZmllbGROYW1lID0+IHtcbiAgICAgIC8vIENvbmRpdGlvbmFsIFZhbGlkYXRpb24gZm9yIHRoZSBmaWVsZFxuICAgICAgY29uc3QgY29uZGl0aW9uYWxWYWxpZGF0aW9uczogVmFsaWRhdGlvbk1ldGFkYXRhW10gPSBbXTtcbiAgICAgIHZhbGlkYXRpb25Hcm91cE1ldGFkYXRhcy5mb3JFYWNoKHZhbGlkYXRpb25NZXRhZGF0YSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpc1Byb3BlcnR5VmFsaWRhdG9yT2ZUeXBlKFxuICAgICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgICAgICAgICAgZmllbGROYW1lLFxuICAgICAgICAgICAgVmFsaWRhdGlvbktleXMuY29uZGl0aW9uYWwudHlwZVxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uZGl0aW9uYWxWYWxpZGF0aW9ucy5wdXNoKHZhbGlkYXRpb25NZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBBbGwgTmVzdGVkIFZhbGlkYXRpb24gZm9yIHRoZSBmaWVsZFxuICAgICAgY29uc3QgYWxsTmVzdGVkVmFsaWRhdGlvbnM6IFZhbGlkYXRpb25NZXRhZGF0YVtdID0gW107XG4gICAgICBhbGxWYWxpZGF0aW9uTWV0YWRhdGFzLmZvckVhY2godmFsaWRhdGlvbk1ldGFkYXRhID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlzUHJvcGVydHlWYWxpZGF0b3JPZlR5cGUoXG4gICAgICAgICAgICB2YWxpZGF0aW9uTWV0YWRhdGEsXG4gICAgICAgICAgICBmaWVsZE5hbWUsXG4gICAgICAgICAgICBWYWxpZGF0aW9uS2V5cy5uZXN0ZWQudHlwZVxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgYWxsTmVzdGVkVmFsaWRhdGlvbnMucHVzaCh2YWxpZGF0aW9uTWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gTmVzdGVkIFZhbGlkYXRpb24gZm9yIHRoZSBmaWVsZCBmb3IgdGhlIHJlcXVlc3RlZCBjbGFzcy12YWxpZGF0b3IgZ3JvdXBcbiAgICAgIGNvbnN0IG5lc3RlZEdyb3VwVmFsaWRhdGlvbnM6IFZhbGlkYXRpb25NZXRhZGF0YVtdID0gW107XG4gICAgICB2YWxpZGF0aW9uR3JvdXBNZXRhZGF0YXMuZm9yRWFjaCh2YWxpZGF0aW9uTWV0YWRhdGEgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaXNQcm9wZXJ0eVZhbGlkYXRvck9mVHlwZShcbiAgICAgICAgICAgIHZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICAgIFZhbGlkYXRpb25LZXlzLm5lc3RlZC50eXBlXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBuZXN0ZWRHcm91cFZhbGlkYXRpb25zLnB1c2godmFsaWRhdGlvbk1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGZpZWxkRGVmaW5pdGlvbjogRHluYW1pY0Zvcm1Hcm91cEZpZWxkID0ge1xuICAgICAgICBkYXRhOiBmb3JtR3JvdXBGaWVsZHNbZmllbGROYW1lXSxcbiAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uczogW10sXG4gICAgICAgIHZhbGlkYXRpb25EZWZpbml0aW9uczogW11cbiAgICAgIH07XG5cbiAgICAgIGlmIChmaWVsZERlZmluaXRpb24uZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbi5kYXRhID0gZmllbGRzW2ZpZWxkTmFtZV07XG4gICAgICB9XG4gICAgICAvLyBUUlkgTElOSyBFWElTVFMgTkFUSVZFIFZBTElEQVRJT05TLCBVTlNUQUJMRSAhISFcbiAgICAgIGlmIChcbiAgICAgICAgQXJyYXkuaXNBcnJheShmaWVsZERlZmluaXRpb24uZGF0YSkgJiZcbiAgICAgICAgZmllbGREZWZpbml0aW9uLmRhdGEubGVuZ3RoID4gMSAmJlxuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YS5maWx0ZXIoXG4gICAgICAgICAgKHZhbGlkYXRpb25GdW5jdGlvbiwgaW5kZXgpID0+XG4gICAgICAgICAgICBpbmRleCA+IDAgJiYgdHlwZW9mIHZhbGlkYXRpb25GdW5jdGlvbiA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICApLmxlbmd0aCA+IDBcbiAgICAgICkge1xuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YVxuICAgICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgICAodmFsaWRhdGlvbkZ1bmN0aW9uLCBpbmRleCkgPT5cbiAgICAgICAgICAgICAgaW5kZXggPiAwICYmIHR5cGVvZiB2YWxpZGF0aW9uRnVuY3Rpb24gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICApXG4gICAgICAgICAgLmZvckVhY2godmFsaWRhdGlvbkZ1bmN0aW9uID0+XG4gICAgICAgICAgICBmaWVsZERlZmluaXRpb24udmFsaWRhdGlvbkZ1bmN0aW9ucy5wdXNoKHZhbGlkYXRpb25GdW5jdGlvbilcbiAgICAgICAgICApO1xuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YSA9IGZpZWxkRGVmaW5pdGlvbi5kYXRhWzBdO1xuICAgICAgfVxuXG4gICAgICB2YWxpZGF0aW9uR3JvdXBNZXRhZGF0YXMuZm9yRWFjaCh2YWxpZGF0aW9uTWV0YWRhdGEgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLnByb3BlcnR5TmFtZSA9PT0gZmllbGROYW1lICYmXG4gICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgIT09IFZhbGlkYXRpb25LZXlzLmNvbmRpdGlvbmFsLnR5cGVcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy8gQWRkIGFsbCB2YWxpZGF0aW9uIHRvIHRoZSBmaWVsZCBleGNlcHQgdGhlIEBOZXN0ZWRWYWxpZGF0aW9uIGRlZmluaXRpb24gYXNcbiAgICAgICAgICAvLyBiZWluZyBwYXJ0IG9mIHRoZSBmb3JtIHdvdWxkIGltcGx5IGl0IGlzIHZhbGlkYXRlZCBpZiBhbnkgb3RoZXIgcnVsZXMgYXJlIHByZXNlbnRcbiAgICAgICAgICBpZiAodmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgIT09IFZhbGlkYXRpb25LZXlzLm5lc3RlZC50eXBlKSB7XG4gICAgICAgICAgICBmaWVsZERlZmluaXRpb24udmFsaWRhdGlvbkRlZmluaXRpb25zLnB1c2godmFsaWRhdGlvbk1ldGFkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IHR5cGVLZXkgaW4gVmFsaWRhdGlvblR5cGVzKSB7XG4gICAgICAgICAgICBpZiAoVmFsaWRhdGlvblR5cGVzLmhhc093blByb3BlcnR5KHR5cGVLZXkpKSB7XG4gICAgICAgICAgICAgIC8vIEhhbmRsZSBOZXN0ZWQgVmFsaWRhdGlvblxuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY2hlY2tXaXRoQWxsTmVzdGVkVmFsaWRhdGlvbnMoXG4gICAgICAgICAgICAgICAgICBhbGxOZXN0ZWRWYWxpZGF0aW9ucyxcbiAgICAgICAgICAgICAgICAgIG5lc3RlZEdyb3VwVmFsaWRhdGlvbnMsXG4gICAgICAgICAgICAgICAgICBmaWVsZE5hbWVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmIChpc05lc3RlZFZhbGlkYXRlKHZhbGlkYXRpb25NZXRhZGF0YSwgdHlwZUtleSkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG9iamVjdFRvVmFsaWRhdGUgPVxuICAgICAgICAgICAgICAgICAgICBmaWVsZHNbZmllbGROYW1lXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICA/IGZpZWxkc1tmaWVsZE5hbWVdLm9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgY29uc3QgbmVzdGVkVmFsaWRhdGUgPSBjcmVhdGVOZXN0ZWRWYWxpZGF0ZShcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0VG9WYWxpZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgc2V0RmllbGREYXRhKGZpZWxkTmFtZSwgZmllbGREZWZpbml0aW9uLCBuZXN0ZWRWYWxpZGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gSGFuZGxlIEN1c3RvbSBWYWxpZGF0aW9uXG4gICAgICAgICAgICAgIGlmIChpc0N1c3RvbVZhbGlkYXRlKHZhbGlkYXRpb25NZXRhZGF0YSwgdHlwZUtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXN0b21WYWxpZGF0aW9uID0gY3JlYXRlQ3VzdG9tVmFsaWRhdGlvbihcbiAgICAgICAgICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25NZXRhZGF0YVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgc2V0RmllbGREYXRhKGZpZWxkTmFtZSwgZmllbGREZWZpbml0aW9uLCBjdXN0b21WYWxpZGF0aW9uKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIEhhbmRsZSByZW1haW5pbmcgdmFsaWRhdGlvblxuICAgICAgICAgICAgICBpZiAoaXNEeW5hbWljVmFsaWRhdGUodmFsaWRhdGlvbk1ldGFkYXRhLCB0eXBlS2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGR5bmFtaWNWYWxpZGF0ZSA9IGNyZWF0ZUR5bmFtaWNWYWxpZGF0ZShcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbmFsVmFsaWRhdGlvbnMsXG4gICAgICAgICAgICAgICAgICBmaWVsZE5hbWVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHNldEZpZWxkRGF0YShmaWVsZE5hbWUsIGZpZWxkRGVmaW5pdGlvbiwgZHluYW1pY1ZhbGlkYXRlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBDb252ZXJ0IHRvIGEgc3RydWN0dXJlLCBhbmd1bGFyIHVuZGVyc3RhbmRzXG4gICAgICBpZiAoXG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbi5kYXRhIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCB8fFxuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YSBpbnN0YW5jZW9mIEZvcm1BcnJheVxuICAgICAgKSB7XG4gICAgICAgIGZvcm1Hcm91cEZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGREZWZpbml0aW9uLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtR3JvdXBGaWVsZHNbZmllbGROYW1lXSA9IG5ldyBGb3JtQ29udHJvbENsYXNzKGZpZWxkRGVmaW5pdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgcmV0dXJuIGZvcm1Hcm91cEZpZWxkcztcblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gTG9jYWwgSGVscGVyIGZ1bmN0aW9ucyB0byBoZWxwIG1ha2UgdGhlIG1haW4gY29kZSBtb3JlIHJlYWRhYmxlXG4gIC8vXG5cbiAgZnVuY3Rpb24gY3JlYXRlTmVzdGVkVmFsaWRhdGUoXG4gICAgb2JqZWN0VG9WYWxpZGF0ZTogYW55LFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhXG4gICkge1xuICAgIHJldHVybiBmdW5jdGlvbihjb250cm9sOiBGb3JtQ29udHJvbCkge1xuICAgICAgY29uc3QgaXNWYWxpZCA9XG4gICAgICAgIGdldFZhbGlkYXRlRXJyb3JzKFxuICAgICAgICAgIGNvbnRyb2wsXG4gICAgICAgICAgb2JqZWN0VG9WYWxpZGF0ZSAhPT0gdW5kZWZpbmVkID8gb2JqZWN0VG9WYWxpZGF0ZSA6IGNvbnRyb2wudmFsdWUsXG4gICAgICAgICAgdmFsaWRhdG9yT3B0aW9ucyBhcyBWYWxpZGF0b3JPcHRpb25zXG4gICAgICAgICkubGVuZ3RoID09PSAwO1xuICAgICAgcmV0dXJuIGdldElzVmFsaWRSZXN1bHQoaXNWYWxpZCwgdmFsaWRhdGlvbk1ldGFkYXRhLCAnbmVzdGVkVmFsaWRhdGUnKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRHluYW1pY1ZhbGlkYXRlKFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgIGNvbmRpdGlvbmFsVmFsaWRhdGlvbnM6IFZhbGlkYXRpb25NZXRhZGF0YVtdLFxuICAgIGZpZWxkTmFtZTogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiBmdW5jdGlvbihjb250cm9sOiBGb3JtQ29udHJvbCkge1xuICAgICAgaWYgKCFjb250cm9sKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBsZXQgaXNWYWxpZCA9XG4gICAgICAgIGNvbnRyb2wucGFyZW50ICYmIGNvbnRyb2wucGFyZW50LnZhbHVlXG4gICAgICAgICAgPyB2YWxpZGF0b3IudmFsaWRhdGVWYWx1ZUJ5TWV0YWRhdGEoY29udHJvbC52YWx1ZSwgdmFsaWRhdGlvbk1ldGFkYXRhKVxuICAgICAgICAgIDogdHJ1ZTtcblxuICAgICAgaWYgKCFpc1ZhbGlkICYmIGNvbmRpdGlvbmFsVmFsaWRhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZUVycm9ycyA9IHNldE9iamVjdFZhbHVlQW5kR2V0VmFsaWRhdGlvbkVycm9ycyhcbiAgICAgICAgICBjb250cm9sLFxuICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICB2YWxpZGF0b3JPcHRpb25zIGFzIFZhbGlkYXRvck9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgICAgaXNWYWxpZCA9XG4gICAgICAgICAgdmFsaWRhdGVFcnJvcnMuZmlsdGVyKFxuICAgICAgICAgICAgKGVycm9yOiBWYWxpZGF0aW9uRXJyb3IpID0+IGVycm9yLnByb3BlcnR5ID09PSBmaWVsZE5hbWVcbiAgICAgICAgICApLmxlbmd0aCA9PT0gMDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdldElzVmFsaWRSZXN1bHQoaXNWYWxpZCwgdmFsaWRhdGlvbk1ldGFkYXRhLCAnZHluYW1pY1ZhbGlkYXRlJyk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUN1c3RvbVZhbGlkYXRpb24oXG4gICAgZmllbGROYW1lOiBzdHJpbmcsXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGFcbiAgKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRyb2w6IEZvcm1Db250cm9sKSB7XG4gICAgICBjb25zdCB2YWxpZGF0ZUVycm9yczogVmFsaWRhdGlvbkVycm9yW10gPSBzZXRPYmplY3RWYWx1ZUFuZEdldFZhbGlkYXRpb25FcnJvcnMoXG4gICAgICAgIGNvbnRyb2wsXG4gICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgdmFsaWRhdG9yT3B0aW9ucyBhcyBWYWxpZGF0b3JPcHRpb25zXG4gICAgICApO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGdldEFsbEVycm9ycyh2YWxpZGF0ZUVycm9ycywgZmllbGROYW1lKS5sZW5ndGggPT09IDA7XG4gICAgICByZXR1cm4gZ2V0SXNWYWxpZFJlc3VsdChpc1ZhbGlkLCB2YWxpZGF0aW9uTWV0YWRhdGEsICdjdXN0b21WYWxpZGF0aW9uJyk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrV2l0aEFsbE5lc3RlZFZhbGlkYXRpb25zKFxuICAgIGFsbE5lc3RlZFZhbGlkYXRpb25zOiBWYWxpZGF0aW9uTWV0YWRhdGFbXSxcbiAgICBuZXN0ZWRWYWxpZGF0aW9uczogVmFsaWRhdGlvbk1ldGFkYXRhW10sXG4gICAga2V5OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGFsbE5lc3RlZFZhbGlkYXRpb25zLmxlbmd0aCA9PT0gbmVzdGVkVmFsaWRhdGlvbnMubGVuZ3RoIHx8XG4gICAgICAoKGZpZWxkc1trZXldIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCB8fFxuICAgICAgICBmaWVsZHNba2V5XSBpbnN0YW5jZW9mIEZvcm1BcnJheSkgJiZcbiAgICAgICAgYWxsTmVzdGVkVmFsaWRhdGlvbnMubGVuZ3RoID4gMCAmJiBuZXN0ZWRWYWxpZGF0aW9ucy5sZW5ndGggPT09IDApXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRHluYW1pY1ZhbGlkYXRlKFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgIHR5cGVLZXk6IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gKFxuICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgPT09IFZhbGlkYXRpb25UeXBlc1t0eXBlS2V5XSAmJlxuICAgICAgdmFsaWRhdG9yW3ZhbGlkYXRpb25NZXRhZGF0YS50eXBlXSAhPT0gdW5kZWZpbmVkXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtYXJrZWQgd2l0aCBAVmFsaWRhdGUoLi4uKVxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vdHlwZXN0YWNrL2NsYXNzLXZhbGlkYXRvciNjdXN0b20tdmFsaWRhdGlvbi1jbGFzc2VzXG4gICAqL1xuICBmdW5jdGlvbiBpc0N1c3RvbVZhbGlkYXRlKFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgIHR5cGVLZXk6IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gKFxuICAgICAgaXNOb3RQcm9wZXJ0eVZhbGlkYXRpb24odmFsaWRhdGlvbk1ldGFkYXRhLCB0eXBlS2V5KSAmJlxuICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgPT09IFZhbGlkYXRpb25LZXlzLmN1c3RvbS50eXBlICYmXG4gICAgICB0eXBlS2V5ID09PSBWYWxpZGF0aW9uS2V5cy5jdXN0b20udHlwZUtleVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogbWFya2VkIHdpdGggQFZhbGlkYXRlTmVzdGVkKClcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3R5cGVzdGFjay9jbGFzcy12YWxpZGF0b3IjdmFsaWRhdGluZy1uZXN0ZWQtb2JqZWN0c1xuICAgKi9cbiAgZnVuY3Rpb24gaXNOZXN0ZWRWYWxpZGF0ZShcbiAgICB2YWxpZGF0aW9uTWV0YWRhdGE6IFZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICB0eXBlS2V5OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGlzTm90UHJvcGVydHlWYWxpZGF0aW9uKHZhbGlkYXRpb25NZXRhZGF0YSwgdHlwZUtleSkgJiZcbiAgICAgIHZhbGlkYXRpb25NZXRhZGF0YS50eXBlID09PSBWYWxpZGF0aW9uS2V5cy5uZXN0ZWQudHlwZSAmJlxuICAgICAgdHlwZUtleSA9PT0gVmFsaWRhdGlvbktleXMubmVzdGVkLnR5cGVLZXlcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb3RQcm9wZXJ0eVZhbGlkYXRpb24oXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGEsXG4gICAgdHlwZUtleTogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiAoXG4gICAgICB2YWxpZGF0aW9uTWV0YWRhdGEudHlwZSA9PT0gVmFsaWRhdGlvblR5cGVzW3R5cGVLZXldICYmXG4gICAgICB2YWxpZGF0b3JbdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGVdID09PSB1bmRlZmluZWRcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RmllbGREYXRhKFxuICAgIGZpZWxkTmFtZTogc3RyaW5nLFxuICAgIGZpZWxkRGVmaW5pdGlvbjogRHluYW1pY0Zvcm1Hcm91cEZpZWxkLFxuICAgIHZhbGlkYXRpb25GdW5jdGlvbjogRnVuY3Rpb25cbiAgKSB7XG4gICAgLyogdG9kbzogbWF5YmUgbm90IG5lZWQsIGlmIGVuYWJsZSB0aGlzIGNvZGUsIGV4cGVyZW1lbnRhbCBtb2RlIG5vdCB3b3JrXG4gICAgaWYgKGZpZWxkc1tmaWVsZE5hbWVdIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgZmllbGRzW2ZpZWxkTmFtZV0ub2JqZWN0ID0gZmllbGRzW2ZpZWxkTmFtZV0uZmllbGRzO1xuICAgIH0qL1xuXG4gICAgLy8gRmlsbCBmaWVsZCBkYXRhIGlmIGVtcHR5XG4gICAgaWYgKGZpZWxkRGVmaW5pdGlvbi5kYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZpZWxkRGVmaW5pdGlvbi5kYXRhID0gZmllbGRzW2ZpZWxkTmFtZV07XG4gICAgfVxuXG4gICAgZmllbGREZWZpbml0aW9uLnZhbGlkYXRpb25GdW5jdGlvbnMucHVzaCh2YWxpZGF0aW9uRnVuY3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QWxsRXJyb3JzKFxuICAgIHZhbGlkYXRlRXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JbXSxcbiAgICBmaWVsZE5hbWU6IHN0cmluZ1xuICApOiBWYWxpZGF0aW9uRXJyb3JbXSB7XG4gICAgcmV0dXJuIHZhbGlkYXRlRXJyb3JzLmZpbHRlcihcbiAgICAgIChlcnJvcjogVmFsaWRhdGlvbkVycm9yKSA9PlxuICAgICAgICAvLyBDaGVjayBmb3IgbmVzdGVkL2NoaWxkIGVycm9yc1xuICAgICAgICAoZXJyb3IuY2hpbGRyZW4ubGVuZ3RoICYmXG4gICAgICAgICAgZXJyb3IuY2hpbGRyZW4uZmlsdGVyKGNoaWxkcmVuID0+IGNoaWxkcmVuLnByb3BlcnR5ID09PSBmaWVsZE5hbWUpKSB8fFxuICAgICAgICBlcnJvci5wcm9wZXJ0eSA9PT0gZmllbGROYW1lXG4gICAgKTtcbiAgfVxufVxuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIEdsb2JhbCBIZWxwZXIgZnVuY3Rpb25zXG4vL1xuXG5mdW5jdGlvbiBpc1Byb3BlcnR5VmFsaWRhdG9yT2ZUeXBlKFxuICB2YWxpZGF0aW9uTWV0YWRhdGE6IFZhbGlkYXRpb25NZXRhZGF0YSxcbiAgZmllbGROYW1lOiBzdHJpbmcsXG4gIHZhbGlkYXRpb25NZXRhZGF0YVR5cGU6IHN0cmluZ1xuKSB7XG4gIHJldHVybiAoXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhLnByb3BlcnR5TmFtZSA9PT0gZmllbGROYW1lICYmXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgPT09IHZhbGlkYXRpb25NZXRhZGF0YVR5cGVcbiAgKTtcbn1cblxuZnVuY3Rpb24gc2V0T2JqZWN0VmFsdWVBbmRHZXRWYWxpZGF0aW9uRXJyb3JzKFxuICBjb250cm9sOiBGb3JtQ29udHJvbCxcbiAga2V5OiBzdHJpbmcsXG4gIHZhbGlkYXRvck9wdGlvbnM6IFZhbGlkYXRvck9wdGlvbnNcbikge1xuICBjb25zdCBvYmplY3QgPVxuICAgIGNvbnRyb2wucGFyZW50IGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cFxuICAgICAgPyAoY29udHJvbC5wYXJlbnQgYXMgRHluYW1pY0Zvcm1Hcm91cDxhbnk+KS5vYmplY3RcbiAgICAgIDogY29udHJvbC5wYXJlbnRcbiAgICAgID8gY29udHJvbC5wYXJlbnQudmFsdWVcbiAgICAgIDoge307XG5cbiAgaWYgKG9iamVjdCkge1xuICAgIG9iamVjdFtrZXldID0gY29udHJvbC52YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBnZXRWYWxpZGF0ZUVycm9ycyhjb250cm9sLCBvYmplY3QsIHZhbGlkYXRvck9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBnZXRWYWxpZGF0ZUVycm9ycyhcbiAgY29udHJvbDogRm9ybUNvbnRyb2wsXG4gIGRhdGFUb1ZhbGlkYXRlOiBhbnksXG4gIHZhbGlkYXRvck9wdGlvbnM6IFZhbGlkYXRvck9wdGlvbnNcbikge1xuICBjb25zdCB2YWxpZGF0ZUVycm9yczogVmFsaWRhdGlvbkVycm9yW10gPVxuICAgIGNvbnRyb2wucGFyZW50ICYmIGNvbnRyb2wucGFyZW50LnZhbHVlXG4gICAgICA/IHZhbGlkYXRlU3luYyhkYXRhVG9WYWxpZGF0ZSwgdmFsaWRhdG9yT3B0aW9ucylcbiAgICAgIDogW107XG4gIHJldHVybiB2YWxpZGF0ZUVycm9ycztcbn1cblxuZnVuY3Rpb24gZ2V0SXNWYWxpZFJlc3VsdChcbiAgaXNWYWxpZDogYm9vbGVhbixcbiAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGEsXG4gIGVycm9yVHlwZTogRXJyb3JQcm9wZXJ0eU5hbWVcbikge1xuICByZXR1cm4gaXNWYWxpZFxuICAgID8gbnVsbFxuICAgIDoge1xuICAgICAgICBbZXJyb3JUeXBlXToge1xuICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICB0eXBlOiB2YWxpZGF0aW9uTWV0YWRhdGEudHlwZVxuICAgICAgICB9XG4gICAgICB9O1xufVxuXG50eXBlIEVycm9yUHJvcGVydHlOYW1lID1cbiAgfCAnbmVzdGVkVmFsaWRhdGUnXG4gIHwgJ2N1c3RvbVZhbGlkYXRpb24nXG4gIHwgJ2R5bmFtaWNWYWxpZGF0ZSc7XG5cbmNvbnN0IFZhbGlkYXRpb25LZXlzID0ge1xuICBuZXN0ZWQ6IHtcbiAgICB0eXBlOiAnbmVzdGVkVmFsaWRhdGlvbicsXG4gICAgdHlwZUtleTogJ05FU1RFRF9WQUxJREFUSU9OJ1xuICB9LFxuICBjb25kaXRpb25hbDoge1xuICAgIHR5cGU6ICdjb25kaXRpb25hbFZhbGlkYXRpb24nXG4gIH0sXG4gIGN1c3RvbToge1xuICAgIHR5cGU6ICdjdXN0b21WYWxpZGF0aW9uJyxcbiAgICB0eXBlS2V5OiAnQ1VTVE9NX1ZBTElEQVRJT04nXG4gIH1cbn07XG4iXX0=