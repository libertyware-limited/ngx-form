import { FormControl } from '@angular/forms';
import { ValidationMetadata } from 'class-validator/metadata/ValidationMetadata';
import { MetadataKeys, RadioOption, TextareaOption } from '@libertyware/ngx-form-core';

import { DynamicFormGroupField } from '../models/dynamic-form-group-field';
import { DynamicFormGroup } from './dynamic-form-group';

export class DynamicFormControl extends FormControl {
  public validationDefinitions: ValidationMetadata[];

  constructor(fieldDefinition: DynamicFormGroupField) {
    super(fieldDefinition.data, fieldDefinition.validationFunctions);

    this.validationDefinitions = fieldDefinition.validationDefinitions;
  }

  private get formModel(): any {
    return (this.parent as DynamicFormGroup<any>).object;
  }


  get hint(): string {
    return this.metaData(MetadataKeys.HINT);
  }

  get readableName(): string {
    return this.metaData(MetadataKeys.DISPLAY_NAME) || this.ControlName;
  }

  get placeholder(): string {
    return this.metaData(MetadataKeys.PLACEHOLDER);
  }

  private metaData(key: string): any {
    return Reflect.getMetadata(key, this.formModel, this.ControlName);
  }

  get ControlName(): string {
    const controls: any = this.parent.controls;
    return Object.keys(controls).find(name => this === controls[name]) as string;
  }

  get radioOptions(): RadioOption[] {
    return this.metaData(MetadataKeys.RADIO_OPTIONS) || [];
  }

  get textareaOptions(): TextareaOption {
    return this.metaData(MetadataKeys.TEXTAREA_OPTIONS);
  }
}
