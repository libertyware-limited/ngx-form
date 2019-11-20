var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, ViewChild, ViewContainerRef, Input } from '@angular/core';
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
export { RootWidget };
