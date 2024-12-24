export interface IUser {
    isConnected: boolean,
    wallet: unknown
    chain: string
    publicKey: string
    address: string
    appName: string
    appVersion: string
    maxProtocolVersion: string
    platform: string
    balance: number
}

export interface IUserRetrievesData {
    multiplier: number,
    invitedFriends: number,
    daysInRow: number,
    totalBets: number
}

export interface IUserDataTelegram {
    id: number
    username: string
    photo_url: string
    last_name: string
    first_name: string
    is_bot: string
    is_premium: string
    language_code: string
    allows_write_to_pm: string
    added_to_attachment_menu: string
}
