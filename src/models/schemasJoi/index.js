const Joi = require("joi");

const schemaAll = Joi.object({
  size: Joi.number().integer().min(0).max(100),
  page: Joi.number().min(0),
  search: Joi.string(),
  filter: Joi.string(),
});

const schemaQUERY = Joi.object({
  size: Joi.number().integer().min(0).max(100),
  page: Joi.number().min(0),
  search: Joi.string().min(1).required(),
  filter: Joi.string().valid("to", "blockNumber", "hash", "from").required(),
});

module.exports = {
  schemaAll,
  schemaQUERY,
};
