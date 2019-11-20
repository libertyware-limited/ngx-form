"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.reverse");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mb3JtLWdlbi5jb21wb25lbnQudHMiXSwibmFtZXMiOlsiRm9ybUdlbkNvbXBvbmVudCIsInNlbGVjdG9yIiwidGVtcGxhdGVVcmwiLCJncm91cERpcmVjdGl2ZSIsImdyb3VwIiwiZm9ybSIsIm9wdGlvbiIsImV4aXN0cyIsIndpZGdldHMiLCJmaWVsZFR5cGUiLCJ1bmRlZmluZWQiLCJjb25zb2xlIiwibG9nIiwiZmllbGROYW1lIiwidmFsaWRhdGVBbGxGb3JtRmllbGRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0lBYWFBLGdCLFdBTFoscUJBQVU7QUFFVEMsRUFBQUEsUUFBUSxFQUFFLHNCQUZEO0FBR1RDLEVBQUFBLFdBQVcsRUFBRTtBQUhKLENBQVYsQyxVQVFFLGtCO0FBRUQsNEJBQW9CQyxjQUFwQixFQUF3RDtBQUFBOztBQUFBLFNBQXBDQSxjQUFvQyxHQUFwQ0EsY0FBb0M7QUFBQSxTQUp4REMsS0FJd0Q7O0FBQUE7QUFBRTs7OzsrQkFFL0M7QUFDVCxXQUFLQSxLQUFMLEdBQWEsS0FBS0QsY0FBTCxDQUFvQkUsSUFBakM7QUFDRDs7O2lDQUVZQyxNLEVBQWdDO0FBQzNDLFVBQU1DLE1BQU0sR0FBRyxLQUFLQyxPQUFMLENBQWFGLE1BQU0sQ0FBQ0csU0FBcEIsTUFBbUNDLFNBQWxEOztBQUNBLFVBQUksQ0FBQ0gsTUFBTCxFQUFhO0FBQ1hJLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixrQkFBc0JOLE1BQU0sQ0FBQ08sU0FBN0IsK0JBQTJEUCxNQUFNLENBQUNHLFNBQWxFO0FBQ0Q7O0FBQ0QsYUFBT0YsTUFBUDtBQUNEOzs7K0JBRVU7QUFDVCxXQUFLSCxLQUFMLENBQVdVLHFCQUFYO0FBQ0Q7Ozs7Ozs7OztXQWxCa0QsRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRm9ybUdyb3VwRGlyZWN0aXZlXG59IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IER5bmFtaWNGb3JtR3JvdXAgfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tYnVpbGRlcic7XG5pbXBvcnQgeyBXaWRnZXRPcHRpb25zIH0gZnJvbSAnQGxpYmVydHl3YXJlL25neC1mb3JtLWNvcmUnO1xuaW1wb3J0IHsgRmllbGRXaWRnZXQgfSBmcm9tICcuL3dpZGdldHMvZmllbGQnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdsaWJlcnR5d2FyZS1mb3JtLWdlbicsXG4gIHRlbXBsYXRlVXJsOiAnZm9ybS1nZW4uY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1HZW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBncm91cCE6IER5bmFtaWNGb3JtR3JvdXA8YW55PjtcblxuICBASW5wdXQoKSB3aWRnZXRzOiB7IFtrZXk6IHN0cmluZ106IEZpZWxkV2lkZ2V0IH0gPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyb3VwRGlyZWN0aXZlOiBGb3JtR3JvdXBEaXJlY3RpdmUpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ncm91cCA9IHRoaXMuZ3JvdXBEaXJlY3RpdmUuZm9ybSBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT47XG4gIH1cblxuICByZW5kZXJFeGlzdHMob3B0aW9uOiBXaWRnZXRPcHRpb25zKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZXhpc3RzID0gdGhpcy53aWRnZXRzW29wdGlvbi5maWVsZFR5cGVdICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKCFleGlzdHMpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBGaWVsZDogJHtvcHRpb24uZmllbGROYW1lfSB3aXRoIHJlbmRlciB0eXBlICR7b3B0aW9uLmZpZWxkVHlwZX0gaGFzIG5vIHN1cHBvcnRlZCByZW5kZXJgKTtcbiAgICB9XG4gICAgcmV0dXJuIGV4aXN0cztcbiAgfVxuXG4gIG9uU3VibWl0KCkge1xuICAgIHRoaXMuZ3JvdXAudmFsaWRhdGVBbGxGb3JtRmllbGRzKCk7XG4gIH1cbn1cbiJdfQ==