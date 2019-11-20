"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NgxMaterialTextareaWidget = void 0;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXh0YXJlYS1maWVsZC53aWRnZXQudHMiXSwibmFtZXMiOlsiTmd4TWF0ZXJpYWxUZXh0YXJlYVdpZGdldCIsInNlbGVjdG9yIiwidGVtcGxhdGUiLCJGaWVsZFdpZGdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0JhQSx5QixXQXBCWixxQkFBVTtBQUVUQyxFQUFBQSxRQUFRLEVBQUUsMkJBRkQ7QUFHVEMsRUFBQUEsUUFBUTtBQUhDLENBQVYsQzs7Ozs7Ozs7OztFQW9COENDLHVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFdpZGdldCB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1nZW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtaW5wdXQtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1jb250YWluZXJcIiBbaWRdPVwiZmllbGROYW1lICsgJy1jb250cm9scydcIj5cbiAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPHRleHRhcmVhIG1hdElucHV0IFtwbGFjZWhvbGRlcl09XCJmb3JtQ29udHJvbD8ucmVhZGFibGVOYW1lXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgPG1hdC1oaW50Pnt7IGhpbnRUZXh0IH19PC9tYXQtaGludD5cbiAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImdyb3VwPy5jdXN0b21WYWxpZGF0ZUVycm9ycyB8IGFzeW5jIGFzIGVycm9yc1wiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVycm9yIG9mIGVycm9yc1tmaWVsZE5hbWVdOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICB7eyBlcnJvciB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGV4dGFyZWFXaWRnZXQgZXh0ZW5kcyBGaWVsZFdpZGdldCB7fVxuIl19