import logo from './logo.svg';
import './App.css';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import Store from './components/context/Store';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './components/routers/router/MainRouter';

function App() {
  return (
    <Store>
      <BrowserRouter>
        <MainRouter/>
      </BrowserRouter>
    </Store>
  );
}

export default App;
