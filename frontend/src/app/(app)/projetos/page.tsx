'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Project = {
  id: string;
  name: string;
  description: string | null;
  status: string;
  createdAt: string;
};

export default function ProjetosPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const storedToken =
        token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      const res = await fetch(`${API_URL}/projects?${params.toString()}`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      });
      if (!res.ok) throw new Error('Falha');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError('Nao foi possivel carregar projetos.');
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
      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name, description: description || undefined }),
      });
      if (!res.ok) throw new Error('Falha');
      setName('');
      setDescription('');
      setEditingId(null);
      await load();
    } catch (err) {
      setError('Nao foi possivel salvar projeto.');
    }
  }

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingId) return;
    setError('');
    try {
      const res = await fetch(`${API_URL}/projects/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name, description: description || undefined }),
      });
      if (!res.ok) throw new Error('Falha');
      setEditingId(null);
      setName('');
      setDescription('');
      await load();
    } catch (err) {
      setError('Nao foi possivel atualizar projeto.');
    }
  }

  async function handleDeactivate(id: string) {
    setError('');
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: 'inactive' }),
      });
      if (!res.ok) throw new Error('Falha');
      await load();
    } catch (err) {
      setError('Nao foi possivel inativar projeto.');
    }
  }

  return (
    <section className="panel" style={{ padding: 20, display: 'grid', gap: 16 }}>
      <div className="panel-header">
        <strong>Projetos</strong>
      </div>

      <form
        onSubmit={editingId ? handleUpdate : handleCreate}
        className="panel-body"
        style={{ display: 'grid', gap: 12 }}
      >
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <label style={{ display: 'grid', gap: 6 }}>
            Nome
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Descricao
            <input
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <button className="button" type="submit">
          {editingId ? 'Atualizar projeto' : 'Salvar projeto'}
        </button>
      </form>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input
          className="input"
          placeholder="Buscar por nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </select>
        <button className="button secondary" type="button" onClick={load}>
          Buscar
        </button>
      </div>

      {error ? <p style={{ color: 'var(--danger)' }}>{error}</p> : null}

      {loading ? (
        <p className="pill">Carregando...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ paddingBottom: 8 }}>Nome</th>
                <th style={{ paddingBottom: 8 }}>Descricao</th>
                <th style={{ paddingBottom: 8 }}>Status</th>
                <th style={{ paddingBottom: 8 }}>Criado</th>
                <th style={{ paddingBottom: 8 }}>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 0' }}>{item.name}</td>
                  <td style={{ padding: '10px 0' }}>{item.description ?? '-'}</td>
                  <td style={{ padding: '10px 0' }}>{item.status}</td>
                  <td style={{ padding: '10px 0' }}>
                    {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td style={{ padding: '10px 0' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="button secondary"
                        type="button"
                        onClick={() => {
                          setEditingId(item.id);
                          setName(item.name);
                          setDescription(item.description ?? '');
                        }}
                      >
                        Editar
                      </button>
                      {item.status === 'active' ? (
                        <button
                          className="button danger"
                          type="button"
                          onClick={() => handleDeactivate(item.id)}
                        >
                          Inativar
                        </button>
                      ) : null}
                    </div>
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
