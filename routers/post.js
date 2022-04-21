const httpController = require('../controllers/http');
const postController = require('../controllers/post');

const post = async (req, res) =>
{
  const { method, url } = req;
  console.log(method, url);
  let body = '';
    req.on('data', (chunk) => body += chunk)
  if (url === '/post') {
    method === 'GET' ? postController.getAllPosts(res) : method === 'POST' ? postController.createPost(req, res) : method === 'DELETE' ? postController.deleteAllPost(res) : null
  } else if (url.startsWith('/post/')) {
    method === 'PATCH' ? postController.updatePost(req, res) : method === 'DELETE' ?postController.deletePost(req, res) : null
    ;
  } else if (method === 'OPTIONS') {
      httpController.cors(res);
  } else {
    httpController.notFound(res);
  }
}

module.exports = post;