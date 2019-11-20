"use strict";

require("core-js/modules/es6.object.define-property");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mb3JtLWdlbi5tb2R1bGUudHMiXSwibmFtZXMiOlsiRm9ybUdlbk1vZHVsZSIsImltcG9ydHMiLCJDb21tb25Nb2R1bGUiLCJSZWFjdGl2ZUZvcm1zTW9kdWxlIiwiRm9ybXNNb2R1bGUiLCJleHBvcnRzIiwiRm9ybUdlbkNvbXBvbmVudCIsIlJvb3RXaWRnZXQiLCJkZWNsYXJhdGlvbnMiLCJwcm92aWRlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOzs7Ozs7SUFZYUEsYSxXQVZaLG9CQUFTO0FBQ1JDLEVBQUFBLE9BQU8sRUFBRSxDQUNQQyxvQkFETyxFQUVQQywwQkFGTyxFQUdQQyxrQkFITyxDQUREO0FBTVJDLEVBQUFBLE9BQU8sRUFBRSxDQUFDQyx5QkFBRCxFQUFtQkMsc0JBQW5CLENBTkQ7QUFPUkMsRUFBQUEsWUFBWSxFQUFFLENBQUNGLHlCQUFELEVBQW1CQyxzQkFBbkIsQ0FQTjtBQVFSRSxFQUFBQSxTQUFTLEVBQUU7QUFSSCxDQUFULEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUsIEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBGb3JtR2VuQ29tcG9uZW50IH0gZnJvbSAnLi9mb3JtLWdlbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUm9vdFdpZGdldCB9IGZyb20gJy4vcmVuZGVyZXIvcm9vdC13aWRnZXQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtGb3JtR2VuQ29tcG9uZW50LCBSb290V2lkZ2V0XSxcbiAgZGVjbGFyYXRpb25zOiBbRm9ybUdlbkNvbXBvbmVudCwgUm9vdFdpZGdldF0sXG4gIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgRm9ybUdlbk1vZHVsZSB7fVxuIl19