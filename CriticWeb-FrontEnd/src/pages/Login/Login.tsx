import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";
import logo from "/assets/logo.png";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    setError(false); // Limpa o erro antes de tentar o login
    try {
      const response = await axios.post('http://localhost:8080/criticweb/authenticate/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response); // Log para depuração
      console.log('Headers:', response.headers);

      if (response.status === 200) {
        // Acessa o cabeçalho de autorização diretamente
        const authHeader = response.headers['authorization'];
        console.log('Auth Header:', authHeader); // Log para depuração
        
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7); // Remove "Bearer " do início do token
          console.log('Token:', token); // Log para depuração
          localStorage.setItem('authToken', token); // Armazena o token no localStorage

          localStorage.setItem('userEmail', formData.email);
          console.log(localStorage);

          navigate('/home'); // Redireciona para a página inicial após login bem-sucedido
        } else {
          console.log('Token not found in the response header'); // Log para depuração
          setError(true); // Se o token não estiver presente no cabeçalho, exibe a mensagem de erro
        }
      } else {
        console.log('Non-200 status code:', response.status); // Log para depuração
        setError(true); // Se a resposta não for 200, exibe a mensagem de erro
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(true); // Exibe a mensagem de erro em caso de erro na requisição
    }
  };

  return (
    <div className="container-login">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="Logo" width="auto" height="150px" className="logo-image"/>
      </a>

      <div className="loginBox">
        <div className="conteudo">
          <div className='entrar-text'>Entrar</div>
          <form onSubmit={handleSubmit}>
            <div className='label-input'>
              <label htmlFor="email" className="fieldLabel">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite seu email"
                className="inputField"
              />
            </div>
            <div className='label-input'>
              <label htmlFor="password" className="fieldLabel">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Digite sua senha"
                className="inputField"
              />
            </div>
            {error && <div className="errorMessage">Usuário ou senha incorretos</div>}
            <div className='login-button'>
              <button type="submit" className="loginButton">Entrar</button>
            </div>
          </form>
        </div>
      </div>
      <div className='sinup-field'>
        Não possui conta?
        <a href="/signup" className="signupLink"> Criar conta</a>
      </div>
    </div>
  );
}

export default Login;
