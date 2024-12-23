import {useContext, useState} from 'react'
import classNames from 'classnames/bind'
import { AnimatePresence, motion, useWillChange } from 'framer-motion'
import { Icon } from '../'
import { useDisconnect, useSetLang, useSelector } from '../../../hooks'
import { ISelectOption, ISelect } from './types'
import { ModalContextTypes } from '../../../app/providers/ModalProvider/types'
import { ModalContext } from '../../../app/contexts'
import { arLanguagesPhraseSite } from '../../constants'

import styles from './Select.module.scss'

const cx = classNames.bind(styles)

export const Select = ({ data, className = '', typeStyle = '' }: ISelect) => {
  const willChange = useWillChange()
  const handlerDisconnect = useDisconnect()
  const handlerSetLang = useSetLang()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<ISelectOption>(data.find((item) => item.active) || data[0]);
  const { name } = useSelector((state) => state.language)
  const { openHandler: openHandlerModal } = useContext<ModalContextTypes>(ModalContext)

  const handleDropdownToggle = () => {
    if (data.length > 1 && !disabled) {
      setIsOpen(!isOpen)
      setDisabled(true)
    }
  }
  const handleOptionSelect = (option: ISelectOption) => {
    if (!option.blockSelect) setSelectedOption(option)
    handleDropdownToggle()

    if (option.action === 'disconnect') handlerDisconnect()
    if (option.action === 'set-lang') handlerSetLang(option)
    if (option.action === 'topUp') openHandlerModal('wallet')
  }

  // @ts-ignore
  return (
    <div className={cx('select', className, typeStyle)}>
      <button className={cx('select__header')} onClick={handleDropdownToggle} disabled={disabled}>
        <div className={cx('select__header-left')}>
          {(selectedOption.icon.indexOf('image/png') === -1)
            ? <Icon className={cx('select__icon')} name={selectedOption.icon} size='big'/>
            : <img src={selectedOption.icon}  alt='icon' />
          }
          {/* @ts-ignore */}
          <p>{selectedOption.customText ? selectedOption.name : arLanguagesPhraseSite[name][selectedOption.name]}</p>
        </div>
        <Icon name={isOpen ? 'arrow-up' : 'arrow-down'} size='big' />
      </button>
      <AnimatePresence>
        {(data.length > 1 && isOpen) && (
          <motion.ul
            className={cx('select__list')}
            initial={{ maxHeight: 0 }}
            animate={{ maxHeight: 194 }}
            exit={{ maxHeight: 0 }}
            transition={{
              delay: .1,
              duration: .3,
              ease: isOpen ? 'easeIn' : 'easeOut',
            }}
            onAnimationComplete={() => setDisabled(false)}
            style={{ willChange }}
          >
            {data.map((item) => (
              item.name !== selectedOption.name && (
                <li
                  key={item.name}
                  className={cx('select__item', { disabled: item.disabled })}
                  onClick={() => {
                    if (!item.disabled) {
                      if (item.onClick) item.onClick()
                      handleOptionSelect(item)
                    }
                  }}
                >
                  {(item.icon.indexOf('image/png') === -1 && item.icon.indexOf('.png') === -1)
                    ? <Icon className={cx('select__icon')} name={item.icon} size='big'/>
                    : <img src={item.icon} alt='icon' />
                  }
                  {/* @ts-ignore */}
                  <p>{item.customText ? item.name : arLanguagesPhraseSite[name][item.name]}</p>
                  {/* @ts-ignore */}
                  {item.rightText && <p className={cx('select__item__right-text', 'p-x-small')}>{arLanguagesPhraseSite[name][item.rightText]}</p>}
                </li>
              )
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
