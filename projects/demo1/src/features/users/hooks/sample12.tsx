import { useEffect, useState } from 'react';
import type { User } from '../types/user';
import { getUser } from '../services/sample12';

interface UseUserLogin {
    user: User | null;
    loading: boolean;
    error: Error | null;
}


export const useUserLogin = (): UseUserLogin => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const loadData = (): void => {
        getUser()
            .then((userData) => {
                setUser(userData);
                setLoading(false);
            })
            .catch((err: Error) => {
                setError(err);
                setLoading(false);
            });
    };

    useEffect(loadData, []);

    return { user, loading, error };
};
