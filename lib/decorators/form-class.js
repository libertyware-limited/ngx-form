import { MetadataKeys } from "./meta-keys";
const typeTag = Symbol("type");
export function dynamicForm() {
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
