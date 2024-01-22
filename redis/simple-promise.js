const promiseA = new Promise((resolve, reject) => {
    resolve(777);
});
// At this point, "promiseA" is already settled.
promiseA.then((val) => console.log("asynchronous logging has val:", val));
console.log("immediate logging");


// logging out order (promises come after due to awaiting event loop firing them back into callstack):
// immediate logging
// asynchronous logging has val: 777

// So what do promises do
// 1) help us avoid blocking the main thread
// 2) help us await data via their pending state that transforms into fulfilled or rejected state, thus, not crashing our app if data error occurs

// see https://javascript.info/promise-basics