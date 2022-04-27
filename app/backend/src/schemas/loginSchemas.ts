import Joi, { ObjectSchema } from 'joi';

const error401 = '401|Incorrect email or password';

const loginSchemas: ObjectSchema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': '400|All fields must be filled',
    'string.base': error401,
  }),

  password: Joi.string().min(7).required().messages({
    'any.required': '400|All fields must be filled',
    'string.base': error401,
    'string.min': error401,
  }),
});

export default loginSchemas;
