import { customFormField } from './custom-form-field';
export function formField(type) {
    return (target, propertyKey) => customFormField(type, target, propertyKey);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1jb3JlLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9maWVsZHMvZmllbGQtdHlwZXMvZm9ybS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEQsTUFBTSxVQUFVLFNBQVMsQ0FDdkIsSUFBWTtJQUVaLE9BQU8sQ0FBQyxNQUFXLEVBQUUsV0FBbUIsRUFBRSxFQUFFLENBQzFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQy9DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjdXN0b21Gb3JtRmllbGQgfSBmcm9tICcuL2N1c3RvbS1mb3JtLWZpZWxkJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1GaWVsZChcbiAgdHlwZTogc3RyaW5nXG4pOiAodGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcpID0+IHZvaWQge1xuICByZXR1cm4gKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nKSA9PlxuICAgIGN1c3RvbUZvcm1GaWVsZCh0eXBlLCB0YXJnZXQsIHByb3BlcnR5S2V5KTtcbn1cbiJdfQ==