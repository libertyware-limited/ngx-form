"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NgxMaterialFormModule = void 0;

var _core = require("@angular/core");

var _common = require("@angular/common");

var _forms = require("@angular/forms");

var _datepicker = require("@angular/material/datepicker");

var _input = require("@angular/material/input");

var _core2 = require("@angular/material/core");

var _radio = require("@angular/material/radio");

var _dateField = require("./date-field.widget");

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var widgets = [_dateField.NgxMaterialDateWidget];
var NgxMaterialFormModule = (_dec = (0, _core.NgModule)({
  imports: [_common.CommonModule, _forms.ReactiveFormsModule, _datepicker.MatDatepickerModule, _input.MatInputModule, _radio.MatRadioModule, _core2.MatNativeDateModule, _core2.MatRippleModule],
  exports: [].concat(widgets),
  declarations: [].concat(widgets),
  entryComponents: [].concat(widgets)
}), _dec(_class = function NgxMaterialFormModule() {
  _classCallCheck(this, NgxMaterialFormModule);
}) || _class);
exports.NgxMaterialFormModule = NgxMaterialFormModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXRlcmlhbC1mb3JtLXdpZGdldC5tb2R1bGUudHMiXSwibmFtZXMiOlsid2lkZ2V0cyIsIk5neE1hdGVyaWFsRGF0ZVdpZGdldCIsIk5neE1hdGVyaWFsRm9ybU1vZHVsZSIsImltcG9ydHMiLCJDb21tb25Nb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiTWF0RGF0ZXBpY2tlck1vZHVsZSIsIk1hdElucHV0TW9kdWxlIiwiTWF0UmFkaW9Nb2R1bGUiLCJNYXROYXRpdmVEYXRlTW9kdWxlIiwiTWF0UmlwcGxlTW9kdWxlIiwiZXhwb3J0cyIsImRlY2xhcmF0aW9ucyIsImVudHJ5Q29tcG9uZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxHQUFHLENBQUNDLGdDQUFELENBQWhCO0lBZ0JhQyxxQixXQWRaLG9CQUFTO0FBQ1JDLEVBQUFBLE9BQU8sRUFBRSxDQUNQQyxvQkFETyxFQUVQQywwQkFGTyxFQUdQQywrQkFITyxFQUlQQyxxQkFKTyxFQUtQQyxxQkFMTyxFQU1QQywwQkFOTyxFQU9QQyxzQkFQTyxDQUREO0FBVVJDLEVBQUFBLE9BQU8sWUFBTVgsT0FBTixDQVZDO0FBV1JZLEVBQUFBLFlBQVksWUFBTVosT0FBTixDQVhKO0FBWVJhLEVBQUFBLGVBQWUsWUFBTWIsT0FBTjtBQVpQLENBQVQsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdERhdGVwaWNrZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kYXRlcGlja2VyJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuaW1wb3J0IHsgTWF0TmF0aXZlRGF0ZU1vZHVsZSwgTWF0UmlwcGxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBNYXRSYWRpb01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3JhZGlvJztcblxuaW1wb3J0IHsgTmd4TWF0ZXJpYWxEYXRlV2lkZ2V0IH0gZnJvbSAnLi9kYXRlLWZpZWxkLndpZGdldCc7XG5cbmNvbnN0IHdpZGdldHMgPSBbTmd4TWF0ZXJpYWxEYXRlV2lkZ2V0XTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgTWF0UmFkaW9Nb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICBNYXRSaXBwbGVNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogWy4uLndpZGdldHNdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi53aWRnZXRzXSxcbiAgZW50cnlDb21wb25lbnRzOiBbLi4ud2lkZ2V0c11cbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxGb3JtTW9kdWxlIHt9XG4iXX0=