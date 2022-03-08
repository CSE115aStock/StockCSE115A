import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import {Register} from './login/index';
import {Login} from './login/index';
import HomePage from './HomePage';

/**
 *
 * @return {object} JSX
 */
export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/homepage" element={<HomePage/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </div>
    </Router>
  );
}
