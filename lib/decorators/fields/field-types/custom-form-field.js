import { MetadataKeys } from '../../meta-keys';
export const customFormField = (fieldType, target, propertyKey) => {
    const internalOptions = {
        fieldType,
        fieldName: propertyKey
    };
    Reflect.defineMetadata(MetadataKeys.FORM_FIELD, internalOptions, target, propertyKey);
    const fields = Reflect.getMetadata(MetadataKeys.FIELDS, target) || [];
    Reflect.defineMetadata(MetadataKeys.FIELDS, [...fields, propertyKey], target);
};
