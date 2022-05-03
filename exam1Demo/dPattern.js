"use strict";
/*eslint-disable */


//SINGLETON
class Singleton {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        if (!Singleton.instance) {
            Singleton.instance = this;
        } else {
            return Singleton.instance;
        }

    }
}


//OBSERVER
class Subject {
    observer = {};
    on(event, fn) {
        if (event in this.observer) {
            this.observer[event].push(fn);
        } else {
            this.observer[event] = [fn];
        }
    }
    emit(event, message) {
        for (let fn of this.observer[event]) {
            fn(message);
        }
    }
}

// const subject = new Subject();
// subject.on('eat', console.log); // register an observer
// subject.on('study', console.log); // register an observer

// function foo(msg) {
//     console.log('foo: ' + msg);
// }
// subject.on('eat', foo);
// subject.on('study', foo);
// subject.emit('eat', 'Corn');
// //output for Line above: subject.emit('eat', 'Corn');
// // Corn
// // foo: Corn
// subject.emit('study', 'cs445');
// //output for Line above: subject.emit('study', 'cs445');
// // cs445
// // foo: cs445

//STRATEGY

class Info {
    print(msg) {
        console.info(msg);
    }
}
class Warn {
    print(msg) {
        console.warn(msg);
    }
}
class Error {
    print(msg) {
        console.error(msg);
    }
}
class Table {
    print(msg) {
        console.table(msg);
    }
}

class Strategy {
    loggingAlgo = "";
    setStrategy(algo) {
        this.loggingAlgo = algo;
    }
    logging(msg) {
        this.loggingAlgo.print(msg);
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


//MEMOIZATION

const fibonacci = (
    function () {
        let memo = {};
        function fib(n) {
            let value;
            if (n in memo) {
                value = memo[n];
            } else {
                if (n <= 1) {
                    value = 1;
                } else {
                    value = fib(n - 1) + fib(n - 2);
                }
                memo[n] = value;
            }
            return value;
        }
        return fib;
    }
)()

console.log(fibonacci(50));