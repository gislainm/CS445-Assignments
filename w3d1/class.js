"use strict";
/*eslint-disable */
Promise.all([
    new Promise(resolve => resolve(1)),
    new Promise(resolve => resolve(2)),
    new Promise(resolve => resolve(3))
]).then(val => console.log(val));