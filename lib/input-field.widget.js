var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { FieldWidget } from '@libertyware/ngx-form-gen';
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
export { NgxMaterialInputWidget };
