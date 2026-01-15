'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const menu = [
  {
    section: 'Gestao',
    items: [
      { label: 'Colaboradores', href: '/colaboradores', permission: 'colaboradores.read' },
      { label: 'Fornecedores', href: '/fornecedores', permission: 'fornecedores.read' },
      { label: 'Servicos', href: '/servicos', permission: 'servicos.read' },
      { label: 'Projetos', href: '/projetos', permission: 'projetos.read' },
      { label: 'Aps', href: '/aps', permission: 'aps.read' },
      { label: 'Agenda', href: '/agenda', permission: 'agenda.read' },
      { label: 'Estabelecimentos', href: '/estabelecimentos', permission: 'estabelecimentos.read' },
      { label: 'Contratos', href: '/contratos', permission: 'contratos.read' },
      { label: 'Prestacao de contas', href: '/prestacao-contas', permission: 'prestacao_contas.read' },
    ],
  },
  {
    section: 'Administracao',
    items: [
      { label: 'Cidades', href: '/cidades', permission: 'cidades.read' },
      { label: 'Usuarios', href: '/usuarios', permission: 'usuarios.read' },
      { label: 'Noticias', href: '/noticias', permission: 'noticias.read' },
    ],
  },
  {
    section: 'Financeiro',
    items: [
      { label: 'Resumo folha', href: '/resumo-folha', permission: 'financeiro_folha.read' },
      { label: 'Despesas Indiretas', href: '/despesas-indiretas', permission: 'financeiro_despesas.read' },
    ],
  },
  {
    section: 'Alimentacao Escolar',
    items: [],
  },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{
    fullName?: string;
    primaryRole?: string;
    permissions?: string[];
  } | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem('ip_token');
    const storedUser = window.localStorage.getItem('ip_user');

    if (!token) {
      router.replace('/login');
      return;
    }

    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch {
        setUser(null);
      }
    }
  }, [router]);

  const current = useMemo(() => pathname ?? '', [pathname]);
  const allowedPermissions = useMemo(() => new Set(user?.permissions ?? []), [user]);
  const filteredMenu = useMemo(
    () =>
      menu
        .map((section) => ({
          ...section,
          items: section.items.filter((item) =>
            item.permission ? allowedPermissions.has(item.permission) : true,
          ),
        }))
        .filter((section) => section.items.length > 0 || section.section === 'Alimentacao Escolar'),
    [allowedPermissions],
  );

  useEffect(() => {
    if (!user || !pathname) {
      setIsAuthorized(true);
      return;
    }

    const allItems = menu.flatMap((section) => section.items);
    const match = allItems.find((item) => item.href === pathname);
    if (!match?.permission) {
      setIsAuthorized(true);
      return;
    }

    setIsAuthorized(allowedPermissions.has(match.permission));
  }, [allowedPermissions, pathname, user]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div style={{ display: 'grid', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: '#e8f4ee',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--primary)',
                fontWeight: 700,
              }}
            >
              IP
            </div>
            <div>
              <h2>Instituto Potiguar</h2>
              <p className="pill">Dashboard Admin</p>
            </div>
          </div>
        </div>

        {filteredMenu.map((section) => (
          <div key={section.section} className="sidebar-section">
            <div className="sidebar-section-title">{section.section}</div>
            <div style={{ display: 'grid', gap: 4 }}>
              {section.items.length === 0 ? (
                <span className="pill">Em breve</span>
              ) : (
                section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`sidebar-item ${current === item.href ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                  </a>
                ))
              )}
            </div>
          </div>
        ))}
      </aside>

      <div className="content">
        <header className="topbar">
          <div className="toolbar">
            <button className="icon-button" type="button" aria-label="Menu">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="icon-button" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
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
              <input className="input" placeholder="Pesquisar..." style={{ width: 260 }} />
            </div>
          </div>

          <div className="toolbar-actions">
            <button className="icon-button" type="button" aria-label="Notificacoes">
              <span className="icon-badge">8</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 17a3 3 0 0 0 6 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="avatar">V</div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>VALFRAM</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                  {user?.primaryRole ?? 'ADMIN'}
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <button
              className="button secondary"
              type="button"
              onClick={() => {
                window.localStorage.removeItem('ip_token');
                window.localStorage.removeItem('ip_user');
                router.replace('/login');
              }}
            >
              Sair
            </button>
          </div>
        </header>

        <main className="content-body">
          {!isAuthorized ? (
            <div className="panel" style={{ padding: 20 }}>
              <strong>Sem acesso</strong>
              <p className="pill" style={{ marginTop: 6 }}>
                Seu perfil nao tem permissao para acessar esta area.
              </p>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  );
}
