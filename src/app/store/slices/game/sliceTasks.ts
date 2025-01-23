import { createSlice } from '@reduxjs/toolkit'
import { ITask, ITasks } from './types'

const initialState: ITasks = {
  hints: [
    {
      id: 1,
      title: 'inviteHint',
      multiplier: 0.5,
      image: 'https://nemitor.ru:3000/image/hints/inviteHint.png',
    }
  ],
  tasks: [
    {
      id: 10,
      title: 'defaultTaskWithStatus1',
      coinsReward: 1500,
      image: 'https://nemitor.ru:3000/image/tasks/defaultTaskWithStatus1.png',
      conditions: {
        externalLink: 'https://t.me/pulse_dpm_chat'
      },
      playerStatus: 1,
    },
    {
      id: 22,
      title: 'defaultTaskWithStatus2',
      coinsReward: 1000,
      image: 'https://nemitor.ru:3000/image/tasks/defaultTaskWithStatus2.png',
      playerStatus: 2,
    }
  ],
  partners: [
    {
      id: 3,
      title: 'partnerTaskWithStatus1',
      coinsReward: 1500,
      image: 'https://nemitor.ru:3000/image/tasks/partnerTaskWithStatus1.png',
      playerStatus: 1,
      conditions: {
        externalLink: 'https://t.me/partnerTaskWithStatus1'
      }
    },
    {
      id: 4,
      title: 'partnerTaskWithStatus2',
      coinsReward: 1500,
      image: 'https://nemitor.ru:3000/image/tasks/partnerTaskWithStatus2.png',
      playerStatus: 2,
    }
  ]
}

const sliceTasks = createSlice({
  name: 'userTasks',
  initialState,
  reducers: {
    setDefaultTasks: (state, action) => {
      state.tasks = action.payload.tasks
    },
    setPartnersTasks: (state, action) => {
      state.partners = action.payload.partners
    },
    setHintTasks: (state, action) => {
      state.hints = action.payload.hints
    },
    setClaimTasks: (state, action) => {
      const changeTaskPlayerStatus = (tasks: ITask[], targetId: number, success: boolean) => (
        tasks.map((task: ITask) => {
          if (task.id === targetId) {
            task.playerStatus = success ? 0 : 2
          }

          return task
        })
      )

      switch (action.payload.task.type) {
        case action.payload.task.type === 'partner':
          state.partners = changeTaskPlayerStatus(action.payload.partners, action.payload.task.id, action.payload.success)
          break
        case action.payload.task.type === 'hint':
          state.hints = changeTaskPlayerStatus(action.payload.hints, action.payload.task.id, action.payload.success)
          break
        default:
          state.tasks = changeTaskPlayerStatus(action.payload.tasks, action.payload.task.id, action.payload.success)
      }
    }
  }
})

export const { setDefaultTasks, setPartnersTasks, setHintTasks, setClaimTasks } = sliceTasks.actions
export const tasksReducer = sliceTasks.reducer
