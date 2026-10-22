# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Environment variables

Create a `.env` file from `.env.example` and set the backend URL:

```env
VITE_API_URL=http://localhost:4000
```

## Run the application

Start the backend before submitting the login form. In a separate terminal, from
the backend project directory, run:

```powershell
cd "C:\Users\LENOVO\Documents\Aplicaciones Web OServicios\Examen lnventario\backend"
npm install
npm start
```

The backend must be listening on `http://localhost:4000`. Then start this
frontend from its project directory:

```powershell
npm install
npm run dev
```

If the browser reports `ERR_CONNECTION_REFUSED` for
`http://localhost:4000/api/auth/login`, the backend is not reachable. Confirm
that its terminal is still running and that port 4000 is available. If
`VITE_API_URL` is changed, restart the Vite development server so the new
value is loaded.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
