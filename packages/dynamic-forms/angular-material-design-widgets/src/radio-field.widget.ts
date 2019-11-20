import { Component } from '@angular/core';
import { FieldWidget } from '@libertyware/ngx-form-gen';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-material-radio-widget',
  template: `
    <div class="example-container" [id]="fieldName + '-controls'">
      <mat-form-field>
        <mat-radio-group aria-label="Select an option">
          <mat-radio-button *ngFor="let radioOption of formControl.radioOptions; let i = index" [value]="radioOption.value">{{ radioOption.label }}</mat-radio-button>
        </mat-radio-group>
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
export class NgxMaterialRadioWidget extends FieldWidget {}
