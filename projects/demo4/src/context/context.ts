import type { ProductRepository } from "@products/services/product.repo";
import { createContext } from "react";

export interface AppContext {
    title: string;
    productsRepo: ProductRepository
}

const initialContext: AppContext = {} as AppContext;

export const AppContext = createContext<AppContext>(initialContext)
