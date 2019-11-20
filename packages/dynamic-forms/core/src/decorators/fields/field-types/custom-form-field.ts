import { WidgetOptions } from '../../../models/widget-options';
import { MetadataKeys } from '../../meta-keys';

export const customFormField = (fieldType: string, target: any, propertyKey: string) => {
  const internalOptions: WidgetOptions = {
    fieldType,
    fieldName: propertyKey
  };
  Reflect.defineMetadata(
    MetadataKeys.FORM_FIELD,
    internalOptions,
    target,
    propertyKey
  );
  const fields = Reflect.getMetadata(MetadataKeys.FIELDS, target) || [];
  Reflect.defineMetadata(MetadataKeys.FIELDS, [...fields, propertyKey], target);
};
