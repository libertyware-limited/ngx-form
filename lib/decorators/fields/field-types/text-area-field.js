import { customFormField } from './custom-form-field';
import { FieldType } from '../../../models/field-type';
import { MetadataKeys } from '../../meta-keys';
export function Textareafield(options = { cols: 5, rows: 3 }) {
    return (target, propertyKey) => {
        customFormField(FieldType.TEXTAREA, target, propertyKey);
        Reflect.defineMetadata(MetadataKeys.TEXTAREA_OPTIONS, options, target, propertyKey);
    };
}
