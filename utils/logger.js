const moment = require('moment');

const DIF = 24;

/**
 * Prints message only if the date given is with DIF hours of the current date.
 * @param {date} date 
 */
function isRecent() {
  return moment(process.env.logDate).isSameOrAfter(moment().subtract(DIF, 'hours'))
    && process.env.log === 'true';
}

/**
 * Logs the message to the console if isRecent().
 * @param {string} message 
 */
function log(message) {
  if(process.env.IS_LOCAL === 'true') console.log(message)
  else if(isRecent()) console.log(message);
}

module.exports = {
  isRecent,
  log
};
