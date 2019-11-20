"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NgxMaterialRadioWidget = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _core = require("@angular/core");

var _ngxFormGen = require("@libertyware/ngx-form-gen");

var _dec, _class;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var NgxMaterialRadioWidget = (_dec = (0, _core.Component)({
  selector: 'ngx-material-radio-widget',
  template: "\n    <div class=\"example-container\" [id]=\"fieldName + '-controls'\">\n      <mat-form-field>\n        <mat-radio-group aria-label=\"Select an option\">\n          <mat-radio-button *ngFor=\"let radioOption of formControl.radioOptions; let i = index\" [value]=\"radioOption.value\">{{ radioOption.label }}</mat-radio-button>\n        </mat-radio-group>\n        <mat-hint>{{ hintText }}</mat-hint>\n        <mat-error *ngIf=\"group?.customValidateErrors | async as errors\">\n          <ng-container *ngFor=\"let error of errors[fieldName]; let i = index\">\n            <div>\n              {{ error }}\n            </div>\n          </ng-container>\n        </mat-error>\n      </mat-form-field>\n    </div>\n  "
}), _dec(_class = function (_FieldWidget) {
  _inherits(NgxMaterialRadioWidget, _FieldWidget);

  function NgxMaterialRadioWidget() {
    _classCallCheck(this, NgxMaterialRadioWidget);

    return _possibleConstructorReturn(this, _getPrototypeOf(NgxMaterialRadioWidget).apply(this, arguments));
  }

  return NgxMaterialRadioWidget;
}(_ngxFormGen.FieldWidget)) || _class);
exports.NgxMaterialRadioWidget = NgxMaterialRadioWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yYWRpby1maWVsZC53aWRnZXQudHMiXSwibmFtZXMiOlsiTmd4TWF0ZXJpYWxSYWRpb1dpZGdldCIsInNlbGVjdG9yIiwidGVtcGxhdGUiLCJGaWVsZFdpZGdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBd0JhQSxzQixXQXRCWixxQkFBVTtBQUVUQyxFQUFBQSxRQUFRLEVBQUUsMkJBRkQ7QUFHVEMsRUFBQUEsUUFBUTtBQUhDLENBQVYsQzs7Ozs7Ozs7OztFQXNCMkNDLHVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFdpZGdldCB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1nZW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtcmFkaW8td2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1jb250YWluZXJcIiBbaWRdPVwiZmllbGROYW1lICsgJy1jb250cm9scydcIj5cbiAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPG1hdC1yYWRpby1ncm91cCBhcmlhLWxhYmVsPVwiU2VsZWN0IGFuIG9wdGlvblwiPlxuICAgICAgICAgIDxtYXQtcmFkaW8tYnV0dG9uICpuZ0Zvcj1cImxldCByYWRpb09wdGlvbiBvZiBmb3JtQ29udHJvbC5yYWRpb09wdGlvbnM7IGxldCBpID0gaW5kZXhcIiBbdmFsdWVdPVwicmFkaW9PcHRpb24udmFsdWVcIj57eyByYWRpb09wdGlvbi5sYWJlbCB9fTwvbWF0LXJhZGlvLWJ1dHRvbj5cbiAgICAgICAgPC9tYXQtcmFkaW8tZ3JvdXA+XG4gICAgICAgIDxtYXQtaGludD57eyBoaW50VGV4dCB9fTwvbWF0LWhpbnQ+XG4gICAgICAgIDxtYXQtZXJyb3IgKm5nSWY9XCJncm91cD8uY3VzdG9tVmFsaWRhdGVFcnJvcnMgfCBhc3luYyBhcyBlcnJvcnNcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBlcnJvciBvZiBlcnJvcnNbZmllbGROYW1lXTsgbGV0IGkgPSBpbmRleFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAge3sgZXJyb3IgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L21hdC1lcnJvcj5cbiAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFJhZGlvV2lkZ2V0IGV4dGVuZHMgRmllbGRXaWRnZXQge31cbiJdfQ==