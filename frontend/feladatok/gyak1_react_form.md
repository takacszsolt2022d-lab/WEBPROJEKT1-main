# Gyakorló Feladat: Komplex Űrlap beküldése Axios használatával

## A feladat célja
Készíts egy React komponenst, amely egy felhasználói profil vagy regisztrációs űrlap adatait gyűjti össze, validálja, majd az `axios` segítségével elküldi egy REST API backend szerverre. 

A feladat során az alábbi témaköröket gyakorolhatod:
* Vezérelt komponensek (*controlled inputs*) kezelése.
* Összetett állapotkezelés (*state management*) egyetlen objektumban.
* HTTP POST kérések indítása az `axios` könyvtár segítségével.
* Betöltési és hibaállapotok (*loading & error states*) vizuális kezelése.

---

## Feladatleírás és Részletes Követelmények

### 1. Az űrlap mezői (State struktúra)
Az űrlapnak az alábbi adatokat kell tartalmaznia egyetlen közös state objectben:
* **Vezetéknév** (`firstName`): Szöveges mező (kötelező).
* **Keresztnév** (`lastName`): Szöveges mező (kötelező).
* **E-mail cím** (`email`): E-mail típusú mező (kötelező, tartalmaznia kell `@` jelet).
* **Életkor** (`age`): Numerikus mező (opcionális, de ha megadják, legyen nagyobb, mint 0).
* **Szerepkör** (`role`): Legördülő lista (`<select>`), opciók: `Fejlesztő` (`developer`), `Designer` (`designer`), `Projektmenedzser` (`manager`). Az alapértelmezett érték legyen a `developer`.
* **Hírlevél feliratkozás** (`newsletter`): Jelölőnégyzet (`checkbox`), logikai érték (`true` / `false`), alapértelmezett értéke `false`.

---

### 2. Funkcionális elvárások

1. **Vezérelt komponens (Controlled Input):** 
   Minden input mező értéke a React state-ből származjon, és a változásaikat (`onChange`) egyetlen univerzális kezelőfüggvénnyel (`handleChange`) frissítsd a state-ben.

2. **Validáció beküldés előtt:**
   * Ellenőrizd, hogy a kötelező mezők (`firstName`, `lastName`, `email`) ki vannak-e töltve.
   * Ha bármelyik hiányzik, jeleníts meg egy hibaüzenetet a felhasználónak a felületen, és **ne küldd el** a kérést.

3. **Adatbeküldés Axios-szal:**
   * Sikeres helyi validáció után az űrlap adatait küldd el egy `POST` kéréssel a `https://jsonplaceholder.typicode.com/users` (vagy egy általad választott teszt API / helyi backend) címre.

4. **UX / Állapotkezelés (Feedback):**
   * **Loading state:** Amíg a kérés fut, a Küldés gomb legyen letiltva (`disabled`), és jelenjen meg egy *"Küldés folyamatban..."* felirat vagy spinner.
   * **Sikeres üzenet:** Sikeres válasz esetén (pl. HTTP 201 Created status) töröld az űrlap mezőit, és jeleníts meg egy zöld színű visszajelzést.
   * **Hibakezelése:** Ha a szerver hibaüzenetet ad (pl. nincs internet vagy rossz endpoint), kapd el a hibát egy `try...catch` blokkban, és jeleníts meg egy piros hibaüzenetet.

---

## 🛠️ Ajánlott Technológiai Stack
* **React** (Functional Components + `useState` hook)
* **Axios** (`npm install axios`)
* **CSS** / **Tailwind CSS** (tetszőleges formázáshoz)

---

## 💡 Segítség / Kódvázlat a kezdéshez

```jsx
import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    role: 'developer',
    newsletter: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setMessage({ text: 'Kérlek töltsd ki a kötelező mezőket!', type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
      console.log('Sikeres válasz:', response.data);
      setMessage({ text: 'Az űrlap sikeresen elküldve!', type: 'success' });
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        role: 'developer',
        newsletter: false,
      });
    } catch (error) {
      console.error('Hiba történt:', error);
      setMessage({ text: 'Hiba történt a küldés során. Próbáld újra később.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Felhasználói Adatlap</h2>
      {message.text && (
        <div style={{ padding: '10px', marginBottom: '15px', color: '#fff', backgroundColor: message.type === 'success' ? 'green' : 'red' }}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Ide jönnek az input mezők... */}
      </form>
    </div>
  );
}

export default UserForm;
```

---

## 🏆 Extra kihívások (Opcionális)
1. **Valós idejű (inline) validáció:** Ne csak beküldéskor, hanem gépelés közben is vizsgáld az e-mail mező helyességét, és jelezd a felhasználónak, ha érvénytelen formátumot adott meg.
2. **Custom Hook:** Szervezd ki az űrlap logikáját (`formData`, `handleChange`, `resetForm`) egy külön `useForm` nevű custom hookba.