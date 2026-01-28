'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Collaborator = {
  id: string;
  fullName: string;
  cpf: string | null;
  rg: string | null;
  email: string | null;
  phone: string | null;
  roleTitle: string | null;
  contractType: string | null;
  bankName: string | null;
  bankAgency: string | null;
  bankAccount: string | null;
  addressFull: string | null;
  cityId: string | null;
  projectId: string | null;
  establishmentId: string | null;
  serviceId: string | null;
  admissionDate: string | null;
  status: string;
  createdAt: string;
};

type City = {
  id: string;
  name: string;
  state: string;
};

type Project = {
  id: string;
  name: string;
};

type Service = {
  id: string;
  name: string;
};

type Establishment = {
  id: string;
  name: string;
};

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 9);
  const part4 = digits.slice(9, 11);
  let formatted = part1;

  if (part2) formatted += `.${part2}`;
  if (part3) formatted += `.${part3}`;
  if (part4) formatted += `-${part4}`;

  return formatted;
}

function formatRg(value: string) {
  return value.replace(/\D/g, '').slice(0, 9);
}

export default function ColaboradoresPage() {
  const [items, setItems] = useState<Collaborator[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [month, setMonth] = useState('Janeiro');
  const [year, setYear] = useState('2025');
  const [token, setToken] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('');
  const [projectFilter, setProjectFilter] = useState('');
  const [establishmentFilter, setEstablishmentFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [contractTypeFilter, setContractTypeFilter] = useState('');
  const [bankFilter, setBankFilter] = useState('');

  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [contractType, setContractType] = useState('RPA');
  const [bankName, setBankName] = useState('');
  const [bankAgency, setBankAgency] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [addressFull, setAddressFull] = useState('');
  const [cityId, setCityId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [establishmentId, setEstablishmentId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const storedToken =
        token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
      const headers = storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined;
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (cityFilter) params.set('cityId', cityFilter);
      if (projectFilter) params.set('projectId', projectFilter);
      if (establishmentFilter) params.set('establishmentId', establishmentFilter);
      if (serviceFilter) params.set('serviceId', serviceFilter);
      if (contractTypeFilter) params.set('contractType', contractTypeFilter);
      if (bankFilter) params.set('bankName', bankFilter);

      const [collaboratorsRes, citiesRes, projectsRes, servicesRes, establishmentsRes] =
        await Promise.all([
          fetch(`${API_URL}/collaborators?${params.toString()}`, { headers }),
          fetch(`${API_URL}/cities`, { headers }),
          fetch(`${API_URL}/projects`, { headers }),
          fetch(`${API_URL}/services`, { headers }),
          fetch(`${API_URL}/establishments`, { headers }),
        ]);

      if (
        !collaboratorsRes.ok ||
        !citiesRes.ok ||
        !projectsRes.ok ||
        !servicesRes.ok ||
        !establishmentsRes.ok
      ) {
        throw new Error('Falha ao carregar');
      }

      setItems(await collaboratorsRes.json());
      setCities(await citiesRes.json());
      setProjects(await projectsRes.json());
      setServices(await servicesRes.json());
      setEstablishments(await establishmentsRes.json());
    } catch (err) {
      setError('Nao foi possivel carregar colaboradores.');
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
      const res = await fetch(`${API_URL}/collaborators`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          fullName,
          cpf: cpf || undefined,
          rg: rg || undefined,
          email: email || undefined,
          phone: phone || undefined,
          roleTitle: roleTitle || undefined,
          contractType: contractType || undefined,
          bankName: bankName || undefined,
          bankAgency: bankAgency || undefined,
          bankAccount: bankAccount || undefined,
          addressFull: addressFull || undefined,
          cityId: cityId || undefined,
          projectId: projectId || undefined,
          establishmentId: establishmentId || undefined,
          serviceId: serviceId || undefined,
          admissionDate: admissionDate || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Falha ao salvar');
      }

      setFullName('');
      setCpf('');
      setRg('');
      setEmail('');
      setPhone('');
      setRoleTitle('');
      setContractType('RPA');
      setBankName('');
      setBankAgency('');
      setBankAccount('');
      setAddressFull('');
      setCityId('');
      setProjectId('');
      setEstablishmentId('');
      setServiceId('');
      setAdmissionDate('');
      setFormOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nao foi possivel salvar colaborador.');
    }
  }

  return (
    <section className="ip-page" style={{ display: 'grid', gap: 16 }}>
      <div className="panel panel--flat">
        <div className="panel-header">
          <div className="toolbar ip-toolbar">
            <div style={{ display: 'grid', gap: 6 }}>
              <h1 className="ip-page-title">Gerenciamento de Colaboradores</h1>
              <span className="ip-page-subtitle">Gestao, filtros e cadastro rapido.</span>
            </div>
            <div className="toolbar-actions">
              <select className="input" value={month} onChange={(e) => setMonth(e.target.value)}>
                {['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho'].map(
                  (value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ),
                )}
              </select>
              <select className="input" value={year} onChange={(e) => setYear(e.target.value)}>
                {['2026', '2025', '2024', '2023'].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <button
                className="button"
                type="button"
                onClick={() => {
                  setFormOpen((prev) => !prev);
                  const form = document.getElementById('novo-colaborador');
                  if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {formOpen ? 'Fechar' : '+ Adicionar Colaborador'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="panel panel--tint">
        <div className="panel-body">
          <div className="ip-section-title">
            <div className="ip-section-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
            <strong>Filtros de Pesquisa</strong>
          </div>

          <div className="filter-grid ip-filter-grid">
            <label className="ip-field">
              <span className="ip-field-label">Nome</span>
              <input
                className="input"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por nome"
              />
            </label>
            <label className="ip-field">
              <span className="ip-field-label">Cidade</span>
              <select
                className="input"
                value={cityFilter}
                onChange={(event) => setCityFilter(event.target.value)}
              >
                <option value="">Todos</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="ip-field">
              <span className="ip-field-label">Situacao</span>
              <select
                className="input"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">Todos</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </label>
            <label className="ip-field">
              <span className="ip-field-label">Banco</span>
              <input
                className="input"
                value={bankFilter}
                onChange={(event) => setBankFilter(event.target.value)}
              />
            </label>
            <label className="ip-field">
              <span className="ip-field-label">Projeto</span>
              <select
                className="input"
                value={projectFilter}
                onChange={(event) => setProjectFilter(event.target.value)}
              >
                <option value="">Todos</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="ip-field">
              <span className="ip-field-label">Tipo de Contrato</span>
              <select
                className="input"
                value={contractTypeFilter}
                onChange={(event) => setContractTypeFilter(event.target.value)}
              >
                <option value="">Todos</option>
                <option value="RPA">RPA</option>
                <option value="MEI">MEI</option>
                <option value="CLT">CLT</option>
              </select>
            </label>
            <label className="ip-field">
              <span className="ip-field-label">Estabelecimento</span>
              <select
                className="input"
                value={establishmentFilter}
                onChange={(event) => setEstablishmentFilter(event.target.value)}
              >
                <option value="">Todos</option>
                {establishments.map((establishment) => (
                  <option key={establishment.id} value={establishment.id}>
                    {establishment.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="ip-field">
              <span className="ip-field-label">Servico</span>
              <select
                className="input"
                value={serviceFilter}
                onChange={(event) => setServiceFilter(event.target.value)}
              >
                <option value="">Todos</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </label>
            <button className="button ip-filter-button" type="button" onClick={load}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      {formOpen ? (
        <div className="panel">
          <div className="panel-header">
            <strong>Novo colaborador</strong>
          </div>
          <div className="panel-body">
            <form id="novo-colaborador" onSubmit={handleCreate} style={{ display: 'grid', gap: 12 }}>
              <div className="filter-grid" style={{ gap: 12 }}>
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
                CPF
                <input
                  className="input"
                  value={cpf}
                  onChange={(event) => setCpf(formatCpf(event.target.value))}
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                RG
                <input
                  className="input"
                  value={rg}
                  onChange={(event) => setRg(formatRg(event.target.value))}
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Email
                <input
                  className="input"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Telefone
                <input
                  className="input"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Cargo
                <input
                  className="input"
                  value={roleTitle}
                  onChange={(event) => setRoleTitle(event.target.value)}
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Tipo de contrato
                <select
                  className="input"
                  value={contractType}
                  onChange={(event) => setContractType(event.target.value)}
                >
                  <option value="RPA">RPA</option>
                  <option value="MEI">MEI</option>
                  <option value="CLT">CLT</option>
                </select>
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Banco
                <input
                  className="input"
                  value={bankName}
                  onChange={(event) => setBankName(event.target.value)}
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Agencia
                <input
                  className="input"
                  value={bankAgency}
                  onChange={(event) => setBankAgency(event.target.value)}
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Conta
                <input
                  className="input"
                  value={bankAccount}
                  onChange={(event) => setBankAccount(event.target.value)}
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Endereco
                <input
                  className="input"
                  value={addressFull}
                  onChange={(event) => setAddressFull(event.target.value)}
                />
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Cidade
                <select
                  className="input"
                  value={cityId}
                  onChange={(event) => setCityId(event.target.value)}
                >
                  <option value="">Selecione</option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name} / {city.state}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Projeto
                <select
                  className="input"
                  value={projectId}
                  onChange={(event) => setProjectId(event.target.value)}
                >
                  <option value="">Selecione</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Estabelecimento
                <select
                  className="input"
                  value={establishmentId}
                  onChange={(event) => setEstablishmentId(event.target.value)}
                >
                  <option value="">Selecione</option>
                  {establishments.map((establishment) => (
                    <option key={establishment.id} value={establishment.id}>
                      {establishment.name}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Servico
                <select
                  className="input"
                  value={serviceId}
                  onChange={(event) => setServiceId(event.target.value)}
                >
                  <option value="">Selecione</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                Admissao
                <input
                  className="input"
                  type="date"
                  value={admissionDate}
                  onChange={(event) => setAdmissionDate(event.target.value)}
                />
              </label>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="button" type="submit">
                  Salvar colaborador
                </button>
                <button
                  className="button secondary"
                  type="button"
                  onClick={() => setFormOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <div className="panel">
        {error ? <p style={{ color: 'var(--danger)', padding: 16 }}>{error}</p> : null}

        {loading ? (
          <p className="muted" style={{ padding: 16 }}>
            Carregando...
          </p>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <div>
              <div className="empty-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <path
                    d="M4 20a8 8 0 0 1 16 0"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <strong style={{ color: '#111827' }}>Nenhum colaborador encontrado</strong>
              <p className="pill">
                Ajuste os filtros de pesquisa ou adicione um novo colaborador para comecar
              </p>
            </div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', padding: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th style={{ paddingBottom: 8 }}>Nome</th>
                  <th style={{ paddingBottom: 8 }}>CPF</th>
                  <th style={{ paddingBottom: 8 }}>Cidade</th>
                  <th style={{ paddingBottom: 8 }}>Contrato</th>
                  <th style={{ paddingBottom: 8 }}>Banco</th>
                  <th style={{ paddingBottom: 8 }}>Status</th>
                  <th style={{ paddingBottom: 8 }}>Criado</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const city = cities.find((entry) => entry.id === item.cityId);
                  return (
                    <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 0' }}>{item.fullName}</td>
                      <td style={{ padding: '10px 0' }}>
                        {item.cpf ? formatCpf(item.cpf) : '-'}
                      </td>
                      <td style={{ padding: '10px 0' }}>
                        {city ? `${city.name}/${city.state}` : '-'}
                      </td>
                      <td style={{ padding: '10px 0' }}>{item.contractType ?? '-'}</td>
                      <td style={{ padding: '10px 0' }}>{item.bankName ?? '-'}</td>
                      <td style={{ padding: '10px 0' }}>{item.status}</td>
                      <td style={{ padding: '10px 0' }}>
                        {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
