'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Collaborator = {
  id: string;
  fullName: string;
  cpf: string | null;
  rg: string | null;
  bankAgency: string | null;
  bankAccount: string | null;
  addressFull: string | null;
  status: string;
  createdAt: string;
};

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 9);
  const part4 = digits.slice(9, 11);
  let formatted = part1;

  if (part2) formatted += `.${part2}`;
  if (part3) formatted += `.${part3}`;
  if (part4) formatted += `-${part4}`;

  return formatted;
}

export default function ColaboradoresPage() {
  const [items, setItems] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [month, setMonth] = useState('Janeiro');
  const [year, setYear] = useState('2025');
  const [token, setToken] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const storedToken =
        token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
      const res = await fetch(`${API_URL}/collaborators`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      });
      if (!res.ok) {
        throw new Error('Falha ao carregar');
      }
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError('Nao foi possivel carregar colaboradores.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setToken(window.localStorage.getItem('ip_token'));
    load();
  }, []);

  return (
    <section style={{ display: 'grid', gap: 16 }}>
      <div className="panel">
        <div className="panel-header">
          <div className="toolbar">
            <h1 style={{ fontSize: 20, color: 'var(--primary)' }}>
              Gerenciamento de Colaboradores
            </h1>
            <div className="toolbar-actions">
              <select className="input" value={month} onChange={(e) => setMonth(e.target.value)}>
                {['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho'].map(
                  (value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ),
                )}
              </select>
              <select className="input" value={year} onChange={(e) => setYear(e.target.value)}>
                {['2025', '2024', '2023'].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <button className="button" type="button">
                + Adicionar Colaborador
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 999,
                background: '#eef5f0',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--primary)',
              }}
            >
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
            <strong style={{ color: 'var(--primary)' }}>Filtros de Pesquisa</strong>
          </div>

          <div className="filter-grid">
            {[
              'Cidade',
              'Situacao',
              'Banco',
              'Projeto',
              'Tipo de Contrato',
              'Estabelecimento',
              'Servico',
            ].map((label) => (
              <label key={label} style={{ display: 'grid', gap: 6 }}>
                <span className="pill">{label}</span>
                <select className="input">
                  <option>Todos</option>
                </select>
              </label>
            ))}
            <button className="button" type="button" onClick={load} style={{ alignSelf: 'end' }}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div className="panel">
        {error ? <p style={{ color: 'var(--danger)', padding: 16 }}>{error}</p> : null}

        {loading ? (
          <p className="muted" style={{ padding: 16 }}>
            Carregando...
          </p>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <div>
              <div className="empty-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <path
                    d="M4 20a8 8 0 0 1 16 0"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <strong style={{ color: '#111827' }}>Nenhum colaborador encontrado</strong>
              <p className="pill">
                Ajuste os filtros de pesquisa ou adicione um novo colaborador para comecar
              </p>
            </div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', padding: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th style={{ paddingBottom: 8 }}>Nome</th>
                  <th style={{ paddingBottom: 8 }}>CPF</th>
                  <th style={{ paddingBottom: 8 }}>Status</th>
                  <th style={{ paddingBottom: 8 }}>Criado</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 0' }}>{item.fullName}</td>
                    <td style={{ padding: '10px 0' }}>
                      {item.cpf ? formatCpf(item.cpf) : '-'}
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
      </div>
    </section>
  );
}
