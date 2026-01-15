'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Establishment = {
  id: string;
  name: string;
  inepCode: string | null;
  cityId: string | null;
  status: string;
  createdAt: string;
};

export default function EstabelecimentosPage() {
  const [items, setItems] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const [name, setName] = useState('');
  const [inepCode, setInepCode] = useState('');
  const [cityId, setCityId] = useState('');
  const [token, setToken] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      const storedToken =
        token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
      const res = await fetch(`${API_URL}/establishments?${params.toString()}`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      });
      if (!res.ok) {
        throw new Error('Falha ao carregar');
      }
      const data = await res.json();
      setItems(data);
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
        throw new Error('Falha ao salvar');
      }

      setName('');
      setInepCode('');
      setCityId('');
      await load();
    } catch (err) {
      setError('Nao foi possivel salvar estabelecimento.');
    }
  }

  return (
    <section className="card" style={{ padding: 22, display: 'grid', gap: 18 }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>
          Estabelecimentos
        </h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Cadastro rapido para teste do modulo. Em breve com estrutura de turmas.
        </p>
      </div>

      <form onSubmit={handleCreate} style={{ display: 'grid', gap: 12 }}>
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
            City ID (UUID)
            <input
              className="input"
              value={cityId}
              onChange={(event) => setCityId(event.target.value)}
            />
          </label>
        </div>
        <button className="button" type="submit">
          Salvar estabelecimento
        </button>
      </form>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input
          className="input"
          placeholder="Buscar por nome"
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
                <th style={{ paddingBottom: 8 }}>Nome</th>
                <th style={{ paddingBottom: 8 }}>INEP</th>
                <th style={{ paddingBottom: 8 }}>Status</th>
                <th style={{ paddingBottom: 8 }}>Criado</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 0' }}>{item.name}</td>
                  <td style={{ padding: '10px 0' }}>{item.inepCode ?? '-'}</td>
                  <td style={{ padding: '10px 0' }}>{item.status}</td>
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
