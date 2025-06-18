import { useId, useState } from 'react';

interface RegisterData {
    name: string;
    email: string;
    isOkConditions: boolean;
    turn: string;
    course: string;
}

const initialRegisterData: RegisterData = {
    name: '',
    email: '',
    isOkConditions: false,
    turn: '',
    course: '',
};

export const FormC: React.FC = () => {

    const isOkId = useId()
    const turneMId = useId()
    const turneTId = useId()
    const turneNId = useId()


    const [registerData, setRegisterData] =
        useState<RegisterData>(initialRegisterData);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        console.log('Datos del formulario:', registerData);
    };

    const handleChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLSelectElement
    > = (event) => {
        const { name, value, type } = event.target;

        setRegisterData((prevData) => ({
            ...prevData,
            [name]:
                type === 'checkbox'
                    ? (event.target as HTMLInputElement).checked
                    : value,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Formulario controlado</h2>
            <div className="group-control">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={registerData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="group-control">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={handleChange}
                />
            </div>

            <div className="group-control">
                <input
                    type="checkbox"
                    name="isOkConditions"
                    id={isOkId}
                    checked={registerData.isOkConditions}
                    onChange={handleChange}
                />
                <label htmlFor={isOkId}>Acepto las condiciones...</label>
            </div>

            <fieldset name="turn">
                <legend>Selecciona un turno</legend>
                <input
                    type="radio"
                    name="turn"
                    id={turneMId}
                    value="M"
                    onChange={handleChange}
                />
                <label htmlFor={turneMId}>Mañana</label>
                <input
                    type="radio"
                    name="turn"
                    id={turneTId}
                    value="T"
                    onChange={handleChange}
                />
                <label htmlFor={turneTId}>Tarde</label>
                <input
                    type="radio"
                    name="turn"
                    id={turneNId}
                    value="N"
                    onChange={handleChange}
                />
                <label htmlFor={turneNId}>Noche</label>
            </fieldset>

            <label htmlFor="course">Elige un curso</label>
            <select
                name="course"
                id="course"
                value={registerData.course}
                onChange={handleChange}
            >
                <option value=""></option>
                <option value="A">Angular</option>
                <option value="R">React</option>
                <option value="N">Node</option>
            </select>
            <button type="submit">Enviar</button>
        </form>
    );
};
