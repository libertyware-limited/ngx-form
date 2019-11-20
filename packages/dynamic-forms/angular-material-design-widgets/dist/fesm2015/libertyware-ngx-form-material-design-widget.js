import { __decorate } from 'tslib';
import { Component, NgModule } from '@angular/core';
import { FieldWidget } from '@libertyware/ngx-form-gen';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { FieldType } from '@libertyware/ngx-form-core';

let NgxMaterialDateWidget = 
// tslint:disable-next-line: component-class-suffix
class NgxMaterialDateWidget extends FieldWidget {
};
NgxMaterialDateWidget = __decorate([
    Component({
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
], NgxMaterialDateWidget);

let NgxMaterialInputWidget = 
// tslint:disable-next-line: component-class-suffix
class NgxMaterialInputWidget extends FieldWidget {
};
NgxMaterialInputWidget = __decorate([
    Component({
        // tslint:disable-next-line: component-selector
        selector: 'ngx-material-input-widget',
        template: `
    <div class="example-container" [id]="fieldName + '-controls'">
      <mat-form-field>
        <input matInput [placeholder]="formControl?.readableName" />
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
], NgxMaterialInputWidget);

let NgxMaterialRadioWidget = 
// tslint:disable-next-line: component-class-suffix
class NgxMaterialRadioWidget extends FieldWidget {
};
NgxMaterialRadioWidget = __decorate([
    Component({
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
], NgxMaterialRadioWidget);

let NgxMaterialTextareaWidget = 
// tslint:disable-next-line: component-class-suffix
class NgxMaterialTextareaWidget extends FieldWidget {
};
NgxMaterialTextareaWidget = __decorate([
    Component({
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
], NgxMaterialTextareaWidget);

const widgets = [NgxMaterialDateWidget, NgxMaterialInputWidget, NgxMaterialRadioWidget, NgxMaterialTextareaWidget];
let NgxMaterialFormModule = class NgxMaterialFormModule {
};
NgxMaterialFormModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            ReactiveFormsModule,
            MatDatepickerModule,
            MatInputModule,
            MatRadioModule,
            MatNativeDateModule,
            MatRippleModule
        ],
        exports: [...widgets],
        declarations: [...widgets],
        entryComponents: [...widgets]
    })
], NgxMaterialFormModule);

const materialDesignRenderOptions = {
    [FieldType.TEXT]: NgxMaterialInputWidget,
    [FieldType.RADIO]: NgxMaterialRadioWidget,
    [FieldType.DATE]: NgxMaterialDateWidget,
    [FieldType.TEXTAREA]: NgxMaterialTextareaWidget,
};

/**
 * Generated bundle index. Do not edit.
 */

export { NgxMaterialDateWidget, NgxMaterialFormModule, NgxMaterialInputWidget, NgxMaterialRadioWidget, NgxMaterialTextareaWidget, materialDesignRenderOptions };
//# sourceMappingURL=libertyware-ngx-form-material-design-widget.js.map
