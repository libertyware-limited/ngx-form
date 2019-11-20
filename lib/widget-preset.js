import { FieldType } from '@libertyware/ngx-form-core';
import { NgxMaterialInputWidget } from './input-field.widget';
import { NgxMaterialDateWidget } from './date-field.widget';
import { NgxMaterialRadioWidget } from './radio-field.widget';
import { NgxMaterialTextareaWidget } from './textarea-field.widget';
export const materialDesignRenderOptions = {
    [FieldType.TEXT]: NgxMaterialInputWidget,
    [FieldType.RADIO]: NgxMaterialRadioWidget,
    [FieldType.DATE]: NgxMaterialDateWidget,
    [FieldType.TEXTAREA]: NgxMaterialTextareaWidget,
};
