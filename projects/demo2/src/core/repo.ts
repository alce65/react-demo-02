export interface Repo<T extends {id: unknown}, D> {

    getAll: () => Promise<T[]>;
    getById: (id: T['id']) => Promise<T>;
    create: (data: D) => Promise<T>;
    update: (id: T['id'], data: Partial<D>) => Promise<T>;
    delete: (id: T['id']) => Promise<void>;
}
