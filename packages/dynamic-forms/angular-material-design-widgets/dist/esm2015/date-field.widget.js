import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FieldWidget } from '@libertyware/ngx-form-gen';
let NgxMaterialDateWidget = 
// tslint:disable-next-line: component-class-suffix
class NgxMaterialDateWidget extends FieldWidget {
};
NgxMaterialDateWidget = tslib_1.__decorate([
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
export { NgxMaterialDateWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1maWVsZC53aWRnZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbGliZXJ0eXdhcmUvbmd4LWZvcm0tbWF0ZXJpYWwtZGVzaWduLXdpZGdldC8iLCJzb3VyY2VzIjpbImRhdGUtZmllbGQud2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQTRCeEQsSUFBYSxxQkFBcUI7QUFEbEMsbURBQW1EO0FBQ25ELE1BQWEscUJBQXNCLFNBQVEsV0FBVztDQUFHLENBQUE7QUFBNUMscUJBQXFCO0lBMUJqQyxTQUFTLENBQUM7UUFDVCwrQ0FBK0M7UUFDL0MsUUFBUSxFQUFFLDBCQUEwQjtRQUNwQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JUO0tBQ0YsQ0FBQztJQUNGLG1EQUFtRDtHQUN0QyxxQkFBcUIsQ0FBdUI7U0FBNUMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFdpZGdldCB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1nZW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtZGF0ZS13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLWNvbnRhaW5lclwiIFtpZF09XCJmaWVsZE5hbWUgKyAnLWNvbnRyb2xzJ1wiPlxuICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBtYXRJbnB1dFxuICAgICAgICAgIFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImZvcm1Db250cm9sPy5yZWFkYWJsZU5hbWVcIlxuICAgICAgICAvPlxuICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInBpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuICAgICAgICA8bWF0LWhpbnQ+e3sgaGludFRleHQgfX08L21hdC1oaW50PlxuICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZ3JvdXA/LmN1c3RvbVZhbGlkYXRlRXJyb3JzIHwgYXN5bmMgYXMgZXJyb3JzXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZXJyb3Igb2YgZXJyb3JzW2ZpZWxkTmFtZV07IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIHt7IGVycm9yIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIDwvZGl2PlxuICBgXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxEYXRlV2lkZ2V0IGV4dGVuZHMgRmllbGRXaWRnZXQge31cbiJdfQ==