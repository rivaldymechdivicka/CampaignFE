import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenu from './Component/MainMenu';
import MainMenuSide from './Component/MainMenuSide';
import Customer from './Component/Customer/Customer';
import Campaign from './Component/Campaign/Campaign';
import Message from './Component/Message/Message';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/customer" element={<Customer/>} />
          <Route path="/campaign" element={<Campaign/>} />
          <Route path="/message" element={<Message/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
