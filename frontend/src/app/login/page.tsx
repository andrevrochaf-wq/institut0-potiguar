'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        let message = 'Nao foi possivel autenticar. Verifique os dados.';
        try {
          const data = await res.json();
          if (Array.isArray(data?.message)) {
            message = data.message.join(' ');
          } else if (typeof data?.message === 'string') {
            message = data.message;
          }
        } catch {
          // keep default message
        }
        throw new Error(message);
      }

      const data = await res.json();
      window.localStorage.setItem('ip_token', data.access_token);
      window.localStorage.setItem('ip_user', JSON.stringify(data.user));
      router.replace('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel autenticar. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 420, width: '100%', padding: 28 }}>
        <div style={{ display: 'grid', gap: 12, marginBottom: 18 }}>
          <span className="badge">Instituto Potiguar</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28 }}>
            Acesso ao Backoffice
          </h1>
          <p className="muted">
            Entre com suas credenciais para acessar os modulos administrativos.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
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
            />
          </label>

          {error ? <p style={{ color: 'var(--danger)' }}>{error}</p> : null}

          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={{ marginTop: 14 }}>
          <button
            className="button secondary"
            type="button"
            onClick={() => router.push('/register')}
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}
