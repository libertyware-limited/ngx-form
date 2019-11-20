import * as tslib_1 from "tslib";
import { FormBuilder } from '@angular/forms';
import { plainToClass } from 'class-transformer';
import { isAbstractControlOptions, isDynamicFormGroupConfig, isLegacyOrOpts } from '../models/dynamic-form-group-config';
import { DynamicFormGroup, getClassValidators } from './dynamic-form-group';
import { DynamicFormControl } from './dynamic-form-control';
var DynamicFormBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(DynamicFormBuilder, _super);
    function DynamicFormBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.FormGroupClass = DynamicFormGroup;
        _this.FormControlClass = DynamicFormControl;
        return _this;
    }
    DynamicFormBuilder.prototype.group = function (factoryModel, controlsConfig, options) {
        var _this = this;
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
            var model = new factoryModel();
            var fields = model.getFormFields();
            controlsConfig = tslib_1.__assign({}, fields
                .map(function (field) {
                var _a;
                return (_a = {},
                    _a[field.fieldName] = '',
                    _a);
            })
                .reduce(function (rev, current) { return (tslib_1.__assign({}, rev, current)); }, {}));
        }
        var extra = options;
        var validators = null;
        var asyncValidators = null;
        var updateOn;
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
        var newControlsConfig;
        if (controlsConfig !== undefined) {
            newControlsConfig = controlsConfig;
        }
        // experimental
        if (controlsConfig === undefined) {
            newControlsConfig = tslib_1.__assign({}, this.createEmptyObject(factoryModel));
            Object.keys(newControlsConfig).forEach(function (key) {
                if (canCreateGroup()) {
                    // recursively create a dynamic group for the nested object
                    newControlsConfig[key] = _this.group(newControlsConfig[key].constructor, undefined, tslib_1.__assign({}, (extra.customValidatorOptions
                        ? { customValidatorOptions: extra.customValidatorOptions }
                        : {}), { asyncValidators: asyncValidators,
                        updateOn: updateOn,
                        validators: validators }));
                }
                else {
                    if (canCreateArray()) {
                        if (newControlsConfig[key][0].constructor) {
                            // recursively create an array with a group
                            newControlsConfig[key] = _super.prototype.array.call(_this, newControlsConfig[key].map(function (newControlsConfigItem) {
                                return _this.group(newControlsConfigItem.constructor, undefined, tslib_1.__assign({}, (extra.customValidatorOptions
                                    ? { customValidatorOptions: extra.customValidatorOptions }
                                    : {}), { asyncValidators: asyncValidators,
                                    updateOn: updateOn,
                                    validators: validators }));
                            }));
                        }
                        else {
                            // Create an array of form controls
                            newControlsConfig[key] = _super.prototype.array.call(_this, newControlsConfig[key].map(function (newControlsConfigItem) {
                                return _this.control(newControlsConfigItem);
                            }));
                        }
                    }
                }
                function canCreateGroup() {
                    var candidate = newControlsConfig[key];
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
                    var candidate = newControlsConfig[key][0];
                    return (candidate.constructor &&
                        typeof candidate === 'object' &&
                        (candidate.length === undefined ||
                            (candidate.length !== undefined &&
                                Object.keys(candidate).length === candidate.length)));
                }
            });
        }
        // Remove empty
        validators = validators && validators.filter(function (validator) { return validator; });
        asyncValidators =
            asyncValidators && asyncValidators.filter(function (validator) { return validator; });
        // Create an Angular group from the top-level object
        var classValidators = getClassValidators(factoryModel, newControlsConfig, extra && extra.customValidatorOptions, this.FormControlClass);
        var formGroup = _super.prototype.group.call(this, classValidators, tslib_1.__assign({}, (asyncValidators || {}), (updateOn || {}), (validators || {})));
        // Initialize the resulting group
        // Changed from internal FormGroup to DynamicFormGroup
        var dynamicFormGroup = new DynamicFormGroup(factoryModel, newControlsConfig, {
            asyncValidators: asyncValidators,
            updateOn: updateOn,
            validators: validators
        });
        // Add all angular controls to the resulting dynamic group
        Object.keys(formGroup.controls).forEach(function (key) {
            dynamicFormGroup.addControl(key, formGroup.controls[key]);
        });
        // Add a listener to the dynamic group for value changes; on change, execute validation
        dynamicFormGroup.valueChanges.subscribe(function () { return dynamicFormGroup.validate(undefined, extra && extra.customValidatorOptions); });
        return dynamicFormGroup;
    };
    // *******************
    // Helpers
    /**
     * Recursively creates an empty object from the data provided
     */
    DynamicFormBuilder.prototype.createEmptyObject = function (factoryModel, data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        var modified = false;
        var object = factoryModel ? plainToClass(factoryModel, data) : data;
        var fields = Object.keys(object);
        fields.forEach(function (fieldName) {
            if (object[fieldName] && object[fieldName].length !== undefined) {
                if (object[fieldName].length === 1 &&
                    Object.keys(object[fieldName][0]).length > 0 &&
                    object[fieldName][0].constructor) {
                    object[fieldName] = [
                        _this.createEmptyObject(object[fieldName][0].constructor)
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
    };
    return DynamicFormBuilder;
}(FormBuilder));
export { DynamicFormBuilder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWJ1aWxkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbGliZXJ0eXdhcmUvbmd4LWZvcm0tYnVpbGRlci8iLCJzb3VyY2VzIjpbInV0aWxzL2R5bmFtaWMtZm9ybS1idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQTBCLFdBQVcsRUFBZSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUdqRCxPQUFPLEVBRUwsd0JBQXdCLEVBQ3hCLHdCQUF3QixFQUN4QixjQUFjLEVBQ2YsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQWEsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUc1RDtJQUF3Qyw4Q0FBVztJQUFuRDtRQUFBLHFFQXlPQztRQXZPVyxvQkFBYyxHQUFHLGdCQUFnQixDQUFDO1FBQ2xDLHNCQUFnQixHQUFHLGtCQUFrQixDQUFDOztJQXNPbEQsQ0FBQztJQXJPQyxrQ0FBSyxHQUFMLFVBQ0UsWUFBK0IsRUFDL0IsY0FHMEIsRUFDMUIsT0FBeUQ7UUFOM0QsaUJBeUxDO1FBakxDLG9HQUFvRztRQUNwRyxJQUNFLGNBQWM7WUFDZCxDQUFDLHdCQUF3QixDQUFDLGNBQWMsQ0FBQztnQkFDdkMsY0FBYyxDQUFDLGNBQWMsQ0FBQztnQkFDOUIsd0JBQXdCLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDM0MsQ0FBQyxPQUFPLEVBQ1I7WUFDQSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztTQUM1RDtRQUVELG9FQUFvRTtRQUNwRSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ25CLElBQU0sS0FBSyxHQUFJLElBQUksWUFBWSxFQUE2QixDQUFDO1lBQzdELElBQU0s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cm1CdWlsZGVyLCBWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IHBsYWluVG9DbGFzcyB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcbmltcG9ydCB7IENsYXNzVHlwZSB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyL0NsYXNzVHJhbnNmb3JtZXInO1xuXG5pbXBvcnQge1xuICBEeW5hbWljRm9ybUdyb3VwQ29uZmlnLFxuICBpc0Fic3RyYWN0Q29udHJvbE9wdGlvbnMsXG4gIGlzRHluYW1pY0Zvcm1Hcm91cENvbmZpZyxcbiAgaXNMZWdhY3lPck9wdHNcbn0gZnJvbSAnLi4vbW9kZWxzL2R5bmFtaWMtZm9ybS1ncm91cC1jb25maWcnO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm1Hcm91cCwgRm9ybU1vZGVsLCBnZXRDbGFzc1ZhbGlkYXRvcnMgfSBmcm9tICcuL2R5bmFtaWMtZm9ybS1ncm91cCc7XG5pbXBvcnQgeyBEeW5hbWljRm9ybUNvbnRyb2wgfSBmcm9tICcuL2R5bmFtaWMtZm9ybS1jb250cm9sJztcbmltcG9ydCB7IER5bmFtaWNGb3JtIH0gZnJvbSAnQGxpYmVydHl3YXJlL25neC1mb3JtLWNvcmUnO1xuXG5leHBvcnQgY2xhc3MgRHluYW1pY0Zvcm1CdWlsZGVyIGV4dGVuZHMgRm9ybUJ1aWxkZXIge1xuXG4gIHByb3RlY3RlZCBGb3JtR3JvdXBDbGFzcyA9IER5bmFtaWNGb3JtR3JvdXA7XG4gIHByb3RlY3RlZCBGb3JtQ29udHJvbENsYXNzID0gRHluYW1pY0Zvcm1Db250cm9sO1xuICBncm91cDxUTW9kZWw+KFxuICAgIGZhY3RvcnlNb2RlbDogQ2xhc3NUeXBlPFRNb2RlbD4sXG4gICAgY29udHJvbHNDb25maWc/OlxuICAgICAgfCBGb3JtTW9kZWw8VE1vZGVsPlxuICAgICAgfCBEeW5hbWljRm9ybUdyb3VwQ29uZmlnXG4gICAgICB8IHsgW2tleTogc3RyaW5nXTogYW55IH0sXG4gICAgb3B0aW9ucz86IEFic3RyYWN0Q29udHJvbE9wdGlvbnMgfCBEeW5hbWljRm9ybUdyb3VwQ29uZmlnXG4gICk6IER5bmFtaWNGb3JtR3JvdXA8VE1vZGVsPiB7XG4gICAgLy8gUHJvY2VzcyB0aGUgZ3JvdXAgd2l0aCB0aGUgY29udHJvbHNDb25maWcgcGFzc2VkIGludG8gZXh0cmEgaW5zdGVhZC4gKFdoYXQgZG9lcyB0aGlzIGFjY29tcGxpc2g/KVxuICAgIGlmIChcbiAgICAgIGNvbnRyb2xzQ29uZmlnICYmXG4gICAgICAoaXNBYnN0cmFjdENvbnRyb2xPcHRpb25zKGNvbnRyb2xzQ29uZmlnKSB8fFxuICAgICAgICBpc0xlZ2FjeU9yT3B0cyhjb250cm9sc0NvbmZpZykgfHxcbiAgICAgICAgaXNEeW5hbWljRm9ybUdyb3VwQ29uZmlnKGNvbnRyb2xzQ29uZmlnKSkgJiZcbiAgICAgICFvcHRpb25zXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5ncm91cChmYWN0b3J5TW9kZWwsIHVuZGVmaW5lZCwgY29udHJvbHNDb25maWcpO1xuICAgIH1cblxuICAgIC8vIFRoaXMgc2VjdGlvbiBvZiBjb2RlIHdhcyBhZGRlZCBpbiBmcm9tIHRoZSBvcmlnaW5hbCBjb2RlIC0gSm9yZGFuXG4gICAgaWYgKCFjb250cm9sc0NvbmZpZykge1xuICAgICAgY29uc3QgbW9kZWwgPSAobmV3IGZhY3RvcnlNb2RlbCgpIGFzIHVua25vd24pIGFzIER5bmFtaWNGb3JtO1xuICAgICAgY29uc3QgZmllbGRzID0gbW9kZWwuZ2V0Rm9ybUZpZWxkcygpO1xuICAgICAgY29udHJvbHNDb25maWcgPSB7XG4gICAgICAgIC4uLigoZmllbGRzXG4gICAgICAgICAgLm1hcCgoZmllbGQ6IGFueSkgPT4gKHtcbiAgICAgICAgICAgIFtmaWVsZC5maWVsZE5hbWVdOiAnJ1xuICAgICAgICAgIH0pKVxuICAgICAgICAgIC5yZWR1Y2UoXG4gICAgICAgICAgICAocmV2OiBhbnksIGN1cnJlbnQ6IGFueSkgPT4gKHsgLi4ucmV2LCAuLi5jdXJyZW50IH0pLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApIGFzIHVua25vd24pIGFzIEZvcm1Nb2RlbDxUTW9kZWw+KVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCBleHRyYTogRHluYW1pY0Zvcm1Hcm91cENvbmZpZyA9IG9wdGlvbnMgYXMgRHluYW1pY0Zvcm1Hcm91cENvbmZpZztcblxuICAgIGxldCB2YWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdIHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IGFzeW5jVmFsaWRhdG9yczogVmFsaWRhdG9yRm5bXSAgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgdXBkYXRlT246IGFueTtcblxuICAgIGlmIChleHRyYSAhPSBudWxsKSB7XG4gICAgICBpZiAoaXNBYnN0cmFjdENvbnRyb2xPcHRpb25zKGV4dHJhKSkge1xuICAgICAgICAvLyBgZXh0cmFgIGFyZSBgQWJzdHJhY3RDb250cm9sT3B0aW9uc2BcbiAgICAgICAgdmFsaWRhdG9ycyA9IGV4dHJhLnZhbGlkYXRvcnMgIT0gbnVsbCA/IGV4dHJhLnZhbGlkYXRvcnMgOiBudWxsO1xuICAgICAgICBhc3luY1ZhbGlkYXRvcnMgPSBleHRyYS5hc3luY1ZhbGlkYXRvcnMgIT0gbnVsbCA/IGV4dHJhLmFzeW5jVmFsaWRhdG9ycyA6IG51bGw7XG4gICAgICAgIHVwZGF0ZU9uID0gZXh0cmEudXBkYXRlT24gIT0gbnVsbCA/IGV4dHJhLnVwZGF0ZU9uIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKGlzTGVnYWN5T3JPcHRzKGV4dHJhKSkge1xuICAgICAgICAvLyBgZXh0cmFgIGFyZSBsZWdhY3kgZm9ybSBncm91cCBvcHRpb25zXG4gICAgICAgIHZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzIHx8IFtdO1xuICAgICAgICBpZiAoZXh0cmEudmFsaWRhdG9yKSB2YWxpZGF0b3JzLnB1c2goZXh0cmEudmFsaWRhdG9yKTtcblxuICAgICAgICBhc3luY1ZhbGlkYXRvcnMgPSBhc3luY1ZhbGlkYXRvcnMgfHwgW107XG4gICAgICAgIGlmIChleHRyYS5hc3luY1ZhbGlkYXRvcikgdmFsaWRhdG9ycy5wdXNoKGV4dHJhLmFzeW5jVmFsaWRhdG9yKTtcbiAgICAgIH1cbiAgICAgIC8vIFNldCBkZWZhdWx0IGN1c3RvbVZhbGlkYXRvck9wdGlvbnNcbiAgICAgIGlmICghaXNEeW5hbWljRm9ybUdyb3VwQ29uZmlnKGV4dHJhKSkge1xuICAgICAgICBleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zID0geyB2YWxpZGF0aW9uRXJyb3I6IHsgdGFyZ2V0OiBmYWxzZSB9IH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IG5ld0NvbnRyb2xzQ29uZmlnOiBGb3JtTW9kZWw8VE1vZGVsPiB8IGFueTtcblxuICAgIGlmIChjb250cm9sc0NvbmZpZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdDb250cm9sc0NvbmZpZyA9IGNvbnRyb2xzQ29uZmlnIGFzIEZvcm1Nb2RlbDxUTW9kZWw+O1xuICAgIH1cblxuICAgIC8vIGV4cGVyaW1lbnRhbFxuICAgIGlmIChjb250cm9sc0NvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdDb250cm9sc0NvbmZpZyA9IHsgLi4udGhpcy5jcmVhdGVFbXB0eU9iamVjdChmYWN0b3J5TW9kZWwpIH07XG5cbiAgICAgIE9iamVjdC5rZXlzKG5ld0NvbnRyb2xzQ29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChjYW5DcmVhdGVHcm91cCgpKSB7XG4gICAgICAgICAgLy8gcmVjdXJzaXZlbHkgY3JlYXRlIGEgZHluYW1pYyBncm91cCBmb3IgdGhlIG5lc3RlZCBvYmplY3RcbiAgICAgICAgICBuZXdDb250cm9sc0NvbmZpZ1trZXldID0gdGhpcy5ncm91cChcbiAgICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0uY29uc3RydWN0b3IsXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIC4uLihleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zXG4gICAgICAgICAgICAgICAgPyB7IGN1c3RvbVZhbGlkYXRvck9wdGlvbnM6IGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnMgfVxuICAgICAgICAgICAgICAgIDoge30pLFxuICAgICAgICAgICAgICBhc3luY1ZhbGlkYXRvcnMsXG4gICAgICAgICAgICAgIHVwZGF0ZU9uLFxuICAgICAgICAgICAgICB2YWxpZGF0b3JzXG4gICAgICAgICAgICB9IGFzIGFueVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNhbkNyZWF0ZUFycmF5KCkpIHtcbiAgICAgICAgICAgIGlmIChuZXdDb250cm9sc0NvbmZpZ1trZXldWzBdLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGNyZWF0ZSBhbiBhcnJheSB3aXRoIGEgZ3JvdXBcbiAgICAgICAgICAgICAgbmV3Q29udHJvbHNDb25maWdba2V5XSA9IHN1cGVyLmFycmF5KFxuICAgICAgICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0ubWFwKChuZXdDb250cm9sc0NvbmZpZ0l0ZW06IGFueSkgPT5cbiAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXAobmV3Q29udHJvbHNDb25maWdJdGVtLmNvbnN0cnVjdG9yLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uKGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICA/IHsgY3VzdG9tVmFsaWRhdG9yT3B0aW9uczogZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9ucyB9XG4gICAgICAgICAgICAgICAgICAgICAgOiB7fSksXG4gICAgICAgICAgICAgICAgICAgIGFzeW5jVmFsaWRhdG9ycyxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlT24sXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRvcnNcbiAgICAgICAgICAgICAgICAgIH0gYXMgYW55KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIENyZWF0ZSBhbiBhcnJheSBvZiBmb3JtIGNvbnRyb2xzXG4gICAgICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0gPSBzdXBlci5hcnJheShcbiAgICAgICAgICAgICAgICBuZXdDb250cm9sc0NvbmZpZ1trZXldLm1hcCgobmV3Q29udHJvbHNDb25maWdJdGVtOiBhbnkpID0+XG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2wobmV3Q29udHJvbHNDb25maWdJdGVtKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjYW5DcmVhdGVHcm91cCgpIHtcbiAgICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSBuZXdDb250cm9sc0NvbmZpZ1trZXldO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGNhbmRpZGF0ZSAmJlxuICAgICAgICAgICAgIUFycmF5LmlzQXJyYXkoY2FuZGlkYXRlKSAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLmNvbnN0cnVjdG9yICYmXG4gICAgICAgICAgICB0eXBlb2YgY2FuZGlkYXRlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5sZW5ndGggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAoY2FuZGlkYXRlLmxlbmd0aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY2FuZGlkYXRlKS5sZW5ndGggPT09IGNhbmRpZGF0ZS5sZW5ndGgpKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjYW5DcmVhdGVBcnJheSgpIHtcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShuZXdDb250cm9sc0NvbmZpZ1trZXldKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSBuZXdDb250cm9sc0NvbmZpZ1trZXldWzBdO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5jb25zdHJ1Y3RvciAmJlxuICAgICAgICAgICAgdHlwZW9mIGNhbmRpZGF0ZSA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAgICAgIChjYW5kaWRhdGUubGVuZ3RoID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgICAgKGNhbmRpZGF0ZS5sZW5ndGggIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGNhbmRpZGF0ZSkubGVuZ3RoID09PSBjYW5kaWRhdGUubGVuZ3RoKSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgZW1wdHlcbiAgICB2YWxpZGF0b3JzID0gdmFsaWRhdG9ycyAmJiB2YWxpZGF0b3JzLmZpbHRlcih2YWxpZGF0b3IgPT4gdmFsaWRhdG9yKTtcbiAgICBhc3luY1ZhbGlkYXRvcnMgPVxuICAgICAgYXN5bmNWYWxpZGF0b3JzICYmIGFzeW5jVmFsaWRhdG9ycy5maWx0ZXIodmFsaWRhdG9yID0+IHZhbGlkYXRvcik7XG5cbiAgICAvLyBDcmVhdGUgYW4gQW5ndWxhciBncm91cCBmcm9tIHRoZSB0b3AtbGV2ZWwgb2JqZWN0XG4gICAgY29uc3QgY2xhc3NWYWxpZGF0b3JzID0gZ2V0Q2xhc3NWYWxpZGF0b3JzPFRNb2RlbD4oXG4gICAgICBmYWN0b3J5TW9kZWwsXG4gICAgICBuZXdDb250cm9sc0NvbmZpZyxcbiAgICAgIGV4dHJhICYmIGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnMsXG4gICAgICB0aGlzLkZvcm1Db250cm9sQ2xhc3NcbiAgICApO1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHN1cGVyLmdyb3VwKGNsYXNzVmFsaWRhdG9ycywge1xuICAgICAgLi4uKGFzeW5jVmFsaWRhdG9ycyB8fCB7fSksXG4gICAgICAuLi4odXBkYXRlT24gfHwge30pLFxuICAgICAgLi4uKHZhbGlkYXRvcnMgfHwge30pXG4gICAgfSk7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSByZXN1bHRpbmcgZ3JvdXBcbiAgICAvLyBDaGFuZ2VkIGZyb20gaW50ZXJuYWwgRm9ybUdyb3VwIHRvIER5bmFtaWNGb3JtR3JvdXBcbiAgICBjb25zdCBkeW5hbWljRm9ybUdyb3VwID0gbmV3IER5bmFtaWNGb3JtR3JvdXA8VE1vZGVsPihcbiAgICAgIGZhY3RvcnlNb2RlbCxcbiAgICAgIG5ld0NvbnRyb2xzQ29uZmlnLFxuICAgICAge1xuICAgICAgICBhc3luY1ZhbGlkYXRvcnMsXG4gICAgICAgIHVwZGF0ZU9uLFxuICAgICAgICB2YWxpZGF0b3JzXG4gICAgICB9IGFzIGFueVxuICAgICk7XG5cbiAgICAvLyBBZGQgYWxsIGFuZ3VsYXIgY29udHJvbHMgdG8gdGhlIHJlc3VsdGluZyBkeW5hbWljIGdyb3VwXG4gICAgT2JqZWN0LmtleXMoZm9ybUdyb3VwLmNvbnRyb2xzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBkeW5hbWljRm9ybUdyb3VwLmFkZENvbnRyb2woa2V5LCBmb3JtR3JvdXAuY29udHJvbHNba2V5XSk7XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgYSBsaXN0ZW5lciB0byB0aGUgZHluYW1pYyBncm91cCBmb3IgdmFsdWUgY2hhbmdlczsgb24gY2hhbmdlLCBleGVjdXRlIHZhbGlkYXRpb25cbiAgICBkeW5hbWljRm9ybUdyb3VwLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gZHluYW1pY0Zvcm1Hcm91cC52YWxpZGF0ZSh1bmRlZmluZWQsIGV4dHJhICYmIGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnMpKTtcblxuICAgIHJldHVybiBkeW5hbWljRm9ybUdyb3VwO1xuICB9XG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKlxuICAvLyBIZWxwZXJzXG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGNyZWF0ZXMgYW4gZW1wdHkgb2JqZWN0IGZyb20gdGhlIGRhdGEgcHJvdmlkZWRcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlRW1wdHlPYmplY3Q8VE1vZGVsPihcbiAgICBmYWN0b3J5TW9kZWw6IENsYXNzVHlwZTxUTW9kZWw+LFxuICAgIGRhdGE6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge31cbiAgKTogYW55IHtcbiAgICBsZXQgbW9kaWZpZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IG9iamVjdDogYW55ID0gZmFjdG9yeU1vZGVsID8gcGxhaW5Ub0NsYXNzKGZhY3RvcnlNb2RlbCwgZGF0YSkgOiBkYXRhO1xuICAgIGNvbnN0IGZpZWxkcyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG5cbiAgICBmaWVsZHMuZm9yRWFjaCgoZmllbGROYW1lOiBhbnkpID0+IHtcbiAgICAgIGlmIChvYmplY3RbZmllbGROYW1lXSAmJiBvYmplY3RbZmllbGROYW1lXS5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgb2JqZWN0W2ZpZWxkTmFtZV0ubGVuZ3RoID09PSAxICYmXG4gICAgICAgICAgT2JqZWN0LmtleXMob2JqZWN0W2ZpZWxkTmFtZV1bMF0pLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICBvYmplY3RbZmllbGROYW1lXVswXS5jb25zdHJ1Y3RvclxuICAgICAgICApIHtcbiAgICAgICAgICBvYmplY3RbZmllbGROYW1lXSA9IFtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRW1wdHlPYmplY3Qob2JqZWN0W2ZpZWxkTmFtZV1bMF0uY29uc3RydWN0b3IpXG4gICAgICAgICAgXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvYmplY3RbZmllbGROYW1lXS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBkYXRhW2ZpZWxkTmFtZV0gPSBbe31dO1xuICAgICAgICAgIG1vZGlmaWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YVtmaWVsZE5hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG1vZGlmaWVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVFbXB0eU9iamVjdChmYWN0b3J5TW9kZWwsIGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cbn1cbiJdfQ==