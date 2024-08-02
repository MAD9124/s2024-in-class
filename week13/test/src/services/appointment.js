const emailService = require('./email');

/**
 * @typedef Appointment
 * @type{object}
 * @property {number} userId
 * @property {Date} date
 */

/**
 * @typedef User
 * @type{object}
 * @property {number} id
 * @property {string} email
 */

/** @type{Appointment[]} */
let appointments = [];

/**
 *
 * @param {User} user
 * @param {Date} date
 * @returns {boolean}
 */
const bookAppointment = (user, date) => {
  if (!user || !date) {
    throw new Error('user and date required');
  }
  appointments.push({ userId: user.id, date });
  emailService.send(
    user.email,
    `You have an upcoming appointment on ${date.toString()}`
  );
  return true;
};

/**
 *
 * @param {number} userId
 * @returns {Appointment[]}
 */
const viewAppointments = (userId) => {
  return appointments.filter((appt) => appt.userId === userId);
};

module.exports = {
  appointments,
  bookAppointment,
  viewAppointments,
};
