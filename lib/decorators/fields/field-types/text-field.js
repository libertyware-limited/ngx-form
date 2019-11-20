import { customFormField } from './custom-form-field';
import { FieldType } from '../../../models/field-type';
export function TextField() {
    return (target, propertyKey) => customFormField(FieldType.TEXT, target, propertyKey);
}
