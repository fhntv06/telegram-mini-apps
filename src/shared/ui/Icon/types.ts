export type IconNames =
    | 'bitcoin'
    | 'arrows-cyrcle'
    | 'ton'
    | 'burger'
    | 'plus'
    | 'flag'
    | 'arrow-up'
    | 'arrow-down'
    | 'arrow-right'
    | 'arrow-right-black'
    | 'arrow-left'
    | 'arrow-left-black'
    | 'persons'
    | 'wallet'
    | 'refund'
    | 'cross'
    | 'handshake'
    | 'support'
    | 'x-twitter'
    | 'telegram'
    | 'facebook'
    | 'instagram'
    | 'tether'
    | 'notcoin'
    | 'copy'
    | 'etherium-coin'
    | 'gold-coin'
    | 'oil-coin'
    | 'solana-coin'
    | 'nasdaq-coin'
    | 'sp500-coin'
    | 'logo-pulse'

    export type IconType =
    | 'small'
    | 'medium'
    | 'big'
    | 'custom'
    | 'logo'


export interface IIcon {
    className?: string;
    name: IconNames | string;
    size?: IconType,
}