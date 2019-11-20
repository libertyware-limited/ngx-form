import * as tslib_1 from "tslib";
import { FormControl } from '@angular/forms';
import { MetadataKeys } from '@libertyware/ngx-form-core';
var DynamicFormControl = /** @class */ (function (_super) {
    tslib_1.__extends(DynamicFormControl, _super);
    function DynamicFormControl(fieldDefinition) {
        var _this = _super.call(this, fieldDefinition.data, fieldDefinition.validationFunctions) || this;
        _this.validationDefinitions = fieldDefinition.validationDefinitions;
        return _this;
    }
    Object.defineProperty(DynamicFormControl.prototype, "formModel", {
        get: function () {
            return this.parent.object;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControl.prototype, "hint", {
        get: function () {
            return this.metaData(MetadataKeys.HINT);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControl.prototype, "readableName", {
        get: function () {
            return this.metaData(MetadataKeys.DISPLAY_NAME) || this.ControlName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControl.prototype, "placeholder", {
        get: function () {
            return this.metaData(MetadataKeys.PLACEHOLDER);
        },
        enumerable: true,
        configurable: true
    });
    DynamicFormControl.prototype.metaData = function (key) {
        return Reflect.getMetadata(key, this.formModel, this.ControlName);
    };
    Object.defineProperty(DynamicFormControl.prototype, "ControlName", {
        get: function () {
            var _this = this;
            var controls = this.parent.controls;
            return Object.keys(controls).find(function (name) { return _this === controls[name]; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControl.prototype, "radioOptions", {
        get: function () {
            return this.metaData(MetadataKeys.RADIO_OPTIONS) || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DynamicFormControl.prototype, "textareaOptions", {
        get: function () {
            return this.metaData(MetadataKeys.TEXTAREA_OPTIONS);
        },
        enumerable: true,
        configurable: true
    });
    return DynamicFormControl;
}(FormControl));
export { DynamicFormControl };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLWNvbnRyb2wuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbGliZXJ0eXdhcmUvbmd4LWZvcm0tYnVpbGRlci8iLCJzb3VyY2VzIjpbInV0aWxzL2R5bmFtaWMtZm9ybS1jb250cm9sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLFlBQVksRUFBK0IsTUFBTSw0QkFBNEIsQ0FBQztBQUt2RjtJQUF3Qyw4Q0FBVztJQUdqRCw0QkFBWSxlQUFzQztRQUFsRCxZQUNFLGtCQUFNLGVBQWUsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLG1CQUFtQixDQUFDLFNBR2pFO1FBREMsS0FBSSxDQUFDLHFCQUFxQixHQUFHLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQzs7SUFDckUsQ0FBQztJQUVELHNCQUFZLHlDQUFTO2FBQXJCO1lBQ0UsT0FBUSxJQUFJLENBQUMsTUFBZ0MsQ0FBQyxNQUFNLENBQUM7UUFDdkQsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxvQ0FBSTthQUFSO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDRDQUFZO2FBQWhCO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3RFLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMkNBQVc7YUFBZjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsQ0FBQzs7O09BQUE7SUFFTyxxQ0FBUSxHQUFoQixVQUFpQixHQUFXO1FBQzFCLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELHNCQUFJLDJDQUFXO2FBQWY7WUFBQSxpQkFHQztZQUZDLElBQU0sUUFBUSxHQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQzNDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxFQUF2QixDQUF1QixDQUFXLENBQUM7UUFDL0UsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw0Q0FBWTthQUFoQjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pELENBQUM7OztPQUFBO0lBRUQsc0JBQUksK0NBQWU7YUFBbkI7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdEQsQ0FBQzs7O09BQUE7SUFDSCx5QkFBQztBQUFELENBQUMsQUExQ0QsQ0FBd0MsV0FBVyxHQTBDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFZhbGlkYXRpb25NZXRhZGF0YSB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvci9tZXRhZGF0YS9WYWxpZGF0aW9uTWV0YWRhdGEnO1xuaW1wb3J0IHsgTWV0YWRhdGFLZXlzLCBSYWRpb09wdGlvbiwgVGV4dGFyZWFPcHRpb24gfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tY29yZSc7XG5cbmltcG9ydCB7IER5bmFtaWNGb3JtR3JvdXBGaWVsZCB9IGZyb20gJy4uL21vZGVscy9keW5hbWljLWZvcm0tZ3JvdXAtZmllbGQnO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm1Hcm91cCB9IGZyb20gJy4vZHluYW1pYy1mb3JtLWdyb3VwJztcblxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtQ29udHJvbCBleHRlbmRzIEZvcm1Db250cm9sIHtcbiAgcHVibGljIHZhbGlkYXRpb25EZWZpbml0aW9uczogVmFsaWRhdGlvbk1ldGFkYXRhW107XG5cbiAgY29uc3RydWN0b3IoZmllbGREZWZpbml0aW9uOiBEeW5hbWljRm9ybUdyb3VwRmllbGQpIHtcbiAgICBzdXBlcihmaWVsZERlZmluaXRpb24uZGF0YSwgZmllbGREZWZpbml0aW9uLnZhbGlkYXRpb25GdW5jdGlvbnMpO1xuXG4gICAgdGhpcy52YWxpZGF0aW9uRGVmaW5pdGlvbnMgPSBmaWVsZERlZmluaXRpb24udmFsaWRhdGlvbkRlZmluaXRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgZm9ybU1vZGVsKCk6IGFueSB7XG4gICAgcmV0dXJuICh0aGlzLnBhcmVudCBhcyBEeW5hbWljRm9ybUdyb3VwPGFueT4pLm9iamVjdDtcbiAgfVxuXG5cbiAgZ2V0IGhpbnQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5tZXRhRGF0YShNZXRhZGF0YUtleXMuSElOVCk7XG4gIH1cblxuICBnZXQgcmVhZGFibGVOYW1lKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMubWV0YURhdGEoTWV0YWRhdGFLZXlzLkRJU1BMQVlfTkFNRSkgfHwgdGhpcy5Db250cm9sTmFtZTtcbiAgfVxuXG4gIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1ldGFEYXRhKE1ldGFkYXRhS2V5cy5QTEFDRUhPTERFUik7XG4gIH1cblxuICBwcml2YXRlIG1ldGFEYXRhKGtleTogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gUmVmbGVjdC5nZXRNZXRhZGF0YShrZXksIHRoaXMuZm9ybU1vZGVsLCB0aGlzLkNvbnRyb2xOYW1lKTtcbiAgfVxuXG4gIGdldCBDb250cm9sTmFtZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvbnRyb2xzOiBhbnkgPSB0aGlzLnBhcmVudC5jb250cm9scztcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoY29udHJvbHMpLmZpbmQobmFtZSA9PiB0aGlzID09PSBjb250cm9sc1tuYW1lXSkgYXMgc3RyaW5nO1xuICB9XG5cbiAgZ2V0IHJhZGlvT3B0aW9ucygpOiBSYWRpb09wdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5tZXRhRGF0YShNZXRhZGF0YUtleXMuUkFESU9fT1BUSU9OUykgfHwgW107XG4gIH1cblxuICBnZXQgdGV4dGFyZWFPcHRpb25zKCk6IFRleHRhcmVhT3B0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5tZXRhRGF0YShNZXRhZGF0YUtleXMuVEVYVEFSRUFfT1BUSU9OUyk7XG4gIH1cbn1cbiJdfQ==