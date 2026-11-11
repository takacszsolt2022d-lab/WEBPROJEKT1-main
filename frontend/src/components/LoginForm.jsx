import api from '../api/axiosInstance';
import { useState } from 'react';

export default function LoginForm() {
    const [formdata, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', formdata);
            console.log('Login successful:', response.data);
            setMessage('Sikeres bejelentkezés');
            setError(null);
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Sikertelen bejelentkezés');
            setMessage(null);
        }
    };

    return (
        <div className="login-form">
            <h2>Bejelentkezés</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" onChange={handleChange}id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Jelszó:</label>
                    <input type="password" id="password" name="password" required onChange={handleChange} />
                </div>
                <button type="submit">Bejelentkezés</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
            </form>
            
        </div>
    );
}