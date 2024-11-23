import { ActionConfiguration, SendTransactionRequest, useTonConnectUI, CHAIN, useTonAddress } from '@tonconnect/ui-react'
import { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { AnimationContext, NotificationContext } from '../app/contexts'
import { IAnimationContextTypes, INotificationContextTypes } from '../app/providers/types'
import { postDataBetDetailsPlayers } from '../app/api/user'
import { useGetPhrases, useUserData } from './'
import { isDemoMode } from '../shared/constants'

export const useTransaction = (amount: number) => {
  const tonAddress = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()
  const [txInProcess, setTxInProcess] = useState<boolean>(false)
  const { openHandler: openHandlerAnimation } = useContext<IAnimationContextTypes>(AnimationContext)
	const { openHandler: openHandlerNotification } = useContext<INotificationContextTypes>(NotificationContext)
  const { ticker, gameMode } = useSelector((state: any) => state.modeSettings)
  const { address, mainnet } = useSelector((state: any) => state.bets)
  const userData = useUserData()
  const { notEnoughDemoBalance } = useGetPhrases(['notEnoughDemoBalance'])

  const sendTransaction = async (placeBet: 'up' | 'down') => {
    setTxInProcess(true)

    const configuration: ActionConfiguration = {
      modals: ['before', 'success', 'error'],
      notifications: ['before', 'success', 'error']
    }
    const transaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
      messages: [
        {
          address,
          amount: (amount * 1e9).toString(), // Toncoin in nanotons
          payload: placeBet === 'up' ? import.meta.env.VITE_UP_TRANSACTION : import.meta.env.VITE_DOWN_TRANSACTION
        },
      ],
      network: mainnet ? CHAIN.MAINNET : CHAIN.TESTNET
    }
    const dataPlayer = {
      ticker,
      gameMode,
      telegramId: userData?.id,
      walletAddress: tonAddress,
      betAmount: amount * 1e9,
      variantBet: placeBet
    }

    console.log(dataPlayer)

    const handlerPostDataBetDetailsPlayers = () => (
      postDataBetDetailsPlayers(dataPlayer)
        .then(() => openHandlerAnimation('youAreIn'))
        .catch((error) => {
          console.error('Error postDataBetDetailsPlayers: ', error)
          
          if (gameMode === isDemoMode) {
            if (error.response.status === 400) {
              openHandlerNotification('warning', { text: notEnoughDemoBalance })
            }
          }
        })
    )

    if (gameMode === isDemoMode) handlerPostDataBetDetailsPlayers()
    else {
      await tonConnectUI.sendTransaction(transaction, configuration)
        .then(() => {
          if (userData?.id) handlerPostDataBetDetailsPlayers()

          // TODO: перенести в хук
          const timer = setTimeout(() => {
            function fadeOut(element: HTMLElement, duration = 1000) {
              let opacity = 1;

              // Установим начальную прозрачность
              element.style.opacity = `${opacity}`;

              // Вычислим, насколько уменьшить прозрачность на каждом шаге
              const step = 10 / duration;

              // Создаем таймер для постепенного уменьшения прозрачности
              function fade() {
                // Уменьшаем прозрачность элемента
                opacity -= step;

                element.style.opacity = `${opacity}`;

                // Если прозрачность больше 0, продолжаем вызов функции
                if (opacity > 0) requestAnimationFrame(fade);
                else element.style.display = 'none';
              }

              // Запускаем функцию
              fade();
            }

            const element: HTMLElement | null = document.querySelector('[data-tc-modal]');
            if (element) {
              fadeOut(element, 500); // элемент исчезнет за 1 секунду
            }

            clearTimeout(timer)
          }, 2000)

        })
        .catch((error) => console.error('Error sendTransaction: ', error))
    }

    setTxInProcess(false)
  }

  return {
    txInProcess,
    sendTransaction,
  }
}