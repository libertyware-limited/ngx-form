import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FieldWidget } from '@libertyware/ngx-form-gen';
let NgxMaterialInputWidget = 
// tslint:disable-next-line: component-class-suffix
class NgxMaterialInputWidget extends FieldWidget {
};
NgxMaterialInputWidget = tslib_1.__decorate([
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZmllbGQud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLW1hdGVyaWFsLWRlc2lnbi13aWRnZXQvIiwic291cmNlcyI6WyJpbnB1dC1maWVsZC53aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBc0J4RCxJQUFhLHNCQUFzQjtBQURuQyxtREFBbUQ7QUFDbkQsTUFBYSxzQkFBdUIsU0FBUSxXQUFXO0NBQUcsQ0FBQTtBQUE3QyxzQkFBc0I7SUFwQmxDLFNBQVMsQ0FBQztRQUNULCtDQUErQztRQUMvQyxRQUFRLEVBQUUsMkJBQTJCO1FBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7R0FjVDtLQUNGLENBQUM7SUFDRixtREFBbUQ7R0FDdEMsc0JBQXNCLENBQXVCO1NBQTdDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRXaWRnZXQgfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tZ2VuJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLWlucHV0LXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtY29udGFpbmVyXCIgW2lkXT1cImZpZWxkTmFtZSArICctY29udHJvbHMnXCI+XG4gICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCBbcGxhY2Vob2xkZXJdPVwiZm9ybUNvbnRyb2w/LnJlYWRhYmxlTmFtZVwiIC8+XG4gICAgICAgIDxtYXQtaGludD57eyBoaW50VGV4dCB9fTwvbWF0LWhpbnQ+XG4gICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJncm91cD8uY3VzdG9tVmFsaWRhdGVFcnJvcnMgfCBhc3luYyBhcyBlcnJvcnNcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlcnJvciBvZiBlcnJvcnNbZmllbGROYW1lXTsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAge3sgZXJyb3IgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbElucHV0V2lkZ2V0IGV4dGVuZHMgRmllbGRXaWRnZXQge31cbiJdfQ==