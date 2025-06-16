import { forwardRef, useRef, type MouseEventHandler } from 'react';

export const FormFocus: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus: MouseEventHandler<HTMLButtonElement> = () => {
        //document.querySelector("input")?.focus();

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div>
            <h2>Focus on Input Example</h2>
            <Input
                name="click"
                type="text"
                ref={inputRef}
                placeholder="Click the button to focus"
            />
            <button onClick={handleFocus}>Focus Input</button>
        </div>
    );
};

interface InputProps {
    name: string;
    type?: string;
    placeholder?: string;
    // ref?: React.Ref<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ name, type, placeholder }, ref) => {
        return (
            <input
                ref={ref} // Referencia al input
                type={type}
                id="fc2-name"
                name={name}
                placeholder={placeholder}
            />
        );
    },
);
