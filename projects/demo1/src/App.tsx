import './App.css';

import { Counter } from './components/sample2.counter';
import { FormC } from './components/sample5.form.C';
import { FormNC } from './components/sample5.form.NC';
import { SampleEffectWrapper } from './components/sample9.wrapper';


export const App: React.FC = () => {
    return (
        <>
            <Counter>This is a simple counter component</Counter>
            <SampleEffectWrapper />
            <FormC />
            <FormNC />
        </>
    );
};
