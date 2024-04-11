class Car {
    // This method cannot reference accelerate because it's defined later
    startEngine() {
        console.log("Engine started!");
        this.accelerate(); // This would cause a ReferenceError
    }

    accelerate() {
        console.log("Car is accelerating!");
    }
}

const myCar = new Car();
myCar.startEngine(); // This will only print "Engine started!"
