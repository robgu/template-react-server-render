const Koa = require('koa');
const file = require('koa-static');
const Web = require('./web/middleware');
const api = require('./api/middleware');

const app = new Koa();
app.use(file('static'));
app.use(api.routes(), api.allowedMethods());
app.use(Web());

app.listen(8400);

