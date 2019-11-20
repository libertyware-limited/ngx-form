"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZWNvcmF0b3JzL2ZpZWxkcy9maWVsZC10eXBlcy9jdXN0b20tZm9ybS1maWVsZC50cyJdLCJuYW1lcyI6WyJjdXN0b21Gb3JtRmllbGQiLCJmaWVsZFR5cGUiLCJ0YXJnZXQiLCJwcm9wZXJ0eUtleSIsImludGVybmFsT3B0aW9ucyIsImZpZWxkTmFtZSIsIlJlZmxlY3QiLCJkZWZpbmVNZXRhZGF0YSIsIk1ldGFkYXRhS2V5cyIsIkZPUk1fRklFTEQiLCJmaWVsZHMiLCJnZXRNZXRhZGF0YSIsIkZJRUxEUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNDLFNBQUQsRUFBb0JDLE1BQXBCLEVBQWlDQyxXQUFqQyxFQUF5RDtBQUN0RixNQUFNQyxlQUE4QixHQUFHO0FBQ3JDSCxJQUFBQSxTQUFTLEVBQVRBLFNBRHFDO0FBRXJDSSxJQUFBQSxTQUFTLEVBQUVGO0FBRjBCLEdBQXZDO0FBSUFHLEVBQUFBLE9BQU8sQ0FBQ0MsY0FBUixDQUNFQyx1QkFBYUMsVUFEZixFQUVFTCxlQUZGLEVBR0VGLE1BSEYsRUFJRUMsV0FKRjtBQU1BLE1BQU1PLE1BQU0sR0FBR0osT0FBTyxDQUFDSyxXQUFSLENBQW9CSCx1QkFBYUksTUFBakMsRUFBeUNWLE1BQXpDLEtBQW9ELEVBQW5FO0FBQ0FJLEVBQUFBLE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkMsdUJBQWFJLE1BQXBDLCtCQUFnREYsTUFBaEQsSUFBd0RQLFdBQXhELElBQXNFRCxNQUF0RTtBQUNELENBYk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3JlZmxlY3QtbWV0YWRhdGEnO1xuaW1wb3J0IHsgV2lkZ2V0T3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL21vZGVscy93aWRnZXQtb3B0aW9ucyc7XG5pbXBvcnQgeyBNZXRhZGF0YUtleXMgfSBmcm9tICcuLi8uLi9tZXRhLWtleXMnO1xuXG5leHBvcnQgY29uc3QgY3VzdG9tRm9ybUZpZWxkID0gKGZpZWxkVHlwZTogc3RyaW5nLCB0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZykgPT4ge1xuICBjb25zdCBpbnRlcm5hbE9wdGlvbnM6IFdpZGdldE9wdGlvbnMgPSB7XG4gICAgZmllbGRUeXBlLFxuICAgIGZpZWxkTmFtZTogcHJvcGVydHlLZXlcbiAgfTtcbiAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcbiAgICBNZXRhZGF0YUtleXMuRk9STV9GSUVMRCxcbiAgICBpbnRlcm5hbE9wdGlvbnMsXG4gICAgdGFyZ2V0LFxuICAgIHByb3BlcnR5S2V5XG4gICk7XG4gIGNvbnN0IGZpZWxkcyA9IFJlZmxlY3QuZ2V0TWV0YWRhdGEoTWV0YWRhdGFLZXlzLkZJRUxEUywgdGFyZ2V0KSB8fCBbXTtcbiAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShNZXRhZGF0YUtleXMuRklFTERTLCBbLi4uZmllbGRzLCBwcm9wZXJ0eUtleV0sIHRhcmdldCk7XG59O1xuIl19