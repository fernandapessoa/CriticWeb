import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MyCritcs from './pages/MyCritics/MyCritics.tsx';
import Movie from './pages/Movie/Movie.tsx';
import Home from './pages/Home/Home.tsx';
import Login from './pages/Login/Login.tsx';
import SignUp from './pages/SignUp/Signup.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import Account from './pages/Account/Account.tsx';
import RegisterMovie from './pages/RegisterMovie/RegisterMovie.tsx';
import ProtectedRoute from './routes/ProtectedRoute'; // Importando o componente ProtectedRoute


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            
            <Route element={<ProtectedRoute />}>
              <Route path="registerMovie" element={<RegisterMovie />} />
              <Route element={<App />}>
                <Route path="home" element={<Home />} />
                <Route path="movie/:id" element={<Movie />} />
                <Route path="critics" element={<MyCritcs />} />
                <Route path="account" element={<Account />} />
              </Route>
              <Route path="*" element={<NotFound />} /> {/* Rota catch-all */}
            </Route>
          </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
