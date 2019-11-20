import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FieldWidget } from '@libertyware/ngx-form-gen';
var NgxMaterialRadioWidget = /** @class */ (function (_super) {
    tslib_1.__extends(NgxMaterialRadioWidget, _super);
    // tslint:disable-next-line: component-class-suffix
    function NgxMaterialRadioWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgxMaterialRadioWidget = tslib_1.__decorate([
        Component({
            // tslint:disable-next-line: component-selector
            selector: 'ngx-material-radio-widget',
            template: "\n    <div class=\"example-container\" [id]=\"fieldName + '-controls'\">\n      <mat-form-field>\n        <mat-radio-group aria-label=\"Select an option\">\n          <mat-radio-button *ngFor=\"let radioOption of formControl.radioOptions; let i = index\" [value]=\"radioOption.value\">{{ radioOption.label }}</mat-radio-button>\n        </mat-radio-group>\n        <mat-hint>{{ hintText }}</mat-hint>\n        <mat-error *ngIf=\"group?.customValidateErrors | async as errors\">\n          <ng-container *ngFor=\"let error of errors[fieldName]; let i = index\">\n            <div>\n              {{ error }}\n            </div>\n          </ng-container>\n        </mat-error>\n      </mat-form-field>\n    </div>\n  "
        })
        // tslint:disable-next-line: component-class-suffix
    ], NgxMaterialRadioWidget);
    return NgxMaterialRadioWidget;
}(FieldWidget));
export { NgxMaterialRadioWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tZmllbGQud2lkZ2V0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLW1hdGVyaWFsLWRlc2lnbi13aWRnZXQvIiwic291cmNlcyI6WyJyYWRpby1maWVsZC53aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBd0J4RDtJQUE0QyxrREFBVztJQUR2RCxtREFBbUQ7SUFDbkQ7O0lBQXlELENBQUM7SUFBN0Msc0JBQXNCO1FBdEJsQyxTQUFTLENBQUM7WUFDVCwrQ0FBK0M7WUFDL0MsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxRQUFRLEVBQUUsOHNCQWdCVDtTQUNGLENBQUM7UUFDRixtREFBbUQ7T0FDdEMsc0JBQXNCLENBQXVCO0lBQUQsNkJBQUM7Q0FBQSxBQUExRCxDQUE0QyxXQUFXLEdBQUc7U0FBN0Msc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFdpZGdldCB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1nZW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtcmFkaW8td2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1jb250YWluZXJcIiBbaWRdPVwiZmllbGROYW1lICsgJy1jb250cm9scydcIj5cbiAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPG1hdC1yYWRpby1ncm91cCBhcmlhLWxhYmVsPVwiU2VsZWN0IGFuIG9wdGlvblwiPlxuICAgICAgICAgIDxtYXQtcmFkaW8tYnV0dG9uICpuZ0Zvcj1cImxldCByYWRpb09wdGlvbiBvZiBmb3JtQ29udHJvbC5yYWRpb09wdGlvbnM7IGxldCBpID0gaW5kZXhcIiBbdmFsdWVdPVwicmFkaW9PcHRpb24udmFsdWVcIj57eyByYWRpb09wdGlvbi5sYWJlbCB9fTwvbWF0LXJhZGlvLWJ1dHRvbj5cbiAgICAgICAgPC9tYXQtcmFkaW8tZ3JvdXA+XG4gICAgICAgIDxtYXQtaGludD57eyBoaW50VGV4dCB9fTwvbWF0LWhpbnQ+XG4gICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJncm91cD8uY3VzdG9tVmFsaWRhdGVFcnJvcnMgfCBhc3luYyBhcyBlcnJvcnNcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlcnJvciBvZiBlcnJvcnNbZmllbGROYW1lXTsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAge3sgZXJyb3IgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFJhZGlvV2lkZ2V0IGV4dGVuZHMgRmllbGRXaWRnZXQge31cbiJdfQ==