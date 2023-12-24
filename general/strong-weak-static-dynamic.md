Use the following for basic differtentiation:

Strong and static - Typescript
Strong and dynamic - C
Weak and static - Pyhton
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