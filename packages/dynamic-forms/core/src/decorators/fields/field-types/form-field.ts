import { customFormField } from './custom-form-field';

export function formField(
  type: string
): (target: any, propertyKey: string) => void {
  return (target: any, propertyKey: string) =>
    customFormField(type, target, propertyKey);
}
