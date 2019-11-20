"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RootWidget = void 0;

var _core = require("@angular/core");

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var RootWidget = (_dec = (0, _core.Component)({
  selector: 'govuk-root-widget',
  template: "\n    <ng-container #container></ng-container>\n  "
}), _dec2 = (0, _core.ViewChild)('container', {
  read: _core.ViewContainerRef,
  "static": true
}), _dec3 = (0, _core.Input)(), _dec4 = (0, _core.Input)(), _dec(_class = (_class2 = (_temp = function () {
  function RootWidget(resolver) {
    _classCallCheck(this, RootWidget);

    this.resolver = resolver;

    _initializerDefineProperty(this, "container", _descriptor, this);

    _initializerDefineProperty(this, "fieldOptions", _descriptor2, this);

    _initializerDefineProperty(this, "renderOptions", _descriptor3, this);
  }

  _createClass(RootWidget, [{
    key: "ngOnInit",
    value: function ngOnInit() {
      this.container.clear();
      var cmp = this.getRenderOption(this.fieldOptions.fieldType);

      if (cmp) {
        var factory = this.resolver.resolveComponentFactory(cmp);
        var componentRef = this.container.createComponent(factory);
        componentRef.instance.fieldName = this.fieldOptions.fieldName;
      } else {
        throw new Error('No render support');
      }
    }
  }, {
    key: "getRenderOption",
    value: function getRenderOption(typeName) {
      return this.renderOptions[typeName];
    }
  }]);

  return RootWidget;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "container", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "fieldOptions", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "renderOptions", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.RootWidget = RootWidget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZW5kZXJlci9yb290LXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOlsiUm9vdFdpZGdldCIsInNlbGVjdG9yIiwidGVtcGxhdGUiLCJyZWFkIiwiVmlld0NvbnRhaW5lclJlZiIsInJlc29sdmVyIiwiY29udGFpbmVyIiwiY2xlYXIiLCJjbXAiLCJnZXRSZW5kZXJPcHRpb24iLCJmaWVsZE9wdGlvbnMiLCJmaWVsZFR5cGUiLCJmYWN0b3J5IiwicmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkiLCJjb21wb25lbnRSZWYiLCJjcmVhdGVDb21wb25lbnQiLCJpbnN0YW5jZSIsImZpZWxkTmFtZSIsIkVycm9yIiwidHlwZU5hbWUiLCJyZW5kZXJPcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxQmFBLFUsV0FSWixxQkFBVTtBQUVUQyxFQUFBQSxRQUFRLEVBQUUsbUJBRkQ7QUFHVEMsRUFBQUEsUUFBUTtBQUhDLENBQVYsQyxVQVNFLHFCQUFVLFdBQVYsRUFBdUI7QUFBRUMsRUFBQUEsSUFBSSxFQUFFQyxzQkFBUjtBQUEwQixZQUFRO0FBQWxDLENBQXZCLEMsVUFHQSxrQixVQUNBLGtCO0FBRUQsc0JBQW9CQyxRQUFwQixFQUF3RDtBQUFBOztBQUFBLFNBQXBDQSxRQUFvQyxHQUFwQ0EsUUFBb0M7O0FBQUE7O0FBQUE7O0FBQUE7QUFBRTs7OzsrQkFFL0M7QUFDVCxXQUFLQyxTQUFMLENBQWVDLEtBQWY7QUFDQSxVQUFNQyxHQUFHLEdBQUcsS0FBS0MsZUFBTCxDQUFxQixLQUFLQyxZQUFMLENBQWtCQyxTQUF2QyxDQUFaOztBQUNBLFVBQUlILEdBQUosRUFBUztBQUNQLFlBQU1JLE9BQThCLEdBQUcsS0FBS1AsUUFBTCxDQUFjUSx1QkFBZCxDQUFzQ0wsR0FBdEMsQ0FBdkM7QUFDQSxZQUFNTSxZQUErQixHQUFHLEtBQUtSLFNBQUwsQ0FBZVMsZUFBZixDQUErQkgsT0FBL0IsQ0FBeEM7QUFDQUUsUUFBQUEsWUFBWSxDQUFDRSxRQUFiLENBQXNCQyxTQUF0QixHQUFrQyxLQUFLUCxZQUFMLENBQWtCTyxTQUFwRDtBQUNELE9BSkQsTUFJTztBQUNMLGNBQU0sSUFBSUMsS0FBSixDQUFVLG1CQUFWLENBQU47QUFDRDtBQUNGOzs7b0NBRXVCQyxRLEVBQXVCO0FBQzdDLGFBQU8sS0FBS0MsYUFBTCxDQUFtQkQsUUFBbkIsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBJbnB1dCxcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgQ29tcG9uZW50UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2lkZ2V0T3B0aW9ucyB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1jb3JlJztcbmltcG9ydCB7IFJlbmRlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvcmVuZGVyLW9wdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdnb3Z1ay1yb290LXdpZGdldCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciAjY29udGFpbmVyPjwvbmctY29udGFpbmVyPlxuICBgXG59KVxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtY2xhc3Mtc3VmZml4XG5leHBvcnQgY2xhc3MgUm9vdFdpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIGNvbnRhaW5lciE6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgQElucHV0KCkgZmllbGRPcHRpb25zITogV2lkZ2V0T3B0aW9ucztcbiAgQElucHV0KCkgcmVuZGVyT3B0aW9ucyE6IFJlbmRlck9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29udGFpbmVyLmNsZWFyKCk7XG4gICAgY29uc3QgY21wID0gdGhpcy5nZXRSZW5kZXJPcHRpb24odGhpcy5maWVsZE9wdGlvbnMuZmllbGRUeXBlKTtcbiAgICBpZiAoY21wKSB7XG4gICAgICBjb25zdCBmYWN0b3J5OiBDb21wb25lbnRGYWN0b3J5PGFueT4gPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNtcCk7XG4gICAgICBjb25zdCBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+ID0gdGhpcy5jb250YWluZXIuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnkpO1xuICAgICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmZpZWxkTmFtZSA9IHRoaXMuZmllbGRPcHRpb25zLmZpZWxkTmFtZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyByZW5kZXIgc3VwcG9ydCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0UmVuZGVyT3B0aW9uKHR5cGVOYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnJlbmRlck9wdGlvbnNbdHlwZU5hbWVdO1xuICB9XG59XG4iXX0=