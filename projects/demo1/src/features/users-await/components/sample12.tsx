/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
//import type { User } from '../types/user';
//import { getUser } from '../services/sample12';
import { useUserLogin } from '../hooks/sample12';


export const UserLogin: React.FC = () => {
    const { user, loading, error, loadData} = useUserLogin()

    // const [user, setUser] = useState<User | null>(null);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<Error | null>(null);

    // const loadData = async (): Promise<void> => {
    //     try {
    //         const userData = await getUser();
    //         setUser(userData);
    //         setLoading(false);
    //     } catch (error: unknown) {
    //         setError(generateError(error));
    //         setLoading(false);
    //     }
    // };


    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <div>
            <h1>User Login</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {user && (
                <div>
                    <h2>Welcome, {user.name}!</h2>
                    <p>Your ID is: {user.id}</p>
                </div>
                // ) : (
                //     <button onClick={() => {
                //         setLoading(true);
                //         // Simulate a login API call
                //         setTimeout(() => {
                //             setUser({ id: 1, name: "John Doe" });
                //             setLoading(false);
                //         }, 1000);
                //     }}>
                //         Login
                //     </button>
            )}
        </div>
    );
};
