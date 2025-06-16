import { useState } from 'react';

export const useToggle = (
    initialValue = false,
): readonly [boolean, () => void] => {
    const [value, setValue] = useState(initialValue);

    const toggle = (): void => {
        setValue((prev) => !prev);
    };

    return [value, toggle] as const;
};

export const useLocalStorage = <T,>(
    storageName: string,
    data: T,
): readonly [T, (newValue: T) => void] => {
    const [value, setValue] = useState<T>(() => {
        const storedValue = localStorage.getItem(storageName);
        return storedValue ? JSON.parse(storedValue) : data;
    });

    const setLocalStorage = (newValue: T): void => {
        setValue(newValue);
        localStorage.setItem(storageName, JSON.stringify(newValue));
    };

    return [value, setLocalStorage] as const;
};
