import api from '../api/axiosInstance'
import { useState } from 'react';

export default function RegForm() {
    const [formdata, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        profileimage: ''
    });
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formdata.password !== formdata.confirmPassword) {
            setError('A jelszavak nem egyeznek meg');
            setMessage(null);
            return;
        }
        try {
            const response = await api.post('/users/', formdata); //backend route: /users/
            console.log('Registration successful:', response.data);
            setMessage('Sikeres regisztráció');
            setError(null);
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            if(error.response.status === 400) {
                setError('Ez az email cím már létezik!');
                setMessage(null);
                return;
            }
            setError('Sikertelen regisztráció'+error.response.error);
            setMessage(null);
        }
    };

    return (
        <div className="reg-form">
            <h2>Regisztráció</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" onChange={handleChange} id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Jelszó:</label>
                    <input type="password" id="password" name="password" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Jelszó megerősítése:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Név:</label>
                    <input type="text" id="name" name="name" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Telefonszám:</label>
                    <input type="tel" id="phone" name="phone" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="profileimage">Profilkép:</label>
                    <input type="file" id="profileimage" name="profileimage" accept="image/*" onChange={handleChange} />
                </div>
                <button type="submit">Regisztráció</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
            </form>
        </div>
    );
}