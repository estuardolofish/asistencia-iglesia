import { Link, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import AsistenciaPage from "./pages/AsistenciaPage";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "system-ui",
        padding: 16,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <header
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>Asistencia Iglesia</h2>
        <nav style={{ display: "flex", gap: 10 }}>
          <Link to="/">Asistencia</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<AsistenciaPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}
