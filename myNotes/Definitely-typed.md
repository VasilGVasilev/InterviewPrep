When Typesscript was created there was a vacuum of all the Javascript's ecosystem that was not really usable in typescript because packages did not have types themselves. So how do we adjust JS libraries to TS?

We create Declaration files (.d.ts)

Ex

mainCodeFile.ts
```sh
import random from 'lodash/random';

const result = random(????);

```
typings.d.ts

```sh
declare module 'lodash' {
    export function random(min: number, max: number): number;
}
```

with a Declaration file we have automatic typechecking now, TS picks up the typings.d.ts module logic and applies it throughout the whole application.

But you cannot bother making a Declaration file for each npm package

so you the famous Declaration files repository -> [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)