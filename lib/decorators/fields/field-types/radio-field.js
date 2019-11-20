import { customFormField } from './custom-form-field';
import { FieldType } from '../../../models/field-type';
import { MetadataKeys } from '../../meta-keys';
export function RadioField(options) {
    return (target, propertyKey) => {
        customFormField(FieldType.RADIO, target, propertyKey);
        Reflect.defineMetadata(MetadataKeys.RADIO_OPTIONS, options, target, propertyKey);
    };
}
