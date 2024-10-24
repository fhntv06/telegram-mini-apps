import React from "react";

export type INotificationTypes = 'warning' | 'wins' | 'lose' | 'refund'
export interface INotification {
  type: 'warning' | 'wins' | 'lose' | 'refund'
  isOpen: boolean,
  children: React.ReactNode
}