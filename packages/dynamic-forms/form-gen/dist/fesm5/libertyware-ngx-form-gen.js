import { __decorate, __param } from 'tslib';
import { Input, Component, Optional, SkipSelf, Host, ComponentFactoryResolver, ViewChild, ViewContainerRef, NgModule } from '@angular/core';
import { FormGroupDirective, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    __decorate([
        Input()
    ], FormGenComponent.prototype, "widgets", void 0);
    FormGenComponent = __decorate([
        Component({
            // tslint:disable-next-line: component-selector
            selector: 'libertyware-form-gen',
            template: "<form [formGroup]=\"group\" #form=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\n  <ng-container *ngFor=\"let option of group.getFormGenData()\">\n    <libertyware-root-widget *ngIf=\"renderExists(option)\" [renderOptions]=\"widgets\" [fieldOptions]=\"option\"></libertyware-root-widget>\n  </ng-container>\n\n  <button class=\"submit-button\">\n    Continue\n  </button>\n</form>\n"
        })
    ], FormGenComponent);
    return FormGenComponent;
}());

var FieldWidget = /** @class */ (function () {
    function FieldWidget(groupDirective) {
        this.groupDirective = groupDirective;
    }
    FieldWidget.prototype.ngOnInit = function () {
        this.group = this.groupDirective.form;
    };
    Object.defineProperty(FieldWidget.prototype, "hintText", {
        get: function () {
            return this.formControl.hint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldWidget.prototype, "formControl", {
        get: function () {
            return this.group.get(this.fieldName);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input()
    ], FieldWidget.prototype, "fieldName", void 0);
    FieldWidget = __decorate([
        __param(0, Optional()), __param(0, SkipSelf()), __param(0, Host())
    ], FieldWidget);
    return FieldWidget;
}());

var RootWidget = /** @class */ (function () {
    function RootWidget(resolver) {
        this.resolver = resolver;
    }
    RootWidget.prototype.ngOnInit = function () {
        this.container.clear();
        var cmp = this.getRenderOption(this.fieldOptions.fieldType);
        if (cmp) {
            var factory = this.resolver.resolveComponentFactory(cmp);
            var componentRef = this.container.createComponent(factory);
            componentRef.instance.fieldName = this.fieldOptions.fieldName;
        }
        else {
            throw new Error('No render support');
        }
    };
    RootWidget.prototype.getRenderOption = function (typeName) {
        return this.renderOptions[typeName];
    };
    RootWidget.ctorParameters = function () { return [
        { type: ComponentFactoryResolver }
    ]; };
    __decorate([
        ViewChild('container', { read: ViewContainerRef, static: true })
    ], RootWidget.prototype, "container", void 0);
    __decorate([
        Input()
    ], RootWidget.prototype, "fieldOptions", void 0);
    __decorate([
        Input()
    ], RootWidget.prototype, "renderOptions", void 0);
    RootWidget = __decorate([
        Component({
            // tslint:disable-next-line: component-selector
            selector: 'libertyware-root-widget',
            template: "\n    <ng-container #container></ng-container>\n  "
        })
        // tslint:disable-next-line: component-class-suffix
    ], RootWidget);
    return RootWidget;
}());

var FormGenModule = /** @class */ (function () {
    function FormGenModule() {
    }
    FormGenModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ReactiveFormsModule,
                FormsModule
            ],
            exports: [FormGenComponent, RootWidget],
            declarations: [FormGenComponent, RootWidget],
            providers: []
        })
    ], FormGenModule);
    return FormGenModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { FieldWidget, FormGenComponent, FormGenModule, RootWidget as ɵa };
//# sourceMappingURL=libertyware-ngx-form-gen.js.map
