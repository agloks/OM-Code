import * as Joi from 'joi';

export class UpdateUserReqDto {
  readonly id: number;
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly password: string;

  constructor(updateUserReq: UpdateUserReqDto) {
    if (!!updateUserReq) {
      this.id = updateUserReq.id;
      this.firstname = updateUserReq.firstname;
      this.lastname = updateUserReq.lastname;
      this.email = updateUserReq.email;
      this.password = updateUserReq.password;
    }
  }
}

export const UpdateUserReqSchema = Joi.object({
  id: Joi.number().required(),
  firstName: Joi.string().min(2),
  lastName: Joi.string().min(2),
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
}).options({
  abortEarly: false,
});