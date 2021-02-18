const { connect } = require('mongoose');

async function connectDb() {
  try {
    await connect(process.env.DB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
    console.log('MongoDB Connected!');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = {
  connectDb
};
