import { useSelector } from 'react-redux'
import { ButtonBet } from '../../feature'
import { arBets } from '../../shared'

export const PanelButtonsBet = () => {
  const { bet } = useSelector((state: any) => state.bets)

  return (arBets.map((item) => <ButtonBet key={item} bet={item} className={ bet === item ? 'active' : '' } />))
}
