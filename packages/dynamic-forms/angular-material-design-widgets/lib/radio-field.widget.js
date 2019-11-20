"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NgxMaterialRadioWidget = void 0;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yYWRpby1maWVsZC53aWRnZXQudHMiXSwibmFtZXMiOlsiTmd4TWF0ZXJpYWxSYWRpb1dpZGdldCIsInNlbGVjdG9yIiwidGVtcGxhdGUiLCJGaWVsZFdpZGdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF3QmFBLHNCLFdBdEJaLHFCQUFVO0FBRVRDLEVBQUFBLFFBQVEsRUFBRSwyQkFGRDtBQUdUQyxFQUFBQSxRQUFRO0FBSEMsQ0FBVixDOzs7Ozs7Ozs7O0VBc0IyQ0MsdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkV2lkZ2V0IH0gZnJvbSAnQGxpYmVydHl3YXJlL25neC1mb3JtLWdlbic7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC1yYWRpby13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLWNvbnRhaW5lclwiIFtpZF09XCJmaWVsZE5hbWUgKyAnLWNvbnRyb2xzJ1wiPlxuICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8bWF0LXJhZGlvLWdyb3VwIGFyaWEtbGFiZWw9XCJTZWxlY3QgYW4gb3B0aW9uXCI+XG4gICAgICAgICAgPG1hdC1yYWRpby1idXR0b24gKm5nRm9yPVwibGV0IHJhZGlvT3B0aW9uIG9mIGZvcm1Db250cm9sLnJhZGlvT3B0aW9uczsgbGV0IGkgPSBpbmRleFwiIFt2YWx1ZV09XCJyYWRpb09wdGlvbi52YWx1ZVwiPnt7IHJhZGlvT3B0aW9uLmxhYmVsIH19PC9tYXQtcmFkaW8tYnV0dG9uPlxuICAgICAgICA8L21hdC1yYWRpby1ncm91cD5cbiAgICAgICAgPG1hdC1oaW50Pnt7IGhpbnRUZXh0IH19PC9tYXQtaGludD5cbiAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImdyb3VwPy5jdXN0b21WYWxpZGF0ZUVycm9ycyB8IGFzeW5jIGFzIGVycm9yc1wiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVycm9yIG9mIGVycm9yc1tmaWVsZE5hbWVdOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICB7eyBlcnJvciB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsUmFkaW9XaWRnZXQgZXh0ZW5kcyBGaWVsZFdpZGdldCB7fVxuIl19