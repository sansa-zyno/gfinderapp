import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route,Routes,useNavigate } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;

