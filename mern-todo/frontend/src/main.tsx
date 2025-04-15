import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
//@ts-ignore
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin.tsx';
import Signup from './components/Signup.tsx';
import UserProvider from './context/UserProvider.tsx';
import Layout from './components/Layout.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<ProtectedRoute> <App /></ProtectedRoute>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Signin />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>

  </StrictMode>,
)
