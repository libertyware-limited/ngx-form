"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customFormField = void 0;

require("reflect-metadata");

var _metaKeys = require("../../meta-keys");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var customFormField = function customFormField(fieldType, target, propertyKey) {
  var internalOptions = {
    fieldType: fieldType,
    fieldName: propertyKey
  };
  Reflect.defineMetadata(_metaKeys.MetadataKeys.FORM_FIELD, internalOptions, target, propertyKey);
  var fields = Reflect.getMetadata(_metaKeys.MetadataKeys.FIELDS, target) || [];
  Reflect.defineMetadata(_metaKeys.MetadataKeys.FIELDS, [].concat(_toConsumableArray(fields), [propertyKey]), target);
};

exports.customFormField = customFormField;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZWNvcmF0b3JzL2ZpZWxkcy9maWVsZC10eXBlcy9jdXN0b20tZm9ybS1maWVsZC50cyJdLCJuYW1lcyI6WyJjdXN0b21Gb3JtRmllbGQiLCJmaWVsZFR5cGUiLCJ0YXJnZXQiLCJwcm9wZXJ0eUtleSIsImludGVybmFsT3B0aW9ucyIsImZpZWxkTmFtZSIsIlJlZmxlY3QiLCJkZWZpbmVNZXRhZGF0YSIsIk1ldGFkYXRhS2V5cyIsIkZPUk1fRklFTEQiLCJmaWVsZHMiLCJnZXRNZXRhZGF0YSIsIkZJRUxEUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOzs7Ozs7Ozs7O0FBRU8sSUFBTUEsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDQyxTQUFELEVBQW9CQyxNQUFwQixFQUFpQ0MsV0FBakMsRUFBeUQ7QUFDdEYsTUFBTUMsZUFBOEIsR0FBRztBQUNyQ0gsSUFBQUEsU0FBUyxFQUFUQSxTQURxQztBQUVyQ0ksSUFBQUEsU0FBUyxFQUFFRjtBQUYwQixHQUF2QztBQUlBRyxFQUFBQSxPQUFPLENBQUNDLGNBQVIsQ0FDRUMsdUJBQWFDLFVBRGYsRUFFRUwsZUFGRixFQUdFRixNQUhGLEVBSUVDLFdBSkY7QUFNQSxNQUFNTyxNQUFNLEdBQUdKLE9BQU8sQ0FBQ0ssV0FBUixDQUFvQkgsdUJBQWFJLE1BQWpDLEVBQXlDVixNQUF6QyxLQUFvRCxFQUFuRTtBQUNBSSxFQUFBQSxPQUFPLENBQUNDLGNBQVIsQ0FBdUJDLHVCQUFhSSxNQUFwQywrQkFBZ0RGLE1BQWhELElBQXdEUCxXQUF4RCxJQUFzRUQsTUFBdEU7QUFDRCxDQWJNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcbmltcG9ydCB7IFdpZGdldE9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvd2lkZ2V0LW9wdGlvbnMnO1xuaW1wb3J0IHsgTWV0YWRhdGFLZXlzIH0gZnJvbSAnLi4vLi4vbWV0YS1rZXlzJztcblxuZXhwb3J0IGNvbnN0IGN1c3RvbUZvcm1GaWVsZCA9IChmaWVsZFR5cGU6IHN0cmluZywgdGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcpID0+IHtcbiAgY29uc3QgaW50ZXJuYWxPcHRpb25zOiBXaWRnZXRPcHRpb25zID0ge1xuICAgIGZpZWxkVHlwZSxcbiAgICBmaWVsZE5hbWU6IHByb3BlcnR5S2V5XG4gIH07XG4gIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXG4gICAgTWV0YWRhdGFLZXlzLkZPUk1fRklFTEQsXG4gICAgaW50ZXJuYWxPcHRpb25zLFxuICAgIHRhcmdldCxcbiAgICBwcm9wZXJ0eUtleVxuICApO1xuICBjb25zdCBmaWVsZHMgPSBSZWZsZWN0LmdldE1ldGFkYXRhKE1ldGFkYXRhS2V5cy5GSUVMRFMsIHRhcmdldCkgfHwgW107XG4gIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoTWV0YWRhdGFLZXlzLkZJRUxEUywgWy4uLmZpZWxkcywgcHJvcGVydHlLZXldLCB0YXJnZXQpO1xufTtcbiJdfQ==