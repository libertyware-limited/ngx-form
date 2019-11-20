import { OnInit } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { DynamicFormGroup } from '@oop-dynmic-forms/ngx-form-builder';
import { WidgetOptions } from '@oop-dynmic-forms/core';
import { FieldWidget } from './widgets/field';
export declare class FormGenComponent implements OnInit {
    private groupDirective;
    group: DynamicFormGroup<any>;
    widgets: {
        [key: string]: FieldWidget;
    };
    constructor(groupDirective: FormGroupDirective);
    ngOnInit(): void;
    renderExists(option: WidgetOptions): boolean;
    onSubmit(): void;
}
