'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Provider = {
  id: string;
  name: string;
  document: string | null;
  phone: string | null;
  email: string | null;
  createdAt: string;
};

export default function FornecedoresPage() {
  const [items, setItems] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const storedToken =
        token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
      const res = await fetch(`${API_URL}/providers`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      });
      if (!res.ok) throw new Error('Falha');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError('Nao foi possivel carregar fornecedores.');
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
      const res = await fetch(`${API_URL}/providers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name,
          document: document || undefined,
          phone: phone || undefined,
          email: email || undefined,
        }),
      });
      if (!res.ok) throw new Error('Falha');
      setName('');
      setDocument('');
      setPhone('');
      setEmail('');
      await load();
    } catch (err) {
      setError('Nao foi possivel salvar fornecedor.');
    }
  }

  return (
    <section className="panel" style={{ padding: 20, display: 'grid', gap: 16 }}>
      <div className="panel-header">
        <strong>Fornecedores</strong>
      </div>

      <form onSubmit={handleCreate} className="panel-body" style={{ display: 'grid', gap: 12 }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <label style={{ display: 'grid', gap: 6 }}>
            Nome
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Documento
            <input className="input" value={document} onChange={(e) => setDocument(e.target.value)} />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Telefone
            <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Email
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <button className="button" type="submit">
          Salvar fornecedor
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
                <th style={{ paddingBottom: 8 }}>Documento</th>
                <th style={{ paddingBottom: 8 }}>Contato</th>
                <th style={{ paddingBottom: 8 }}>Criado</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 0' }}>{item.name}</td>
                  <td style={{ padding: '10px 0' }}>{item.document ?? '-'}</td>
                  <td style={{ padding: '10px 0' }}>{item.email ?? item.phone ?? '-'}</td>
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
