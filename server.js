const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Post = require('./models/post');
dotenv.config({ path: './.env' });
const errorHandle = require('./utils/errorHandle');
const successHandle = require('./utils/successHandle');

const DB_Password = process.env.DATABASE_PASSWORD;
const DB = process.env.DATABASE_PATH.replace('<password>', DB_Password);

const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
}

mongoose.connect(DB)
  .then(() => console.log('資料庫連線成功'))
  .catch(err => console.log(err));

const httpRequestListener = async (req, res) => {
  let body = '';
  req.on('data', (chunk) => body += chunk)
  if (req.url === '/post') {
    switch (req.method) {
      case 'GET':
        const getAllPosts = await Post.find();
        successHandle(res, headers, '成功取得所有貼文', getAllPosts)
        break;
      case 'POST':
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            await Post.create(data);
            const getAllPosts = await Post.find();
            successHandle(res, headers, '成功新增一則貼文', getAllPosts)
          } catch (err) {
            errorHandle(res, headers, err)
          }
        })
        break;
      case 'DELETE':
        await Post.deleteMany({})
        successHandle(res, headers, '成功刪除全部貼文')
        break;
    }
  } else if (req.url.startsWith('/post/')) {
    switch (req.method) {
      case 'PATCH':
        req.on('end', async () => {
          try {
            const id = req.url.split('/').pop();
            const data = JSON.parse(body);
            await Post.findByIdAndUpdate(id, data);
            const getAllPosts = await Post.find();
            successHandle(res, headers, '成功更新一則貼文', getAllPosts)
          } catch (err) {
            errorHandle(res, headers, err)
          }
        })
        break;
      case 'DELETE':
        req.on('end', async () => {
          try {
            const id = req.url.split('/').pop();
            await Post.findByIdAndDelete(id);
            const getAllPosts = await Post.find();
            successHandle(res, headers, '成功刪除該則貼文', getAllPosts)
          } catch (err) {
            errorHandle(res, headers, err)
          }
        })
    }
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } else {
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



const server = http.createServer(httpRequestListener);
server.listen(process.env.PORT || 3000);
