const API_BASE_URL = 'http://localhost:8000/api';

// Helper para hacer requests
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.detail || errorJson.message || `Error ${response.status}`;
      } catch {
        errorMessage = errorText || `Error ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }
    
    // Si la respuesta está vacía, retornar null
    const text = await response.text();
    if (!text) {
      return null;
    }
    
    return JSON.parse(text);
  } catch (error) {
    // Mejorar mensaje de error para "Failed to fetch"
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo en http://localhost:8000');
    }
    console.error('API Error:', error);
    throw error;
  }
}

// Experiences endpoints
export async function getExperiences() {
  return fetchAPI('/experiences');
}

export async function getExperience(id) {
  return fetchAPI(`/experiences/${id}`);
}

export async function createExperience(data) {
  return fetchAPI('/experiences', {
    method: 'POST',
    body: data,
  });
}

// Purchases endpoints
export async function createPurchase(data) {
  return fetchAPI('/purchases', {
    method: 'POST',
    body: data,
  });
}

export async function getPurchases() {
  return fetchAPI('/purchases');
}

