

### Static (at compile time)
A language that has type bound to the variable, in Java:

```java
String s = 'abs'
```
**CANNOT** be changed to
```java
Integer s = 4
```

### Dynamic (at runtime)
A language that has type not being bound to the variable, in PHP:

```php
$s = 'abs'
```
**CAN** be changed to
```php
$s = 4
```


NB. Dynamic types are associated with runtime values - 'abs', 4, Compile types are associated with variables and/or functions set in the code.

### Strong
A language that does not infer the type, in Ruby:

```ruby
val = "abc" + 123
```
will result in a runtime error

### Weak
A language that can infer the type, in JavaScript:

```js
m = 'abc' + 123
```
will result in valid abc123 string


Use the following for basic differtentiation:

Strong and static - Typescript
Strong and dynamic - C
Weak and static - Python
Weak and dynamic - Javascript

A dynamic language can redefine variables:

let a = 7;
a = 'hello';

<!-- no error in JS -->

a = 7
a = 'hello'

<!-- error in Python -->

mind that const in JS does not make it static, it merely, makes the value read only, but remember that arrays and objects are passed by reference and are mutable, effectively, we can change their values, so const does not affect the fact that JS is a dynamic language.

A strong language has types checked at compile time, a weak one has inferred checked at runtime.