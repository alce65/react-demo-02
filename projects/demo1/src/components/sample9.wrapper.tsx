import { SampleEffect } from "./sample9.2.effect";

export const SampleEffectWrapper: React.FC = () => {
    const getVegetables = () => {
        console.log('Fetching data...');
        return new Promise<string[]>((resolve) => {
            setTimeout(() => {
                resolve(['Patata', 'Tomate', 'Cebolla']);
            }, 100);
        });
    };

    return (
        <div>
            <SampleEffect getVegetables={getVegetables} />
        </div>
    );
};
