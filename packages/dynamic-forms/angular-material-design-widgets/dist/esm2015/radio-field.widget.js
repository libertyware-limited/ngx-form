import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FieldWidget } from '@libertyware/ngx-form-gen';
let NgxMaterialRadioWidget = 
// tslint:disable-next-line: component-class-suffix
class NgxMaterialRadioWidget extends FieldWidget {
};
NgxMaterialRadioWidget = tslib_1.__decorate([
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
export { NgxMaterialRadioWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tZmllbGQud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLW1hdGVyaWFsLWRlc2lnbi13aWRnZXQvIiwic291cmNlcyI6WyJyYWRpby1maWVsZC53aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBd0J4RCxJQUFhLHNCQUFzQjtBQURuQyxtREFBbUQ7QUFDbkQsTUFBYSxzQkFBdUIsU0FBUSxXQUFXO0NBQUcsQ0FBQTtBQUE3QyxzQkFBc0I7SUF0QmxDLFNBQVMsQ0FBQztRQUNULCtDQUErQztRQUMvQyxRQUFRLEVBQUUsMkJBQTJCO1FBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCVDtLQUNGLENBQUM7SUFDRixtREFBbUQ7R0FDdEMsc0JBQXNCLENBQXVCO1NBQTdDLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRXaWRnZXQgfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tZ2VuJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXJhZGlvLXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImV4YW1wbGUtY29udGFpbmVyXCIgW2lkXT1cImZpZWxkTmFtZSArICctY29udHJvbHMnXCI+XG4gICAgICA8bWF0LWZvcm0tZmllbGQ+XG4gICAgICAgIDxtYXQtcmFkaW8tZ3JvdXAgYXJpYS1sYWJlbD1cIlNlbGVjdCBhbiBvcHRpb25cIj5cbiAgICAgICAgICA8bWF0LXJhZGlvLWJ1dHRvbiAqbmdGb3I9XCJsZXQgcmFkaW9PcHRpb24gb2YgZm9ybUNvbnRyb2wucmFkaW9PcHRpb25zOyBsZXQgaSA9IGluZGV4XCIgW3ZhbHVlXT1cInJhZGlvT3B0aW9uLnZhbHVlXCI+e3sgcmFkaW9PcHRpb24ubGFiZWwgfX08L21hdC1yYWRpby1idXR0b24+XG4gICAgICAgIDwvbWF0LXJhZGlvLWdyb3VwPlxuICAgICAgICA8bWF0LWhpbnQ+e3sgaGludFRleHQgfX08L21hdC1oaW50PlxuICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZ3JvdXA/LmN1c3RvbVZhbGlkYXRlRXJyb3JzIHwgYXN5bmMgYXMgZXJyb3JzXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZXJyb3Igb2YgZXJyb3JzW2ZpZWxkTmFtZV07IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIHt7IGVycm9yIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIDwvZGl2PlxuICBgXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxSYWRpb1dpZGdldCBleHRlbmRzIEZpZWxkV2lkZ2V0IHt9XG4iXX0=