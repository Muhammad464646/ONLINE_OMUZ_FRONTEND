import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/users/login/', {
        username,
        password,
      });
      console.log('Login success:', res.data);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      onLogin(res.data);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert('Login failed!');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#333' }}>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
          transition: 'border-color 0.3s',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#4CAF50')}
        onBlur={(e) => (e.target.style.borderColor = '#ccc')}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
          transition: 'border-color 0.3s',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#4CAF50')}
        onBlur={(e) => (e.target.style.borderColor = '#ccc')}
      />
      <button
        type="submit"
        style={{
          padding: '12px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
      >
        Login
      </button>
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
        password,
      });
      console.log('Register success:', res.data);
      onRegister(res.data);
    } catch (err) {
      console.error('Register error:', err.response?.data || err.message);
      alert('Registration failed!');
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#333' }}>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
          transition: 'border-color 0.3s',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#2196F3')}
        onBlur={(e) => (e.target.style.borderColor = '#ccc')}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
          transition: 'border-color 0.3s',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#2196F3')}
        onBlur={(e) => (e.target.style.borderColor = '#ccc')}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '16px',
          transition: 'border-color 0.3s',
        }}
        onFocus={(e) => (e.target.style.borderColor = '#2196F3')}
        onBlur={(e) => (e.target.style.borderColor = '#ccc')}
      />
      <button
        type="submit"
        style={{
          padding: '12px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#1976D2')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
      >
        Register
      </button>
    </form>
  );
}

function LoginAndRegister() {
  const [activeTab, setActiveTab] = useState('login');
  const [user, setUser] = useState(null);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '400px',
        margin: '50px auto',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        textAlign: 'center',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px',
          borderBottom: '1px solid #eee',
        }}
      >
        <button
          onClick={() => setActiveTab('login')}
          style={{
            padding: '12px 24px',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            fontWeight: activeTab === 'login' ? '700' : '500',
            color: activeTab === 'login' ? '#4CAF50' : '#888',
            cursor: 'pointer',
            outline: 'none',
            transition: 'color 0.2s',
          }}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab('register')}
          style={{
            padding: '12px 24px',
            background: 'none',
            border: 'none',
            fontSize: '18px',
            fontWeight: activeTab === 'register' ? '700' : '500',
            color: activeTab === 'register' ? '#2196F3' : '#888',
            cursor: 'pointer',
            outline: 'none',
            transition: 'color 0.2s',
          }}
        >
          Register
        </button>
      </div>

      {/* Content */}
      <div>{activeTab === 'login' ? <Login onLogin={setUser} /> : <Register onRegister={setUser} />}</div>

      {/* User info */}
      {user && (
        <div
          style={{
            marginTop: '24px',
            padding: '12px',
            backgroundColor: '#E8F5E9',
            color: '#2E7D32',
            borderRadius: '8px',
            fontWeight: '600',
          }}
        >
          ✅ Logged in as: <strong>{user.username || user.email}</strong>
        </div>
      )}
    </div>
  );
}

export default LoginAndRegister;