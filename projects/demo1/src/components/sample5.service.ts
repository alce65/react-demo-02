

export const getDataForm = <
    T extends Record<string, boolean | FormDataEntryValue>,
>(
    form: HTMLFormElement,
    initialData: T,
): T => {
    const formData = new FormData(form);
    console.log('formData', formData);

    const data: Record<string, FormDataEntryValue | boolean> = {
        ...initialData,
    };

    // console.log(Object.fromEntries(formData.entries()));
    for (const [key, value] of formData) {
        if (typeof data[key as keyof typeof data] === 'boolean') {
            data[key] = value === 'on';
        } else {
            data[key] = value;
        }
    }

    return data as T 
};
