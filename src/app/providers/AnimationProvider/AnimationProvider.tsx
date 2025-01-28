import React, { useEffect } from 'react'
import { useAnimation, useSelector } from '../../../hooks'
import { AnimationContext } from '../../contexts'
import { AnimationBlock } from '../../../widgets/'

interface IProps {
  children: React.ReactNode
}

export const AnimationProvider = ({ children }: IProps) => {
  const { type, isOpen, openHandler, closeHandler, toggleHandler } = useAnimation()
  const { gamePhase } = useSelector((state) => state.gameStatus)

  useEffect(() => {
    if (gamePhase === 2) openHandler('consolidate')
  }, [gamePhase])

  return (
    <AnimationContext.Provider value={{ isOpen, openHandler, closeHandler, toggleHandler }}>
      {children}
      <AnimationBlock animation={type} />
    </AnimationContext.Provider>
  )
}
