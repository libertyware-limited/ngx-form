"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NgxMaterialTextareaWidget = void 0;

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

var NgxMaterialTextareaWidget = (_dec = (0, _core.Component)({
  selector: 'ngx-material-input-widget',
  template: "\n    <div class=\"example-container\" [id]=\"fieldName + '-controls'\">\n      <mat-form-field>\n        <textarea matInput [placeholder]=\"formControl?.readableName\"></textarea>\n        <mat-hint>{{ hintText }}</mat-hint>\n        <mat-error *ngIf=\"group?.customValidateErrors | async as errors\">\n          <ng-container *ngFor=\"let error of errors[fieldName]; let i = index\">\n            <div>\n              {{ error }}\n            </div>\n          </ng-container>\n        </mat-error>\n      </mat-form-field>\n    </div>\n  "
}), _dec(_class = function (_FieldWidget) {
  _inherits(NgxMaterialTextareaWidget, _FieldWidget);

  function NgxMaterialTextareaWidget() {
    _classCallCheck(this, NgxMaterialTextareaWidget);

    return _possibleConstructorReturn(this, _getPrototypeOf(NgxMaterialTextareaWidget).apply(this, arguments));
  }

  return NgxMaterialTextareaWidget;
}(_ngxFormGen.FieldWidget)) || _class);
exports.NgxMaterialTextareaWidget = NgxMaterialTextareaWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXh0YXJlYS1maWVsZC53aWRnZXQudHMiXSwibmFtZXMiOlsiTmd4TWF0ZXJpYWxUZXh0YXJlYVdpZGdldCIsInNlbGVjdG9yIiwidGVtcGxhdGUiLCJGaWVsZFdpZGdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFzQmFBLHlCLFdBcEJaLHFCQUFVO0FBRVRDLEVBQUFBLFFBQVEsRUFBRSwyQkFGRDtBQUdUQyxFQUFBQSxRQUFRO0FBSEMsQ0FBVixDOzs7Ozs7Ozs7O0VBb0I4Q0MsdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkV2lkZ2V0IH0gZnJvbSAnQGxpYmVydHl3YXJlL25neC1mb3JtLWdlbic7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC1pbnB1dC13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLWNvbnRhaW5lclwiIFtpZF09XCJmaWVsZE5hbWUgKyAnLWNvbnRyb2xzJ1wiPlxuICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8dGV4dGFyZWEgbWF0SW5wdXQgW3BsYWNlaG9sZGVyXT1cImZvcm1Db250cm9sPy5yZWFkYWJsZU5hbWVcIj48L3RleHRhcmVhPlxuICAgICAgICA8bWF0LWhpbnQ+e3sgaGludFRleHQgfX08L21hdC1oaW50PlxuICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZ3JvdXA/LmN1c3RvbVZhbGlkYXRlRXJyb3JzIHwgYXN5bmMgYXMgZXJyb3JzXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZXJyb3Igb2YgZXJyb3JzW2ZpZWxkTmFtZV07IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIHt7IGVycm9yIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIDwvZGl2PlxuICBgXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUZXh0YXJlYVdpZGdldCBleHRlbmRzIEZpZWxkV2lkZ2V0IHt9XG4iXX0=