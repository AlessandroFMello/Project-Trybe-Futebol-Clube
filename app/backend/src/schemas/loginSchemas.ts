import Joi, { ObjectSchema } from 'joi';

const loginSchemas: ObjectSchema = Joi.object({
  email: Joi.string().required().messages({
    'any.required': '400|All fields must be filled',
    'string.base': '401|Incorrect email or password',
  }),

  password: Joi.string().min(7).required().messages({
    'any.required': '400|All fields must be filled',
    'string.base': '401|Incorrect email or password',
    'string.min': '401|String must be at least 7 characters long',
  }),
});

export default loginSchemas;
