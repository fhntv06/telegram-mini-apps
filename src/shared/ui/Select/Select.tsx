import { useState} from 'react'
import classNames from 'classnames/bind'
import { Icon } from '../'
import { ISelectOption } from './types'
import styles from './Select.module.scss'
import { useDisconnect, useSetLang } from '../../../hooks'

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

  const handleDropdownToggle = () => setIsOpen(!isOpen)
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
          <Icon name={selectedOption.icon} size='big' />
          <p>{selectedOption.text}</p>
        </div>
        <Icon name={isOpen ? 'arrow-up' : 'arrow-down'} size='big' />
      </div>
      {isOpen && (
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
                <Icon name={item.icon} size='big'/>
                <p>{item.text}</p>
              </li>
            )
          ))}
        </ul>
      )}
    </div>
  )
}