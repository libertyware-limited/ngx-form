import { isNullOrUndefined } from 'util';
export function isDynamicFormGroupConfig(options) {
    return options && !isNullOrUndefined(options['customValidatorOptions']);
}
export function isLegacyOrOpts(options) {
    return options && (!isNullOrUndefined(options['validator']) || !isNullOrUndefined(options['asyncValidator']));
}
export function isAbstractControlOptions(options) {
    return (options &&
        (!isNullOrUndefined(options.validators) ||
            !isNullOrUndefined(options.asyncValidators) ||
            !isNullOrUndefined(options.updateOn)));
}
