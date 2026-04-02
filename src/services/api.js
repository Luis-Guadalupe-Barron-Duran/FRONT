const rawApiUrl = import.meta.env.VITE_API_URL?.trim();

if (!rawApiUrl) {
  throw new Error('Falta VITE_API_URL. Configura esta variable en tu entorno.');
}

const API_URL = rawApiUrl.replace(/\/$/, '');


export const api = {
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`,{
     //   headers: {
     //     'Authorization': token ? `Bearer ${token}`: '',
     //     'Content-Type': 
     //   }
      });
      
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error en GET:", error);
      throw error;
    }
  },

  
  post: async (endpoint, body) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(body)
        //true ? '' : ''
        //Authorization: `Bearer ${token}`
        //                 tipo    valor
        // Bearer: token
      });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error en POST:", error);
      throw error;
    }
  }
};
