import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px' }}>
        <h2>Tu carrito está vacío</h2>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          Agrega experiencias navideñas para comenzar
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#C8102E',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1em',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          Ver Experiencias
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#C8102E', marginBottom: '32px' }}>Tu Carrito</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 8px 0', color: '#213547' }}>{item.name}</h3>
              <p style={{ margin: '0', color: '#666', fontSize: '0.9em' }}>
                {item.description?.substring(0, 100)}...
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontSize: '1.2em',
                  }}
                >
                  -
                </button>
                <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: '600' }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontSize: '1.2em',
                  }}
                >
                  +
                </button>
              </div>
              
              <div style={{ minWidth: '120px', textAlign: 'right' }}>
                <div style={{ fontSize: '1.2em', fontWeight: '700', color: '#FFD700' }}>
                  €{(item.price * item.quantity).toFixed(2)}
                </div>
                <div style={{ fontSize: '0.85em', color: '#666' }}>
                  €{item.price.toFixed(2)} c/u
                </div>
              </div>
              
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9em',
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '2px solid #e0e0e0',
          }}
        >
          <span style={{ fontSize: '1.5em', fontWeight: '700' }}>Total:</span>
          <span style={{ fontSize: '1.8em', fontWeight: '700', color: '#FFD700' }}>
            €{getTotal().toFixed(2)}
          </span>
        </div>
        
        <button
          onClick={() => navigate('/checkout')}
          style={{
            width: '100%',
            backgroundColor: '#C8102E',
            color: 'white',
            padding: '16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1em',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Proceder al Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;

