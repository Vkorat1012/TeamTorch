// eslint-disable-next-line max-len
exports.errorResponse = (_, res, errorMessage = 'Something went wrong', code = 500, error = {}) =>
  res.status(code).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });

exports.successResponse = (_req, res, data, code = 200) =>
  res.send({
    code,
    data,
    success: true,
  });
