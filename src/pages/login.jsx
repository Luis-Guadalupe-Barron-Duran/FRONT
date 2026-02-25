export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D8DDE6] p-6">
      <div className="w-full max-w-sm">
        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <p className="text-sm text-white/80 mt-1 text-center">Ingresa tus credenciales</p>

          <form className="mt-6 space-y-4">
            <input className="w-full rounded-md bg-white/10 placeholder-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/60"
              type="email"
              placeholder="Correo electronico"
            />

            <input className="w-full rounded-md bg-white/10 placeholder-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/60"
              type="password"
              placeholder="Contrasena"
            />

            <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition" >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}