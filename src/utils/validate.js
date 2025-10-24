
import Joi from 'joi';

function validate(schema, payload) {
  const { error, value } = schema.validate(payload, { abortEarly: false });
  if (error) {
    const message = error.details?.length > 0 && error.details[0]?.message;
    const err = new Error("Validation error");
    err.status = 400;
    err.message = message;
    throw err;
  }
  return value;
}

export default validate;