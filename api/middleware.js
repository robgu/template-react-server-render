const Router = require('koa-router');

const router = new Router();
router.get('/api', (ctx) => {
  ctx.body = {
    api: 'success',
  };
});
module.exports = router;
