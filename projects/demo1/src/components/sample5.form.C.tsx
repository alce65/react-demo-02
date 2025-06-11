export const Form: React.FC = () => {
    return (
        // <form onSubmit={handleSubmit}>
        <form>
            <h2>Formulario controlado</h2>
            <div className="group-control">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    //value={formData.name}
                    //onChange={handleChange}
                />
            </div>
            <div className="group-control">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    //value={formData.email}
                    //onChange={handleChange}
                />
            </div>

            <div className="group-control">
                <input
                    type="checkbox"
                    name="isOkConditions"
                    id="is-ok"
                    // checked={userData.isOkConditions}
                    //onChange={handleChange}
                />
                <label htmlFor="is-ok">Acepto las condiciones...</label>
            </div>

            <fieldset name="turn">
                <legend>Selecciona un turno</legend>
                <input
                    type="radio"
                    name="turn"
                    id="turno-m"
                    value="M"
                    // onChange={handleChange}
                />
                <label htmlFor="turno-m">Mañana</label>
                <input
                    type="radio"
                    name="turn"
                    id="turno-t"
                    value="T"
                    // onChange={handleChange}
                />
                <label htmlFor="turno-t">Tarde</label>
                <input
                    type="radio"
                    name="turn"
                    id="turno-n"
                    value="N"
                    // onChange={handleChange}
                />
                <label htmlFor="turno-n">Noche</label>
            </fieldset>

            <label htmlFor="course">Elige un curso</label>
            <select
                name="course"
                id="course"
                // value={userData.course}
                // onChange={handleChange}
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
