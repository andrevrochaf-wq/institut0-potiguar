'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Establishment = {
  id: string;
  name: string;
  inepCode: string | null;
  cityId: string | null;
  status: string;
  totalStudents: number;
  totalClasses: number;
  createdAt: string;
};

type City = {
  id: string;
  name: string;
  state: string;
};

type Stage = {
  id: string;
  establishmentId: string;
  name: string;
};

type ClassItem = {
  id: string;
  name: string;
  shift: string;
  students: number;
  active: boolean;
};

export default function EstabelecimentosPage() {
  const [items, setItems] = useState<Establishment[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [name, setName] = useState('');
  const [inepCode, setInepCode] = useState('');
  const [cityId, setCityId] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const [selectedId, setSelectedId] = useState('');
  const [stages, setStages] = useState<Stage[]>([]);
  const [classesByStage, setClassesByStage] = useState<Record<string, ClassItem[]>>({});
  const [stageName, setStageName] = useState('');
  const [stageLoading, setStageLoading] = useState(false);

  const [classForms, setClassForms] = useState<
    Record<string, { name: string; shift: string; students: string; active: boolean }>
  >({});

  function authHeaders() {
    return token ? { Authorization: `Bearer ${token}` } : undefined;
  }

  async function load() {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      const storedToken =
        token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
      const headers = storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined;
      const [establishmentsRes, citiesRes] = await Promise.all([
        fetch(`${API_URL}/establishments?${params.toString()}`, { headers }),
        fetch(`${API_URL}/cities`, { headers }),
      ]);
      if (!establishmentsRes.ok || !citiesRes.ok) {
        throw new Error('Falha ao carregar');
      }
      const data = await establishmentsRes.json();
      const citiesData = await citiesRes.json();
      setItems(data);
      setCities(citiesData);
    } catch (err) {
      setError('Nao foi possivel carregar estabelecimentos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setToken(window.localStorage.getItem('ip_token'));
    load();
  }, []);

  async function loadStages(establishmentId: string) {
    setStageLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/establishments/${establishmentId}/stages`, {
        headers: authHeaders(),
      });
      if (!res.ok) {
        throw new Error('Falha ao carregar');
      }
      const data = await res.json();
      setStages(data);
      const stageIds = data.map((stage: Stage) => stage.id);
      const classesEntries = await Promise.all(
        stageIds.map(async (stageId: string) => {
          const classesRes = await fetch(
            `${API_URL}/establishments/${establishmentId}/stages/${stageId}/classes`,
            { headers: authHeaders() },
          );
          if (!classesRes.ok) {
            return [stageId, []] as const;
          }
          const classesData = await classesRes.json();
          return [stageId, classesData] as const;
        }),
      );
      const nextClasses: Record<string, ClassItem[]> = {};
      classesEntries.forEach(([stageId, classes]) => {
        nextClasses[stageId] = classes;
      });
      setClassesByStage(nextClasses);
    } catch (err) {
      setError('Nao foi possivel carregar etapas.');
    } finally {
      setStageLoading(false);
    }
  }

  async function handleSelectEstablishment(id: string) {
    setSelectedId(id);
    setStages([]);
    setClassesByStage({});
    setStageName('');
    if (id) {
      await loadStages(id);
    }
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/establishments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name,
          inepCode: inepCode || undefined,
          cityId: cityId || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Falha ao salvar');
      }

      setName('');
      setInepCode('');
      setCityId('');
      setFormOpen(false);
      await load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Nao foi possivel salvar estabelecimento.',
      );
    }
  }

  async function handleCreateStage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedId) return;
    setError('');
    try {
      const res = await fetch(`${API_URL}/establishments/${selectedId}/stages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name: stageName }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Falha ao salvar etapa');
      }
      setStageName('');
      await loadStages(selectedId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel salvar etapa.');
    }
  }

  function updateClassForm(stageId: string, updates: Partial<{
    name: string;
    shift: string;
    students: string;
    active: boolean;
  }>) {
    setClassForms((prev) => ({
      ...prev,
      [stageId]: {
        ...prev[stageId],
        name: prev[stageId]?.name ?? '',
        shift: prev[stageId]?.shift ?? 'Matutino',
        students: prev[stageId]?.students ?? '',
        active: prev[stageId]?.active ?? true,
        ...updates,
      },
    }));
  }

  async function handleCreateClass(stageId: string) {
    if (!selectedId) return;
    setError('');
    const form = classForms[stageId] ?? { name: '', shift: 'Matutino', students: '', active: true };
    try {
      const res = await fetch(
        `${API_URL}/establishments/${selectedId}/stages/${stageId}/classes`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            name: form.name,
            shift: form.shift,
            students: form.students,
            active: form.active,
          }),
        },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Falha ao salvar turma');
      }
      updateClassForm(stageId, { name: '', students: '' });
      await loadStages(selectedId);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel salvar turma.');
    }
  }

  async function handleDeleteClass(classId: string) {
    if (!selectedId) return;
    setError('');
    try {
      const res = await fetch(`${API_URL}/establishments/classes/${classId}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Falha ao remover turma');
      }
      await loadStages(selectedId);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel remover turma.');
    }
  }

  return (
    <section className="ip-page" style={{ display: 'grid', gap: 16 }}>
      <div className="panel panel--flat">
        <div className="panel-header">
          <div className="toolbar ip-toolbar">
            <div style={{ display: 'grid', gap: 6 }}>
              <h1 className="ip-page-title">Estabelecimentos</h1>
              <span className="ip-page-subtitle">
                Cadastro completo com etapas, turmas e totais automaticos.
              </span>
            </div>
            <div className="toolbar-actions">
              <button
                className="button"
                type="button"
                onClick={() => {
                  setFormOpen((prev) => !prev);
                  const form = document.getElementById('novo-estabelecimento');
                  if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {formOpen ? 'Fechar' : '+ Novo Estabelecimento'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="panel panel--tint">
        <div className="panel-body">
          <div className="ip-section-title">
            <div className="ip-section-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M11 19a8 8 0 1 1 5.292-14.04L20 8.668"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.2 16.2L20 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <strong>Filtros de Pesquisa</strong>
          </div>
          <div className="filter-grid ip-filter-grid">
            <label className="ip-field">
              <span className="ip-field-label">Nome</span>
              <input
                className="input"
                placeholder="Buscar por nome"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <button className="button ip-filter-button" type="button" onClick={load}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div className="panel">
        {error ? <p style={{ color: 'var(--danger)', padding: 16 }}>{error}</p> : null}

        {loading ? (
          <p className="pill" style={{ padding: 16 }}>
            Carregando...
          </p>
        ) : (
          <div style={{ overflowX: 'auto', padding: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th style={{ paddingBottom: 8 }}>Nome</th>
                  <th style={{ paddingBottom: 8 }}>INEP</th>
                  <th style={{ paddingBottom: 8 }}>Cidade</th>
                  <th style={{ paddingBottom: 8 }}>Turmas</th>
                  <th style={{ paddingBottom: 8 }}>Alunos</th>
                  <th style={{ paddingBottom: 8 }}>Status</th>
                  <th style={{ paddingBottom: 8 }}>Criado</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const city = cities.find((entry) => entry.id === item.cityId);
                  return (
                    <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 0' }}>{item.name}</td>
                      <td style={{ padding: '10px 0' }}>{item.inepCode ?? '-'}</td>
                      <td style={{ padding: '10px 0' }}>
                        {city ? `${city.name} / ${city.state}` : '-'}
                      </td>
                      <td style={{ padding: '10px 0' }}>{item.totalClasses ?? 0}</td>
                      <td style={{ padding: '10px 0' }}>{item.totalStudents ?? 0}</td>
                      <td style={{ padding: '10px 0' }}>{item.status}</td>
                      <td style={{ padding: '10px 0' }}>
                        {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {formOpen ? (
        <div className="panel">
          <div className="panel-header">
            <strong>Novo estabelecimento</strong>
          </div>
          <form
            id="novo-estabelecimento"
            onSubmit={handleCreate}
            className="panel-body"
            style={{ display: 'grid', gap: 12 }}
          >
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              <label style={{ display: 'grid', gap: 6 }}>
                Nome do estabelecimento
                <input
                  className="input"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Codigo INEP
                <input
                  className="input"
                  value={inepCode}
                  onChange={(event) => setInepCode(event.target.value)}
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Cidade
                <select
                  className="input"
                  value={cityId}
                  onChange={(event) => setCityId(event.target.value)}
                >
                  <option value="">Selecione</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name} / {city.state}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="button" type="submit">
                Salvar estabelecimento
              </button>
              <button className="button secondary" type="button" onClick={() => setFormOpen(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <section className="panel">
        <div className="panel-header">
          <div style={{ display: 'grid', gap: 6 }}>
            <strong>Etapas e Turmas</strong>
            <span className="ip-page-subtitle">Cadastre categorias/etapas e as turmas por turno.</span>
          </div>
        </div>
        <div className="panel-body" style={{ display: 'grid', gap: 16 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20 }}>
            Etapas e Turmas
          </h2>
          <p className="muted" style={{ marginTop: 6 }}>
            Cadastre categorias/etapas e as turmas por turno.
          </p>
        </div>

          <label style={{ display: 'grid', gap: 6, maxWidth: 360 }}>
            Estabelecimento
            <select
              className="input"
              value={selectedId}
              onChange={(event) => handleSelectEstablishment(event.target.value)}
            >
              <option value="">Selecione</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

        {selectedId ? (
          <>
            <form onSubmit={handleCreateStage} style={{ display: 'grid', gap: 8, maxWidth: 420 }}>
              <label style={{ display: 'grid', gap: 6 }}>
                Nova etapa/categoria
                <input
                  className="input"
                  value={stageName}
                  onChange={(event) => setStageName(event.target.value)}
                  placeholder="Ex.: Educacao Infantil"
                  required
                />
              </label>
              <button className="button secondary" type="submit" disabled={stageLoading}>
                Adicionar etapa
              </button>
            </form>

            {stageLoading ? (
              <p className="muted">Carregando etapas...</p>
            ) : stages.length === 0 ? (
              <p className="muted">Nenhuma etapa cadastrada ainda.</p>
            ) : (
              <div style={{ display: 'grid', gap: 16 }}>
                {stages.map((stage) => {
                  const classes = classesByStage[stage.id] ?? [];
                  const form = classForms[stage.id] ?? {
                    name: '',
                    shift: 'Manha',
                    students: '',
                    active: true,
                  };
                  return (
                    <div key={stage.id} className="card" style={{ padding: 16 }}>
                      <h3 style={{ marginBottom: 8 }}>{stage.name}</h3>
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                          gap: 10,
                          marginBottom: 12,
                        }}
                      >
                        <input
                          className="input"
                          placeholder="Turma"
                          value={form.name}
                          onChange={(event) =>
                            updateClassForm(stage.id, { name: event.target.value })
                          }
                        />
                        <select
                          className="input"
                          value={form.shift}
                          onChange={(event) =>
                            updateClassForm(stage.id, { shift: event.target.value })
                          }
                        >
                          <option value="Matutino">Matutino</option>
                          <option value="Vespertino">Vespertino</option>
                          <option value="Noturno">Noturno</option>
                        </select>
                        <input
                          className="input"
                          placeholder="Alunos"
                          value={form.students}
                          onChange={(event) =>
                            updateClassForm(stage.id, { students: event.target.value })
                          }
                        />
                        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <input
                            type="checkbox"
                            checked={form.active}
                            onChange={(event) =>
                              updateClassForm(stage.id, { active: event.target.checked })
                            }
                          />
                          Ativa
                        </label>
                        <button
                          className="button"
                          type="button"
                          onClick={() => handleCreateClass(stage.id)}
                        >
                          Adicionar turma
                        </button>
                      </div>

                      {classes.length === 0 ? (
                        <p className="muted">Sem turmas nesta etapa.</p>
                      ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ textAlign: 'left' }}>
                              <th style={{ paddingBottom: 6 }}>Turma</th>
                              <th style={{ paddingBottom: 6 }}>Turno</th>
                              <th style={{ paddingBottom: 6 }}>Alunos</th>
                              <th style={{ paddingBottom: 6 }}>Ativa</th>
                              <th style={{ paddingBottom: 6 }}>Acoes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {classes.map((classItem) => (
                              <tr key={classItem.id} style={{ borderTop: '1px solid var(--border)' }}>
                                <td style={{ padding: '8px 0' }}>{classItem.name}</td>
                                <td style={{ padding: '8px 0' }}>{classItem.shift}</td>
                                <td style={{ padding: '8px 0' }}>{classItem.students}</td>
                                <td style={{ padding: '8px 0' }}>
                                  {classItem.active ? 'Sim' : 'Nao'}
                                </td>
                                <td style={{ padding: '8px 0' }}>
                                  <button
                                    className="button danger"
                                    type="button"
                                    onClick={() => handleDeleteClass(classItem.id)}
                                  >
                                    Remover
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
          ) : (
            <p className="muted">Selecione um estabelecimento para gerenciar etapas.</p>
          )}
        </div>
      </section>
    </section>
  );
}
