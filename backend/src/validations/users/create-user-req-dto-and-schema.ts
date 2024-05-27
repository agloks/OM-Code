import * as Joi from 'joi';

export class CreateUserReqDto {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly password: string;

  constructor(createUserReq: CreateUserReqDto) {
    if (!!createUserReq) {
      this.firstname = createUserReq.firstname;
      this.lastname = createUserReq.lastname;
      this.email = createUserReq.email;
      this.password = createUserReq.password;
    }
  }
}

export const CreateUserReqSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).options({
  abortEarly: false,
});