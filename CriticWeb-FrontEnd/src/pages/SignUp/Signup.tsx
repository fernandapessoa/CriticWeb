import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import logo from '/assets/logo.png';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Data:', formData); // Print the form data to the console
    
    // Verifica se as senhas são iguais
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

  

      try {
        const response = await axios.post('http://localhost:8080/criticweb/authenticate/register', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Response:', response); // Log the response

        if (response.status === 200) {
          navigate('/login');
          return; // Sai do loop se a requisição for bem-sucedida
        } else {
          const firstMessage = response.data[0]?.message || 'Registration failed. Please try again.';
          setErrorMessage(firstMessage);
        }
      } catch (error) {
        console.error('Error occurred:', error); // Log any error
        if (error.response && error.response.data) {
          const firstMessage = error.response.data[0]?.message || 'An error occurred. Please try again.';
          setErrorMessage(firstMessage);
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }

    }
  };

  return (
    <div className="signUp-container-signup">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="Logo" width="auto" height="150px" className="signUp-logo-image"/>
      </a>

      <div className="signUp-signUpBox">
        <div className="signUp-conteudo">
          <div className='signUp-criarConta-text'>Criar conta</div>
          <form onSubmit={handleSubmit} className="signUp-form">
            <div className='signUp-label-input'>
              <label htmlFor="name" className="signUp-fieldLabel">Nome</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Digite seu nome" className="signUp-inputField" />
            </div>
            <div className='signUp-label-input'>
              <label htmlFor="email" className="signUp-fieldLabel">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Digite seu email" className="signUp-inputField" />
            </div>
            <div className='signUp-label-input'>
              <label htmlFor="password" className="signUp-fieldLabel">Senha</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Digite sua senha" className="signUp-inputField" />
            </div>
            <div className='signUp-label-input'>
              <label htmlFor="confirmPassword" className="signUp-fieldLabel">Confirmar Senha</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirme sua senha" className="signUp-inputField" />
            </div>
            {errorMessage && (
              <div className="signUp-errorMessage">
                {errorMessage}
              </div>
            )}
            <div className='signUp-signUp-button'>
              <button type="submit" className="signUp-signUpButton">Registrar conta</button>
            </div>
          </form>
        </div>
      </div>
      <div className='signUp-login-field'>
        Já possui conta?
        <a href="/login" className="signUp-loginLink"> Entrar</a>
      </div>
    </div>
  );
}

export default SignUp;
