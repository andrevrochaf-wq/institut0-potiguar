'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Provider = {
  id: string;
  name: string;
  document: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  status: string;
  createdAt: string;
};

export default function FornecedoresPage() {
  const [items, setItems] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [documentFilter, setDocumentFilter] = useState('');

  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
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
      if (documentFilter) params.set('document', documentFilter);
      const res = await fetch(`${API_URL}/providers?${params.toString()}`, {
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
      setAddress('');
      setEditingId(null);
      await load();
    } catch (err) {
      setError('Nao foi possivel salvar fornecedor.');
    }
  }

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingId) return;
    setError('');
    try {
      const res = await fetch(`${API_URL}/providers/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name,
          document: document || undefined,
          phone: phone || undefined,
          email: email || undefined,
          address: address || undefined,
        }),
      });
      if (!res.ok) throw new Error('Falha');
      setEditingId(null);
      setName('');
      setDocument('');
      setPhone('');
      setEmail('');
      setAddress('');
      await load();
    } catch (err) {
      setError('Nao foi possivel atualizar fornecedor.');
    }
  }

  async function handleDeactivate(id: string) {
    setError('');
    try {
      const res = await fetch(`${API_URL}/providers/${id}`, {
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
      setError('Nao foi possivel inativar fornecedor.');
    }
  }

  return (
    <section className="panel" style={{ padding: 20, display: 'grid', gap: 16 }}>
      <div className="panel-header">
        <strong>Fornecedores</strong>
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
          <label style={{ display: 'grid', gap: 6 }}>
            Endereco
            <input className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
        </div>
        <button className="button" type="submit">
          {editingId ? 'Atualizar fornecedor' : 'Salvar fornecedor'}
        </button>
      </form>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input
          className="input"
          placeholder="Buscar por nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="input"
          placeholder="Documento"
          value={documentFilter}
          onChange={(e) => setDocumentFilter(e.target.value)}
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
                <th style={{ paddingBottom: 8 }}>Documento</th>
                <th style={{ paddingBottom: 8 }}>Contato</th>
                <th style={{ paddingBottom: 8 }}>Status</th>
                <th style={{ paddingBottom: 8 }}>Criado</th>
                <th style={{ paddingBottom: 8 }}>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 0' }}>{item.name}</td>
                  <td style={{ padding: '10px 0' }}>{item.document ?? '-'}</td>
                  <td style={{ padding: '10px 0' }}>{item.email ?? item.phone ?? '-'}</td>
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
                          setDocument(item.document ?? '');
                          setPhone(item.phone ?? '');
                          setEmail(item.email ?? '');
                          setAddress(item.address ?? '');
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
