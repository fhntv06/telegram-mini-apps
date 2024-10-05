import { GameStatusContext } from '../../contexts'

export const GameStatusProvider = ({ data, children }: { data: any, children: React.ReactNode }) => {
  return (
    <GameStatusContext.Provider value={data}>
      {children}
    </GameStatusContext.Provider>
  )
}