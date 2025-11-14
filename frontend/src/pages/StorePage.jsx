import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getExperiences } from '../services/api';

function StorePage() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const data = await getExperiences();
      setExperiences(data);
    } catch (err) {
      setError(err.message || 'Error al cargar experiencias');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '48px' }}>
        <p>Cargando experiencias navideñas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '48px' }}>
        <p style={{ color: '#dc3545' }}>Error: {error}</p>
        <button
          onClick={loadExperiences}
          style={{
            marginTop: '16px',
            padding: '12px 24px',
            backgroundColor: '#C8102E',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          background: 'linear-gradient(135deg, #C8102E 0%, #228B22 100%)',
          color: 'white',
          padding: '64px 32px',
          textAlign: 'center',
          borderRadius: '12px',
          marginBottom: '48px',
        }}
      >
        <h1 style={{ fontSize: '3em', marginBottom: '16px' }}>🎄 Experiencias Navideñas</h1>
        <p style={{ fontSize: '1.3em', opacity: 0.9 }}>
          Regala momentos inolvidables esta Navidad
        </p>
      </div>

      {experiences.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <p style={{ fontSize: '1.2em', color: '#666' }}>
            No hay experiencias disponibles en este momento
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {experiences.map((experience) => (
            <div
              key={experience.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
            >
              {experience.image_url ? (
                <img
                  src={experience.image_url}
                  alt={experience.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3em',
                  }}
                >
                  🎄
                </div>
              )}
              
              <div style={{ padding: '24px' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#213547', fontSize: '1.3em' }}>
                  {experience.name}
                </h3>
                <p
                  style={{
                    margin: '0 0 16px 0',
                    color: '#666',
                    fontSize: '0.9em',
                    minHeight: '60px',
                  }}
                >
                  {experience.description?.substring(0, 100)}
                  {experience.description?.length > 100 ? '...' : ''}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '16px',
                  }}
                >
                  <div style={{ fontSize: '1.8em', fontWeight: '700', color: '#FFD700' }}>
                    €{experience.price.toFixed(2)}
                  </div>
                  <Link
                    to={`/experience/${experience.id}`}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#C8102E',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                    }}
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StorePage;

