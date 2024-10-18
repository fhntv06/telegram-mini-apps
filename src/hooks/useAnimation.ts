import { useState } from 'react'
import { IAnimationTypes } from '../widgets/types'

export const useAnimation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [type, setType] = useState<IAnimationTypes>(null)

  const openHandler = (type: IAnimationTypes = null) => {
    setIsOpen(true)
    setType(type)
  }

  const closeHandler = () => {
    setIsOpen(false)
    setType(null)
  }

  const toggleHandler = (type: IAnimationTypes = null) => {
    setIsOpen(!isOpen)
    setType(type ? null : type)
  }

  return {
    type, isOpen, openHandler, closeHandler, toggleHandler
  }
}
