'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthCard from '../../components/auth/AuthCard';

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
        let message = 'Nao foi possivel criar o cadastro.';
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

      router.replace('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel criar o cadastro.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Vamos comecar!"
        subtitle="Preencha os dados para solicitar acesso."
        footer={
          <div className="ip-card__footer-row">
            <span>Ja tem uma conta?</span>
            <Link className="ip-link" href="/login">
              Entrar
            </Link>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="ip-form">
          <label className="ip-field">
            <span>Nome completo</span>
            <div className="ip-input-wrap">
              <span className="ip-input-icon" aria-hidden="true">
                👤
              </span>
              <input
                className="ip-input"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
              />
            </div>
          </label>
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
                required
              />
              <span className="ip-input-trailing" aria-hidden="true">
                ✉
              </span>
            </div>
          </label>
          <label className="ip-field">
            <span>Senha</span>
            <div className="ip-input-wrap">
              <span className="ip-input-icon" aria-hidden="true">
                🔒
              </span>
              <input
                className="ip-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={8}
              />
            </div>
          </label>

          {error ? (
            <div className="ip-error" role="alert">
              {error}
            </div>
          ) : null}

          <button className="ip-btn" type="submit" disabled={loading}>
            {loading ? 'Criando...' : 'Criar conta'}
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
