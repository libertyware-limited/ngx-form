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
export class DynamicFormGroup extends FormGroup {
    constructor(factoryModel, fields, validatorOrOpts, asyncValidator) {
        super({}, validatorOrOpts, asyncValidator);
        this.factoryModel = factoryModel;
        this.fields = fields;
        this.nativeValidateErrors = new BehaviorSubject({});
        this.customValidateErrors = new BehaviorSubject({});
        this.formErrors = null;
        this.objectChange = new Subject();
        this.FormControlClass = DynamicFormControl;
        this._object = null;
        this._externalErrors = null;
        this._validatorOptions = null;
        this._fb = new FormBuilder();
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
        this.formFields = this.onlyFields(fields);
        this._formGen = getFormFieldsOptions(factoryModel);
    }
    getFormGenData() {
        return this._formGen;
    }
    // Getters & Setters
    set externalErrors(externalErrors) {
        this._externalErrors = externalErrors;
        this.validate();
    }
    get externalErrors() {
        return this._externalErrors;
    }
    set validatorOptions(validatorOptions) {
        this._validatorOptions = validatorOptions;
        this.validate();
    }
    get validatorOptions() {
        return this._validatorOptions;
    }
    set object(object) {
        this.setObject(object);
    }
    get object() {
        return this.getObject();
    }
    // Public API
    validate(externalErrors, validatorOptions) {
        this.validateAsync(externalErrors, validatorOptions).then(() => { }, error => {
            throw error;
        });
    }
    async validateAsync(externalErrors, validatorOptions) {
        if (externalErrors === undefined) {
            externalErrors = cloneDeep(this._externalErrors);
        }
        if (validatorOptions === undefined) {
            validatorOptions = cloneDeep(this._validatorOptions);
        }
        if (!externalErrors) {
            externalErrors = {};
        }
        try {
            const result = await validate(this.object, validatorOptions);
            const validationErrors = this.transformValidationErrors(result);
            const allErrors = this.mergeErrors(externalErrors, validationErrors);
            this.markAsInvalidForExternalErrors(externalErrors);
            this.setCustomErrors(allErrors);
            // todo: refactor, invalidate form if exists any allErrors
            let usedForeverInvalid = false;
            if (Object.keys(allErrors).filter(key => key !== FOREVER_INVALID_NAME)
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
        }
        catch (error) {
            throw error;
        }
    }
    setCustomErrors(allErrors) {
        this.formErrors = allErrors;
        this.customValidateErrors.next(this.formErrors);
        this.nativeValidateErrors.next(this.collectErrors(this));
    }
    collectErrors(control, isRoot = true) {
        if (control.controls) {
            return {
                ...(isRoot ? this.errors : {}),
                ...Object.entries(control.controls).reduce((acc, [key, childControl]) => {
                    const childErrors = this.collectErrors(childControl, false);
                    if (childErrors &&
                        key !== 'foreverInvalid' &&
                        Object.keys(childErrors).length > 0) {
                        acc = {
                            ...acc,
                            [key]: {
                                ...(acc && acc[key] ? acc[key] : {}),
                                ...childErrors
                            }
                        };
                    }
                    return acc;
                }, {})
            };
        }
        else {
            return control.errors;
        }
    }
    validateAllFormFields() {
        Object.keys(this.controls).forEach(field => {
            const control = this.get(field);
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
                for (let i = 0; i < control.controls.length; i++) {
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
    }
    resetValidateAllFormFields() {
        this.markAsInvalidForExternalErrors({});
        Object.keys(this.controls).forEach(field => {
            const control = this.get(field);
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
                for (let i = 0; i < control.controls.length; i++) {
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
    }
    classToClass(object) {
        return classToClass(object, { ignoreDecorators: true });
    }
    plainToClass(cls, plain) {
        return plainToClass(cls, plain, { ignoreDecorators: true });
    }
    async setExternalErrorsAsync(externalErrors) {
        this._externalErrors = externalErrors;
        try {
            return await this.validateAsync();
        }
        catch (error) {
            throw error;
        }
    }
    setExternalErrors(externalErrors) {
        this.setExternalErrorsAsync(externalErrors).then(() => { }, error => {
            throw error;
        });
    }
    getExternalErrors() {
        return this._externalErrors;
    }
    clearExternalErrors() {
        this.setExternalErrors({});
    }
    clearExternalErrorsAsync() {
        return this.setExternalErrorsAsync({});
    }
    async setValidatorOptionsAsync(validatorOptions) {
        this._validatorOptions = validatorOptions;
        try {
            return await this.validateAsync();
        }
        catch (error) {
            throw error;
        }
    }
    setValidatorOptions(validatorOptions) {
        this.setValidatorOptionsAsync(validatorOptions).then(() => { }, error => {
            throw error;
        });
    }
    getValidatorOptions() {
        return this._validatorOptions;
    }
    // Helpers
    onlyFields(fields) {
        const newFields = {};
        if (fields !== undefined) {
            Object.keys(fields).forEach(key => {
                if (fields[key] instanceof DynamicFormGroup) {
                    // Group: recursive
                    newFields[key] = this.onlyFields(fields[key].formFields);
                }
                else {
                    // Array
                    if (fields[key] instanceof FormArray) {
                        if (fields[key].controls[0] instanceof DynamicFormGroup) {
                            // Group within Array: recursive
                            newFields[key] = this.onlyFields(fields[key].controls[0].formFields);
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
    }
    transformValidationErrors(errors) {
        const customErrors = {};
        errors.forEach((error) => {
            if (error && error.constraints !== undefined) {
                Object.keys(error.constraints).forEach((key) => {
                    if (!customErrors[error.property]) {
                        customErrors[error.property] = [];
                    }
                    if (customErrors[error.property].indexOf(error.constraints[key]) === -1) {
                        customErrors[error.property].push(error.constraints[key]);
                    }
                });
            }
            if (error.children !== undefined && error.children.length) {
                customErrors[error.property] = this.transformValidationErrors(error.children);
            }
        });
        return customErrors;
    }
    mergeErrors(externalErrors, validationErrors) {
        const clonedExternalErrors = cloneDeep(externalErrors);
        return mergeWith(clonedExternalErrors, validationErrors, (objValue, srcValue) => {
            if (canMerge()) {
                return objValue.concat(srcValue);
            }
            function canMerge() {
                return (Array.isArray(objValue) &&
                    Array.isArray(srcValue) &&
                    objValue.filter(objItem => srcValue.indexOf(objItem) !== -1)
                        .length === 0);
            }
        });
    }
    markAsInvalidForExternalErrors(errors, controls) {
        if (!controls) {
            controls = this.controls;
        }
        Object.keys(controls).forEach(field => {
            const control = controls[field];
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
                for (let i = 0; i < control.length; i++) {
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
    }
    /**
     * Recursively gets all values from the form controls and all sub form group and array controls and returns it as
     * an object
     */
    getObject() {
        // Initialize the shape of the response
        const object = this._object
            ? this.classToClass(this._object)
            : this.factoryModel
                ? new this.factoryModel()
                : undefined;
        if (object !== undefined) {
            // Recursively get the value of all fields
            Object.keys(this.controls)
                .filter(name => name !== FOREVER_INVALID_NAME)
                .forEach(key => {
                // Handle Group
                if (this.controls[key] instanceof DynamicFormGroup) {
                    object[key] = this.controls[key].object;
                }
                // Handle Form Array
                else if (this.controls[key] instanceof FormArray) {
                    // Initialize value
                    object[key] = [];
                    for (let i = 0; i < this.controls[key].controls.length; i++) {
                        let value;
                        if (this.controls[key].controls[i] instanceof
                            DynamicFormGroup) {
                            // Recursively get object group
                            value = this.controls[key].controls[i].object;
                        }
                        else {
                            value = this.controls[key].controls[i].value;
                        }
                        if (value && Object.keys(value).length > 0) {
                            object[key].push(value);
                        }
                    }
                }
                // Handle Control
                else {
                    object[key] = this.controls[key].value;
                }
            });
        }
        return (this.factoryModel
            ? this.plainToClass(this.factoryModel, object)
            : object);
    }
    /**
     * Sets the value of every control on the form and recursively sets the values of the controls
     * on all sub form groups
     *
     * @param object the data to assign to all controls of the form group and sub groups
     */
    setObject(object) {
        if (object instanceof this.factoryModel) {
            this._object = this.classToClass(object); // Ensure correct type
        }
        else {
            this._object = this.plainToClass(this.factoryModel, object); // Convert to Model type
        }
        // Recursively set the value of all fields
        Object.keys(this.controls).forEach(key => {
            // Handle Group
            if (this.controls[key] instanceof DynamicFormGroup) {
                this.controls[key].object = this._object
                    ? this._object[key]
                    : {};
            }
            // Handle FormArray
            else if (this.controls[key] instanceof FormArray) {
                const objectArray = this._object ? this._object[key] : [];
                const formArray = this.controls[key];
                const isFormGroup = formArray.controls[0] instanceof DynamicFormGroup;
                const firstFormGroup = formArray.controls[0];
                const formControl = formArray.controls[0];
                // Clear FormArray while retaining the reference
                while (formArray.length !== 0) {
                    formArray.removeAt(0);
                }
                for (let i = 0; i < objectArray.length; i++) {
                    if (isFormGroup) {
                        // Create FormGroup
                        const dynamicFormGroup = new DynamicFormGroup(firstFormGroup.factoryModel, firstFormGroup.formFields);
                        dynamicFormGroup.setParent(this);
                        const classValidators = getClassValidators(firstFormGroup.factoryModel, firstFormGroup.formFields, undefined, this.FormControlClass);
                        const formGroup = this._fb.group(classValidators);
                        // Add all controls to the form group
                        Object.keys(formGroup.controls).forEach(ctrlKey => {
                            dynamicFormGroup.addControl(ctrlKey, formGroup.controls[ctrlKey]);
                        });
                        // Add a value change listener to the group. on change, validate
                        dynamicFormGroup.valueChanges.subscribe(data => {
                            dynamicFormGroup.validate(undefined, this._validatorOptions);
                        });
                        formArray.controls.push(dynamicFormGroup);
                        // Recusrively set the object value
                        formArray.controls[i].object =
                            this._object && objectArray && objectArray[i]
                                ? objectArray[i]
                                : {};
                    }
                    else {
                        // Create control
                        const controlValue = this._object && objectArray && objectArray[i]
                            ? objectArray[i]
                            : undefined;
                        const newFormControl = new FormControl(controlValue, formControl.validator);
                        newFormControl.setParent(this);
                        // Add the control to the FormArray
                        formArray.controls.push(newFormControl);
                    }
                }
            }
            // Handle Control
            else {
                const newObject = this._object ? this._object[key] : [];
                this.controls[key].setValue(this._object && newObject ? newObject : undefined);
            }
        });
        this.objectChange.next(this._object);
    }
}
export function getClassValidators(factoryModel, fields, validatorOptions, FormControlClass = DynamicFormControl) {
    // Get the validation rules from the object decorators
    const allValidationMetadatas = getFromContainer(MetadataStorage).getTargetValidationMetadatas(factoryModel, '');
    // Get the validation rules for the validation group: https://github.com/typestack/class-validator#validation-groups
    const validationGroupMetadatas = getFromContainer(MetadataStorage).getTargetValidationMetadatas(factoryModel, '', validatorOptions && validatorOptions.groups
        ? validatorOptions.groups
        : undefined);
    const formGroupFields = {};
    const validator = new Validator();
    // Loop through all fields in the form definition
    Object.keys(fields)
        .filter(key => key.indexOf('__') !== 0)
        .forEach(fieldName => {
        // Conditional Validation for the field
        const conditionalValidations = [];
        validationGroupMetadatas.forEach(validationMetadata => {
            if (isPropertyValidatorOfType(validationMetadata, fieldName, ValidationKeys.conditional.type)) {
                conditionalValidations.push(validationMetadata);
            }
        });
        // All Nested Validation for the field
        const allNestedValidations = [];
        allValidationMetadatas.forEach(validationMetadata => {
            if (isPropertyValidatorOfType(validationMetadata, fieldName, ValidationKeys.nested.type)) {
                allNestedValidations.push(validationMetadata);
            }
        });
        // Nested Validation for the field for the requested class-validator group
        const nestedGroupValidations = [];
        validationGroupMetadatas.forEach(validationMetadata => {
            if (isPropertyValidatorOfType(validationMetadata, fieldName, ValidationKeys.nested.type)) {
                nestedGroupValidations.push(validationMetadata);
            }
        });
        const fieldDefinition = {
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
            fieldDefinition.data.filter((validationFunction, index) => index > 0 && typeof validationFunction === 'function').length > 0) {
            fieldDefinition.data
                .filter((validationFunction, index) => index > 0 && typeof validationFunction === 'function')
                .forEach(validationFunction => fieldDefinition.validationFunctions.push(validationFunction));
            fieldDefinition.data = fieldDefinition.data[0];
        }
        validationGroupMetadatas.forEach(validationMetadata => {
            if (validationMetadata.propertyName === fieldName &&
                validationMetadata.type !== ValidationKeys.conditional.type) {
                // Add all validation to the field except the @NestedValidation definition as
                // being part of the form would imply it is validated if any other rules are present
                if (validationMetadata.type !== ValidationKeys.nested.type) {
                    fieldDefinition.validationDefinitions.push(validationMetadata);
                }
                for (const typeKey in ValidationTypes) {
                    if (ValidationTypes.hasOwnProperty(typeKey)) {
                        // Handle Nested Validation
                        if (checkWithAllNestedValidations(allNestedValidations, nestedGroupValidations, fieldName)) {
                            if (isNestedValidate(validationMetadata, typeKey)) {
                                const objectToValidate = fields[fieldName] instanceof DynamicFormGroup
                                    ? fields[fieldName].object
                                    : undefined;
                                const nestedValidate = createNestedValidate(objectToValidate, validationMetadata);
                                setFieldData(fieldName, fieldDefinition, nestedValidate);
                            }
                        }
                        // Handle Custom Validation
                        if (isCustomValidate(validationMetadata, typeKey)) {
                            const customValidation = createCustomValidation(fieldName, validationMetadata);
                            setFieldData(fieldName, fieldDefinition, customValidation);
                        }
                        // Handle remaining validation
                        if (isDynamicValidate(validationMetadata, typeKey)) {
                            const dynamicValidate = createDynamicValidate(validationMetadata, conditionalValidations, fieldName);
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
            const isValid = getValidateErrors(control, objectToValidate !== undefined ? objectToValidate : control.value, validatorOptions).length === 0;
            return getIsValidResult(isValid, validationMetadata, 'nestedValidate');
        };
    }
    function createDynamicValidate(validationMetadata, conditionalValidations, fieldName) {
        return function (control) {
            if (!control) {
                return null;
            }
            let isValid = control.parent && control.parent.value
                ? validator.validateValueByMetadata(control.value, validationMetadata)
                : true;
            if (!isValid && conditionalValidations.length > 0) {
                const validateErrors = setObjectValueAndGetValidationErrors(control, fieldName, validatorOptions);
                isValid =
                    validateErrors.filter((error) => error.property === fieldName).length === 0;
            }
            return getIsValidResult(isValid, validationMetadata, 'dynamicValidate');
        };
    }
    function createCustomValidation(fieldName, validationMetadata) {
        return function (control) {
            const validateErrors = setObjectValueAndGetValidationErrors(control, fieldName, validatorOptions);
            const isValid = getAllErrors(validateErrors, fieldName).length === 0;
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
        return validateErrors.filter((error) => 
        // Check for nested/child errors
        (error.children.length &&
            error.children.filter(children => children.property === fieldName)) ||
            error.property === fieldName);
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
    const object = control.parent instanceof DynamicFormGroup
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
    const validateErrors = control.parent && control.parent.value
        ? validateSync(dataToValidate, validatorOptions)
        : [];
    return validateErrors;
}
function getIsValidResult(isValid, validationMetadata, errorType) {
    return isValid
        ? null
        : {
            [errorType]: {
                valid: false,
                type: validationMetadata.type
            }
        };
}
const ValidationKeys = {
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
