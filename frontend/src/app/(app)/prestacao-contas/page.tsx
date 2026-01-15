'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Report = {
  id: string;
  title: string;
  competencyMonth: number;
  competencyYear: number;
  status: string;
  createdAt: string;
};

export default function PrestacaoContasPage() {
  const [items, setItems] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [competencyMonth, setCompetencyMonth] = useState('');
  const [competencyYear, setCompetencyYear] = useState('');
  const [token, setToken] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const storedToken =
        token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
      const res = await fetch(`${API_URL}/accountability`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      });
      if (!res.ok) {
        throw new Error('Falha ao carregar');
      }
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError('Nao foi possivel carregar prestacoes.');
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
      const month = Number(competencyMonth);
      const year = Number(competencyYear);

      const res = await fetch(`${API_URL}/accountability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title,
          competencyMonth: month,
          competencyYear: year,
        }),
      });

      if (!res.ok) {
        throw new Error('Falha ao salvar');
      }

      setTitle('');
      setCompetencyMonth('');
      setCompetencyYear('');
      await load();
    } catch (err) {
      setError('Nao foi possivel salvar prestacao.');
    }
  }

  return (
    <section className="card" style={{ padding: 22, display: 'grid', gap: 18 }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>
          Prestacao de Contas
        </h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Cadastro basico para testes. Em breve com anexos e workflow.
        </p>
      </div>

      <form onSubmit={handleCreate} style={{ display: 'grid', gap: 12 }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
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
            Mes
            <input
              className="input"
              type="number"
              min={1}
              max={12}
              value={competencyMonth}
              onChange={(event) => setCompetencyMonth(event.target.value)}
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
              onChange={(event) => setCompetencyYear(event.target.value)}
              required
            />
          </label>
        </div>
        <button className="button" type="submit">
          Salvar prestacao
        </button>
      </form>

      {error ? <p style={{ color: 'var(--danger)' }}>{error}</p> : null}

      {loading ? (
        <p className="muted">Carregando...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ paddingBottom: 8 }}>Titulo</th>
                <th style={{ paddingBottom: 8 }}>Competencia</th>
                <th style={{ paddingBottom: 8 }}>Status</th>
                <th style={{ paddingBottom: 8 }}>Criado</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 0' }}>{item.title}</td>
                  <td style={{ padding: '10px 0' }}>
                    {String(item.competencyMonth).padStart(2, '0')}/{item.competencyYear}
                  </td>
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
