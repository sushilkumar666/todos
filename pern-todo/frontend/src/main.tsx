import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider, } from 'react-redux'
import store from './redux/store.ts'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './components/Auth.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'


createRoot(document.getElementById('root')!).render(

  <Provider store={store}>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute><App /></ProtectedRoute>} />
        <Route path='/login' element={<Auth />} />
        <Route path='/signup' element={<Auth />} />
      </Routes>
    </BrowserRouter>

  </Provider >

)
