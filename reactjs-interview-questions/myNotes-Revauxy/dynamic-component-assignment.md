Simply said in JS functions are first-class values meaning they can be stored in variables. Thus, one can store an whole component (which is merely a function in JS) and use this variable as an element </> in the return of a React component.


**1. Components are just values in JavaScript**

In React, a component is just a function (or class). Functions are first-class values, so you can assign them to variables:

```ts
let CascoStepComponent = CascoStep0; // same as: let fn = someFunction
```

**2. The switch assigns the component type (not an instance)**

```ts
switch (step) {
    case 1: CascoStepComponent = CascoStep1; break;
    // ...
}
```

`CascoStep1` here is not `<CascoStep1 />` (an element) — it's the raw component function itself. You're just swapping which function the variable points to.

**3. JSX with a capitalized variable calls whatever function is currently assigned**

```tsx
<CascoStepComponent ref={stepRef} onSubmit={onStepSubmit} />
```

At compile time, this transpiles to:

```ts
React.createElement(CascoStepComponent, { ref: stepRef, onSubmit: onStepSubmit })
```

**So React receives whichever function is currently stored in `CascoStepComponent` and calls it with the given props.** The props work because all three steps (`CascoStep0`, `CascoStep1`, etc.) presumably accept the same `ref` and `onSubmit` interface.

CascoStep0, CascoStep1, etc. are imported functions, and the variable CascoStepComponent just holds whichever one is currently selected. The JSX <CascoStepComponent /> calls that function exactly as <CascoStep1 /> would.