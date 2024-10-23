export interface ILang {
  name: 'english' | 'spanish' | 'chinese' | 'russian' | string,
  icon: 'flag-uk' | 'flag-spanish' | 'flag-china' | 'flag-russia' | string,
  action?: 'set-lang' | string,
  active?: boolean
}