import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Função para buscar a lista de usuários cadastrados
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000//users/'); // Modifique a URL para apontar para a rota de usuários
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h2>Usuários Cadastrados:</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <strong>Username:</strong> {usuario.username}, <strong>Email:</strong> {usuario.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaUsuarios;
