const { log } = require('../utils/logger');

module.exports.hello = async (event, context) => {
  log(process.env.KEY);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        event,
        context,
      },
      null,
      2,
    ),
  };
};
