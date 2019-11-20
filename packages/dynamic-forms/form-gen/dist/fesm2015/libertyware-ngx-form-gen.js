import { __decorate, __param } from 'tslib';
import { Input, Component, Optional, SkipSelf, Host, ComponentFactoryResolver, ViewChild, ViewContainerRef, NgModule } from '@angular/core';
import { FormGroupDirective, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

let FieldWidget = class FieldWidget {
    constructor(groupDirective) {
        this.groupDirective = groupDirective;
    }
    ngOnInit() {
        this.group = this.groupDirective.form;
    }
    get hintText() {
        return this.formControl.hint;
    }
    get formControl() {
        return this.group.get(this.fieldName);
    }
};
__decorate([
    Input()
], FieldWidget.prototype, "fieldName", void 0);
FieldWidget = __decorate([
    __param(0, Optional()), __param(0, SkipSelf()), __param(0, Host())
], FieldWidget);

let RootWidget = 
// tslint:disable-next-line: component-class-suffix
class RootWidget {
    constructor(resolver) {
        this.resolver = resolver;
    }
    ngOnInit() {
        this.container.clear();
        const cmp = this.getRenderOption(this.fieldOptions.fieldType);
        if (cmp) {
            const factory = this.resolver.resolveComponentFactory(cmp);
            const componentRef = this.container.createComponent(factory);
            componentRef.instance.fieldName = this.fieldOptions.fieldName;
        }
        else {
            throw new Error('No render support');
        }
    }
    getRenderOption(typeName) {
        return this.renderOptions[typeName];
    }
};
RootWidget.ctorParameters = () => [
    { type: ComponentFactoryResolver }
];
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
        template: `
    <ng-container #container></ng-container>
  `
    })
    // tslint:disable-next-line: component-class-suffix
], RootWidget);

let FormGenModule = class FormGenModule {
};
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

/**
 * Generated bundle index. Do not edit.
 */

export { FieldWidget, FormGenComponent, FormGenModule, RootWidget as ɵa };
//# sourceMappingURL=libertyware-ngx-form-gen.js.map
