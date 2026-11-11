import {useState, useEffect} from 'react'
import api from '../api/axiosInstance'

export default function AdminPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Ellenőrizd, hogy a felhasználó admin-e
        const checkAdmin = async () => {
            try {
                const response = await api.get('/users/test');
                const data = await response.data;
                console.log('Admin check response:', data);
                if (data.isAdmin) {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.log('Error checking admin status:', error);
                if (error.response && error.response.status === 401) {
                    setMessage('Nincs bejelentkezve. Kérlek, jelentkezz be az admin oldal megtekintéséhez.');
                }
                if (error.response && error.response.status === 403) {
                    setMessage('Nincs jogosultságod az admin oldal megtekintéséhez.');
                }
                

            }
        };

        checkAdmin();
    }, []);

    return (
        <div>
            <h1>Admin Page</h1>
            <p>Ez az oldal csak az adminok számára elérhető.</p>
            {message && <p>{message}</p>}
        </div>
    );
}