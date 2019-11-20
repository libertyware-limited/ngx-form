import { WidgetOptions } from './widget-options';

export interface DynamicForm {
  getFormFields(): WidgetOptions[];
}
