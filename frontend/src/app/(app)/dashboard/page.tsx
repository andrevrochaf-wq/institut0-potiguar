'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Summary = {
  totals: {
    collaborators: number;
    services: number;
    aps: number;
    projects: number;
    establishments: number;
  };
  metrics: {
    dbStatus: string;
    collaboratorsActive: number;
    users: number;
    aps: number;
  };
};

type Recent = {
  notifications: {
    inactiveCollaborators: number;
    inactiveUsers: number;
  };
  recentCollaborators: { id: string; name: string }[];
  recentUsers: { id: string; name: string }[];
  updatedAt: string;
};

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  readAt: string | null;
  meta?: {
    severity?: 'warning' | 'info';
    count?: number;
  } | null;
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [recent, setRecent] = useState<Recent | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const storedToken =
      token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
    const [summaryRes, recentRes, notificationsRes] = await Promise.all([
      fetch(`${API_URL}/dashboard/summary`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      }),
      fetch(`${API_URL}/dashboard/recent`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      }),
      fetch(`${API_URL}/notifications`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      }),
    ]);

    const summaryData = await summaryRes.json();
    const recentData = await recentRes.json();
    const notificationsData = notificationsRes.ok ? await notificationsRes.json() : [];
    setSummary(summaryData);
    setRecent(recentData);
    setNotifications(notificationsData);
    setLoading(false);
  }

  useEffect(() => {
    setToken(window.localStorage.getItem('ip_token'));
    load();
  }, []);

  const totals = summary?.totals;
  const metrics = summary?.metrics;
  const unreadCount = notifications.filter((item) => !item.readAt).length;

  async function handleMarkRead(id: string) {
    const storedToken = window.localStorage.getItem('ip_token');
    await fetch(`${API_URL}/notifications/${id}/read`, {
      method: 'POST',
      headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
    });
    await load();
  }

  async function handleMarkAllRead() {
    const storedToken = window.localStorage.getItem('ip_token');
    await fetch(`${API_URL}/notifications/read-all`, {
      method: 'POST',
      headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
    });
    await load();
  }

  return (
    <section style={{ display: 'grid', gap: 16 }}>
      <div className="panel" style={{ background: '#e9eff6' }}>
        <div className="panel-body" style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ fontSize: 18, fontWeight: 600 }}>Dashboard Administrativo</h1>
            <button
              className="refresh-button"
              type="button"
              aria-label="Atualizar"
              onClick={load}
            >
              ↻
            </button>
          </div>

          <div className="stats-grid">
            {[
              {
                value: totals?.collaborators ?? 0,
                label: 'Total de colaboradores cadastrados',
                color: '#e8f1ff',
              },
              { value: totals?.services ?? 0, label: 'Total de servicos', color: '#f1f3f5' },
              { value: totals?.aps ?? 0, label: 'Total de APS', color: '#e7f7fa' },
              { value: totals?.projects ?? 0, label: 'Total de Projetos', color: '#fdf4e7' },
              {
                value: totals?.establishments ?? 0,
                label: 'Total de estabelecimentos',
                color: '#e9f6ee',
              },
            ].map((card) => (
              <div key={card.label} className="stat-card" style={{ background: card.color }}>
                <div className="stat-icon" style={{ background: '#e1e6eb' }} />
                <div className="stat-number">{card.value}</div>
                <div className="pill">{card.label}</div>
              </div>
            ))}
          </div>

          <div className="panel" style={{ border: '1px solid var(--border)' }}>
            <div className="panel-header" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: '#3b82f6' }}>↗</span>
              <strong>Metricas do Sistema</strong>
              <div style={{ marginLeft: 'auto' }}>
                <button className="icon-button" type="button" aria-label="Atualizar" onClick={load}>
                  ↻
                </button>
              </div>
            </div>
            <div className="panel-body">
              <div className="metric-grid">
                <div className="metric-card" style={{ background: '#f6fbef' }}>
                  <div className="stat-icon" style={{ background: '#dff4d8' }} />
                  <div className="metric-status" style={{ color: '#1f7a4a' }}>
                    {metrics?.dbStatus ?? 'online'}
                  </div>
                  <div className="pill">Status do Banco</div>
                  <div className="pill">Conexao com banco de dados</div>
                </div>
                <div className="metric-card" style={{ background: '#f0f6ff' }}>
                  <div className="stat-icon" style={{ background: '#dbe9ff' }} />
                  <div className="stat-number" style={{ color: '#1d4ed8' }}>
                    {metrics?.collaboratorsActive ?? 0}
                  </div>
                  <div className="pill">Colaboradores ativos</div>
                  <div className="pill">Total cadastrado</div>
                </div>
                <div className="metric-card" style={{ background: '#eefbff' }}>
                  <div className="stat-icon" style={{ background: '#d7f3ff' }} />
                  <div className="stat-number" style={{ color: '#0ea5a4' }}>
                    {metrics?.users ?? 0}
                  </div>
                  <div className="pill">Usuarios</div>
                  <div className="pill">Usuarios do sistema</div>
                </div>
                <div className="metric-card" style={{ background: '#f4f9ec' }}>
                  <div className="stat-icon" style={{ background: '#e0f4ce' }} />
                  <div className="stat-number" style={{ color: '#65a30d' }}>
                    {metrics?.aps ?? 0}
                  </div>
                  <div className="pill">APS</div>
                  <div className="pill">APS cadastradas</div>
                </div>
              </div>
              <div className="pill" style={{ marginTop: 16 }}>
                Ultima atualizacao:{' '}
                {recent?.updatedAt
                  ? new Date(recent.updatedAt).toLocaleString('pt-BR')
                  : '...'}
              </div>
            </div>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(220px, 1fr))' }}>
            <div className="list-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong>Notificacoes</strong>
                <button
                  className="pill"
                  type="button"
                  onClick={handleMarkAllRead}
                  disabled={unreadCount === 0}
                >
                  Marcar todas
                </button>
              </div>
              {notifications.length === 0 ? (
                <span className="pill" style={{ marginTop: 10 }}>
                  Nenhuma notificacao pendente.
                </span>
              ) : (
                notifications.map((item) => {
                  const severity = item.meta?.severity ?? 'info';
                  const isRead = Boolean(item.readAt);
                  const iconStyle =
                    severity === 'warning'
                      ? { background: '#fff3df' }
                      : { background: '#e6f7f6' };
                  const badgeStyle =
                    severity === 'warning'
                      ? {}
                      : { background: '#e6f7f6', color: '#0f766e' };
                  return (
                    <div key={item.id} className="list-item" style={{ opacity: isRead ? 0.6 : 1 }}>
                      <div className="stat-icon" style={iconStyle} />
                      <div style={{ flex: 1 }}>
                        <strong>{item.title}</strong>
                        <div className="pill">{item.message}</div>
                        <span className="mini-badge" style={badgeStyle}>
                          {severity}
                        </span>
                      </div>
                      {!isRead ? (
                        <button className="pill" type="button" onClick={() => handleMarkRead(item.id)}>
                          Marcar lida
                        </button>
                      ) : null}
                    </div>
                  );
                })
              )}
            </div>

            <div className="list-card">
              <strong>colaboradores Recentes</strong>
              {(recent?.recentCollaborators ?? []).map((item) => (
                <div key={item.id} className="list-item">
                  <div className="avatar" style={{ background: '#dbe9ff', color: '#1d4ed8' }}>
                    {item.name[0]}
                  </div>
                  <div>
                    <strong>{item.name}</strong>
                    <div className="pill">Sem cargo - 08. CAMPO REDONDO</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="list-card">
              <strong>Usuarios Recentes</strong>
              {(recent?.recentUsers ?? []).map((item) => (
                <div key={item.id} className="list-item">
                  <div className="avatar" style={{ background: '#e0f4ce', color: '#3f6212' }}>
                    {item.name[0]}
                  </div>
                  <div>
                    <strong>{item.name}</strong>
                    <div className="pill">nutricionista - 00. INSTITUTO POTIGUAR</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {loading ? <p className="pill">Carregando dados...</p> : null}
        </div>
      </div>
    </section>
  );
}
