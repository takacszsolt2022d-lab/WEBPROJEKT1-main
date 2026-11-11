import {NavLink} from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    return (
        <nav>  
            <NavLink to="/">Kezdőlap</NavLink>
            <NavLink to="/login">Bejelentkezés</NavLink>
            <NavLink to="/register">Regisztráció</NavLink>
            <NavLink to="/user">Felhasználó</NavLink>
            <NavLink to="/order-form">Megrendelés</NavLink>
            <NavLink to="/admin">Admin</NavLink>
        </nav>
    )
}
