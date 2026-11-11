import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css'; //

function UserForm() {
  // 1. Az űrlap adatait tároló state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    role: 'developer',
    newsletter: false,
  });

  // 2. UX és állapotkezelő state-ek
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // type: 'success' | 'error'

  // 3. Univerzális változáskezelő (Controlled inputs)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 4. Beküldés kezelése
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    // Egyszerű validáció
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
      setMessage({ text: 'Kérlek töltsd ki az összes kötelező mezőt (*)!', type: 'error' });
      return;
    }

    // E-mail formátum ellenőrzés (egyszerű @ ellenőrzés)
    if (!formData.email.includes('@')) {
      setMessage({ text: 'Érvénytelen e-mail cím formátum (@ hiányzik)!', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      // Axios POST kérés küldése
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
      
      console.log('Sikeres válasz a szervertől:', response.data);
      setMessage({ text: 'Az űrlap adatai sikeresen elküldve!', type: 'success' });
      
      // Form ürítése sikeres beküldés után
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        role: 'developer',
        newsletter: false,
      });
    } catch (error) {
      console.error('Hiba történt a kérés során:', error);
      setMessage({ text: 'Hiba történt a küldés során. Kérlek próbáld újra később.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Felhasználói Adatlap</h2>
      
      {/* Visszajelző üzenet (Siker / Hiba) */}
      {message.text && (
        <div style={{ ...styles.alert, backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da', color: message.type === 'success' ? '#155724' : '#721c24' }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Vezetéknév */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Vezetéknév *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={styles.input}
            placeholder="Pl. Kovács"
          />
        </div>

        {/* Keresztnév */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Keresztnév *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={styles.input}
            placeholder="Pl. János"
          />
        </div>

        {/* E-mail cím */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>E-mail cím *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="kovacs.janos@example.com"
          />
        </div>

        {/* Életkor */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Életkor</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            style={styles.input}
            min="1"
            placeholder="Pl. 30"
          />
        </div>

        {/* Szerepkör */}
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Szerepkör</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="developer">Fejlesztő</option>
            <option value="designer">Designer</option>
            <option value="manager">Projektmenedzser</option>
          </select>
        </div>

        {/* Hírlevél feliratkozás */}
        <div style={styles.checkboxGroup}>
          <input
            type="checkbox"
            name="newsletter"
            id="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
          />
          <label htmlFor="newsletter" style={styles.checkboxLabel}>
            Feliratkozás a hírlevélre
          </label>
        </div>

        {/* Küldés Gomb */}
        <button 
          type="submit" 
          disabled={loading} 
          style={{ ...styles.button, backgroundColor: loading ? '#6c757d' : '#007bff' }}
        >
          {loading ? 'Küldés folyamatban...' : 'Adatok beküldése'}
        </button>
      </form>
    </div>
  );
}

// Egyszerű inline stílusok az áttekinthetőség kedvéért
const styles = {
  container: {
    maxWidth: '450px',
    margin: '30px auto',
    padding: '25px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
    backgroundColor: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '5px',
  },
  checkboxLabel: {
    fontSize: '14px',
    cursor: 'pointer',
  },
  button: {
    padding: '12px',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  alert: {
    padding: '10px 15px',
    borderRadius: '4px',
    marginBottom: '15px',
    fontSize: '14px',
    border: '1px solid transparent',
  },
};

export default UserForm;