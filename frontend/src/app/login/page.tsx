'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';

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
    <AuthLayout>
      <AuthCard
        title="Bem-vindo(a) de volta"
        subtitle="Acesse sua area do Instituto."
        footer={
          <div className="ip-card__footer-row">
            <span>Nao tem uma conta?</span>
            <Link className="ip-link" href="/register">
              Criar conta
            </Link>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="ip-form">
          <label className="ip-field">
            <span>Email</span>
            <div className="ip-input-wrap">
              <span className="ip-input-icon" aria-hidden="true">
                @
              </span>
              <input
                className="ip-input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="E-mail"
                required
              />
              <span className="ip-input-trailing" aria-hidden="true">
                ✉
              </span>
            </div>
          </label>

          <label className="ip-field">
            <span className="ip-field-row">
              <span>Senha</span>
              <Link className="ip-link ip-link--small" href="#">
                Esqueci minha senha
              </Link>
            </span>
            <div className="ip-input-wrap">
              <span className="ip-input-icon" aria-hidden="true">
                🔒
              </span>
              <input
                className="ip-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Senha"
                required
              />
            </div>
          </label>

          {error ? (
            <div className="ip-error" role="alert">
              {error}
            </div>
          ) : null}

          <button className="ip-btn" type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
