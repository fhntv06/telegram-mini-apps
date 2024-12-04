import { useSelector } from 'react-redux'
import { arLanguagesPhraseSite, ILangPhrase } from '../shared'

export const useGetPhrases = (data: string[]): ILangPhrase => {
  const { name } = useSelector((state: any) => state.language)

  // @ts-ignore
  const objPhrases: ILangPhrase = arLanguagesPhraseSite[name]

  // @ts-ignore
  return data.reduce((accum, keyPhrase) => ( { ...accum, [keyPhrase]: objPhrases[keyPhrase] }), {})
}
