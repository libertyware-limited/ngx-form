import * as tslib_1 from "tslib";
import { MetadataKeys } from "./meta-keys";
var typeTag = Symbol("type");
export function dynamicForm() {
    // tslint:disable-next-line: only-arrow-functions
    return function (constructor) {
        var _a;
        return _a = /** @class */ (function (_super) {
                tslib_1.__extends(class_1, _super);
                function class_1() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                class_1[Symbol.hasInstance] = function (instance) {
                    return instance.constructor.__isDynamicFormModelInstance__ === typeTag;
                };
                class_1.prototype.getFormFields = function () {
                    var _this = this;
                    return (Reflect.getMetadata(MetadataKeys.FIELDS, this) || []).map(function (field) {
                        return Reflect.getMetadata(MetadataKeys.FORM_FIELD, _this, field);
                    });
                };
                return class_1;
            }(constructor)),
            // tslint:disable-next-line: variable-name
            _a.__isDynamicFormModelInstance__ = typeTag,
            _a;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BsaWJlcnR5d2FyZS9uZ3gtZm9ybS1jb3JlLyIsInNvdXJjZXMiOlsiZGVjb3JhdG9ycy9mb3JtLWNsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRzNDLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUvQixNQUFNLFVBQVUsV0FBVztJQUN6QixpREFBaUQ7SUFDakQsT0FBTyxVQUErQyxXQUFjOztRQUNsRTtnQkFBcUIsbUNBQVc7Z0JBQXpCOztnQkFhUCxDQUFDO2dCQVZRLFFBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUEzQixVQUE0QixRQUErRTtvQkFDekcsT0FBTyxRQUFRLENBQUMsV0FBVyxDQUFDLDhCQUE4QixLQUFLLE9BQU8sQ0FBQztnQkFDekUsQ0FBQztnQkFFRCwrQkFBYSxHQUFiO29CQUFBLGlCQUtDO29CQUpDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUMvRCxVQUFDLEtBQWE7d0JBQ1osT0FBQSxPQUFPLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsS0FBSSxFQUFFLEtBQUssQ0FBQztvQkFBekQsQ0FBeUQsQ0FDNUQsQ0FBQztnQkFDSixDQUFDO2dCQUNILGNBQUM7WUFBRCxDQUFDLEFBYk0sQ0FBYyxXQUFXO1lBQzlCLDBDQUEwQztZQUNuQyxpQ0FBOEIsR0FBRyxPQUFRO2VBV2hEO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1ldGFkYXRhS2V5cyB9IGZyb20gXCIuL21ldGEta2V5c1wiO1xuaW1wb3J0IHsgV2lkZ2V0T3B0aW9ucyB9IGZyb20gXCIuLi9tb2RlbHMvd2lkZ2V0LW9wdGlvbnNcIjtcblxuY29uc3QgdHlwZVRhZyA9IFN5bWJvbChcInR5cGVcIik7XG5cbmV4cG9ydCBmdW5jdGlvbiBkeW5hbWljRm9ybSgpIHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBvbmx5LWFycm93LWZ1bmN0aW9uc1xuICByZXR1cm4gZnVuY3Rpb248VCBleHRlbmRzIG5ldyAoLi4uYXJnczogYW55W10pID0+IHt9Pihjb25zdHJ1Y3RvcjogVCkge1xuICAgIHJldHVybiBjbGFzcyBleHRlbmRzIGNvbnN0cnVjdG9yIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxuICAgICAgc3RhdGljIF9faXNEeW5hbWljRm9ybU1vZGVsSW5zdGFuY2VfXyA9IHR5cGVUYWc7XG4gICAgICBzdGF0aWMgW1N5bWJvbC5oYXNJbnN0YW5jZV0oaW5zdGFuY2U6IHsgY29uc3RydWN0b3I6IHsgX19pc0R5bmFtaWNGb3JtTW9kZWxJbnN0YW5jZV9fOiB0eXBlb2YgdHlwZVRhZzsgfTsgfSkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UuY29uc3RydWN0b3IuX19pc0R5bmFtaWNGb3JtTW9kZWxJbnN0YW5jZV9fID09PSB0eXBlVGFnO1xuICAgICAgfVxuXG4gICAgICBnZXRGb3JtRmllbGRzKCk6IFdpZGdldE9wdGlvbnNbXSB7XG4gICAgICAgIHJldHVybiAoUmVmbGVjdC5nZXRNZXRhZGF0YShNZXRhZGF0YUtleXMuRklFTERTLCB0aGlzKSB8fCBbXSkubWFwKFxuICAgICAgICAgIChmaWVsZDogc3RyaW5nKSA9PlxuICAgICAgICAgICAgUmVmbGVjdC5nZXRNZXRhZGF0YShNZXRhZGF0YUtleXMuRk9STV9GSUVMRCwgdGhpcywgZmllbGQpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==