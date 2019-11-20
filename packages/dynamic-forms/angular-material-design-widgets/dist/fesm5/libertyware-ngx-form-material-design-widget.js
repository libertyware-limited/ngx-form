import { __extends, __decorate, __spread } from 'tslib';
import { Component, NgModule } from '@angular/core';
import { FieldWidget } from '@libertyware/ngx-form-gen';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { FieldType } from '@libertyware/ngx-form-core';

var NgxMaterialDateWidget = /** @class */ (function (_super) {
    __extends(NgxMaterialDateWidget, _super);
    // tslint:disable-next-line: component-class-suffix
    function NgxMaterialDateWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgxMaterialDateWidget = __decorate([
        Component({
            // tslint:disable-next-line: component-selector
            selector: 'ngx-material-date-widget',
            template: "\n    <div class=\"example-container\" [id]=\"fieldName + '-controls'\">\n      <mat-form-field>\n        <input\n          matInput\n          [matDatepicker]=\"picker\"\n          [placeholder]=\"formControl?.readableName\"\n        />\n        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n        <mat-datepicker #picker></mat-datepicker>\n        <mat-hint>{{ hintText }}</mat-hint>\n        <mat-error *ngIf=\"group?.customValidateErrors | async as errors\">\n          <ng-container *ngFor=\"let error of errors[fieldName]; let i = index\">\n            <div>\n              {{ error }}\n            </div>\n          </ng-container>\n        </mat-error>\n      </mat-form-field>\n    </div>\n  "
        })
        // tslint:disable-next-line: component-class-suffix
    ], NgxMaterialDateWidget);
    return NgxMaterialDateWidget;
}(FieldWidget));

var NgxMaterialInputWidget = /** @class */ (function (_super) {
    __extends(NgxMaterialInputWidget, _super);
    // tslint:disable-next-line: component-class-suffix
    function NgxMaterialInputWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgxMaterialInputWidget = __decorate([
        Component({
            // tslint:disable-next-line: component-selector
            selector: 'ngx-material-input-widget',
            template: "\n    <div class=\"example-container\" [id]=\"fieldName + '-controls'\">\n      <mat-form-field>\n        <input matInput [placeholder]=\"formControl?.readableName\" />\n        <mat-hint>{{ hintText }}</mat-hint>\n        <mat-error *ngIf=\"group?.customValidateErrors | async as errors\">\n          <ng-container *ngFor=\"let error of errors[fieldName]; let i = index\">\n            <div>\n              {{ error }}\n            </div>\n          </ng-container>\n        </mat-error>\n      </mat-form-field>\n    </div>\n  "
        })
        // tslint:disable-next-line: component-class-suffix
    ], NgxMaterialInputWidget);
    return NgxMaterialInputWidget;
}(FieldWidget));

var NgxMaterialRadioWidget = /** @class */ (function (_super) {
    __extends(NgxMaterialRadioWidget, _super);
    // tslint:disable-next-line: component-class-suffix
    function NgxMaterialRadioWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgxMaterialRadioWidget = __decorate([
        Component({
            // tslint:disable-next-line: component-selector
            selector: 'ngx-material-radio-widget',
            template: "\n    <div class=\"example-container\" [id]=\"fieldName + '-controls'\">\n      <mat-form-field>\n        <mat-radio-group aria-label=\"Select an option\">\n          <mat-radio-button *ngFor=\"let radioOption of formControl.radioOptions; let i = index\" [value]=\"radioOption.value\">{{ radioOption.label }}</mat-radio-button>\n        </mat-radio-group>\n        <mat-hint>{{ hintText }}</mat-hint>\n        <mat-error *ngIf=\"group?.customValidateErrors | async as errors\">\n          <ng-container *ngFor=\"let error of errors[fieldName]; let i = index\">\n            <div>\n              {{ error }}\n            </div>\n          </ng-container>\n        </mat-error>\n      </mat-form-field>\n    </div>\n  "
        })
        // tslint:disable-next-line: component-class-suffix
    ], NgxMaterialRadioWidget);
    return NgxMaterialRadioWidget;
}(FieldWidget));

var NgxMaterialTextareaWidget = /** @class */ (function (_super) {
    __extends(NgxMaterialTextareaWidget, _super);
    // tslint:disable-next-line: component-class-suffix
    function NgxMaterialTextareaWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgxMaterialTextareaWidget = __decorate([
        Component({
            // tslint:disable-next-line: component-selector
            selector: 'ngx-material-input-widget',
            template: "\n    <div class=\"example-container\" [id]=\"fieldName + '-controls'\">\n      <mat-form-field>\n        <textarea matInput [placeholder]=\"formControl?.readableName\"></textarea>\n        <mat-hint>{{ hintText }}</mat-hint>\n        <mat-error *ngIf=\"group?.customValidateErrors | async as errors\">\n          <ng-container *ngFor=\"let error of errors[fieldName]; let i = index\">\n            <div>\n              {{ error }}\n            </div>\n          </ng-container>\n        </mat-error>\n      </mat-form-field>\n    </div>\n  "
        })
        // tslint:disable-next-line: component-class-suffix
    ], NgxMaterialTextareaWidget);
    return NgxMaterialTextareaWidget;
}(FieldWidget));

var widgets = [NgxMaterialDateWidget, NgxMaterialInputWidget, NgxMaterialRadioWidget, NgxMaterialTextareaWidget];
var NgxMaterialFormModule = /** @class */ (function () {
    function NgxMaterialFormModule() {
    }
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
            exports: __spread(widgets),
            declarations: __spread(widgets),
            entryComponents: __spread(widgets)
        })
    ], NgxMaterialFormModule);
    return NgxMaterialFormModule;
}());

var _a;
var materialDesignRenderOptions = (_a = {},
    _a[FieldType.TEXT] = NgxMaterialInputWidget,
    _a[FieldType.RADIO] = NgxMaterialRadioWidget,
    _a[FieldType.DATE] = NgxMaterialDateWidget,
    _a[FieldType.TEXTAREA] = NgxMaterialTextareaWidget,
    _a);

/**
 * Generated bundle index. Do not edit.
 */

export { NgxMaterialDateWidget, NgxMaterialFormModule, NgxMaterialInputWidget, NgxMaterialRadioWidget, NgxMaterialTextareaWidget, materialDesignRenderOptions };
//# sourceMappingURL=libertyware-ngx-form-material-design-widget.js.map
