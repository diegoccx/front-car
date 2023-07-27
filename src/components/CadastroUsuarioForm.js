import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CadastroUsuarioForm = () => {
  const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: '',
  cpf: '',
  brithdate: null,
  profile_img: '',
  address: {
    zip_code: '',
    state: '',
    city: '',
    street: '',
    number: '',
    complement: ''
  }
});

 const [errorMessages, setErrorMessages] = useState({});

 const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Função para buscar a lista de usuários cadastrados
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/users/');
        // Verifica se a propriedade "results" está presente na resposta e é um array
        if (response.data.results && Array.isArray(response.data.results)) {
          setUsuarios(response.data.results);
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
  const { name, value } = e.target;
  if (name.startsWith('address.')) {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name.split('.')[1]]: value
      }
    });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

 const handleSaveToFile = () => {
    const jsonFormData = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonFormData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formData.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  console.log(formData);
  axios.post('http://127.0.0.1:8000/users/', formData)
    .then((response) => {
      console.log('Usuário cadastrado com sucesso!', response.data);
      // Atualiza a lista de usuários com o novo usuário cadastrado
      setUsuarios([...usuarios, response.data]);
	   setErrorMessages({});
    })
    .catch((error) => {
     if (error.response && error.response.data) {
          setErrorMessages(error.response.data);
        }
        console.error('Erro ao cadastrar usuário:', error);
      // Faça o tratamento de erro aqui, como exibir uma mensagem de erro para o usuário.
    });
};

  return (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <div>
        <label>CPF:</label>
        <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} />
      </div>
      <div>
        <label>Birthdate:</label>
        <input type="date" name="brithdate" value={formData.brithdate} onChange={handleChange} />
      </div>
      <div>
        <label>Profile Image URL:</label>
        <input type="text" name="profile_img" value={formData.profile_img} onChange={handleChange} />
      </div>
      <div>
        <label>Is Advertiser:</label>
        <input
          type="checkbox"
          name="is_advertiser"
          checked={formData.is_advertiser}
          onChange={handleChange}
        />
      </div>
      {/* Additional fields for the Address model */}
      <div>
        <label>Zip Code:</label>
        <input type="text" name="address.zip_code" value={formData.address.zip_code} onChange={handleChange} />
      </div>
      <div>
        <label>State:</label>
        <input type="text" name="address.state" value={formData.address.state} onChange={handleChange} />
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} />
      </div>
      <div>
        <label>Street:</label>
        <input type="text" name="address.street" value={formData.address.street} onChange={handleChange} />
      </div>
      <div>
        <label>Number:</label>
        <input type="text" name="address.number" value={formData.address.number} onChange={handleChange} />
      </div>
      <div>
        <label>Complement:</label>
        <input type="text" name="address.complement" value={formData.address.complement} onChange={handleChange} />
      </div>
      {/* ... (rest of the form) */}
	  
	    {errorMessages.username && <p>{errorMessages.username[0]}</p>}
      {errorMessages.email && <p>{errorMessages.email[0]}</p>}
      {errorMessages.cpf && <p>{errorMessages.cpf[0]}</p>}
      {errorMessages.address && (
        <>
          {errorMessages.address.zip_code && <p>{errorMessages.address.zip_code[0]}</p>}
          {errorMessages.address.street && <p>{errorMessages.address.street[0]}</p>}
          {errorMessages.address.number && <p>{errorMessages.address.number[0]}</p>}
        </>
      )}
	   <button onClick={handleSaveToFile}>Salvar em Arquivo</button>
      <button type="submit">Cadastrar</button>
    </form>

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
    </div>
  );
};

export default CadastroUsuarioForm;
