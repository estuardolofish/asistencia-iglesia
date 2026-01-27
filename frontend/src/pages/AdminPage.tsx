import { useEffect, useState } from "react";
import { api } from "../api";
import type { Actividad, Agrupacion, Hermano } from "../types";

export default function AdminPage() {
  const [agrupaciones, setAgrupaciones] = useState<Agrupacion[]>([]);
  const [hermanos, setHermanos] = useState<Hermano[]>([]);
  const [actividades, setActividades] = useState<Actividad[]>([]);

  // forms
  const [nombreAgr, setNombreAgr] = useState("");

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [puesto, setPuesto] = useState("");

  const [mHermanoId, setMHermanoId] = useState<number | "">("");
  const [mAgrupacionId, setMAgrupacionId] = useState<number | "">("");

  const [actNombre, setActNombre] = useState("");
  const [actFechaHora, setActFechaHora] = useState(""); // datetime-local

  const loadAll = async () => {
    const [a, h, act] = await Promise.all([
      api.get("/agrupaciones"),
      api.get("/hermanos"),
      api.get("/actividades"),
    ]);
    setAgrupaciones(a.data);
    setHermanos(h.data);
    setActividades(act.data);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const crearAgrupacion = async () => {
    if (!nombreAgr.trim()) return;
    await api.post("/agrupaciones", { nombre: nombreAgr });
    setNombreAgr("");
    await loadAll();
  };

  const crearHermano = async () => {
    if (!nombreCompleto.trim()) return;

    await api.post("/hermanos", {
      nombreCompleto: nombreCompleto.trim(),
      puesto: puesto.trim() ? puesto.trim() : undefined,
    });

    setNombreCompleto("");
    setPuesto("");
    await loadAll();
  };

  const asignar = async () => {
    if (!mHermanoId || !mAgrupacionId) return;
    await api.post("/membresias", {
      hermanoId: mHermanoId,
      agrupacionId: mAgrupacionId,
    });
    alert("Asignado ✅");
    await loadAll();
  };

  const crearActividad = async () => {
    if (!actNombre.trim() || !actFechaHora) return;
    const iso = new Date(actFechaHora).toISOString();
    await api.post("/actividades", {
      nombre: actNombre,
      fechaHora: iso,
      abierta: true,
    });
    setActNombre("");
    setActFechaHora("");
    await loadAll();
  };

  const cerrarActividad = async (id: number) => {
    await api.patch(`/actividades/${id}/cerrar`);
    await loadAll();
  };

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <h3 style={{ marginTop: 0 }}>Admin (simple)</h3>

      {/* Agrupaciones */}
      <section
        style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}
      >
        <h4>Agrupaciones</h4>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={nombreAgr}
            onChange={(e) => setNombreAgr(e.target.value)}
            placeholder="Nombre de agrupación"
            style={{ padding: 8, minWidth: 260 }}
          />
          <button
            onClick={crearAgrupacion}
            style={{ padding: "8px 12px", cursor: "pointer" }}
          >
            Crear
          </button>
        </div>

        <ul>
          {agrupaciones.map((a) => (
            <li key={a.id}>
              {a.nombre} {a.activa ? "" : "(inactiva)"}
            </li>
          ))}
        </ul>
      </section>

      {/* Hermanos */}
      <section
        style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}
      >
        <h4>Hermanos</h4>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            placeholder="Nombre completo"
            style={{ padding: 8, minWidth: 260 }}
          />
          <input
            value={puesto}
            onChange={(e) => setPuesto(e.target.value)}
            placeholder="Puesto (opcional: presi, vice, tesorero...)"
            style={{ padding: 8, minWidth: 260 }}
          />
          <button
            onClick={crearHermano}
            style={{ padding: "8px 12px", cursor: "pointer" }}
          >
            Crear
          </button>
        </div>

        <ul>
          {hermanos.map((h) => (
            <li key={h.id}>
              <b>#{h.id}</b> — {h.nombreCompleto}{" "}
              {h.puesto ? <span style={{ opacity: 0.8 }}>({h.puesto})</span> : null}
              <span style={{ fontSize: 12, opacity: 0.8 }}>
                {" "}
                —{" "}
                {(h.membresias ?? [])
                  .map((m) => m.agrupacion.nombre)
                  .join(", ") || "sin agrupación"}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Asignar */}
      <section
        style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}
      >
        <h4>Asignar hermano a agrupación</h4>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <select
            value={mHermanoId}
            onChange={(e) => setMHermanoId(Number(e.target.value))}
            style={{ padding: 8, minWidth: 320 }}
          >
            <option value="">-- Hermano --</option>
            {hermanos.map((h) => (
              <option key={h.id} value={h.id}>
                #{h.id} — {h.nombreCompleto}
              </option>
            ))}
          </select>

          <select
            value={mAgrupacionId}
            onChange={(e) => setMAgrupacionId(Number(e.target.value))}
            style={{ padding: 8, minWidth: 280 }}
          >
            <option value="">-- Agrupación --</option>
            {agrupaciones.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre}
              </option>
            ))}
          </select>

          <button
            onClick={asignar}
            style={{ padding: "8px 12px", cursor: "pointer" }}
          >
            Asignar
          </button>
        </div>
      </section>

      {/* Actividades */}
      <section
        style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}
      >
        <h4>Actividades</h4>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={actNombre}
            onChange={(e) => setActNombre(e.target.value)}
            placeholder="Nombre de actividad"
            style={{ padding: 8, minWidth: 260 }}
          />
          <input
            value={actFechaHora}
            onChange={(e) => setActFechaHora(e.target.value)}
            type="datetime-local"
            style={{ padding: 8 }}
          />
          <button
            onClick={crearActividad}
            style={{ padding: "8px 12px", cursor: "pointer" }}
          >
            Crear (abierta)
          </button>
        </div>

        <ul>
          {actividades.map((a) => (
            <li
              key={a.id}
              style={{ display: "flex", gap: 12, alignItems: "center" }}
            >
              <span>
                {a.nombre} — {new Date(a.fechaHora).toLocaleString()}{" "}
                {a.abierta ? "(abierta)" : "(cerrada)"}
              </span>
              {a.abierta && (
                <button
                  onClick={() => cerrarActividad(a.id)}
                  style={{ padding: "4px 8px", cursor: "pointer" }}
                >
                  Cerrar
                </button>
              )}
              <a
                href={`http://localhost:3002/reportes/actividad/${a.id}.pdf`}
                target="_blank"
                rel="noreferrer"
              >
                PDF
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
