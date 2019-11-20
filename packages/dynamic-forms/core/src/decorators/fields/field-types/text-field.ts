import { customFormField } from './custom-form-field';
import { FieldType } from '../../../models/field-type';

export function TextField(): (target: any, propertyKey: string) => void {
  return (target: any, propertyKey: string) =>
    customFormField(FieldType.TEXT, target, propertyKey);
}
