import { customFormField } from './custom-form-field';
import { FieldType } from '../../../models/field-type';

export function DateField(): (target: any, propertyKey: string) => void {
  return (target: any, propertyKey: string) =>
    customFormField(FieldType.DATE, target, propertyKey);
}
