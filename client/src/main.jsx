import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@radix-ui/themes/styles.css';
import App from './App.jsx'
import SmoothScroll from './views/components/SmoothScroll.jsx'

import { Provider } from 'react-redux';
import { store } from './app/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </Provider>
  </StrictMode>,
)
