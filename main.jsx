// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';      // your configureStore export
import './components/CryptoTable.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ← Provider must wrap everything that uses useDispatch/useSelector */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
