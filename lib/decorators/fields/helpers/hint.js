import 'reflect-metadata';
import { MetadataKeys } from '../../meta-keys';
export function hint(hintText) {
    return (target, propertyKey) => {
        Reflect.defineMetadata(MetadataKeys.HINT, hintText, target, propertyKey);
    };
}
