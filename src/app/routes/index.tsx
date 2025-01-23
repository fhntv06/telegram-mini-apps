import type { ComponentType, JSX } from 'react'

import { Main, UI, Wallet, Tasks, Stats, Menu } from '../../pages'

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const pathsRoutes: {
  game: string
  ui: string
  wallet: string
  tasks: string
  stats: string
  menu: string
} = {
  game: `${import.meta.env.VITE_PUBLIC_PATH_FOR_GITHUB_PAGES}/`,
  ui: `${import.meta.env.VITE_PUBLIC_PATH_FOR_GITHUB_PAGES}/ui`,
  wallet: `${import.meta.env.VITE_PUBLIC_PATH_FOR_GITHUB_PAGES}/wallet`,
  tasks: `${import.meta.env.VITE_PUBLIC_PATH_FOR_GITHUB_PAGES}/tasks`,
  stats: `${import.meta.env.VITE_PUBLIC_PATH_FOR_GITHUB_PAGES}/stats`,
  menu: `${import.meta.env.VITE_PUBLIC_PATH_FOR_GITHUB_PAGES}/menu`,
}

export const routes: Route[] = [
  { path: pathsRoutes.game, Component: Main, title: 'Telegram mini apps' },
  { path: pathsRoutes.ui, Component: UI, title: 'Wallet page' },
  { path: pathsRoutes.wallet, Component: Wallet, title: 'Wallet page' },
  { path: pathsRoutes.tasks, Component: Tasks, title: 'Menu page' },
  { path: pathsRoutes.stats, Component: Stats, title: 'Menu page' },
  { path: pathsRoutes.menu, Component: Menu, title: 'Menu page' },
]
