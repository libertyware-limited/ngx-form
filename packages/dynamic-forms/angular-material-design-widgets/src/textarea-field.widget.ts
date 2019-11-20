import { Component } from '@angular/core';
import { FieldWidget } from '@libertyware/ngx-form-gen';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'ngx-material-input-widget',
  template: `
    <div class="example-container" [id]="fieldName + '-controls'">
      <mat-form-field>
        <textarea matInput [placeholder]="formControl?.readableName"></textarea>
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
export class NgxMaterialTextareaWidget extends FieldWidget {}
