// src/components/CryptoRow.jsx
import React, { useState, useEffect } from 'react';
import { fmt } from '../utils/format';
import './CryptoTable.css';

export default function CryptoRow({ coin, rank }) {
  const {
    symbol,
    name,
    price,
    priceDelta,
    pct1h,
    pct24h,
    pct7d,
    vol24h,
    circulating,   // your state field
    maxSupply      // your state field
  } = coin;

  // 1h/24h/7d up/down
  const up1  = pct1h  >= 0;
  const up24 = pct24h >= 0;
  const up7  = pct7d  >= 0;

  // “flash” logic
  const [flash, setFlash] = useState('');
  useEffect(() => {
    if      (priceDelta > 0) setFlash('flash-up');
    else if (priceDelta < 0) setFlash('flash-down');
    if (priceDelta !== 0) {
      const t = setTimeout(() => setFlash(''), 800);
      return () => clearTimeout(t);
    }
  }, [priceDelta]);

  // dynamic URLs for logo + chart
  const logoUrl  = new URL(`../assets/logos/${symbol.toLowerCase()}.svg`, import.meta.url).href;
  const chartUrl = new URL(`../assets/charts/${symbol.toLowerCase()}-7d.svg`, import.meta.url).href;

  return (
    <tr>
      <td>{rank}</td>
      <td>
        <img src={logoUrl} alt={`${symbol} logo`} width={24} height={24}/>
      </td>
      <td>{name}</td>
      <td>{symbol.toUpperCase()}</td>

      <td className={`price-cell ${flash}`}>
        ${fmt.format(price)}
      </td>

      <td className={up1  ? 'up' : 'down'}>{pct1h.toFixed(2)}%</td>
      <td className={up24 ? 'up' : 'down'}>{pct24h.toFixed(2)}%</td>
      <td className={up7  ? 'up' : 'down'}>{pct7d.toFixed(2)}%</td>

      <td>${fmt.format(coin.marketCap)}</td>

      <td>
        ${fmt.format(vol24h)}
        <div className="small-text">
          {fmt.format(vol24h / price)} {symbol.toUpperCase()}
        </div>
      </td>

      <td>
        {fmt.format(circulating)} {symbol.toUpperCase()}
        {maxSupply && (
          <div className="supply-bar">
            <div
              className="supply-bar-fill"
              style={{ width: `${(circulating / maxSupply) * 100}%` }}
            />
          </div>
        )}
      </td>

      <td>{maxSupply ?? '—'}</td>

      <td>
        <img
          src={chartUrl}
          alt={`${symbol} 7-day chart`}
          width={120}
          height={40}
        />
      </td>
    </tr>
  );
}
