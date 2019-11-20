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
            controlsConfig = Object.assign({}, fields
                .map((field) => ({
                [field.fieldName]: ''
            }))
                .reduce((rev, current) => (Object.assign({}, rev, current)), {}));
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
            newControlsConfig = Object.assign({}, this.createEmptyObject(factoryModel));
            Object.keys(newControlsConfig).forEach(key => {
                if (canCreateGroup()) {
                    // recursively create a dynamic group for the nested object
                    newControlsConfig[key] = this.group(newControlsConfig[key].constructor, undefined, Object.assign({}, (extra.customValidatorOptions
                        ? { customValidatorOptions: extra.customValidatorOptions }
                        : {}), { asyncValidators,
                        updateOn,
                        validators }));
                }
                else {
                    if (canCreateArray()) {
                        if (newControlsConfig[key][0].constructor) {
                            // recursively create an array with a group
                            newControlsConfig[key] = super.array(newControlsConfig[key].map((newControlsConfigItem) => this.group(newControlsConfigItem.constructor, undefined, Object.assign({}, (extra.customValidatorOptions
                                ? { customValidatorOptions: extra.customValidatorOptions }
                                : {}), { asyncValidators,
                                updateOn,
                                validators }))));
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
        const formGroup = super.group(classValidators, Object.assign({}, (asyncValidators || {}), (updateOn || {}), (validators || {})));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWJ1aWxkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbGliZXJ0eXdhcmUvbmd4LWZvcm0tYnVpbGRlci8iLCJzb3VyY2VzIjpbInV0aWxzL2R5bmFtaWMtZm9ybS1idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sa0JBQWtCLENBQUM7QUFFMUIsT0FBTyxFQUE0QyxXQUFXLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHakQsT0FBTyxFQUVMLHdCQUF3QixFQUN4Qix3QkFBd0IsRUFDeEIsY0FBYyxFQUNmLE1BQU0scUNBQXFDLENBQUM7QUFDN0MsT0FBTyxFQUFFLGdCQUFnQixFQUFhLGtCQUFrQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHNUQsTUFBTSxPQUFPLGtCQUFtQixTQUFRLFdBQVc7SUFBbkQ7O1FBRVksbUJBQWMsR0FBRyxnQkFBZ0IsQ0FBQztRQUNsQyxxQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztJQXNPbEQsQ0FBQztJQXJPQyxLQUFLLENBQ0gsWUFBK0IsRUFDL0IsY0FHMEIsRUFDMUIsT0FBeUQ7UUFFekQsb0dBQW9HO1FBQ3BHLElBQ0UsY0FBYztZQUNkLENBQUMsd0JBQXdCLENBQUMsY0FBYyxDQUFDO2dCQUN2QyxjQUFjLENBQUMsY0FBYyxDQUFDO2dCQUM5Qix3QkFBd0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMzQyxDQUFDLE9BQU8sRUFDUjtZQUNBLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQzVEO1FBRUQsb0VBQW9FO1FBQ3BFLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDbkIsTUFBTSxLQUFLLEdBQUksSUFBSSxZQUFZLEVBQTZCLENBQUM7WUFDN0Qs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QUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO2dCQUMvRCxJQUNFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztvQkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztvQkFDNUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFDaEM7b0JBQ0EsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHO3dCQUNsQixJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztxQkFDekQsQ0FBQztpQkFDSDtnQkFFRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDdkIsUUFBUSxHQUFHLElBQUksQ0FBQztpQkFDakI7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsU0FBUyxDQUFDO2FBQzdCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFFBQVEsRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNuRDtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7XG5cbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbE9wdGlvbnMsIEFzeW5jVmFsaWRhdG9yRm4sIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IHBsYWluVG9DbGFzcyB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IENsYXNzVHlwZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyL0NsYXNzVHJhbnNmb3JtZXInO1xuXG5pbXBvcnQge1xuICBEeW5hbWljRm9ybUdyb3VwQ29uZmlnLFxuICBpc0Fic3RyYWN0Q29udHJvbE9wdGlvbnMsXG4gIGlzRHluYW1pY0Zvcm1Hcm91cENvbmZpZyxcbiAgaXNMZWdhY3lPck9wdHNcbn0gZnJvbSAnLi4vbW9kZWxzL2R5bmFtaWMtZm9ybS1ncm91cC1jb25maWcnO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm1Hcm91cCwgRm9ybU1vZGVsLCBnZXRDbGFzc1ZhbGlkYXRvcnMgfSBmcm9tICcuL2R5bmFtaWMtZm9ybS1ncm91cCc7XG5pbXBvcnQgeyBEeW5hbWljRm9ybUNvbnRyb2wgfSBmcm9tICcuL2R5bmFtaWMtZm9ybS1jb250cm9sJztcbmltcG9ydCB7IER5bmFtaWNGb3JtIH0gZnJvbSAnQGxpYmVydHl3YXJlL25neC1mb3JtLWNvcmUnO1xuXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1CdWlsZGVyIGV4dGVuZHMgRm9ybUJ1aWxkZXIge1xuXG4gIHByb3RlY3RlZCBGb3JtR3JvdXBDbGFzcyA9IER5bmFtaWNGb3JtR3JvdXA7XG4gIHByb3RlY3RlZCBGb3JtQ29udHJvbENsYXNzID0gRHluYW1pY0Zvcm1Db250cm9sO1xuICBncm91cDxUTW9kZWw+KFxuICAgIGZhY3RvcnlNb2RlbDogQ2xhc3NUeXBlPFRNb2RlbD4sXG4gICAgY29udHJvbHNDb25maWc/OlxuICAgICAgfCBGb3JtTW9kZWw8VE1vZGVsPlxuICAgICAgfCBEeW5hbWljRm9ybUdyb3VwQ29uZmlnXG4gICAgICB8IHsgW2tleTogc3RyaW5nXTogYW55IH0sXG4gICAgb3B0aW9ucz86IEFic3RyYWN0Q29udHJvbE9wdGlvbnMgfCBEeW5hbWljRm9ybUdyb3VwQ29uZmlnXG4gICk6IER5bmFtaWNGb3JtR3JvdXA8VE1vZGVsPiB7XG4gICAgLy8gUHJvY2VzcyB0aGUgZ3JvdXAgd2l0aCB0aGUgY29udHJvbHNDb25maWcgcGFzc2VkIGludG8gZXh0cmEgaW5zdGVhZC4gKFdoYXQgZG9lcyB0aGlzIGFjY29tcGxpc2g/KVxuICAgIGlmIChcbiAgICAgIGNvbnRyb2xzQ29uZmlnICYmXG4gICAgICAoaXNBYnN0cmFjdENvbnRyb2xPcHRpb25zKGNvbnRyb2xzQ29uZmlnKSB8fFxuICAgICAgICBpc0xlZ2FjeU9yT3B0cyhjb250cm9sc0NvbmZpZykgfHxcbiAgICAgICAgaXNEeW5hbWljRm9ybUdyb3VwQ29uZmlnKGNvbnRyb2xzQ29uZmlnKSkgJiZcbiAgICAgICFvcHRpb25zXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5ncm91cChmYWN0b3J5TW9kZWwsIHVuZGVmaW5lZCwgY29udHJvbHNDb25maWcpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgc2VjdGlvbiBvZiBjb2RlIHdhcyBhZGRlZCBpbiBmcm9tIHRoZSBvcmlnaW5hbCBjb2RlIC0gSm9yZGFuXG4gICAgaWYgKCFjb250cm9sc0NvbmZpZykge1xuICAgICAgY29uc3QgbW9kZWwgPSAobmV3IGZhY3RvcnlNb2RlbCgpIGFzIHVua25vd24pIGFzIER5bmFtaWNGb3JtO1xuICAgICAgY29uc3QgZmllbGRzID0gbW9kZWwuZ2V0Rm9ybUZpZWxkcygpO1xuICAgICAgY29udHJvbHNDb25maWcgPSB7XG4gICAgICAgIC4uLigoZmllbGRzXG4gICAgICAgICAgLm1hcCgoZmllbGQ6IGFueSkgPT4gKHtcbiAgICAgICAgICAgIFtmaWVsZC5maWVsZE5hbWVdOiAnJ1xuICAgICAgICAgIH0pKVxuICAgICAgICAgIC5yZWR1Y2UoXG4gICAgICAgICAgICAocmV2OiBhbnksIGN1cnJlbnQ6IGFueSkgPT4gKHsgLi4ucmV2LCAuLi5jdXJyZW50IH0pLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApIGFzIHVua25vd24pIGFzIEZvcm1Nb2RlbDxUTW9kZWw+KVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCBleHRyYTogRHluYW1pY0Zvcm1Hcm91cENvbmZpZyA9IG9wdGlvbnMgYXMgRHluYW1pY0Zvcm1Hcm91cENvbmZpZztcblxuICAgIGxldCB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdIHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGFzeW5jVmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXSAgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgdXBkYXRlT246IGFueTtcblxuICAgIGlmIChleHRyYSAhPSBudWxsKSB7XG4gICAgICBpZiAoaXNBYnN0cmFjdENvbnRyb2xPcHRpb25zKGV4dHJhKSkge1xuICAgICAgICAvLyBgZXh0cmFgIGFyZSBgQWJzdHJhY3RDb250cm9sT3B0aW9uc2BcbiAgICAgICAgdmFsaWRhdG9ycyA9IGV4dHJhLnZhbGlkYXRvcnMgIT0gbnVsbCA/IGV4dHJhLnZhbGlkYXRvcnMgOiBudWxsO1xuICAgICAgICBhc3luY1ZhbGlkYXRvcnMgPSBleHRyYS5hc3luY1ZhbGlkYXRvcnMgIT0gbnVsbCA/IGV4dHJhLmFzeW5jVmFsaWRhdG9ycyA6IG51bGw7XG4gICAgICAgIHVwZGF0ZU9uID0gZXh0cmEudXBkYXRlT24gIT0gbnVsbCA/IGV4dHJhLnVwZGF0ZU9uIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKGlzTGVnYWN5T3JPcHRzKGV4dHJhKSkge1xuICAgICAgICAvLyBgZXh0cmFgIGFyZSBsZWdhY3kgZm9ybSBncm91cCBvcHRpb25zXG4gICAgICAgIHZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzIHx8IFtdO1xuICAgICAgICBpZiAoZXh0cmEudmFsaWRhdG9yKSB2YWxpZGF0b3JzLnB1c2goZXh0cmEudmFsaWRhdG9yKTtcblxuICAgICAgICBhc3luY1ZhbGlkYXRvcnMgPSBhc3luY1ZhbGlkYXRvcnMgfHwgW107XG4gICAgICAgIGlmIChleHRyYS5hc3luY1ZhbGlkYXRvcikgdmFsaWRhdG9ycy5wdXNoKGV4dHJhLmFzeW5jVmFsaWRhdG9yKTtcbiAgICAgIH1cbiAgICAgIC8vIFNldCBkZWZhdWx0IGN1c3RvbVZhbGlkYXRvck9wdGlvbnNcbiAgICAgIGlmICghaXNEeW5hbWljRm9ybUdyb3VwQ29uZmlnKGV4dHJhKSkge1xuICAgICAgICBleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zID0geyB2YWxpZGF0aW9uRXJyb3I6IHsgdGFyZ2V0OiBmYWxzZSB9IH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IG5ld0NvbnRyb2xzQ29uZmlnOiBGb3JtTW9kZWw8VE1vZGVsPiB8IGFueTtcblxuICAgIGlmIChjb250cm9sc0NvbmZpZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdDb250cm9sc0NvbmZpZyA9IGNvbnRyb2xzQ29uZmlnIGFzIEZvcm1Nb2RlbDxUTW9kZWw+O1xuICAgIH1cblxuICAgIC8vIGV4cGVyaW1lbnRhbFxuICAgIGlmIChjb250cm9sc0NvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdDb250cm9sc0NvbmZpZyA9IHsgLi4udGhpcy5jcmVhdGVFbXB0eU9iamVjdChmYWN0b3J5TW9kZWwpIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKG5ld0NvbnRyb2xzQ29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChjYW5DcmVhdGVHcm91cCgpKSB7XG4gICAgICAgICAgLy8gcmVjdXJzaXZlbHkgY3JlYXRlIGEgZHluYW1pYyBncm91cCBmb3IgdGhlIG5lc3RlZCBvYmplY3RcbiAgICAgICAgICBuZXdDb250cm9sc0NvbmZpZ1trZXldID0gdGhpcy5ncm91cChcbiAgICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0uY29uc3RydWN0b3IsXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIC4uLihleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zXG4gICAgICAgICAgICAgICAgPyB7IGN1c3RvbVZhbGlkYXRvck9wdGlvbnM6IGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnMgfVxuICAgICAgICAgICAgICAgIDoge30pLFxuICAgICAgICAgICAgICBhc3luY1ZhbGlkYXRvcnMsXG4gICAgICAgICAgICAgIHVwZGF0ZU9uLFxuICAgICAgICAgICAgICB2YWxpZGF0b3JzXG4gICAgICAgICAgICB9IGFzIGFueVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNhbkNyZWF0ZUFycmF5KCkpIHtcbiAgICAgICAgICAgIGlmIChuZXdDb250cm9sc0NvbmZpZ1trZXldWzBdLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGNyZWF0ZSBhbiBhcnJheSB3aXRoIGEgZ3JvdXBcbiAgICAgICAgICAgICAgbmV3Q29udHJvbHNDb25maWdba2V5XSA9IHN1cGVyLmFycmF5KFxuICAgICAgICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0ubWFwKChuZXdDb250cm9sc0NvbmZpZ0l0ZW06IGFueSkgPT5cbiAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXAobmV3Q29udHJvbHNDb25maWdJdGVtLmNvbnN0cnVjdG9yLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uKGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICA/IHsgY3VzdG9tVmFsaWRhdG9yT3B0aW9uczogZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9ucyB9XG4gICAgICAgICAgICAgICAgICAgICAgOiB7fSksXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jVmFsaWRhdG9ycyxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlT24sXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnNcbiAgICAgICAgICAgICAgICAgIH0gYXMgYW55KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIENyZWF0ZSBhbiBhcnJheSBvZiBmb3JtIGNvbnRyb2xzXG4gICAgICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0gPSBzdXBlci5hcnJheShcbiAgICAgICAgICAgICAgICBuZXdDb250cm9sc0NvbmZpZ1trZXldLm1hcCgobmV3Q29udHJvbHNDb25maWdJdGVtOiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2wobmV3Q29udHJvbHNDb25maWdJdGVtKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjYW5DcmVhdGVHcm91cCgpIHtcbiAgICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSBuZXdDb250cm9sc0NvbmZpZ1trZXldO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGNhbmRpZGF0ZSAmJlxuICAgICAgICAgICAgIUFycmF5LmlzQXJyYXkoY2FuZGlkYXRlKSAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLmNvbnN0cnVjdG9yICYmXG4gICAgICAgICAgICB0eXBlb2YgY2FuZGlkYXRlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5sZW5ndGggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAoY2FuZGlkYXRlLmxlbmd0aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY2FuZGlkYXRlKS5sZW5ndGggPT09IGNhbmRpZGF0ZS5sZW5ndGgpKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjYW5DcmVhdGVBcnJheSgpIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdDb250cm9sc0NvbmZpZ1trZXldKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSBuZXdDb250cm9sc0NvbmZpZ1trZXldWzBdO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5jb25zdHJ1Y3RvciAmJlxuICAgICAgICAgICAgdHlwZW9mIGNhbmRpZGF0ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUubGVuZ3RoID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgKGNhbmRpZGF0ZS5sZW5ndGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNhbmRpZGF0ZSkubGVuZ3RoID09PSBjYW5kaWRhdGUubGVuZ3RoKSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgZW1wdHlcbiAgICB2YWxpZGF0b3JzID0gdmFsaWRhdG9ycyAmJiB2YWxpZGF0b3JzLmZpbHRlcih2YWxpZGF0b3IgPT4gdmFsaWRhdG9yKTtcbiAgICBhc3luY1ZhbGlkYXRvcnMgPVxuICAgICAgYXN5bmNWYWxpZGF0b3JzICYmIGFzeW5jVmFsaWRhdG9ycy5maWx0ZXIodmFsaWRhdG9yID0+IHZhbGlkYXRvcik7XG5cbiAgICAvLyBDcmVhdGUgYW4gQW5ndWxhciBncm91cCBmcm9tIHRoZSB0b3AtbGV2ZWwgb2JqZWN0XG4gICAgY29uc3QgY2xhc3NWYWxpZGF0b3JzID0gZ2V0Q2xhc3NWYWxpZGF0b3JzPFRNb2RlbD4oXG4gICAgICBmYWN0b3J5TW9kZWwsXG4gICAgICBuZXdDb250cm9sc0NvbmZpZyxcbiAgICAgIGV4dHJhICYmIGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnMsXG4gICAgICB0aGlzLkZvcm1Db250cm9sQ2xhc3NcbiAgICApO1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHN1cGVyLmdyb3VwKGNsYXNzVmFsaWRhdG9ycywge1xuICAgICAgLi4uKGFzeW5jVmFsaWRhdG9ycyB8fCB7fSksXG4gICAgICAuLi4odXBkYXRlT24gfHwge30pLFxuICAgICAgLi4uKHZhbGlkYXRvcnMgfHwge30pXG4gICAgfSk7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSByZXN1bHRpbmcgZ3JvdXBcbiAgICAvLyBDaGFuZ2VkIGZyb20gaW50ZXJuYWwgRm9ybUdyb3VwIHRvIER5bmFtaWNGb3JtR3JvdXBcbiAgICBjb25zdCBkeW5hbWljRm9ybUdyb3VwID0gbmV3IER5bmFtaWNGb3JtR3JvdXA8VE1vZGVsPihcbiAgICAgIGZhY3RvcnlNb2RlbCxcbiAgICAgIG5ld0NvbnRyb2xzQ29uZmlnLFxuICAgICAge1xuICAgICAgICBhc3luY1ZhbGlkYXRvcnMsXG4gICAgICAgIHVwZGF0ZU9uLFxuICAgICAgICB2YWxpZGF0b3JzXG4gICAgICB9IGFzIGFueVxuICAgICk7XG5cbiAgICAvLyBBZGQgYWxsIGFuZ3VsYXIgY29udHJvbHMgdG8gdGhlIHJlc3VsdGluZyBkeW5hbWljIGdyb3VwXG4gICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBkeW5hbWljRm9ybUdyb3VwLmFkZENvbnRyb2woa2V5LCBmb3JtR3JvdXAuY29udHJvbHNba2V5XSk7XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgYSBsaXN0ZW5lciB0byB0aGUgZHluYW1pYyBncm91cCBmb3IgdmFsdWUgY2hhbmdlczsgb24gY2hhbmdlLCBleGVjdXRlIHZhbGlkYXRpb25cbiAgICBkeW5hbWljRm9ybUdyb3VwLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gZHluYW1pY0Zvcm1Hcm91cC52YWxpZGF0ZSh1bmRlZmluZWQsIGV4dHJhICYmIGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnMpKTtcblxuICAgIHJldHVybiBkeW5hbWljRm9ybUdyb3VwO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKlxuICAvLyBIZWxwZXJzXG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGNyZWF0ZXMgYW4gZW1wdHkgb2JqZWN0IGZyb20gdGhlIGRhdGEgcHJvdmlkZWRcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlRW1wdHlPYmplY3Q8VE1vZGVsPihcbiAgICBmYWN0b3J5TW9kZWw6IENsYXNzVHlwZTxUTW9kZWw+LFxuICAgIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge31cbiAgKTogYW55IHtcbiAgICBsZXQgbW9kaWZpZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IG9iamVjdDogYW55ID0gZmFjdG9yeU1vZGVsID8gcGxhaW5Ub0NsYXNzKGZhY3RvcnlNb2RlbCwgZGF0YSkgOiBkYXRhO1xuICAgIGNvbnN0IGZpZWxkcyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG5cbiAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGROYW1lOiBhbnkpID0+IHtcbiAgICAgIGlmIChvYmplY3RbZmllbGROYW1lXSAmJiBvYmplY3RbZmllbGROYW1lXS5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgb2JqZWN0W2ZpZWxkTmFtZV0ubGVuZ3RoID09PSAxICYmXG4gICAgICAgICAgT2JqZWN0LmtleXMob2JqZWN0W2ZpZWxkTmFtZV1bMF0pLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICBvYmplY3RbZmllbGROYW1lXVswXS5jb25zdHJ1Y3RvclxuICAgICAgICApIHtcbiAgICAgICAgICBvYmplY3RbZmllbGROYW1lXSA9IFtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRW1wdHlPYmplY3Qob2JqZWN0W2ZpZWxkTmFtZV1bMF0uY29uc3RydWN0b3IpXG4gICAgICAgICAgXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvYmplY3RbZmllbGROYW1lXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBkYXRhW2ZpZWxkTmFtZV0gPSBbe31dO1xuICAgICAgICAgIG1vZGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YVtmaWVsZE5hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG1vZGlmaWVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVFbXB0eU9iamVjdChmYWN0b3J5TW9kZWwsIGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbn1cbiJdfQ==