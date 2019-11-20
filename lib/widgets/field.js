var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Input, Optional, SkipSelf, Host } from '@angular/core';
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
export { FieldWidget };
