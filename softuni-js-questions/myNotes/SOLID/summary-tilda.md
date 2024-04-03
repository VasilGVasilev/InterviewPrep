**Single responsibility** - try not to delve too deep into details, making a class for each separate service, but focus on creating classes with common purpose services.

**Open-closed** - open for extension, closed for modification -> instead of editing manually, extend with updated method and this new class that extends, we apply. 
Good for libraries, not so good for projects, for projects its actaully better to edit, thus, modify, not extend.

**Liskov substitution** - Where there is inheritance, the inherting class must be able to be used everywhere where the parent it inherits from is used. 

*Parent promises some things, the child must be promising the same things and maybe more, but cannot foregoe on the parent's promises.* 
2D(x,y) and 3D(x,y,z)

Every parent has pre-conditions, you can lessen them, but you cannot tighten them -> you can return a number and change it so that it also logs the number. This means the inheriting class can be used everywhere the parent is used with some slight difference that is however not damaging the class. Another example is to have only positive numbers, you cannot make it stricter so that the inheriting class allows only positive and even numbers.

- The Liskov Substitution Principle (LSP) is a principle of object-oriented design that states that in a program, if `S` is a subtype of `T`, then objects of type `T` may be replaced with objects of type `S` without altering any of the desirable properties of the program.

- The purpose of LSP is to ensure that a subclass can stand in for its superclass without anything breaking. This is important for maintaining the integrity of a system as it evolves over time and for ensuring that components can be reused and interchanged freely.

- The principle doesn't mean that subclasses can't add new behavior or extend the superclass in some way. It just means that they can't change the expected behavior of the superclass. This is what is meant by "you can't tighten the preconditions": a subclass can't require more stringent conditions for its methods than the superclass does.

- For example, if you have a `Bird` class with a method `fly`, and a `Penguin` subclass, the `Penguin` subclass can't override the `fly` method to throw an error (since penguins can't fly), because that would violate the LSP. Code that works with `Bird` objects needs to be able to call `fly` without anything breaking.

- This doesn't mean that all classes are indistinguishable from each other. Subclasses can still add new methods and properties, and they can override methods to provide different (but not stricter) behavior. The key is that they can't change the contract of the superclass in a way that would break code that works with the superclass. The Liskov Substitution Principle (LSP) is a guideline for designing object-oriented software. It's not always applicable in every situation, and sometimes real-world requirements might seem to contradict it. The `Bird` and `Penguin` example is a classic case where real-world semantics don't map neatly onto object-oriented inheritance.


**Interface segregation**
If you have interfaces, adjust interfaces to have as tight as possible coupling with the function they are for.

But in today's world interfaces are actually compatible with their specific function.

**Dependency inversion**
Parent layers must not depend on their children. Abstracting the parent and child with a third interface.