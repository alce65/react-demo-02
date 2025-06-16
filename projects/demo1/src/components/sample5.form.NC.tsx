import { getDataForm } from './sample5.service';

export interface RegisterData {
    name: string;
    email: string;
    isOkConditions: boolean;
    turn: string;
    course: string;
}

const registerData: RegisterData = {
    name: '',
    email: '',
    isOkConditions: false,
    turn: '',
    course: '',
};

// eslint-disable-next-line react-refresh/only-export-components
// export const registerData: Record<string, string | boolean> = {
//     name: '',
//     email: '',
//     isOkConditions: false,
//     turn: '',
//     course: '',
// };

export const FormNC: React.FC = () => {
    // const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    //     event.preventDefault();
    //     const form = event.currentTarget;
    //     // const element = form.elements.namedItem('name') as HTMLInputElement;
    //     // console.dir(element.value);

    //     type K = keyof typeof registerData;
    //     // K = "name" | "email" | "isOkConditions" | "turn" | "course"
    //     const registerKeys  = Object.keys(registerData) as K[];
    //     console.log(registerKeys);

    //     registerKeys.forEach((key) => {
    //         const element = form.elements.namedItem(key) as HTMLInputElement | HTMLSelectElement;
    //         registerData[key] = element.type === 'checkbox' ? element.checked : element.value
    //     });

    //     console.log(registerData);
    // }

    const handleSubmitFD: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        const data: Record<string, FormDataEntryValue | boolean> = {
            ...registerData,
        };

        console.log(getDataForm(form, data));
        // const formData = new FormData(form);
        // console.log('formData', formData);

        // const data: Record<string, FormDataEntryValue | boolean> = {
        //     ...registerData,
        // };

        // // console.log(Object.fromEntries(formData.entries()));
        // for (const [key, value] of formData) {
        //     if (
        //         typeof registerData[key as keyof typeof registerData] ===
        //         'boolean'
        //     ) {
        //         data[key] = value === 'on';
        //     } else {
        //         data[key] = value;
        //     }
        // }
    };

    return (
        <form onSubmit={handleSubmitFD}>
            <h2>Formulario NO controlado</h2>
            <div className="group-control">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    required
                    //value={formData.name}
                />
            </div>
            <div className="group-control">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    //value={formData.email}
                />
            </div>

            <div className="group-control">
                <input
                    type="checkbox"
                    name="isOkConditions"
                    id="is-ok"
                    // checked={userData.isOkConditions}
                />
                <label htmlFor="is-ok">Acepto las condiciones...</label>
            </div>

            <fieldset name="turn">
                <legend>Selecciona un turno</legend>
                <input type="radio" name="turn" id="turno-m" value="M" />
                <label htmlFor="turno-m">Mañana</label>
                <input type="radio" name="turn" id="turno-t" value="T" />
                <label htmlFor="turno-t">Tarde</label>
                <input type="radio" name="turn" id="turno-n" value="N" />
                <label htmlFor="turno-n">Noche</label>
            </fieldset>

            <label htmlFor="course">Elige un curso</label>
            <select
                name="course"
                id="course"
                // value={userData.course}
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
