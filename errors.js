function DateError() {
  throw new Error('This message has expired')
}

DateError.prototype = Error;

module.exports = {
  DateError
};
