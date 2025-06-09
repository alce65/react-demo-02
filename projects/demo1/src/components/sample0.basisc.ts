/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

// Tipos

// Inferencia de tipos
// ------------------

export let x = 22

// @ts-expect-error Error: Type 'string' is not assignable to type 'number'.
x = "Pepe"  

const obj = {
    name: "Pepe",
    age: 22,
    isActive: true,
    hobbies: ["reading", "gaming", "coding"],
}

// @ts-expect-error Error: Type 'string' is not assignable to type 'number'.
obj.age = "Adulto"

// @ts-expect-error Error: Property 'job' does not exist on type '{ name: string; age: number; isActive: boolean; hobbies: string[]; }'.
obj.job = "Developer" // Añadiendo una propiedad nueva

// Anotación de tipos
// -----------------

let z : number
z = 33

// Anotación de parámetros y retorno de funciones
// ---------------------------------------------

const make = (num1: number, num2: number): number => {
    return num1 + num2;
}

make(10, 20);

// Tipos literales
// -------------
const name = "Pepe" // Literal type: "Pepe"
let age = 22 as const // Literal type: 22  
// @ts-expect-error Error: Type '23' is not assignable to type '22'.  
age = 23

let state : "active" | "inactive" = "active"; // Literal union type
state = "inactive"; // Valid assignment
// @ts-expect-error Error: Type '"pending"' is not assignable to type '"active" | "inactive"'.
state = "pending"; // Invalid assignment, will cause an error

// Tipo ANY
// -----------

let w
w = 12
w = "Pepe"

const add = (num1: unknown, num2: unknown) => {
    console.log(num1, num1)

    if( typeof num1 === "number" && typeof num2 === "number") {
        return num1 + num2;
    }

}

