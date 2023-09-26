1. The implicit 'any' type error

```sh
import { expect, it } from "vitest";

export const addTwoNumbers = (a, b) => {
  return a + b;
};

it("Should add the two numbers together", () => {
  expect(addTwoNumbers(2, 4)).toEqual(6);
  expect(addTwoNumbers(10, 10)).toEqual(20);
});

```

This function takes in a and b and adds them together.

It looks like perfectly valid JavaScript.

Running npm run exercise 01 in the terminal, we can see that our tests pass.

But even though it looks valid and tests pass, TypeScript isn't happy.

The terminal displays the following errors along with the line of code where they happen:

Parameter 'a' implicitly has an 'any' type.
Parameter 'b' implicitly has an 'any' type.


Solution:

You need to explicitly add type annotations. (a: number, b:number)

```sh
import { expect, it } from "vitest";

export const addTwoNumbers = (a: number, b: number) => {
  return a + b;
};

it("Should add the two numbers together", () => {
  expect(addTwoNumbers(2, 4)).toEqual(6);
  expect(addTwoNumbers(10, 10)).toEqual(20);
});

```

This is the crucial thing about TS, it necessitates the addition of type annotations to your code. You need to make that contract in the props field so that TS can unleash its powers:

**Every function you create -> specify props types!**


2. Working with Object Params

```sh
import { expect, it } from "vitest";

export const addTwoNumbers = (params) => {
  return params.first + params.second;
};

it("Should add the two numbers together", () => {
  expect(
    addTwoNumbers({
      first: 2,
      second: 4,
    }),
  ).toEqual(6);

  expect(
    addTwoNumbers({
      first: 10,
      second: 20,
    }),
  ).toEqual(30);
});
```

solutions:

- add inline object (properties divided by ; instead of ,)

```sh
import { expect, it } from "vitest";

export const addTwoNumbers = (params: {first: number; sceond: number}) => {
  return params.first + params.second;
};

it("Should add the two numbers together", () => {
  expect(
    addTwoNumbers({
      first: 2,
      second: 4,
    }),
  ).toEqual(6);

  expect(
    addTwoNumbers({
      first: 10,
      second: 20,
    }),
  ).toEqual(30);
});
```

- add a type

```sh
import { expect, it } from "vitest";

type AddTwoNumbersArgs = {
    first: number,
    second: number
}

export const addTwoNumbers = (params: AddTwoNumbersArgs) => {
  return params.first + params.second;
};

it("Should add the two numbers together", () => {
  expect(
    addTwoNumbers({
      first: 2,
      second: 4,
    }),
  ).toEqual(6);

  expect(
    addTwoNumbers({
      first: 10,
      second: 20,
    }),
  ).toEqual(30);
});
```

- add an interface (mainly for objects, while type can represent anything AddTwoNumbersArgs = string, AddTwoNumbersArgs = number)



```sh
import { expect, it } from "vitest";

interface AddTwoNumbersArgs = {
    first: number,
    second: number
}

export const addTwoNumbers = (params: AddTwoNumbersArgs) => {
  return params.first + params.second;
};

it("Should add the two numbers together", () => {
  expect(
    addTwoNumbers({
      first: 2,
      second: 4,
    }),
  ).toEqual(6);

  expect(
    addTwoNumbers({
      first: 10,
      second: 20,
    }),
  ).toEqual(30);
});
```

**Mind that inline type for object has a more verbose error than interface/type:**

Argument of type 'number' is not assignable to a parameter of type'{first: number; second: number;}'
vs
Argument of type 'number' is not assignable to a parameter of type'AddTwoNumbersArgs'


3. Optional Properties

You can make the passing of a certain param optional:


```sh
import { expect, it } from "vitest";

export const getName = (params: {first: string; last?: string}) => {
  if (last) {
    return `${first} ${last}`;
  }
  return first;
};

it("Should work with just the first name", () => {
  const name = getName("Matt");

  expect(name).toEqual("Matt");
});
# but not for the ? after last and before :, the following error will occur:
# Argument of type '{ first: string; }' is not assignable to parameter of type '{ first: string; last: string; }'.
# Property 'last' is missing in type '{ first: string; }' but required in type '{ first: string; last: string; }'.


it("Should work with the first and last name", () => {
  const name = getName("Matt", "Pocock");

  expect(name).toEqual("Matt Pocock");
});

```

you may see this

```sh
(params: {first: string; last: string | undefined})
```
but that means you still need to pass either string or undefined, cannot opt out of a last argument

4. Optional Parameters 

The same rule goes for parameters as a whole

**Mind you cannot have the optional parameter be in front of a obligatory parameter**

5. Assigning Types to Variables:

```sh
import { expect, it } from "vitest";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

/**
 * How do we ensure that defaultUser is of type User
 * at THIS LINE - not further down in the code?
 */
const defaultUser = {};


const getUserId = (user: User) => {
  return user.id;
};

it("Should get the user id", () => {
  expect(getUserId(defaultUser)).toEqual(1);
});

```

Where do I want my contracts to be?
at the level of defaultUser, then add :User and the error will be:

*Type '{}' is missing the following properties from type 'User': id, firstName, lastName, isAdmin*

```sh
import { expect, it } from "vitest";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

/**
 * How do we ensure that defaultUser is of type User
 * at THIS LINE - not further down in the code?
 */
const defaultUser: User = {};


const getUserId = (user: User) => {
  return user.id;
};

it("Should get the user id", () => {
  expect(getUserId(defaultUser)).toEqual(1);
});

```


**You can use TS to make clear what the binding contracts for type are even earlier than the use of a variable, namely, the variable's initiation.**


6. Constraining Value Types

- not just any string, but a select one of a number of strings, TS can help with that further than just type restriction


```sh
interface User {
  id: number;
  firstName: string;
  lastName: string;
  /**
   * How do we ensure that role is only one of:
   * - 'admin'
   * - 'user'
   * - 'super-admin'
   */
  role: string;
}

export const defaultUser: User = {
  id: 1,
  firstName: "Matt",
  lastName: "Pocock",
  // @ts-expect-error
  role: "I_SHOULD_NOT_BE_ALLOWED",
};

```

solution:

-use union types (here, specifically, it is also known as string literal union types):

```sh
interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: "admin" | "user" | "super-admin";
}
```

[Sidenote from TotalTypescript - mind that same is now achievable via enums](https://stackoverflow.com/questions/26855423/how-to-require-a-specific-string-in-typescript-interface)

```sh
enum RoleTypes{
    Admin = 'admin',
    User = 'user',
    Super-admin = 'super-admin'
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: RoleTypes;
}
```


if(defaultUser.role === 'admin') {
...
}

vs 

if(defaultUser.role ===  ReadingTypes.Admin) {
...
}


7. Working with Arrays

```sh
interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: "admin" | "user" | "super-admin";
  posts: Post;
}

interface Post {
  id: number;
  title: string;
}

export const defaultUser: User = {
  id: 1,
  firstName: "Matt",
  lastName: "Pocock",
  role: "admin",
  posts: [
    {
      id: 1,
      title: "How I eat so much cheese",
    },
    {
      id: 2,
      title: "Why I don't eat more vegetables",
    },
  ],
};

```

We need to update the posts: to be of the following two possible types:

posts: Post[] OR posts: Array<Post> 

**the Array type is a actually a generic type**



Sidenote from TotalTypescript:

Why doesn't Typescript throw an error when we do not specify the return type of a function, but does throw an error when we do not specify the type of the function's props?

**Because Typescript will infer the type from the function body, provided the props used have specified types.**