const { ValidationError } = require("../helpers/errors");

function validatorQuery(schema) {
  return (req, res, next) => {
    let {
      query: { filter, size, page, search },
    } = req;
    const data = { size, page, filter, search };
    const result = schema.validate(data);
    if (result.error) {
      const err = new ValidationError(result.error.details[0].message);
      next(err);
    }
    next();
  };
}

module.exports = { validatorQuery };
