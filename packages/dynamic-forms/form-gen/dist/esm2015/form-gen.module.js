import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGenComponent } from './form-gen.component';
import { RootWidget } from './renderer/root-widget.component';
let FormGenModule = class FormGenModule {
};
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
export { FormGenModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLWdlbi8iLCJzb3VyY2VzIjpbImZvcm0tZ2VuLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWxFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQVk5RCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0NBQUcsQ0FBQTtBQUFoQixhQUFhO0lBVnpCLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLFlBQVk7WUFDWixtQkFBbUI7WUFDbkIsV0FBVztTQUNaO1FBQ0QsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDO1FBQ3ZDLFlBQVksRUFBRSxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQztRQUM1QyxTQUFTLEVBQUUsRUFBRTtLQUNkLENBQUM7R0FDVyxhQUFhLENBQUc7U0FBaEIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEZvcm1HZW5Db21wb25lbnQgfSBmcm9tICcuL2Zvcm0tZ2VuLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSb290V2lkZ2V0IH0gZnJvbSAnLi9yZW5kZXJlci9yb290LXdpZGdldC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW0Zvcm1HZW5Db21wb25lbnQsIFJvb3RXaWRnZXRdLFxuICBkZWNsYXJhdGlvbnM6IFtGb3JtR2VuQ29tcG9uZW50LCBSb290V2lkZ2V0XSxcbiAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtR2VuTW9kdWxlIHt9XG4iXX0=