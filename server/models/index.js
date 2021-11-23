const mongoose = require('mongoose');

// for local development
module.exports = mongoose.connect('mongodb://localhost:27017/tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// for deployment

// module.exports = mongoose.connect(
//   'mongodb+srv://' +
//     process.env.MongoDBuser +
//     ':' +
//     process.env.MongoDBpass +
//     '@' +
//     process.env.DBcluster +
//     '.vpxhl.mongodb.net/' +
//     process.env.DBname +
//     '?retryWrites=true&w=majority',
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   }
// );
