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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWJ1aWxkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbGliZXJ0eXdhcmUvbmd4LWZvcm0tYnVpbGRlci8iLCJzb3VyY2VzIjpbInV0aWxzL2R5bmFtaWMtZm9ybS1idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBMEIsV0FBVyxFQUFlLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR2pELE9BQU8sRUFFTCx3QkFBd0IsRUFDeEIsd0JBQXdCLEVBQ3hCLGNBQWMsRUFDZixNQUFNLHFDQUFxQyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBYSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzVELE1BQU0sT0FBTyxrQkFBbUIsU0FBUSxXQUFXO0lBQW5EOztRQUVZLG1CQUFjLEdBQUcsZ0JBQWdCLENBQUM7UUFDbEMscUJBQWdCLEdBQUcsa0JBQWtCLENBQUM7SUFzT2xELENBQUM7SUFyT0MsS0FBSyxDQUNILFlBQStCLEVBQy9CLGNBRzBCLEVBQzFCLE9BQXlEO1FBRXpELG9HQUFvRztRQUNwRyxJQUNFLGNBQWM7WUFDZCxDQUFDLHdCQUF3QixDQUFDLGNBQWMsQ0FBQztnQkFDdkMsY0FBYyxDQUFDLGNBQWMsQ0FBQztnQkFDOUIsd0JBQXdCLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxPQUFPLEVBQ1I7WUFDQSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztTQUM1RDtRQUVELG9FQUFvRTtRQUNwRSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ25CLE1BQU0sS0FBSyxHQUFJLElBQUksWUFBWSxFQUE2QixDQUFDO1lBQzdELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FB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LENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDL0QsSUFDRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7b0JBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7b0JBQzVDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQ2hDO29CQUNBLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRzt3QkFDbEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7cUJBQ3pELENBQUM7aUJBQ0g7Z0JBRUQsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3ZCLFFBQVEsR0FBRyxJQUFJLENBQUM7aUJBQ2pCO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQzthQUM3QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxRQUFRLEVBQUU7WUFDWixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbkQ7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2xPcHRpb25zLCBGb3JtQnVpbGRlciwgVmFsaWRhdG9yRm4gfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBwbGFpblRvQ2xhc3MgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBDbGFzc1R5cGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lci9DbGFzc1RyYW5zZm9ybWVyJztcblxuaW1wb3J0IHtcbiAgRHluYW1pY0Zvcm1Hcm91cENvbmZpZyxcbiAgaXNBYnN0cmFjdENvbnRyb2xPcHRpb25zLFxuICBpc0R5bmFtaWNGb3JtR3JvdXBDb25maWcsXG4gIGlzTGVnYWN5T3JPcHRzXG59IGZyb20gJy4uL21vZGVscy9keW5hbWljLWZvcm0tZ3JvdXAtY29uZmlnJztcbmltcG9ydCB7IER5bmFtaWNGb3JtR3JvdXAsIEZvcm1Nb2RlbCwgZ2V0Q2xhc3NWYWxpZGF0b3JzIH0gZnJvbSAnLi9keW5hbWljLWZvcm0tZ3JvdXAnO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm1Db250cm9sIH0gZnJvbSAnLi9keW5hbWljLWZvcm0tY29udHJvbCc7XG5pbXBvcnQgeyBEeW5hbWljRm9ybSB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1jb3JlJztcblxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtQnVpbGRlciBleHRlbmRzIEZvcm1CdWlsZGVyIHtcblxuICBwcm90ZWN0ZWQgRm9ybUdyb3VwQ2xhc3MgPSBEeW5hbWljRm9ybUdyb3VwO1xuICBwcm90ZWN0ZWQgRm9ybUNvbnRyb2xDbGFzcyA9IER5bmFtaWNGb3JtQ29udHJvbDtcbiAgZ3JvdXA8VE1vZGVsPihcbiAgICBmYWN0b3J5TW9kZWw6IENsYXNzVHlwZTxUTW9kZWw+LFxuICAgIGNvbnRyb2xzQ29uZmlnPzpcbiAgICAgIHwgRm9ybU1vZGVsPFRNb2RlbD5cbiAgICAgIHwgRHluYW1pY0Zvcm1Hcm91cENvbmZpZ1xuICAgICAgfCB7IFtrZXk6IHN0cmluZ106IGFueSB9LFxuICAgIG9wdGlvbnM/OiBBYnN0cmFjdENvbnRyb2xPcHRpb25zIHwgRHluYW1pY0Zvcm1Hcm91cENvbmZpZ1xuICApOiBEeW5hbWljRm9ybUdyb3VwPFRNb2RlbD4ge1xuICAgIC8vIFByb2Nlc3MgdGhlIGdyb3VwIHdpdGggdGhlIGNvbnRyb2xzQ29uZmlnIHBhc3NlZCBpbnRvIGV4dHJhIGluc3RlYWQuIChXaGF0IGRvZXMgdGhpcyBhY2NvbXBsaXNoPylcbiAgICBpZiAoXG4gICAgICBjb250cm9sc0NvbmZpZyAmJlxuICAgICAgKGlzQWJzdHJhY3RDb250cm9sT3B0aW9ucyhjb250cm9sc0NvbmZpZykgfHxcbiAgICAgICAgaXNMZWdhY3lPck9wdHMoY29udHJvbHNDb25maWcpIHx8XG4gICAgICAgIGlzRHluYW1pY0Zvcm1Hcm91cENvbmZpZyhjb250cm9sc0NvbmZpZykpICYmXG4gICAgICAhb3B0aW9uc1xuICAgICkge1xuICAgICAgcmV0dXJuIHRoaXMuZ3JvdXAoZmFjdG9yeU1vZGVsLCB1bmRlZmluZWQsIGNvbnRyb2xzQ29uZmlnKTtcbiAgICB9XG5cbiAgICAvLyBUaGlzIHNlY3Rpb24gb2YgY29kZSB3YXMgYWRkZWQgaW4gZnJvbSB0aGUgb3JpZ2luYWwgY29kZSAtIEpvcmRhblxuICAgIGlmICghY29udHJvbHNDb25maWcpIHtcbiAgICAgIGNvbnN0IG1vZGVsID0gKG5ldyBmYWN0b3J5TW9kZWwoKSBhcyB1bmtub3duKSBhcyBEeW5hbWljRm9ybTtcbiAgICAgIGNvbnN0IGZpZWxkcyA9IG1vZGVsLmdldEZvcm1GaWVsZHMoKTtcbiAgICAgIGNvbnRyb2xzQ29uZmlnID0ge1xuICAgICAgICAuLi4oKGZpZWxkc1xuICAgICAgICAgIC5tYXAoKGZpZWxkOiBhbnkpID0+ICh7XG4gICAgICAgICAgICBbZmllbGQuZmllbGROYW1lXTogJydcbiAgICAgICAgICB9KSlcbiAgICAgICAgICAucmVkdWNlKFxuICAgICAgICAgICAgKHJldjogYW55LCBjdXJyZW50OiBhbnkpID0+ICh7IC4uLnJldiwgLi4uY3VycmVudCB9KSxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKSBhcyB1bmtub3duKSBhcyBGb3JtTW9kZWw8VE1vZGVsPilcbiAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3QgZXh0cmE6IER5bmFtaWNGb3JtR3JvdXBDb25maWcgPSBvcHRpb25zIGFzIER5bmFtaWNGb3JtR3JvdXBDb25maWc7XG5cbiAgICBsZXQgdmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXSB8IG51bGwgPSBudWxsO1xuICAgIGxldCBhc3luY1ZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10gIHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IHVwZGF0ZU9uOiBhbnk7XG5cbiAgICBpZiAoZXh0cmEgIT0gbnVsbCkge1xuICAgICAgaWYgKGlzQWJzdHJhY3RDb250cm9sT3B0aW9ucyhleHRyYSkpIHtcbiAgICAgICAgLy8gYGV4dHJhYCBhcmUgYEFic3RyYWN0Q29udHJvbE9wdGlvbnNgXG4gICAgICAgIHZhbGlkYXRvcnMgPSBleHRyYS52YWxpZGF0b3JzICE9IG51bGwgPyBleHRyYS52YWxpZGF0b3JzIDogbnVsbDtcbiAgICAgICAgYXN5bmNWYWxpZGF0b3JzID0gZXh0cmEuYXN5bmNWYWxpZGF0b3JzICE9IG51bGwgPyBleHRyYS5hc3luY1ZhbGlkYXRvcnMgOiBudWxsO1xuICAgICAgICB1cGRhdGVPbiA9IGV4dHJhLnVwZGF0ZU9uICE9IG51bGwgPyBleHRyYS51cGRhdGVPbiA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChpc0xlZ2FjeU9yT3B0cyhleHRyYSkpIHtcbiAgICAgICAgLy8gYGV4dHJhYCBhcmUgbGVnYWN5IGZvcm0gZ3JvdXAgb3B0aW9uc1xuICAgICAgICB2YWxpZGF0b3JzID0gdmFsaWRhdG9ycyB8fCBbXTtcbiAgICAgICAgaWYgKGV4dHJhLnZhbGlkYXRvcikgdmFsaWRhdG9ycy5wdXNoKGV4dHJhLnZhbGlkYXRvcik7XG5cbiAgICAgICAgYXN5bmNWYWxpZGF0b3JzID0gYXN5bmNWYWxpZGF0b3JzIHx8IFtdO1xuICAgICAgICBpZiAoZXh0cmEuYXN5bmNWYWxpZGF0b3IpIHZhbGlkYXRvcnMucHVzaChleHRyYS5hc3luY1ZhbGlkYXRvcik7XG4gICAgICB9XG4gICAgICAvLyBTZXQgZGVmYXVsdCBjdXN0b21WYWxpZGF0b3JPcHRpb25zXG4gICAgICBpZiAoIWlzRHluYW1pY0Zvcm1Hcm91cENvbmZpZyhleHRyYSkpIHtcbiAgICAgICAgZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9ucyA9IHsgdmFsaWRhdGlvbkVycm9yOiB7IHRhcmdldDogZmFsc2UgfSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBuZXdDb250cm9sc0NvbmZpZzogRm9ybU1vZGVsPFRNb2RlbD4gfCBhbnk7XG5cbiAgICBpZiAoY29udHJvbHNDb25maWcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbmV3Q29udHJvbHNDb25maWcgPSBjb250cm9sc0NvbmZpZyBhcyBGb3JtTW9kZWw8VE1vZGVsPjtcbiAgICB9XG5cbiAgICAvLyBleHBlcmltZW50YWxcbiAgICBpZiAoY29udHJvbHNDb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbmV3Q29udHJvbHNDb25maWcgPSB7IC4uLnRoaXMuY3JlYXRlRW1wdHlPYmplY3QoZmFjdG9yeU1vZGVsKSB9O1xuXG4gICAgICBPYmplY3Qua2V5cyhuZXdDb250cm9sc0NvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoY2FuQ3JlYXRlR3JvdXAoKSkge1xuICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGNyZWF0ZSBhIGR5bmFtaWMgZ3JvdXAgZm9yIHRoZSBuZXN0ZWQgb2JqZWN0XG4gICAgICAgICAgbmV3Q29udHJvbHNDb25maWdba2V5XSA9IHRoaXMuZ3JvdXAoXG4gICAgICAgICAgICBuZXdDb250cm9sc0NvbmZpZ1trZXldLmNvbnN0cnVjdG9yLFxuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAuLi4oZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9uc1xuICAgICAgICAgICAgICAgID8geyBjdXN0b21WYWxpZGF0b3JPcHRpb25zOiBleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zIH1cbiAgICAgICAgICAgICAgICA6IHt9KSxcbiAgICAgICAgICAgICAgYXN5bmNWYWxpZGF0b3JzLFxuICAgICAgICAgICAgICB1cGRhdGVPbixcbiAgICAgICAgICAgICAgdmFsaWRhdG9yc1xuICAgICAgICAgICAgfSBhcyBhbnlcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjYW5DcmVhdGVBcnJheSgpKSB7XG4gICAgICAgICAgICBpZiAobmV3Q29udHJvbHNDb25maWdba2V5XVswXS5jb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAvLyByZWN1cnNpdmVseSBjcmVhdGUgYW4gYXJyYXkgd2l0aCBhIGdyb3VwXG4gICAgICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0gPSBzdXBlci5hcnJheShcbiAgICAgICAgICAgICAgICBuZXdDb250cm9sc0NvbmZpZ1trZXldLm1hcCgobmV3Q29udHJvbHNDb25maWdJdGVtOiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwKG5ld0NvbnRyb2xzQ29uZmlnSXRlbS5jb25zdHJ1Y3RvciwgdW5kZWZpbmVkLCB7XG4gICAgICAgICAgICAgICAgICAgIC4uLihleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgPyB7IGN1c3RvbVZhbGlkYXRvck9wdGlvbnM6IGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnMgfVxuICAgICAgICAgICAgICAgICAgICAgIDoge30pLFxuICAgICAgICAgICAgICAgICAgICBhc3luY1ZhbGlkYXRvcnMsXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZU9uLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0b3JzXG4gICAgICAgICAgICAgICAgICB9IGFzIGFueSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBDcmVhdGUgYW4gYXJyYXkgb2YgZm9ybSBjb250cm9sc1xuICAgICAgICAgICAgICBuZXdDb250cm9sc0NvbmZpZ1trZXldID0gc3VwZXIuYXJyYXkoXG4gICAgICAgICAgICAgICAgbmV3Q29udHJvbHNDb25maWdba2V5XS5tYXAoKG5ld0NvbnRyb2xzQ29uZmlnSXRlbTogYW55KSA9PlxuICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sKG5ld0NvbnRyb2xzQ29uZmlnSXRlbSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2FuQ3JlYXRlR3JvdXAoKSB7XG4gICAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gbmV3Q29udHJvbHNDb25maWdba2V5XTtcblxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBjYW5kaWRhdGUgJiZcbiAgICAgICAgICAgICFBcnJheS5pc0FycmF5KGNhbmRpZGF0ZSkgJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5jb25zdHJ1Y3RvciAmJlxuICAgICAgICAgICAgdHlwZW9mIGNhbmRpZGF0ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUubGVuZ3RoID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgKGNhbmRpZGF0ZS5sZW5ndGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNhbmRpZGF0ZSkubGVuZ3RoID09PSBjYW5kaWRhdGUubGVuZ3RoKSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2FuQ3JlYXRlQXJyYXkoKSB7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobmV3Q29udHJvbHNDb25maWdba2V5XSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gbmV3Q29udHJvbHNDb25maWdba2V5XVswXTtcblxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBjYW5kaWRhdGUuY29uc3RydWN0b3IgJiZcbiAgICAgICAgICAgIHR5cGVvZiBjYW5kaWRhdGUgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIChjYW5kaWRhdGUubGVuZ3RoICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjYW5kaWRhdGUpLmxlbmd0aCA9PT0gY2FuZGlkYXRlLmxlbmd0aCkpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGVtcHR5XG4gICAgdmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMgJiYgdmFsaWRhdG9ycy5maWx0ZXIodmFsaWRhdG9yID0+IHZhbGlkYXRvcik7XG4gICAgYXN5bmNWYWxpZGF0b3JzID1cbiAgICAgIGFzeW5jVmFsaWRhdG9ycyAmJiBhc3luY1ZhbGlkYXRvcnMuZmlsdGVyKHZhbGlkYXRvciA9PiB2YWxpZGF0b3IpO1xuXG4gICAgLy8gQ3JlYXRlIGFuIEFuZ3VsYXIgZ3JvdXAgZnJvbSB0aGUgdG9wLWxldmVsIG9iamVjdFxuICAgIGNvbnN0IGNsYXNzVmFsaWRhdG9ycyA9IGdldENsYXNzVmFsaWRhdG9yczxUTW9kZWw+KFxuICAgICAgZmFjdG9yeU1vZGVsLFxuICAgICAgbmV3Q29udHJvbHNDb25maWcsXG4gICAgICBleHRyYSAmJiBleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zLFxuICAgICAgdGhpcy5Gb3JtQ29udHJvbENsYXNzXG4gICAgKTtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSBzdXBlci5ncm91cChjbGFzc1ZhbGlkYXRvcnMsIHtcbiAgICAgIC4uLihhc3luY1ZhbGlkYXRvcnMgfHwge30pLFxuICAgICAgLi4uKHVwZGF0ZU9uIHx8IHt9KSxcbiAgICAgIC4uLih2YWxpZGF0b3JzIHx8IHt9KVxuICAgIH0pO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgcmVzdWx0aW5nIGdyb3VwXG4gICAgLy8gQ2hhbmdlZCBmcm9tIGludGVybmFsIEZvcm1Hcm91cCB0byBEeW5hbWljRm9ybUdyb3VwXG4gICAgY29uc3QgZHluYW1pY0Zvcm1Hcm91cCA9IG5ldyBEeW5hbWljRm9ybUdyb3VwPFRNb2RlbD4oXG4gICAgICBmYWN0b3J5TW9kZWwsXG4gICAgICBuZXdDb250cm9sc0NvbmZpZyxcbiAgICAgIHtcbiAgICAgICAgYXN5bmNWYWxpZGF0b3JzLFxuICAgICAgICB1cGRhdGVPbixcbiAgICAgICAgdmFsaWRhdG9yc1xuICAgICAgfSBhcyBhbnlcbiAgICApO1xuXG4gICAgLy8gQWRkIGFsbCBhbmd1bGFyIGNvbnRyb2xzIHRvIHRoZSByZXN1bHRpbmcgZHluYW1pYyBncm91cFxuICAgIE9iamVjdC5rZXlzKGZvcm1Hcm91cC5jb250cm9scykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgZHluYW1pY0Zvcm1Hcm91cC5hZGRDb250cm9sKGtleSwgZm9ybUdyb3VwLmNvbnRyb2xzW2tleV0pO1xuICAgIH0pO1xuXG4gICAgLy8gQWRkIGEgbGlzdGVuZXIgdG8gdGhlIGR5bmFtaWMgZ3JvdXAgZm9yIHZhbHVlIGNoYW5nZXM7IG9uIGNoYW5nZSwgZXhlY3V0ZSB2YWxpZGF0aW9uXG4gICAgZHluYW1pY0Zvcm1Hcm91cC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IGR5bmFtaWNGb3JtR3JvdXAudmFsaWRhdGUodW5kZWZpbmVkLCBleHRyYSAmJiBleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zKSk7XG5cbiAgICByZXR1cm4gZHluYW1pY0Zvcm1Hcm91cDtcbiAgfVxuXG4gIC8vICoqKioqKioqKioqKioqKioqKipcbiAgLy8gSGVscGVyc1xuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBjcmVhdGVzIGFuIGVtcHR5IG9iamVjdCBmcm9tIHRoZSBkYXRhIHByb3ZpZGVkXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUVtcHR5T2JqZWN0PFRNb2RlbD4oXG4gICAgZmFjdG9yeU1vZGVsOiBDbGFzc1R5cGU8VE1vZGVsPixcbiAgICBkYXRhOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9XG4gICk6IGFueSB7XG4gICAgbGV0IG1vZGlmaWVkID0gZmFsc2U7XG5cbiAgICBjb25zdCBvYmplY3Q6IGFueSA9IGZhY3RvcnlNb2RlbCA/IHBsYWluVG9DbGFzcyhmYWN0b3J5TW9kZWwsIGRhdGEpIDogZGF0YTtcbiAgICBjb25zdCBmaWVsZHMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuXG4gICAgZmllbGRzLmZvckVhY2goKGZpZWxkTmFtZTogYW55KSA9PiB7XG4gICAgICBpZiAob2JqZWN0W2ZpZWxkTmFtZV0gJiYgb2JqZWN0W2ZpZWxkTmFtZV0ubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIG9iamVjdFtmaWVsZE5hbWVdLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICAgIE9iamVjdC5rZXlzKG9iamVjdFtmaWVsZE5hbWVdWzBdKS5sZW5ndGggPiAwICYmXG4gICAgICAgICAgb2JqZWN0W2ZpZWxkTmFtZV1bMF0uY29uc3RydWN0b3JcbiAgICAgICAgKSB7XG4gICAgICAgICAgb2JqZWN0W2ZpZWxkTmFtZV0gPSBbXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUVtcHR5T2JqZWN0KG9iamVjdFtmaWVsZE5hbWVdWzBdLmNvbnN0cnVjdG9yKVxuICAgICAgICAgIF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2JqZWN0W2ZpZWxkTmFtZV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZGF0YVtmaWVsZE5hbWVdID0gW3t9XTtcbiAgICAgICAgICBtb2RpZmllZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGFbZmllbGROYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChtb2RpZmllZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlRW1wdHlPYmplY3QoZmFjdG9yeU1vZGVsLCBkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG59XG4iXX0=