import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import type { Actividad, Hermano } from "../types";

function useDebounce<T>(value: T, ms: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

export default function AsistenciaPage() {
  const [actividad, setActividad] = useState<Actividad | null>(null);
  const [actividades, setActividades] = useState<Actividad[]>([]);

  // buscar por nombre completo
  const [q, setQ] = useState("");
  const qDebounced = useDebounce(q, 250);

  // buscar por id
  const [idInput, setIdInput] = useState("");
  const [hermanoPorId, setHermanoPorId] = useState<Hermano | null>(null);

  const [resultados, setResultados] = useState<Hermano[]>([]);
  const [loading, setLoading] = useState(false);

  const actividadId = actividad?.id;

  useEffect(() => {
    (async () => {
      const [all, abierta] = await Promise.all([
        api.get<Actividad[]>("/actividades"),
        api.get<Actividad | null>("/actividades/abierta"),
      ]);
      setActividades(all.data);
      setActividad(abierta.data ?? all.data[0] ?? null);
    })();
  }, []);

  useEffect(() => {
    if (!qDebounced.trim()) {
      setResultados([]);
      return;
    }
    (async () => {
      setLoading(true);
      try {
        const r = await api.get<Hermano[]>("/hermanos/buscar", {
          params: { q: qDebounced },
        });
        setResultados(r.data);
      } finally {
        setLoading(false);
      }
    })();
  }, [qDebounced]);

  const onMarcar = async (hermanoId: number) => {
    if (!actividadId) return;
    await api.post("/asistencias/marcar", { actividadId, hermanoId });
    alert("Asistencia marcada ✅");
  };

  const buscarPorId = async () => {
    const id = Number(idInput);
    if (!id || id < 1) {
      setHermanoPorId(null);
      return;
    }

    try {
      const r = await api.get<Hermano>(`/hermanos/${id}`);
      setHermanoPorId(r.data);
    } catch {
      setHermanoPorId(null);
      alert("No existe un hermano con ese ID");
    }
  };

  const pdfUrl = useMemo(() => {
    if (!actividadId) return null;
    return `http://localhost:3002/reportes/actividad/${actividadId}.pdf`;
  }, [actividadId]);

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Tomar asistencia</h3>

      <div
        style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}
      >
        <div>
          <div style={{ fontSize: 12, marginBottom: 6 }}>Actividad</div>
          <select
            value={actividad?.id ?? ""}
            onChange={(e) => {
              const id = Number(e.target.value);
              const act = actividades.find((a) => a.id === id) ?? null;
              setActividad(act);
            }}
            style={{ padding: 8, minWidth: 320 }}
          >
            {actividades.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre} — {new Date(a.fechaHora).toLocaleString()}{" "}
                {a.abierta ? "(abierta)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "end", gap: 10 }}>
          {pdfUrl && (
            <a href={pdfUrl} target="_blank" rel="noreferrer">
              Descargar/Ver PDF
            </a>
          )}
        </div>
      </div>

      {/* Marcar por ID */}
      <div
        style={{
          marginBottom: 12,
          border: "1px solid #ddd",
          borderRadius: 10,
          padding: 12,
        }}
      >
        <div style={{ fontSize: 14, marginBottom: 6 }}>
          Marcar asistencia por ID
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            placeholder="ID del hermano (ej: 12)"
            style={{ padding: 10, width: 260, fontSize: 16 }}
          />
          <button
            onClick={buscarPorId}
            style={{ padding: "10px 14px", cursor: "pointer" }}
          >
            Buscar
          </button>

          {hermanoPorId && (
            <button
              onClick={() => onMarcar(hermanoPorId.id)}
              style={{ padding: "10px 14px", cursor: "pointer" }}
            >
              Marcar #{hermanoPorId.id}
            </button>
          )}
        </div>

        {hermanoPorId && (
          <div
            style={{
              marginTop: 10,
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 18 }}>
              #{hermanoPorId.id} — {hermanoPorId.nombreCompleto}{" "}
              {hermanoPorId.puesto ? `(${hermanoPorId.puesto})` : ""}
            </div>
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginTop: 6,
              }}
            >
              {(hermanoPorId.membresias ?? []).map((m, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 14,
                    padding: "2px 8px",
                    borderRadius: 999,
                    border: "1px solid #ccc",
                  }}
                >
                  {m.agrupacion.nombre}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Buscar por nombre completo */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 14, marginBottom: 6 }}>
          Buscar por nombre completo
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Escribe el nombre completo..."
          style={{ padding: 10, width: "100%", fontSize: 16 }}
        />
      </div>

      {loading && <div>Buscando...</div>}

      <div style={{ display: "grid", gap: 10 }}>
        {resultados.map((h) => (
          <div
            key={h.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 12,
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 20 }}>
                #{h.id} — {h.nombreCompleto}{" "}
                {h.puesto ? <span style={{ opacity: 0.8 }}>({h.puesto})</span> : null}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                  marginTop: 6,
                }}
              >
                {(h.membresias ?? []).map((m, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 14,
                      padding: "2px 8px",
                      borderRadius: 999,
                      border: "1px solid #ccc",
                    }}
                  >
                    {m.agrupacion.nombre}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onMarcar(h.id)}
              style={{ padding: "10px 14px", cursor: "pointer" }}
            >
              Marcar asistencia
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
