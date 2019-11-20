import { MetadataKeys } from '../../meta-keys';

export function placeholder(
  placeholderText: string
): (target: any, propertyKey: string) => void {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(
      MetadataKeys.PLACEHOLDER,
      placeholderText,
      target,
      propertyKey
    );
  };
}
