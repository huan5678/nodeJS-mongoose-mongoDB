const errorHandle = (res, headers, err) => {
  res.writeHead(400, headers);
  res.write(JSON.stringify(
    {
      status: false,
      message: '請檢查欄位，或是檢查 ID 是否正確',
      error: err
    }
  ));
  res.end();
}

module.exports = errorHandle;