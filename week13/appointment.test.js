const appointmentService = require('./appointment');
const emailService = require('./email');
jest.mock('./email');

describe('AppointmentService', () => {
  describe('#bookAppointment', () => {
    it('should return true', () => {
      const res = appointmentService.bookAppointment(
        {
          email: 'test@test.ca',
          id: 1,
        },
        new Date()
      );
      expect(res).toBe(true);
      expect(emailService.send.mock.calls.length).toBe(1);
    });
    it('should throw an error with no date', () => {
      const t = () =>
        appointmentService.bookAppointment({
          email: 'test@test.ca',
          id: 1,
        });
      expect(t).toThrow(Error);
    });
    it('should throw an error with no user', () => {
      const t = () => appointmentService.bookAppointment(null, new Date());
      expect(t).toThrow(Error);
    });
    it('should throw an error with nothing', () => {
      const t = () => appointmentService.bookAppointment();
      expect(t).toThrow(Error);
    });
  });

  describe('#viewAppointments', () => {
    const NOW = new Date();
    beforeAll(() => {
      appointmentService.appointments.push(
        ...[
          { date: NOW, userId: 2 },
          { date: NOW, userId: 2 },
          { date: NOW, userId: 3 },
        ]
      );
    });
    it('should return correct array for user 2', () => {
      const res = appointmentService.viewAppointments(2);
      expect(res).toEqual([
        { date: NOW, userId: 2 },
        { date: NOW, userId: 2 },
      ]);
    });
    it('should return correct array for user31', () => {
      const res = appointmentService.viewAppointments(3);
      expect(res).toEqual([{ date: NOW, userId: 3 }]);
    });
    it('should return correct array for user 4', () => {
      const res = appointmentService.viewAppointments(4);
      expect(res).toEqual([]);
    });
  });
});
