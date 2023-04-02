import './App.css';
import React from 'react';
import { Auth } from './auth/Auth';

function App() {
  return (
    <div className="App">
      <>
        <h1>Admin Panel</h1>
        <Auth />
      </>
    </div>
  );
}

export default App;
