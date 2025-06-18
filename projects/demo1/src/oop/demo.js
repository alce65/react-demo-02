// ES6 (2005) - class syntax

class Person {
    static id = 0; // Static property
    static setId () {
        return ++Person.id;
    };

    name;
    #age;

    constructor(name, age) {
        this.id = Person.setId();
        this.name = name;
        this.#age = age;
    }

    get age() {
        return this.#age;
    }

    // set age(value) {
    //     if (value < 0) {
    //         throw new Error('Age cannot be negative.');
    //     }
    //     this.#age = value;
    // }

    greet() {
        console.log(
            `Hello, my name is ${this.name} and I am ${this.age} years old.`,
        );
    }
}

class Student extends Person {
    constructor(name, age, studentId) {
        super(name, age);
        this.studentId = studentId;
    }

    greet() {
        super.greet();
        console.log(`My student ID is ${this.studentId}.`);
    }

    study() {
        console.log(`${this.name} is studying.`);
    }
}

const student = new Student('Alice', 20, 'S12345');
student.greet(); // Hello, my name is Alice and I am 20 years old.
student.study(); // Alice is studying.
student.age = 21; // Update age
console.log(student.age); // 21
console.log(Person.species); // undefined (static property not set)
