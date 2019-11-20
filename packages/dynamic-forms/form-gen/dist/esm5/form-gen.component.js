import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
var FormGenComponent = /** @class */ (function () {
    function FormGenComponent(groupDirective) {
        this.groupDirective = groupDirective;
        this.widgets = {};
    }
    FormGenComponent.prototype.ngOnInit = function () {
        this.group = this.groupDirective.form;
    };
    FormGenComponent.prototype.renderExists = function (option) {
        var exists = this.widgets[option.fieldType] !== undefined;
        if (!exists) {
            console.log("Field: " + option.fieldName + " with render type " + option.fieldType + " has no supported render");
        }
        return exists;
    };
    FormGenComponent.prototype.onSubmit = function () {
        this.group.validateAllFormFields();
    };
    FormGenComponent.ctorParameters = function () { return [
        { type: FormGroupDirective }
    ]; };
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
    return FormGenComponent;
}());
export { FormGenComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLWdlbi8iLCJzb3VyY2VzIjpbImZvcm0tZ2VuLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUNMLGtCQUFrQixFQUNuQixNQUFNLGdCQUFnQixDQUFDO0FBVXhCO0lBS0UsMEJBQW9CLGNBQWtDO1FBQWxDLG1CQUFjLEdBQWQsY0FBYyxDQUFvQjtRQUY3QyxZQUFPLEdBQW1DLEVBQUUsQ0FBQztJQUVHLENBQUM7SUFFMUQsbUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUE2QixDQUFDO0lBQ2pFLENBQUM7SUFFRCx1Q0FBWSxHQUFaLFVBQWEsTUFBcUI7UUFDaEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssU0FBUyxDQUFDO1FBQzVELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVUsTUFBTSxDQUFDLFNBQVMsMEJBQXFCLE1BQU0sQ0FBQyxTQUFTLDZCQUEwQixDQUFDLENBQUM7U0FDeEc7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUNyQyxDQUFDOztnQkFoQm1DLGtCQUFrQjs7SUFGN0M7UUFBUixLQUFLLEVBQUU7cURBQThDO0lBSDNDLGdCQUFnQjtRQUw1QixTQUFTLENBQUM7WUFDVCwrQ0FBK0M7WUFDL0MsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxvWUFBc0M7U0FDdkMsQ0FBQztPQUNXLGdCQUFnQixDQXNCNUI7SUFBRCx1QkFBQztDQUFBLEFBdEJELElBc0JDO1NBdEJZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRm9ybUdyb3VwRGlyZWN0aXZlXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IER5bmFtaWNGb3JtR3JvdXAgfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tYnVpbGRlcic7XG5pbXBvcnQgeyBXaWRnZXRPcHRpb25zIH0gZnJvbSAnQGxpYmVydHl3YXJlL25neC1mb3JtLWNvcmUnO1xuaW1wb3J0IHsgRmllbGRXaWRnZXQgfSBmcm9tICcuL3dpZGdldHMvZmllbGQnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdsaWJlcnR5d2FyZS1mb3JtLWdlbicsXG4gIHRlbXBsYXRlVXJsOiAnZm9ybS1nZW4uY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1HZW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBncm91cCE6IER5bmFtaWNGb3JtR3JvdXA8YW55PjtcblxuICBASW5wdXQoKSB3aWRnZXRzOiB7IFtrZXk6IHN0cmluZ106IEZpZWxkV2lkZ2V0IH0gPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyb3VwRGlyZWN0aXZlOiBGb3JtR3JvdXBEaXJlY3RpdmUpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ncm91cCA9IHRoaXMuZ3JvdXBEaXJlY3RpdmUuZm9ybSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT47XG4gIH1cblxuICByZW5kZXJFeGlzdHMob3B0aW9uOiBXaWRnZXRPcHRpb25zKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZXhpc3RzID0gdGhpcy53aWRnZXRzW29wdGlvbi5maWVsZFR5cGVdICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKCFleGlzdHMpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBGaWVsZDogJHtvcHRpb24uZmllbGROYW1lfSB3aXRoIHJlbmRlciB0eXBlICR7b3B0aW9uLmZpZWxkVHlwZX0gaGFzIG5vIHN1cHBvcnRlZCByZW5kZXJgKTtcbiAgICB9XG4gICAgcmV0dXJuIGV4aXN0cztcbiAgfVxuXG4gIG9uU3VibWl0KCkge1xuICAgIHRoaXMuZ3JvdXAudmFsaWRhdGVBbGxGb3JtRmllbGRzKCk7XG4gIH1cbn1cbiJdfQ==