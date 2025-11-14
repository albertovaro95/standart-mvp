import { useState, useEffect } from 'react';
import { getExperiences, createExperience, getPurchases } from '../services/api';

function AdminPage() {
  const [experiences, setExperiences] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('experiences');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    includes: '',
    is_active: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [exps, purs] = await Promise.all([getExperiences(), getPurchases()]);
      setExperiences(exps);
      setPurchases(purs);
    } catch (err) {
      console.error('Error al cargar datos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const experienceData = {
        ...formData,
        price: parseFloat(formData.price),
      };
      await createExperience(experienceData);
      setShowForm(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        image_url: '',
        includes: '',
        is_active: true,
      });
      loadData();
    } catch (err) {
      alert('Error al crear experiencia: ' + err.message);
    }
  };

  const totalRevenue = purchases.reduce((sum, p) => sum + p.total_price, 0);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '48px' }}>Cargando...</div>;
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#C8102E', marginBottom: '32px' }}>Panel de Administración</h1>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
        <button
          onClick={() => setActiveTab('experiences')}
          style={{
            padding: '12px 24px',
            backgroundColor: activeTab === 'experiences' ? '#C8102E' : '#e0e0e0',
            color: activeTab === 'experiences' ? 'white' : '#213547',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          Gestionar Experiencias
        </button>
        <button
          onClick={() => setActiveTab('sales')}
          style={{
            padding: '12px 24px',
            backgroundColor: activeTab === 'sales' ? '#C8102E' : '#e0e0e0',
            color: activeTab === 'sales' ? 'white' : '#213547',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          Ver Ventas
        </button>
      </div>

      {activeTab === 'experiences' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2>Experiencias ({experiences.length})</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#228B22',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              {showForm ? 'Cancelar' : '+ Nueva Experiencia'}
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                marginBottom: '24px',
              }}
            >
              <h3 style={{ marginBottom: '16px' }}>Crear Nueva Experiencia</h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Descripción *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                    }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      Precio (€) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                      URL de Imagen
                    </label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Qué incluye *
                  </label>
                  <textarea
                    value={formData.includes}
                    onChange={(e) => setFormData({ ...formData, includes: e.target.value })}
                    required
                    rows="3"
                    placeholder="Ej: Menú de 5 platos, vino, decoración temática..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{
                  marginTop: '16px',
                  padding: '12px 24px',
                  backgroundColor: '#C8102E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Crear Experiencia
              </button>
            </form>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {experiences.map((exp) => (
              <div
                key={exp.id}
                style={{
                  backgroundColor: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <h3 style={{ marginBottom: '8px' }}>{exp.name}</h3>
                <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '12px' }}>
                  {exp.description?.substring(0, 100)}...
                </p>
                <div style={{ fontSize: '1.5em', fontWeight: '700', color: '#FFD700', marginBottom: '8px' }}>
                  €{exp.price.toFixed(2)}
                </div>
                <div
                  style={{
                    padding: '4px 12px',
                    backgroundColor: exp.is_active ? '#d4edda' : '#f8d7da',
                    color: exp.is_active ? '#155724' : '#721c24',
                    borderRadius: '4px',
                    display: 'inline-block',
                    fontSize: '0.85em',
                    fontWeight: '600',
                  }}
                >
                  {exp.is_active ? 'Activa' : 'Inactiva'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'sales' && (
        <div>
          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              marginBottom: '24px',
            }}
          >
            <h2 style={{ marginBottom: '16px' }}>Estadísticas</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '4px' }}>
                  Total de Ventas
                </div>
                <div style={{ fontSize: '2em', fontWeight: '700', color: '#C8102E' }}>
                  {purchases.length}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.9em', color: '#666', marginBottom: '4px' }}>
                  Ingresos Totales
                </div>
                <div style={{ fontSize: '2em', fontWeight: '700', color: '#FFD700' }}>
                  €{totalRevenue.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          <h2 style={{ marginBottom: '24px' }}>Ventas Realizadas</h2>
          {purchases.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', color: '#666' }}>
              No hay ventas aún
            </div>
          ) : (
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>
                      Fecha
                    </th>
                    <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>
                      Comprador
                    </th>
                    <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>
                      Email
                    </th>
                    <th style={{ padding: '16px', textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>
                      Voucher
                    </th>
                    <th style={{ padding: '16px', textAlign: 'right', borderBottom: '2px solid #e0e0e0' }}>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase) => (
                    <tr key={purchase.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                      <td style={{ padding: '16px' }}>
                        {new Date(purchase.created_at).toLocaleDateString('es-ES')}
                      </td>
                      <td style={{ padding: '16px', fontWeight: '600' }}>
                        {purchase.buyer_name}
                      </td>
                      <td style={{ padding: '16px', color: '#666' }}>
                        {purchase.buyer_email}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <code
                          style={{
                            backgroundColor: '#f0f0f0',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            fontSize: '0.9em',
                          }}
                        >
                          {purchase.voucher_code}
                        </code>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right', fontWeight: '700', color: '#FFD700' }}>
                        €{purchase.total_price.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPage;

