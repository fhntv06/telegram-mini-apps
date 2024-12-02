import { useState } from 'react'
import { ButtonBet } from '../../feature'
import { arBets } from '../../shared/constants'
import {useSelector} from "react-redux";

export const PanelButtonsBet = () => {
  const { bet } = useSelector((state: any) => state.bets)
	const [betButton, setBetButton] = useState<number>(bet);

  return (arBets.map((item) => <ButtonBet key={item} bet={item} className={ betButton === item ? 'active' : '' } onClick={() => setBetButton(item)} />))
}
