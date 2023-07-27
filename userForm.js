// UserForm.js

import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    cpf: '',
    brithdate: '',
    profile_img: '',
    is_advertiser: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!');
        setFormData({
          username: '',
          email: '',
          password: '',
          cpf: '',
          brithdate: '',
          profile_img: '',
          is_advertiser: false,
        });
      } else {
        alert('Ocorreu um erro ao cadastrar o usuário.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      {/* Repita para os outros campos do modelo */}
      <button type="submit">Salvar</button>
    </form>
  );
};

export default UserForm;
