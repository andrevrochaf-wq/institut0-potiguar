'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MockupArtboard from '../../components/auth/MockupArtboard';

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
    <MockupArtboard backgroundSrc="/auth/MOCKUP_LOGIN.png">
      <form onSubmit={handleSubmit} className="ip-auth-hit ip-auth-hit--form">
        <label className="ip-sr-only" htmlFor="login-email">
          Email
        </label>
        <input
          id="login-email"
          className="ip-auth-hit ip-auth-hit--email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="E-mail"
          required
        />

        <label className="ip-sr-only" htmlFor="login-password">
          Senha
        </label>
        <input
          id="login-password"
          className="ip-auth-hit ip-auth-hit--password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Senha"
          required
        />

        <Link className="ip-auth-hit ip-auth-hit--forgot" href="#" aria-label="Esqueci minha senha">
          Esqueci minha senha
        </Link>

        {error ? (
          <div className="ip-auth-hit ip-auth-hit--error" role="alert">
            {error}
          </div>
        ) : null}

        <button
          className="ip-auth-hit ip-auth-hit--submit"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <Link className="ip-auth-hit ip-auth-hit--register" href="/register">
          Criar conta
        </Link>
      </form>
    </MockupArtboard>
  );
}
