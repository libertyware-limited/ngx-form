import { MetadataKeys } from '../../meta-keys';

export function displayName(
  name: string
): (target: any, propertyKey: string) => void {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(
      MetadataKeys.DISPLAY_NAME,
      name,
      target,
      propertyKey
    );
  };
}
