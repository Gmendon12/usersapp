import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home';
import UserDetails from './Components/UserDetails';

function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
