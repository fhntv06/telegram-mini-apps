import { useState} from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames/bind'
import { Icon } from '../'
import { useDisconnect, useSetLang } from '../../../hooks'
import { ISelectOption } from './types'
import { arLanguagesPhraseSite } from '../../constants'

import styles from './Select.module.scss'

const cx = classNames.bind(styles)

interface IProps {
  data: ISelectOption[]
  typeStyle?: '' | 'light'
  className?: string
}

export const Select = ({ data, className = '', typeStyle = '' }: IProps) => {
  const handlerDisconnect = useDisconnect()
  const handlerSetLang = useSetLang()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<ISelectOption>(data.find((item) => item.active) || data[0]);
  const { name } = useSelector((state: any) => state.language)

  const handleDropdownToggle = () => data.length > 1 && setIsOpen(!isOpen)
  const handleOptionSelect = (option: ISelectOption) => {
    if (!option.blockSelect) setSelectedOption(option)
    handleDropdownToggle()

    if (option.action === 'disconnect') handlerDisconnect()
    if (option.action === 'set-lang') handlerSetLang(option)
  }

  // @ts-ignore
  return (
    <div className={cx('select', className, typeStyle)}>
      <div className={cx('select__header')} onClick={handleDropdownToggle}>
        <div className={cx('select__header-left')}>
          {(selectedOption.icon.indexOf('image/png') === -1)
            ? <Icon className={cx('select__icon')} name={selectedOption.icon} size='big'/>
            : <img src={selectedOption.icon}  alt='icon' />
          }
          {/* @ts-ignore */}
          <p>{selectedOption.customText ? selectedOption.name : arLanguagesPhraseSite[name][selectedOption.name]}</p>
        </div>
        <Icon name={isOpen ? 'arrow-up' : 'arrow-down'} size='big' />
      </div>
      {(data.length > 1 && isOpen) && (
        <ul className={cx('select__list')}>
          {data.map((item) => (
            item.name !== selectedOption.name && (
              <li
                key={item.name}
                className={cx('select__item', { disabled: item.disabled })}
                onClick={() => {
                  if (item.onClick) item.onClick()
                  handleOptionSelect(item)
                }}
              >
                {(item.icon.indexOf('image/png') === -1)
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
        </ul>
      )}
    </div>
  )
}