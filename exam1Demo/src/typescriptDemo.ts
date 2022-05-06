enum Color { Red, Blue, Yellow };
let c: Color = Color.Red;
console.log(c);

let user: [string, number][] = [["Gislain", 26]];

let user2: Array<string> = ["yellow"]

let Gislain: {
    name: string;
    age: number
} = {
    name: "N.G. Muhikira",
    age: 26
}

interface ICity {
    name: string;
}
interface IZipcode extends ICity {
    zipcode: number;
}
let northStreet: IZipcode = {
    name: "Fairfield",
    zipcode: 52557

}

interface ICourse {
    code: number;
    name: string;
    grade: number;
    setGrade(grade: number): void;
    getGrade(): number;
}

class Course implements ICourse {
    code: number;
    name: string;
    grade: number = 0;
    constructor(code: number, name: string) {
        this.code = code;
        this.name = name;
    }
    setGrade(grade: number): void {
        this.grade = grade;
    }
    getGrade(): number {
        return this.grade;
    }
}
let course = new Course(445, "Modern Asynchronous Programming");
interface person {
    constructor(firstname: string, lastname: string, grades: number[]): any;
    addGrade(grade: number): void;
    computeGrade(): number;
}

class Student {
    constructor(private firstname: string, private lastname: string, private grades: number[]) { }

    addGrade(grade: number): void {
        this.grades.push(grade);
    }
    computeGrade(): number {
        return this.grades.reduce((previousVal: number, currentVal: number) => previousVal + currentVal, 0) / this.grades.length;
    }
}

interface Employee {
    empId: number;
    calcMonthlyPay(): number;
}

class Hourly implements Employee {
    empId: number;
    hourlyWage: number;
    hoursPerweek: number;
    constructor(empId: number, hourlyWage: number, hoursPerweek: number) {
        this.empId = empId;
        this.hourlyWage = hourlyWage;
        this.hoursPerweek = hoursPerweek;
    }
    calcMonthlyPay(): number {
        return this.hourlyWage * this.hoursPerweek * 4;
    }

}

class Department {
    empId: string = "Dept01";
    employees: Hourly[] = [new Hourly(610001, 15, 6), new Hourly(610002, 16, 8), new Hourly(610003, 20, 5)];
    calcMonthlyAverageSalaryOfDepartment(): number {
        let sumSalary = 0;
        for (let sal of this.employees) {
            sumSalary += sal.calcMonthlyPay();
        }
        return sumSalary / this.employees.length;
    }
}

const arr:{
    firstname:string;
    middlename?:string;
    lastname:string
}[]=[{"firstname":"Gislain","lastname":"Muhikira",middlename:"Ntwali"},{firstname:"yurr",lastname:"yarrr"}]
 
