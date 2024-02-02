```sh
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(side) {
    // In a square, both width and height are always the same
    super(side, side);
  }
}

// Function expecting a Rectangle
function printArea(rectangle) {
  console.log(`Area: ${rectangle.getArea()}`);
}

// Using a Rectangle
const rectangle = new Rectangle(5, 4);
printArea(rectangle);

// Using a Square (substituting Square for Rectangle)
const square = new Square(5);
printArea(square);
```

Objects of a superclass should be replaceable by objects of a subclass without crashing the programm