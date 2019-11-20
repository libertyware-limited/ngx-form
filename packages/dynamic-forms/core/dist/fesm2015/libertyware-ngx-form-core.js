import 'reflect-metadata';
import { __awaiter } from 'tslib';
import { validate } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';

const MetadataKeys = {
    FORM_FIELD: 'LIBERTY_FORM_FIELD',
    FIELDS: 'LIBERTY_FORM_FIELDS',
    HINT: 'LIBERTY_HINT',
    DISPLAY_NAME: 'LIBERTY_DISPLAY_NAME',
    PLACEHOLDER: 'LIBERTY_PLACEHOLDER',
    RADIO_OPTIONS: 'LIBERTY_RADIO_OPTIONS',
    TEXTAREA_OPTIONS: 'LIBERTY_AREA_OPTIONS',
};

const typeTag = Symbol("type");
function dynamicForm() {
    // tslint:disable-next-line: only-arrow-functions
    return function (constructor) {
        var _a;
        return _a = class extends constructor {
                static [Symbol.hasInstance](instance) {
                    return instance.constructor.__isDynamicFormModelInstance__ === typeTag;
                }
                getFormFields() {
                    return (Reflect.getMetadata(MetadataKeys.FIELDS, this) || []).map((field) => Reflect.getMetadata(MetadataKeys.FORM_FIELD, this, field));
                }
            },
            // tslint:disable-next-line: variable-name
            _a.__isDynamicFormModelInstance__ = typeTag,
            _a;
    };
}

const customFormField = (fieldType, target, propertyKey) => {
    const internalOptions = {
        fieldType,
        fieldName: propertyKey
    };
    Reflect.defineMetadata(MetadataKeys.FORM_FIELD, internalOptions, target, propertyKey);
    const fields = Reflect.getMetadata(MetadataKeys.FIELDS, target) || [];
    Reflect.defineMetadata(MetadataKeys.FIELDS, [...fields, propertyKey], target);
};

var FieldType;
(function (FieldType) {
    FieldType["TEXT"] = "TextInput";
    FieldType["SELECT"] = "SelectInput";
    FieldType["RADIO"] = "RadioInput";
    FieldType["TEXTAREA"] = "TextAreaInput";
    FieldType["DATE"] = "DateInput";
})(FieldType || (FieldType = {}));

function DateField() {
    return (target, propertyKey) => customFormField(FieldType.DATE, target, propertyKey);
}

function formField(type) {
    return (target, propertyKey) => customFormField(type, target, propertyKey);
}

function TextField() {
    return (target, propertyKey) => customFormField(FieldType.TEXT, target, propertyKey);
}

function Textareafield(options = { cols: 5, rows: 3 }) {
    return (target, propertyKey) => {
        customFormField(FieldType.TEXTAREA, target, propertyKey);
        Reflect.defineMetadata(MetadataKeys.TEXTAREA_OPTIONS, options, target, propertyKey);
    };
}

function RadioField(options) {
    return (target, propertyKey) => {
        customFormField(FieldType.RADIO, target, propertyKey);
        Reflect.defineMetadata(MetadataKeys.RADIO_OPTIONS, options, target, propertyKey);
    };
}

function hint(hintText) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(MetadataKeys.HINT, hintText, target, propertyKey);
    };
}

function placeholder(placeholderText) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(MetadataKeys.PLACEHOLDER, placeholderText, target, propertyKey);
    };
}

function displayName(name) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(MetadataKeys.DISPLAY_NAME, name, target, propertyKey);
    };
}

class FormGenModel {
    constructor(data) {
        plainToClassFromExist(this, data);
    }
    isValid() {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield validate(this);
            return errors.length === 0;
        });
    }
}

const getFormFieldsOptions = (constructor) => {
    const target = new constructor();
    return (Reflect.getMetadata(MetadataKeys.FIELDS, target) || []).map((field) => Reflect.getMetadata(MetadataKeys.FORM_FIELD, target, field));
};

/**
 * Generated bundle index. Do not edit.
 */

export { DateField, FieldType, FormGenModel, MetadataKeys, RadioField, TextField, Textareafield, displayName, dynamicForm, formField, getFormFieldsOptions, hint, placeholder };
//# sourceMappingURL=libertyware-ngx-form-core.js.map
