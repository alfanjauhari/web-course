const { connect } = require('mongoose');

const dbURI = "mongodb://yosinau_admin:yosinauapp@cluster0-shard-00-00.eopfp.mongodb.net:27017,cluster0-shard-00-01.eopfp.mongodb.net:27017,cluster0-shard-00-02.eopfp.mongodb.net:27017/yosinau?ssl=true&replicaSet=atlas-zydaqp-shard-0&authSource=admin&retryWrites=true&w=majority";

async function connectDb() {
  try{
    await connect(dbURI,
      {useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log("MongoDB Connected!")
  }catch(err){
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = {
  connectDb
};
