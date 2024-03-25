We have an order that calculates total price based on cartItems:

```sh
class Order {
  constructor(private items: CartItem[]) {}

  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}

class CartItem {
  constructor(public name: string, public price: number) {}
}
```

If I am to add a discount, I may be tempted to just edit the original Order:

```sh
class Order {
  constructor(private items: CartItem[], private discount: number = 0) {}

  calculateTotal() {
    const subtotal = this.items.reduce((total, item) => total + item.price, 0);
    return subtotal - subtotal * (this.discount / 100);
  }
}
```

But I should extend, not modify:

```sh
class DiscountedOrder extends Order {
  constructor(items: CartItem[], private discount: number) {
    super(items);
  }

  applyDiscount() {
    return this.calculateTotal() * (1 - this.discount / 100);
  }
}
```

Open for extension closed for modification, as it is with calculateArea() of superclass shape being open for extension, and then each subclass Rectanlge and Circle extends for its specific needs without modifying. Basically, again as with dependency inversions, it is good to have abstraction superclass and go from there to overwrite speficis in each subclass.