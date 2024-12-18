import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAnimation } from '../../../hooks'
import { AnimationContext } from '../../contexts'
import { AnimationBlock } from '../../../widgets/'

interface IProps {
  children: React.ReactNode
}

export const AnimationProvider = ({ children }: IProps) => {
  const { type, isOpen, openHandler, closeHandler, toggleHandler } = useAnimation()
  const { gamePhase } = useSelector((state: any) => state.gameStatus)

  useEffect(() => {
    if (gamePhase === 2) openHandler('consolidate')
    else {
      const timer = setTimeout(() => openHandler(null), 2000)

      return () => clearTimeout(timer)
    }
  }, [type, gamePhase])

  return (
    <AnimationContext.Provider value={{ isOpen, openHandler, closeHandler, toggleHandler }}>
      {children}
      <AnimationBlock animation={type} />
    </AnimationContext.Provider>
  )
}