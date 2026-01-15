'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Payroll = {
  id: string;
  competencyMonth: number;
  competencyYear: number;
  total: string;
  createdAt: string;
};

export default function ResumoFolhaPage() {
  const [items, setItems] = useState<Payroll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [month, setMonth] = useState('1');
  const [year, setYear] = useState('2025');
  const [total, setTotal] = useState('');
  const [token, setToken] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const storedToken =
        token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
      const res = await fetch(`${API_URL}/finance/payroll`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      });
      if (!res.ok) throw new Error('Falha');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError('Nao foi possivel carregar resumo folha.');
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
      const res = await fetch(`${API_URL}/finance/payroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          competencyMonth: Number(month),
          competencyYear: Number(year),
          total,
        }),
      });
      if (!res.ok) throw new Error('Falha');
      setTotal('');
      await load();
    } catch (err) {
      setError('Nao foi possivel salvar resumo folha.');
    }
  }

  return (
    <section className="panel" style={{ padding: 20, display: 'grid', gap: 16 }}>
      <div className="panel-header">
        <strong>Resumo folha</strong>
      </div>

      <form onSubmit={handleCreate} className="panel-body" style={{ display: 'grid', gap: 12 }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <label style={{ display: 'grid', gap: 6 }}>
            Mes
            <input className="input" type="number" min={1} max={12} value={month} onChange={(e) => setMonth(e.target.value)} />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Ano
            <input className="input" type="number" min={2000} max={2100} value={year} onChange={(e) => setYear(e.target.value)} />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Total
            <input className="input" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="0.00" />
          </label>
        </div>
        <button className="button" type="submit">
          Salvar resumo
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
                <th style={{ paddingBottom: 8 }}>Competencia</th>
                <th style={{ paddingBottom: 8 }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 0' }}>
                    {String(item.competencyMonth).padStart(2, '0')}/{item.competencyYear}
                  </td>
                  <td style={{ padding: '10px 0' }}>{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
