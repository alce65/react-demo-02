import type { User, UserDTO, UUID } from "../types/user";
import type { UserRepo } from "./user-repo";

export class ApiUserRepo implements UserRepo {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getAll(): Promise<User[]> {
        const response = await fetch(`${this.baseUrl}/users`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    }

    async getById(id: UUID): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users/${id}`);
        if (!response.ok) {
            throw new Error(`User with id ${id} not found`);
        }
        return response.json();
    }

    async create(data: UserDTO): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to create user');
        }
        return response.json();
    }

    async update(id: UUID, data: Partial<UserDTO>): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Failed to update user with id ${id}`);
        }
        return response.json();
    }

    async delete(id: UUID): Promise<void> {
        const response = await fetch(`${this.baseUrl}/users/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error(`Failed to delete user with id ${id}`);
        }
    }
}
