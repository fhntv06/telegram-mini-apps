import { createContext } from "react"

export const BackendTokenContext = createContext<{ token: string | null, setToken?: (token: string | null) => void }>({ token: null });

