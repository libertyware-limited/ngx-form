import { customFormField } from './custom-form-field';
export function formField(type) {
    return (target, propertyKey) => customFormField(type, target, propertyKey);
}
