import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useStore } from '../context/StoreContext';
import './Header.css';

const links = [
  { text: 'Home', to: '/' },
  { text: 'Produtos', to: '/products' },
  { text: 'Categorias', to: '/categories' },
  { text: 'Meus Pedidos', to: '/orders' },
];

export default function Header() {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const { user, cartCount, signOut } = useStore();

  const search = (e) => {
    e.preventDefault();
    navigate(`/products?filter=${encodeURIComponent(term.trim())}`);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__top">
          <Logo />

          <form className="header__search" onSubmit={search} role="search">
            <input
              type="text"
              placeholder="Pesquisar produto..."
              aria-label="Pesquisar produto"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit" aria-label="Buscar">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#474747" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>
            </button>
          </form>

          <div className="header__actions">
            {user ? (
              <>
                <span className="header__welcome">Olá, {user.firstname}</span>
                <button type="button" className="header__logout" onClick={signOut}>Sair</button>
              </>
            ) : (
              <>
                <Link to="/signup" className="header__signup">Cadastre-se</Link>
                <Link to="/login" className="header__login">Entrar</Link>
              </>
            )}
            <Link to="/cart" className="header__cart" aria-label={`Carrinho, ${cartCount} itens`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 1.9-1.4L21 8H6" />
                <circle cx="10" cy="21" r="1" /><circle cx="18" cy="21" r="1" />
              </svg>
              {cartCount > 0 && <span className="header__cart-count">{cartCount}</span>}
            </Link>
          </div>
        </div>

        <nav className="header__nav" aria-label="Navegação principal">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
              {l.text}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
