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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZWNvcmF0b3JzL2ZpZWxkcy9maWVsZC10eXBlcy9jdXN0b20tZm9ybS1maWVsZC50cyJdLCJuYW1lcyI6WyJjdXN0b21Gb3JtRmllbGQiLCJmaWVsZFR5cGUiLCJ0YXJnZXQiLCJwcm9wZXJ0eUtleSIsImludGVybmFsT3B0aW9ucyIsImZpZWxkTmFtZSIsIlJlZmxlY3QiLCJkZWZpbmVNZXRhZGF0YSIsIk1ldGFkYXRhS2V5cyIsIkZPUk1fRklFTEQiLCJmaWVsZHMiLCJnZXRNZXRhZGF0YSIsIkZJRUxEUyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFTyxJQUFNQSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNDLFNBQUQsRUFBb0JDLE1BQXBCLEVBQWlDQyxXQUFqQyxFQUF5RDtBQUN0RixNQUFNQyxlQUE4QixHQUFHO0FBQ3JDSCxJQUFBQSxTQUFTLEVBQVRBLFNBRHFDO0FBRXJDSSxJQUFBQSxTQUFTLEVBQUVGO0FBRjBCLEdBQXZDO0FBSUFHLEVBQUFBLE9BQU8sQ0FBQ0MsY0FBUixDQUNFQyx1QkFBYUMsVUFEZixFQUVFTCxlQUZGLEVBR0VGLE1BSEYsRUFJRUMsV0FKRjtBQU1BLE1BQU1PLE1BQU0sR0FBR0osT0FBTyxDQUFDSyxXQUFSLENBQW9CSCx1QkFBYUksTUFBakMsRUFBeUNWLE1BQXpDLEtBQW9ELEVBQW5FO0FBQ0FJLEVBQUFBLE9BQU8sQ0FBQ0MsY0FBUixDQUF1QkMsdUJBQWFJLE1BQXBDLCtCQUFnREYsTUFBaEQsSUFBd0RQLFdBQXhELElBQXNFRCxNQUF0RTtBQUNELENBYk0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBXaWRnZXRPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vbW9kZWxzL3dpZGdldC1vcHRpb25zJztcbmltcG9ydCB7IE1ldGFkYXRhS2V5cyB9IGZyb20gJy4uLy4uL21ldGEta2V5cyc7XG5cbmV4cG9ydCBjb25zdCBjdXN0b21Gb3JtRmllbGQgPSAoZmllbGRUeXBlOiBzdHJpbmcsIHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IGludGVybmFsT3B0aW9uczogV2lkZ2V0T3B0aW9ucyA9IHtcbiAgICBmaWVsZFR5cGUsXG4gICAgZmllbGROYW1lOiBwcm9wZXJ0eUtleVxuICB9O1xuICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKFxuICAgIE1ldGFkYXRhS2V5cy5GT1JNX0ZJRUxELFxuICAgIGludGVybmFsT3B0aW9ucyxcbiAgICB0YXJnZXQsXG4gICAgcHJvcGVydHlLZXlcbiAgKTtcbiAgY29uc3QgZmllbGRzID0gUmVmbGVjdC5nZXRNZXRhZGF0YShNZXRhZGF0YUtleXMuRklFTERTLCB0YXJnZXQpIHx8IFtdO1xuICBSZWZsZWN0LmRlZmluZU1ldGFkYXRhKE1ldGFkYXRhS2V5cy5GSUVMRFMsIFsuLi5maWVsZHMsIHByb3BlcnR5S2V5XSwgdGFyZ2V0KTtcbn07XG4iXX0=