Dart was made as a replacement for JS by google, TS was made as an update for JS. Nowadays, Flutter - a Dart framework gains popularity on par with React Native.

Prior to TS, Microsoft did not have the open source know-how not to speak of open source reputation.

The creator of TS was actually first tasked with the completion of VSCode.

Angular 2.0 was the re-write of AngularJS with TS as main language.

That made a vacuum for developers distancing from Angular obliging the use of TS. A vacuum filled by React which set no new rules, just plain JS.

The biggest competitor to TS(MS) was Flow(FB). Flow has the idea of contextually inferring JS types, so if you set a variable to be a number, it will infer and set all subsequent instances of this variable to be of the type number. Flow was intially an internal project that type checks the FB codebase and cedeing to its rival popularity continued to be so, the team redirected their focus on imporoving Flow for internal needs.

According to the creator of TS, the moment you start using VS Code to write JS, you use TS. He differentiates between TS the syntax and TS the tool. He refers to the second, the TS compiler, when saying the thing about VS Code, since the TS compiler has no problem inferring types via JSDocs or by inferring types onto plain JS and then still producing JS code. 

When the TypeScript compiler reads plain JavaScript, it does infer its own types. However, it does not disregard these types when it produces the plain JavaScript result. Instead, the TypeScript compiler uses the inferred types to generate more efficient and optimized JavaScript code.