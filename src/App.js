
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

import MainScreen from './screens/MainScreen';
import RecordsScreen from './screens/RecordsScreen';
import TestScreen from './screens/TestScreen';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/records/:name/:date?" element={<RecordsScreen />} />
        <Route path="/test" element={<TestScreen />} />
      </Routes>
    </Router>
  );
}

export default App;