import { Component } from '@angular/core';
import { FieldWidget } from '@libertyware/ngx-form-gen';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-material-date-widget',
  template: `
    <div class="example-container" [id]="fieldName + '-controls'">
      <mat-form-field>
        <input
          matInput
          [matDatepicker]="picker"
          [placeholder]="formControl?.readableName"
        />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
        <mat-hint>{{ hintText }}</mat-hint>
        <mat-error *ngIf="group?.customValidateErrors | async as errors">
          <ng-container *ngFor="let error of errors[fieldName]; let i = index">
            <div>
              {{ error }}
            </div>
          </ng-container>
        </mat-error>
      </mat-form-field>
    </div>
  `
})
// tslint:disable-next-line: component-class-suffix
export class NgxMaterialDateWidget extends FieldWidget {}
