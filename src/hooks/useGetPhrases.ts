import { useSelector } from 'react-redux'
import { arLanguagesPhraseSite, ILangPhrase } from '../shared/constants'

export const useGetPhrases = (data: string[]) => {
  const { name } = useSelector((state: any) => state.language)

  // @ts-ignore
  const objPhrases: ILangPhrase = arLanguagesPhraseSite[name]

  // @ts-ignore
  return data.reduce((accum, keyPhrase) => ( { ...accum, [keyPhrase]: objPhrases[keyPhrase] }), {})
}