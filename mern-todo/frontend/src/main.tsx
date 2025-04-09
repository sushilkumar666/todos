import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
//@ts-ignore
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin.tsx';
import Signup from './components/Signup.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Signin />} />
      </Routes>
    </Router>

  </StrictMode>,
)
