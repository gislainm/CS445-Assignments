"use strict";
/*eslint-disable */

//Question 1
const isPrime = function (num) {
    return new Promise((resolve, reject) => {
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                reject({ prime: false });
            }
        }
        if (num <= 1) {
            reject({ prime: false });
        }
        resolve({ prime: true });
    })
}
console.log('start');
isPrime(2)
    .then(res => console.log(res))
    .catch(err => console.error(err));
console.log('end');

//Question 2
Array.prototype.removeDuplicatesAsync = function () {
    let array = this;
    let newArr = [];
    for (let element of array) {
        if (!newArr.includes(element)) {
            newArr.push(element);
        }
    }
    new Promise(function (resolve, reject) {
        resolve(newArr);
    }).then((arr) => console.log(arr));
}
console.log(`start`);
[4, 1, 5, 7, 2, 3, 1, 4, 6, 5, 2].removeDuplicatesAsync();
console.log(`end`);