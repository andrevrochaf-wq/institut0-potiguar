'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type User = {
  id: string;
  fullName: string;
  email: string;
  active: boolean;
  createdAt: string;
};

export default function UsuariosPage() {
  const [items, setItems] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const storedToken =
        token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
      const res = await fetch(`${API_URL}/users`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      });
      if (!res.ok) throw new Error('Falha');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError('Nao foi possivel carregar usuarios.');
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
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ fullName, email, password, primaryRole: 'ADMIN' }),
      });
      if (!res.ok) throw new Error('Falha');
      setFullName('');
      setEmail('');
      setPassword('');
      await load();
    } catch (err) {
      setError('Nao foi possivel salvar usuario.');
    }
  }

  return (
    <section className="panel" style={{ padding: 20, display: 'grid', gap: 16 }}>
      <div className="panel-header">
        <strong>Usuarios</strong>
      </div>

      <form onSubmit={handleCreate} className="panel-body" style={{ display: 'grid', gap: 12 }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <label style={{ display: 'grid', gap: 6 }}>
            Nome
            <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Email
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Senha
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
        </div>
        <button className="button" type="submit">
          Salvar usuario
        </button>
      </form>

      {error ? <p style={{ color: 'var(--danger)' }}>{error}</p> : null}

      {loading ? (
        <p className="pill">Carregando...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ paddingBottom: 8 }}>Nome</th>
                <th style={{ paddingBottom: 8 }}>Email</th>
                <th style={{ paddingBottom: 8 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 0' }}>{item.fullName}</td>
                  <td style={{ padding: '10px 0' }}>{item.email}</td>
                  <td style={{ padding: '10px 0' }}>{item.active ? 'Ativo' : 'Inativo'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
