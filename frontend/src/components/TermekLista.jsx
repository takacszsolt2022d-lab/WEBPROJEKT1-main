import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import TermekKartya from './TermekKartya';

export default function TermekLista() {
    const [termekLista, setTermekLista] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/termekek');
                setTermekLista(response.data);
            }
            catch (error) {
                console.error('Hiba a termékek lekérésekor:', error);
                setError(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const errorstyle = {
        color: 'red',
        fontWeight: 'bold',
        backgroundColor: '#ffe6e6',
        border: '1px solid red',
    };

    const loadingStyle = {
        width: '70%',
        margin: '20px auto',
        padding: '10px',
        textAlign: 'center',
        border: '1px solid blue',

        color: 'blue',
        fontWeight: 'bold',
        backgroundColor: '#e6f0ff',
    };

    return (
        <div>
            <h2>Termékek</h2>
            {loading && <p style={loadingStyle}>Adatok betöltése...</p>}
            {error && <p style={errorstyle}>Hiba történt: {error.message}</p>}
            {!loading && !error && (
                <div>
                    {termekLista.map((termek) => (
                        <TermekKartya key={termek.id} termek={termek} />
                    ))}
                </div>
            )}
        </div>
    );
}