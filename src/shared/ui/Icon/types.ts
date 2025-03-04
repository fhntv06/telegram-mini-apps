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
    | 'persons-large'
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
    | 'switch'
    | 'candles'
    | 'check'
    | 'disconnect'
    | 'book'
    | '' // For skip icon if you need

    export type IconType =
    | 'small'
    | 'medium'
    | 'big'
    | 'large'
    | 'custom'
    | 'logo'


export interface IIcon {
    className?: string;
    name: IconNames | string;
    size?: IconType,
}
