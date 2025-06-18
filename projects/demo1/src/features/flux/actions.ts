// Posibles cambios del estada

// Nombre: type
// Datos: payload

//  Acciones
// {type: x, payload: y}

type ActionTypeWithoutPayload = 'Decrement' | 'Increment' | 'Toggle' | 'Reset';
type ActionTypeWithPayloadBoolean = 'Activate' | 'Deactivate';
type ActionTypeWithPayloadNumber = 'Random';

export type ActionTypes = ActionTypeWithoutPayload | ActionTypeWithPayloadBoolean | ActionTypeWithPayloadNumber;

export interface ActionWithPayloadNumber {
    type: ActionTypeWithPayloadNumber;
    payload: number
}

export interface ActionWithPayloadBoolean {
    type: ActionTypeWithPayloadBoolean;
    payload: boolean
}

export interface ActionWithoutPayload {
    type: ActionTypeWithoutPayload;
}


// export const actionTypes = {
//     Increment: 'Increment' as ActionTypeWithoutPayload,
//     Decrement: 'Decrement' as ActionTypeWithoutPayload,
//     Reset: 'Reset' as ActionTypeWithoutPayload,
//     Toggle: 'Toggle' as ActionTypeWithoutPayload,
//     Activate: 'Activate' as ActionTypeWithPayloadBoolean,
//     Deactivate: 'Deactivate' as ActionTypeWithPayloadBoolean,
//     Random: 'Random' as ActionTypeWithPayloadNumber   
// }

export type Action = ActionWithPayloadNumber | ActionWithPayloadBoolean | ActionWithoutPayload;


export const increment: Action = {
    // type: actionTypes.Increment,
    type: "Increment",
}

export const decrement: Action = {
    type:"Decrement",  
}

export const reset: Action = {
    type:"Reset",  
}

export const toggle: Action = {
    type:"Toggle",
}

export const activate: Action = {
    type:"Activate",
    payload: true
}

export const deactivate: Action = {
    type:"Deactivate",
    payload: false
}

export const random: Action = {
    type:"Random",
    payload: Math.floor(Math.random() * 10) + 1
}
