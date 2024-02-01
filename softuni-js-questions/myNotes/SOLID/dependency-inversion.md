```sh
// Low-level module
class LightBulb {
  turnOn() {
    console.log('LightBulb: turned on');
  }

  turnOff() {
    console.log('LightBulb: turned off');
  }
}

// High-level module
class LightSwitch {
  constructor() {
    this.lightBulb = new LightBulb();
  }

  operateSwitch() {
    if (/* some condition */) {
      this.lightBulb.turnOn();
    } else {
      this.lightBulb.turnOff();
    }
  }
}

const switchButton = new LightSwitch();
switchButton.operateSwitch();

```

The Lightswitch depends on the Lightbulb, to adhere to the Dependency inversion principle, we should make Lithswitch depend on Lightbulb, but Lightbulb should also depend on an abstraction, thus, Lightbulb is not the root.
Why should not Lighbulb be root class -> becuase it is also an object one of many that is switchable. We should instead make the root some abstract entity that encompasses all devices that are switchable.

Dependcy inversion - instead of on class depending on another. Make one even more abstract class that signifies just the abstract qualities that are to be dependent on -> lightbulb is an example of switchable device, but so is a laptop, a tv, thus, make a more abstract class switchable device, that lightbulb extends and then use lightbulb, so that the switchability functionality is not dependant on an instance (lightbulb) of switchable devices, but of the class of switchable devices. 

```sh
// Abstraction
class SwitchableDevice {
  turnOn() {
    throw new Error('Not implemented');
  }

  turnOff() {
    throw new Error('Not implemented');
  }
}

// Low-level module
class LightBulb extends SwitchableDevice {
  turnOn() {
    console.log('LightBulb: turned on');
  }

  turnOff() {
    console.log('LightBulb: turned off');
  }
}

// High-level module
class LightSwitch {
  constructor(device) {
    this.switchableDevice = device;
  }

  operateSwitch() {
    if (/* some condition */) {
      this.switchableDevice.turnOn();
    } else {
      this.switchableDevice.turnOff();
    }
  }
}

const lightBulb = new LightBulb();
const switchButton = new LightSwitch(lightBulb);
switchButton.operateSwitch();

```