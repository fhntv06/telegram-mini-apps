import { EStatusText, IGameStatus } from './providers/types';

export const initialData: IGameStatus = {
  PoolInfo: {
    Created: true,
    StartPrice: 0,
    EndPrice: 0,
    MinBetAmount: 0,
    MaxBetAmount: 1000000000000000000000,
    PoolBetsLimit: 100,
    UpBetGroup: {
      Bets: [],
      Addresses: [],
      Avatars: [],
      Countries: [],
      WhiteLabelIds: [],
      Total: 0,
      DistributedCount: 0,
      TotalDistributed: 0,
    },
    DownBetGroup: {
      Bets: [],
      Addresses: [],
      Avatars: [],
      Countries: [],
      WhiteLabelIds: [],
      Total: 0,
      DistributedCount: 0,
      TotalDistributed: 0,
    },
    RoundStartTime: 1712964171000000,
    TradesStartTimeMS: 1712964186,
    TradesEndTimeMS: 1713568986,
  },
  PriceInfo: {
    lastPrice: 0,
    lastTime: '',
    lastTimeMs: 0
  },
  InternalInfo: {
    EnableTrade: true,
    Time2End: 0,
    Text: EStatusText.Open,
  },
  JackpotInfo: {
    JackpotBalance: 0,
  },
  NewResult: {
    StartPrice: 0,
    EndPrice: 0,
    Wins: null,
    Hash: "",
    Timestamp: 0,
  },
  LastResults: {
    Data: [],
  },
};