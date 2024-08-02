const sentEmails = [];

/**
 *
 * @param {string} email
 * @param {string} message
 */
const send = (email, message) => {
  if (!email) {
    throw new Error('Email required');
  }
  if (!message) {
    throw new Error('Email required');
  }
  sentEmails.push({ email, message });
};

module.exports = {
  send,
};
