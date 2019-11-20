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
  selector: 'libertware-root-widget',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZW5kZXJlci9yb290LXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOlsiUm9vdFdpZGdldCIsInNlbGVjdG9yIiwidGVtcGxhdGUiLCJyZWFkIiwiVmlld0NvbnRhaW5lclJlZiIsInJlc29sdmVyIiwiY29udGFpbmVyIiwiY2xlYXIiLCJjbXAiLCJnZXRSZW5kZXJPcHRpb24iLCJmaWVsZE9wdGlvbnMiLCJmaWVsZFR5cGUiLCJmYWN0b3J5IiwicmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkiLCJjb21wb25lbnRSZWYiLCJjcmVhdGVDb21wb25lbnQiLCJpbnN0YW5jZSIsImZpZWxkTmFtZSIsIkVycm9yIiwidHlwZU5hbWUiLCJyZW5kZXJPcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxQmFBLFUsV0FSWixxQkFBVTtBQUVUQyxFQUFBQSxRQUFRLEVBQUUsd0JBRkQ7QUFHVEMsRUFBQUEsUUFBUTtBQUhDLENBQVYsQyxVQVNFLHFCQUFVLFdBQVYsRUFBdUI7QUFBRUMsRUFBQUEsSUFBSSxFQUFFQyxzQkFBUjtBQUEwQixZQUFRO0FBQWxDLENBQXZCLEMsVUFHQSxrQixVQUNBLGtCO0FBRUQsc0JBQW9CQyxRQUFwQixFQUF3RDtBQUFBOztBQUFBLFNBQXBDQSxRQUFvQyxHQUFwQ0EsUUFBb0M7O0FBQUE7O0FBQUE7O0FBQUE7QUFBRTs7OzsrQkFFL0M7QUFDVCxXQUFLQyxTQUFMLENBQWVDLEtBQWY7QUFDQSxVQUFNQyxHQUFHLEdBQUcsS0FBS0MsZUFBTCxDQUFxQixLQUFLQyxZQUFMLENBQWtCQyxTQUF2QyxDQUFaOztBQUNBLFVBQUlILEdBQUosRUFBUztBQUNQLFlBQU1JLE9BQThCLEdBQUcsS0FBS1AsUUFBTCxDQUFjUSx1QkFBZCxDQUFzQ0wsR0FBdEMsQ0FBdkM7QUFDQSxZQUFNTSxZQUErQixHQUFHLEtBQUtSLFNBQUwsQ0FBZVMsZUFBZixDQUErQkgsT0FBL0IsQ0FBeEM7QUFDQUUsUUFBQUEsWUFBWSxDQUFDRSxRQUFiLENBQXNCQyxTQUF0QixHQUFrQyxLQUFLUCxZQUFMLENBQWtCTyxTQUFwRDtBQUNELE9BSkQsTUFJTztBQUNMLGNBQU0sSUFBSUMsS0FBSixDQUFVLG1CQUFWLENBQU47QUFDRDtBQUNGOzs7b0NBRXVCQyxRLEVBQXVCO0FBQzdDLGFBQU8sS0FBS0MsYUFBTCxDQUFtQkQsUUFBbkIsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBJbnB1dCxcbiAgQ29tcG9uZW50RmFjdG9yeSxcbiAgQ29tcG9uZW50UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2lkZ2V0T3B0aW9ucyB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1jb3JlJztcbmltcG9ydCB7IFJlbmRlck9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvcmVuZGVyLW9wdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjb21wb25lbnQtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdsaWJlcnR3YXJlLXJvb3Qtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICNjb250YWluZXI+PC9uZy1jb250YWluZXI+XG4gIGBcbn0pXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGNvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBSb290V2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgY29udGFpbmVyITogVmlld0NvbnRhaW5lclJlZjtcblxuICBASW5wdXQoKSBmaWVsZE9wdGlvbnMhOiBXaWRnZXRPcHRpb25zO1xuICBASW5wdXQoKSByZW5kZXJPcHRpb25zITogUmVuZGVyT3B0aW9ucztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb250YWluZXIuY2xlYXIoKTtcbiAgICBjb25zdCBjbXAgPSB0aGlzLmdldFJlbmRlck9wdGlvbih0aGlzLmZpZWxkT3B0aW9ucy5maWVsZFR5cGUpO1xuICAgIGlmIChjbXApIHtcbiAgICAgIGNvbnN0IGZhY3Rvcnk6IENvbXBvbmVudEZhY3Rvcnk8YW55PiA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY21wKTtcbiAgICAgIGNvbnN0IGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4gPSB0aGlzLmNvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSk7XG4gICAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuZmllbGROYW1lID0gdGhpcy5maWVsZE9wdGlvbnMuZmllbGROYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHJlbmRlciBzdXBwb3J0Jyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZW5kZXJPcHRpb24odHlwZU5hbWU6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyT3B0aW9uc1t0eXBlTmFtZV07XG4gIH1cbn1cbiJdfQ==