import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroupDirective
} from '@angular/forms';
import { DynamicFormGroup } from '@libertyware/ngx-form-builder';
import { WidgetOptions } from '@libertyware/ngx-form-core';
import { FieldWidget } from './widgets/field';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'govuk-form-gen',
  templateUrl: 'form-gen.component.html'
})
export class FormGenComponent implements OnInit {
  group!: DynamicFormGroup<any>;

  @Input() widgets: { [key: string]: FieldWidget } = {};

  constructor(private groupDirective: FormGroupDirective) {}

  ngOnInit() {
    this.group = this.groupDirective.form as DynamicFormGroup<any>;
  }

  renderExists(option: WidgetOptions): boolean {
    const exists = this.widgets[option.fieldType] !== undefined;
    if (!exists) {
      console.log(`Field: ${option.fieldName} with render type ${option.fieldType} has no supported render`);
    }
    return exists;
  }

  onSubmit() {
    this.group.validateAllFormFields();
  }
}
