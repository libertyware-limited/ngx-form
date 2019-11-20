import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FieldWidget } from '@libertyware/ngx-form-gen';
var NgxMaterialTextareaWidget = /** @class */ (function (_super) {
    tslib_1.__extends(NgxMaterialTextareaWidget, _super);
    // tslint:disable-next-line: component-class-suffix
    function NgxMaterialTextareaWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgxMaterialTextareaWidget = tslib_1.__decorate([
        Component({
            // tslint:disable-next-line: component-selector
            selector: 'ngx-material-input-widget',
            template: "\n    <div class=\"example-container\" [id]=\"fieldName + '-controls'\">\n      <mat-form-field>\n        <textarea matInput [placeholder]=\"formControl?.readableName\"></textarea>\n        <mat-hint>{{ hintText }}</mat-hint>\n        <mat-error *ngIf=\"group?.customValidateErrors | async as errors\">\n          <ng-container *ngFor=\"let error of errors[fieldName]; let i = index\">\n            <div>\n              {{ error }}\n            </div>\n          </ng-container>\n        </mat-error>\n      </mat-form-field>\n    </div>\n  "
        })
        // tslint:disable-next-line: component-class-suffix
    ], NgxMaterialTextareaWidget);
    return NgxMaterialTextareaWidget;
}(FieldWidget));
export { NgxMaterialTextareaWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEtZmllbGQud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLW1hdGVyaWFsLWRlc2lnbi13aWRnZXQvIiwic291cmNlcyI6WyJ0ZXh0YXJlYS1maWVsZC53aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBc0J4RDtJQUErQyxxREFBVztJQUQxRCxtREFBbUQ7SUFDbkQ7O0lBQTRELENBQUM7SUFBaEQseUJBQXlCO1FBcEJyQyxTQUFTLENBQUM7WUFDVCwrQ0FBK0M7WUFDL0MsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxRQUFRLEVBQUUsK2hCQWNUO1NBQ0YsQ0FBQztRQUNGLG1EQUFtRDtPQUN0Qyx5QkFBeUIsQ0FBdUI7SUFBRCxnQ0FBQztDQUFBLEFBQTdELENBQStDLFdBQVcsR0FBRztTQUFoRCx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkV2lkZ2V0IH0gZnJvbSAnQGxpYmVydHl3YXJlL25neC1mb3JtLWdlbic7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC1pbnB1dC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLWNvbnRhaW5lclwiIFtpZF09XCJmaWVsZE5hbWUgKyAnLWNvbnRyb2xzJ1wiPlxuICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8dGV4dGFyZWEgbWF0SW5wdXQgW3BsYWNlaG9sZGVyXT1cImZvcm1Db250cm9sPy5yZWFkYWJsZU5hbWVcIj48L3RleHRhcmVhPlxuICAgICAgICA8bWF0LWhpbnQ+e3sgaGludFRleHQgfX08L21hdC1oaW50PlxuICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZ3JvdXA/LmN1c3RvbVZhbGlkYXRlRXJyb3JzIHwgYXN5bmMgYXMgZXJyb3JzXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZXJyb3Igb2YgZXJyb3JzW2ZpZWxkTmFtZV07IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIHt7IGVycm9yIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIDwvZGl2PlxuICBgXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUZXh0YXJlYVdpZGdldCBleHRlbmRzIEZpZWxkV2lkZ2V0IHt9XG4iXX0=