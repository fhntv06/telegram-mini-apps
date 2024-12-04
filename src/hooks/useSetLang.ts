import { useTonConnectUI, Locales } from '@tonconnect/ui-react'
import { useDispatch } from 'react-redux'
import { setLang } from '../app/store/slices/language'
import { ILang } from '../app/store/slices/language/types'
import { arLanguagesPhraseSite } from '../shared'

export const useSetLang = () => {
  const dispatch = useDispatch()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setOptions] = useTonConnectUI();
  const onLanguageChange = (language: Locales) => setOptions({ language })

  return (data : ILang) => {
    // @ts-ignore
    const { alias } = arLanguagesPhraseSite[data.name]

    dispatch(setLang(data))
    if (alias === 'en' || alias === 'ru') {
      onLanguageChange(data.name as Locales)
    }
  }
}
