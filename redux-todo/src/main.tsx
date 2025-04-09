import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store, { persistor } from './app/store/index.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
