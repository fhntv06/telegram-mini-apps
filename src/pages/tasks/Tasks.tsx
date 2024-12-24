import classNames from 'classnames/bind'

import { useGetPhrases } from '../../hooks'
import { Button, Icon } from '../../shared'

import styles from './Tasks.module.scss'

const cx = classNames.bind(styles)

export const Tasks = () => {
  const { completeTasks, earnMorePoints, pulseMarket, partners, noAvailableTasks } = useGetPhrases(['completeTasks', 'earnMorePoints', 'pulseMarket', 'partners', 'noAvailableTasks'])

  return (
    <div className={cx('page', 'page-tasks')}>
      <div className={cx('page-tasks__header')}>
        <h1 className='font-w-semibold'><span>{completeTasks},</span><span className='color-ton-coin'>{earnMorePoints}</span></h1>
      </div>
      <main className={cx('page__main')}>
        <div className={cx('container')}>
          <header>
            <p>{pulseMarket}</p>
          </header>
          <div className={cx('page-tasks__items')}>
            <Button iconRightName='arrow-right' sizeIcons='big'>
              <div className={cx('item')}>
                <Icon name='calendar' size='large' className={cx('item__icon')} />
                <div className={cx('button-content')}>
                  <p className='p-reg p-small'>Visit the game every day</p>
                  <p className='p-reg p-medium color-ton-coin'>+1000 Points</p>
                </div>
              </div>
            </Button>
            <Button iconRightName='arrow-right' sizeIcons='big'>
              <div className={cx('item')}>
                <Icon name='persons-large' size='large' className={cx('item__icon')} />
                <div className={cx('button-content')}>
                  <p className='p-reg p-small'>Invite friends</p>
                  <p className='p-reg p-medium color-ton-coin'>+0.5 Multiplier</p>
                </div>
              </div>
            </Button>
          </div>
        </div>
        <div className={cx('container')}>
          <header>
            <p>{partners}</p>
          </header>
          <div className={cx('page-tasks__items')}>
            <div className={cx('page-tasks__items-clear')}>
              <p className='p-reg'>{noAvailableTasks}</p>
            </div>
            <Button iconRightName='check' sizeIcons='big' disabled>
              <div className={cx('item')}>
                <Icon name='calendar' size='big' className={cx('item__icon')} />
                <div className={cx('button-content')}>
                  <p className='p-reg p-small'>Subscribe Crypto Punks on X</p>
                  <p className='p-reg p-medium color-ton-coin'>+0.5 Multiplier</p>
                </div>
              </div>
            </Button>
            <Button iconRightName='arrow-right' sizeIcons='big'>
              <div className={cx('item')}>
                <Icon name='persons-large' size='big' className={cx('item__icon')} />
                <div className={cx('button-content')}>
                  <p className='p-reg p-small'>Subscribe Humster Kombat on X и вторая оооочень длинная строка для теста отображения</p>
                  <p className='p-reg p-medium color-ton-coin'>+1000 Points</p>
                </div>
              </div>
            </Button>
            <Button iconRightName='arrow-right' sizeIcons='big'>
              <div className={cx('item')}>
                <Icon name='persons-large' size='big' className={cx('item__icon')} />
                <div className={cx('button-content')}>
                  <p className='p-reg p-small'>Subscribe Crypto Punks on X</p>
                  <p className='p-reg p-medium color-ton-coin'>+1000 Points</p>
                </div>
              </div>
            </Button>
            <Button iconRightName='arrow-right' sizeIcons='big'>
              <div className={cx('item')}>
                <Icon name='persons-large' size='big' className={cx('item__icon')} />
                <div className={cx('button-content')}>
                  <p className='p-reg p-small'>Subscribe Crypto Punks on 2X</p>
                  <p className='p-reg p-medium color-ton-coin'>+1000 Points</p>
                </div>
              </div>
            </Button>
            <Button iconRightName='arrow-right' sizeIcons='big'>
              <div className={cx('item')}>
                <Icon name='persons-large' size='big' className={cx('item__icon')} />
                <div className={cx('button-content')}>
                  <p className='p-reg p-small'>Subscribe Crypto Punks on 3X</p>
                  <p className='p-reg p-medium color-ton-coin'>+1000 Points</p>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </main>
    </div>
)
}
