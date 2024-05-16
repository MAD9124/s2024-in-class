const EventEmitter = require("events");

class Notification extends EventEmitter {
  constructor(name, phoneNumber) {
    super();

    this.name = name;
    this.phoneNumber = phoneNumber;

    this.on(phoneNumber, (message) => {
      console.log(`${this.name} received a message: ${message}`);
    });
  }

  send(message) {
    // do the real work

    // then raise an event
    this.emit(this.phoneNumber, message);
  }
}

const notifyDiego = new Notification("diego", "6131234567");

notifyDiego.send("Hey man, whats up");
notifyDiego.send("You hungry?");
