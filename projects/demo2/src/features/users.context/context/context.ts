import { createContext } from "react";
import type { User } from "../types/user";
import type { UserRepo } from "../services/user-repo";



export interface UserContext {
    users : User[],
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    repo: UserRepo
}



export const UserContext = createContext<UserContext>({} as UserContext);

