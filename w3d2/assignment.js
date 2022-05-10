"use strict";
/*eslint-disable */
//Question 1
async function helper(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            throw new Error('nooo');
        }
    }
    if (num <= 1) {
        throw new Error('nooo');
    }
    return { prime: true };
}

async function isPrimeAsync(num) {
    try {
        let result = await helper(num);
        console.log(result);
    } catch (e) {
        console.log({ prime: false });
    }
}

console.log('start');
isPrimeAsync(6)
console.log('end');

//Question 2
Array.prototype.removeDuplicatesAsync = async function () {
    let array = this;
    async function helper(arr) {
        let newArr = [];
        for (let element of array) {
            if (!newArr.includes(element)) {
                newArr.push(element);
            }
        }
        return newArr;
    }
    let results = await helper(array);
    console.log(results);
}

console.log(`start`);
[4, 1, 5, 7, 2, 3, 1, 4, 6, 5, 2].removeDuplicatesAsync(); 
console.log(`end`);