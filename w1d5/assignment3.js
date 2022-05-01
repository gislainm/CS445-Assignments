"use strict";
/*eslint-disable */

//QUESTION 1
const shoppingCart = (
    function () {
        let basket = [];
        return {
            upsertItem(item) {
                if (basket.filter((element) => element.id == item.id).length == 0) {
                    basket.push(item);
                } else {
                    for (let element of basket) {
                        if (element.id == item.id) {
                            basket.splice(basket.indexOf(element), 1, item)
                        }
                    }
                }
            },
            getItemsCount() {
                return basket.length;
            },
            getTotalPrice() {
                let totalPrice = basket.reduce((initalVal, prevVal) => initalVal + (prevVal.product.price * prevVal.count), 0);
                return totalPrice;
            },
            removeItemById(id) {
                basket = basket.filter(item => item.id != id)
            }
        }
    }
)()

const item1 = { id: 0, product: { id: 1, name: 'Coffee', description: 'Coffee Grounds from Ethiopia', price: 9 }, count: 1 }
const item2 = { id: 1, product: { id: 2, name: 'Tea', description: 'Oonlong Tea from China', price: 10 }, count: 5 }
const item3 = { id: 2, product: { id: 3, name: 'Bottled Water', description: 'Bottled Water from US', price: 2 }, count: 30 }

shoppingCart.upsertItem(item1);
shoppingCart.upsertItem(item2);
shoppingCart.upsertItem(item3);
console.log(shoppingCart.getTotalPrice()); //Expected Result: 119
item3.product.name = 'Himilayan Water';
item3.product.price = 10;
shoppingCart.upsertItem(item3);

console.log(shoppingCart.getItemsCount()); //Expected Result: 3
console.log(shoppingCart.getTotalPrice()); //Expected Result: 359
shoppingCart.removeItemById(1);
console.log(shoppingCart.getItemsCount()); //Expected Result: 2
console.log(shoppingCart.getTotalPrice()); //Expected Result: 309


//QUESTION 2
class Subject {
    observers = {};
    on(event, fn) {
        if (Object.keys(this.observers).includes(event)) {
            for (let key in this.observers) {
                if (key == event) {
                    this.observers[key].push(fn);
                }
            }
        } else {
            this.observers[event] = [fn];
        }
    }
    emit(event, message) {
        for (let fn of this.observers[event]) {
            fn(message)
        }
    }
}

const subject = new Subject();
subject.on('eat', console.log); // register an observer
subject.on('study', console.log); // register an observer

function foo(msg) {
    console.log('foo: ' + msg);
}
subject.on('eat', foo);
subject.on('study', foo);

subject.emit('eat', 'Corn');
//output for Line above: subject.emit('eat', 'Corn');
// Corn
// foo: Corn
subject.emit('study', 'cs445');
//output for Line above: subject.emit('study', 'cs445');
// cs445
// foo: cs445
