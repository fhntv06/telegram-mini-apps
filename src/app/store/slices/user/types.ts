export interface IUser {
    wallet: unknown,
    chain: string,
    publicKey: string,
    address: string,
    appName: string,
    appVersion: string,
    maxProtocolVersion: string,
    platform: string,
    balance: number,
}
