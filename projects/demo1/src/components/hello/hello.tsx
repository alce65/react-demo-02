import type { JSX } from "react";

interface Props {user: string}

export const HelloFriend = ({user}: Props) : JSX.Element=> {
    return (
        <div>
            <h1>Hello, {user}</h1>
            <p>This is a simple component in a React application.</p>
        </div>
    );
};

export const HelloFriend2: React.FC<Props> = ({user}) => {
    return (
        <div>
            <h1>Hello, {user}</h1>
            <p>This is a simple component in a React application.</p>
        </div>
    );
};


export const HelloWorld: React.FC = ()=> {
    return (
        <div>
            <h1>Hello, world</h1>
            <p>This is a simple component in a React application.</p>
        </div>
    );
};
