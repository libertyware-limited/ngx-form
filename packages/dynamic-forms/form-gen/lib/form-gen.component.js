"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormGenComponent = void 0;

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9mb3JtLWdlbi5jb21wb25lbnQudHMiXSwibmFtZXMiOlsiRm9ybUdlbkNvbXBvbmVudCIsInNlbGVjdG9yIiwidGVtcGxhdGVVcmwiLCJncm91cERpcmVjdGl2ZSIsImdyb3VwIiwiZm9ybSIsIm9wdGlvbiIsImV4aXN0cyIsIndpZGdldHMiLCJmaWVsZFR5cGUiLCJ1bmRlZmluZWQiLCJjb25zb2xlIiwibG9nIiwiZmllbGROYW1lIiwidmFsaWRhdGVBbGxGb3JtRmllbGRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztJQWFhQSxnQixXQUxaLHFCQUFVO0FBRVRDLEVBQUFBLFFBQVEsRUFBRSxzQkFGRDtBQUdUQyxFQUFBQSxXQUFXLEVBQUU7QUFISixDQUFWLEMsVUFRRSxrQjtBQUVELDRCQUFvQkMsY0FBcEIsRUFBd0Q7QUFBQTs7QUFBQSxTQUFwQ0EsY0FBb0MsR0FBcENBLGNBQW9DO0FBQUEsU0FKeERDLEtBSXdEOztBQUFBO0FBQUU7Ozs7K0JBRS9DO0FBQ1QsV0FBS0EsS0FBTCxHQUFhLEtBQUtELGNBQUwsQ0FBb0JFLElBQWpDO0FBQ0Q7OztpQ0FFWUMsTSxFQUFnQztBQUMzQyxVQUFNQyxNQUFNLEdBQUcsS0FBS0MsT0FBTCxDQUFhRixNQUFNLENBQUNHLFNBQXBCLE1BQW1DQyxTQUFsRDs7QUFDQSxVQUFJLENBQUNILE1BQUwsRUFBYTtBQUNYSSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsa0JBQXNCTixNQUFNLENBQUNPLFNBQTdCLCtCQUEyRFAsTUFBTSxDQUFDRyxTQUFsRTtBQUNEOztBQUNELGFBQU9GLE1BQVA7QUFDRDs7OytCQUVVO0FBQ1QsV0FBS0gsS0FBTCxDQUFXVSxxQkFBWDtBQUNEOzs7Ozs7Ozs7V0FsQmtELEUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEZvcm1Hcm91cERpcmVjdGl2ZVxufSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBEeW5hbWljRm9ybUdyb3VwIH0gZnJvbSAnQGxpYmVydHl3YXJlL25neC1mb3JtLWJ1aWxkZXInO1xuaW1wb3J0IHsgV2lkZ2V0T3B0aW9ucyB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1jb3JlJztcbmltcG9ydCB7IEZpZWxkV2lkZ2V0IH0gZnJvbSAnLi93aWRnZXRzL2ZpZWxkJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnbGliZXJ0eXdhcmUtZm9ybS1nZW4nLFxuICB0ZW1wbGF0ZVVybDogJ2Zvcm0tZ2VuLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBGb3JtR2VuQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgZ3JvdXAhOiBEeW5hbWljRm9ybUdyb3VwPGFueT47XG5cbiAgQElucHV0KCkgd2lkZ2V0czogeyBba2V5OiBzdHJpbmddOiBGaWVsZFdpZGdldCB9ID0ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncm91cERpcmVjdGl2ZTogRm9ybUdyb3VwRGlyZWN0aXZlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ3JvdXAgPSB0aGlzLmdyb3VwRGlyZWN0aXZlLmZvcm0gYXMgRHluYW1pY0Zvcm1Hcm91cDxhbnk+O1xuICB9XG5cbiAgcmVuZGVyRXhpc3RzKG9wdGlvbjogV2lkZ2V0T3B0aW9ucyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGV4aXN0cyA9IHRoaXMud2lkZ2V0c1tvcHRpb24uZmllbGRUeXBlXSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmICghZXhpc3RzKSB7XG4gICAgICBjb25zb2xlLmxvZyhgRmllbGQ6ICR7b3B0aW9uLmZpZWxkTmFtZX0gd2l0aCByZW5kZXIgdHlwZSAke29wdGlvbi5maWVsZFR5cGV9IGhhcyBubyBzdXBwb3J0ZWQgcmVuZGVyYCk7XG4gICAgfVxuICAgIHJldHVybiBleGlzdHM7XG4gIH1cblxuICBvblN1Ym1pdCgpIHtcbiAgICB0aGlzLmdyb3VwLnZhbGlkYXRlQWxsRm9ybUZpZWxkcygpO1xuICB9XG59XG4iXX0=