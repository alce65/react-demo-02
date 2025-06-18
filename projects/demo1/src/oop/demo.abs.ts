
interface TechStudent {
    solveProblems(): void;
}


abstract class Person  {

    static id = 0; // Static property
    static setId (): number {
        return ++Person.id;
    };

    protected name: string;
    // #age : number; // Private field
    private _age: number; // Public property
    private country: string; // Private property

    constructor(name: string, age: number, country =  'Spain') {
        this.name = name;
        this._age = age;
        this.country = country;
    }

    get age(): number {
        return this.age;
    }

    set age(value) {
        if (value < 0) {
            throw new Error('Age cannot be negative.');
        }
        this._age = value;
    }

    greet(): void {
        console.log(
            `Hello, my name is ${this.name} and I am ${this._age} years old. I am from ${this.country}`,
        );
    }

    abstract register(): void 
}

class Student extends Person implements TechStudent {
    course: string;
    constructor(name: string, age: number, country: string,  course: string) {
        super(name, age, country);
        this.course = course;
    }
    
    solveProblems(): void {
        console.log(`${this.name} is solving problems in ${this.course}.`);
    }


    greet(): void {
        super.greet();
        console.log(`i am student of ${this.course}.`);
    }

    study(): void {
        console.log(`${this.name} is studying.`);
    }

    register(): void {
        console.log(`${this.name} has registered for the course ${this.course}.`);
    }
}

const student = new Student('Alice', 20, 'UK', 'TypeScript');
student.greet(); // Hello, my name is Alice and I am 20 years old.
student.study(); // Alice is studying.
student.age = 21; // Update age
console.log(student.age); // 21





