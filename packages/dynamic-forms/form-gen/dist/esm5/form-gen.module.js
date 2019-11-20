import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGenComponent } from './form-gen.component';
import { RootWidget } from './renderer/root-widget.component';
var FormGenModule = /** @class */ (function () {
    function FormGenModule() {
    }
    FormGenModule = tslib_1.__decorate([
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
export { FormGenModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLWdlbi8iLCJzb3VyY2VzIjpbImZvcm0tZ2VuLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQVk5RDtJQUFBO0lBQTRCLENBQUM7SUFBaEIsYUFBYTtRQVZ6QixRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTtnQkFDWixtQkFBbUI7Z0JBQ25CLFdBQVc7YUFDWjtZQUNELE9BQU8sRUFBRSxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQztZQUN2QyxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUM7WUFDNUMsU0FBUyxFQUFFLEVBQUU7U0FDZCxDQUFDO09BQ1csYUFBYSxDQUFHO0lBQUQsb0JBQUM7Q0FBQSxBQUE3QixJQUE2QjtTQUFoQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgRm9ybUdlbkNvbXBvbmVudCB9IGZyb20gJy4vZm9ybS1nZW4uY29tcG9uZW50JztcbmltcG9ydCB7IFJvb3RXaWRnZXQgfSBmcm9tICcuL3JlbmRlcmVyL3Jvb3Qtd2lkZ2V0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbRm9ybUdlbkNvbXBvbmVudCwgUm9vdFdpZGdldF0sXG4gIGRlY2xhcmF0aW9uczogW0Zvcm1HZW5Db21wb25lbnQsIFJvb3RXaWRnZXRdLFxuICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1HZW5Nb2R1bGUge31cbiJdfQ==