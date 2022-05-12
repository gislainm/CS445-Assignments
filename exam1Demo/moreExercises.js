"use strict";
/*eslint-disable */
// const fibonacci = (function () {
//     let memo = {};
//     function fib(num) {
//         let value;
//         if (num in memo) {
//             value = memo[num];
//         } else {
//             if (num === 0 || num === 1) {
//                 value = 1;
//             } else {
//                 value = fib(num - 1) + fib(num - 2);
//             }
//             memo[num] = value;
//         }
//         return value;
//     }
//     return fib;
// })()

// //Strategy
// class Info {
//     print(msg) {
//         console.info(msg);
//     }
// }

// class Error {
//     print(msg) {
//         console.error(msg);
//     }
// }
// class Warn {
//     print(msg) {
//         console.warn(msg);
//     }
// }
// class Table {
//     print(msg) {
//         console.table(msg);
//     }
// }

// class Strategy {
//     loggingAlgo = "";
//     setStrategy(algo) {
//         this.loggingAlgo = algo;
//     }
//     logging(msg) {
//         this.loggingAlgo.print(msg);
//     }
// }


// //MODULE
// const shoppingCart = (function () {
//     let basket = [];
//     return {
//         upsertItem(item) {
//             let index = basket.findIndex((product) => product.id === item.id);
//             if (index > -1) {
//                 basket[index] = item;
//             } else {
//                 basket.push(item);
//             }
//         },
//         getItemsCount() {
//             return basket.length;
//         },
//         getTotalPrice() {
//             return basket.reduce((previousVal, currentVal) => {
//                 return previousVal + (currentVal.product.price * currentVal.count)
//             }, 0)
//         },
//         removeItemById(id) {
//             let index = basket.findIndex((item) => item.id === id);
//             basket.splice(index, 1);
//         }
//     }
// }
// )();

// //OBSERVER

// class Subject {
//     observers = {};
//     on(event, fn) {
//         if (event in this.observers) {
//             this.observers[event].push(fn);
//         } else {
//             this.observers[event] = [fn];
//         }
//     }
//     emit(event, msg) {
//         for (let observer of this.observers[event]) {
//             observer(msg);
//         }
//     }
// }

const Student = (
    function () {
        let studentObj = {};
        return {
            student(fname, lname) {
                studentObj.name = fname + " " + lname
                 studentObj.grades = [];
            },
            enterGrade(num) {
                    studentObj.grades.push(num)
                // } else {
                //     studentObj.grades = [num];
                // }
            },
            getAverageGrade() {
                    let sum = studentObj.grades.reduce((sum, currentVal) => sum + currentVal, 0);
                    studentObj.averageGrade = sum / studentObj.grades.length;
                    return studentObj.averageGrade;
                // } else {
                //     return 0;
                // }
            },
            getStudentInfo() {
                let info = studentObj.name + ": " + studentObj.averageGrade
                return info;
            }
        }
    }
)()

// Student.student('John', 'Smith'); //nothing is returned
// Student.getAverageGrade(); //return 0
// Student.enterGrade(90); //nothing is returned
// Student.enterGrade(80); //nothing is returned
// Student.enterGrade(100); //nothing is returned
// Student.getAverageGrade(); //call again after entering grades, return 90
// console.log(Student.getStudentInfo()); //Output in the console: John Smith: 90

Student.student('Edward', 'Jack'); //nothing is returned

Student.getAverageGrade(); //return 0

Student.enterGrade(80); //nothing is returned

Student.enterGrade(70); //nothing is returned

Student.enterGrade(60); //nothing is returned

Student.getAverageGrade(); //call again after entering grades, return 70

console.log(Student.getStudentInfo()); //Output in the console: Edward Jack: 70