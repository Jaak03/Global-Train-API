const mongoose = require('mongoose');

const { log } = require('./utils/logger');

mongoose.Promise = Promise;

const { MONGO_URI } = process.env;

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});
mongoose.connection
  .once('open', () => {
    log('Connected to Mongo Atlas');
  })
  .on('error', (e) => {
    log(`mongoose.error: ${JSON.stringify(e)}`);
  });
