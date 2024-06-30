import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { AuthProvider } from './services/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Header />
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App;
