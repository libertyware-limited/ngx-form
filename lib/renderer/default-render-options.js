import { FieldType } from '../../models';
import { GovukInputWidget } from '../widgets/input-field.widget';
import { GovukRadioWidget, GovukTextareaWidget } from '../widgets';
import { GovukDateWidget } from '../widgets/date-field.widget';
export const defaultRenderOptions = {
    [FieldType.TEXT]: GovukInputWidget,
    [FieldType.RADIO]: GovukRadioWidget,
    [FieldType.DATE]: GovukDateWidget,
    [FieldType.TEXTAREA]: GovukTextareaWidget,
};
