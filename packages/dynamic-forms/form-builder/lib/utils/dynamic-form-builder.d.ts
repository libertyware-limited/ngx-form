import 'reflect-metadata';
import { AbstractControlOptions, FormBuilder } from '@angular/forms';
import { ClassType } from 'class-transformer/ClassTransformer';
import { DynamicFormGroupConfig } from '../models/dynamic-form-group-config';
import { DynamicFormGroup, FormModel } from './dynamic-form-group';
import { DynamicFormControl } from './dynamic-form-control';
export declare class DynamicFormBuilder extends FormBuilder {
    protected FormGroupClass: typeof DynamicFormGroup;
    protected FormControlClass: typeof DynamicFormControl;
    group<TModel>(factoryModel: ClassType<TModel>, controlsConfig?: FormModel<TModel> | DynamicFormGroupConfig | {
        [key: string]: any;
    }, options?: AbstractControlOptions | DynamicFormGroupConfig): DynamicFormGroup<TModel>;
    /**
     * Recursively creates an empty object from the data provided
     */
    private createEmptyObject;
}
