require('dotenv').config();
const app = require('./app');
const { connectDb } = require('./libs/database');

function normalizePort(port) {
  if (typeof port === 'string') {
    return parseInt(port);
  } else if (typeof port === 'undefined') {
    return 4000;
  }

  return port;
}

(async () => {
  await connectDb();
})();

const port = normalizePort(process.env.PORT);
app.listen(port, () => console.log(`Application running on port ${port}`));
