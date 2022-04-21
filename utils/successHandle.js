const successHandle = (res, headers, message, data = []) => {
  res.writeHead(200, headers);
  res.write(JSON.stringify(
    {
      status: true,
      message: message,
      data,
    }
  ));
  res.end();
}

module.exports = successHandle;