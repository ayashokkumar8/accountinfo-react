import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AccountinfoComponent from './components/AccountinfoComponent';
import ErrorComponent from './components/ErrorComponent';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ErrorComponent />}></Route>
        <Route path="/accountinfo" element={<AccountinfoComponent />}></Route>
        <Route path="*" element={< ErrorComponent />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
