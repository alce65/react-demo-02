import { useState } from "react";

export const SampleNever : React.FC = () => {

    const [state, setState] = useState<string[]>([]);

    return (
        <div>
            <h1>Sample Never</h1>
            <p>Never es un tipo de dato que nunca puede ser alcanzado.</p>
            <p>Por ejemplo, una función que lanza un error o entra en un bucle infinito.</p>
            <button
                onClick={() => {
                  setState((prevState) => [...prevState, 'Patata']);
                }}
            >
                Añadir "Patata"
            </button>
            <ul>
                {state.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )

}


export const SampleUnknown : React.FC = () => {


    const [state, setState] = useState<unknown[]>([]);

    return (
        <div>
            <h1>Sample Never</h1>
            <p>Never es un tipo de dato que nunca puede ser alcanzado.</p>
            <p>Por ejemplo, una función que lanza un error o entra en un bucle infinito.</p>
            <button
                onClick={() => {
                  setState((prevState) => [...prevState, 'Patata']);
                }}
            >
                Añadir "Patata"
            </button>
            <ul>
                {state.map((item, index) => (
                    <li key={index}>{item as string}</li>
                ))}
            </ul>
        </div>
    )

}
