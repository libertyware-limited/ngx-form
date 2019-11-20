import 'reflect-metadata';
import { FormBuilder } from '@angular/forms';
import { plainToClass } from 'class-transformer';
import { isAbstractControlOptions, isDynamicFormGroupConfig, isLegacyOrOpts } from '../models/dynamic-form-group-config';
import { DynamicFormGroup, getClassValidators } from './dynamic-form-group';
import { DynamicFormControl } from './dynamic-form-control';
export class DynamicFormBuilder extends FormBuilder {
    constructor() {
        super(...arguments);
        this.FormGroupClass = DynamicFormGroup;
        this.FormControlClass = DynamicFormControl;
    }
    group(factoryModel, controlsConfig, options) {
        // Process the group with the controlsConfig passed into extra instead. (What does this accomplish?)
        if (controlsConfig &&
            (isAbstractControlOptions(controlsConfig) ||
                isLegacyOrOpts(controlsConfig) ||
                isDynamicFormGroupConfig(controlsConfig)) &&
            !options) {
            return this.group(factoryModel, undefined, controlsConfig);
        }
        // This section of code was added in from the original code - Jordan
        if (!controlsConfig) {
            const model = new factoryModel();
            const fields = model.getFormFields();
            controlsConfig = {
                ...fields
                    .map((field) => ({
                    [field.fieldName]: ''
                }))
                    .reduce((rev, current) => ({ ...rev, ...current }), {})
            };
        }
        const extra = options;
        let validators = null;
        let asyncValidators = null;
        let updateOn;
        if (extra != null) {
            if (isAbstractControlOptions(extra)) {
                // `extra` are `AbstractControlOptions`
                validators = extra.validators != null ? extra.validators : null;
                asyncValidators = extra.asyncValidators != null ? extra.asyncValidators : null;
                updateOn = extra.updateOn != null ? extra.updateOn : undefined;
            }
            if (isLegacyOrOpts(extra)) {
                // `extra` are legacy form group options
                validators = validators || [];
                if (extra.validator)
                    validators.push(extra.validator);
                asyncValidators = asyncValidators || [];
                if (extra.asyncValidator)
                    validators.push(extra.asyncValidator);
            }
            // Set default customValidatorOptions
            if (!isDynamicFormGroupConfig(extra)) {
                extra.customValidatorOptions = { validationError: { target: false } };
            }
        }
        let newControlsConfig;
        if (controlsConfig !== undefined) {
            newControlsConfig = controlsConfig;
        }
        // experimental
        if (controlsConfig === undefined) {
            newControlsConfig = { ...this.createEmptyObject(factoryModel) };
            Object.keys(newControlsConfig).forEach(key => {
                if (canCreateGroup()) {
                    // recursively create a dynamic group for the nested object
                    newControlsConfig[key] = this.group(newControlsConfig[key].constructor, undefined, {
                        ...(extra.customValidatorOptions
                            ? { customValidatorOptions: extra.customValidatorOptions }
                            : {}),
                        asyncValidators,
                        updateOn,
                        validators
                    });
                }
                else {
                    if (canCreateArray()) {
                        if (newControlsConfig[key][0].constructor) {
                            // recursively create an array with a group
                            newControlsConfig[key] = super.array(newControlsConfig[key].map((newControlsConfigItem) => this.group(newControlsConfigItem.constructor, undefined, {
                                ...(extra.customValidatorOptions
                                    ? { customValidatorOptions: extra.customValidatorOptions }
                                    : {}),
                                asyncValidators,
                                updateOn,
                                validators
                            })));
                        }
                        else {
                            // Create an array of form controls
                            newControlsConfig[key] = super.array(newControlsConfig[key].map((newControlsConfigItem) => this.control(newControlsConfigItem)));
                        }
                    }
                }
                function canCreateGroup() {
                    const candidate = newControlsConfig[key];
                    return (candidate &&
                        !Array.isArray(candidate) &&
                        candidate.constructor &&
                        typeof candidate === 'object' &&
                        (candidate.length === undefined ||
                            (candidate.length !== undefined &&
                                Object.keys(candidate).length === candidate.length)));
                }
                function canCreateArray() {
                    if (Array.isArray(newControlsConfig[key]) === false) {
                        return false;
                    }
                    const candidate = newControlsConfig[key][0];
                    return (candidate.constructor &&
                        typeof candidate === 'object' &&
                        (candidate.length === undefined ||
                            (candidate.length !== undefined &&
                                Object.keys(candidate).length === candidate.length)));
                }
            });
        }
        // Remove empty
        validators = validators && validators.filter(validator => validator);
        asyncValidators =
            asyncValidators && asyncValidators.filter(validator => validator);
        // Create an Angular group from the top-level object
        const classValidators = getClassValidators(factoryModel, newControlsConfig, extra && extra.customValidatorOptions, this.FormControlClass);
        const formGroup = super.group(classValidators, {
            ...(asyncValidators || {}),
            ...(updateOn || {}),
            ...(validators || {})
        });
        // Initialize the resulting group
        // Changed from internal FormGroup to DynamicFormGroup
        const dynamicFormGroup = new DynamicFormGroup(factoryModel, newControlsConfig, {
            asyncValidators,
            updateOn,
            validators
        });
        // Add all angular controls to the resulting dynamic group
        Object.keys(formGroup.controls).forEach(key => {
            dynamicFormGroup.addControl(key, formGroup.controls[key]);
        });
        // Add a listener to the dynamic group for value changes; on change, execute validation
        dynamicFormGroup.valueChanges.subscribe(() => dynamicFormGroup.validate(undefined, extra && extra.customValidatorOptions));
        return dynamicFormGroup;
    }
    // *******************
    // Helpers
    /**
     * Recursively creates an empty object from the data provided
     */
    createEmptyObject(factoryModel, data = {}) {
        let modified = false;
        const object = factoryModel ? plainToClass(factoryModel, data) : data;
        const fields = Object.keys(object);
        fields.forEach((fieldName) => {
            if (object[fieldName] && object[fieldName].length !== undefined) {
                if (object[fieldName].length === 1 &&
                    Object.keys(object[fieldName][0]).length > 0 &&
                    object[fieldName][0].constructor) {
                    object[fieldName] = [
                        this.createEmptyObject(object[fieldName][0].constructor)
                    ];
                }
                if (object[fieldName].length === 0) {
                    data[fieldName] = [{}];
                    modified = true;
                }
            }
            else {
                data[fieldName] = undefined;
            }
        });
        if (modified) {
            return this.createEmptyObject(factoryModel, data);
        }
        return object;
    }
}
