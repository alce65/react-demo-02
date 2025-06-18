import type { Action } from "./actions";
import { counterReducer } from "./reducer";

describe('counterReducer Tets', () => {
    it('should increment the value', () => {
        const initialState = { value: 0, clicks: 0, isActivo: false };
        const action: Action = { type: 'Increment' };
        const newState = counterReducer(initialState, action);
        expect(newState.value).toBe(1);
        expect(newState.clicks).toBe(1);
    });

    it('should decrement the value', () => {
        const initialState = { value: 1, clicks: 1, isActivo: false };
        const action: Action = { type: 'Decrement' };
        const newState = counterReducer(initialState, action);
        expect(newState.value).toBe(0);
        expect(newState.clicks).toBe(2);
    });

    it('should reset the value', () => {
        const initialState = { value: 5, clicks: 3, isActivo: true };
        const action: Action = { type: 'Reset' };
        const newState = counterReducer(initialState, action);
        expect(newState.value).toBe(0);
        expect(newState.clicks).toBe(0);
        expect(newState.isActivo).toBe(false);
    });

    it('should toggle isActivo state', () => {
        const initialState = { value: 0, clicks: 0, isActivo: false };
        const action: Action = { type: 'Toggle' };
        const newState = counterReducer(initialState, action);
        expect(newState.isActivo).toBe(true);
    });

    it('should activate state', () => {
        const initialState = { value: 0, clicks: 0, isActivo: false };
        const action: Action = { type: 'Activate', payload: true };
        const newState = counterReducer(initialState, action);
        expect(newState.isActivo).toBe(true);
    });

    it('should deactivate state', () => {
        const initialState = { value: 0, clicks: 0, isActivo: true };
        const action: Action = { type: 'Deactivate', payload: false };
        const newState = counterReducer(initialState, action);
        expect(newState.isActivo).toBe(false);
    });

    it('should increment by a random value', () => {
        const initialState = { value: 0, clicks: 0, isActivo: true };
        const randomValue = 5;
        const action: Action = { type: 'Random', payload: randomValue };
        const newState = counterReducer(initialState, action);
        expect(newState.value).toBe(randomValue);
        expect(newState.clicks).toBe(1);
    }); 
})
