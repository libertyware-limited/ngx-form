"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldWidget = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

var _core = require("@angular/core");

var _dec, _class, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var FieldWidget = (_dec = (0, _core.Input)(), (_class = (_temp = function () {
  function FieldWidget(groupDirective) {
    _classCallCheck(this, FieldWidget);

    this.groupDirective = groupDirective;

    _initializerDefineProperty(this, "fieldName", _descriptor, this);

    this.group = void 0;
  }

  _createClass(FieldWidget, [{
    key: "ngOnInit",
    value: function ngOnInit() {
      this.group = this.groupDirective.form;
    }
  }, {
    key: "hintText",
    get: function get() {
      return this.formControl.hint;
    }
  }, {
    key: "formControl",
    get: function get() {
      return this.group.get(this.fieldName);
    }
  }]);

  return FieldWidget;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "fieldName", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class));
exports.FieldWidget = FieldWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93aWRnZXRzL2ZpZWxkLnRzIl0sIm5hbWVzIjpbIkZpZWxkV2lkZ2V0IiwiZ3JvdXBEaXJlY3RpdmUiLCJncm91cCIsImZvcm0iLCJmb3JtQ29udHJvbCIsImhpbnQiLCJnZXQiLCJmaWVsZE5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0lBSXNCQSxXLFdBQ25CLGtCO0FBSUQsdUJBQW9EQyxjQUFwRCxFQUF3RjtBQUFBOztBQUFBLFNBQXBDQSxjQUFvQyxHQUFwQ0EsY0FBb0M7O0FBQUE7O0FBQUEsU0FGakZDLEtBRWlGO0FBQUU7Ozs7K0JBRS9FO0FBQ1QsV0FBS0EsS0FBTCxHQUFhLEtBQUtELGNBQUwsQ0FBb0JFLElBQWpDO0FBQ0Q7Ozt3QkFFc0I7QUFDckIsYUFBTyxLQUFLQyxXQUFMLENBQWlCQyxJQUF4QjtBQUNEOzs7d0JBRXFDO0FBQ3BDLGFBQU8sS0FBS0gsS0FBTCxDQUFXSSxHQUFYLENBQWUsS0FBS0MsU0FBcEIsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXQsIE9wdGlvbmFsLCBTa2lwU2VsZiwgSG9zdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEeW5hbWljRm9ybUdyb3VwLCBEeW5hbWljRm9ybUNvbnRyb2wgfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tYnVpbGRlcic7XG5pbXBvcnQgeyBGb3JtR3JvdXBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGaWVsZFdpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGZpZWxkTmFtZSE6IHN0cmluZztcblxuICBwdWJsaWMgZ3JvdXAhOiBEeW5hbWljRm9ybUdyb3VwPGFueT47XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgQEhvc3QoKSBwcml2YXRlIGdyb3VwRGlyZWN0aXZlOiBGb3JtR3JvdXBEaXJlY3RpdmUpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ncm91cCA9IHRoaXMuZ3JvdXBEaXJlY3RpdmUuZm9ybSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT47XG4gIH1cblxuICBnZXQgaGludFRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5mb3JtQ29udHJvbC5oaW50O1xuICB9XG5cbiAgZ2V0IGZvcm1Db250cm9sKCk6IER5bmFtaWNGb3JtQ29udHJvbCB7XG4gICAgcmV0dXJuIHRoaXMuZ3JvdXAuZ2V0KHRoaXMuZmllbGROYW1lKSBhcyBEeW5hbWljRm9ybUNvbnRyb2w7XG4gIH1cbn1cbiJdfQ==