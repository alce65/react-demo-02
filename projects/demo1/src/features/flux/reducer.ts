// Reducer
// Función pura (=> no efectos secundarios)
// a los mismos parámetros siempre devuelve el mismo resultado
// que recibe el estado actual y una acción, 
// y devuelve un nuevo estado

import type { Action } from "./actions";
import type { CounterState } from "./counter";


type Reducer = (state: CounterState, action: Action) => CounterState;


export const counterReducer: Reducer = (state , action )  => {

 switch (action.type) {
    case 'Increment':
      return { ...state, 
        value: state.value + 1, 
        clicks: state.clicks + 1 };
    case 'Decrement':
      return { ...state, 
        value: state.value - 1, 
        clicks: state.clicks + 1 };
    case 'Reset':
      return { ...state, 
        value: 0, 
        clicks: 0,
        isActivo: false };
    case 'Toggle':
      return { ...state, 
        isActivo: !state.isActivo };
    case 'Activate':
      return { ...state, 
        isActivo: action.payload };
    case 'Deactivate':
      return { ...state, 
        isActivo: action.payload };
    case 'Random':
      return { ...state, 
        value: state.value + action.payload, 
        clicks: state.clicks + 1 };
    default:
      return state;
  }
}
