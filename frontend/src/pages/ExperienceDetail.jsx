import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getExperience } from '../services/api';
import { CartContext } from '../context/CartContext';

function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    loadExperience();
  }, [id]);

  const loadExperience = async () => {
    try {
      setLoading(true);
      const data = await getExperience(id);
      setExperience(data);
    } catch (err) {
      setError(err.message || 'Error al cargar la experiencia');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (experience) {
      addToCart(experience);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '48px' }}>Cargando...</div>;
  }

  if (error || !experience) {
    return (
      <div style={{ textAlign: 'center', padding: '48px' }}>
        <p style={{ color: '#dc3545' }}>Error: {error || 'Experiencia no encontrada'}</p>
        <Link
          to="/"
          style={{
            marginTop: '16px',
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#C8102E',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
          }}
        >
          Volver a la Tienda
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginBottom: '24px',
          color: '#C8102E',
          textDecoration: 'none',
          fontWeight: '600',
        }}
      >
        ← Volver a la Tienda
      </Link>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          marginBottom: '32px',
        }}
      >
        <div>
          {experience.image_url ? (
            <img
              src={experience.image_url}
              alt={experience.name}
              style={{
                width: '100%',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                aspectRatio: '1',
                backgroundColor: '#f0f0f0',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8em',
              }}
            >
              🎄
            </div>
          )}
        </div>

        <div>
          <h1 style={{ color: '#C8102E', marginBottom: '16px', fontSize: '2.5em' }}>
            {experience.name}
          </h1>
          <div
            style={{
              fontSize: '2.5em',
              fontWeight: '700',
              color: '#FFD700',
              marginBottom: '24px',
            }}
          >
            €{experience.price.toFixed(2)}
          </div>
          <p style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#666', marginBottom: '32px' }}>
            {experience.description}
          </p>

          {experience.includes && (
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ marginBottom: '12px', color: '#213547' }}>Incluye:</h3>
              <p style={{ color: '#666', lineHeight: '1.8' }}>{experience.includes}</p>
            </div>
          )}

          {addedToCart && (
            <div
              style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                border: '1px solid #c3e6cb',
              }}
            >
              ✓ Agregado al carrito
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
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
              Agregar al Carrito
            </button>
            <button
              onClick={() => {
                handleAddToCart();
                navigate('/cart');
              }}
              style={{
                padding: '16px 24px',
                backgroundColor: 'white',
                color: '#C8102E',
                border: '2px solid #C8102E',
                borderRadius: '8px',
                fontSize: '1.1em',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceDetail;

