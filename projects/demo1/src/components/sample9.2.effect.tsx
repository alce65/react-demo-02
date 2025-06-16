import { useCallback, useEffect, useState } from 'react';

// const getData = (): Promise<string[]> => {
//     console.log('Fetching data...');
//     return new Promise<string[]>((resolve) => {
//         setTimeout(() => {
//             resolve(['Patata', 'Tomate', 'Cebolla']);
//         }, 1000);
//     });
// };

interface Props {
    getVegetables: () => Promise<string[]>;
}

export const SampleEffect: React.FC<Props> = ({ getVegetables }) => {
    const [state, setState] = useState<string[]>([]);

    // console.log('SampleEffect rendered');

    const loadData = useCallback(async () => {
        const data = await getVegetables();
        setState(data);
    }, [getVegetables]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return (
        <div>
            <h1>Sample useEffect</h1>
            <ul>
                {state.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};
