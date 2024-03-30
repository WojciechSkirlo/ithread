async function signUp(req, res, next) {
  try {
    //   res.json(await programmingLanguages.getMultiple(req.query.page));
    res.json({});
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}

module.exports = {
  signUp
};
