import React, { useState, type PropsWithChildren } from 'react';

type ErrorType = "Un error" | "Otro error" 
 
type Props = PropsWithChildren


export const Counter: React.FC<Props> = ({children}) => {
    const [counter, setCounter] = useState(0);
    const [error] = useState<null  | ErrorType>(null);

    const handlerClick: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
        const button = ev.currentTarget
        // const data: DOMStringMap = button.dataset;
        const {value}  = button.dataset
        console.log(value)
        setCounter((prev) => prev + Number(button.value));
    }

    return (
        <div>
            <h1>Sample Component {counter}</h1>
            <p>{children}</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p></p>
            <button onClick={handlerClick} value={1} data-value= {1}>➕</button>
            <button onClick={handlerClick} value ={-1} data-value={-1}>➖</button>
        </div>
    );
};
