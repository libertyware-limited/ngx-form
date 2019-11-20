import { MetadataKeys } from '../../meta-keys';
export function placeholder(placeholderText) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(MetadataKeys.PLACEHOLDER, placeholderText, target, propertyKey);
    };
}
