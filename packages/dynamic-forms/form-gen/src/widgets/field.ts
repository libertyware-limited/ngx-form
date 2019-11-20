import { Input, Optional, SkipSelf, Host, OnInit } from '@angular/core';
import { DynamicFormGroup, DynamicFormControl } from '@libertyware/ngx-form-builder';
import { FormGroupDirective } from '@angular/forms';

export abstract class FieldWidget implements OnInit {
  @Input() fieldName!: string;

  public group!: DynamicFormGroup<any>;

  constructor(@Optional() @SkipSelf() @Host() private groupDirective: FormGroupDirective) {}

  ngOnInit() {
    this.group = this.groupDirective.form as DynamicFormGroup<any>;
  }

  get hintText(): string {
    return this.formControl.hint;
  }

  get formControl(): DynamicFormControl {
    return this.group.get(this.fieldName) as DynamicFormControl;
  }
}
