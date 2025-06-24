import { useUser } from '../hooks/user';


export const UserFromContext: React.FC = () => {

    const {users, loadData} = useUser()

    const handleClic: React.MouseEventHandler = () => {
        loadData();
    }

   
    return (
        <div>
            <h1>Users from Context</h1>
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




