import { useState, useEffect } from "react";
import { api } from "../services/api";

const Productos = () => (
  <div>
    <h1 className="text-3xl font-bold text-slate-800">Productos</h1>
    <p className="mt-4 text-slate-600">Bienvenido al sistema. Selecciona una opción del menú.</p>
  </div>
);

async function product() {
  try {
    const response = await api.get("http://localhost:4000/api/productos");
    
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
}


export default Productos;