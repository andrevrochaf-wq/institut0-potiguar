'use client';

import { useEffect, useMemo, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Report = {
  id: string;
  title: string;
  cityId: string;
  projectId: string;
  secretariatType: 'education' | 'social_assistance';
  responsibleName: string;
  objectDescription: string | null;
  competencyMonth: number;
  competencyYear: number;
  status: string;
  pdfUrl: string | null;
  createdAt: string;
};

type City = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  name: string;
};

type Aps = {
  id: string;
  code: string;
  title: string;
};

type ApsItem = {
  id: string;
  apsId: string;
  apsCode: string;
  apsTitle: string;
  description: string | null;
  amount: string;
  notes: string | null;
};

const secretariatLabels = {
  education: 'Secretaria de Educacao',
  social_assistance: 'Secretaria de Assistencia Social',
};

function formatCurrency(value: string) {
  const numeric = Number(value.replace(',', '.'));
  return Number.isFinite(numeric)
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numeric)
    : 'R$ 0,00';
}

export default function PrestacaoContasPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [items, setItems] = useState<ApsItem[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [apsCatalog, setApsCatalog] = useState<Aps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [competencyMonth, setCompetencyMonth] = useState('');
  const [competencyYear, setCompetencyYear] = useState('');
  const [cityId, setCityId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [secretariatType, setSecretariatType] = useState<'education' | 'social_assistance'>(
    'education',
  );
  const [responsibleName, setResponsibleName] = useState('');
  const [objectDescription, setObjectDescription] = useState('');

  const [apsId, setApsId] = useState('');
  const [apsAmount, setApsAmount] = useState('');
  const [apsDescription, setApsDescription] = useState('');
  const [apsNotes, setApsNotes] = useState('');

  const selectedReport = useMemo(
    () => reports.find((report) => report.id === selectedId) ?? null,
    [reports, selectedId],
  );

  async function loadBase() {
    const storedToken =
      token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
    const authHeaders = storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined;

    const [reportsRes, citiesRes, projectsRes, apsRes] = await Promise.all([
      fetch(`${API_URL}/accountability`, { headers: authHeaders }),
      fetch(`${API_URL}/cities`, { headers: authHeaders }),
      fetch(`${API_URL}/projects`, { headers: authHeaders }),
      fetch(`${API_URL}/aps`, { headers: authHeaders }),
    ]);

    if (!reportsRes.ok) {
      throw new Error('Falha ao carregar prestacoes');
    }

    const [reportsData, citiesData, projectsData, apsData] = await Promise.all([
      reportsRes.json(),
      citiesRes.ok ? citiesRes.json() : [],
      projectsRes.ok ? projectsRes.json() : [],
      apsRes.ok ? apsRes.json() : [],
    ]);

    setReports(reportsData);
    setCities(citiesData);
    setProjects(projectsData);
    setApsCatalog(apsData);
  }

  async function loadItems(reportId: string) {
    if (!reportId) {
      setItems([]);
      return;
    }
    const storedToken =
      token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
    const res = await fetch(`${API_URL}/accountability/${reportId}/items`, {
      headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
    });
    if (res.ok) {
      setItems(await res.json());
    }
  }

  useEffect(() => {
    setToken(window.localStorage.getItem('ip_token'));
    (async () => {
      try {
        setLoading(true);
        await loadBase();
      } catch (err) {
        setError('Nao foi possivel carregar prestacoes.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    loadItems(selectedId);
  }, [selectedId]);

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    try {
      const storedToken = window.localStorage.getItem('ip_token');
      const res = await fetch(`${API_URL}/accountability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
        },
        body: JSON.stringify({
          title,
          cityId,
          projectId,
          secretariatType,
          responsibleName,
          objectDescription: objectDescription || undefined,
          competencyMonth: Number(competencyMonth),
          competencyYear: Number(competencyYear),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message ?? 'Falha ao salvar');
      }

      const report = await res.json();
      await loadBase();
      setSelectedId(report.id);
      setTitle('');
      setCompetencyMonth('');
      setCompetencyYear('');
      setCityId('');
      setProjectId('');
      setResponsibleName('');
      setObjectDescription('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel salvar prestacao.');
    }
  }

  async function handleUpdate() {
    if (!selectedReport) return;
    setError('');
    try {
      const storedToken = window.localStorage.getItem('ip_token');
      const res = await fetch(`${API_URL}/accountability/${selectedReport.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
        },
        body: JSON.stringify({
          objectDescription: objectDescription || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message ?? 'Falha ao atualizar');
      }
      await loadBase();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel atualizar prestacao.');
    }
  }

  async function handleAddItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedReport) return;
    setError('');
    try {
      const storedToken = window.localStorage.getItem('ip_token');
      const res = await fetch(`${API_URL}/accountability/${selectedReport.id}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(storedToken ? { Authorization: `Bearer ${storedToken}` } : {}),
        },
        body: JSON.stringify({
          apsId,
          amount: apsAmount.replace(',', '.'),
          description: apsDescription || undefined,
          notes: apsNotes || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message ?? 'Falha ao adicionar APS');
      }

      setApsId('');
      setApsAmount('');
      setApsDescription('');
      setApsNotes('');
      await loadItems(selectedReport.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel adicionar APS.');
    }
  }

  async function handleRemoveItem(itemId: string) {
    if (!selectedReport) return;
    const storedToken = window.localStorage.getItem('ip_token');
    await fetch(`${API_URL}/accountability/${selectedReport.id}/items/${itemId}`, {
      method: 'DELETE',
      headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
    });
    await loadItems(selectedReport.id);
  }

  async function handleStatus(action: 'submit' | 'approve' | 'close' | 'pdf') {
    if (!selectedReport) return;
    setError('');
    try {
      const storedToken = window.localStorage.getItem('ip_token');
      const res = await fetch(`${API_URL}/accountability/${selectedReport.id}/${action}`, {
        method: 'POST',
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message ?? 'Falha ao atualizar status');
      }
      await loadBase();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel atualizar status.');
    }
  }

  return (
    <section className="card" style={{ padding: 22, display: 'grid', gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>
          Prestacao de Contas
        </h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Fluxo completo com capa, descricao do objeto, APS e revisao.
        </p>
      </div>

      {error ? <p style={{ color: 'var(--danger)' }}>{error}</p> : null}

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        <div className="card" style={{ padding: 16 }}>
          <strong>Capa e Identificacao</strong>
          <form onSubmit={handleCreate} style={{ display: 'grid', gap: 12, marginTop: 12 }}>
            <label style={{ display: 'grid', gap: 6 }}>
              Titulo
              <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              Secretaria
              <select
                className="input"
                value={secretariatType}
                onChange={(e) => setSecretariatType(e.target.value as 'education' | 'social_assistance')}
              >
                <option value="education">Secretaria de Educacao</option>
                <option value="social_assistance">Secretaria de Assistencia Social</option>
              </select>
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              Cidade
              <select className="input" value={cityId} onChange={(e) => setCityId(e.target.value)} required>
                <option value="">Selecione</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              Projeto
              <select className="input" value={projectId} onChange={(e) => setProjectId(e.target.value)} required>
                <option value="">Selecione</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              Responsavel
              <input className="input" value={responsibleName} onChange={(e) => setResponsibleName(e.target.value)} required />
            </label>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(120px, 1fr))', gap: 8 }}>
              <label style={{ display: 'grid', gap: 6 }}>
                Mes
                <input
                  className="input"
                  type="number"
                  min={1}
                  max={12}
                  value={competencyMonth}
                  onChange={(e) => setCompetencyMonth(e.target.value)}
                  required
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Ano
                <input
                  className="input"
                  type="number"
                  min={2000}
                  max={2100}
                  value={competencyYear}
                  onChange={(e) => setCompetencyYear(e.target.value)}
                  required
                />
              </label>
            </div>
            <button className="button" type="submit">
              Criar prestacao
            </button>
          </form>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <strong>Prestacoes</strong>
          {loading ? (
            <p className="muted" style={{ marginTop: 10 }}>Carregando...</p>
          ) : (
            <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>
              {reports.map((report) => (
                <button
                  key={report.id}
                  type="button"
                  className="pill"
                  style={{
                    textAlign: 'left',
                    background: report.id === selectedId ? 'var(--primary)' : 'var(--soft)',
                    color: report.id === selectedId ? '#fff' : 'inherit',
                  }}
                  onClick={() => {
                    setSelectedId(report.id);
                    setObjectDescription(report.objectDescription ?? '');
                  }}
                >
                  {report.title} ({report.competencyMonth}/{report.competencyYear})
                </button>
              ))}
              {reports.length === 0 ? <span className="muted">Nenhuma prestacao criada.</span> : null}
            </div>
          )}
        </div>
      </div>

      {selectedReport ? (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <strong>Descricao do Objeto</strong>
            <textarea
              className="input"
              rows={6}
              value={objectDescription}
              onChange={(e) => setObjectDescription(e.target.value)}
              style={{ marginTop: 10 }}
            />
            <button className="button secondary" style={{ marginTop: 10 }} onClick={handleUpdate} type="button">
              Salvar descricao
            </button>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <strong>Listagem das APS</strong>
            <form onSubmit={handleAddItem} style={{ display: 'grid', gap: 10, marginTop: 10 }}>
              <label style={{ display: 'grid', gap: 6 }}>
                APS
                <select className="input" value={apsId} onChange={(e) => setApsId(e.target.value)} required>
                  <option value="">Selecione</option>
                  {apsCatalog.map((aps) => (
                    <option key={aps.id} value={aps.id}>
                      {aps.code} - {aps.title}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Valor
                <input
                  className="input"
                  value={apsAmount}
                  onChange={(e) => setApsAmount(e.target.value)}
                  placeholder="0,00"
                  required
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Descricao
                <input className="input" value={apsDescription} onChange={(e) => setApsDescription(e.target.value)} />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Observacoes
                <input className="input" value={apsNotes} onChange={(e) => setApsNotes(e.target.value)} />
              </label>
              <button className="button" type="submit">
                Adicionar APS
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {selectedReport ? (
        <div className="card" style={{ padding: 16 }}>
          <strong>APS cadastradas</strong>
          <div style={{ marginTop: 10, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th style={{ paddingBottom: 8 }}>APS</th>
                  <th style={{ paddingBottom: 8 }}>Descricao</th>
                  <th style={{ paddingBottom: 8 }}>Valor</th>
                  <th style={{ paddingBottom: 8 }}>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 0' }}>{item.apsCode} - {item.apsTitle}</td>
                    <td style={{ padding: '10px 0' }}>{item.description ?? '-'}</td>
                    <td style={{ padding: '10px 0' }}>{formatCurrency(item.amount)}</td>
                    <td style={{ padding: '10px 0' }}>
                      <button className="button secondary" type="button" onClick={() => handleRemoveItem(item.id)}>
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: '10px 0' }} className="muted">
                      Nenhuma APS adicionada.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {selectedReport ? (
        <div className="card" style={{ padding: 16 }}>
          <strong>Revisao e Geracao de PDF</strong>
          <div style={{ display: 'grid', gap: 8, marginTop: 10 }}>
            <div className="pill">Status atual: {selectedReport.status}</div>
            <div className="pill">
              Secretaria: {secretariatLabels[selectedReport.secretariatType]}
            </div>
            <div className="pill">Responsavel: {selectedReport.responsibleName}</div>
            <div className="pill">
              Competencia: {String(selectedReport.competencyMonth).padStart(2, '0')}/{selectedReport.competencyYear}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="button secondary" type="button" onClick={() => handleStatus('submit')}>
                Enviar para revisao
              </button>
              <button className="button" type="button" onClick={() => handleStatus('approve')}>
                Aprovar
              </button>
              <button className="button secondary" type="button" onClick={() => handleStatus('close')}>
                Fechar
              </button>
              <button className="button" type="button" onClick={() => handleStatus('pdf')}>
                Gerar PDF
              </button>
            </div>
            {selectedReport.pdfUrl ? (
              <div className="pill">PDF gerado: {selectedReport.pdfUrl}</div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
