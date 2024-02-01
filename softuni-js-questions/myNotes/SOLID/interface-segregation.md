```sh
// Interface
class Animal {
  walk() {
    throw new Error('Not implemented');
  }

  fly() {
    throw new Error('Not implemented');
  }

  swim() {
    throw new Error('Not implemented');
  }
}

// Implementing the interface for a Bird
class Bird extends Animal {
  walk() {
    console.log('Bird is walking');
  }

  fly() {
    console.log('Bird is flying');
  }

  swim() {
    throw new Error('Bird cannot swim');
  }
}

// Implementing the interface for a Fish
class Fish extends Animal {
  walk() {
    throw new Error('Fish cannot walk');
  }

  fly() {
    throw new Error('Fish cannot fly');
  }

  swim() {
    console.log('Fish is swimming');
  }
}

```

Avoid common denominators that consist of specifics

```sh
// Separate interfaces
class Walkable {
  walk() {
    throw new Error('Not implemented');
  }
}

class Flyable {
  fly() {
    throw new Error('Not implemented');
  }
}

class Swimmable {
  swim() {
    throw new Error('Not implemented');
  }
}

// Implementing interfaces for specific animals
class Bird implements Walkable, Flyable {
  walk() {
    console.log('Bird is walking');
  }

  fly() {
    console.log('Bird is flying');
  }
}

class Fish implements Swimmable {
  swim() {
    console.log('Fish is swimming');
  }
}

```