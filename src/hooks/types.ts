import React from 'react'

export interface IEvent {
  currentTarget:
    string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | ((prevState: React.ReactNode) => React.ReactNode)
    | null
    | undefined
}
