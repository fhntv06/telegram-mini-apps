import { useState } from 'react'
import { ButtonBet } from '../../feature'
import { arBets } from '../../shared/constants.ts'

export const PanelButtonsBet = () => {
	const [bet, setBet] = useState<number | null>(null);

	const handlerBet= (bet: number) => {
		console.log('bet is ', bet)

		alert(`Your bet is ${bet}`)

    setBet(bet)
	}

  return (arBets.map((item) => <ButtonBet key={item} bet={item} className={ bet === item ? 'active' : '' } onClick={() => handlerBet(item)} />))
}