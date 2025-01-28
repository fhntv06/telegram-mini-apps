import {
  useEffect,
  useState
} from 'react'
import { IAnimationTypes } from '../widgets/types'

export const useAnimation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [type, setType] = useState<IAnimationTypes>(null)

  useEffect(() => {
    if (isOpen && type) {
      let time = 2000
      switch (type) {
        case 'consolidate':
          time = 1000
          break
        case 'loadPerson':
          time = 4000
          break
        case "wins":
          time = 3000
          break
      }

      const timer = setTimeout(() => closeHandler(), time)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

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
