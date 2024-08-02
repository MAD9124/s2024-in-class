const emailService = require('./email');

describe('EmailService', () => {
  describe('#send', () => {
    it('#should not throw an error', () => {
      const t = () => emailService.send('test@test.ca', 'message 123');
      expect(t).not.toThrow();
    });
    it('should throw an error with no email', () => {
      const t = () => emailService.send(null, 'message 123');
      expect(t).toThrow(Error);
    });
    it('should throw an error with no message', () => {
      const t = () => emailService.send('test@test.ca');
      expect(t).toThrow(Error);
    });
    it('should throw an error with nothing', () => {
      const t = () => emailService.send();
      expect(t).toThrow(Error);
    });
  });
});
