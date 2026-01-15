'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type News = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function NoticiasPage() {
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [token, setToken] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const storedToken =
        token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
      const res = await fetch(`${API_URL}/news`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      });
      if (!res.ok) throw new Error('Falha');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError('Nao foi possivel carregar noticias.');
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
      const res = await fetch(`${API_URL}/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error('Falha');
      setTitle('');
      setContent('');
      await load();
    } catch (err) {
      setError('Nao foi possivel salvar noticia.');
    }
  }

  return (
    <section className="panel" style={{ padding: 20, display: 'grid', gap: 16 }}>
      <div className="panel-header">
        <strong>Noticias</strong>
      </div>

      <form onSubmit={handleCreate} className="panel-body" style={{ display: 'grid', gap: 12 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          Titulo
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          Conteudo
          <textarea className="input" rows={4} value={content} onChange={(e) => setContent(e.target.value)} required />
        </label>
        <button className="button" type="submit">
          Salvar noticia
        </button>
      </form>

      {error ? <p style={{ color: 'var(--danger)' }}>{error}</p> : null}

      {loading ? (
        <p className="pill">Carregando...</p>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {items.map((item) => (
            <div key={item.id} className="list-card">
              <strong>{item.title}</strong>
              <p className="pill" style={{ marginTop: 6 }}>{item.content}</p>
              <span className="pill">{new Date(item.createdAt).toLocaleDateString('pt-BR')}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
