import * as tslib_1 from "tslib";
import 'reflect-metadata';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWJ1aWxkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbGliZXJ0eXdhcmUvbmd4LWZvcm0tYnVpbGRlci8iLCJzb3VyY2VzIjpbInV0aWxzL2R5bmFtaWMtZm9ybS1idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBNEMsV0FBVyxFQUFlLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR2pELE9BQU8sRUFFTCx3QkFBd0IsRUFDeEIsd0JBQXdCLEVBQ3hCLGNBQWMsRUFDZixNQUFNLHFDQUFxQyxDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBYSxrQkFBa0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzVEO0lBQXdDLDhDQUFXO0lBQW5EO1FBQUEscUVBeU9DO1FBdk9XLG9CQUFjLEdBQUcsZ0JBQWdCLENBQUM7UUFDbEMsc0JBQWdCLEdBQUcsa0JBQWtCLENBQUM7O0lBc09sRCxDQUFDO0lBck9DLGtDQUFLLEdBQUwsVUFDRSxZQUErQixFQUMvQixjQUcwQixFQUMxQixPQUF5RDtRQU4zRCxpQkF5TEM7UUFqTEMsb0dBQW9HO1FBQ3BHLElBQ0UsY0FBYztZQUNkLENBQUMsd0JBQXdCLENBQUMsY0FBYyxDQUFDO2dCQUN2QyxjQUFjLENBQUMsY0FBYyxDQUFDO2dCQUM5Qix3QkFBd0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMzQyxDQUFDLE9BQU8sRUFDUjtZQUNBLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1NBQzVEO1FBRUQsb0VBQW9FO1FBQ3BFLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDbkIsSUFBTSxLQUFLLEdBQUksSUFBSSxZQUFZ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ZWN0LW1ldGFkYXRhJztcblxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sT3B0aW9ucywgQXN5bmNWYWxpZGF0b3JGbiwgRm9ybUJ1aWxkZXIsIFZhbGlkYXRvckZuIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgcGxhaW5Ub0NsYXNzIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgQ2xhc3NUeXBlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXIvQ2xhc3NUcmFuc2Zvcm1lcic7XG5cbmltcG9ydCB7XG4gIER5bmFtaWNGb3JtR3JvdXBDb25maWcsXG4gIGlzQWJzdHJhY3RDb250cm9sT3B0aW9ucyxcbiAgaXNEeW5hbWljRm9ybUdyb3VwQ29uZmlnLFxuICBpc0xlZ2FjeU9yT3B0c1xufSBmcm9tICcuLi9tb2RlbHMvZHluYW1pYy1mb3JtLWdyb3VwLWNvbmZpZyc7XG5pbXBvcnQgeyBEeW5hbWljRm9ybUdyb3VwLCBGb3JtTW9kZWwsIGdldENsYXNzVmFsaWRhdG9ycyB9IGZyb20gJy4vZHluYW1pYy1mb3JtLWdyb3VwJztcbmltcG9ydCB7IER5bmFtaWNGb3JtQ29udHJvbCB9IGZyb20gJy4vZHluYW1pYy1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm0gfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tY29yZSc7XG5cbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybUJ1aWxkZXIgZXh0ZW5kcyBGb3JtQnVpbGRlciB7XG5cbiAgcHJvdGVjdGVkIEZvcm1Hcm91cENsYXNzID0gRHluYW1pY0Zvcm1Hcm91cDtcbiAgcHJvdGVjdGVkIEZvcm1Db250cm9sQ2xhc3MgPSBEeW5hbWljRm9ybUNvbnRyb2w7XG4gIGdyb3VwPFRNb2RlbD4oXG4gICAgZmFjdG9yeU1vZGVsOiBDbGFzc1R5cGU8VE1vZGVsPixcbiAgICBjb250cm9sc0NvbmZpZz86XG4gICAgICB8IEZvcm1Nb2RlbDxUTW9kZWw+XG4gICAgICB8IER5bmFtaWNGb3JtR3JvdXBDb25maWdcbiAgICAgIHwgeyBba2V5OiBzdHJpbmddOiBhbnkgfSxcbiAgICBvcHRpb25zPzogQWJzdHJhY3RDb250cm9sT3B0aW9ucyB8IER5bmFtaWNGb3JtR3JvdXBDb25maWdcbiAgKTogRHluYW1pY0Zvcm1Hcm91cDxUTW9kZWw+IHtcbiAgICAvLyBQcm9jZXNzIHRoZSBncm91cCB3aXRoIHRoZSBjb250cm9sc0NvbmZpZyBwYXNzZWQgaW50byBleHRyYSBpbnN0ZWFkLiAoV2hhdCBkb2VzIHRoaXMgYWNjb21wbGlzaD8pXG4gICAgaWYgKFxuICAgICAgY29udHJvbHNDb25maWcgJiZcbiAgICAgIChpc0Fic3RyYWN0Q29udHJvbE9wdGlvbnMoY29udHJvbHNDb25maWcpIHx8XG4gICAgICAgIGlzTGVnYWN5T3JPcHRzKGNvbnRyb2xzQ29uZmlnKSB8fFxuICAgICAgICBpc0R5bmFtaWNGb3JtR3JvdXBDb25maWcoY29udHJvbHNDb25maWcpKSAmJlxuICAgICAgIW9wdGlvbnNcbiAgICApIHtcbiAgICAgIHJldHVybiB0aGlzLmdyb3VwKGZhY3RvcnlNb2RlbCwgdW5kZWZpbmVkLCBjb250cm9sc0NvbmZpZyk7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBzZWN0aW9uIG9mIGNvZGUgd2FzIGFkZGVkIGluIGZyb20gdGhlIG9yaWdpbmFsIGNvZGUgLSBKb3JkYW5cbiAgICBpZiAoIWNvbnRyb2xzQ29uZmlnKSB7XG4gICAgICBjb25zdCBtb2RlbCA9IChuZXcgZmFjdG9yeU1vZGVsKCkgYXMgdW5rbm93bikgYXMgRHluYW1pY0Zvcm07XG4gICAgICBjb25zdCBmaWVsZHMgPSBtb2RlbC5nZXRGb3JtRmllbGRzKCk7XG4gICAgICBjb250cm9sc0NvbmZpZyA9IHtcbiAgICAgICAgLi4uKChmaWVsZHNcbiAgICAgICAgICAubWFwKChmaWVsZDogYW55KSA9PiAoe1xuICAgICAgICAgICAgW2ZpZWxkLmZpZWxkTmFtZV06ICcnXG4gICAgICAgICAgfSkpXG4gICAgICAgICAgLnJlZHVjZShcbiAgICAgICAgICAgIChyZXY6IGFueSwgY3VycmVudDogYW55KSA9PiAoeyAuLi5yZXYsIC4uLmN1cnJlbnQgfSksXG4gICAgICAgICAgICB7fVxuICAgICAgICAgICkgYXMgdW5rbm93bikgYXMgRm9ybU1vZGVsPFRNb2RlbD4pXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IGV4dHJhOiBEeW5hbWljRm9ybUdyb3VwQ29uZmlnID0gb3B0aW9ucyBhcyBEeW5hbWljRm9ybUdyb3VwQ29uZmlnO1xuXG4gICAgbGV0IHZhbGlkYXRvcnM6IFZhbGlkYXRvckZuW10gfCBudWxsID0gbnVsbDtcbiAgICBsZXQgYXN5bmNWYWxpZGF0b3JzOiBWYWxpZGF0b3JGbltdICB8IG51bGwgPSBudWxsO1xuICAgIGxldCB1cGRhdGVPbjogYW55O1xuXG4gICAgaWYgKGV4dHJhICE9IG51bGwpIHtcbiAgICAgIGlmIChpc0Fic3RyYWN0Q29udHJvbE9wdGlvbnMoZXh0cmEpKSB7XG4gICAgICAgIC8vIGBleHRyYWAgYXJlIGBBYnN0cmFjdENvbnRyb2xPcHRpb25zYFxuICAgICAgICB2YWxpZGF0b3JzID0gZXh0cmEudmFsaWRhdG9ycyAhPSBudWxsID8gZXh0cmEudmFsaWRhdG9ycyA6IG51bGw7XG4gICAgICAgIGFzeW5jVmFsaWRhdG9ycyA9IGV4dHJhLmFzeW5jVmFsaWRhdG9ycyAhPSBudWxsID8gZXh0cmEuYXN5bmNWYWxpZGF0b3JzIDogbnVsbDtcbiAgICAgICAgdXBkYXRlT24gPSBleHRyYS51cGRhdGVPbiAhPSBudWxsID8gZXh0cmEudXBkYXRlT24gOiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoaXNMZWdhY3lPck9wdHMoZXh0cmEpKSB7XG4gICAgICAgIC8vIGBleHRyYWAgYXJlIGxlZ2FjeSBmb3JtIGdyb3VwIG9wdGlvbnNcbiAgICAgICAgdmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMgfHwgW107XG4gICAgICAgIGlmIChleHRyYS52YWxpZGF0b3IpIHZhbGlkYXRvcnMucHVzaChleHRyYS52YWxpZGF0b3IpO1xuXG4gICAgICAgIGFzeW5jVmFsaWRhdG9ycyA9IGFzeW5jVmFsaWRhdG9ycyB8fCBbXTtcbiAgICAgICAgaWYgKGV4dHJhLmFzeW5jVmFsaWRhdG9yKSB2YWxpZGF0b3JzLnB1c2goZXh0cmEuYXN5bmNWYWxpZGF0b3IpO1xuICAgICAgfVxuICAgICAgLy8gU2V0IGRlZmF1bHQgY3VzdG9tVmFsaWRhdG9yT3B0aW9uc1xuICAgICAgaWYgKCFpc0R5bmFtaWNGb3JtR3JvdXBDb25maWcoZXh0cmEpKSB7XG4gICAgICAgIGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnMgPSB7IHZhbGlkYXRpb25FcnJvcjogeyB0YXJnZXQ6IGZhbHNlIH0gfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbmV3Q29udHJvbHNDb25maWc6IEZvcm1Nb2RlbDxUTW9kZWw+IHwgYW55O1xuXG4gICAgaWYgKGNvbnRyb2xzQ29uZmlnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG5ld0NvbnRyb2xzQ29uZmlnID0gY29udHJvbHNDb25maWcgYXMgRm9ybU1vZGVsPFRNb2RlbD47XG4gICAgfVxuXG4gICAgLy8gZXhwZXJpbWVudGFsXG4gICAgaWYgKGNvbnRyb2xzQ29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5ld0NvbnRyb2xzQ29uZmlnID0geyAuLi50aGlzLmNyZWF0ZUVtcHR5T2JqZWN0KGZhY3RvcnlNb2RlbCkgfTtcblxuICAgICAgT2JqZWN0LmtleXMobmV3Q29udHJvbHNDb25maWcpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGNhbkNyZWF0ZUdyb3VwKCkpIHtcbiAgICAgICAgICAvLyByZWN1cnNpdmVseSBjcmVhdGUgYSBkeW5hbWljIGdyb3VwIGZvciB0aGUgbmVzdGVkIG9iamVjdFxuICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0gPSB0aGlzLmdyb3VwKFxuICAgICAgICAgICAgbmV3Q29udHJvbHNDb25maWdba2V5XS5jb25zdHJ1Y3RvcixcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgLi4uKGV4dHJhLmN1c3RvbVZhbGlkYXRvck9wdGlvbnNcbiAgICAgICAgICAgICAgICA/IHsgY3VzdG9tVmFsaWRhdG9yT3B0aW9uczogZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9ucyB9XG4gICAgICAgICAgICAgICAgOiB7fSksXG4gICAgICAgICAgICAgIGFzeW5jVmFsaWRhdG9ycyxcbiAgICAgICAgICAgICAgdXBkYXRlT24sXG4gICAgICAgICAgICAgIHZhbGlkYXRvcnNcbiAgICAgICAgICAgIH0gYXMgYW55XG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY2FuQ3JlYXRlQXJyYXkoKSkge1xuICAgICAgICAgICAgaWYgKG5ld0NvbnRyb2xzQ29uZmlnW2tleV1bMF0uY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgLy8gcmVjdXJzaXZlbHkgY3JlYXRlIGFuIGFycmF5IHdpdGggYSBncm91cFxuICAgICAgICAgICAgICBuZXdDb250cm9sc0NvbmZpZ1trZXldID0gc3VwZXIuYXJyYXkoXG4gICAgICAgICAgICAgICAgbmV3Q29udHJvbHNDb25maWdba2V5XS5tYXAoKG5ld0NvbnRyb2xzQ29uZmlnSXRlbTogYW55KSA9PlxuICAgICAgICAgICAgICAgICAgdGhpcy5ncm91cChuZXdDb250cm9sc0NvbmZpZ0l0ZW0uY29uc3RydWN0b3IsIHVuZGVmaW5lZCwge1xuICAgICAgICAgICAgICAgICAgICAuLi4oZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgID8geyBjdXN0b21WYWxpZGF0b3JPcHRpb25zOiBleHRyYS5jdXN0b21WYWxpZGF0b3JPcHRpb25zIH1cbiAgICAgICAgICAgICAgICAgICAgICA6IHt9KSxcbiAgICAgICAgICAgICAgICAgICAgYXN5bmNWYWxpZGF0b3JzLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVPbixcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdG9yc1xuICAgICAgICAgICAgICAgICAgfSBhcyBhbnkpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFuIGFycmF5IG9mIGZvcm0gY29udHJvbHNcbiAgICAgICAgICAgICAgbmV3Q29udHJvbHNDb25maWdba2V5XSA9IHN1cGVyLmFycmF5KFxuICAgICAgICAgICAgICAgIG5ld0NvbnRyb2xzQ29uZmlnW2tleV0ubWFwKChuZXdDb250cm9sc0NvbmZpZ0l0ZW06IGFueSkgPT5cbiAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbChuZXdDb250cm9sc0NvbmZpZ0l0ZW0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNhbkNyZWF0ZUdyb3VwKCkge1xuICAgICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IG5ld0NvbnRyb2xzQ29uZmlnW2tleV07XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgY2FuZGlkYXRlICYmXG4gICAgICAgICAgICAhQXJyYXkuaXNBcnJheShjYW5kaWRhdGUpICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUuY29uc3RydWN0b3IgJiZcbiAgICAgICAgICAgIHR5cGVvZiBjYW5kaWRhdGUgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAoY2FuZGlkYXRlLmxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICAgIChjYW5kaWRhdGUubGVuZ3RoICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhjYW5kaWRhdGUpLmxlbmd0aCA9PT0gY2FuZGlkYXRlLmxlbmd0aCkpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNhbkNyZWF0ZUFycmF5KCkge1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG5ld0NvbnRyb2xzQ29uZmlnW2tleV0pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IG5ld0NvbnRyb2xzQ29uZmlnW2tleV1bMF07XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgY2FuZGlkYXRlLmNvbnN0cnVjdG9yICYmXG4gICAgICAgICAgICB0eXBlb2YgY2FuZGlkYXRlID09PSAnb2JqZWN0JyAmJlxuICAgICAgICAgICAgKGNhbmRpZGF0ZS5sZW5ndGggPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgICAoY2FuZGlkYXRlLmxlbmd0aCAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoY2FuZGlkYXRlKS5sZW5ndGggPT09IGNhbmRpZGF0ZS5sZW5ndGgpKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSBlbXB0eVxuICAgIHZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzICYmIHZhbGlkYXRvcnMuZmlsdGVyKHZhbGlkYXRvciA9PiB2YWxpZGF0b3IpO1xuICAgIGFzeW5jVmFsaWRhdG9ycyA9XG4gICAgICBhc3luY1ZhbGlkYXRvcnMgJiYgYXN5bmNWYWxpZGF0b3JzLmZpbHRlcih2YWxpZGF0b3IgPT4gdmFsaWRhdG9yKTtcblxuICAgIC8vIENyZWF0ZSBhbiBBbmd1bGFyIGdyb3VwIGZyb20gdGhlIHRvcC1sZXZlbCBvYmplY3RcbiAgICBjb25zdCBjbGFzc1ZhbGlkYXRvcnMgPSBnZXRDbGFzc1ZhbGlkYXRvcnM8VE1vZGVsPihcbiAgICAgIGZhY3RvcnlNb2RlbCxcbiAgICAgIG5ld0NvbnRyb2xzQ29uZmlnLFxuICAgICAgZXh0cmEgJiYgZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9ucyxcbiAgICAgIHRoaXMuRm9ybUNvbnRyb2xDbGFzc1xuICAgICk7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gc3VwZXIuZ3JvdXAoY2xhc3NWYWxpZGF0b3JzLCB7XG4gICAgICAuLi4oYXN5bmNWYWxpZGF0b3JzIHx8IHt9KSxcbiAgICAgIC4uLih1cGRhdGVPbiB8fCB7fSksXG4gICAgICAuLi4odmFsaWRhdG9ycyB8fCB7fSlcbiAgICB9KTtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIHJlc3VsdGluZyBncm91cFxuICAgIC8vIENoYW5nZWQgZnJvbSBpbnRlcm5hbCBGb3JtR3JvdXAgdG8gRHluYW1pY0Zvcm1Hcm91cFxuICAgIGNvbnN0IGR5bmFtaWNGb3JtR3JvdXAgPSBuZXcgRHluYW1pY0Zvcm1Hcm91cDxUTW9kZWw+KFxuICAgICAgZmFjdG9yeU1vZGVsLFxuICAgICAgbmV3Q29udHJvbHNDb25maWcsXG4gICAgICB7XG4gICAgICAgIGFzeW5jVmFsaWRhdG9ycyxcbiAgICAgICAgdXBkYXRlT24sXG4gICAgICAgIHZhbGlkYXRvcnNcbiAgICAgIH0gYXMgYW55XG4gICAgKTtcblxuICAgIC8vIEFkZCBhbGwgYW5ndWxhciBjb250cm9scyB0byB0aGUgcmVzdWx0aW5nIGR5bmFtaWMgZ3JvdXBcbiAgICBPYmplY3Qua2V5cyhmb3JtR3JvdXAuY29udHJvbHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGR5bmFtaWNGb3JtR3JvdXAuYWRkQ29udHJvbChrZXksIGZvcm1Hcm91cC5jb250cm9sc1trZXldKTtcbiAgICB9KTtcblxuICAgIC8vIEFkZCBhIGxpc3RlbmVyIHRvIHRoZSBkeW5hbWljIGdyb3VwIGZvciB2YWx1ZSBjaGFuZ2VzOyBvbiBjaGFuZ2UsIGV4ZWN1dGUgdmFsaWRhdGlvblxuICAgIGR5bmFtaWNGb3JtR3JvdXAudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiBkeW5hbWljRm9ybUdyb3VwLnZhbGlkYXRlKHVuZGVmaW5lZCwgZXh0cmEgJiYgZXh0cmEuY3VzdG9tVmFsaWRhdG9yT3B0aW9ucykpO1xuXG4gICAgcmV0dXJuIGR5bmFtaWNGb3JtR3JvdXA7XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqXG4gIC8vIEhlbHBlcnNcblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgY3JlYXRlcyBhbiBlbXB0eSBvYmplY3QgZnJvbSB0aGUgZGF0YSBwcm92aWRlZFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVFbXB0eU9iamVjdDxUTW9kZWw+KFxuICAgIGZhY3RvcnlNb2RlbDogQ2xhc3NUeXBlPFRNb2RlbD4sXG4gICAgZGF0YToge1trZXk6IHN0cmluZ106IGFueX0gPSB7fVxuICApOiBhbnkge1xuICAgIGxldCBtb2RpZmllZCA9IGZhbHNlO1xuXG4gICAgY29uc3Qgb2JqZWN0OiBhbnkgPSBmYWN0b3J5TW9kZWwgPyBwbGFpblRvQ2xhc3MoZmFjdG9yeU1vZGVsLCBkYXRhKSA6IGRhdGE7XG4gICAgY29uc3QgZmllbGRzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcblxuICAgIGZpZWxkcy5mb3JFYWNoKChmaWVsZE5hbWU6IGFueSkgPT4ge1xuICAgICAgaWYgKG9iamVjdFtmaWVsZE5hbWVdICYmIG9iamVjdFtmaWVsZE5hbWVdLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBvYmplY3RbZmllbGROYW1lXS5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgICBPYmplY3Qua2V5cyhvYmplY3RbZmllbGROYW1lXVswXSkubGVuZ3RoID4gMCAmJlxuICAgICAgICAgIG9iamVjdFtmaWVsZE5hbWVdWzBdLmNvbnN0cnVjdG9yXG4gICAgICAgICkge1xuICAgICAgICAgIG9iamVjdFtmaWVsZE5hbWVdID0gW1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVFbXB0eU9iamVjdChvYmplY3RbZmllbGROYW1lXVswXS5jb25zdHJ1Y3RvcilcbiAgICAgICAgICBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9iamVjdFtmaWVsZE5hbWVdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGRhdGFbZmllbGROYW1lXSA9IFt7fV07XG4gICAgICAgICAgbW9kaWZpZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhW2ZpZWxkTmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobW9kaWZpZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUVtcHR5T2JqZWN0KGZhY3RvcnlNb2RlbCwgZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxufVxuIl19