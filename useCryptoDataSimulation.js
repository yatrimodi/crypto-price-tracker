import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCoin } from '../redux/cryptoSlice';

// random helper
const rand = (min, max) => Math.random() * (max - min) + min;

export default function useCryptoDataSimulation() {
  const dispatch = useDispatch();
  const coins = useSelector(state => state.crypto);

  useEffect(() => {
    const iv = setInterval(() => {
      coins.forEach(c => {
        // new random price around ±2%
        const newPrice = +rand(c.price * 0.98, c.price * 1.02).toFixed(2);
        // random percent moves
        const pct1h  = +rand(-1, 1).toFixed(2);
        const pct24h = +rand(-5, 5).toFixed(2);
        const pct7d  = +rand(-10, 10).toFixed(2);
        // random volume
        const vol24h = Math.floor(rand(1e8, 1e12));
        // new circulating supply ±0.5%
        const newCirculating = +rand(
          c.circulatingSupply * 0.995,
          c.circulatingSupply * 1.005
        ).toFixed(0);

        dispatch(updateCoin({
          id: c.id,
          price: newPrice,
          pct1h,
          pct24h,
          pct7d,
          vol24h,
          circulatingSupply: newCirculating
        }));
      });
    }, 1500);

    return () => clearInterval(iv);
  }, [dispatch, coins]);
}
