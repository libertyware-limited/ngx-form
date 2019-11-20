import { WidgetOptions } from './models/widget-options';
import { MetadataKeys } from './decorators/meta-keys';

export const getFormFieldsOptions = <T extends new (...args: any[]) => {}>(
  constructor: T
): WidgetOptions[] => {
  const target = new constructor();
  return (Reflect.getMetadata(MetadataKeys.FIELDS, target) || []).map((field: string) =>
    Reflect.getMetadata(MetadataKeys.FORM_FIELD, target, field)
  );
};
