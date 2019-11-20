import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormArray, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { ClassType } from 'class-transformer/ClassTransformer';
import { ValidationError, ValidatorOptions } from 'class-validator';
import 'reflect-metadata';
import { BehaviorSubject, Subject } from 'rxjs';
import { Dictionary, ShortValidationErrors } from '../models';
import { DynamicFormControl } from './dynamic-form-control';
import { WidgetOptions } from '@libertyware/ngx-form-core';
export declare type FormModel<T> = {
    [P in keyof T]?: T[P] | DynamicFormGroup<any> | FormArray;
};
export declare class DynamicFormGroup<TModel> extends FormGroup {
    factoryModel: ClassType<TModel>;
    fields: FormModel<TModel>;
    nativeValidateErrors: BehaviorSubject<Dictionary<any>>;
    customValidateErrors: BehaviorSubject<ShortValidationErrors>;
    formErrors: ShortValidationErrors | null;
    formFields: Dictionary;
    objectChange: Subject<unknown>;
    protected FormControlClass: typeof DynamicFormControl;
    protected _object: TModel | null;
    protected _externalErrors: ShortValidationErrors | null;
    protected _validatorOptions: ValidatorOptions | null;
    protected _fb: FormBuilder;
    private _formGen;
    constructor(factoryModel: ClassType<TModel>, fields: FormModel<TModel>, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null);
    getFormGenData(): WidgetOptions[];
    externalErrors: ShortValidationErrors | null;
    validatorOptions: ValidatorOptions | null;
    object: TModel;
    validate(externalErrors?: ShortValidationErrors, validatorOptions?: ValidatorOptions): void;
    validateAsync(externalErrors?: ShortValidationErrors, validatorOptions?: ValidatorOptions): Promise<void>;
    setCustomErrors(allErrors: any): void;
    protected collectErrors(control: Dictionary, isRoot?: boolean): any | null;
    validateAllFormFields(): void;
    resetValidateAllFormFields(): void;
    classToClass<TClassModel>(object: TClassModel): TClassModel;
    plainToClass<TClassModel, Object>(cls: ClassType<TClassModel>, plain: Object): TClassModel;
    setExternalErrorsAsync(externalErrors: ShortValidationErrors): Promise<void>;
    setExternalErrors(externalErrors: ShortValidationErrors): void;
    getExternalErrors(): ShortValidationErrors;
    clearExternalErrors(): void;
    clearExternalErrorsAsync(): Promise<void>;
    setValidatorOptionsAsync(validatorOptions: ValidatorOptions): Promise<void>;
    setValidatorOptions(validatorOptions: ValidatorOptions): void;
    getValidatorOptions(): ValidatorOptions;
    protected onlyFields(fields: FormModel<any>): Dictionary;
    transformValidationErrors(errors: ValidationError[]): ShortValidationErrors;
    protected mergeErrors(externalErrors?: ShortValidationErrors, validationErrors?: ShortValidationErrors): any;
    protected markAsInvalidForExternalErrors(errors: ShortValidationErrors, controls?: Dictionary<AbstractControl>): void;
    /**
     * Recursively gets all values from the form controls and all sub form group and array controls and returns it as
     * an object
     */
    protected getObject(): TModel;
    /**
     * Sets the value of every control on the form and recursively sets the values of the controls
     * on all sub form groups
     *
     * @param object the data to assign to all controls of the form group and sub groups
     */
    protected setObject(object: TModel): void;
}
export declare function getClassValidators<TModel>(factoryModel: ClassType<TModel>, fields: Dictionary, validatorOptions?: ValidatorOptions, FormControlClass?: any): {};
