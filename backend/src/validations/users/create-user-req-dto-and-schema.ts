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
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).options({
  abortEarly: false,
});