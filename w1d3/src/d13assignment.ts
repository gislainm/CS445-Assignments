/*eslint-disable */

//QUESTION 1
class University {
    name: string;
    dept: string;
    constructor(name: string, dept: string) {
        this.name = name;
        this.dept = dept;
    }
    graduation(year: number): void {
        console.log(`Graduating ${this.dept} ${year} students`)
    }
}

let miu: University = new University("MIU", "MSD");
miu.graduation(2021);


//QUESTION 2
let bankAccount: {
    money: number,
    deposit(value: number): void,
} = {
    money: 2000,
    deposit(value) {
        this.money += value;
    }
}

let myself: {
    name: string,
    bankAccount: typeof bankAccount,
    hobbies: string[],

} = {
    name: "John",
    bankAccount: bankAccount,
    hobbies: ["Violin", "Cooking"]
}
myself.bankAccount.deposit(3000);
console.log(myself);


//QUESTION 3
class Car {
    name: string;
    acceleration: number;
    constructor(name: string) {
        this.name = name;
        this.acceleration = 0;
    }
    honk(): void {
        console.log(`${this.name} is saying: Toooooooooot!`)
    }
    accelerate(speed: number): void {
        this.acceleration = this.acceleration + speed;
    }
}
let car: Car = new Car("BMW");
car.honk();//BMW is saying: Toooooooooot!
console.log(car.acceleration)//0
car.accelerate(60);
console.log(car.acceleration);//60


//QUESTION 4
let baseObject: {
    width: number,
    length: number
} = {
    width: 0,
    length: 0,
}

let rectangle: any = Object.create(baseObject);
rectangle.width = 5;
rectangle.length = 2;
rectangle.calcSize = function (): number {
    return this.width * this.length;
}
console.log(rectangle.calcSize());//10