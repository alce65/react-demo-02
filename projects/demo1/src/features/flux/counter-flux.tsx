import { useCounter } from './counter-hook';

export const CounterFlux: React.FC = () => {
    const { countState, increment, decrement, random, toggle, reset, randomThunk } =
        useCounter();

    return (
        <div>
            <h2>Counter (Flux)</h2>
            <p>Count: {countState.value}</p>
            <p>Clicks: {countState.clicks}</p>
            <button onClick={increment} disabled={!countState.isActivo}>
                Increment
            </button>
            <button onClick={decrement} disabled={!countState.isActivo}>
                Decrement
            </button>
            <button onClick={random} disabled={!countState.isActivo}>
                Increment random
            </button>

            <button onClick={randomThunk} disabled={!countState.isActivo}>
                Increment random Thunk
            </button>
            <button onClick={toggle}>
                {countState.isActivo ? 'DesActivar' : 'Activar'}
            </button>
            <button onClick={reset} disabled={!countState.isActivo}>
                Resetaer
            </button>
        </div>
    );
};
