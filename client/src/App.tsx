import React, { useEffect, useState } from "react";
import { getPlayers, getTeams, getStaff, createPlayer, deletePlayer } from "./api";

function App() {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [teamId, setTeamId] = useState("");
  
  // Estados para el formulario
  const [newName, setNewName] = useState("");
  const [newPos, setNewPos] = useState("");
  const [newScore, setNewScore] = useState(80);

  const loadData = async () => {
    try {
      const [p, t] = await Promise.all([getPlayers(), getTeams()]);
      setPlayers(p.data);
      setTeams(t.data);
      if (t.data.length > 0 && !teamId) setTeamId(t.data[0].id.toString());
    } catch (err) { console.error("Error:", err); }
  };

  useEffect(() => { loadData(); }, []);

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    if (!teamId) return alert("Selecciona un equipo primero");
    await createPlayer({ 
        name: newName, 
        position: newPos, 
        performanceScore: Number(newScore), 
        teamId: Number(teamId) 
    });
    setNewName(""); setNewPos(""); 
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Dar de baja a este atleta?")) {
      await deletePlayer(id);
      loadData();
    }
  };

  const filteredPlayers = players.filter(p => p.teamId === Number(teamId));

  return (
    <div style={{ background: "#f4f7f6", minHeight: "100vh" }}>
      <nav className="navbar navbar-dark bg-primary shadow-sm mb-4">
        <div className="container">
          <span className="navbar-brand fw-bold">WILSTERMANN <span className="fw-light">PerformanceHub</span></span>
          <span className="badge bg-light text-primary">v2.0 PRO</span>
        </div>
      </nav>

      <div className="container">
        <div className="row g-4">
          {/* Panel Izquierdo: Formulario de Registro */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Registro de Atleta</h5>
                <form onSubmit={handleAddPlayer}>
                  <div className="mb-2">
                    <label className="small fw-bold">Nombre Completo</label>
                    <input className="form-control" value={newName} onChange={e => setNewName(e.target.value)} required />
                  </div>
                  <div className="mb-2">
                    <label className="small fw-bold">Posición Campo</label>
                    <input className="form-control" placeholder="Ej: Mediocentro" value={newPos} onChange={e => setNewPos(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <label className="small fw-bold">Rendimiento Inicial ({newScore}%)</label>
                    <input type="range" className="form-range" min="0" max="100" value={newScore} onChange={e => setNewScore(e.target.value)} />
                  </div>
                  <button className="btn btn-primary w-100 fw-bold">INSCRIBIR ATLETA</button>
                </form>
              </div>
            </div>
          </div>

          {/* Panel Derecho: Monitor de Rendimiento */}
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <select className="form-select w-50 fw-bold border-primary" value={teamId} onChange={e => setTeamId(e.target.value)}>
                {teams.map(t => <option key={t.id} value={t.id}>{t.name} - {t.city}</option>)}
              </select>
              <div className="text-muted small">Mostrando {filteredPlayers.length} atletas</div>
            </div>

            <div className="card border-0 shadow-sm rounded-3">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="border-0">Atleta</th>
                      <th className="border-0">Rendimiento Físico</th>
                      <th className="border-0 text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPlayers.map(p => (
                      <tr key={p.id}>
                        <td>
                          <div className="fw-bold">{p.name}</div>
                          <div className="text-muted small">{p.position}</div>
                        </td>
                        <td style={{ width: "40%" }}>
                          <div className="d-flex align-items-center">
                            <div className="progress flex-grow-1 me-2" style={{ height: "10px" }}>
                              <div 
                                className={`progress-bar ${p.performanceScore > 85 ? 'bg-success' : p.performanceScore > 65 ? 'bg-info' : 'bg-danger'}`} 
                                style={{ width: `${p.performanceScore}%` }}
                              ></div>
                            </div>
                            <span className="small fw-bold">{p.performanceScore}%</span>
                          </div>
                        </td>
                        <td className="text-end">
                          <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-outline-danger border-0">
                             Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredPlayers.length === 0 && (
                  <div className="text-center py-5 text-muted">No hay datos para este equipo.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
