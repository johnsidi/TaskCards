const mongoose = require('mongoose');

//module.exports = mongoose.connect('mongodb://localhost:27017/tasks', {

module.exports = mongoose.connect(
  'mongodb+srv://' +
    process.env.MongoDBuser +
    ':' +
    process.env.MongoDBpass +
    '@' +
    process.env.DBcluster +
    '.vpxhl.mongodb.net/' +
    process.env.DBname +
    '?retryWrites=true&w=majorit',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
