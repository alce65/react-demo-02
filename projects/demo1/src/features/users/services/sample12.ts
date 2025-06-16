import type { User } from "../types/user";

export const getUser = (): Promise<User> => {
    console.log('Fetching data...');
    return new Promise<User>((resolve) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Pepe Pérez',
            });
        }, 500);
    });
};
