"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.materialDesignRenderOptions = void 0;

var _ngxFormCore = require("@libertyware/ngx-form-core");

var _inputField = require("./input-field.widget");

var _dateField = require("./date-field.widget");

var _radioField = require("./radio-field.widget");

var _textareaField = require("./textarea-field.widget");

var _materialDesignRender;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var materialDesignRenderOptions = (_materialDesignRender = {}, _defineProperty(_materialDesignRender, _ngxFormCore.FieldType.TEXT, _inputField.NgxMaterialInputWidget), _defineProperty(_materialDesignRender, _ngxFormCore.FieldType.RADIO, _radioField.NgxMaterialRadioWidget), _defineProperty(_materialDesignRender, _ngxFormCore.FieldType.DATE, _dateField.NgxMaterialDateWidget), _defineProperty(_materialDesignRender, _ngxFormCore.FieldType.TEXTAREA, _textareaField.NgxMaterialTextareaWidget), _materialDesignRender);
exports.materialDesignRenderOptions = materialDesignRenderOptions;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy93aWRnZXQtcHJlc2V0LnRzIl0sIm5hbWVzIjpbIm1hdGVyaWFsRGVzaWduUmVuZGVyT3B0aW9ucyIsIkZpZWxkVHlwZSIsIlRFWFQiLCJOZ3hNYXRlcmlhbElucHV0V2lkZ2V0IiwiUkFESU8iLCJOZ3hNYXRlcmlhbFJhZGlvV2lkZ2V0IiwiREFURSIsIk5neE1hdGVyaWFsRGF0ZVdpZGdldCIsIlRFWFRBUkVBIiwiTmd4TWF0ZXJpYWxUZXh0YXJlYVdpZGdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7QUFFTyxJQUFNQSwyQkFBMEMsdUVBQ3BEQyx1QkFBVUMsSUFEMEMsRUFDbkNDLGtDQURtQywwQ0FFcERGLHVCQUFVRyxLQUYwQyxFQUVsQ0Msa0NBRmtDLDBDQUdwREosdUJBQVVLLElBSDBDLEVBR25DQyxnQ0FIbUMsMENBSXBETix1QkFBVU8sUUFKMEMsRUFJL0JDLHdDQUorQix5QkFBaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZW5kZXJPcHRpb25zLCBGaWVsZFdpZGdldCB9IGZyb20gJ0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1nZW4nO1xuaW1wb3J0IHsgRmllbGRUeXBlIH0gZnJvbSAnQGxpYmVydHl3YXJlL25neC1mb3JtLWNvcmUnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxJbnB1dFdpZGdldCB9IGZyb20gJy4vaW5wdXQtZmllbGQud2lkZ2V0JztcbmltcG9ydCB7IE5neE1hdGVyaWFsRGF0ZVdpZGdldCB9IGZyb20gJy4vZGF0ZS1maWVsZC53aWRnZXQnO1xuaW1wb3J0IHsgTmd4TWF0ZXJpYWxSYWRpb1dpZGdldCB9IGZyb20gJy4vcmFkaW8tZmllbGQud2lkZ2V0JztcbmltcG9ydCB7IE5neE1hdGVyaWFsVGV4dGFyZWFXaWRnZXQgfSBmcm9tICcuL3RleHRhcmVhLWZpZWxkLndpZGdldCc7XG5cbmV4cG9ydCBjb25zdCBtYXRlcmlhbERlc2lnblJlbmRlck9wdGlvbnM6IFJlbmRlck9wdGlvbnMgPSB7XG4gIFtGaWVsZFR5cGUuVEVYVF06IE5neE1hdGVyaWFsSW5wdXRXaWRnZXQgYXMgdW5rbm93biBhcyBGaWVsZFdpZGdldCxcbiAgW0ZpZWxkVHlwZS5SQURJT106IE5neE1hdGVyaWFsUmFkaW9XaWRnZXQgYXMgdW5rbm93biBhcyBGaWVsZFdpZGdldCxcbiAgW0ZpZWxkVHlwZS5EQVRFXTogTmd4TWF0ZXJpYWxEYXRlV2lkZ2V0IGFzIHVua25vd24gYXMgRmllbGRXaWRnZXQsXG4gIFtGaWVsZFR5cGUuVEVYVEFSRUFdOiBOZ3hNYXRlcmlhbFRleHRhcmVhV2lkZ2V0IGFzIHVua25vd24gYXMgRmllbGRXaWRnZXQsXG59O1xuIl19