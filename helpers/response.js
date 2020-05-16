/**
 * To conform to cors standards, this function wraps the response body in the necessary cors headers.
 * @param {object} response Body to wrap in cors headers
 */
function wrapForCors(response) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(response),
  };
}

module.exports = {
  wrapForCors,
};
