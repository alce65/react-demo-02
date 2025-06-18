import './App.css';
import { FormFocusR19 } from './components/sample10.focus.react19';

import { Counter } from './components/sample2.counter';
import { FormC } from './components/sample5.form.C';
import { FormNC } from './components/sample5.form.NC';
import { SampleEffectWrapper } from './components/sample9.wrapper';
import { CounterFlux } from './features/flux/counter-flux';
import { UserLogin } from './features/users-await/components/sample12';


export const App: React.FC = () => {
    return (
        <>
            <CounterFlux />
            <UserLogin />
            <Counter>This is a simple counter component</Counter>
            <SampleEffectWrapper />
            <FormC />
            <FormNC />
            <FormFocusR19 />
        </>
    );
};
