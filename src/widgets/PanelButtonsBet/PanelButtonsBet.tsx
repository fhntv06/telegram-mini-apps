import { useState } from 'react'
import { ButtonBet } from '../../feature'
import { arBets } from '../../shared/constants'

export const PanelButtonsBet = () => {
	const [bet, setBet] = useState<number | null>(null);

  return (arBets.map((item) => <ButtonBet key={item} bet={item} className={ bet === item ? 'active' : '' } onClick={() => setBet(item)} />))
}