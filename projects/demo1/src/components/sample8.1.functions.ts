/* eslint-disable @typescript-eslint/no-unused-vars */
export function format (x: string, y: boolean): string
export function format (x: boolean, y: number): string
export function format (x: string | boolean, y: number | boolean): string  {
   
    if (typeof x === "string" && typeof y === "boolean") {
        console.log(y)
    } else if (typeof x === "boolean") {
        console.log(y)
    }
    return ""

}


