import { useState, type PropsWithChildren } from 'react';
import { UserContext } from './context';
import type { User } from '../types/user';
import { InMemoryUserRepo } from '../services/inmemory-user-repo';
import type { UserRepo } from '../services/user-repo';

export const UserContextProvider: React.FC<PropsWithChildren> = ({
    children,
}) => {

    const repo: UserRepo = new InMemoryUserRepo();
    const [users, setUsers] = useState<User[]>([]);


    const context: UserContext = {
        users: users,
        setUsers: setUsers,
        repo
    };

    // Desde React 19

    return <UserContext value={context}>{children}</UserContext>;
};
