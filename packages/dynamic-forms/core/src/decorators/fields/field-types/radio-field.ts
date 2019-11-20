import { customFormField } from './custom-form-field';
import { FieldType } from '../../../models/field-type';
import { MetadataKeys } from '../../meta-keys';
import { RadioOption } from '../../../models/radio-options';

export function RadioField(
  options: RadioOption[]
): (target: any, propertyKey: string) => void {
  return (target: any, propertyKey: string) => {
    customFormField(FieldType.RADIO, target, propertyKey);
    Reflect.defineMetadata(
      MetadataKeys.RADIO_OPTIONS,
      options,
      target,
      propertyKey
    );
  };
}
