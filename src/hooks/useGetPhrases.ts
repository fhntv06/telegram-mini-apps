import { useSelector } from './'
import { arLanguagesPhraseSite, ILangPhrase } from '../shared'

export const useGetPhrases = (data: string[]): ILangPhrase => {
  const { name } = useSelector((state) => state.language)

  // @ts-ignore
  const objPhrases: ILangPhrase = arLanguagesPhraseSite[name]

  // @ts-ignore
  return data.reduce((accum, keyPhrase) => ( { ...accum, [keyPhrase]: objPhrases[keyPhrase] }), {})
}
