"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormGenComponent = void 0;

var _core = require("@angular/core");

var _dec, _dec2, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var FormGenComponent = (_dec = (0, _core.Component)({
  selector: 'libertyware-form-gen',
  templateUrl: 'form-gen.component.html'
}), _dec2 = (0, _core.Input)(), _dec(_class = (_class2 = (_temp = function () {
  function FormGenComponent(groupDirective) {
    _classCallCheck(this, FormGenComponent);

    this.groupDirective = groupDirective;
    this.group = void 0;

    _initializerDefineProperty(this, "widgets", _descriptor, this);
  }

  _createClass(FormGenComponent, [{
    key: "ngOnInit",
    value: function ngOnInit() {
      this.group = this.groupDirective.form;
    }
  }, {
    key: "renderExists",
    value: function renderExists(option) {
      var exists = this.widgets[option.fieldType] !== undefined;

      if (!exists) {
        console.log("Field: ".concat(option.fieldName, " with render type ").concat(option.fieldType, " has no supported render"));
      }

      return exists;
    }
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      this.group.validateAllFormFields();
    }
  }]);

  return FormGenComponent;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "widgets", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
})), _class2)) || _class);
exports.FormGenComponent = FormGenComponent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mb3JtLWdlbi5jb21wb25lbnQudHMiXSwibmFtZXMiOlsiRm9ybUdlbkNvbXBvbmVudCIsInNlbGVjdG9yIiwidGVtcGxhdGVVcmwiLCJncm91cERpcmVjdGl2ZSIsImdyb3VwIiwiZm9ybSIsIm9wdGlvbiIsImV4aXN0cyIsIndpZGdldHMiLCJmaWVsZFR5cGUiLCJ1bmRlZmluZWQiLCJjb25zb2xlIiwibG9nIiwiZmllbGROYW1lIiwidmFsaWRhdGVBbGxGb3JtRmllbGRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFhYUEsZ0IsV0FMWixxQkFBVTtBQUVUQyxFQUFBQSxRQUFRLEVBQUUsc0JBRkQ7QUFHVEMsRUFBQUEsV0FBVyxFQUFFO0FBSEosQ0FBVixDLFVBUUUsa0I7QUFFRCw0QkFBb0JDLGNBQXBCLEVBQXdEO0FBQUE7O0FBQUEsU0FBcENBLGNBQW9DLEdBQXBDQSxjQUFvQztBQUFBLFNBSnhEQyxLQUl3RDs7QUFBQTtBQUFFOzs7OytCQUUvQztBQUNULFdBQUtBLEtBQUwsR0FBYSxLQUFLRCxjQUFMLENBQW9CRSxJQUFqQztBQUNEOzs7aUNBRVlDLE0sRUFBZ0M7QUFDM0MsVUFBTUMsTUFBTSxHQUFHLEtBQUtDLE9BQUwsQ0FBYUYsTUFBTSxDQUFDRyxTQUFwQixNQUFtQ0MsU0FBbEQ7O0FBQ0EsVUFBSSxDQUFDSCxNQUFMLEVBQWE7QUFDWEksUUFBQUEsT0FBTyxDQUFDQyxHQUFSLGtCQUFzQk4sTUFBTSxDQUFDTyxTQUE3QiwrQkFBMkRQLE1BQU0sQ0FBQ0csU0FBbEU7QUFDRDs7QUFDRCxhQUFPRixNQUFQO0FBQ0Q7OzsrQkFFVTtBQUNULFdBQUtILEtBQUwsQ0FBV1UscUJBQVg7QUFDRDs7Ozs7Ozs7O1dBbEJrRCxFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBGb3JtR3JvdXBEaXJlY3RpdmVcbn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm1Hcm91cCB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1idWlsZGVyJztcbmltcG9ydCB7IFdpZGdldE9wdGlvbnMgfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tY29yZSc7XG5pbXBvcnQgeyBGaWVsZFdpZGdldCB9IGZyb20gJy4vd2lkZ2V0cy9maWVsZCc7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ2xpYmVydHl3YXJlLWZvcm0tZ2VuJyxcbiAgdGVtcGxhdGVVcmw6ICdmb3JtLWdlbi5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUdlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGdyb3VwITogRHluYW1pY0Zvcm1Hcm91cDxhbnk+O1xuXG4gIEBJbnB1dCgpIHdpZGdldHM6IHsgW2tleTogc3RyaW5nXTogRmllbGRXaWRnZXQgfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JvdXBEaXJlY3RpdmU6IEZvcm1Hcm91cERpcmVjdGl2ZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdyb3VwID0gdGhpcy5ncm91cERpcmVjdGl2ZS5mb3JtIGFzIER5bmFtaWNGb3JtR3JvdXA8YW55PjtcbiAgfVxuXG4gIHJlbmRlckV4aXN0cyhvcHRpb246IFdpZGdldE9wdGlvbnMpOiBib29sZWFuIHtcbiAgICBjb25zdCBleGlzdHMgPSB0aGlzLndpZGdldHNbb3B0aW9uLmZpZWxkVHlwZV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAoIWV4aXN0cykge1xuICAgICAgY29uc29sZS5sb2coYEZpZWxkOiAke29wdGlvbi5maWVsZE5hbWV9IHdpdGggcmVuZGVyIHR5cGUgJHtvcHRpb24uZmllbGRUeXBlfSBoYXMgbm8gc3VwcG9ydGVkIHJlbmRlcmApO1xuICAgIH1cbiAgICByZXR1cm4gZXhpc3RzO1xuICB9XG5cbiAgb25TdWJtaXQoKSB7XG4gICAgdGhpcy5ncm91cC52YWxpZGF0ZUFsbEZvcm1GaWVsZHMoKTtcbiAgfVxufVxuIl19