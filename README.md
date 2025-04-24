# Real-Time Crypto Price Tracker


A responsive **React** + **Redux Toolkit** application that tracks real-time cryptocurrency prices—just like CoinMarketCap—using a mock WebSocket simulation to update data every 1–2 seconds.

## 🎯 Features

- **Live Data Simulation**: Prices, percentage changes (1h, 24h, 7d), 24h volume, market cap, and circulating supply update automatically at a configurable interval using Redux actions.
- **Redux Toolkit**: All state is managed in a Redux slice (`cryptoSlice`) for predictable, centralized data flow.
- **Price Flash**: Price cells flash green/red for positive/negative changes, drawing the user’s eye to market movement.
- **Sparklines**: 7-day mini-charts rendered via `react-sparklines` for quick visual trends.
- **Responsive Table**: Fully responsive layout with sticky headers, horizontal scrolling on small screens.
- **Color-Coded Percentages**: Positive changes in green, negative in red.
- **Compact Number Formatting**: `Intl.NumberFormat` for human-friendly, compact displays (e.g. `$1.2K`, `19.8M`).



## 📦 Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/crypto-price-tracker.git
   cd crypto-price-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Preview the production build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## 🗂️ Folder Structure

```
crypto-price-tracker/
├── public/
│   └── index.html            # HTML template
├── src/
│   ├── assets/               # logos, chart SVGs, screenshots
│   ├── components/           # CryptoTable, CryptoRow, CSS
│   ├── hooks/                # useCryptoDataSimulation
│   ├── redux/                # store.js, cryptoSlice.js
│   ├── utils/                # format helper
│   ├── App.jsx               # root component
│   └── main.jsx              # ReactDOM mount
├── README.md
├── package.json
└── vite.config.js
```

## ⚙️ Tech Stack

- **React 18**
- **Redux Toolkit**
- **React-Sparklines** for tiny charts
- **Vite** for fast bundling & dev server
- **ESLint** & **Prettier** _(optional)_

## 🔧 Architecture

1. **Redux Slice** (`cryptoSlice.js`): Defines `initialState` for 5 assets and an `updateCoin` reducer that computes `priceDelta`, updates price, percentage changes, volume, circulating supply, and recalculates market cap.
2. **Store** (`store.js`): Configures the Redux store with the `crypto` reducer.
3. **Simulation Hook** (`useCryptoDataSimulation.js`): On mount, sets an interval (1.5s) that dispatches `updateCoin` with randomized values for each asset.
4. **App** (`App.jsx`): Wraps the UI in `<Provider>`, invokes the simulation hook, and renders `<CryptoTable>`.
5. **Table** (`CryptoTable.jsx`): Pulls `coins` from Redux via `useSelector`, maps over them into `<CryptoRow>`.
6. **Row** (`CryptoRow.jsx`): Renders each property (logo, name, price, % changes, market cap, volume, supply, charts), applies flash CSS on `priceDelta`, and uses sparklines for the 7d chart.

## 📜 Scripts

- **`npm run dev`** — Launch development server (http://localhost:5173)
- **`npm run build`** — Build for production into `dist/`
- **`npm run preview`** — Preview the production build

## 🎓 Further Improvements

- Integrate **real WebSocket** or REST polling (e.g. Binance API).
- Add **sorting**, **filtering**, or **search**.
- Persist state in **localStorage**.
- Add **unit tests** for reducers/selectors.
- Migrate to **TypeScript** for type safety.

---

