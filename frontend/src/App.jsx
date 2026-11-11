import './App.css'
import TermekLista from './components/TermekLista'
import LoginForm from './components/LoginForm'
import RegForm from './components/RegForm'
import UserForm from './components/UserForm'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import OrderForm from './components/OrderForm'
import AdminPage from './components/AdminPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegForm />} />
          <Route path="/user" element={<UserForm />} />
          <Route path="/multi-form" element={<OrderForm />} />
          <Route path="/order-form" element={<OrderForm />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
