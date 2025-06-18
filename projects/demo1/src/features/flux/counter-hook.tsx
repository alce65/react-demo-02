import { useReducer } from 'react';
import type { CounterState } from './counter';
import { counterReducer } from './reducer';
import * as ac from './action-creators';
import { getRandom } from './service';

export const useCounter = () => {
    const initialState: CounterState = {
        value: 0,
        clicks: 0,
        isActivo: false,
    } as const;

    const [countState, dispatch] = useReducer(counterReducer, initialState);

    const increment = (): void => {
        //setCount(prevCount => prevCount + 1);
        dispatch({ type: 'Increment' });
    };

    const decrement = (): void => {
        //setCount(prevCount => prevCount - 1);
        dispatch({ type: 'Decrement' });
    };

    const random = async (): Promise<void> => {
        // const randomValue = Math.floor(Math.random() * 10) + 1;
        try {
            const randomValue = await getRandom();
            dispatch(ac.createRandomAction(randomValue));
        } catch (error) {
            console.error('Error fetching random number:', error);
            return;
        }
        //setCount(prevCount => prevCount + randomValue);
        // dispatch({ type: 'Random', payload: randomValue });
    };

    const randomThunk = (): void => {
        const sign = Math.random() > 0.5 ? 1 : -1;
        ac.createRandomActionThunk(sign, getRandom)(dispatch);

    }

    const toggle = (): void => {
        dispatch({ type: 'Toggle' });
    };

    const reset = (): void => {
        dispatch({ type: 'Reset' });
    };

    return {
        countState,
        increment,
        decrement,
        random,
        randomThunk,
        toggle,
        reset,
    };
};
