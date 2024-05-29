import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className = "App">
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Login">Login</Link></li>
              <li><Link to="/Dashboard">Dashboard</Link></li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </div>

  );
}

//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//        <Routes>
//          <Route exact path="/" component={Home} />
//          <Route path="/login" component={Login} />
//          <Route path="/dashboard" component={Dashboard} />
//        </Routes>
//
//        </header>
//    </div>
//  );
//}

export default App;
