The most basic explanation for why we need generics is to have a middleground between any and a specific type. Namely, if we use any, it is like we do not utilize the power of typescript at all:

```sh
function identity(arg: any): any {
  return arg;
}
```

On the other hand, if we use a specific type, we limit the function to accept only this type:

- number

```sh
function identity(arg: number): number {
  return arg;
}
```

- number

```sh
function identity(arg: string): string {
  return arg;
}
```

But what if we want to create a template function that utilizes the power of types, yet, leave the ability to manouvre when subsequently using this function - we use generics:

```sh
function identity<Type>(arg: Type): Type {
  return arg;
}
```

Now Type is a generic and if we apply number as an arg, we will, during the course of using the function with number, apply the Typescript strict typing for number. Otherwise, if we subsequently apply string to the same function, TS will apply strict typing for string.

**Basically, instead of saying use any type with 'any', we say use any type, but if you use it, TS will expect this specific type throughout the use of this specific instance of the function.**


The following example underlines the TS error checking:

- What if we want to also log the length of the argument arg to the console with each call? We might be tempted to write this:
```sh

function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);
Property 'length' does not exist on type 'Type'.

  return arg;
}
```


*When we do, the compiler will give us an error that we’re using the .length member of arg, but nowhere have we said that arg has this member. Remember, we said earlier that these type variables stand in for any and all types, so someone using this function could have passed in a number instead, which does not have a .length member.*