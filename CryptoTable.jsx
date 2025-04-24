import React from 'react';
import { useSelector } from 'react-redux';
import CryptoRow from './CryptoRow';

export default function CryptoTable() {
  const coins = useSelector(state => state.crypto);
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th><th>Logo</th><th>Name</th><th>Symbol</th>
            <th>Price</th><th>1h %</th><th>24h %</th><th>7d %</th>
            <th>Market Cap</th><th>24h Volume</th>
            <th>Circulating</th><th>Max Supply</th><th>7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((c,i) => <CryptoRow key={c.id} coin={c} rank={i+1}/>)}
        </tbody>
      </table>
    </div>
  );
}
