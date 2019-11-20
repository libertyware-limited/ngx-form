"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NgxMaterialDateWidget = void 0;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRlLWZpZWxkLndpZGdldC50cyJdLCJuYW1lcyI6WyJOZ3hNYXRlcmlhbERhdGVXaWRnZXQiLCJzZWxlY3RvciIsInRlbXBsYXRlIiwiRmllbGRXaWRnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTRCYUEscUIsV0ExQloscUJBQVU7QUFFVEMsRUFBQUEsUUFBUSxFQUFFLDBCQUZEO0FBR1RDLEVBQUFBLFFBQVE7QUFIQyxDQUFWLEM7Ozs7Ozs7Ozs7RUEwQjBDQyx1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRXaWRnZXQgfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tZ2VuJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLWRhdGUtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1jb250YWluZXJcIiBbaWRdPVwiZmllbGROYW1lICsgJy1jb250cm9scydcIj5cbiAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgbWF0SW5wdXRcbiAgICAgICAgICBbbWF0RGF0ZXBpY2tlcl09XCJwaWNrZXJcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJmb3JtQ29udHJvbD8ucmVhZGFibGVOYW1lXCJcbiAgICAgICAgLz5cbiAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJwaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgPG1hdC1oaW50Pnt7IGhpbnRUZXh0IH19PC9tYXQtaGludD5cbiAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImdyb3VwPy5jdXN0b21WYWxpZGF0ZUVycm9ycyB8IGFzeW5jIGFzIGVycm9yc1wiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVycm9yIG9mIGVycm9yc1tmaWVsZE5hbWVdOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICB7eyBlcnJvciB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsRGF0ZVdpZGdldCBleHRlbmRzIEZpZWxkV2lkZ2V0IHt9XG4iXX0=