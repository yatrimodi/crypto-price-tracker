import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import useCryptoDataSimulation from './hooks/useCryptoDataSimulation';
import CryptoTable from './components/CryptoTable';
import './components/CryptoTable.css';

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
}

function App() {
  useCryptoDataSimulation();
  return (
    <div className="app-container">
      <h1>📈 Real-Time Crypto Price Tracker</h1>
      <CryptoTable />
    </div>
  );
}
