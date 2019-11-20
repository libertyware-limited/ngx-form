import { OnInit } from '@angular/core';
import { DynamicFormGroup, DynamicFormControl } from '@oop-dynmic-forms/ngx-form-builder';
import { FormGroupDirective } from '@angular/forms';
export declare abstract class FieldWidget implements OnInit {
    private groupDirective;
    fieldName: string;
    group: DynamicFormGroup<any>;
    constructor(groupDirective: FormGroupDirective);
    ngOnInit(): void;
    readonly hintText: string;
    readonly formControl: DynamicFormControl;
}
