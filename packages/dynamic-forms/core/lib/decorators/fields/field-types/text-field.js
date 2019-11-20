"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextField = TextField;

var _customFormField = require("./custom-form-field");

var _fieldType = require("../../../models/field-type");

function TextField() {
  return function (target, propertyKey) {
    return (0, _customFormField.customFormField)(_fieldType.FieldType.TEXT, target, propertyKey);
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZWNvcmF0b3JzL2ZpZWxkcy9maWVsZC10eXBlcy90ZXh0LWZpZWxkLnRzIl0sIm5hbWVzIjpbIlRleHRGaWVsZCIsInRhcmdldCIsInByb3BlcnR5S2V5IiwiRmllbGRUeXBlIiwiVEVYVCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRU8sU0FBU0EsU0FBVCxHQUFpRTtBQUN0RSxTQUFPLFVBQUNDLE1BQUQsRUFBY0MsV0FBZDtBQUFBLFdBQ0wsc0NBQWdCQyxxQkFBVUMsSUFBMUIsRUFBZ0NILE1BQWhDLEVBQXdDQyxXQUF4QyxDQURLO0FBQUEsR0FBUDtBQUVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3VzdG9tRm9ybUZpZWxkIH0gZnJvbSAnLi9jdXN0b20tZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvZmllbGQtdHlwZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBUZXh0RmllbGQoKTogKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nKSA9PiB2b2lkIHtcbiAgcmV0dXJuICh0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZykgPT5cbiAgICBjdXN0b21Gb3JtRmllbGQoRmllbGRUeXBlLlRFWFQsIHRhcmdldCwgcHJvcGVydHlLZXkpO1xufVxuIl19