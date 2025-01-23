import WebApp from '@twa-dev/sdk'
import { createInvoice } from '../app/api/stars'
import { useSetBalance } from './useSetBalance'

// Попоплнение баланса Stars
export const useOpenInvoice = () => {
  const { updateBalance } = useSetBalance()

  const openInvoice = (amount: number, callback = () => {}) => {
    createInvoice(amount)
      .then((res: { data: { invoiceLink: string } }) => {
        WebApp.openInvoice(res.data.invoiceLink, (status) => {
          if (status === "paid") {
            // Обновляем баланс звезд после пополнения счета
            console.log('status is paid!')
            updateBalance()
            callback()
          } else {
            console.log('status not is paid!')
          }
        })
      })
      .catch(() => new Error('Error: for createInvoice!'))
  }

  return { openInvoice }
}