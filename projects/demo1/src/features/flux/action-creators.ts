import type { Action, ActionWithPayloadNumber } from './actions';

export const createIncrementAction = (): Action => ({
    type: 'Increment',
});

export const createDecrementAction = (): Action => ({
    type: 'Decrement',
});

export const createResetAction = (): Action => ({
    type: 'Reset',
});

export const createToggleAction = (): Action => ({
    type: 'Toggle',
});

export const createActivateAction = (payload: boolean): Action => ({
    type: 'Activate',
    payload,
});

export const createDeactivateAction = (payload: boolean): Action => ({
    type: 'Deactivate',
    payload,
});

export const createRandomAction = (payload: number): Action => ({
    type: 'Random',
    payload,
});

export const createRandomActionThunk =
    (value = 1, callback: () => Promise<number>) =>
    async (dispatch: React.Dispatch<Action>): Promise<void> => {
        const data = await callback();
        if (data === undefined) {
            console.error('No se ha podido obtener el valor');
            return;
        }

        const ac = (num: number): ActionWithPayloadNumber => ({
            type: 'Random',
            payload: num,
        });
        dispatch(ac(value * data));
    };
