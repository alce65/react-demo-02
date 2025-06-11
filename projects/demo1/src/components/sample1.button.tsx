
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type JSX  } from 'react';



export const Sample0Button = (): JSX.Element => {
   
    const handleClick = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        // const button = ev.target as HTMLButtonElement;
        const button = ev.currentTarget;
        console.log("Button clicked!");

    };

    const handleClick2: React.MouseEventHandler<HTMLButtonElement> = (ev) => {
         const button = ev.currentTarget;
        console.log("Button clicked!");
    }

    return (
        <button onClick={handleClick2}>
            Click Me
        </button>
    );
}
