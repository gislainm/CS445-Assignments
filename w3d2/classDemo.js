"use strict";
/*eslint-disable */

console.log("start")
async function foo() {
    console.log('foo.....')
    return 1;
}
console.log(foo());
foo().then(console.log);
console.log("end")

// async function bar() {
//     let res = await foo();
//     console.log(res);
// }


// async function thisThrows() {
//     throw new Error("Thrown from thisThrows()");
// }
// try {
//     thisThrows();
// } catch (e) {
//     console.error(e);
// } finally {
//     console.log('We do cleanup here');
// }