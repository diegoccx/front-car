import React from 'react';
import CadastroUsuarioForm from './components/CadastroUsuarioForm';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <div>
      <h1>Minha Aplicação</h1>
      <HomePage />
      <CadastroUsuarioForm />
    </div>
  );
};

export default App;