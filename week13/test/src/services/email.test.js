const emailService = require('./email');

describe('EmailService', () => {
  describe('#send', () => {
    it('should throw an error with no email', () => {
      expect(() => emailService.send(null, 'message 123')).toThrow(Error);
    });
    it('should throw an error with no message', () => {
      expect(() => emailService.send('test@test.ca')).toThrow(Error);
    });
    it('should not throw an error', () => {
      expect(() =>
        emailService.send('test@test.ca', 'message 123')
      ).not.toThrow();
    });
  });
});
