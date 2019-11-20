import { validate } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';
export class FormGenModel {
    constructor(data) {
        plainToClassFromExist(this, data);
    }
    async isValid() {
        const errors = await validate(this);
        return errors.length === 0;
    }
}
