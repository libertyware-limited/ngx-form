import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
let FormGenComponent = class FormGenComponent {
    constructor(groupDirective) {
        this.groupDirective = groupDirective;
        this.widgets = {};
    }
    ngOnInit() {
        this.group = this.groupDirective.form;
    }
    renderExists(option) {
        const exists = this.widgets[option.fieldType] !== undefined;
        if (!exists) {
            console.log(`Field: ${option.fieldName} with render type ${option.fieldType} has no supported render`);
        }
        return exists;
    }
    onSubmit() {
        this.group.validateAllFormFields();
    }
};
FormGenComponent.ctorParameters = () => [
    { type: FormGroupDirective }
];
tslib_1.__decorate([
    Input()
], FormGenComponent.prototype, "widgets", void 0);
FormGenComponent = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line: component-selector
        selector: 'libertyware-form-gen',
        template: "<form [formGroup]=\"group\" #form=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\n  <ng-container *ngFor=\"let option of group.getFormGenData()\">\n    <libertyware-root-widget *ngIf=\"renderExists(option)\" [renderOptions]=\"widgets\" [fieldOptions]=\"option\"></libertyware-root-widget>\n  </ng-container>\n\n  <button class=\"submit-button\">\n    Continue\n  </button>\n</form>\n"
    })
], FormGenComponent);
export { FormGenComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLWdlbi8iLCJzb3VyY2VzIjpbImZvcm0tZ2VuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUNMLGtCQUFrQixFQUNuQixNQUFNLGdCQUFnQixDQUFDO0FBVXhCLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBSzNCLFlBQW9CLGNBQWtDO1FBQWxDLG1CQUFjLEdBQWQsY0FBYyxDQUFvQjtRQUY3QyxZQUFPLEdBQW1DLEVBQUUsQ0FBQztJQUVHLENBQUM7SUFFMUQsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUE2QixDQUFDO0lBQ2pFLENBQUM7SUFFRCxZQUFZLENBQUMsTUFBcUI7UUFDaEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssU0FBUyxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsTUFBTSxDQUFDLFNBQVMscUJBQXFCLE1BQU0sQ0FBQyxTQUFTLDBCQUEwQixDQUFDLENBQUM7U0FDeEc7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0NBQ0YsQ0FBQTs7WUFqQnFDLGtCQUFrQjs7QUFGN0M7SUFBUixLQUFLLEVBQUU7aURBQThDO0FBSDNDLGdCQUFnQjtJQUw1QixTQUFTLENBQUM7UUFDVCwrQ0FBK0M7UUFDL0MsUUFBUSxFQUFFLHNCQUFzQjtRQUNoQyxvWUFBc0M7S0FDdkMsQ0FBQztHQUNXLGdCQUFnQixDQXNCNUI7U0F0QlksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBGb3JtR3JvdXBEaXJlY3RpdmVcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm1Hcm91cCB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1idWlsZGVyJztcbmltcG9ydCB7IFdpZGdldE9wdGlvbnMgfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tY29yZSc7XG5pbXBvcnQgeyBGaWVsZFdpZGdldCB9IGZyb20gJy4vd2lkZ2V0cy9maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2xpYmVydHl3YXJlLWZvcm0tZ2VuJyxcbiAgdGVtcGxhdGVVcmw6ICdmb3JtLWdlbi5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUdlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGdyb3VwITogRHluYW1pY0Zvcm1Hcm91cDxhbnk+O1xuXG4gIEBJbnB1dCgpIHdpZGdldHM6IHsgW2tleTogc3RyaW5nXTogRmllbGRXaWRnZXQgfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvdXBEaXJlY3RpdmU6IEZvcm1Hcm91cERpcmVjdGl2ZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdyb3VwID0gdGhpcy5ncm91cERpcmVjdGl2ZS5mb3JtIGFzIER5bmFtaWNGb3JtR3JvdXA8YW55PjtcbiAgfVxuXG4gIHJlbmRlckV4aXN0cyhvcHRpb246IFdpZGdldE9wdGlvbnMpOiBib29sZWFuIHtcbiAgICBjb25zdCBleGlzdHMgPSB0aGlzLndpZGdldHNbb3B0aW9uLmZpZWxkVHlwZV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4aXN0cykge1xuICAgICAgY29uc29sZS5sb2coYEZpZWxkOiAke29wdGlvbi5maWVsZE5hbWV9IHdpdGggcmVuZGVyIHR5cGUgJHtvcHRpb24uZmllbGRUeXBlfSBoYXMgbm8gc3VwcG9ydGVkIHJlbmRlcmApO1xuICAgIH1cbiAgICByZXR1cm4gZXhpc3RzO1xuICB9XG5cbiAgb25TdWJtaXQoKSB7XG4gICAgdGhpcy5ncm91cC52YWxpZGF0ZUFsbEZvcm1GaWVsZHMoKTtcbiAgfVxufVxuIl19