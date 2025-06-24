import { use } from 'react';
import type { User } from '../types/user';
import { UserContext } from '../context/context';

interface UseUser {
    users: User[];
    loadData: () => Promise<void>;
}

export const useUser = (): UseUser => {
 
    const {
        users, 
        setUsers,
        repo
    } = use(UserContext)

    const loadData = async (): Promise<void> => {
        const users = await repo.getAll();
        setUsers(users);
    };

    return {
        users,
        loadData,
    };
};
