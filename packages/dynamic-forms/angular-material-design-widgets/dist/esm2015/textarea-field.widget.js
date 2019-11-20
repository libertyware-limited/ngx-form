import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FieldWidget } from '@libertyware/ngx-form-gen';
let NgxMaterialTextareaWidget = 
// tslint:disable-next-line: component-class-suffix
class NgxMaterialTextareaWidget extends FieldWidget {
};
NgxMaterialTextareaWidget = tslib_1.__decorate([
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
export { NgxMaterialTextareaWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEtZmllbGQud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLW1hdGVyaWFsLWRlc2lnbi13aWRnZXQvIiwic291cmNlcyI6WyJ0ZXh0YXJlYS1maWVsZC53aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBc0J4RCxJQUFhLHlCQUF5QjtBQUR0QyxtREFBbUQ7QUFDbkQsTUFBYSx5QkFBMEIsU0FBUSxXQUFXO0NBQUcsQ0FBQTtBQUFoRCx5QkFBeUI7SUFwQnJDLFNBQVMsQ0FBQztRQUNULCtDQUErQztRQUMvQyxRQUFRLEVBQUUsMkJBQTJCO1FBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7R0FjVDtLQUNGLENBQUM7SUFDRixtREFBbUQ7R0FDdEMseUJBQXlCLENBQXVCO1NBQWhELHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRXaWRnZXQgfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tZ2VuJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLWlucHV0LXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtY29udGFpbmVyXCIgW2lkXT1cImZpZWxkTmFtZSArICctY29udHJvbHMnXCI+XG4gICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgIDx0ZXh0YXJlYSBtYXRJbnB1dCBbcGxhY2Vob2xkZXJdPVwiZm9ybUNvbnRyb2w/LnJlYWRhYmxlTmFtZVwiPjwvdGV4dGFyZWE+XG4gICAgICAgIDxtYXQtaGludD57eyBoaW50VGV4dCB9fTwvbWF0LWhpbnQ+XG4gICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJncm91cD8uY3VzdG9tVmFsaWRhdGVFcnJvcnMgfCBhc3luYyBhcyBlcnJvcnNcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlcnJvciBvZiBlcnJvcnNbZmllbGROYW1lXTsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAge3sgZXJyb3IgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRleHRhcmVhV2lkZ2V0IGV4dGVuZHMgRmllbGRXaWRnZXQge31cbiJdfQ==