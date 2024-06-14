// Instalen: axios y react-router-dom

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Home from './componentes/Home';
import Pets from './componentes/Pets';
import Adoptions from './componentes/Adoptions';
import Users from './componentes/Users';
import Login from './componentes/Login';
import Register from './componentes/Register';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/adoptions" element={<Adoptions />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
