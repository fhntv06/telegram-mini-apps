import { createSlice } from '@reduxjs/toolkit'
import { ITasks } from './types'

const initialState: ITasks = {
  tasks: [
    {
      id: 1,
      title: 'inviteHint',
      multiplier: 0.5,
      image: 'https://nemitor.ru:3000/image/hints/inviteHint.png',
      type: 'hint'
    },
    {
      id: 1,
      title: 'defaultTaskWithStatus1',
      coinsReward: 1500,
      image: 'https://nemitor.ru:3000/image/tasks/defaultTaskWithStatus1.png',
      conditions: {
        externalLink: 'https://t.me/pulse_dpm_chat'
      },
      playerStatus: 1,
      type: 'default'
    },
    {
      id: 2,
      title: 'defaultTaskWithStatus2',
      coinsReward: 1000,
      image: 'https://nemitor.ru:3000/image/tasks/defaultTaskWithStatus2.png',
      playerStatus: 2,
      type: 'default'
    },
    {
      id: 3,
      title: 'partnerTaskWithStatus1',
      coinsReward: 1500,
      image: 'https://nemitor.ru:3000/image/tasks/partnerTaskWithStatus1.png',
      playerStatus: 1,
      conditions: {
        externalLink: 'https://t.me/partnerTaskWithStatus1'
      },
      type: 'partner'
    },
    {
      id: 4,
      title: 'partnerTaskWithStatus2',
      coinsReward: 1500,
      image: 'https://nemitor.ru:3000/image/tasks/partnerTaskWithStatus2.png',
      playerStatus: 2,
      type: 'partner'
    }
  ]
}

const sliceTasks = createSlice({
  name: 'userTasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks
    }
  }
})

export const { setTasks } = sliceTasks.actions
export const tasksReducer = sliceTasks.reducer
