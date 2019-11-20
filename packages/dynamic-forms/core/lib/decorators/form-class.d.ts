import { WidgetOptions } from "../models/widget-options";
declare const typeTag: unique symbol;
export declare function dynamicForm(): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        getFormFields(): WidgetOptions[];
    };
    __isDynamicFormModelInstance__: symbol;
    [Symbol.hasInstance](instance: {
        constructor: {
            __isDynamicFormModelInstance__: typeof typeTag;
        };
    }): boolean;
} & T;
export {};
