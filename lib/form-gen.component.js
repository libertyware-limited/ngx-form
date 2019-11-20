var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Input } from '@angular/core';
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
__decorate([
    Input()
], FormGenComponent.prototype, "widgets", void 0);
FormGenComponent = __decorate([
    Component({
        // tslint:disable-next-line: component-selector
        selector: 'libertyware-form-gen',
        templateUrl: 'form-gen.component.html'
    })
], FormGenComponent);
export { FormGenComponent };
