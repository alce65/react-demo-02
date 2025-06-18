
class Person {

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
}

class Student extends Person {
    course: string;
    constructor(name: string, age: number, country: string,  course: string) {
        super(name, age, country);
        this.course = course;
    }

    greet(): void {
        super.greet();
        console.log(`i am student of ${this.course}.`);
    }

    study(): void {
        console.log(`${this.name} is studying.`);
    }
}

const person = new Person('John', 30, 'USA');
person.greet(); // Hello, my name is John and I am 30 years old.

const student = new Student('Alice', 20, 'UK', 'TypeScript');
student.greet(); // Hello, my name is Alice and I am 20 years old.
student.study(); // Alice is studying.
student.age = 21; // Update age
console.log(student.age); // 21


