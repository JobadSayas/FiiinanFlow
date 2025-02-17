
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';

import MainScreen from './screens/MainScreen';
import RecordsScreen from './screens/RecordsScreen';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/records/:budget?/:method?/:type?/:keyword?/:method?/:start_date?/:end_date?/:limit?" 
               element={<RecordsScreen />} 
        />
      </Routes>
    </Router>
  );
}

export default App;