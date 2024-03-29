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
const widgets = [NgxMaterialDateWidget, NgxMaterialInputWidget, NgxMaterialRadioWidget, NgxMaterialTextareaWidget];
let NgxMaterialFormModule = class NgxMaterialFormModule {
};
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
        exports: [...widgets],
        declarations: [...widgets],
        entryComponents: [...widgets]
    })
], NgxMaterialFormModule);
export { NgxMaterialFormModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0ZXJpYWwtZm9ybS13aWRnZXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxpYmVydHl3YXJlL25neC1mb3JtLW1hdGVyaWFsLWRlc2lnbi13aWRnZXQvIiwic291cmNlcyI6WyJtYXRlcmlhbC1mb3JtLXdpZGdldC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDOUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzVELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQzlELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXBFLE1BQU0sT0FBTyxHQUFHLENBQUMscUJBQXFCLEVBQUUsc0JBQXNCLEVBQUUsc0JBQXNCLEVBQUUseUJBQXlCLENBQUMsQ0FBQztBQWdCbkgsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7Q0FBRyxDQUFBO0FBQXhCLHFCQUFxQjtJQWRqQyxRQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLG1CQUFtQjtZQUNuQixjQUFjO1lBQ2QsY0FBYztZQUNkLG1CQUFtQjtZQUNuQixlQUFlO1NBQ2hCO1FBQ0QsT0FBTyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDckIsWUFBWSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDMUIsZUFBZSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7S0FDOUIsQ0FBQztHQUNXLHFCQUFxQixDQUFHO1NBQXhCLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERhdGVwaWNrZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kYXRlcGlja2VyJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHsgTWF0TmF0aXZlRGF0ZU1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBNYXRSYWRpb01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcblxuaW1wb3J0IHsgTmd4TWF0ZXJpYWxEYXRlV2lkZ2V0IH0gZnJvbSAnLi9kYXRlLWZpZWxkLndpZGdldCc7XG5pbXBvcnQgeyBOZ3hNYXRlcmlhbElucHV0V2lkZ2V0IH0gZnJvbSAnLi9pbnB1dC1maWVsZC53aWRnZXQnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxSYWRpb1dpZGdldCB9IGZyb20gJy4vcmFkaW8tZmllbGQud2lkZ2V0JztcbmltcG9ydCB7IE5neE1hdGVyaWFsVGV4dGFyZWFXaWRnZXQgfSBmcm9tICcuL3RleHRhcmVhLWZpZWxkLndpZGdldCc7XG5cbmNvbnN0IHdpZGdldHMgPSBbTmd4TWF0ZXJpYWxEYXRlV2lkZ2V0LCBOZ3hNYXRlcmlhbElucHV0V2lkZ2V0LCBOZ3hNYXRlcmlhbFJhZGlvV2lkZ2V0LCBOZ3hNYXRlcmlhbFRleHRhcmVhV2lkZ2V0XTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogWy4uLndpZGdldHNdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi53aWRnZXRzXSxcbiAgZW50cnlDb21wb25lbnRzOiBbLi4ud2lkZ2V0c11cbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxGb3JtTW9kdWxlIHt9XG4iXX0=