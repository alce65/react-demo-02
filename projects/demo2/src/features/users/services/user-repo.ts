import type { Repo } from "../../../core/repo";
import type { User, UserDTO } from "../types/user";

export type UserRepo = Repo<User, UserDTO>;


// export interface UserRepo<> {

//     getAll: () => Promise<User[]>;
//     getById: (id: User['id']) => Promise<User>;
//     create: (data: UserDTO) => Promise<User>;
//     update: (id: User['id'], data: Partial<UserDTO>) => Promise<User>;
//     delete: (id: User['id']) => Promise<void>;
// }
