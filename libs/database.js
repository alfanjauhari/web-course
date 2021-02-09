const { connect, connection } = require('mongoose');

async function connectDb() {
  connect(process.env.DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
}

module.exports = {
  connectDb
};
