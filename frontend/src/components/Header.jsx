import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

function Header() {
  const { getTotalItems } = useContext(CartContext);

  return (
    <header
      style={{
        backgroundColor: '#C8102E',
        color: 'white',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <Link
        to="/"
        style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.5em',
          fontWeight: 'bold',
        }}
      >
        🎄 Tienda Navideña
      </Link>
      <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
          }}
        >
          Experiencias
        </Link>
        <Link
          to="/cart"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            position: 'relative',
          }}
        >
          Carrito
          {getTotalItems() > 0 && (
            <span
              style={{
                backgroundColor: '#FFD700',
                color: '#C8102E',
                borderRadius: '50%',
                padding: '2px 8px',
                fontSize: '0.8em',
                marginLeft: '8px',
                fontWeight: 'bold',
              }}
            >
              {getTotalItems()}
            </span>
          )}
        </Link>
        <Link
          to="/admin"
          style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
          }}
        >
          Admin
        </Link>
      </nav>
    </header>
  );
}

export default Header;

