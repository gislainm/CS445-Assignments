"use strict";
/*eslint-disable */

//QUESTION 1
class Regular {
    constructor(type) {
        this.bulb = "regular";
    }
}

class Energy {
    constructor(type, color) {
        this.bulb = type;
        this.color = color;
    }
}

class Factory {
    createBulb(type, color) {
        let bulb;
        if (type === "regular") {
            bulb = new Regular(type);
        } else if (type === "energy") {
            bulb = new Energy(type, color);
        }
        return bulb;
    }
}

// const bulbs = [];
// const factory = new Factory();
// bulbs.push(factory.createBulb("regular"));
// bulbs.push(factory.createBulb("energy", "red"));
// for (let i = 0, len = bulbs.length; i < len; i++) {
//     console.log(bulbs[i]);
// }


//QUESTION 2
class User {
    constructor(name) {
        this.name = name;
    }
}

class DecoratedUser {
    constructor(user, city, state) {
        this.user = user;
        this.name = user.name;
        this.city = city;
        this.state = state;
    }
    logger() {
        console.log(this.name + " is from the city of " + this.city + " in the state of " + this.state);
    }
}

// const user = new User("Kelly");
// const decorated = new DecoratedUser(user, "Broadway", "New York");
// decorated.logger();


//QUESTION 3
class Info {
    logging(message) {
        console.info(message);
    }
}

class Warn {
    logging(message) {
        console.warn(message);
    }
}

class Error {
    logging(message) {
        console.error(message);
    }
}

class Table {
    logging(message) {
        console.table(message);
    }
}

class Strategy {
    setStrategy(loggingAlgo) {
        this.loggingAlgo = loggingAlgo;
    }
    logging(message) {
        this.loggingAlgo.logging(message);
    }
}
// const strategy = new Strategy();

// strategy.setStrategy(new Info());
// strategy.logging('info....');

// strategy.setStrategy(new Warn());
// strategy.logging('warn....');

// strategy.setStrategy(new Error());
// strategy.logging('error....');

// strategy.setStrategy(new Table());
// strategy.logging(['table', 'table']);


//QUESTION 4
const fibonacci = (function () {
    let memo = {};
    function fibo(n) {
        let value;
        if (n in memo) {
            value = memo[n];
        } else {
            if (n === 0 || n === 1) {
                value = 1;
            } else {
                value = fibo(n - 1) + fibo(n - 2);
            }
            memo[n] = value
        }
        return value;
    }
    return fibo;
})()

// function fibonacci2(n) {
//     if (n <= 1) {
//         return 1;
//     }
//     return fibonacci2(n - 1) + fibonacci2(n - 2);
// }

console.time('Memoized Version');
console.log(fibonacci(50));
console.timeEnd('Memoized Version');

// console.time('Not Memoized Version');
// console.log(fibonacci2(50));
// console.timeEnd('Not Memoized Version');