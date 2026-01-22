'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Entry = {
  id: string;
  title: string;
  description: string | null;
  eventDate: string;
  startTime: string | null;
  endTime: string | null;
  location: string | null;
  status: string;
  createdAt: string;
};

export default function AgendaPage() {
  const [items, setItems] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
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
      if (dateFrom) params.set('dateFrom', dateFrom);
      if (dateTo) params.set('dateTo', dateTo);
      const res = await fetch(`${API_URL}/agenda?${params.toString()}`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      });
      if (!res.ok) throw new Error('Falha');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError('Nao foi possivel carregar agenda.');
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
      const res = await fetch(`${API_URL}/agenda`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title,
          description: description || undefined,
          eventDate,
          startTime: startTime || undefined,
          endTime: endTime || undefined,
          location: location || undefined,
        }),
      });
      if (!res.ok) throw new Error('Falha');
      setTitle('');
      setDescription('');
      setEventDate('');
      setStartTime('');
      setEndTime('');
      setLocation('');
      setEditingId(null);
      await load();
    } catch (err) {
      setError('Nao foi possivel salvar agenda.');
    }
  }

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingId) return;
    setError('');
    try {
      const res = await fetch(`${API_URL}/agenda/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title,
          description: description || undefined,
          eventDate,
          startTime: startTime || undefined,
          endTime: endTime || undefined,
          location: location || undefined,
        }),
      });
      if (!res.ok) throw new Error('Falha');
      setEditingId(null);
      setTitle('');
      setDescription('');
      setEventDate('');
      setStartTime('');
      setEndTime('');
      setLocation('');
      await load();
    } catch (err) {
      setError('Nao foi possivel atualizar agenda.');
    }
  }

  async function handleDeactivate(id: string) {
    setError('');
    try {
      const res = await fetch(`${API_URL}/agenda/${id}`, {
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
      setError('Nao foi possivel inativar agenda.');
    }
  }

  return (
    <section className="panel" style={{ padding: 20, display: 'grid', gap: 16 }}>
      <div className="panel-header">
        <strong>Agenda</strong>
      </div>

      <form
        onSubmit={editingId ? handleUpdate : handleCreate}
        className="panel-body"
        style={{ display: 'grid', gap: 12 }}
      >
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <label style={{ display: 'grid', gap: 6 }}>
            Titulo
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Data
            <input className="input" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Inicio
            <input className="input" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Fim
            <input className="input" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Local
            <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} />
          </label>
        </div>
        <label style={{ display: 'grid', gap: 6 }}>
          Descricao
          <input className="input" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <button className="button" type="submit">
          {editingId ? 'Atualizar evento' : 'Salvar evento'}
        </button>
      </form>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input
          className="input"
          placeholder="Buscar por titulo"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="input"
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <input
          className="input"
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
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
                <th style={{ paddingBottom: 8 }}>Titulo</th>
                <th style={{ paddingBottom: 8 }}>Data</th>
                <th style={{ paddingBottom: 8 }}>Horario</th>
                <th style={{ paddingBottom: 8 }}>Local</th>
                <th style={{ paddingBottom: 8 }}>Status</th>
                <th style={{ paddingBottom: 8 }}>Acoes</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 0' }}>{item.title}</td>
                  <td style={{ padding: '10px 0' }}>{item.eventDate}</td>
                  <td style={{ padding: '10px 0' }}>{item.startTime ?? '-'} - {item.endTime ?? '-'}</td>
                  <td style={{ padding: '10px 0' }}>{item.location ?? '-'}</td>
                  <td style={{ padding: '10px 0' }}>{item.status}</td>
                  <td style={{ padding: '10px 0' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        className="button secondary"
                        type="button"
                        onClick={() => {
                          setEditingId(item.id);
                          setTitle(item.title);
                          setDescription(item.description ?? '');
                          setEventDate(item.eventDate);
                          setStartTime(item.startTime ?? '');
                          setEndTime(item.endTime ?? '');
                          setLocation(item.location ?? '');
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
