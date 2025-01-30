import { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk'
import classNames from 'classnames/bind'
import { claimTask,
  getTasks
} from '../../app/api/game'
import { ITask } from '../../app/store/slices/game/types'
import { setDefaultTasks, setHintTasks, setPartnersTasks } from '../../app/store/slices'
import { useDispatch, useGetPhrases, useSelector } from '../../hooks'
import { Button} from '../../shared'

import styles from './Tasks.module.scss'

const cx = classNames.bind(styles)

const NoAvailableTasks = () => {
  const { noAvailableTasks } = useGetPhrases(['noAvailableTasks'])

  return (
    <div className={cx('page-tasks__items-clear')}>
      <p className='p-reg'>{noAvailableTasks}</p>
    </div>
  )
}

const ButtonTask = ({task}: { task: ITask }) => {
  const [taskClaimId, setTaskClaimId] = useState<number>(0)
  const phrases = useGetPhrases([task.title, 'points', 'multiplier'])

  const claimTaskHandler = (task: ITask) => {
    claimTask({ taskId: task.id, initData: WebApp.initData })
      .then((res) => {
        if (res.data.task?.playerStatus === 0) {
          setTaskClaimId(task.id) // update list task and him status
        } else if (res.data.task?.playerStatus === 1) {
          window.location.href = res.data.task.conditions.externalLink
        }
      })
      .catch((e) => console.log(new Error('Error in clamTasks: ' + e)))
  }

  const taskIsCompleted = (task?.playerStatus === 0 || taskClaimId === task.id)

  return (
    <Button
      key={task.id}
      iconRightName={taskIsCompleted ? 'check' : 'arrow-right'}
      sizeIcons='big'
      disabled={taskIsCompleted}
      onClick={() => task?.playerStatus !== 0 && claimTaskHandler(task)}
    >
      <div className={cx('item')}>
        <img
          src={task.image}
          // @ts-ignore
          alt={phrases[task.title]}
          // @ts-ignore
          title={phrases[task.title]} />
        <div className={cx('button-content')}>
          <p className='p-reg p-small'>{
            // @ts-ignore
            phrases[task.title]
          }</p>
          <p className='p-reg p-medium color-ton-coin'>
            +
            {task?.coinsReward || task?.multiplier}
            {' '}
            {task?.coinsReward ? phrases.points : phrases.multiplier}
          </p>
        </div>
      </div>
    </Button>
    )
}

export const Tasks = () => {
  const {
    completeTasks, earnMorePoints, pulseMarket, partners
  } = useGetPhrases(['completeTasks', 'earnMorePoints', 'pulseMarket', 'partners'])
  const { partners: partnersTasks, hints, tasks } = useSelector((state) => state.tasks)
  const { settings: { isFullscreen } } = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  useEffect(() => {
    getTasks(WebApp.initData)
      .then((res) => {
        const { hints, partners, tasks } = res.data

        dispatch(setHintTasks({ hints }))
        dispatch(setPartnersTasks({ partners }))
        dispatch(setDefaultTasks({ tasks }))
      })
      .catch((error) => new Error('Error in getTasks: ' + error))
  }, [])

  return (
    <div className={cx('page', 'page-tasks', { 'isFullscreen': isFullscreen })}>
      <div className={cx('page-tasks__header')}>
        <h1 className='font-w-semibold'><span>{completeTasks},</span><span className='color-ton-coin'>{earnMorePoints}</span></h1>
      </div>
      <main className={cx('page__main')}>
        <div className={cx('container')}>
          <header>
            <p>{pulseMarket}</p>
          </header>
          <div className={cx('page-tasks__items')}>
            {
              (tasks && tasks.length) && (hints && hints.length)
                ? [...hints, ...tasks].map((task) => (<ButtonTask task={task} />))
                : <NoAvailableTasks />
            }
          </div>
        </div>
        <div className={cx('container')}>
          <header>
            <p>{partners}</p>
          </header>
          <div className={cx('page-tasks__items')}>
            {
              (partnersTasks && partnersTasks.length)
                ? partnersTasks.map((task) => (<ButtonTask task={task} />))
                : <NoAvailableTasks />
            }
          </div>
        </div>
      </main>
    </div>
  )
}
