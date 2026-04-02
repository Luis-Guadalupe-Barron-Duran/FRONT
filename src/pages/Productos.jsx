import { useEffect, useState } from 'react';
import { api } from '../services/api';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { ShoppingBag, Loader, AlertCircle, MessageCircle, Twitter, Share2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cargandoForm, setCargandoForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
    descripcion: '',
    imagen_url: '',
    id_categoria: '',
    youtube_id: '',
    latitud:'',
    longitud:''
  });

  useEffect(() => {
    cargarProductos();
  }, []);//los corchetes esperan a que se renderize el componente para ejecutar la función cargarProductos

  const cargarProductos = async () => {
    try {
      const data = await api.get('/productos'); 
      setProductos(data);
    } catch (error) {
      setError("No se pudo conectar con el servidor. ¿Está encendido?");
    } finally {
      setLoading(false);
    }
  };

  const agregarProducto = async (e) => {
    e.preventDefault();
    
    if (data) {
      alert('Completa los campos requeridos: nombre, precio y stock');
      return;
    }

    setCargandoForm(true);
    try {
      await api.post('/productos', {
        nombre: formData.nombre,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        descripcion: formData.descripcion,
        id_categoria: formData.id_categoria || null,
        youtube_id: formData.youtube_id || null,
        imagen_url: formData.imagen_url,
        latitud: parseFloat(formData.latitud),
        longitud: parseFloat(formData.longitud)
      });
      
      // Limpiar formulario y cargar productos
      setFormData({
        nombre: '',
        precio: '',
        stock: '',
        descripcion: '',
        imagen_url: '',
        id_categoria: '',
        youtube_id: '',
        latitud:'',
        longitud:''
      });
       cargarProductos();
      alert('¡Producto agregado exitosamente!');
    } catch (error) {
      alert('Error al agregar el producto');
    } finally {
      setCargandoForm(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader className="animate-spin text-blue-600" size={48} />
    </div>
  );

  if (error) return (
    <div className="bg-red-100 text-red-700 p-4 rounded-lg flex items-center gap-2">
      <AlertCircle /> {error}
    </div>
  );

  const compartirWhatsApp=(producto)=>{
    const mensaje= `!wacha en la ienda\n\n ${producto.nombre}\n $${producto.precio}\n\n ¿Te interesa?`;

    const textoCodificado = encodeURIComponent(mensaje);

    window.open(`https://api.whatsapp.com/send?text =${textoCodificado}`, '_blank');
  };

  const compartirTwitter=(producto)=>{
    const mensaje= `!wacha en la i\n\n ${producto.nombre}\n $${producto.precio}\n\n ¿Te interesa?`;

    const textoCodificado = encodeURIComponent(mensaje);
    window.open(`https://twitter.com/intent/tweet?text=${textoCodificado}`, '_blank');

  };
  return (
    <div >
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <ShoppingBag className="text-blue-600" /> Inventario
        </h1>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
          {productos.length} items
        </span>
      </header>

      <div className="mb-6">
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Nuevo
        </button>
      </div>

      <form onSubmit={agregarProducto} className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm space-y-3">
        <h2 className="text-lg font-semibold text-blue-900">Nuevo producto</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Nombre *"
              value={formData.nombre}
              onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Precio *"
              value={formData.precio}
              onChange={(e) => setFormData((prev) => ({ ...prev, precio: e.target.value }))}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
              required
            />
            <input
              type="number"
              placeholder="Stock *"
              value={formData.stock}
              onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value }))}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
              required
            />
            <input
              type="url"
              placeholder="URL de imagen"
              value={formData.imagen_url}
              onChange={(e) => setFormData((prev) => ({ ...prev, imagen_url: e.target.value }))}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
             <input
              type="url"
              placeholder="URL de yutu"
              value={formData.youtube_id}
              onChange={(e) => setFormData((prev) => ({ ...prev, youtube_id: e.target.value }))}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Latitud *"
              value={formData.latitud}
              onChange={(e) => setFormData((prev) => ({ ...prev, precio: e.target.value }))}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Longitud *"
              value={formData.longitud}
              onChange={(e) => setFormData((prev) => ({ ...prev, precio: e.target.value }))}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
              
            />
          </div>

          <textarea
            placeholder="Descripcion"
            value={formData.descripcion}
            onChange={(e) => setFormData((prev) => ({ ...prev, descripcion: e.target.value }))}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            rows={3}
          />

        <button
          type="submit"
          disabled={cargandoForm}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
        >
          {cargandoForm ? 'Guardando...' : 'Guardar producto'}
        </button>
      </form>

      {/* Grid Responsivo: 1 col móvil, 2 tablet, 3 desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {productos.map((prod) => (
          <div key={prod.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 overflow-hidden flex flex-col">
            
            {/* Imagen del producto */}
            <div className="h-48 p-4 bg-white flex items-center justify-center border-b border-slate-50">
            {prod.youtube_id ? (<iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${prod.youtube_id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            ) : (
              <img src={prod.imagen_url || "https://via.placeholder.com/150"}  alt={prod.nombre} 
                className="max-h-full object-contain"
              />
            )}

            </div>

            {/* Cuerpo de la tarjeta */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-slate-800 line-clamp-1" title={prod.nombre}>
                  {prod.nombre}
                </h3>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">
                  ${prod.precio}
                </span>
              </div>
              
              <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
                {prod.descripcion || "Sin descripción disponible."}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <span className="text-xs font-medium text-slate-400">
                  Stock: <span className={prod.stock < 10 ? "text-red-500 font-bold" : "text-slate-600"}>{prod.stock}</span>
                </span>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Editar
                </button>
              </div>

              {/* NUEVO: Barra de Redes Sociales */}
              <div className="pt-3 flex justify-between items-center bg-slate-50 -mx-4 -mb-4 px-4 py-3 rounded-b-xl border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Share2 size={14} /> Compartir:
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => compartirWhatsApp(prod)}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition shadow-sm"
                    title="Compartir en WhatsApp"
                  >
                    <MessageCircle size={16} />
                  </button>
                  <button
                    onClick={() => compartirTwitter(prod)}
                    className="bg-black hover:bg-slate-800 text-white p-2 rounded-full transition shadow-sm"
                    title="Compartir en X (Twitter)"
                  >
                    <Twitter size={16} />
                  </button>
                </div>
              </div>
            </div>
           {/* Mapa */}
            <div className="h-48 p-4 bg-white flex items-center justify-center border-b border-slate-50">
            <MapContainer center={[prod.latitud || 20.5287576 , prod.longitud || -100.3172998]} zoom={13} style={{ height: "100%", width: "100%" , zIndex: 0}}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap'
              />
              <Marker position={[prod.latitud || 20.5287576 , prod.longitud || -100.3172998]}>
                <Popup>
                  Ubicacion de: <br /> {prod.nombre}
                </Popup>
              </Marker>
              </MapContainer>
           
            
          
          </div>
             </div>
        ))}
      </div>
    </div>
       
  );
};

export default Productos;