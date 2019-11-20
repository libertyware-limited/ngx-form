import { MetadataKeys } from "./meta-keys";
import { WidgetOptions } from "../models/widget-options";

const typeTag = Symbol("type");

export function dynamicForm() {
  // tslint:disable-next-line: only-arrow-functions
  return function<T extends new (...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
      // tslint:disable-next-line: variable-name
      static __isDynamicFormModelInstance__ = typeTag;
      static [Symbol.hasInstance](instance: { constructor: { __isDynamicFormModelInstance__: typeof typeTag; }; }) {
        return instance.constructor.__isDynamicFormModelInstance__ === typeTag;
      }

      getFormFields(): WidgetOptions[] {
        return (Reflect.getMetadata(MetadataKeys.FIELDS, this) || []).map(
          (field: string) =>
            Reflect.getMetadata(MetadataKeys.FORM_FIELD, this, field)
        );
      }
    };
  };
}
