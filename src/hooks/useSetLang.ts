import { useTonConnectUI, Locales } from '@tonconnect/ui-react'
import { useDispatch } from 'react-redux'
import { setLang } from '../app/store/slices/language'
import { ILang } from '../app/store/slices/language/types'
import {arLanguagesSite} from "../shared/constants.ts";

export const useSetLang = () => {
  const dispatch = useDispatch()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setOptions] = useTonConnectUI();
  const onLanguageChange = (language: Locales) => setOptions({ language })

  return ({ lang } : ILang) => {
    // @ts-ignore
    const { alias } = arLanguagesSite[lang]

    dispatch(setLang({ lang }))
    if (alias === 'en' || alias === 'ru') {
      onLanguageChange(lang as Locales)
    }
  }
}