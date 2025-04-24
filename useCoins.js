import { useState, useEffect, useRef } from 'react';

export function useCoins(pollInterval = 60000) {
  const [coins,   setCoins]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const prevRef = useRef([]);

  useEffect(() => {
    const url =
      'https://api.coingecko.com/api/v3/coins/markets' +
      '?vs_currency=usd' +
      '&order=market_cap_desc' +
      '&per_page=5' +
      '&page=1' +
      '&sparkline=true' +
      '&price_change_percentage=1h,24h,7d';

    const fetchCoins = () => {
      setLoading(true);
      fetch(url, { cache: 'no-store', mode: 'cors' })
        .then(res => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then(data => {
          const enriched = data.map(c => {
            const prev = prevRef.current.find(p => p.id === c.id);
            const delta = prev
              ? c.current_price - prev.current_price
              : 0;
            return { ...c, priceDelta: delta };
          });
          prevRef.current = data;
          setCoins(enriched);
          setError(null);
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    };

    fetchCoins();                           
    const id = setInterval(fetchCoins, pollInterval);
    return () => clearInterval(id);
  }, [pollInterval]);

  return { coins, loading, error };
}
