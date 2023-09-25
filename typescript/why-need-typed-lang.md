This thought occurred to me when writing my explanation of DefinitelyTyped -> 

**Why do we need type languages?**

The common answers for type safety sounded like a cliche for me.
So I started:

```sh
const lemmings = 45;
const another = lemmings(56);
```

This will produce a JS error singaling that lemmings is not a function. But that is all. If we had types, we would have information what lemmings is to begin with.


But now a new question appears

How is it when I use vscode and set the type, vscode serves as a linter and suggests me the methods/properties of that type before running the program?

**With other words, how are types apparent to the system before I even run the code?**

First, it is necessary to make a certain distinguishment between statically and dynamically typed languages.

![alt img](https://github.com/VasilGVasilev/InterviewPrep/blob/main/public/compile-run-time.png)


Each program needs to be reduced to a computer comprehensible language. The static typed languages do their type checking at compile time, while JS does it at run time (as a dynamic language). With simple words, 
types in JS are checked only once we run the program. So, to the first benefit of typed languages -> errors appear at compile time - before we even run the program.

**How do errors appear before we even run the program?**

Take TS. When we install it in our code interpreter - vscode, for example, we install a TS compiler (tsc), too. In this case, the concept of 'compile time' refers to the time when the TS compiler transpiles it into JS, before it does that, TS compiler also checks the types. 

Thus:

Static -> 1. Check types | 2. Run
Dynamic -> 1. Run | 2. Check types
