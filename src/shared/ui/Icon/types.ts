export type IconNames =
    | 'bitcoin'
    | 'bitcoin-medium'
    | 'arrows-cyrcle'
    | 'ton'
    | 'ton-medium'
    | 'burger'
    | 'plus'
    | 'plus-medium'
    | 'flag'
    | 'arrow-up'
    | 'arrow-up-medium'
    | 'arrow-down'
    | 'arrow-down-medium'
    | 'arrow-right'
    | 'arrow-right-black'
    | 'arrow-left'
    | 'arrow-left-black'
    | 'persons'
    | 'persons-medium'
    | 'wallet'
    | 'refund'
    | 'refund-medium'
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