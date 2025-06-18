import { useCallback, useState } from 'react';
import type { User } from '../types/user';
import { getUser } from '../services/sample12';

interface UseUserLogin {
    user: User | null;
    loading: boolean;
    error: Error | null;
    loadData: () => Promise<void>;
}

const generateError = (error: unknown): Error => {
    if (error instanceof Error) {
        return error;
    } else if (typeof error === 'string') {
        return new Error(error);
    } else {
        return new Error('An unknown error occurred');
    }
};

export const useUserLogin = (): UseUserLogin => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const loadData = useCallback(async (): Promise<void> => {
        console.log('Loading user data...');
        try {
            const userData = await getUser();
            setUser(userData);
            setLoading(false);
        } catch (error: unknown) {
            setError(generateError(error));
            setLoading(false);
        }
    }, []);

    return { user, loading, error, loadData };
};
