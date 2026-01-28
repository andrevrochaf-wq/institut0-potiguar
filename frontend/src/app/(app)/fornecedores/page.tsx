'use client';

import { useEffect, useMemo, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Provider = {
  id: string;
  name: string;
  document: string | null;
  contractType: string | null;
  description: string | null;
  bankCode: string | null;
  bankName: string | null;
  agency: string | null;
  account: string | null;
  pixType: string | null;
  pixKey: string | null;
  cityIds: string[] | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  status: string;
  createdAt: string;
};

type City = {
  id: string;
  name: string;
  state: string;
};

const CONTRACT_TYPES = ['RPA', 'MEI', 'CLT'];
const PIX_TYPES = ['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA'];

function normalizeDigits(value: string) {
  return value.replace(/\D/g, '');
}

function formatDocument(value: string) {
  const digits = normalizeDigits(value);
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
}

export default function FornecedoresPage() {
  const [items, setItems] = useState<Provider[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [documentFilter, setDocumentFilter] = useState('');

  const [name, setName] = useState('');
  const [documentRaw, setDocumentRaw] = useState('');
  const [contractType, setContractType] = useState('');
  const [description, setDescription] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [agency, setAgency] = useState('');
  const [account, setAccount] = useState('');
  const [pixType, setPixType] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [cityIds, setCityIds] = useState<string[]>([]);

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const documentDisplay = useMemo(() => formatDocument(documentRaw), [documentRaw]);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const storedToken =
        token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (documentFilter) params.set('document', documentFilter);
      const res = await fetch(`${API_URL}/providers?${params.toString()}`, {
        headers: storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined,
      });
      if (!res.ok) throw new Error('Falha');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setError('Nao foi possivel carregar fornecedores.');
    } finally {
      setLoading(false);
    }
  }

  async function loadCities(currentToken: string | null) {
    try {
      const res = await fetch(`${API_URL}/cities`, {
        headers: currentToken ? { Authorization: `Bearer ${currentToken}` } : undefined,
      });
      if (!res.ok) return;
      const data = await res.json();
      setCities(data);
    } catch {
      setCities([]);
    }
  }

  useEffect(() => {
    const stored = window.localStorage.getItem('ip_token');
    setToken(stored);
    load();
    loadCities(stored);
  }, []);

  function validateDocument(doc: string) {
    const digits = normalizeDigits(doc);
    return digits.length === 11 || digits.length === 14;
  }

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!validateDocument(documentRaw)) {
      setError('Digite CPF (11 digitos) ou CNPJ (14 digitos).');
      return;
    }
    if (!contractType) {
      setError('Selecione o tipo de contrato.');
      return;
    }
    if (!cityIds.length) {
      setError('Selecione ao menos um municipio.');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/providers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name,
          document: normalizeDigits(documentRaw),
          contractType,
          description: description || undefined,
          bankCode,
          bankName,
          agency,
          account,
          pixType,
          pixKey,
          cityIds,
          phone: phone || undefined,
          email: email || undefined,
          address: address || undefined,
        }),
      });
      if (!res.ok) throw new Error('Falha');
      resetForm();
      await load();
    } catch (err) {
      setError('Nao foi possivel salvar fornecedor.');
    }
  }

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingId) return;
    setError('');
    if (!validateDocument(documentRaw)) {
      setError('Digite CPF (11 digitos) ou CNPJ (14 digitos).');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/providers/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name,
          document: normalizeDigits(documentRaw),
          contractType: contractType || undefined,
          description: description || undefined,
          bankCode: bankCode || undefined,
          bankName: bankName || undefined,
          agency: agency || undefined,
          account: account || undefined,
          pixType: pixType || undefined,
          pixKey: pixKey || undefined,
          cityIds: cityIds.length ? cityIds : undefined,
          phone: phone || undefined,
          email: email || undefined,
          address: address || undefined,
        }),
      });
      if (!res.ok) throw new Error('Falha');
      resetForm();
      await load();
    } catch (err) {
      setError('Nao foi possivel atualizar fornecedor.');
    }
  }

  async function handleDeactivate(id: string) {
    setError('');
    try {
      const res = await fetch(`${API_URL}/providers/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: 'inactive' }),
      });
      if (!res.ok) throw new Error('Falha');
      await load();
    } catch (err) {
      setError('Nao foi possivel inativar fornecedor.');
    }
  }

  function resetForm() {
    setName('');
    setDocumentRaw('');
    setContractType('');
    setDescription('');
    setBankCode('');
    setBankName('');
    setAgency('');
    setAccount('');
    setPixType('');
    setPixKey('');
    setCityIds([]);
    setPhone('');
    setEmail('');
    setAddress('');
    setEditingId(null);
  }

  return (
    <section className="ip-page" style={{ display: 'grid', gap: 16 }}>
      <div className="panel panel--flat">
        <div className="panel-header">
          <div className="toolbar ip-toolbar">
            <div style={{ display: 'grid', gap: 6 }}>
              <h1 className="ip-page-title">Fornecedores</h1>
              <span className="ip-page-subtitle">Cadastro completo e vinculo por municipio.</span>
            </div>
            <div className="toolbar-actions">
              <button
                className="button"
                type="button"
                onClick={() => {
                  const form = document.getElementById('novo-fornecedor');
                  if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                + Novo Fornecedor
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
                placeholder="Buscar por nome"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <label className="ip-field">
              <span className="ip-field-label">Documento</span>
              <input
                className="input"
                placeholder="CPF ou CNPJ"
                value={documentFilter}
                onChange={(e) => setDocumentFilter(e.target.value)}
              />
            </label>
            <label className="ip-field">
              <span className="ip-field-label">Status</span>
              <select
                className="input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="active">Ativos</option>
                <option value="inactive">Inativos</option>
              </select>
            </label>
            <button className="button ip-filter-button" type="button" onClick={load}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <strong>Novo Fornecedor</strong>
        </div>

        <form
          id="novo-fornecedor"
          onSubmit={editingId ? handleUpdate : handleCreate}
          className="panel-body"
          style={{ display: 'grid', gap: 16 }}
        >
        <div style={{ display: 'grid', gap: 10 }}>
          <strong>Informacoes Basicas</strong>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <label style={{ display: 'grid', gap: 6 }}>
              Nome/Razao Social *
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              CPF/CNPJ *
              <input
                className="input"
                value={documentDisplay}
                onChange={(e) => setDocumentRaw(e.target.value)}
                placeholder="Digite CPF (11 digitos) ou CNPJ (14 digitos)"
                required
              />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              Tipo de Contrato *
              <select
                className="input"
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                {CONTRACT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: 'grid', gap: 6, gridColumn: '1 / -1' }}>
              Descricao
              <textarea
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </label>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          <strong>Dados Bancarios (opcional)</strong>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <label style={{ display: 'grid', gap: 6 }}>
              Codigo do Banco
              <input className="input" value={bankCode} onChange={(e) => setBankCode(e.target.value)} />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              Nome do Banco
              <input className="input" value={bankName} onChange={(e) => setBankName(e.target.value)} />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              Agencia
              <input className="input" value={agency} onChange={(e) => setAgency(e.target.value)} />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              Conta
              <input className="input" value={account} onChange={(e) => setAccount(e.target.value)} />
            </label>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          <strong>Dados PIX (opcional)</strong>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <label style={{ display: 'grid', gap: 6 }}>
              Tipo da Chave PIX
              <select
                className="input"
                value={pixType}
                onChange={(e) => setPixType(e.target.value)}
              >
                <option value="">Selecione</option>
                {PIX_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              Chave PIX
              <input className="input" value={pixKey} onChange={(e) => setPixKey(e.target.value)} />
            </label>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          <strong>Municipios Vinculados *</strong>
          <div style={{ display: 'grid', gap: 8 }}>
            <small>Selecione os municipios</small>
            <div
              style={{
                display: 'grid',
                gap: 8,
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                maxHeight: 220,
                overflowY: 'auto',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: 12,
                background: 'var(--card)',
              }}
            >
              {cities.length ? (
                cities.map((city) => (
                  <label key={city.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      checked={cityIds.includes(city.id)}
                      onChange={(e) => {
                        setCityIds((prev) =>
                          e.target.checked
                            ? [...prev, city.id]
                            : prev.filter((item) => item !== city.id),
                        );
                      }}
                    />
                    {city.name} / {city.state}
                  </label>
                ))
              ) : (
                <span>Nenhum municipio cadastrado.</span>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          <strong>Contato (opcional)</strong>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <label style={{ display: 'grid', gap: 6 }}>
              Telefone
              <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              Email
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              Endereco
              <input className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="button" type="submit">
            {editingId ? 'Atualizar fornecedor' : 'Salvar fornecedor'}
          </button>
          {editingId ? (
            <button className="button secondary" type="button" onClick={resetForm}>
              Cancelar edicao
            </button>
          ) : null}
        </div>
        </form>
      </div>

      <div className="panel">
        {error ? <p style={{ color: 'var(--danger)', padding: 16 }}>{error}</p> : null}

        {loading ? (
          <p className="pill" style={{ padding: 16 }}>
            Carregando...
          </p>
        ) : (
          <div style={{ overflowX: 'auto', padding: 16 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th style={{ paddingBottom: 8 }}>Nome</th>
                  <th style={{ paddingBottom: 8 }}>Documento</th>
                  <th style={{ paddingBottom: 8 }}>Contrato</th>
                  <th style={{ paddingBottom: 8 }}>Municipios</th>
                  <th style={{ paddingBottom: 8 }}>Status</th>
                  <th style={{ paddingBottom: 8 }}>Criado</th>
                  <th style={{ paddingBottom: 8 }}>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 0' }}>{item.name}</td>
                    <td style={{ padding: '10px 0' }}>{item.document ?? '-'}</td>
                    <td style={{ padding: '10px 0' }}>{item.contractType ?? '-'}</td>
                    <td style={{ padding: '10px 0' }}>{item.cityIds?.length ?? 0}</td>
                    <td style={{ padding: '10px 0' }}>{item.status}</td>
                    <td style={{ padding: '10px 0' }}>
                      {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td style={{ padding: '10px 0' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          className="button secondary"
                          type="button"
                          onClick={() => {
                            setEditingId(item.id);
                            setName(item.name);
                            setDocumentRaw(item.document ?? '');
                            setContractType(item.contractType ?? '');
                            setDescription(item.description ?? '');
                            setBankCode(item.bankCode ?? '');
                            setBankName(item.bankName ?? '');
                            setAgency(item.agency ?? '');
                            setAccount(item.account ?? '');
                            setPixType(item.pixType ?? '');
                            setPixKey(item.pixKey ?? '');
                            setCityIds(item.cityIds ?? []);
                            setPhone(item.phone ?? '');
                            setEmail(item.email ?? '');
                            setAddress(item.address ?? '');
                          }}
                        >
                          Editar
                        </button>
                        {item.status === 'active' ? (
                          <button
                            className="button danger"
                            type="button"
                            onClick={() => handleDeactivate(item.id)}
                          >
                            Inativar
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
