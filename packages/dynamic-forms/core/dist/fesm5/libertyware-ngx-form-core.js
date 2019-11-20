import 'reflect-metadata';
import { __extends, __spread, __awaiter, __generator } from 'tslib';
import { validate } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';

var MetadataKeys = {
    FORM_FIELD: 'LIBERTY_FORM_FIELD',
    FIELDS: 'LIBERTY_FORM_FIELDS',
    HINT: 'LIBERTY_HINT',
    DISPLAY_NAME: 'LIBERTY_DISPLAY_NAME',
    PLACEHOLDER: 'LIBERTY_PLACEHOLDER',
    RADIO_OPTIONS: 'LIBERTY_RADIO_OPTIONS',
    TEXTAREA_OPTIONS: 'LIBERTY_AREA_OPTIONS',
};

var typeTag = Symbol("type");
function dynamicForm() {
    // tslint:disable-next-line: only-arrow-functions
    return function (constructor) {
        var _a;
        return _a = /** @class */ (function (_super) {
                __extends(class_1, _super);
                function class_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                class_1[Symbol.hasInstance] = function (instance) {
                    return instance.constructor.__isDynamicFormModelInstance__ === typeTag;
                };
                class_1.prototype.getFormFields = function () {
                    var _this = this;
                    return (Reflect.getMetadata(MetadataKeys.FIELDS, this) || []).map(function (field) {
                        return Reflect.getMetadata(MetadataKeys.FORM_FIELD, _this, field);
                    });
                };
                return class_1;
            }(constructor)),
            // tslint:disable-next-line: variable-name
            _a.__isDynamicFormModelInstance__ = typeTag,
            _a;
    };
}

var customFormField = function (fieldType, target, propertyKey) {
    var internalOptions = {
        fieldType: fieldType,
        fieldName: propertyKey
    };
    Reflect.defineMetadata(MetadataKeys.FORM_FIELD, internalOptions, target, propertyKey);
    var fields = Reflect.getMetadata(MetadataKeys.FIELDS, target) || [];
    Reflect.defineMetadata(MetadataKeys.FIELDS, __spread(fields, [propertyKey]), target);
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
    return function (target, propertyKey) {
        return customFormField(FieldType.DATE, target, propertyKey);
    };
}

function formField(type) {
    return function (target, propertyKey) {
        return customFormField(type, target, propertyKey);
    };
}

function TextField() {
    return function (target, propertyKey) {
        return customFormField(FieldType.TEXT, target, propertyKey);
    };
}

function Textareafield(options) {
    if (options === void 0) { options = { cols: 5, rows: 3 }; }
    return function (target, propertyKey) {
        customFormField(FieldType.TEXTAREA, target, propertyKey);
        Reflect.defineMetadata(MetadataKeys.TEXTAREA_OPTIONS, options, target, propertyKey);
    };
}

function RadioField(options) {
    return function (target, propertyKey) {
        customFormField(FieldType.RADIO, target, propertyKey);
        Reflect.defineMetadata(MetadataKeys.RADIO_OPTIONS, options, target, propertyKey);
    };
}

function hint(hintText) {
    return function (target, propertyKey) {
        Reflect.defineMetadata(MetadataKeys.HINT, hintText, target, propertyKey);
    };
}

function placeholder(placeholderText) {
    return function (target, propertyKey) {
        Reflect.defineMetadata(MetadataKeys.PLACEHOLDER, placeholderText, target, propertyKey);
    };
}

function displayName(name) {
    return function (target, propertyKey) {
        Reflect.defineMetadata(MetadataKeys.DISPLAY_NAME, name, target, propertyKey);
    };
}

var FormGenModel = /** @class */ (function () {
    function FormGenModel(data) {
        plainToClassFromExist(this, data);
    }
    FormGenModel.prototype.isValid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, validate(this)];
                    case 1:
                        errors = _a.sent();
                        return [2 /*return*/, errors.length === 0];
                }
            });
        });
    };
    return FormGenModel;
}());

var getFormFieldsOptions = function (constructor) {
    var target = new constructor();
    return (Reflect.getMetadata(MetadataKeys.FIELDS, target) || []).map(function (field) {
        return Reflect.getMetadata(MetadataKeys.FORM_FIELD, target, field);
    });
};

/**
 * Generated bundle index. Do not edit.
 */

export { DateField, FieldType, FormGenModel, MetadataKeys, RadioField, TextField, Textareafield, displayName, dynamicForm, formField, getFormFieldsOptions, hint, placeholder };
//# sourceMappingURL=libertyware-ngx-form-core.js.map
