"use strict";
/*eslint-disable */
const fibonacci = (function () {
    let memo = {};
    function fib(num) {
        let value;
        if (num in memo) {
            value = memo[num];
        } else {
            if (num === 0 || num === 1) {
                value = 1;
            } else {
                value = fib(num - 1) + fib(num - 2);
            }
            memo[num] = value;
        }
        return value;
    }
    return fib;
})()

//Strategy
class Info {
    print(msg) {
        console.info(msg);
    }
}

class Error {
    print(msg) {
        console.error(msg);
    }
}
class Warn {
    print(msg) {
        console.warn(msg);
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


//MODULE
const shoppingCart = (function () {
    let basket = [];
    return {
        upsertItem(item) {
            let index = basket.findIndex((product) => product.id === item.id);
            if (index > -1) {
                basket[index] = item;
            } else {
                basket.push(item);
            }
        },
        getItemsCount() {
            return basket.length;
        },
        getTotalPrice() {
            return basket.reduce((previousVal, currentVal) => {
                return previousVal + (currentVal.product.price * currentVal.count)
            }, 0)
        },
        removeItemById(id) {
            let index = basket.findIndex((item) => item.id === id);
            basket.splice(index, 1);
        }
    }
}
)();

//OBSERVER

class Subject {
    observers = {};
    on(event, fn) {
        if (event in this.observers) {
            this.observers[event].push(fn);
        } else {
            this.observers[event] = [fn];
        }
    }
    emit(event, msg) {
        for (let observer of this.observers[event]) {
            observer(msg);
        }
    }
}