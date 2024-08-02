const appointmentService = require('./appointment');
const emailService = require('./email');
jest.mock('./email');

/** @type{User} */
const mockUser = {
  id: 1,
  email: 'test@test.ca',
};

describe('AppointmentService', () => {
  const NOW = new Date();
  describe('#bookAppointment', () => {
    it('should throw an error with no user', () => {
      expect(() => appointmentService.bookAppointment(null, NOW)).toThrow(
        Error
      );
    });
    it('should throw an error with no date', () => {
      expect(() => appointmentService.bookAppointment(mockUser)).toThrow(Error);
    });
    it('should throw an error with no user or date', () => {
      expect(() => appointmentService.bookAppointment()).toThrow(Error);
    });
    it('should return true', () => {
      const result = appointmentService.bookAppointment(mockUser, NOW);

      expect(emailService.send.mock.calls.length).toBe(1);
      expect(emailService.send.mock.lastCall).toEqual([
        mockUser.email,
        `You have an upcoming appointment on ${NOW.toString()}`,
      ]);
      expect(result).toBe(true);
    });
  });
  describe('#viewAppointments', () => {
    beforeAll(() => {
      appointmentService.appointments.push(
        ...[
          { userId: 2, date: NOW },
          { userId: 2, date: NOW },
          { userId: 3, date: NOW },
        ]
      );
    });
    it('should return the correct appointments for user 2', () => {
      // Arrange
      const userId = 2;

      // Act
      const result = appointmentService.viewAppointments(userId);

      // Assert
      expect(result).toEqual([
        { userId: 2, date: NOW },
        { userId: 2, date: NOW },
      ]);
    });
    it('should return the correct appointments for user 3', () => {
      const result = appointmentService.viewAppointments(3);
      expect(result).toEqual([{ userId: 3, date: NOW }]);
    });
    it('should return the correct appointments for user 4', () => {
      const result = appointmentService.viewAppointments(4);
      expect(result).toEqual([]);
    });
  });
});
