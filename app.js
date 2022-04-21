
require('./connections');

const post = require('./routers/post');

const app = async (req, res) => {
  post(req, res);
}

module.exports = app;
