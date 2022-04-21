const Post = require('../models/post');
const headers = require('../utils/headersHandle');
const errorHandle = require('../utils/errorHandle');
const successHandle = require('../utils/successHandle');

const postController = {
  getAllPosts: async (res) =>
  {
    const getAllPosts = await Post.find();
    successHandle(res, headers, '成功取得所有貼文', getAllPosts)
  },
  createPost: (req, res) =>
  {
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
  },
  updatePost: (req, res) =>
  {
    req.on('end', async () => {
            try {
              const id = url.split('/').pop();
              const data = JSON.parse(body);
              await Post.findByIdAndUpdate(id, data);
              const getAllPosts = await Post.find();
              successHandle(res, headers, '成功更新一則貼文', getAllPosts)
            } catch (err) {
              errorHandle(res, headers, err)
            }
          })
  },
  deleteAllPost: async (res) =>
  {
    await Post.deleteMany({})
          successHandle(res, headers, '成功刪除全部貼文')
  },
  deletePost: (req, res) =>
  {
    req.on('end', async () => {
            try {
              const id = url.split('/').pop();
              await Post.findByIdAndDelete(id);
              const getAllPosts = await Post.find();
              successHandle(res, headers, '成功刪除該則貼文', getAllPosts)
            } catch (err) {
              errorHandle(res, headers, err)
            }
          })
  }
}

module.exports = postController;
