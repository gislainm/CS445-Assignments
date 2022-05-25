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

// Array.prototype.newReverseAsync = async function () {
//     let arr = this;
//     async function helper(array) {
//         return array.reverse();
//     }
//     let result = await (helper(arr));
//     console.log(result);
// }
// console.log('start');
// [1, 3, 6, 2].newReverseAsync();
// console.log('end');

// Array.prototype.newReverseAsyncP = async function () {
//     let arr = this;
//     return new Promise(function (resolve, reject) {
//         resolve(arr.reverse());
//     }).then(console.log);
// }
// console.log('start');
// [1, 3, 6, 2].newReverseAsyncP();
// console.log('end');

// async function f() {
//     let result = 'first!';
//     let promise = new Promise((resolve, reject) => {
//         console.log(result);
//         setTimeout(() => resolve('done!'), 1000);
//     });
//     result = await promise;
//     console.log(result);
// }
// f();

// const isPrime = num => {
//     let promise = new Promise((resolve, reject) => {
//         for (let i = 2; i <= Math.sqrt(num); i++) {
//             if (num % i === 0) {
//                 setTimeout(() => { reject({ prime: false }) }, 500);
//             }
//         }
//         setTimeout(() => { resolve({ prime: num > 1 }) }, 500);
//     })
//     return promise;
// }
// const isPrime = num => new Promise((resolve, reject) => {
//     setTimeout(function () {
//         for (let i = 2, s = Math.sqrt(num); i <= s; i++)
//             if (num % i === 0) reject({ prime: false });
//         resolve({ prime: num > 1 });
//     }, 500);
// });

// console.log('start');
// isPrime(5)
//     .then(res => console.log(res))
//     .catch(err => console.error(err));
// console.log('end');

setTimeout(() => console.log('setTimeout results'), 0);
console.log('Code starts');
async function dada(){
    return new Promise((resolve) => {
    //console.log('Promise starts');
    resolve(`Promise results`);
   // console.log('Promise ends');
})}

async function res(){
    console.log("first funct")
    let val= await dada();
    console.log("second funct", val);
}
res();
console.log('Code ends');
