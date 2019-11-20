import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMaterialDateWidget } from './date-field.widget';
import { NgxMaterialInputWidget } from './input-field.widget';
import { NgxMaterialRadioWidget } from './radio-field.widget';
import { NgxMaterialTextareaWidget } from './textarea-field.widget';
var widgets = [NgxMaterialDateWidget, NgxMaterialInputWidget, NgxMaterialRadioWidget, NgxMaterialTextareaWidget];
var NgxMaterialFormModule = /** @class */ (function () {
    function NgxMaterialFormModule() {
    }
    NgxMaterialFormModule = tslib_1.__decorate([
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
            exports: tslib_1.__spread(widgets),
            declarations: tslib_1.__spread(widgets),
            entryComponents: tslib_1.__spread(widgets)
        })
    ], NgxMaterialFormModule);
    return NgxMaterialFormModule;
}());
export { NgxMaterialFormModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZm9ybS13aWRnZXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLW1hdGVyaWFsLWRlc2lnbi13aWRnZXQvIiwic291cmNlcyI6WyJtYXRlcmlhbC1mb3JtLXdpZGdldC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzVELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXBFLElBQU0sT0FBTyxHQUFHLENBQUMscUJBQXFCLEVBQUUsc0JBQXNCLEVBQUUsc0JBQXNCLEVBQUUseUJBQXlCLENBQUMsQ0FBQztBQWdCbkg7SUFBQTtJQUFvQyxDQUFDO0lBQXhCLHFCQUFxQjtRQWRqQyxRQUFRLENBQUM7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsWUFBWTtnQkFDWixtQkFBbUI7Z0JBQ25CLG1CQUFtQjtnQkFDbkIsY0FBYztnQkFDZCxjQUFjO2dCQUNkLG1CQUFtQjtnQkFDbkIsZUFBZTthQUNoQjtZQUNELE9BQU8sbUJBQU0sT0FBTyxDQUFDO1lBQ3JCLFlBQVksbUJBQU0sT0FBTyxDQUFDO1lBQzFCLGVBQWUsbUJBQU0sT0FBTyxDQUFDO1NBQzlCLENBQUM7T0FDVyxxQkFBcUIsQ0FBRztJQUFELDRCQUFDO0NBQUEsQUFBckMsSUFBcUM7U0FBeEIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RhdGVwaWNrZXInO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5pbXBvcnQgeyBNYXROYXRpdmVEYXRlTW9kdWxlLCBNYXRSaXBwbGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IE1hdFJhZGlvTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcmFkaW8nO1xuXG5pbXBvcnQgeyBOZ3hNYXRlcmlhbERhdGVXaWRnZXQgfSBmcm9tICcuL2RhdGUtZmllbGQud2lkZ2V0JztcbmltcG9ydCB7IE5neE1hdGVyaWFsSW5wdXRXaWRnZXQgfSBmcm9tICcuL2lucHV0LWZpZWxkLndpZGdldCc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFJhZGlvV2lkZ2V0IH0gZnJvbSAnLi9yYWRpby1maWVsZC53aWRnZXQnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUZXh0YXJlYVdpZGdldCB9IGZyb20gJy4vdGV4dGFyZWEtZmllbGQud2lkZ2V0JztcblxuY29uc3Qgd2lkZ2V0cyA9IFtOZ3hNYXRlcmlhbERhdGVXaWRnZXQsIE5neE1hdGVyaWFsSW5wdXRXaWRnZXQsIE5neE1hdGVyaWFsUmFkaW9XaWRnZXQsIE5neE1hdGVyaWFsVGV4dGFyZWFXaWRnZXRdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRSYWRpb01vZHVsZSxcbiAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgIE1hdFJpcHBsZU1vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbLi4ud2lkZ2V0c10sXG4gIGRlY2xhcmF0aW9uczogWy4uLndpZGdldHNdLFxuICBlbnRyeUNvbXBvbmVudHM6IFsuLi53aWRnZXRzXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbEZvcm1Nb2R1bGUge31cbiJdfQ==