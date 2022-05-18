"use strict";
/*eslint-disable */
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

// Array.prototype.newReverse = function () {
//     let arr = this;
//     console.log(arr.reverse());
// };
// console.log('start');
// [1, 3, 6, 2].newReverse(); 
// console.log('end');

Array.prototype.newReverseAsync = async function () {
    let arr = this;
    async function helper(array) {
        return array.reverse();
    }
    let result = await (helper(arr));
    console.log(result);
}
console.log('start');
[1, 3, 6, 2].newReverseAsync(); 
console.log('end');
