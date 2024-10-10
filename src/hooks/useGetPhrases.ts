import {useSelector} from "react-redux";
import { arLanguagesSite, ILang } from '../shared/constants'

export const useGetPhrases = (data: string[]) => {
  const { lang } = useSelector((state: any) => state.language)

  // @ts-ignore
  const objPhrases: ILang = arLanguagesSite[lang]

  // @ts-ignore
  return data.reduce((accum, keyPhrase) => ( { ...accum, [keyPhrase]: objPhrases[keyPhrase] }), {})
}