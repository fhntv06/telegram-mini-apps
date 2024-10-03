import { Account, ConnectAdditionalRequest, TonProofItemReplySuccess } from "@tonconnect/ui-react";

export class BackendAuth {
    private readonly baseURL = 'https://demo.tonconnect.dev';
    static generatePayload: any;
    static checkProof: any;

    async generatePayload(): Promise<ConnectAdditionalRequest | undefined> {
        try {
            const response = await (
                await fetch(`${this.baseURL}/ton-proof/generatePayload`, {
                    method: 'POST'
                })
            ).json();
            return { tonProof: response.payload }
        } catch (error) {
            console.log(error)
        }
    }

    async checkProof(proof: TonProofItemReplySuccess['proof'], account: Account): Promise<string | undefined> {
        try {
            const requestBody = {
                address: account.address,
                network: account.chain,
                proof: {
                    ...proof,
                    state_init: account.walletStateInit
                }
            }

            const response = await (
                await fetch(`${this.baseURL}/ton-proof/checkProof`, {
                    method: 'POST',
                    body: JSON.stringify(requestBody)
                })
            ).json()

            return response?.token
        } catch (error) {
            console.log(error)
        }
    }

    async getAccountInfo(accessToken: string, account: Account) {
        return (
            await fetch(`${this.baseURL}/ton-proof/getAccountinfo?network=${account.chain}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
        ).json()
    }
}