```sh
// Abstract class representing a shape
class Shape {
    calculateArea() {
        throw new Error('Not implemented');
    }
}

// Concrete class for rectangles
class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    calculateArea() {
        return this.width * this.height;
    }
}

// Concrete class for circles
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    calculateArea() {
        return Math.PI * Math.pow(this.radius, 2);
    }
}




//the following is a function to combine the results of the two shapes

// Function to calculate the total area of an array of shapes
function calculateTotalArea(shapes) {
    let totalArea = 0;
    for (const shape of shapes) {
        totalArea += shape.calculateArea();
    }
    return totalArea;
}

// Using the calculateTotalArea function without modifying existing code
const shapes = [
    new Rectangle(5, 4),
    new Circle(3),
    // You can add new shapes without modifying the calculateTotalArea function
    // For example, adding a new Triangle class
    // new Triangle(base, height),
];

const totalArea = calculateTotalArea(shapes);
console.log(`Total Area: ${totalArea}`);

```

Open for extension closed for modification, as it is with calculateArea() of superclass shape being open for extension, and then each subclass Rectanlge and Circle extends for its specific needs without modifying. Basically, again as with dependency inversions, it is good to have abstraction superclass and go from there to overwrite speficis in each subclass.