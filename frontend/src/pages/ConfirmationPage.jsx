import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExperience } from '../services/api';

function ConfirmationPage() {
  const navigate = useNavigate();
  const [purchase, setPurchase] = useState(null);
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lastPurchase = sessionStorage.getItem('lastPurchase');
    if (!lastPurchase) {
      navigate('/');
      return;
    }

    const purchaseData = JSON.parse(lastPurchase);
    setPurchase(purchaseData);

    // Obtener detalles de la experiencia
    getExperience(purchaseData.experience_id)
      .then((exp) => {
        setExperience(exp);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar experiencia:', err);
        setLoading(false);
      });
  }, [navigate]);

  if (loading || !purchase || !experience) {
    return <div style={{ textAlign: 'center', padding: '48px' }}>Cargando...</div>;
  }

  // Calcular fecha de validez (31 de enero del año siguiente)
  const validUntil = new Date();
  validUntil.setFullYear(validUntil.getFullYear() + 1);
  validUntil.setMonth(0); // Enero
  validUntil.setDate(31);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: '4em', marginBottom: '16px' }}>🎉</div>
      <h1 style={{ color: '#C8102E', marginBottom: '16px' }}>¡Compra Confirmada!</h1>
      <p style={{ fontSize: '1.2em', color: '#666', marginBottom: '48px' }}>
        Tu experiencia navideña ha sido adquirida exitosamente
      </p>

      <div
        style={{
          backgroundColor: '#f0f0f0',
          border: '3px dashed #C8102E',
          padding: '32px',
          borderRadius: '12px',
          marginBottom: '32px',
        }}
      >
        <h2 style={{ color: '#C8102E', marginBottom: '16px' }}>Tu Voucher</h2>
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '1.8em',
            fontWeight: '700',
            color: '#C8102E',
            marginBottom: '24px',
            letterSpacing: '2px',
          }}
        >
          {purchase.voucher_code}
        </div>
        <p style={{ color: '#666', marginBottom: '8px' }}>
          <strong>Experiencia:</strong> {experience.name}
        </p>
        <p style={{ color: '#666', marginBottom: '8px' }}>
          <strong>Válido hasta:</strong> {validUntil.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        {purchase.recipient_name && (
          <p style={{ color: '#666', marginTop: '16px', fontStyle: 'italic' }}>
            🎁 Regalo para: {purchase.recipient_name}
          </p>
        )}
      </div>

      <div
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '32px',
          textAlign: 'left',
        }}
      >
        <h3 style={{ marginBottom: '16px' }}>Detalles de la Experiencia</h3>
        <p style={{ marginBottom: '8px' }}>{experience.description}</p>
        {experience.includes && (
          <div style={{ marginTop: '16px' }}>
            <strong>Incluye:</strong>
            <p style={{ marginTop: '8px', color: '#666' }}>{experience.includes}</p>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <button
          onClick={() => {
            sessionStorage.removeItem('lastPurchase');
            navigate('/');
          }}
          style={{
            backgroundColor: '#C8102E',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1em',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Volver a la Tienda
        </button>
        <button
          onClick={() => window.print()}
          style={{
            backgroundColor: 'white',
            color: '#C8102E',
            padding: '12px 24px',
            border: '2px solid #C8102E',
            borderRadius: '8px',
            fontSize: '1em',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Imprimir Voucher
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPage;

