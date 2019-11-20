import { customFormField } from './custom-form-field';
import { FieldType } from '../../../models/field-type';
export function TextField() {
    return (target, propertyKey) => customFormField(FieldType.TEXT, target, propertyKey);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1jb3JlLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9maWVsZHMvZmllbGQtdHlwZXMvdGV4dC1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXZELE1BQU0sVUFBVSxTQUFTO0lBQ3ZCLE9BQU8sQ0FBQyxNQUFXLEVBQUUsV0FBbUIsRUFBRSxFQUFFLENBQzFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN6RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3VzdG9tRm9ybUZpZWxkIH0gZnJvbSAnLi9jdXN0b20tZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvZmllbGQtdHlwZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBUZXh0RmllbGQoKTogKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nKSA9PiB2b2lkIHtcbiAgcmV0dXJuICh0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZykgPT5cbiAgICBjdXN0b21Gb3JtRmllbGQoRmllbGRUeXBlLlRFWFQsIHRhcmdldCwgcHJvcGVydHlLZXkpO1xufVxuIl19