'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Expense = {
  id: string;
  title: string;
  amount: string;
  competencyMonth: number;
  competencyYear: number;
};

export default function DespesasIndiretasPage() {
  const [items, setItems] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('1');
  const [year, setYear] = useState('2025');
  const [token, setToken] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const storedToken =
        token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
      const res = await fetch(`${API_URL}/finance/expenses`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      });
      if (!res.ok) throw new Error('Falha');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError('Nao foi possivel carregar despesas.');
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
      const res = await fetch(`${API_URL}/finance/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title,
          amount,
          competencyMonth: Number(month),
          competencyYear: Number(year),
        }),
      });
      if (!res.ok) throw new Error('Falha');
      setTitle('');
      setAmount('');
      await load();
    } catch (err) {
      setError('Nao foi possivel salvar despesa.');
    }
  }

  return (
    <section className="panel" style={{ padding: 20, display: 'grid', gap: 16 }}>
      <div className="panel-header">
        <strong>Despesas Indiretas</strong>
      </div>

      <form onSubmit={handleCreate} className="panel-body" style={{ display: 'grid', gap: 12 }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <label style={{ display: 'grid', gap: 6 }}>
            Titulo
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Valor
            <input className="input" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Mes
            <input className="input" type="number" min={1} max={12} value={month} onChange={(e) => setMonth(e.target.value)} />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Ano
            <input className="input" type="number" min={2000} max={2100} value={year} onChange={(e) => setYear(e.target.value)} />
          </label>
        </div>
        <button className="button" type="submit">
          Salvar despesa
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
                <th style={{ paddingBottom: 8 }}>Titulo</th>
                <th style={{ paddingBottom: 8 }}>Competencia</th>
                <th style={{ paddingBottom: 8 }}>Valor</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 0' }}>{item.title}</td>
                  <td style={{ padding: '10px 0' }}>
                    {String(item.competencyMonth).padStart(2, '0')}/{item.competencyYear}
                  </td>
                  <td style={{ padding: '10px 0' }}>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
