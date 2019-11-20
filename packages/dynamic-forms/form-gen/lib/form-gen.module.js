"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormGenModule = void 0;

var _core = require("@angular/core");

var _common = require("@angular/common");

var _forms = require("@angular/forms");

var _formGen = require("./form-gen.component");

var _rootWidget = require("./renderer/root-widget.component");

var _dec, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormGenModule = (_dec = (0, _core.NgModule)({
  imports: [_common.CommonModule, _forms.ReactiveFormsModule, _forms.FormsModule],
  exports: [_formGen.FormGenComponent, _rootWidget.RootWidget],
  declarations: [_formGen.FormGenComponent, _rootWidget.RootWidget],
  providers: []
}), _dec(_class = function FormGenModule() {
  _classCallCheck(this, FormGenModule);
}) || _class);
exports.FormGenModule = FormGenModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mb3JtLWdlbi5tb2R1bGUudHMiXSwibmFtZXMiOlsiRm9ybUdlbk1vZHVsZSIsImltcG9ydHMiLCJDb21tb25Nb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJleHBvcnRzIiwiRm9ybUdlbkNvbXBvbmVudCIsIlJvb3RXaWRnZXQiLCJkZWNsYXJhdGlvbnMiLCJwcm92aWRlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7O0lBWWFBLGEsV0FWWixvQkFBUztBQUNSQyxFQUFBQSxPQUFPLEVBQUUsQ0FDUEMsb0JBRE8sRUFFUEMsMEJBRk8sRUFHUEMsa0JBSE8sQ0FERDtBQU1SQyxFQUFBQSxPQUFPLEVBQUUsQ0FBQ0MseUJBQUQsRUFBbUJDLHNCQUFuQixDQU5EO0FBT1JDLEVBQUFBLFlBQVksRUFBRSxDQUFDRix5QkFBRCxFQUFtQkMsc0JBQW5CLENBUE47QUFRUkUsRUFBQUEsU0FBUyxFQUFFO0FBUkgsQ0FBVCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgRm9ybUdlbkNvbXBvbmVudCB9IGZyb20gJy4vZm9ybS1nZW4uY29tcG9uZW50JztcbmltcG9ydCB7IFJvb3RXaWRnZXQgfSBmcm9tICcuL3JlbmRlcmVyL3Jvb3Qtd2lkZ2V0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbRm9ybUdlbkNvbXBvbmVudCwgUm9vdFdpZGdldF0sXG4gIGRlY2xhcmF0aW9uczogW0Zvcm1HZW5Db21wb25lbnQsIFJvb3RXaWRnZXRdLFxuICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1HZW5Nb2R1bGUge31cbiJdfQ==