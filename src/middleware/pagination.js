const setDataPigination = async (req, res, next) => {
  const minSize = 10;
  const maxSize = 100;

  let {
    query: { size = minSize, page = 1 },
  } = req;
  size = size && size <= maxSize ? size : maxSize;
  page = page ? page : 1;
  req.size = +size;
  req.page = +page;
  return next();
};
module.exports = setDataPigination;
