import { customFormField } from './custom-form-field';
import { FieldType } from '../../../models/field-type';
export function DateField() {
    return (target, propertyKey) => customFormField(FieldType.DATE, target, propertyKey);
}
