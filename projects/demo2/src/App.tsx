import './App.css';
import { BASE_URL } from './core/config';
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
            <h1>Demo 2</h1>
            <Users repo={repo}/>
            <Users repo={repo1}/>

            <p>Users desde User.Hook</p>
            <UsersHook />

        </>
    );
}

export default App;
