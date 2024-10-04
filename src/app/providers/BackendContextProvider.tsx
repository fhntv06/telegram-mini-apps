import { useState } from 'react'
import { BackendTokenContext } from '../contexts'

export const BackendContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(null);

	return (
		<BackendTokenContext.Provider value={{ token, setToken }}>
			{children}
		</BackendTokenContext.Provider>
	)
}