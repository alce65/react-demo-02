import { USERS } from '../data/users.mock';
import type { User, UserDTO, UUID } from '../types/user';
import type { UserRepo } from './user-repo';

export class InMemoryUserRepo implements UserRepo {
    private users: User[] = USERS;

    constructor() {
        console.log('Instanciando InMemoryUserRepo');
    }

    async getAll(): Promise<User[]> {
        return [...this.users];
    }

    async getById(id: UUID): Promise<User> {
        const user = this.users.find((u) => u.id === id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }

    async create(data: UserDTO): Promise<User> {
        const id = crypto.randomUUID();
        const user: User = { id, ...data };
        this.users.push(user);
        return user;
    }

    async update(id: UUID, data: Partial<UserDTO>): Promise<User> {
        const idx = this.users.findIndex((u) => u.id === id);
        if (idx === -1) {
            throw new Error(`User with id ${id} not found`);
        }
        this.users[idx] = { ...this.users[idx], ...data };
        return this.users[idx];
    }

    async delete(id: UUID): Promise<void> {
        const idx = this.users.findIndex((u) => u.id === id);
        if (idx === -1) {
            throw new Error(`User with id ${id} not found`);
        }
        this.users.splice(idx, 1);
    }
}
