'use client';

import { useState } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess(false);
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

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel criar o cadastro.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ip-login">
      <div className="ip-login__ribbon" aria-hidden="true" />
      <div className="ip-login__container">
        <div className="ip-login__grid">
          <section className="ip-login__brand">
            <div className="ip-login__logo">
              <span className="ip-login__mark" aria-hidden="true">
                <svg viewBox="0 0 64 64">
                  <path d="M8 40c12-14 30-20 48-20v12c-16 0-28 4-36 12z" fill="#1E4DB7" />
                  <path d="M8 46c12-9 30-13 48-13v10c-16 0-28 2-36 8z" fill="#1FA66A" />
                  <path d="M8 50c12-6 30-8 48-8v9c-16 0-28 1-36 5z" fill="#D83A3A" />
                </svg>
              </span>
              <div>
                <strong>Instituto Potiguar</strong>
                <span>Juntos pela Educação.</span>
              </div>
            </div>

            <div className="ip-login__illustration">
              <StudentsIllustration />
            </div>

            <ul className="ip-login__bullets">
              <li>
                <span className="ip-login__dot ip-login__dot--blue" />
                Ambiente seguro e confiável,
              </li>
              <li>
                <span className="ip-login__dot ip-login__dot--green" />
                Acesse seus cursos e conteúdos.
              </li>
              <li>
                <span className="ip-login__dot ip-login__dot--red" />
                Suporte sempre ao seu lado.
              </li>
            </ul>

            <div className="ip-login__footer">Instituto Potiguar • Social e Educacional</div>
          </section>

          <section className="ip-login__card">
            <div className="ip-login__card-inner">
              <div className="ip-login__card-header">
                <h1>Vamos começar!</h1>
                <p>Preencha os dados para solicitar acesso.</p>
              </div>

              <form onSubmit={handleSubmit} className="ip-login__form">
                <label className="ip-login__field">
                  <span>Nome completo</span>
                  <div className="ip-login__input-wrap ip-login__input-wrap--left">
                    <span className="ip-login__icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <path
                          d="M5 20a7 7 0 0 1 14 0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <input
                      className="ip-login__input"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder="Nome completo"
                      required
                    />
                  </div>
                </label>
                <label className="ip-login__field">
                  <span>E-mail</span>
                  <div className="ip-login__input-wrap">
                    <input
                      className="ip-login__input"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="E-mail"
                      required
                    />
                    <span className="ip-login__icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M4 6h16v12H4z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 7.5l8 5 8-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </label>
                <label className="ip-login__field">
                  <span>Senha</span>
                  <div className="ip-login__input-wrap ip-login__input-wrap--left">
                    <span className="ip-login__icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M6 11h12v9H6z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 11V8a3 3 0 1 1 6 0v3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <input
                      className="ip-login__input"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Senha"
                      required
                      minLength={8}
                    />
                  </div>
                </label>

                {error ? (
                  <p className="ip-login__error" role="alert">
                    {error}
                  </p>
                ) : null}

                {success ? (
                  <div className="ip-login__success" role="status">
                    <p>Cadastro enviado. Aguarde a aprovacao do administrador.</p>
                  </div>
                ) : (
                  <p className="ip-login__error ip-login__error--ghost">
                    Suas credenciais ficam protegidas.
                  </p>
                )}

                <button className="ip-login__submit" type="submit" disabled={loading}>
                  {loading ? 'Criando...' : 'Criar conta'}
                </button>
              </form>

              <div className="ip-login__cta">
                <span>Já tem uma conta?</span>
                <Link className="ip-login__link" href="/login">
                  Entrar
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function StudentsIllustration() {
  return (
    <svg viewBox="0 0 420 250" role="img" aria-label="Ilustração de estudantes">
      <defs>
        <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2c7a6" />
          <stop offset="100%" stopColor="#e9b089" />
        </linearGradient>
      </defs>
      <rect x="10" y="40" width="400" height="200" rx="24" fill="#f1e6d8" />
      <path d="M50 190c20-40 70-40 90 0" fill="#1fa66a" opacity="0.35" />
      <path d="M140 190c20-40 70-40 90 0" fill="#1e4db7" opacity="0.3" />
      <path d="M230 190c20-40 70-40 90 0" fill="#d83a3a" opacity="0.25" />

      <circle cx="110" cy="105" r="26" fill="url(#skin)" />
      <path d="M86 150c8-20 48-20 56 0v24H86z" fill="#1e4db7" />
      <rect x="74" y="138" width="20" height="56" rx="10" fill="#1e4db7" />
      <rect x="128" y="138" width="20" height="56" rx="10" fill="#1e4db7" />
      <rect x="90" y="160" width="52" height="30" rx="6" fill="#f2c97d" />

      <circle cx="200" cy="95" r="24" fill="url(#skin)" />
      <path d="M176 140c10-18 48-18 56 0v30h-56z" fill="#1fa66a" />
      <path d="M220 90l24 8-8 18" fill="#1fa66a" />
      <path d="M220 78l24 12" stroke="#1fa66a" strokeWidth="6" strokeLinecap="round" />

      <circle cx="282" cy="108" r="22" fill="url(#skin)" />
      <path d="M260 148c8-16 42-16 50 0v26h-50z" fill="#d83a3a" />
      <rect x="270" y="132" width="40" height="24" rx="8" fill="#0b2e5f" opacity="0.2" />
      <path d="M298 150l22 22" stroke="#0b2e5f" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
