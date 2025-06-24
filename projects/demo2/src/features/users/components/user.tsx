import { useState } from 'react';
import type { User } from '../types/user';

import type { UserRepo } from '../services/user-repo';

// const repo: UserRepo = new InMemoryUserRepo();
// new ApiUserRepo(BASE_URL);

interface Props {   
    repo: UserRepo;

}

export const Users: React.FC<Props> = ({repo}) => {

    const [users, setUsers] = useState<User[]>([]);

    const handleClic: React.MouseEventHandler = async () => {
        const users = await repo.getAll();
        setUsers(users);
    };

    return (
        <div>
            <h1>Users</h1>
            <p>List of users will be displayed here.</p>
            <button onClick={handleClic}>Load Users</button>
            {users && users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.email} ({user.role})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users loaded.</p>
            )}
        </div>
    );
};




