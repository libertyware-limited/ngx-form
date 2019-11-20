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
    validateAsync(externalErrors, validatorOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                const result = yield validate(this.object, validatorOptions);
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
        });
    }
    setCustomErrors(allErrors) {
        this.formErrors = allErrors;
        this.customValidateErrors.next(this.formErrors);
        this.nativeValidateErrors.next(this.collectErrors(this));
    }
    collectErrors(control, isRoot = true) {
        if (control.controls) {
            return Object.assign({}, (isRoot ? this.errors : {}), Object.entries(control.controls).reduce((acc, [key, childControl]) => {
                const childErrors = this.collectErrors(childControl, false);
                if (childErrors &&
                    key !== 'foreverInvalid' &&
                    Object.keys(childErrors).length > 0) {
                    acc = Object.assign({}, acc, { [key]: Object.assign({}, (acc && acc[key] ? acc[key] : {}), childErrors) });
                }
                return acc;
            }, {}));
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
    setExternalErrorsAsync(externalErrors) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this._externalErrors = externalErrors;
            try {
                return yield this.validateAsync();
            }
            catch (error) {
                throw error;
            }
        });
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
    setValidatorOptionsAsync(validatorOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this._validatorOptions = validatorOptions;
            try {
                return yield this.validateAsync();
            }
            catch (error) {
                throw error;
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWdyb3VwLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLWJ1aWxkZXIvIiwic291cmNlcyI6WyJ1dGlscy9keW5hbWljLWZvcm0tZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFJTCxTQUFTLEVBQ1QsV0FBVyxFQUNYLFdBQVcsRUFDWCxTQUFTLEVBRVYsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRS9ELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLFFBQVEsRUFDUixZQUFZLEVBRVosZUFBZSxFQUNmLFNBQVMsRUFFVixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBVWhELE9BQU8sRUFDTCxjQUFjLEVBQ2Qsb0JBQW9CLEVBQ3JCLE1BQU0seUNBQXlDLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDNUQsT0FBTyxFQUFpQixvQkFBb0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWpGLE9BQU8sU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBQ3pDLE9BQU8sU0FBUyxNQUFNLGtCQUFrQixDQUFDO0FBT3pDLE1BQU0sT0FBTyxnQkFBeUIsU0FBUSxTQUFTO0lBY3JELFlBQ1MsWUFBK0IsRUFDL0IsTUFBeUIsRUFDaEMsZUFJUSxFQUNSLGNBQTZEO1FBRTdELEtBQUssQ0FBQyxFQUFFLEVBQUUsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBVHBDLGlCQUFZLEdBQVosWUFBWSxDQUFtQjtRQUMvQixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQWYzQix5QkFBb0IsR0FBRyxJQUFJLGVBQWUsQ0FBYSxFQUFFLENBQUMsQ0FBQztRQUMzRCx5QkFBb0IsR0FB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LENBQUM7QUFDOUQsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQ3hCLE9BQW9CLEVBQ3BCLGNBQW1CLEVBQ25CLGdCQUFrQztJQUVsQyxNQUFNLGNBQWMsR0FDbEIsT0FBTyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUs7UUFDcEMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUM7UUFDaEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNULE9BQU8sY0FBYyxDQUFDO0FBQ3hCLENBQUM7QUFFRCxTQUFTLGdCQUFnQixDQUN2QixPQUFnQixFQUNoQixrQkFBc0MsRUFDdEMsU0FBNEI7SUFFNUIsT0FBTyxPQUFPO1FBQ1osQ0FBQyxDQUFDLElBQUk7UUFDTixDQUFDLENBQUM7WUFDRSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUNYLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxJQUFJO2FBQzlCO1NBQ0YsQ0FBQztBQUNSLENBQUM7QUFPRCxNQUFNLGNBQWMsR0FBRztJQUNyQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLE9BQU8sRUFBRSxtQkFBbUI7S0FDN0I7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsdUJBQXVCO0tBQzlCO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixPQUFPLEVBQUUsbUJBQW1CO0tBQzdCO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFic3RyYWN0Q29udHJvbCxcbiAgQWJzdHJhY3RDb250cm9sT3B0aW9ucyxcbiAgQXN5bmNWYWxpZGF0b3JGbixcbiAgRm9ybUFycmF5LFxuICBGb3JtQnVpbGRlcixcbiAgRm9ybUNvbnRyb2wsXG4gIEZvcm1Hcm91cCxcbiAgVmFsaWRhdG9yRm5cbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgY2xhc3NUb0NsYXNzLCBwbGFpblRvQ2xhc3MgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBDbGFzc1R5cGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lci9DbGFzc1RyYW5zZm9ybWVyJztcbmltcG9ydCB7XG4gIGdldEZyb21Db250YWluZXIsXG4gIE1ldGFkYXRhU3RvcmFnZSxcbiAgdmFsaWRhdGUsXG4gIHZhbGlkYXRlU3luYyxcbiAgVmFsaWRhdGlvbkVycm9yLFxuICBWYWxpZGF0aW9uVHlwZXMsXG4gIFZhbGlkYXRvcixcbiAgVmFsaWRhdG9yT3B0aW9uc1xufSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xuaW1wb3J0IHsgVmFsaWRhdGlvbk1ldGFkYXRhIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yL21ldGFkYXRhL1ZhbGlkYXRpb25NZXRhZGF0YSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIERpY3Rpb25hcnksXG59IGZyb20gJy4uL21vZGVscy9kaWN0aW9uYXJ5JztcbmltcG9ydCB7XG4gIFNob3J0VmFsaWRhdGlvbkVycm9ycyxcbn0gZnJvbSAnLi4vbW9kZWxzL3Nob3J0LXZhbGlkYXRpb24tZXJyb3JzJztcbmltcG9ydCB7XG4gIER5bmFtaWNGb3JtR3JvdXBGaWVsZCxcbn0gZnJvbSAnLi4vbW9kZWxzL2R5bmFtaWMtZm9ybS1ncm91cC1maWVsZCc7XG5pbXBvcnQge1xuICBmb3JldmVySW52YWxpZCxcbiAgRk9SRVZFUl9JTlZBTElEX05BTUVcbn0gZnJvbSAnLi4vdmFsaWRhdG9ycy9mb3JldmVyLWludmFsaWQudmFsaWRhdG9yJztcbmltcG9ydCB7IER5bmFtaWNGb3JtQ29udHJvbCB9IGZyb20gJy4vZHluYW1pYy1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgV2lkZ2V0T3B0aW9ucywgZ2V0Rm9ybUZpZWxkc09wdGlvbnMgfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tY29yZSc7XG5cbmltcG9ydCBjbG9uZURlZXAgZnJvbSAnbG9kYXNoLmNsb25lZGVlcCc7XG5pbXBvcnQgbWVyZ2VXaXRoIGZyb20gJ2xvZGFzaC5tZXJnZXdpdGgnO1xuXG4vLyBFbmZvcmNlcyB0aGUgcHJvcGVydGllcyBvZiB0aGUgb2JqZWN0LCBpZiBzdXBwbGllZCwgdG8gYmUgb2YgdGhlIG9yaWdpbmFsIHR5cGUgb3IgRHluYW1pY0Zvcm1Hcm91cCBvciwgRm9ybUFycmF5XG5leHBvcnQgdHlwZSBGb3JtTW9kZWw8VD4gPSB7XG4gIFtQIGluIGtleW9mIFRdPzogVFtQXSB8IER5bmFtaWNGb3JtR3JvdXA8YW55PiB8IEZvcm1BcnJheTtcbn07XG5cbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUdyb3VwPFRNb2RlbD4gZXh0ZW5kcyBGb3JtR3JvdXAge1xuICBwdWJsaWMgbmF0aXZlVmFsaWRhdGVFcnJvcnMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERpY3Rpb25hcnk+KHt9KTtcbiAgcHVibGljIGN1c3RvbVZhbGlkYXRlRXJyb3JzID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTaG9ydFZhbGlkYXRpb25FcnJvcnM+KHt9KTtcbiAgcHVibGljIGZvcm1FcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycyB8IG51bGwgPSBudWxsO1xuICBwdWJsaWMgZm9ybUZpZWxkczogRGljdGlvbmFyeTtcbiAgcHVibGljIG9iamVjdENoYW5nZSA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgcHJvdGVjdGVkIEZvcm1Db250cm9sQ2xhc3MgPSBEeW5hbWljRm9ybUNvbnRyb2w7XG4gIHByb3RlY3RlZCBfb2JqZWN0OiBUTW9kZWwgfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkIF9leHRlcm5hbEVycm9yczogU2hvcnRWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCBfdmFsaWRhdG9yT3B0aW9uczogVmFsaWRhdG9yT3B0aW9ucyB8IG51bGwgPSBudWxsO1xuICBwcm90ZWN0ZWQgX2ZiID0gbmV3IEZvcm1CdWlsZGVyKCk7XG4gIHByaXZhdGUgX2Zvcm1HZW46IFdpZGdldE9wdGlvbnNbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZmFjdG9yeU1vZGVsOiBDbGFzc1R5cGU8VE1vZGVsPixcbiAgICBwdWJsaWMgZmllbGRzOiBGb3JtTW9kZWw8VE1vZGVsPixcbiAgICB2YWxpZGF0b3JPck9wdHM/OlxuICAgICAgfCBWYWxpZGF0b3JGblxuICAgICAgfCBWYWxpZGF0b3JGbltdXG4gICAgICB8IEFic3RyYWN0Q29udHJvbE9wdGlvbnNcbiAgICAgIHwgbnVsbCxcbiAgICBhc3luY1ZhbGlkYXRvcj86IEFzeW5jVmFsaWRhdG9yRm4gfCBBc3luY1ZhbGlkYXRvckZuW10gfCBudWxsXG4gICkge1xuICAgIHN1cGVyKHt9LCB2YWxpZGF0b3JPck9wdHMsIGFzeW5jVmFsaWRhdG9yKTtcbiAgICAvKlxuICAgIGNvbnN0IGNsYXNzVmFsaWRhdG9ycyA9IER5bmFtaWNGb3JtR3JvdXAuZ2V0Q2xhc3NWYWxpZGF0b3JzPFRNb2RlbD4oXG4gICAgICB0aGlzLmZhY3RvcnlNb2RlbCxcbiAgICAgIHRoaXMuZmllbGRzLFxuICAgICAgdGhpcy5kZWZhdWx0VmFsaWRhdG9yT3B0aW9uc1xuICAgICk7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZmIuZ3JvdXAoXG4gICAgICBjbGFzc1ZhbGlkYXRvcnNcbiAgICApO1xuICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgdGhpcy5hZGRDb250cm9sKGtleSwgZm9ybUdyb3VwLmNvbnRyb2xzW2tleV0pO1xuICAgIH0pO1xuICAgIHRoaXMudmFsdWVDaGFuZ2VzLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgIHRoaXMudmFsaWRhdGUoXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgdGhpcy5kZWZhdWx0VmFsaWRhdG9yT3B0aW9uc1xuICAgICAgKTtcbiAgICB9KTsqL1xuICAgIHRoaXMuZm9ybUZpZWxkcyA9IHRoaXMub25seUZpZWxkcyhmaWVsZHMpO1xuICAgIHRoaXMuX2Zvcm1HZW4gPSBnZXRGb3JtRmllbGRzT3B0aW9ucyhmYWN0b3J5TW9kZWwpO1xuICB9XG5cbiAgZ2V0Rm9ybUdlbkRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1HZW47XG4gIH1cblxuICAvLyBHZXR0ZXJzICYgU2V0dGVyc1xuICBzZXQgZXh0ZXJuYWxFcnJvcnMoZXh0ZXJuYWxFcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycyB8IG51bGwpIHtcbiAgICB0aGlzLl9leHRlcm5hbEVycm9ycyA9IGV4dGVybmFsRXJyb3JzO1xuICAgIHRoaXMudmFsaWRhdGUoKTtcbiAgfVxuICBnZXQgZXh0ZXJuYWxFcnJvcnMoKTogU2hvcnRWYWxpZGF0aW9uRXJyb3JzIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2V4dGVybmFsRXJyb3JzO1xuICB9XG5cbiAgc2V0IHZhbGlkYXRvck9wdGlvbnModmFsaWRhdG9yT3B0aW9uczogVmFsaWRhdG9yT3B0aW9ucyB8IG51bGwpIHtcbiAgICB0aGlzLl92YWxpZGF0b3JPcHRpb25zID0gdmFsaWRhdG9yT3B0aW9ucztcbiAgICB0aGlzLnZhbGlkYXRlKCk7XG4gIH1cbiAgZ2V0IHZhbGlkYXRvck9wdGlvbnMoKTogVmFsaWRhdG9yT3B0aW9ucyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl92YWxpZGF0b3JPcHRpb25zO1xuICB9XG5cbiAgc2V0IG9iamVjdChvYmplY3Q6IFRNb2RlbCkge1xuICAgIHRoaXMuc2V0T2JqZWN0KG9iamVjdCk7XG4gIH1cbiAgZ2V0IG9iamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPYmplY3QoKTtcbiAgfVxuXG4gIC8vIFB1YmxpYyBBUElcbiAgdmFsaWRhdGUoXG4gICAgZXh0ZXJuYWxFcnJvcnM/OiBTaG9ydFZhbGlkYXRpb25FcnJvcnMsXG4gICAgdmFsaWRhdG9yT3B0aW9ucz86IFZhbGlkYXRvck9wdGlvbnNcbiAgKSB7XG4gICAgdGhpcy52YWxpZGF0ZUFzeW5jKGV4dGVybmFsRXJyb3JzLCB2YWxpZGF0b3JPcHRpb25zKS50aGVuKFxuICAgICAgKCkgPT4ge30sXG4gICAgICBlcnJvciA9PiB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBhc3luYyB2YWxpZGF0ZUFzeW5jKFxuICAgIGV4dGVybmFsRXJyb3JzPzogU2hvcnRWYWxpZGF0aW9uRXJyb3JzLFxuICAgIHZhbGlkYXRvck9wdGlvbnM/OiBWYWxpZGF0b3JPcHRpb25zXG4gICkge1xuICAgIGlmIChleHRlcm5hbEVycm9ycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBleHRlcm5hbEVycm9ycyA9IGNsb25lRGVlcCh0aGlzLl9leHRlcm5hbEVycm9ycyk7XG4gICAgfVxuXG4gICAgaWYgKHZhbGlkYXRvck9wdGlvbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsaWRhdG9yT3B0aW9ucyA9IGNsb25lRGVlcCh0aGlzLl92YWxpZGF0b3JPcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoIWV4dGVybmFsRXJyb3JzKSB7XG4gICAgICBleHRlcm5hbEVycm9ycyA9IHt9O1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB2YWxpZGF0ZSh0aGlzLm9iamVjdCwgdmFsaWRhdG9yT3B0aW9ucyk7XG4gICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3JzID0gdGhpcy50cmFuc2Zvcm1WYWxpZGF0aW9uRXJyb3JzKHJlc3VsdCk7XG4gICAgICBjb25zdCBhbGxFcnJvcnMgPSB0aGlzLm1lcmdlRXJyb3JzKGV4dGVybmFsRXJyb3JzLCB2YWxpZGF0aW9uRXJyb3JzKTtcblxuICAgICAgdGhpcy5tYXJrQXNJbnZhbGlkRm9yRXh0ZXJuYWxFcnJvcnMoZXh0ZXJuYWxFcnJvcnMpO1xuICAgICAgdGhpcy5zZXRDdXN0b21FcnJvcnMoYWxsRXJyb3JzKTtcblxuICAgICAgLy8gdG9kbzogcmVmYWN0b3IsIGludmFsaWRhdGUgZm9ybSBpZiBleGlzdHMgYW55IGFsbEVycm9yc1xuICAgICAgbGV0IHVzZWRGb3JldmVySW52YWxpZCA9IGZhbHNlO1xuICAgICAgaWYgKFxuICAgICAgICBPYmplY3Qua2V5cyhhbGxFcnJvcnMpLmZpbHRlcihrZXkgPT4ga2V5ICE9PSBGT1JFVkVSX0lOVkFMSURfTkFNRSlcbiAgICAgICAgICAubGVuZ3RoID09PSAwICYmXG4gICAgICAgIHRoaXMuZ2V0KEZPUkVWRVJfSU5WQUxJRF9OQU1FKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ29udHJvbChGT1JFVkVSX0lOVkFMSURfTkFNRSk7XG4gICAgICAgIHVzZWRGb3JldmVySW52YWxpZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMudmFsaWQgJiZcbiAgICAgICAgT2JqZWN0LmtleXMoYWxsRXJyb3JzKS5sZW5ndGggPiAwICYmXG4gICAgICAgICF0aGlzLmdldChGT1JFVkVSX0lOVkFMSURfTkFNRSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLmFkZENvbnRyb2woXG4gICAgICAgICAgRk9SRVZFUl9JTlZBTElEX05BTUUsXG4gICAgICAgICAgbmV3IEZvcm1Db250cm9sKCcnLCBbZm9yZXZlckludmFsaWQgYXMgYW55XSlcbiAgICAgICAgKTtcbiAgICAgICAgdXNlZEZvcmV2ZXJJbnZhbGlkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh1c2VkRm9yZXZlckludmFsaWQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KHtcbiAgICAgICAgICBvbmx5U2VsZjogdHJ1ZSxcbiAgICAgICAgICBlbWl0RXZlbnQ6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBzZXRDdXN0b21FcnJvcnMoYWxsRXJyb3JzOiBhbnkpIHtcbiAgICB0aGlzLmZvcm1FcnJvcnMgPSBhbGxFcnJvcnM7XG4gICAgdGhpcy5jdXN0b21WYWxpZGF0ZUVycm9ycy5uZXh0KHRoaXMuZm9ybUVycm9ycyBhcyBTaG9ydFZhbGlkYXRpb25FcnJvcnMgKTtcbiAgICB0aGlzLm5hdGl2ZVZhbGlkYXRlRXJyb3JzLm5leHQodGhpcy5jb2xsZWN0RXJyb3JzKHRoaXMpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb2xsZWN0RXJyb3JzKGNvbnRyb2w6IERpY3Rpb25hcnksIGlzUm9vdCA9IHRydWUpOiBhbnkgfCBudWxsIHtcbiAgICBpZiAoY29udHJvbC5jb250cm9scykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uKGlzUm9vdCA/IHRoaXMuZXJyb3JzIDoge30pLFxuICAgICAgICAuLi5PYmplY3QuZW50cmllcyhjb250cm9sLmNvbnRyb2xzKS5yZWR1Y2UoXG4gICAgICAgICAgKGFjYzogYW55LCBba2V5LCBjaGlsZENvbnRyb2xdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZEVycm9ycyA9IHRoaXMuY29sbGVjdEVycm9ycyhjaGlsZENvbnRyb2wgYXMgRGljdGlvbmFyeTxhbnk+LCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGNoaWxkRXJyb3JzICYmXG4gICAgICAgICAgICAgIGtleSAhPT0gJ2ZvcmV2ZXJJbnZhbGlkJyAmJlxuICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjaGlsZEVycm9ycykubGVuZ3RoID4gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGFjYyA9IHtcbiAgICAgICAgICAgICAgICAuLi5hY2MsXG4gICAgICAgICAgICAgICAgW2tleV06IHtcbiAgICAgICAgICAgICAgICAgIC4uLihhY2MgJiYgYWNjW2tleV0gPyBhY2Nba2V5XSA6IHt9KSxcbiAgICAgICAgICAgICAgICAgIC4uLmNoaWxkRXJyb3JzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICB9LFxuICAgICAgICAgIHt9XG4gICAgICAgIClcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb250cm9sLmVycm9ycztcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZUFsbEZvcm1GaWVsZHMoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5jb250cm9scykuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBjb25zdCBjb250cm9sID0gdGhpcy5nZXQoZmllbGQpO1xuXG4gICAgICAvLyBDb250cm9sXG4gICAgICBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XG4gICAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgfVxuICAgICAgLy8gR3JvdXA6IHJlY3Vyc2l2ZVxuICAgICAgZWxzZSBpZiAoY29udHJvbCBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgY29udHJvbC52YWxpZGF0ZUFsbEZvcm1GaWVsZHMoKTtcbiAgICAgIH1cbiAgICAgIC8vIEFycmF5XG4gICAgICBlbHNlIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9scy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIC8vIENvbnRyb2wgaW4gQXJyYXlcbiAgICAgICAgICBpZiAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBpbnN0YW5jZW9mIEZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBhcyBGb3JtQ29udHJvbCkubWFya0FzVG91Y2hlZCh7XG4gICAgICAgICAgICAgIG9ubHlTZWxmOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gR3JvdXAgaW4gQXJyYXk6IHJlY3Vyc2l2ZVxuICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXBcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgICgoY29udHJvbCBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW2ldIGFzIER5bmFtaWNGb3JtR3JvdXA8XG4gICAgICAgICAgICAgIGFueVxuICAgICAgICAgICAgPikudmFsaWRhdGVBbGxGb3JtRmllbGRzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXNldFZhbGlkYXRlQWxsRm9ybUZpZWxkcygpIHtcbiAgICB0aGlzLm1hcmtBc0ludmFsaWRGb3JFeHRlcm5hbEVycm9ycyh7fSk7XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLmNvbnRyb2xzKS5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLmdldChmaWVsZCk7XG5cbiAgICAgIC8vIENvbnRyb2xcbiAgICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgY29udHJvbC5zZXRFcnJvcnMobnVsbCwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICBjb250cm9sLm1hcmtBc1VudG91Y2hlZCh7IG9ubHlTZWxmOiB0cnVlIH0pO1xuICAgICAgICBjb250cm9sLm1hcmtBc1ByaXN0aW5lKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICB9XG4gICAgICAvLyBHcm91cDogcmVjdXJzaXZlXG4gICAgICBlbHNlIGlmIChjb250cm9sIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgICBjb250cm9sLnJlc2V0VmFsaWRhdGVBbGxGb3JtRmllbGRzKCk7XG4gICAgICB9XG4gICAgICAvLyBBcnJheVxuICAgICAgZWxzZSBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAvLyBDb250cm9sIGluIEFycmF5XG4gICAgICAgICAgaWYgKChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgKChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbXG4gICAgICAgICAgICAgIGlcbiAgICAgICAgICAgIF0gYXMgRm9ybUNvbnRyb2wpLnNldEVycm9ycyhudWxsLCB7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgICAgICAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tcbiAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgXSBhcyBGb3JtQ29udHJvbCkubWFya0FzVW50b3VjaGVkKHsgb25seVNlbGY6IHRydWUgfSk7XG4gICAgICAgICAgICAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBhcyBGb3JtQ29udHJvbCkubWFya0FzUHJpc3RpbmUoe1xuICAgICAgICAgICAgICBvbmx5U2VsZjogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEdyb3VwIGluIEFycmF5OiByZWN1cnNpdmVcbiAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgIChjb250cm9sIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gaW5zdGFuY2VvZiBEeW5hbWljRm9ybUdyb3VwXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAoKGNvbnRyb2wgYXMgRm9ybUFycmF5KS5jb250cm9sc1tpXSBhcyBEeW5hbWljRm9ybUdyb3VwPFxuICAgICAgICAgICAgICBhbnlcbiAgICAgICAgICAgID4pLnJlc2V0VmFsaWRhdGVBbGxGb3JtRmllbGRzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zZXRDdXN0b21FcnJvcnMoe30pO1xuICB9XG5cbiAgY2xhc3NUb0NsYXNzPFRDbGFzc01vZGVsPihvYmplY3Q6IFRDbGFzc01vZGVsKSB7XG4gICAgcmV0dXJuIGNsYXNzVG9DbGFzcyhvYmplY3QsIHsgaWdub3JlRGVjb3JhdG9yczogdHJ1ZSB9KTtcbiAgfVxuXG4gIHBsYWluVG9DbGFzczxUQ2xhc3NNb2RlbCwgT2JqZWN0PihcbiAgICBjbHM6IENsYXNzVHlwZTxUQ2xhc3NNb2RlbD4sXG4gICAgcGxhaW46IE9iamVjdFxuICApIHtcbiAgICByZXR1cm4gcGxhaW5Ub0NsYXNzKGNscywgcGxhaW4sIHsgaWdub3JlRGVjb3JhdG9yczogdHJ1ZSB9KTtcbiAgfVxuXG4gIGFzeW5jIHNldEV4dGVybmFsRXJyb3JzQXN5bmMoZXh0ZXJuYWxFcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycykge1xuICAgIHRoaXMuX2V4dGVybmFsRXJyb3JzID0gZXh0ZXJuYWxFcnJvcnM7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLnZhbGlkYXRlQXN5bmMoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgc2V0RXh0ZXJuYWxFcnJvcnMoZXh0ZXJuYWxFcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycykge1xuICAgIHRoaXMuc2V0RXh0ZXJuYWxFcnJvcnNBc3luYyhleHRlcm5hbEVycm9ycykudGhlbihcbiAgICAgICgpID0+IHt9LFxuICAgICAgZXJyb3IgPT4ge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZ2V0RXh0ZXJuYWxFcnJvcnMoKTogU2hvcnRWYWxpZGF0aW9uRXJyb3JzIHtcbiAgICByZXR1cm4gdGhpcy5fZXh0ZXJuYWxFcnJvcnMgYXMgU2hvcnRWYWxpZGF0aW9uRXJyb3JzO1xuICB9XG5cbiAgY2xlYXJFeHRlcm5hbEVycm9ycygpIHtcbiAgICB0aGlzLnNldEV4dGVybmFsRXJyb3JzKHt9KTtcbiAgfVxuICBjbGVhckV4dGVybmFsRXJyb3JzQXN5bmMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0RXh0ZXJuYWxFcnJvcnNBc3luYyh7fSk7XG4gIH1cblxuICBhc3luYyBzZXRWYWxpZGF0b3JPcHRpb25zQXN5bmModmFsaWRhdG9yT3B0aW9uczogVmFsaWRhdG9yT3B0aW9ucykge1xuICAgIHRoaXMuX3ZhbGlkYXRvck9wdGlvbnMgPSB2YWxpZGF0b3JPcHRpb25zO1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy52YWxpZGF0ZUFzeW5jKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIHNldFZhbGlkYXRvck9wdGlvbnModmFsaWRhdG9yT3B0aW9uczogVmFsaWRhdG9yT3B0aW9ucykge1xuICAgIHRoaXMuc2V0VmFsaWRhdG9yT3B0aW9uc0FzeW5jKHZhbGlkYXRvck9wdGlvbnMpLnRoZW4oXG4gICAgICAoKSA9PiB7fSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGdldFZhbGlkYXRvck9wdGlvbnMoKTogVmFsaWRhdG9yT3B0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkYXRvck9wdGlvbnMgYXMgVmFsaWRhdG9yT3B0aW9ucztcbiAgfVxuXG4gIC8vIEhlbHBlcnNcbiAgcHJvdGVjdGVkIG9ubHlGaWVsZHMoZmllbGRzOiBGb3JtTW9kZWw8YW55Pik6IERpY3Rpb25hcnkge1xuICAgIGNvbnN0IG5ld0ZpZWxkczogRGljdGlvbmFyeSA9IHt9O1xuXG4gICAgaWYgKGZpZWxkcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBPYmplY3Qua2V5cyhmaWVsZHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGZpZWxkc1trZXldIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgICAgIC8vIEdyb3VwOiByZWN1cnNpdmVcbiAgICAgICAgICBuZXdGaWVsZHNba2V5XSA9IHRoaXMub25seUZpZWxkcyhcbiAgICAgICAgICAgIChmaWVsZHNba2V5XSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT4pLmZvcm1GaWVsZHNcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEFycmF5XG4gICAgICAgICAgaWYgKGZpZWxkc1trZXldIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChmaWVsZHNba2V5XSBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzWzBdIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIC8vIEdyb3VwIHdpdGhpbiBBcnJheTogcmVjdXJzaXZlXG4gICAgICAgICAgICAgIG5ld0ZpZWxkc1trZXldID0gdGhpcy5vbmx5RmllbGRzKFxuICAgICAgICAgICAgICAgICgoZmllbGRzW2tleV0gYXMgRm9ybUFycmF5KS5jb250cm9sc1swXSBhcyBEeW5hbWljRm9ybUdyb3VwPFxuICAgICAgICAgICAgICAgICAgYW55XG4gICAgICAgICAgICAgICAgPikuZm9ybUZpZWxkc1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gQ29udHJvbCB3aXRoaW4gQXJyYXlcbiAgICAgICAgICAgICAgbmV3RmllbGRzW2tleV0gPSAoZmllbGRzW2tleV0gYXMgRm9ybUFycmF5KS5jb250cm9sc1swXS52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSGFuZGxlIENvbnRyb2xcbiAgICAgICAgICAgIG5ld0ZpZWxkc1trZXldID0gZmllbGRzW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3RmllbGRzO1xuICB9XG5cbiAgdHJhbnNmb3JtVmFsaWRhdGlvbkVycm9ycyhlcnJvcnM6IFZhbGlkYXRpb25FcnJvcltdKTogU2hvcnRWYWxpZGF0aW9uRXJyb3JzIHtcbiAgICBjb25zdCBjdXN0b21FcnJvcnM6IFNob3J0VmFsaWRhdGlvbkVycm9ycyA9IHt9O1xuXG4gICAgZXJyb3JzLmZvckVhY2goKGVycm9yOiBWYWxpZGF0aW9uRXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvciAmJiBlcnJvci5jb25zdHJhaW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGVycm9yLmNvbnN0cmFpbnRzKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGlmICghY3VzdG9tRXJyb3JzW2Vycm9yLnByb3BlcnR5XSkge1xuICAgICAgICAgICAgY3VzdG9tRXJyb3JzW2Vycm9yLnByb3BlcnR5XSA9IFtdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChjdXN0b21FcnJvcnNbZXJyb3IucHJvcGVydHldIGFzIHN0cmluZ1tdKS5pbmRleE9mKFxuICAgICAgICAgICAgICBlcnJvci5jb25zdHJhaW50c1trZXldXG4gICAgICAgICAgICApID09PSAtMVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgKGN1c3RvbUVycm9yc1tlcnJvci5wcm9wZXJ0eV0gYXMgc3RyaW5nW10pLnB1c2goXG4gICAgICAgICAgICAgIGVycm9yLmNvbnN0cmFpbnRzW2tleV1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9yLmNoaWxkcmVuICE9PSB1bmRlZmluZWQgJiYgZXJyb3IuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIGN1c3RvbUVycm9yc1tlcnJvci5wcm9wZXJ0eV0gPSB0aGlzLnRyYW5zZm9ybVZhbGlkYXRpb25FcnJvcnMoXG4gICAgICAgICAgZXJyb3IuY2hpbGRyZW5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjdXN0b21FcnJvcnM7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWVyZ2VFcnJvcnMoXG4gICAgZXh0ZXJuYWxFcnJvcnM/OiBTaG9ydFZhbGlkYXRpb25FcnJvcnMsXG4gICAgdmFsaWRhdGlvbkVycm9ycz86IFNob3J0VmFsaWRhdGlvbkVycm9yc1xuICApIHtcbiAgICBjb25zdCBjbG9uZWRFeHRlcm5hbEVycm9ycyA9IGNsb25lRGVlcChleHRlcm5hbEVycm9ycyk7XG4gICAgcmV0dXJuIG1lcmdlV2l0aChcbiAgICAgIGNsb25lZEV4dGVybmFsRXJyb3JzLFxuICAgICAgdmFsaWRhdGlvbkVycm9ycyxcbiAgICAgIChvYmpWYWx1ZSwgc3JjVmFsdWUpID0+IHtcbiAgICAgICAgaWYgKGNhbk1lcmdlKCkpIHtcbiAgICAgICAgICByZXR1cm4gb2JqVmFsdWUuY29uY2F0KHNyY1ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNhbk1lcmdlKCkge1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KG9ialZhbHVlKSAmJlxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShzcmNWYWx1ZSkgJiZcbiAgICAgICAgICAgIG9ialZhbHVlLmZpbHRlcihvYmpJdGVtID0+IHNyY1ZhbHVlLmluZGV4T2Yob2JqSXRlbSkgIT09IC0xKVxuICAgICAgICAgICAgICAubGVuZ3RoID09PSAwXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbWFya0FzSW52YWxpZEZvckV4dGVybmFsRXJyb3JzKFxuICAgIGVycm9yczogU2hvcnRWYWxpZGF0aW9uRXJyb3JzLFxuICAgIGNvbnRyb2xzPzogRGljdGlvbmFyeTxBYnN0cmFjdENvbnRyb2w+XG4gICkge1xuICAgIGlmICghY29udHJvbHMpIHtcbiAgICAgIGNvbnRyb2xzID0gdGhpcy5jb250cm9scztcbiAgICB9XG4gICAgT2JqZWN0LmtleXMoY29udHJvbHMpLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgY29uc3QgY29udHJvbCA9IGNvbnRyb2xzIVtmaWVsZF07XG5cbiAgICAgIC8vIENvbnRyb2xcbiAgICAgIGlmIChjb250cm9sIGluc3RhbmNlb2YgRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgaWYgKGVycm9ycyAmJiBlcnJvcnNbZmllbGRdKSB7XG4gICAgICAgICAgY29udHJvbC5zZXRFcnJvcnMoeyBleHRlcm5hbEVycm9yOiB0cnVlIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjb250cm9sLmVycm9ycyAmJiBjb250cm9sLmVycm9ycy5leHRlcm5hbEVycm9yID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb250cm9sLnNldEVycm9ycyhudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIEdyb3VwXG4gICAgICBlbHNlIGlmIChjb250cm9sIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgICBjb250cm9sLm1hcmtBc0ludmFsaWRGb3JFeHRlcm5hbEVycm9ycyhcbiAgICAgICAgICBlcnJvcnMgJiYgZXJyb3JzW2ZpZWxkXVxuICAgICAgICAgICAgPyAoZXJyb3JzW2ZpZWxkXSBhcyBTaG9ydFZhbGlkYXRpb25FcnJvcnMpXG4gICAgICAgICAgICA6IHt9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICAvLyBBcnJheVxuICAgICAgZWxzZSBpZiAoY29udHJvbCBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IChjb250cm9sIGFzIEZvcm1BcnJheSkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAvLyBDb250cm9sIGluIEFycmF5XG4gICAgICAgICAgaWYgKGNvbnRyb2xbaV0gaW5zdGFuY2VvZiBGb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgaWYgKGVycm9ycyAmJiBlcnJvcnNbaV0gJiYgZXJyb3JzW2ldW2ZpZWxkXSkge1xuICAgICAgICAgICAgICBjb250cm9sW2ldLnNldEVycm9ycyh7IGV4dGVybmFsRXJyb3I6IHRydWUgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICBjb250cm9sW2ldLmVycm9ycyAmJlxuICAgICAgICAgICAgICBjb250cm9sW2ldLmVycm9ycy5leHRlcm5hbEVycm9yID09PSB0cnVlXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29udHJvbFtpXS5zZXRFcnJvcnMobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEdyb3VwIGluIEFycmF5XG4gICAgICAgICAgZWxzZSBpZiAoY29udHJvbFtpXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgICAgIGNvbnRyb2xbaV0ubWFya0FzSW52YWxpZEZvckV4dGVybmFsRXJyb3JzKFxuICAgICAgICAgICAgICBlcnJvcnMgJiYgZXJyb3JzW2ldICYmIGVycm9yc1tpXVtmaWVsZF1cbiAgICAgICAgICAgICAgICA/IChlcnJvcnNbaV1bZmllbGRdIGFzIFNob3J0VmFsaWRhdGlvbkVycm9ycylcbiAgICAgICAgICAgICAgICA6IHt9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGdldHMgYWxsIHZhbHVlcyBmcm9tIHRoZSBmb3JtIGNvbnRyb2xzIGFuZCBhbGwgc3ViIGZvcm0gZ3JvdXAgYW5kIGFycmF5IGNvbnRyb2xzIGFuZCByZXR1cm5zIGl0IGFzXG4gICAqIGFuIG9iamVjdFxuICAgKi9cbiAgcHJvdGVjdGVkIGdldE9iamVjdCgpOiBUTW9kZWwge1xuICAgIC8vIEluaXRpYWxpemUgdGhlIHNoYXBlIG9mIHRoZSByZXNwb25zZVxuICAgIGNvbnN0IG9iamVjdCA9IHRoaXMuX29iamVjdFxuICAgICAgPyB0aGlzLmNsYXNzVG9DbGFzcyh0aGlzLl9vYmplY3QpXG4gICAgICA6IHRoaXMuZmFjdG9yeU1vZGVsXG4gICAgICA/IG5ldyB0aGlzLmZhY3RvcnlNb2RlbCgpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChvYmplY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gUmVjdXJzaXZlbHkgZ2V0IHRoZSB2YWx1ZSBvZiBhbGwgZmllbGRzXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLmNvbnRyb2xzKVxuICAgICAgICAuZmlsdGVyKG5hbWUgPT4gbmFtZSAhPT0gRk9SRVZFUl9JTlZBTElEX05BTUUpXG4gICAgICAgIC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgLy8gSGFuZGxlIEdyb3VwXG4gICAgICAgICAgaWYgKHRoaXMuY29udHJvbHNba2V5XSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgICAgIG9iamVjdFtrZXldID0gKHRoaXMuY29udHJvbHNba2V5XSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT4pLm9iamVjdDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBIYW5kbGUgRm9ybSBBcnJheVxuICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY29udHJvbHNba2V5XSBpbnN0YW5jZW9mIEZvcm1BcnJheSkge1xuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB2YWx1ZVxuICAgICAgICAgICAgb2JqZWN0W2tleV0gPSBbXTtcblxuICAgICAgICAgICAgZm9yIChcbiAgICAgICAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAgICAgICBpIDwgKHRoaXMuY29udHJvbHNba2V5XSBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzLmxlbmd0aDtcbiAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgbGV0IHZhbHVlO1xuXG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAodGhpcy5jb250cm9sc1trZXldIGFzIEZvcm1BcnJheSkuY29udHJvbHNbaV0gaW5zdGFuY2VvZlxuICAgICAgICAgICAgICAgIER5bmFtaWNGb3JtR3JvdXBcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgZ2V0IG9iamVjdCBncm91cFxuICAgICAgICAgICAgICAgIHZhbHVlID0gKCh0aGlzLmNvbnRyb2xzW2tleV0gYXMgRm9ybUFycmF5KS5jb250cm9sc1tcbiAgICAgICAgICAgICAgICAgIGlcbiAgICAgICAgICAgICAgICBdIGFzIER5bmFtaWNGb3JtR3JvdXA8YW55Pikub2JqZWN0O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gKHRoaXMuY29udHJvbHNba2V5XSBhcyBGb3JtQXJyYXkpLmNvbnRyb2xzW2ldLnZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmICh2YWx1ZSAmJiBPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIG9iamVjdFtrZXldLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSGFuZGxlIENvbnRyb2xcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9iamVjdFtrZXldID0gdGhpcy5jb250cm9sc1trZXldLnZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAodGhpcy5mYWN0b3J5TW9kZWxcbiAgICAgID8gdGhpcy5wbGFpblRvQ2xhc3ModGhpcy5mYWN0b3J5TW9kZWwsIG9iamVjdClcbiAgICAgIDogb2JqZWN0KSBhcyBUTW9kZWw7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgdmFsdWUgb2YgZXZlcnkgY29udHJvbCBvbiB0aGUgZm9ybSBhbmQgcmVjdXJzaXZlbHkgc2V0cyB0aGUgdmFsdWVzIG9mIHRoZSBjb250cm9sc1xuICAgKiBvbiBhbGwgc3ViIGZvcm0gZ3JvdXBzXG4gICAqXG4gICAqIEBwYXJhbSBvYmplY3QgdGhlIGRhdGEgdG8gYXNzaWduIHRvIGFsbCBjb250cm9scyBvZiB0aGUgZm9ybSBncm91cCBhbmQgc3ViIGdyb3Vwc1xuICAgKi9cbiAgcHJvdGVjdGVkIHNldE9iamVjdChvYmplY3Q6IFRNb2RlbCkge1xuICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiB0aGlzLmZhY3RvcnlNb2RlbCkge1xuICAgICAgdGhpcy5fb2JqZWN0ID0gdGhpcy5jbGFzc1RvQ2xhc3Mob2JqZWN0KTsgLy8gRW5zdXJlIGNvcnJlY3QgdHlwZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9vYmplY3QgPSB0aGlzLnBsYWluVG9DbGFzcyh0aGlzLmZhY3RvcnlNb2RlbCwgb2JqZWN0IGFzIE9iamVjdCk7IC8vIENvbnZlcnQgdG8gTW9kZWwgdHlwZVxuICAgIH1cblxuICAgIC8vIFJlY3Vyc2l2ZWx5IHNldCB0aGUgdmFsdWUgb2YgYWxsIGZpZWxkc1xuICAgIE9iamVjdC5rZXlzKHRoaXMuY29udHJvbHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIC8vIEhhbmRsZSBHcm91cFxuICAgICAgaWYgKHRoaXMuY29udHJvbHNba2V5XSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXApIHtcbiAgICAgICAgKHRoaXMuY29udHJvbHNba2V5XSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT4pLm9iamVjdCA9IHRoaXMuX29iamVjdFxuICAgICAgICAgID8gdGhpcy5fb2JqZWN0W2tleV1cbiAgICAgICAgICA6IHt9O1xuICAgICAgfVxuXG4gICAgICAvLyBIYW5kbGUgRm9ybUFycmF5XG4gICAgICBlbHNlIGlmICh0aGlzLmNvbnRyb2xzW2tleV0gaW5zdGFuY2VvZiBGb3JtQXJyYXkpIHtcbiAgICAgICAgY29uc3Qgb2JqZWN0QXJyYXkgPSB0aGlzLl9vYmplY3QgPyB0aGlzLl9vYmplY3Rba2V5XSA6IFtdO1xuICAgICAgICBjb25zdCBmb3JtQXJyYXkgPSB0aGlzLmNvbnRyb2xzW2tleV0gYXMgRm9ybUFycmF5O1xuICAgICAgICBjb25zdCBpc0Zvcm1Hcm91cCA9IGZvcm1BcnJheS5jb250cm9sc1swXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXA7XG4gICAgICAgIGNvbnN0IGZpcnN0Rm9ybUdyb3VwID0gZm9ybUFycmF5LmNvbnRyb2xzWzBdIGFzIER5bmFtaWNGb3JtR3JvdXA8YW55PjtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRyb2wgPSBmb3JtQXJyYXkuY29udHJvbHNbMF0gYXMgRm9ybUNvbnRyb2w7XG5cbiAgICAgICAgLy8gQ2xlYXIgRm9ybUFycmF5IHdoaWxlIHJldGFpbmluZyB0aGUgcmVmZXJlbmNlXG4gICAgICAgIHdoaWxlIChmb3JtQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgZm9ybUFycmF5LnJlbW92ZUF0KDApO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmplY3RBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChpc0Zvcm1Hcm91cCkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIEZvcm1Hcm91cFxuICAgICAgICAgICAgY29uc3QgZHluYW1pY0Zvcm1Hcm91cCA9IG5ldyBEeW5hbWljRm9ybUdyb3VwKFxuICAgICAgICAgICAgICBmaXJzdEZvcm1Hcm91cC5mYWN0b3J5TW9kZWwsXG4gICAgICAgICAgICAgIGZpcnN0Rm9ybUdyb3VwLmZvcm1GaWVsZHNcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGR5bmFtaWNGb3JtR3JvdXAuc2V0UGFyZW50KHRoaXMpO1xuXG4gICAgICAgICAgICBjb25zdCBjbGFzc1ZhbGlkYXRvcnMgPSBnZXRDbGFzc1ZhbGlkYXRvcnM8VE1vZGVsPihcbiAgICAgICAgICAgICAgZmlyc3RGb3JtR3JvdXAuZmFjdG9yeU1vZGVsLFxuICAgICAgICAgICAgICBmaXJzdEZvcm1Hcm91cC5mb3JtRmllbGRzLFxuICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHRoaXMuRm9ybUNvbnRyb2xDbGFzc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2ZiLmdyb3VwKGNsYXNzVmFsaWRhdG9ycyk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBhbGwgY29udHJvbHMgdG8gdGhlIGZvcm0gZ3JvdXBcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaChjdHJsS2V5ID0+IHtcbiAgICAgICAgICAgICAgZHluYW1pY0Zvcm1Hcm91cC5hZGRDb250cm9sKGN0cmxLZXksIGZvcm1Hcm91cC5jb250cm9sc1tjdHJsS2V5XSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQWRkIGEgdmFsdWUgY2hhbmdlIGxpc3RlbmVyIHRvIHRoZSBncm91cC4gb24gY2hhbmdlLCB2YWxpZGF0ZVxuICAgICAgICAgICAgZHluYW1pY0Zvcm1Hcm91cC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICBkeW5hbWljRm9ybUdyb3VwLnZhbGlkYXRlKHVuZGVmaW5lZCwgdGhpcy5fdmFsaWRhdG9yT3B0aW9ucyBhcyBWYWxpZGF0b3JPcHRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmb3JtQXJyYXkuY29udHJvbHMucHVzaChkeW5hbWljRm9ybUdyb3VwKTtcblxuICAgICAgICAgICAgLy8gUmVjdXNyaXZlbHkgc2V0IHRoZSBvYmplY3QgdmFsdWVcbiAgICAgICAgICAgIChmb3JtQXJyYXkuY29udHJvbHNbaV0gYXMgRHluYW1pY0Zvcm1Hcm91cDxhbnk+KS5vYmplY3QgPVxuICAgICAgICAgICAgICB0aGlzLl9vYmplY3QgJiYgb2JqZWN0QXJyYXkgJiYgb2JqZWN0QXJyYXlbaV1cbiAgICAgICAgICAgICAgICA/IG9iamVjdEFycmF5W2ldXG4gICAgICAgICAgICAgICAgOiB7fTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGNvbnRyb2xcbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xWYWx1ZSA9XG4gICAgICAgICAgICAgIHRoaXMuX29iamVjdCAmJiBvYmplY3RBcnJheSAmJiBvYmplY3RBcnJheVtpXVxuICAgICAgICAgICAgICAgID8gb2JqZWN0QXJyYXlbaV1cbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IG5ld0Zvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKFxuICAgICAgICAgICAgICBjb250cm9sVmFsdWUsXG4gICAgICAgICAgICAgIGZvcm1Db250cm9sLnZhbGlkYXRvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG5ld0Zvcm1Db250cm9sLnNldFBhcmVudCh0aGlzKTtcblxuICAgICAgICAgICAgLy8gQWRkIHRoZSBjb250cm9sIHRvIHRoZSBGb3JtQXJyYXlcbiAgICAgICAgICAgIGZvcm1BcnJheS5jb250cm9scy5wdXNoKG5ld0Zvcm1Db250cm9sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSGFuZGxlIENvbnRyb2xcbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBuZXdPYmplY3QgPSB0aGlzLl9vYmplY3QgPyB0aGlzLl9vYmplY3Rba2V5XSA6IFtdO1xuICAgICAgICB0aGlzLmNvbnRyb2xzW2tleV0uc2V0VmFsdWUoXG4gICAgICAgICAgdGhpcy5fb2JqZWN0ICYmIG5ld09iamVjdCA/IG5ld09iamVjdCA6IHVuZGVmaW5lZFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub2JqZWN0Q2hhbmdlLm5leHQodGhpcy5fb2JqZWN0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2xhc3NWYWxpZGF0b3JzPFRNb2RlbD4oXG4gIGZhY3RvcnlNb2RlbDogQ2xhc3NUeXBlPFRNb2RlbD4sXG4gIGZpZWxkczogRGljdGlvbmFyeSxcbiAgdmFsaWRhdG9yT3B0aW9ucz86IFZhbGlkYXRvck9wdGlvbnMsXG4gIEZvcm1Db250cm9sQ2xhc3M6IGFueSA9IER5bmFtaWNGb3JtQ29udHJvbFxuKSB7XG4gIC8vIEdldCB0aGUgdmFsaWRhdGlvbiBydWxlcyBmcm9tIHRoZSBvYmplY3QgZGVjb3JhdG9yc1xuICBjb25zdCBhbGxWYWxpZGF0aW9uTWV0YWRhdGFzOiBWYWxpZGF0aW9uTWV0YWRhdGFbXSA9IGdldEZyb21Db250YWluZXIoXG4gICAgTWV0YWRhdGFTdG9yYWdlXG4gICkuZ2V0VGFyZ2V0VmFsaWRhdGlvbk1ldGFkYXRhcyhmYWN0b3J5TW9kZWwsICcnKTtcblxuICAvLyBHZXQgdGhlIHZhbGlkYXRpb24gcnVsZXMgZm9yIHRoZSB2YWxpZGF0aW9uIGdyb3VwOiBodHRwczovL2dpdGh1Yi5jb20vdHlwZXN0YWNrL2NsYXNzLXZhbGlkYXRvciN2YWxpZGF0aW9uLWdyb3Vwc1xuICBjb25zdCB2YWxpZGF0aW9uR3JvdXBNZXRhZGF0YXM6IFZhbGlkYXRpb25NZXRhZGF0YVtdID0gZ2V0RnJvbUNvbnRhaW5lcihcbiAgICBNZXRhZGF0YVN0b3JhZ2VcbiAgKS5nZXRUYXJnZXRWYWxpZGF0aW9uTWV0YWRhdGFzKFxuICAgIGZhY3RvcnlNb2RlbCxcbiAgICAnJyxcbiAgICB2YWxpZGF0b3JPcHRpb25zICYmIHZhbGlkYXRvck9wdGlvbnMuZ3JvdXBzXG4gICAgICA/IHZhbGlkYXRvck9wdGlvbnMuZ3JvdXBzXG4gICAgICA6IHVuZGVmaW5lZFxuICApO1xuXG4gIGNvbnN0IGZvcm1Hcm91cEZpZWxkcyA9IHt9O1xuICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKCk7XG5cbiAgLy8gTG9vcCB0aHJvdWdoIGFsbCBmaWVsZHMgaW4gdGhlIGZvcm0gZGVmaW5pdGlvblxuICBPYmplY3Qua2V5cyhmaWVsZHMpXG4gICAgLmZpbHRlcihrZXkgPT4ga2V5LmluZGV4T2YoJ19fJykgIT09IDApXG4gICAgLmZvckVhY2goZmllbGROYW1lID0+IHtcbiAgICAgIC8vIENvbmRpdGlvbmFsIFZhbGlkYXRpb24gZm9yIHRoZSBmaWVsZFxuICAgICAgY29uc3QgY29uZGl0aW9uYWxWYWxpZGF0aW9uczogVmFsaWRhdGlvbk1ldGFkYXRhW10gPSBbXTtcbiAgICAgIHZhbGlkYXRpb25Hcm91cE1ldGFkYXRhcy5mb3JFYWNoKHZhbGlkYXRpb25NZXRhZGF0YSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpc1Byb3BlcnR5VmFsaWRhdG9yT2ZUeXBlKFxuICAgICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgICAgICAgICAgZmllbGROYW1lLFxuICAgICAgICAgICAgVmFsaWRhdGlvbktleXMuY29uZGl0aW9uYWwudHlwZVxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uZGl0aW9uYWxWYWxpZGF0aW9ucy5wdXNoKHZhbGlkYXRpb25NZXRhZGF0YSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBBbGwgTmVzdGVkIFZhbGlkYXRpb24gZm9yIHRoZSBmaWVsZFxuICAgICAgY29uc3QgYWxsTmVzdGVkVmFsaWRhdGlvbnM6IFZhbGlkYXRpb25NZXRhZGF0YVtdID0gW107XG4gICAgICBhbGxWYWxpZGF0aW9uTWV0YWRhdGFzLmZvckVhY2godmFsaWRhdGlvbk1ldGFkYXRhID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlzUHJvcGVydHlWYWxpZGF0b3JPZlR5cGUoXG4gICAgICAgICAgICB2YWxpZGF0aW9uTWV0YWRhdGEsXG4gICAgICAgICAgICBmaWVsZE5hbWUsXG4gICAgICAgICAgICBWYWxpZGF0aW9uS2V5cy5uZXN0ZWQudHlwZVxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgYWxsTmVzdGVkVmFsaWRhdGlvbnMucHVzaCh2YWxpZGF0aW9uTWV0YWRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gTmVzdGVkIFZhbGlkYXRpb24gZm9yIHRoZSBmaWVsZCBmb3IgdGhlIHJlcXVlc3RlZCBjbGFzcy12YWxpZGF0b3IgZ3JvdXBcbiAgICAgIGNvbnN0IG5lc3RlZEdyb3VwVmFsaWRhdGlvbnM6IFZhbGlkYXRpb25NZXRhZGF0YVtdID0gW107XG4gICAgICB2YWxpZGF0aW9uR3JvdXBNZXRhZGF0YXMuZm9yRWFjaCh2YWxpZGF0aW9uTWV0YWRhdGEgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaXNQcm9wZXJ0eVZhbGlkYXRvck9mVHlwZShcbiAgICAgICAgICAgIHZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICAgIFZhbGlkYXRpb25LZXlzLm5lc3RlZC50eXBlXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBuZXN0ZWRHcm91cFZhbGlkYXRpb25zLnB1c2godmFsaWRhdGlvbk1ldGFkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGZpZWxkRGVmaW5pdGlvbjogRHluYW1pY0Zvcm1Hcm91cEZpZWxkID0ge1xuICAgICAgICBkYXRhOiBmb3JtR3JvdXBGaWVsZHNbZmllbGROYW1lXSxcbiAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uczogW10sXG4gICAgICAgIHZhbGlkYXRpb25EZWZpbml0aW9uczogW11cbiAgICAgIH07XG5cbiAgICAgIGlmIChmaWVsZERlZmluaXRpb24uZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbi5kYXRhID0gZmllbGRzW2ZpZWxkTmFtZV07XG4gICAgICB9XG4gICAgICAvLyBUUlkgTElOSyBFWElTVFMgTkFUSVZFIFZBTElEQVRJT05TLCBVTlNUQUJMRSAhISFcbiAgICAgIGlmIChcbiAgICAgICAgQXJyYXkuaXNBcnJheShmaWVsZERlZmluaXRpb24uZGF0YSkgJiZcbiAgICAgICAgZmllbGREZWZpbml0aW9uLmRhdGEubGVuZ3RoID4gMSAmJlxuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YS5maWx0ZXIoXG4gICAgICAgICAgKHZhbGlkYXRpb25GdW5jdGlvbiwgaW5kZXgpID0+XG4gICAgICAgICAgICBpbmRleCA+IDAgJiYgdHlwZW9mIHZhbGlkYXRpb25GdW5jdGlvbiA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICApLmxlbmd0aCA+IDBcbiAgICAgICkge1xuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YVxuICAgICAgICAgIC5maWx0ZXIoXG4gICAgICAgICAgICAodmFsaWRhdGlvbkZ1bmN0aW9uLCBpbmRleCkgPT5cbiAgICAgICAgICAgICAgaW5kZXggPiAwICYmIHR5cGVvZiB2YWxpZGF0aW9uRnVuY3Rpb24gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICApXG4gICAgICAgICAgLmZvckVhY2godmFsaWRhdGlvbkZ1bmN0aW9uID0+XG4gICAgICAgICAgICBmaWVsZERlZmluaXRpb24udmFsaWRhdGlvbkZ1bmN0aW9ucy5wdXNoKHZhbGlkYXRpb25GdW5jdGlvbilcbiAgICAgICAgICApO1xuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YSA9IGZpZWxkRGVmaW5pdGlvbi5kYXRhWzBdO1xuICAgICAgfVxuXG4gICAgICB2YWxpZGF0aW9uR3JvdXBNZXRhZGF0YXMuZm9yRWFjaCh2YWxpZGF0aW9uTWV0YWRhdGEgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLnByb3BlcnR5TmFtZSA9PT0gZmllbGROYW1lICYmXG4gICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgIT09IFZhbGlkYXRpb25LZXlzLmNvbmRpdGlvbmFsLnR5cGVcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy8gQWRkIGFsbCB2YWxpZGF0aW9uIHRvIHRoZSBmaWVsZCBleGNlcHQgdGhlIEBOZXN0ZWRWYWxpZGF0aW9uIGRlZmluaXRpb24gYXNcbiAgICAgICAgICAvLyBiZWluZyBwYXJ0IG9mIHRoZSBmb3JtIHdvdWxkIGltcGx5IGl0IGlzIHZhbGlkYXRlZCBpZiBhbnkgb3RoZXIgcnVsZXMgYXJlIHByZXNlbnRcbiAgICAgICAgICBpZiAodmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgIT09IFZhbGlkYXRpb25LZXlzLm5lc3RlZC50eXBlKSB7XG4gICAgICAgICAgICBmaWVsZERlZmluaXRpb24udmFsaWRhdGlvbkRlZmluaXRpb25zLnB1c2godmFsaWRhdGlvbk1ldGFkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IHR5cGVLZXkgaW4gVmFsaWRhdGlvblR5cGVzKSB7XG4gICAgICAgICAgICBpZiAoVmFsaWRhdGlvblR5cGVzLmhhc093blByb3BlcnR5KHR5cGVLZXkpKSB7XG4gICAgICAgICAgICAgIC8vIEhhbmRsZSBOZXN0ZWQgVmFsaWRhdGlvblxuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY2hlY2tXaXRoQWxsTmVzdGVkVmFsaWRhdGlvbnMoXG4gICAgICAgICAgICAgICAgICBhbGxOZXN0ZWRWYWxpZGF0aW9ucyxcbiAgICAgICAgICAgICAgICAgIG5lc3RlZEdyb3VwVmFsaWRhdGlvbnMsXG4gICAgICAgICAgICAgICAgICBmaWVsZE5hbWVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmIChpc05lc3RlZFZhbGlkYXRlKHZhbGlkYXRpb25NZXRhZGF0YSwgdHlwZUtleSkpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG9iamVjdFRvVmFsaWRhdGUgPVxuICAgICAgICAgICAgICAgICAgICBmaWVsZHNbZmllbGROYW1lXSBpbnN0YW5jZW9mIER5bmFtaWNGb3JtR3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICA/IGZpZWxkc1tmaWVsZE5hbWVdLm9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgY29uc3QgbmVzdGVkVmFsaWRhdGUgPSBjcmVhdGVOZXN0ZWRWYWxpZGF0ZShcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0VG9WYWxpZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgc2V0RmllbGREYXRhKGZpZWxkTmFtZSwgZmllbGREZWZpbml0aW9uLCBuZXN0ZWRWYWxpZGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gSGFuZGxlIEN1c3RvbSBWYWxpZGF0aW9uXG4gICAgICAgICAgICAgIGlmIChpc0N1c3RvbVZhbGlkYXRlKHZhbGlkYXRpb25NZXRhZGF0YSwgdHlwZUtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXN0b21WYWxpZGF0aW9uID0gY3JlYXRlQ3VzdG9tVmFsaWRhdGlvbihcbiAgICAgICAgICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25NZXRhZGF0YVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgc2V0RmllbGREYXRhKGZpZWxkTmFtZSwgZmllbGREZWZpbml0aW9uLCBjdXN0b21WYWxpZGF0aW9uKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIEhhbmRsZSByZW1haW5pbmcgdmFsaWRhdGlvblxuICAgICAgICAgICAgICBpZiAoaXNEeW5hbWljVmFsaWRhdGUodmFsaWRhdGlvbk1ldGFkYXRhLCB0eXBlS2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGR5bmFtaWNWYWxpZGF0ZSA9IGNyZWF0ZUR5bmFtaWNWYWxpZGF0ZShcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbmFsVmFsaWRhdGlvbnMsXG4gICAgICAgICAgICAgICAgICBmaWVsZE5hbWVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHNldEZpZWxkRGF0YShmaWVsZE5hbWUsIGZpZWxkRGVmaW5pdGlvbiwgZHluYW1pY1ZhbGlkYXRlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBDb252ZXJ0IHRvIGEgc3RydWN0dXJlLCBhbmd1bGFyIHVuZGVyc3RhbmRzXG4gICAgICBpZiAoXG4gICAgICAgIGZpZWxkRGVmaW5pdGlvbi5kYXRhIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCB8fFxuICAgICAgICBmaWVsZERlZmluaXRpb24uZGF0YSBpbnN0YW5jZW9mIEZvcm1BcnJheVxuICAgICAgKSB7XG4gICAgICAgIGZvcm1Hcm91cEZpZWxkc1tmaWVsZE5hbWVdID0gZmllbGREZWZpbml0aW9uLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtR3JvdXBGaWVsZHNbZmllbGROYW1lXSA9IG5ldyBGb3JtQ29udHJvbENsYXNzKGZpZWxkRGVmaW5pdGlvbik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgcmV0dXJuIGZvcm1Hcm91cEZpZWxkcztcblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gTG9jYWwgSGVscGVyIGZ1bmN0aW9ucyB0byBoZWxwIG1ha2UgdGhlIG1haW4gY29kZSBtb3JlIHJlYWRhYmxlXG4gIC8vXG5cbiAgZnVuY3Rpb24gY3JlYXRlTmVzdGVkVmFsaWRhdGUoXG4gICAgb2JqZWN0VG9WYWxpZGF0ZTogYW55LFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhXG4gICkge1xuICAgIHJldHVybiBmdW5jdGlvbihjb250cm9sOiBGb3JtQ29udHJvbCkge1xuICAgICAgY29uc3QgaXNWYWxpZCA9XG4gICAgICAgIGdldFZhbGlkYXRlRXJyb3JzKFxuICAgICAgICAgIGNvbnRyb2wsXG4gICAgICAgICAgb2JqZWN0VG9WYWxpZGF0ZSAhPT0gdW5kZWZpbmVkID8gb2JqZWN0VG9WYWxpZGF0ZSA6IGNvbnRyb2wudmFsdWUsXG4gICAgICAgICAgdmFsaWRhdG9yT3B0aW9ucyBhcyBWYWxpZGF0b3JPcHRpb25zXG4gICAgICAgICkubGVuZ3RoID09PSAwO1xuICAgICAgcmV0dXJuIGdldElzVmFsaWRSZXN1bHQoaXNWYWxpZCwgdmFsaWRhdGlvbk1ldGFkYXRhLCAnbmVzdGVkVmFsaWRhdGUnKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRHluYW1pY1ZhbGlkYXRlKFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgIGNvbmRpdGlvbmFsVmFsaWRhdGlvbnM6IFZhbGlkYXRpb25NZXRhZGF0YVtdLFxuICAgIGZpZWxkTmFtZTogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiBmdW5jdGlvbihjb250cm9sOiBGb3JtQ29udHJvbCkge1xuICAgICAgaWYgKCFjb250cm9sKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBsZXQgaXNWYWxpZCA9XG4gICAgICAgIGNvbnRyb2wucGFyZW50ICYmIGNvbnRyb2wucGFyZW50LnZhbHVlXG4gICAgICAgICAgPyB2YWxpZGF0b3IudmFsaWRhdGVWYWx1ZUJ5TWV0YWRhdGEoY29udHJvbC52YWx1ZSwgdmFsaWRhdGlvbk1ldGFkYXRhKVxuICAgICAgICAgIDogdHJ1ZTtcblxuICAgICAgaWYgKCFpc1ZhbGlkICYmIGNvbmRpdGlvbmFsVmFsaWRhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB2YWxpZGF0ZUVycm9ycyA9IHNldE9iamVjdFZhbHVlQW5kR2V0VmFsaWRhdGlvbkVycm9ycyhcbiAgICAgICAgICBjb250cm9sLFxuICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICB2YWxpZGF0b3JPcHRpb25zIGFzIFZhbGlkYXRvck9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgICAgaXNWYWxpZCA9XG4gICAgICAgICAgdmFsaWRhdGVFcnJvcnMuZmlsdGVyKFxuICAgICAgICAgICAgKGVycm9yOiBWYWxpZGF0aW9uRXJyb3IpID0+IGVycm9yLnByb3BlcnR5ID09PSBmaWVsZE5hbWVcbiAgICAgICAgICApLmxlbmd0aCA9PT0gMDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGdldElzVmFsaWRSZXN1bHQoaXNWYWxpZCwgdmFsaWRhdGlvbk1ldGFkYXRhLCAnZHluYW1pY1ZhbGlkYXRlJyk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUN1c3RvbVZhbGlkYXRpb24oXG4gICAgZmllbGROYW1lOiBzdHJpbmcsXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGFcbiAgKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRyb2w6IEZvcm1Db250cm9sKSB7XG4gICAgICBjb25zdCB2YWxpZGF0ZUVycm9yczogVmFsaWRhdGlvbkVycm9yW10gPSBzZXRPYmplY3RWYWx1ZUFuZEdldFZhbGlkYXRpb25FcnJvcnMoXG4gICAgICAgIGNvbnRyb2wsXG4gICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgdmFsaWRhdG9yT3B0aW9ucyBhcyBWYWxpZGF0b3JPcHRpb25zXG4gICAgICApO1xuICAgICAgY29uc3QgaXNWYWxpZCA9IGdldEFsbEVycm9ycyh2YWxpZGF0ZUVycm9ycywgZmllbGROYW1lKS5sZW5ndGggPT09IDA7XG4gICAgICByZXR1cm4gZ2V0SXNWYWxpZFJlc3VsdChpc1ZhbGlkLCB2YWxpZGF0aW9uTWV0YWRhdGEsICdjdXN0b21WYWxpZGF0aW9uJyk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrV2l0aEFsbE5lc3RlZFZhbGlkYXRpb25zKFxuICAgIGFsbE5lc3RlZFZhbGlkYXRpb25zOiBWYWxpZGF0aW9uTWV0YWRhdGFbXSxcbiAgICBuZXN0ZWRWYWxpZGF0aW9uczogVmFsaWRhdGlvbk1ldGFkYXRhW10sXG4gICAga2V5OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGFsbE5lc3RlZFZhbGlkYXRpb25zLmxlbmd0aCA9PT0gbmVzdGVkVmFsaWRhdGlvbnMubGVuZ3RoIHx8XG4gICAgICAoKGZpZWxkc1trZXldIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCB8fFxuICAgICAgICBmaWVsZHNba2V5XSBpbnN0YW5jZW9mIEZvcm1BcnJheSkgJiZcbiAgICAgICAgYWxsTmVzdGVkVmFsaWRhdGlvbnMubGVuZ3RoID4gMCAmJiBuZXN0ZWRWYWxpZGF0aW9ucy5sZW5ndGggPT09IDApXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRHluYW1pY1ZhbGlkYXRlKFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgIHR5cGVLZXk6IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gKFxuICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgPT09IFZhbGlkYXRpb25UeXBlc1t0eXBlS2V5XSAmJlxuICAgICAgdmFsaWRhdG9yW3ZhbGlkYXRpb25NZXRhZGF0YS50eXBlXSAhPT0gdW5kZWZpbmVkXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtYXJrZWQgd2l0aCBAVmFsaWRhdGUoLi4uKVxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vdHlwZXN0YWNrL2NsYXNzLXZhbGlkYXRvciNjdXN0b20tdmFsaWRhdGlvbi1jbGFzc2VzXG4gICAqL1xuICBmdW5jdGlvbiBpc0N1c3RvbVZhbGlkYXRlKFxuICAgIHZhbGlkYXRpb25NZXRhZGF0YTogVmFsaWRhdGlvbk1ldGFkYXRhLFxuICAgIHR5cGVLZXk6IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4gKFxuICAgICAgaXNOb3RQcm9wZXJ0eVZhbGlkYXRpb24odmFsaWRhdGlvbk1ldGFkYXRhLCB0eXBlS2V5KSAmJlxuICAgICAgdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgPT09IFZhbGlkYXRpb25LZXlzLmN1c3RvbS50eXBlICYmXG4gICAgICB0eXBlS2V5ID09PSBWYWxpZGF0aW9uS2V5cy5jdXN0b20udHlwZUtleVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogbWFya2VkIHdpdGggQFZhbGlkYXRlTmVzdGVkKClcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL3R5cGVzdGFjay9jbGFzcy12YWxpZGF0b3IjdmFsaWRhdGluZy1uZXN0ZWQtb2JqZWN0c1xuICAgKi9cbiAgZnVuY3Rpb24gaXNOZXN0ZWRWYWxpZGF0ZShcbiAgICB2YWxpZGF0aW9uTWV0YWRhdGE6IFZhbGlkYXRpb25NZXRhZGF0YSxcbiAgICB0eXBlS2V5OiBzdHJpbmdcbiAgKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGlzTm90UHJvcGVydHlWYWxpZGF0aW9uKHZhbGlkYXRpb25NZXRhZGF0YSwgdHlwZUtleSkgJiZcbiAgICAgIHZhbGlkYXRpb25NZXRhZGF0YS50eXBlID09PSBWYWxpZGF0aW9uS2V5cy5uZXN0ZWQudHlwZSAmJlxuICAgICAgdHlwZUtleSA9PT0gVmFsaWRhdGlvbktleXMubmVzdGVkLnR5cGVLZXlcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb3RQcm9wZXJ0eVZhbGlkYXRpb24oXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGEsXG4gICAgdHlwZUtleTogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiAoXG4gICAgICB2YWxpZGF0aW9uTWV0YWRhdGEudHlwZSA9PT0gVmFsaWRhdGlvblR5cGVzW3R5cGVLZXldICYmXG4gICAgICB2YWxpZGF0b3JbdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGVdID09PSB1bmRlZmluZWRcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0RmllbGREYXRhKFxuICAgIGZpZWxkTmFtZTogc3RyaW5nLFxuICAgIGZpZWxkRGVmaW5pdGlvbjogRHluYW1pY0Zvcm1Hcm91cEZpZWxkLFxuICAgIHZhbGlkYXRpb25GdW5jdGlvbjogRnVuY3Rpb25cbiAgKSB7XG4gICAgLyogdG9kbzogbWF5YmUgbm90IG5lZWQsIGlmIGVuYWJsZSB0aGlzIGNvZGUsIGV4cGVyZW1lbnRhbCBtb2RlIG5vdCB3b3JrXG4gICAgaWYgKGZpZWxkc1tmaWVsZE5hbWVdIGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cCkge1xuICAgICAgZmllbGRzW2ZpZWxkTmFtZV0ub2JqZWN0ID0gZmllbGRzW2ZpZWxkTmFtZV0uZmllbGRzO1xuICAgIH0qL1xuXG4gICAgLy8gRmlsbCBmaWVsZCBkYXRhIGlmIGVtcHR5XG4gICAgaWYgKGZpZWxkRGVmaW5pdGlvbi5kYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZpZWxkRGVmaW5pdGlvbi5kYXRhID0gZmllbGRzW2ZpZWxkTmFtZV07XG4gICAgfVxuXG4gICAgZmllbGREZWZpbml0aW9uLnZhbGlkYXRpb25GdW5jdGlvbnMucHVzaCh2YWxpZGF0aW9uRnVuY3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QWxsRXJyb3JzKFxuICAgIHZhbGlkYXRlRXJyb3JzOiBWYWxpZGF0aW9uRXJyb3JbXSxcbiAgICBmaWVsZE5hbWU6IHN0cmluZ1xuICApOiBWYWxpZGF0aW9uRXJyb3JbXSB7XG4gICAgcmV0dXJuIHZhbGlkYXRlRXJyb3JzLmZpbHRlcihcbiAgICAgIChlcnJvcjogVmFsaWRhdGlvbkVycm9yKSA9PlxuICAgICAgICAvLyBDaGVjayBmb3IgbmVzdGVkL2NoaWxkIGVycm9yc1xuICAgICAgICAoZXJyb3IuY2hpbGRyZW4ubGVuZ3RoICYmXG4gICAgICAgICAgZXJyb3IuY2hpbGRyZW4uZmlsdGVyKGNoaWxkcmVuID0+IGNoaWxkcmVuLnByb3BlcnR5ID09PSBmaWVsZE5hbWUpKSB8fFxuICAgICAgICBlcnJvci5wcm9wZXJ0eSA9PT0gZmllbGROYW1lXG4gICAgKTtcbiAgfVxufVxuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vIEdsb2JhbCBIZWxwZXIgZnVuY3Rpb25zXG4vL1xuXG5mdW5jdGlvbiBpc1Byb3BlcnR5VmFsaWRhdG9yT2ZUeXBlKFxuICB2YWxpZGF0aW9uTWV0YWRhdGE6IFZhbGlkYXRpb25NZXRhZGF0YSxcbiAgZmllbGROYW1lOiBzdHJpbmcsXG4gIHZhbGlkYXRpb25NZXRhZGF0YVR5cGU6IHN0cmluZ1xuKSB7XG4gIHJldHVybiAoXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhLnByb3BlcnR5TmFtZSA9PT0gZmllbGROYW1lICYmXG4gICAgdmFsaWRhdGlvbk1ldGFkYXRhLnR5cGUgPT09IHZhbGlkYXRpb25NZXRhZGF0YVR5cGVcbiAgKTtcbn1cblxuZnVuY3Rpb24gc2V0T2JqZWN0VmFsdWVBbmRHZXRWYWxpZGF0aW9uRXJyb3JzKFxuICBjb250cm9sOiBGb3JtQ29udHJvbCxcbiAga2V5OiBzdHJpbmcsXG4gIHZhbGlkYXRvck9wdGlvbnM6IFZhbGlkYXRvck9wdGlvbnNcbikge1xuICBjb25zdCBvYmplY3QgPVxuICAgIGNvbnRyb2wucGFyZW50IGluc3RhbmNlb2YgRHluYW1pY0Zvcm1Hcm91cFxuICAgICAgPyAoY29udHJvbC5wYXJlbnQgYXMgRHluYW1pY0Zvcm1Hcm91cDxhbnk+KS5vYmplY3RcbiAgICAgIDogY29udHJvbC5wYXJlbnRcbiAgICAgID8gY29udHJvbC5wYXJlbnQudmFsdWVcbiAgICAgIDoge307XG5cbiAgaWYgKG9iamVjdCkge1xuICAgIG9iamVjdFtrZXldID0gY29udHJvbC52YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBnZXRWYWxpZGF0ZUVycm9ycyhjb250cm9sLCBvYmplY3QsIHZhbGlkYXRvck9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBnZXRWYWxpZGF0ZUVycm9ycyhcbiAgY29udHJvbDogRm9ybUNvbnRyb2wsXG4gIGRhdGFUb1ZhbGlkYXRlOiBhbnksXG4gIHZhbGlkYXRvck9wdGlvbnM6IFZhbGlkYXRvck9wdGlvbnNcbikge1xuICBjb25zdCB2YWxpZGF0ZUVycm9yczogVmFsaWRhdGlvbkVycm9yW10gPVxuICAgIGNvbnRyb2wucGFyZW50ICYmIGNvbnRyb2wucGFyZW50LnZhbHVlXG4gICAgICA/IHZhbGlkYXRlU3luYyhkYXRhVG9WYWxpZGF0ZSwgdmFsaWRhdG9yT3B0aW9ucylcbiAgICAgIDogW107XG4gIHJldHVybiB2YWxpZGF0ZUVycm9ycztcbn1cblxuZnVuY3Rpb24gZ2V0SXNWYWxpZFJlc3VsdChcbiAgaXNWYWxpZDogYm9vbGVhbixcbiAgdmFsaWRhdGlvbk1ldGFkYXRhOiBWYWxpZGF0aW9uTWV0YWRhdGEsXG4gIGVycm9yVHlwZTogRXJyb3JQcm9wZXJ0eU5hbWVcbikge1xuICByZXR1cm4gaXNWYWxpZFxuICAgID8gbnVsbFxuICAgIDoge1xuICAgICAgICBbZXJyb3JUeXBlXToge1xuICAgICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgICAgICB0eXBlOiB2YWxpZGF0aW9uTWV0YWRhdGEudHlwZVxuICAgICAgICB9XG4gICAgICB9O1xufVxuXG50eXBlIEVycm9yUHJvcGVydHlOYW1lID1cbiAgfCAnbmVzdGVkVmFsaWRhdGUnXG4gIHwgJ2N1c3RvbVZhbGlkYXRpb24nXG4gIHwgJ2R5bmFtaWNWYWxpZGF0ZSc7XG5cbmNvbnN0IFZhbGlkYXRpb25LZXlzID0ge1xuICBuZXN0ZWQ6IHtcbiAgICB0eXBlOiAnbmVzdGVkVmFsaWRhdGlvbicsXG4gICAgdHlwZUtleTogJ05FU1RFRF9WQUxJREFUSU9OJ1xuICB9LFxuICBjb25kaXRpb25hbDoge1xuICAgIHR5cGU6ICdjb25kaXRpb25hbFZhbGlkYXRpb24nXG4gIH0sXG4gIGN1c3RvbToge1xuICAgIHR5cGU6ICdjdXN0b21WYWxpZGF0aW9uJyxcbiAgICB0eXBlS2V5OiAnQ1VTVE9NX1ZBTElEQVRJT04nXG4gIH1cbn07XG4iXX0=