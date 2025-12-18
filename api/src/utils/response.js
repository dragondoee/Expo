exports.error = (res, status = 500, template) => {
  return res.status(status).send({
    ok: false,
    code: template.code,
    message: template.message,
  });
};
