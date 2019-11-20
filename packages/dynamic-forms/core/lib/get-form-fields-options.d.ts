import { WidgetOptions } from './models/widget-options';
export declare const getFormFieldsOptions: <T extends new (...args: any[]) => {}>(constructor: T) => WidgetOptions[];
