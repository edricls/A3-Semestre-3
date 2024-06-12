import React from 'react';
import Navbar from './menus1/Navbar';
import Calendar from './menus1/Calendar';
import './styles.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <div id="home">
        <h2 className="welcome-message">Bem-vindo à Agenda App</h2>
        <p className="navigation-message">Use a navegação abaixo para acessar o calendário.</p>
      </div>
      <div id="calendar">
        <Calendar />
      </div>
    </div>
  );
};

export default App;

