
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';


import Main from './screens/MainScreen';
import Records from './screens/RecordsScreen';
import  Form from './screens/Form';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/records/:name/:date?" element={<Records />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;