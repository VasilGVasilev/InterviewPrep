IT seems that typing in TS is not as hardline as in languages like Java and C#.

```ts
interface Pet {
  name: string;
}
class Dog {
  name: string;
}
let pet: Pet;
// OK, because of structural typing
pet = new Dog();
```

```ts
interface Pet {
  name: string;
}
let pet: Pet;
// dog's inferred type is { name: string; owner: string; }
let dog = { name: "Lassie", owner: "Rudd Weatherwax" };
pet = dog;
```

How is this okay in TS, but not okay in Java. In TS when the compiler sees pet = dog, it just goes through the interface of pet (Pet) for its properties and relevant types. Since it has only name of type string, and dog has name of type string, the assignemned is valid. It would be invalid if dog's name was of type number or other non-string. The fact that dog also has owner, is irrelevant for the assignment. 

**In this sense, TS is more like a lense. It looks at the dog object via the Pet lens and checks if the only property of Pet -name- is of the necessary type.**

In Java, there would be an error, since it is irrelecant for a nominally typed language that there is structural similarity, it needs to have exact and explicit implementation. dog has owner, Pet interface has no such property, the assignment is impossible.


**NB**

**Mind you that subsequent access to the property owner of the newly created object pet based on dog will create an error**


Yes, TS will give a compile error:

```typescript
interface Pet { name: string; }
let dog = { name: "Lassie", owner: "Rudd Weatherwax" };
let pet: Pet = dog;

pet.owner; // ❌ TS error: Property 'owner' does not exist on type 'Pet'
dog.owner; // ✅ fine — dog's inferred type still knows about 'owner'
```

`pet` is typed as `Pet`, so TypeScript only lets you access what `Pet` guarantees. The `owner` property is still there on the runtime object — `pet.owner` would work perfectly in plain JS — but TypeScript blocks it at compile time because it can't guarantee every possible `Pet` has an `owner`.

This is exactly the "type as a lens" concept from earlier: the data isn't gone, you just can't see it through the narrower type. To access it you'd need to cast back:

```typescript
(pet as typeof dog).owner; // ✅ or (pet as any).owner
```

[ref](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)