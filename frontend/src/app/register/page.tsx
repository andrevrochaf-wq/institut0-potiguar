'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (!res.ok) {
        throw new Error('Falha ao cadastrar');
      }

      router.replace('/login');
    } catch (err) {
      setError('Nao foi possivel criar o cadastro.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 420, width: '100%', padding: 28 }}>
        <div style={{ display: 'grid', gap: 12, marginBottom: 18 }}>
          <span className="badge">Instituto Potiguar</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>Criar conta</h1>
          <p className="muted">Preencha os dados para solicitar acesso.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <label style={{ display: 'grid', gap: 6 }}>
            Nome completo
            <input
              className="input"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Email
            <input
              className="input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Senha
            <input
              className="input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
            />
          </label>

          {error ? <p style={{ color: 'var(--danger)' }}>{error}</p> : null}

          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Criando...' : 'Criar conta'}
          </button>
        </form>

        <div style={{ marginTop: 14 }}>
          <button
            className="button secondary"
            type="button"
            onClick={() => router.push('/login')}
          >
            Ja tenho conta
          </button>
        </div>
      </div>
    </div>
  );
}
