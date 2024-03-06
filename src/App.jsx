import { Outlet } from 'react-router-dom';
import './style/App.css'
import Navbar from './components/Navbar/Navbar';


function App() {
    return (
      <div className="App">
        <Navbar />
        <Outlet />
    </div>
    );
  }

export default App
