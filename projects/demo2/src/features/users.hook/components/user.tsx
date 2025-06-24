

import type { UserRepo } from '../services/user-repo';
import { useUser } from '../hooks/user';
import { InMemoryUserRepo } from '../services/inmemory-user-repo';

const repo: UserRepo = new InMemoryUserRepo();
// const repo1: UserRepo = new ApiUserRepo(BASE_URL);


export const UsersHook: React.FC = () => {

    const {users, loadData} = useUser(repo)

    const handleClic: React.MouseEventHandler = () => {
        loadData();
    }

   
    return (
        <div>
            <h1>Users from Hook</h1>
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




