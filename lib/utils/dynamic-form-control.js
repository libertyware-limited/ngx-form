import { FormControl } from '@angular/forms';
import { MetadataKeys } from '@oop-dynmic-forms/core';
export class DynamicFormControl extends FormControl {
    constructor(fieldDefinition) {
        super(fieldDefinition.data, fieldDefinition.validationFunctions);
        this.validationDefinitions = fieldDefinition.validationDefinitions;
    }
    get formModel() {
        return this.parent.object;
    }
    get hint() {
        return this.metaData(MetadataKeys.HINT);
    }
    get readableName() {
        return this.metaData(MetadataKeys.DISPLAY_NAME) || this.ControlName;
    }
    get placeholder() {
        return this.metaData(MetadataKeys.PLACEHOLDER);
    }
    metaData(key) {
        return Reflect.getMetadata(key, this.formModel, this.ControlName);
    }
    get ControlName() {
        const controls = this.parent.controls;
        return Object.keys(controls).find(name => this === controls[name]);
    }
    get radioOptions() {
        return this.metaData(MetadataKeys.RADIO_OPTIONS) || [];
    }
    get textareaOptions() {
        return this.metaData(MetadataKeys.TEXTAREA_OPTIONS);
    }
}
