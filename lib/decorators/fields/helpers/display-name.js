import 'reflect-metadata';
import { MetadataKeys } from '../../meta-keys';
export function displayName(name) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(MetadataKeys.DISPLAY_NAME, name, target, propertyKey);
    };
}
