import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation=useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/users/login/', {
        username,
        password
      });
      console.log('Login success:', res.data);
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
     navigation('/')
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('Login failed!');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/users/register/', {
        username,
        email,
        password
      });
      console.log('Register success:', res.data);
      onRegister(res.data);
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
      alert('Register failed!');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
}

function LoginAndRegister() {
  const [activeTab, setActiveTab] = useState('login');
  const [user, setUser] = useState(null); // хранит данные пользователя или токен

  return (
    <div style={{ width: '300px', margin: '50px auto', textAlign: 'center' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('login')}
          style={{
            padding: '10px',
            fontWeight: activeTab === 'login' ? 'bold' : 'normal',
            borderBottom: activeTab === 'login' ? '2px solid blue' : 'none'
          }}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab('register')}
          style={{
            padding: '10px',
            fontWeight: activeTab === 'register' ? 'bold' : 'normal',
            borderBottom: activeTab === 'register' ? '2px solid blue' : 'none'
          }}
        >
          Register
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'login' ? <Login onLogin={setUser} /> : <Register onRegister={setUser} />}
      </div>

      {/* User info */}
      {user && (
        <div style={{ marginTop: '20px', color: 'green' }}>
          <strong>Logged in as:</strong> {user.username || user.email}
        </div>
      )}
    </div>
  );
}

export default LoginAndRegister;
