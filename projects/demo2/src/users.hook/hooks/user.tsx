import { useState } from 'react';
import type { User } from '../types/user';
import type { UserRepo } from '../services/user-repo';

interface UseUser {
    users: User[];
    loadData: () => Promise<void>;
}

export const useUser = (repo: UserRepo): UseUser => {
    const [users, setUsers] = useState<User[]>([]);

    const loadData = async (): Promise<void> => {
        const users = await repo.getAll();
        setUsers(users);
    };

    return {
        users,
        loadData,
    };
};
