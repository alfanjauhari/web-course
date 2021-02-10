const { connect } = require('mongoose');

async function connectDb() {
  await connect(process.env.DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
}

module.exports = {
  connectDb
};
