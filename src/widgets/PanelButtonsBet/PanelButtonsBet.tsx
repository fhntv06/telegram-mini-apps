import { useState } from 'react'
import { ButtonBet } from '../../feature'

const arBets = [0.5, 1, 2, 5, 10]

export const PanelButtonsBet = () => {
	const [bet, setBet] = useState<number | null>(null);

	const handlerBet= (bet: number) => {
		console.log('bet is ', bet)
    setBet(bet)
	}

  return (arBets.map((item) => <ButtonBet key={item} bet={item} className={ bet === item ? 'active' : '' } onClick={() => handlerBet(item)} />))
}