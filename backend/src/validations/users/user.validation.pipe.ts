import { PipeTransform, BadRequestException } from '@nestjs/common';
import Joi from 'joi';

export class CreateUserValidatorPipe<Dto> implements PipeTransform<Dto> {
  constructor(private schema: Joi.ObjectSchema<any>) {}
  public transform(value: Dto): Dto {
    const result = this.schema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
export class UpdateUserValidatorPipe<Dto> implements PipeTransform<Dto> {
  constructor(private schema: Joi.ObjectSchema<any>) {}
  public transform(value: Dto): Dto {
    const result = this.schema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}