import { MetadataKeys } from './decorators/meta-keys';
export const getFormFieldsOptions = (constructor) => {
    const target = new constructor();
    return (Reflect.getMetadata(MetadataKeys.FIELDS, target) || []).map((field) => Reflect.getMetadata(MetadataKeys.FORM_FIELD, target, field));
};
