
  const mongodb = {
    connectionString: `${process.env.MONGO_CONNECTION_STRING}`
    //connectionString: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`
  };

  module.exports = mongodb;