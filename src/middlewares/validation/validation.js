const {errorResponse} = require('../../helpers');

const validation = (schema) => {
  return (req, res, next) => {
    const {error} = schema.validate(req.body);
    if (error) {
      return errorResponse(req, res, 'Validation error', 406, error.message);
    }
    return next();
  };
};

module.exports = {validation};
