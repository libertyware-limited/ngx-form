import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { ValidatorOptions } from 'class-validator';
export interface DynamicFormGroupConfig {
    validator?: ValidatorFn | undefined;
    asyncValidator?: AsyncValidatorFn | undefined;
    validators?: ValidatorFn[] | undefined;
    asyncValidators?: AsyncValidatorFn[] | undefined;
    updateOn?: any | undefined;
    customValidatorOptions?: ValidatorOptions | undefined;
}
export declare function isDynamicFormGroupConfig(options: DynamicFormGroupConfig): boolean;
export declare function isLegacyOrOpts(options: DynamicFormGroupConfig): boolean;
export declare function isAbstractControlOptions(options: AbstractControlOptions | DynamicFormGroupConfig): boolean;
