import express from 'express';
import logger from 'morgan';

import server from './server';

const app = express();
app.use(logger('dev'));
app.use('/static', express.static('static'));
app.use(server.handleReq);

module.exports = app.listen(8080, (err) => {
  if (err) {
    console.error('[Error]', err);

    return;
  }

  console.log('Listening at http://localhost:8080\n');
});
