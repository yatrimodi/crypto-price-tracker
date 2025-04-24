import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 'btc', symbol: 'BTC', name: 'Bitcoin',
    price: 50000, priceDelta: 0,
    pct1h: 0, pct24h: 0, pct7d: 0,
    vol24h: 4e10,
    circulatingSupply: 19_800_000,  // 19.8M
    maxSupply: 21_000_000,         // 21M
    marketCap: 50000 * 19_800_000
  },
  {
    id: 'eth', symbol: 'ETH', name: 'Ethereum',
    price: 2000, priceDelta: 0,
    pct1h: 0, pct24h: 0, pct7d: 0,
    vol24h: 2e10,
    circulatingSupply: 120_000_000,
    maxSupply: null,
    marketCap: 2000 * 120_000_000
  },
  {
    id: 'usdt', symbol: 'USDT', name: 'Tether',
    price: 1, priceDelta: 0,
    pct1h: 0, pct24h: 0, pct7d: 0,
    vol24h: 9e10,
    circulatingSupply: 145_000_000_000,
    maxSupply: null,
    marketCap: 1 * 145_000_000_000
  },
  {
    id: 'ada', symbol: 'ADA', name: 'Cardano',
    price: 1.2, priceDelta: 0,
    pct1h: 0, pct24h: 0, pct7d: 0,
    vol24h: 1e9,
    circulatingSupply: 34_000_000_000,
    maxSupply: 45_000_000_000,
    marketCap: 1.2 * 34_000_000_000
  },
  {
    id: 'bnb', symbol: 'BNB', name: 'Binance Coin',
    price: 300, priceDelta: 0,
    pct1h: 0, pct24h: 0, pct7d: 0,
    vol24h: 2e9,
    circulatingSupply: 145_000_000,
    maxSupply: 200_000_000,
    marketCap: 300 * 145_000_000
  }
];

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCoin(state, { payload }) {
      const {
        id, price, pct1h, pct24h, pct7d,
        vol24h, circulatingSupply
      } = payload;

      const coin = state.find(c => c.id === id);
      if (!coin) return;

      // compute delta
      coin.priceDelta = price - coin.price;

      // update price, percents, volume, supply
      coin.price               = price;
      coin.pct1h               = pct1h;
      coin.pct24h              = pct24h;
      coin.pct7d               = pct7d;
      coin.vol24h              = vol24h;
      coin.circulatingSupply   = circulatingSupply;

      // recompute marketCap = price * circulatingSupply
      coin.marketCap = price * circulatingSupply;
    }
  }
});

export const { updateCoin } = cryptoSlice.actions;
export default cryptoSlice.reducer;
