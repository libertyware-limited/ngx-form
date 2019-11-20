"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NgxMaterialDateWidget = void 0;

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

var NgxMaterialDateWidget = (_dec = (0, _core.Component)({
  selector: 'ngx-material-date-widget',
  template: "\n    <div class=\"example-container\" [id]=\"fieldName + '-controls'\">\n      <mat-form-field>\n        <input\n          matInput\n          [matDatepicker]=\"picker\"\n          [placeholder]=\"formControl?.readableName\"\n        />\n        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n        <mat-datepicker #picker></mat-datepicker>\n        <mat-hint>{{ hintText }}</mat-hint>\n        <mat-error *ngIf=\"group?.customValidateErrors | async as errors\">\n          <ng-container *ngFor=\"let error of errors[fieldName]; let i = index\">\n            <div>\n              {{ error }}\n            </div>\n          </ng-container>\n        </mat-error>\n      </mat-form-field>\n    </div>\n  "
}), _dec(_class = function (_FieldWidget) {
  _inherits(NgxMaterialDateWidget, _FieldWidget);

  function NgxMaterialDateWidget() {
    _classCallCheck(this, NgxMaterialDateWidget);

    return _possibleConstructorReturn(this, _getPrototypeOf(NgxMaterialDateWidget).apply(this, arguments));
  }

  return NgxMaterialDateWidget;
}(_ngxFormGen.FieldWidget)) || _class);
exports.NgxMaterialDateWidget = NgxMaterialDateWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRlLWZpZWxkLndpZGdldC50cyJdLCJuYW1lcyI6WyJOZ3hNYXRlcmlhbERhdGVXaWRnZXQiLCJzZWxlY3RvciIsInRlbXBsYXRlIiwiRmllbGRXaWRnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNEJhQSxxQixXQTFCWixxQkFBVTtBQUVUQyxFQUFBQSxRQUFRLEVBQUUsMEJBRkQ7QUFHVEMsRUFBQUEsUUFBUTtBQUhDLENBQVYsQzs7Ozs7Ozs7OztFQTBCMENDLHVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFdpZGdldCB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1nZW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtZGF0ZS13aWRnZXQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJleGFtcGxlLWNvbnRhaW5lclwiIFtpZF09XCJmaWVsZE5hbWUgKyAnLWNvbnRyb2xzJ1wiPlxuICAgICAgPG1hdC1mb3JtLWZpZWxkPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBtYXRJbnB1dFxuICAgICAgICAgIFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImZvcm1Db250cm9sPy5yZWFkYWJsZU5hbWVcIlxuICAgICAgICAvPlxuICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInBpY2tlclwiPjwvbWF0LWRhdGVwaWNrZXItdG9nZ2xlPlxuICAgICAgICA8bWF0LWRhdGVwaWNrZXIgI3BpY2tlcj48L21hdC1kYXRlcGlja2VyPlxuICAgICAgICA8bWF0LWhpbnQ+e3sgaGludFRleHQgfX08L21hdC1oaW50PlxuICAgICAgICA8bWF0LWVycm9yICpuZ0lmPVwiZ3JvdXA/LmN1c3RvbVZhbGlkYXRlRXJyb3JzIHwgYXN5bmMgYXMgZXJyb3JzXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgZXJyb3Igb2YgZXJyb3JzW2ZpZWxkTmFtZV07IGxldCBpID0gaW5kZXhcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIHt7IGVycm9yIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tYXQtZXJyb3I+XG4gICAgICA8L21hdC1mb3JtLWZpZWxkPlxuICAgIDwvZGl2PlxuICBgXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxEYXRlV2lkZ2V0IGV4dGVuZHMgRmllbGRXaWRnZXQge31cbiJdfQ==