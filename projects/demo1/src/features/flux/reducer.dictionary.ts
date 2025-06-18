// Reducer
// Función pura (=> no efectos secundarios)
// a los mismos parámetros siempre devuelve el mismo resultado
// que recibe el estado actual y una acción,
// y devuelve un nuevo estado

import {
    type Action,
    type ActionTypes,
    type ActionWithPayloadBoolean,
    type ActionWithPayloadNumber,
} from './actions';
import type { CounterState } from './counter';

type Reducer = (state: CounterState, action: Action) => CounterState;

// export const reducers: Record<string, Reducer> = {

//     [actionTypes.Increment]: (state) => {
//         return { ...state,
//             value: state.value + 1,
//             clicks: state.clicks + 1 };
//     },
//     [actionTypes.Decrement]: (state) => {
//         return { ...state,
//             value: state.value - 1,
//             clicks: state.clicks + 1 };
//     },
//     [actionTypes.Reset]: (state) => {
//         return { ...state,
//             value: 0,
//             clicks: 0,
//             isActivo: false };
//     },
//     [actionTypes.Toggle]: (state) => {
//         return { ...state,
//             isActivo: !state.isActivo };
//     },
//     [actionTypes.Activate]: (state, action) => {
//         return { ...state,
//             isActivo: (action as ActionWithPayloadBoolean).payload };
//     },
//     [actionTypes.Deactivate]: (state, action) => {
//         return { ...state,
//             isActivo: (action as ActionWithPayloadBoolean).payload };
//     },
//     [actionTypes.Random]: (state, action) => {
//         return { ...state,
//             value: state.value + (action as ActionWithPayloadNumber).payload,
//             clicks: state.clicks + 1 };
//     }
// }

export const reducers: Record<ActionTypes, Reducer> = {
    Increment: (state) => {
        return { ...state, value: state.value + 1, clicks: state.clicks + 1 };
    },
    Decrement: (state) => {
        return { ...state, value: state.value - 1, clicks: state.clicks + 1 };
    },
    Reset: (state) => {
        return { ...state, value: 0, clicks: 0, isActivo: false };
    },
    Toggle: (state) => {
        return { ...state, isActivo: !state.isActivo };
    },
    Activate: (state, action) => {
        return {
            ...state,
            isActivo: (action as ActionWithPayloadBoolean).payload,
        };
    },
    Deactivate: (state, action) => {
        return {
            ...state,
            isActivo: (action as ActionWithPayloadBoolean).payload,
        };
    },
    Random: (state, action) => {
        return {
            ...state,
            value: state.value + (action as ActionWithPayloadNumber).payload,
            clicks: state.clicks + 1,
        };
    },
};

export const counterReducer: Reducer = (state, action) => {
    return reducers[action.type]
        ? // Si existe el reducer para la acción, lo ejecuta
          reducers[action.type](state, action)
        : // Si no existe, devuelve el estado sin cambios
          state;
};
