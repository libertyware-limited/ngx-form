"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDynamicFormGroupConfig = isDynamicFormGroupConfig;
exports.isLegacyOrOpts = isLegacyOrOpts;
exports.isAbstractControlOptions = isAbstractControlOptions;

var _util = require("util");

function isDynamicFormGroupConfig(options) {
  return options && !(0, _util.isNullOrUndefined)(options['customValidatorOptions']);
}

function isLegacyOrOpts(options) {
  return options && (!(0, _util.isNullOrUndefined)(options['validator']) || !(0, _util.isNullOrUndefined)(options['asyncValidator']));
}

function isAbstractControlOptions(options) {
  return options && (!(0, _util.isNullOrUndefined)(options.validators) || !(0, _util.isNullOrUndefined)(options.asyncValidators) || !(0, _util.isNullOrUndefined)(options.updateOn));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvZHluYW1pYy1mb3JtLWdyb3VwLWNvbmZpZy50cyJdLCJuYW1lcyI6WyJpc0R5bmFtaWNGb3JtR3JvdXBDb25maWciLCJvcHRpb25zIiwiaXNMZWdhY3lPck9wdHMiLCJpc0Fic3RyYWN0Q29udHJvbE9wdGlvbnMiLCJ2YWxpZGF0b3JzIiwiYXN5bmNWYWxpZGF0b3JzIiwidXBkYXRlT24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBOztBQVVPLFNBQVNBLHdCQUFULENBQWtDQyxPQUFsQyxFQUFrRTtBQUN2RSxTQUFPQSxPQUFPLElBQUksQ0FBQyw2QkFBa0JBLE9BQU8sQ0FBQyx3QkFBRCxDQUF6QixDQUFuQjtBQUNEOztBQUNNLFNBQVNDLGNBQVQsQ0FBd0JELE9BQXhCLEVBQXlEO0FBQzlELFNBQU9BLE9BQU8sS0FBSyxDQUFDLDZCQUFrQkEsT0FBTyxDQUFDLFdBQUQsQ0FBekIsQ0FBRCxJQUE0QyxDQUFDLDZCQUFrQkEsT0FBTyxDQUFDLGdCQUFELENBQXpCLENBQWxELENBQWQ7QUFDRDs7QUFDTSxTQUFTRSx3QkFBVCxDQUFrQ0YsT0FBbEMsRUFBNEY7QUFDakcsU0FDRUEsT0FBTyxLQUNOLENBQUMsNkJBQWtCQSxPQUFPLENBQUNHLFVBQTFCLENBQUQsSUFDQyxDQUFDLDZCQUFrQkgsT0FBTyxDQUFDSSxlQUExQixDQURGLElBRUMsQ0FBQyw2QkFBa0JKLE9BQU8sQ0FBQ0ssUUFBMUIsQ0FISSxDQURUO0FBTUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2xPcHRpb25zLCBBc3luY1ZhbGlkYXRvckZuLCBWYWxpZGF0b3JGbiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFZhbGlkYXRvck9wdGlvbnMgfSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xuaW1wb3J0IHsgaXNOdWxsT3JVbmRlZmluZWQgfSBmcm9tICd1dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBEeW5hbWljRm9ybUdyb3VwQ29uZmlnIHtcbiAgdmFsaWRhdG9yPzogVmFsaWRhdG9yRm4gfCB1bmRlZmluZWQ7XG4gIGFzeW5jVmFsaWRhdG9yPzogQXN5bmNWYWxpZGF0b3JGbiB8IHVuZGVmaW5lZDtcbiAgdmFsaWRhdG9ycz86IFZhbGlkYXRvckZuW10gfCB1bmRlZmluZWQ7XG4gIGFzeW5jVmFsaWRhdG9ycz86IEFzeW5jVmFsaWRhdG9yRm5bXSB8IHVuZGVmaW5lZDtcbiAgdXBkYXRlT24/OiBhbnkgfCB1bmRlZmluZWQ7XG4gIGN1c3RvbVZhbGlkYXRvck9wdGlvbnM/OiBWYWxpZGF0b3JPcHRpb25zIHwgdW5kZWZpbmVkO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzRHluYW1pY0Zvcm1Hcm91cENvbmZpZyhvcHRpb25zOkR5bmFtaWNGb3JtR3JvdXBDb25maWcpIHtcbiAgcmV0dXJuIG9wdGlvbnMgJiYgIWlzTnVsbE9yVW5kZWZpbmVkKG9wdGlvbnNbJ2N1c3RvbVZhbGlkYXRvck9wdGlvbnMnXSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNMZWdhY3lPck9wdHMob3B0aW9uczogRHluYW1pY0Zvcm1Hcm91cENvbmZpZykge1xuICByZXR1cm4gb3B0aW9ucyAmJiAoIWlzTnVsbE9yVW5kZWZpbmVkKG9wdGlvbnNbJ3ZhbGlkYXRvciddKSB8fCAhaXNOdWxsT3JVbmRlZmluZWQob3B0aW9uc1snYXN5bmNWYWxpZGF0b3InXSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQWJzdHJhY3RDb250cm9sT3B0aW9ucyhvcHRpb25zOiBBYnN0cmFjdENvbnRyb2xPcHRpb25zIHwgRHluYW1pY0Zvcm1Hcm91cENvbmZpZykge1xuICByZXR1cm4gKFxuICAgIG9wdGlvbnMgJiZcbiAgICAoIWlzTnVsbE9yVW5kZWZpbmVkKG9wdGlvbnMudmFsaWRhdG9ycykgfHxcbiAgICAgICFpc051bGxPclVuZGVmaW5lZChvcHRpb25zLmFzeW5jVmFsaWRhdG9ycykgfHxcbiAgICAgICFpc051bGxPclVuZGVmaW5lZChvcHRpb25zLnVwZGF0ZU9uKSlcbiAgKTtcbn1cbiJdfQ==