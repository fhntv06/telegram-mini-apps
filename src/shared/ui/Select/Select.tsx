import { useState} from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames/bind'
import { Icon } from '../'
import { useDisconnect, useSetLang } from '../../../hooks'
import { ISelectOption } from './types'
import { arLanguagesSite } from '../../constants'

import styles from './Select.module.scss'

const cx = classNames.bind(styles)

interface IProps {
  data: ISelectOption[]
  typeStyle?: string
  className?: string
}

export const Select = ({ data, className = '', typeStyle = '' }: IProps) => {
  const handlerDisconnect = useDisconnect()
  const handlerSetLang = useSetLang()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<ISelectOption>(data[0]);
  const { lang } = useSelector((state: any) => state.language)


  const handleDropdownToggle = () => data.length > 1 && setIsOpen(!isOpen)
  const handleOptionSelect = (option: ISelectOption) => {
    if (!option.blockSelect) setSelectedOption(option)
    handleDropdownToggle()

    if (option.action === 'disconnect') handlerDisconnect()
    if (option.action === 'set-lang') handlerSetLang({ lang: option.text })
  }

  return (
    <div className={cx('select', className, typeStyle)}>
      <div className={cx('select__header')} onClick={handleDropdownToggle}>
        <div className={cx('select__header-left')}>
          <Icon className={cx('select__icon')} name={selectedOption.icon} size='big' />
          {/* @ts-ignore */}
          <p>{arLanguagesSite[lang][selectedOption.text]}</p>
        </div>
        <Icon name={isOpen ? 'arrow-up' : 'arrow-down'} size='big' />
      </div>
      {(data.length > 1 && isOpen) && (
        <ul className={cx('select__list')}>
          {data.map((item) => (
            item.text !== selectedOption.text && (
              <li
                key={item.text}
                className={cx('select__item')}
                onClick={() => {
                  if (item.onClick) item.onClick()
                  handleOptionSelect(item)
                }}
              >
                <Icon className={cx('select__icon')} name={item.icon} size='big'/>
                {/* @ts-ignore */}
                <p>{arLanguagesSite[lang][item.text]}</p>
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  )
}