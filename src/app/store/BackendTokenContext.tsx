import { createContext, useState } from "react"

export const BackendTokenContext = createContext<{ token: string | null, setToken?: (token: string | null) => void }>({ token: null });

export const BackendContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <BackendTokenContext.Provider value={{ token, setToken }}>
            {children}
        </BackendTokenContext.Provider>
    )
}