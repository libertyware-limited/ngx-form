import { FormControl } from '@angular/forms';
import { ValidationMetadata } from 'class-validator/metadata/ValidationMetadata';
import { RadioOption, TextareaOption } from '@libertyware/ngx-form-core';
import { DynamicFormGroupField } from '../models/dynamic-form-group-field';
export declare class DynamicFormControl extends FormControl {
    validationDefinitions: ValidationMetadata[];
    constructor(fieldDefinition: DynamicFormGroupField);
    private readonly formModel;
    readonly hint: string;
    readonly readableName: string;
    readonly placeholder: string;
    private metaData;
    readonly ControlName: string;
    readonly radioOptions: RadioOption[];
    readonly textareaOptions: TextareaOption;
}
