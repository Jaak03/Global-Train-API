const mongoose = require('mongoose');

const { log } = require('./utils/logger');

mongoose.Promise = Promise;

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  log('You must provide a MongoDB URI');
  return;
}

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI,{
  useUnifiedTopology: true
});
mongoose.connection
  .once('open', () => {
    log('Connected to Mongo Atlas');
  })
  .on('error', (e) => {
    log(`mongoose.error: ${JSON.stringify(e)}`);
  });


  