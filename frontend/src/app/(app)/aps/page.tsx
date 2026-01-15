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
      await load();
    } catch (err) {
      setError('Nao foi possivel salvar APS.');
    }
  }

  return (
    <section className="card" style={{ padding: 22, display: 'grid', gap: 18 }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>
          APS
        </h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Catalogo padronizado de Atividades e Projetos.
        </p>
      </div>

      <form onSubmit={handleCreate} style={{ display: 'grid', gap: 12 }}>
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
        <button className="button" type="submit">
          Salvar APS
        </button>
      </form>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input
          className="input"
          placeholder="Buscar por titulo"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button className="button secondary" type="button" onClick={load}>
          Buscar
        </button>
      </div>

      {error ? <p style={{ color: 'var(--danger)' }}>{error}</p> : null}

      {loading ? (
        <p className="muted">Carregando...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
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
    </section>
  );
}
