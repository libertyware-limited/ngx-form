import * as tslib_1 from "tslib";
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Input, ComponentFactory, ComponentRef } from '@angular/core';
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
    tslib_1.__decorate([
        ViewChild('container', { read: ViewContainerRef, static: true })
    ], RootWidget.prototype, "container", void 0);
    tslib_1.__decorate([
        Input()
    ], RootWidget.prototype, "fieldOptions", void 0);
    tslib_1.__decorate([
        Input()
    ], RootWidget.prototype, "renderOptions", void 0);
    RootWidget = tslib_1.__decorate([
        Component({
            // tslint:disable-next-line: component-selector
            selector: 'libertyware-root-widget',
            template: "\n    <ng-container #container></ng-container>\n  "
        })
        // tslint:disable-next-line: component-class-suffix
    ], RootWidget);
    return RootWidget;
}());
export { RootWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLWdlbi8iLCJzb3VyY2VzIjpbInJlbmRlcmVyL3Jvb3Qtd2lkZ2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQix3QkFBd0IsRUFDeEIsS0FBSyxFQUNMLGdCQUFnQixFQUNoQixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFZdkI7SUFPRSxvQkFBb0IsUUFBa0M7UUFBbEMsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7SUFBRyxDQUFDO0lBRTFELDZCQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5RCxJQUFJLEdBQUcsRUFBRTtZQUNQLElBQU0sT0FBTyxHQUEwQixJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xGLElBQU0sWUFBWSxHQUFzQixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRixZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztTQUMvRDthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQUVPLG9DQUFlLEdBQXZCLFVBQXdCLFFBQWdCO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDOztnQkFoQjZCLHdCQUF3Qjs7SUFMdEQ7UUFEQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztpREFDcEM7SUFFcEI7UUFBUixLQUFLLEVBQUU7b0RBQThCO0lBQzdCO1FBQVIsS0FBSyxFQUFFO3FEQUErQjtJQUw1QixVQUFVO1FBUnRCLFNBQVMsQ0FBQztZQUNULCtDQUErQztZQUMvQyxRQUFRLEVBQUUseUJBQXlCO1lBQ25DLFFBQVEsRUFBRSxvREFFVDtTQUNGLENBQUM7UUFDRixtREFBbUQ7T0FDdEMsVUFBVSxDQXdCdEI7SUFBRCxpQkFBQztDQUFBLEFBeEJELElBd0JDO1NBeEJZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gIElucHV0LFxuICBDb21wb25lbnRGYWN0b3J5LFxuICBDb21wb25lbnRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXaWRnZXRPcHRpb25zIH0gZnJvbSAnQGxpYmVydHl3YXJlL25neC1mb3JtLWNvcmUnO1xuaW1wb3J0IHsgUmVuZGVyT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9yZW5kZXItb3B0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2xpYmVydHl3YXJlLXJvb3Qtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICNjb250YWluZXI+PC9uZy1jb250YWluZXI+XG4gIGBcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBSb290V2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgY29udGFpbmVyITogVmlld0NvbnRhaW5lclJlZjtcblxuICBASW5wdXQoKSBmaWVsZE9wdGlvbnMhOiBXaWRnZXRPcHRpb25zO1xuICBASW5wdXQoKSByZW5kZXJPcHRpb25zITogUmVuZGVyT3B0aW9ucztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb250YWluZXIuY2xlYXIoKTtcbiAgICBjb25zdCBjbXAgPSB0aGlzLmdldFJlbmRlck9wdGlvbih0aGlzLmZpZWxkT3B0aW9ucy5maWVsZFR5cGUpO1xuICAgIGlmIChjbXApIHtcbiAgICAgIGNvbnN0IGZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8YW55PiA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY21wKTtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4gPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuZmllbGROYW1lID0gdGhpcy5maWVsZE9wdGlvbnMuZmllbGROYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHJlbmRlciBzdXBwb3J0Jyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZW5kZXJPcHRpb24odHlwZU5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyT3B0aW9uc1t0eXBlTmFtZV07XG4gIH1cbn1cbiJdfQ==