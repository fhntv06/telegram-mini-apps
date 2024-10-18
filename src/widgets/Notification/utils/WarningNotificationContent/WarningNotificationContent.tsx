import { Icon } from '../../../../shared'

interface IProps {
  closeHandler: () => void
}

export const WarningNotificationContent = ({ closeHandler }: IProps) => {
  return (
    <>
      <Icon name='warning' size='big' />
      <p>Your an out of time to bet in this round, please wait for next round</p>
      <span onClick={closeHandler} ><Icon name='cross' size='big' /></span>
    </>
  )
}