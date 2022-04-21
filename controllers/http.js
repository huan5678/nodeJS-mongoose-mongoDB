const headers = require('../utils/headersHandle');

const httpController = {
  cors (res)
  {
      res.writeHead(200, headers);
      res.end();
  },
  notFound (res)
  {
    res.writeHead(404, headers);
      res.write(JSON.stringify(
        {
          status: true,
          message: '請檢查 API PATH 是否正確'
        }
      ));
      res.end();
  }
}

module.exports = httpController;