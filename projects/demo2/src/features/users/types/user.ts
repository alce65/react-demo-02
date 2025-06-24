

// export namespace UserTypes {
//     export type UUID = `${string}-${string}-${string}-${string}-${string}`;

//     export interface User {
//         id: UUID;
//         name: string;
//         email: string;
//         role: 'admin' | 'user';
//     }

//     export type UserDTO = Omit<User, 'id'>;
// }



    export type UUID = `${string}-${string}-${string}-${string}-${string}`;

    export interface User {
        id: UUID;
        name: string;
        email: string;
        role: 'admin' | 'user';
    }

    export type UserDTO = Omit<User, 'id'>;



