import { MetadataKeys } from '../../meta-keys';

export function hint(
  hintText: string
): (target: any, propertyKey: string) => void {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(
      MetadataKeys.HINT,
      hintText,
      target,
      propertyKey
    );
  };
}
