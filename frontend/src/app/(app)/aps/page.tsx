'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Aps = {
  id: string;
  code: string;
  title: string;
  description: string | null;
  active: boolean;
  createdAt: string;
};

export default function ApsPage() {
  const [items, setItems] = useState<Aps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      const storedToken =
        token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
      const res = await fetch(`${API_URL}/aps?${params.toString()}`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      });
      if (!res.ok) {
        throw new Error('Falha ao carregar');
      }
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError('Nao foi possivel carregar APS.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setToken(window.localStorage.getItem('ip_token'));
    load();
  }, []);

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/aps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          code,
          title,
          description: description || undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Falha ao salvar');
      }

      setCode('');
      setTitle('');
      setDescription('');
      setFormOpen(false);
      await load();
    } catch (err) {
      setError('Nao foi possivel salvar APS.');
    }
  }

  return (
    <section className="ip-page" style={{ display: 'grid', gap: 16 }}>
      <div className="panel panel--flat">
        <div className="panel-header">
          <div className="toolbar ip-toolbar">
            <div style={{ display: 'grid', gap: 6 }}>
              <h1 className="ip-page-title">APS</h1>
              <span className="ip-page-subtitle">Catalogo padronizado de Atividades e Projetos.</span>
            </div>
            <div className="toolbar-actions">
              <button
                className="button"
                type="button"
                onClick={() => {
                  setFormOpen((prev) => !prev);
                  const form = document.getElementById('nova-aps');
                  if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {formOpen ? 'Fechar' : '+ Nova APS'}
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
              <span className="ip-field-label">Titulo</span>
              <input
                className="input"
                placeholder="Buscar por titulo"
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
                  <th style={{ paddingBottom: 8 }}>Codigo</th>
                  <th style={{ paddingBottom: 8 }}>Titulo</th>
                  <th style={{ paddingBottom: 8 }}>Status</th>
                  <th style={{ paddingBottom: 8 }}>Criado</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 0' }}>{item.code}</td>
                    <td style={{ padding: '10px 0' }}>{item.title}</td>
                    <td style={{ padding: '10px 0' }}>{item.active ? 'Ativo' : 'Inativo'}</td>
                    <td style={{ padding: '10px 0' }}>
                      {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {formOpen ? (
        <div className="panel">
          <div className="panel-header">
            <strong>Nova APS</strong>
          </div>
          <form
            id="nova-aps"
            onSubmit={handleCreate}
            className="panel-body"
            style={{ display: 'grid', gap: 12 }}
          >
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              <label style={{ display: 'grid', gap: 6 }}>
                Codigo
                <input
                  className="input"
                  value={code}
                  onChange={(event) => setCode(event.target.value.toUpperCase())}
                  placeholder="APS001"
                  required
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Titulo
                <input
                  className="input"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Descricao
                <input
                  className="input"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </label>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="button" type="submit">
                Salvar APS
              </button>
              <button
                className="button secondary"
                type="button"
                onClick={() => setFormOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );
}
