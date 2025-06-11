/* eslint-disable @typescript-eslint/consistent-type-definitions */
type UserName = string;
type ID = number | string;
export type Tuple = readonly [string, number];
export type status = 'active' | 'inactive' | 'pending';


export type UserT = {
    id: ID;
    name: UserName;
    age: number;
    isActive: boolean;
    hobbies?: string[];
};

//interface

export interface UserI {
    id: ID;
    name: UserName;
    age: number;
    isActive: boolean;
    hobbies: string[];
}

// Merge de inteerfaces

export interface UserI {
    job: string;
}

//

// export interface HTMLError extends Error {
//     code: string;
//     status: number;
// }

export type HTMLError = Error & {
    code: string;
    status: number;
};

export const error: HTMLError = {
    ...new Error('Not Found'),
    code: '404',
    status: 404,
};

export class UserClass implements UserT {
    // id: ID;
    // name: UserName;
    // age: number;
    // isActive: boolean;
    //hobbies: string[];

    constructor(
        public id: ID,
        public name: UserName,
        public age: number,
        public isActive: boolean,
    ) {
        // this.id = id;
        // this.name = name;
        // this.age = age;
        // this.isActive = isActive;
        // this.hobbies = hobbies;
    }
}

const status: status = 'pending'
