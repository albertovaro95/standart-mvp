import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { createPurchase } from '../services/api';

function CheckoutPage() {
  const { cart, getTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    buyer_name: '',
    buyer_email: '',
    buyer_phone: '',
    is_gift: false,
    recipient_name: '',
    recipient_email: '',
  });

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Por ahora, procesamos solo la primera experiencia del carrito
      // (para MVP simplificado)
      const firstItem = cart[0];
      
      const purchaseData = {
        experience_id: firstItem.id,
        buyer_name: formData.buyer_name,
        buyer_email: formData.buyer_email,
        buyer_phone: formData.buyer_phone,
        recipient_name: formData.is_gift ? formData.recipient_name : null,
        recipient_email: formData.is_gift ? formData.recipient_email : null,
      };

      const purchase = await createPurchase(purchaseData);
      
      // Guardar purchase en sessionStorage para la página de confirmación
      sessionStorage.setItem('lastPurchase', JSON.stringify(purchase));
      
      // Limpiar carrito
      clearCart();
      
      // Redirigir a confirmación
      navigate('/confirmation');
    } catch (err) {
      setError(err.message || 'Error al procesar la compra. Por favor, intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#C8102E', marginBottom: '32px' }}>Checkout</h1>

      {error && (
        <div
          style={{
            backgroundColor: '#fee',
            color: '#dc3545',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.3em', marginBottom: '16px' }}>Datos del Comprador</h2>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Nombre completo *
            </label>
            <input
              type="text"
              name="buyer_name"
              value={formData.buyer_name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1em',
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Email *
            </label>
            <input
              type="email"
              name="buyer_email"
              value={formData.buyer_email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1em',
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Teléfono *
            </label>
            <input
              type="tel"
              name="buyer_phone"
              value={formData.buyer_phone}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1em',
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              name="is_gift"
              checked={formData.is_gift}
              onChange={handleChange}
              style={{ width: '20px', height: '20px' }}
            />
            <span style={{ fontWeight: '600' }}>Es un regalo 🎁</span>
          </label>
        </div>

        {formData.is_gift && (
          <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.1em', marginBottom: '16px' }}>Datos del Destinatario</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Nombre del destinatario *
              </label>
              <input
                type="text"
                name="recipient_name"
                value={formData.recipient_name}
                onChange={handleChange}
                required={formData.is_gift}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1em',
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                Email del destinatario *
              </label>
              <input
                type="email"
                name="recipient_email"
                value={formData.recipient_email}
                onChange={handleChange}
                required={formData.is_gift}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1em',
                }}
              />
            </div>
          </div>
        )}

        <div
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '24px',
          }}
        >
          <h3 style={{ marginBottom: '16px' }}>Resumen de Compra</h3>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>{item.name} x{item.quantity}</span>
              <span>€{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: '2px solid #e0e0e0', marginTop: '16px', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.2em' }}>
            <span>Total:</span>
            <span style={{ color: '#FFD700' }}>€{getTotal().toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: loading ? '#999' : '#C8102E',
            color: 'white',
            padding: '16px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.1em',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Procesando...' : 'Confirmar Compra'}
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;

