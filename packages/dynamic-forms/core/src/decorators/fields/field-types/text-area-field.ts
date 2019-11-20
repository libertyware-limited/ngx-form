import { customFormField } from './custom-form-field';
import { FieldType } from '../../../models/field-type';
import { MetadataKeys } from '../../meta-keys';
import { TextareaOption } from '../../../models/text-area';

export function Textareafield(
  options: TextareaOption = { cols: 5, rows: 3 }
): (target: any, propertyKey: string) => void {
  return (target: any, propertyKey: string) => {
    customFormField(FieldType.TEXTAREA, target, propertyKey);
    Reflect.defineMetadata(
      MetadataKeys.TEXTAREA_OPTIONS,
      options,
      target,
      propertyKey
    );
  };
}
