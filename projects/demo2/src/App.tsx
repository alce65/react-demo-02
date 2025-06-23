import './App.css';
import { Header } from './core/components/header';
import { BASE_URL } from './core/config';
import { UserFromContext } from './users.context/components/user';
import { UserContextProvider } from './users.context/context/provider';
import { UsersHook } from './users.hook/components/user';
import { Users } from './users/components/user';
import { ApiUserRepo } from './users/services/api-user-repo';
import { InMemoryUserRepo } from './users/services/inmemory-user-repo';
import type { UserRepo } from './users/services/user-repo';

const repo: UserRepo = new InMemoryUserRepo();
const repo1: UserRepo = new ApiUserRepo(BASE_URL);


function App() {
    return (
        <>
            <Header />
            <h1>Demo 2</h1>
            <Users repo={repo}/>
            <Users repo={repo1}/>

            <p>Users desde User.Hook</p>
            <UsersHook />
            <p>Users desde User.Context</p>
            <UserContextProvider>
                <UserFromContext />  
            </UserContextProvider>

        </>
    );
}

export default App;
