import * as tslib_1 from "tslib";
import { validate } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';
var FormGenModel = /** @class */ (function () {
    function FormGenModel(data) {
        plainToClassFromExist(this, data);
    }
    FormGenModel.prototype.isValid = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var errors;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, validate(this)];
                    case 1:
                        errors = _a.sent();
                        return [2 /*return*/, errors.length === 0];
                }
            });
        });
    };
    return FormGenModel;
}());
export { FormGenModel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW4tbW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbGliZXJ0eXdhcmUvbmd4LWZvcm0tY29yZS8iLCJzb3VyY2VzIjpbIm1vZGVscy9mb3JtLWdlbi1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFEO0lBQ0Usc0JBQVksSUFBVTtRQUNwQixxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNLLDhCQUFPLEdBQWI7Ozs7OzRCQUNpQixxQkFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUE3QixNQUFNLEdBQUcsU0FBb0I7d0JBQ25DLHNCQUFPLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFDOzs7O0tBQzVCO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHZhbGlkYXRlIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcbmltcG9ydCB7IHBsYWluVG9DbGFzc0Zyb21FeGlzdCB9IGZyb20gJ2NsYXNzLXRyYW5zZm9ybWVyJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZvcm1HZW5Nb2RlbCB7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBhbnkpIHtcbiAgICBwbGFpblRvQ2xhc3NGcm9tRXhpc3QodGhpcywgZGF0YSk7XG4gIH1cbiAgYXN5bmMgaXNWYWxpZCgpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBlcnJvcnMgPSBhd2FpdCB2YWxpZGF0ZSh0aGlzKTtcbiAgICByZXR1cm4gZXJyb3JzLmxlbmd0aCA9PT0gMDtcbiAgfVxufVxuIl19