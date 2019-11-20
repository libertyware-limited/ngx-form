import * as tslib_1 from "tslib";
import { validate } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';
export class FormGenModel {
    constructor(data) {
        plainToClassFromExist(this, data);
    }
    isValid() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const errors = yield validate(this);
            return errors.length === 0;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1nZW4tbW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbGliZXJ0eXdhcmUvbmd4LWZvcm0tY29yZS8iLCJzb3VyY2VzIjpbIm1vZGVscy9mb3JtLWdlbi1tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTFELE1BQU0sT0FBZ0IsWUFBWTtJQUNoQyxZQUFZLElBQVU7UUFDcEIscUJBQXFCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDSyxPQUFPOztZQUNYLE1BQU0sTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQztLQUFBO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2YWxpZGF0ZSB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XG5pbXBvcnQgeyBwbGFpblRvQ2xhc3NGcm9tRXhpc3QgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGb3JtR2VuTW9kZWwge1xuICBjb25zdHJ1Y3RvcihkYXRhPzogYW55KSB7XG4gICAgcGxhaW5Ub0NsYXNzRnJvbUV4aXN0KHRoaXMsIGRhdGEpO1xuICB9XG4gIGFzeW5jIGlzVmFsaWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgZXJyb3JzID0gYXdhaXQgdmFsaWRhdGUodGhpcyk7XG4gICAgcmV0dXJuIGVycm9ycy5sZW5ndGggPT09IDA7XG4gIH1cbn1cbiJdfQ==