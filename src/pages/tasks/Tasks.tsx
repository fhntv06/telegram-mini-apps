import WebApp from '@twa-dev/sdk'
import classNames from 'classnames/bind'
import { ITask } from '../../app/store/slices/game/types'
import { useGetPhrases, useSelector } from '../../hooks'
import { Button, arLanguagesPhraseSite } from '../../shared'

import styles from './Tasks.module.scss'
import { claimTask } from '../../app/api/game'

const cx = classNames.bind(styles)

const ButtonsTask = (
  { tasks, phrase }: {
    tasks: ITask[]
    phrase: {
      points: string,
      multiplier: string,
      noAvailableTasks: string
    }
  }
) => {
  // export arLanguagesPhraseSite
  // const { connectWallet } = useGetPhrases(['connectWallet'])

  const conditionTaskHandler = (href: string) => window.location.href = href
  const tasksEventHandler = (task: ITask) => {
    claimTask({ taskId: task.id, initData: WebApp.initData })
      .then((res) => {
        if (res.data.task.playerStatus === 1) {
          conditionTaskHandler(res.data.task.conditions.externalLink)
        }
      })
      .catch((e) => console.log(new Error('Error in clamTasks: ' + e)))
  }

  return (tasks && tasks.length)
    ? (
      tasks.map((task, index) => (
        <Button
          key={task.title + index}
          iconRightName={task?.playerStatus === 0 ? 'check' : 'arrow-right'}
          sizeIcons='big'
          disabled={task?.playerStatus === 0}
          onClick={() => task?.playerStatus !== 0 && tasksEventHandler(task)}
        >
          <div className={cx('item')}>
            <img
              src={task.image}
              // @ts-ignore
              alt={arLanguagesPhraseSite[task.title]}
              // @ts-ignore
              title={arLanguagesPhraseSite[task.title]} />
            <div className={cx('button-content')}>
              <p className='p-reg p-small'>{
                // @ts-ignore
                arLanguagesPhraseSite[task.title]
              }</p>
              <p className='p-reg p-medium color-ton-coin'>
                +
                {task?.coinsReward || task?.multiplier}
                {' '}
                {task?.coinsReward ? phrase.points : phrase.multiplier}
              </p>
            </div>
          </div>
        </Button>
      ))
    ) : (
      <div className={cx('page-tasks__items-clear')}>
        <p className='p-reg'>{phrase.noAvailableTasks}</p>
      </div>
    )
}

export const Tasks = () => {
  const {
    completeTasks, earnMorePoints, pulseMarket,
    partners, noAvailableTasks, points, multiplier } = useGetPhrases(
      ['completeTasks', 'earnMorePoints', 'pulseMarket', 'partners', 'noAvailableTasks', 'points', 'multiplier']
  )
  const { partners: partnersTasks, hints, tasks } = useSelector((state) => state.tasks)

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
            {<ButtonsTask tasks={[...hints, ...tasks]} phrase={{ points, multiplier, noAvailableTasks }} />}
          </div>
        </div>
        <div className={cx('container')}>
          <header>
            <p>{partners}</p>
          </header>
          <div className={cx('page-tasks__items')}>
            {<ButtonsTask tasks={partnersTasks} phrase={{ points, multiplier, noAvailableTasks }} />}
          </div>
        </div>
      </main>
    </div>
  )
}
