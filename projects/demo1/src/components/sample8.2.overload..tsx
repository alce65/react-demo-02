// Ejemplo más complejo en React

// 1️⃣ Firmas de sobrecarga
function getDisplayValue(value: string): string;
function getDisplayValue(value: number, decimals: number): string;
function getDisplayValue(value: Date, code: string): string;

// 2️⃣ Firma de Implementación & implementación
function getDisplayValue(
    value: number | Date | string,
    decimalOrCode?: number | string,
): string {
    if (typeof value === 'number') {
        return value.toFixed(decimalOrCode as number);
    }

    if (value instanceof Date) {
        return value.toLocaleDateString(decimalOrCode as string);
    }

    return value.trim();
}

console.log(getDisplayValue(' 23 ')); // '23'
console.log(getDisplayValue(23, 2)); // '23.00'
console.log(getDisplayValue(new Date(), 'es-ES'));

interface Props {
    label: string;
    value: number | Date | string;
    options?: number | string;
}

export const DisplayField: React.FC<Props> = ({ label, value, options }) => {
    return (
        <div>
            {value instanceof Date && typeof options === 'string' && (
                <p>
                    <strong>{label}:</strong>
                    <span> - </span>
                    <span>{getDisplayValue(value, options)}</span>
                </p>
            )}
            {typeof value === 'number' && typeof options === 'number' && (
                <p>
                    <strong>{label}:</strong>
                    <span> - </span>
                    <span>{getDisplayValue(value, options)}</span>
                </p>
            )}
            {typeof value === 'string' && (
                <p>
                    <strong>{label}:</strong>
                    <span> - </span>
                    <span>{getDisplayValue(value)}</span>
                </p>
            )}
        </div>
    );
};

// Ejemplo de uso en un componente padre
export const UserInfo: React.FC = () => {
    return (
        <div>
            <DisplayField label="Edad" value={28} options={0} />
            <DisplayField
                label="Fecha de nacimiento"
                value={new Date('1995-08-15')}
                options={'es-ES'}
            />
            <DisplayField label="Nombre" value="   Alice   " />
        </div>
    );
};
