'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

type Contract = {
  id: string;
  collaboratorId: string;
  cityId: string;
  bankName: string;
  contractType: string;
  templateId: string | null;
  status: string;
  startDate: string;
  endDate: string | null;
  amount: string;
  createdAt: string;
};

type Collaborator = {
  id: string;
  fullName: string;
};

type City = {
  id: string;
  name: string;
};

function formatCurrency(value: string) {
  const digits = value.replace(/\D/g, '').padStart(3, '0');
  const cents = digits.slice(-2);
  const integers = digits.slice(0, -2);
  const withThousands = integers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${withThousands},${cents}`;
}

function toRawAmount(value: string) {
  const digits = value.replace(/\D/g, '').padStart(3, '0');
  const integers = digits.slice(0, -2) || '0';
  const cents = digits.slice(-2);
  return `${integers}.${cents}`;
}

export default function ContratosPage() {
  const [items, setItems] = useState<Contract[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [collaboratorId, setCollaboratorId] = useState('');
  const [cityId, setCityId] = useState('');
  const [bankName, setBankName] = useState('');
  const [contractType, setContractType] = useState<'RPA' | 'MEI' | 'CLT'>('RPA');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError('');
    try {
      const storedToken =
        token ?? (typeof window !== 'undefined' ? window.localStorage.getItem('ip_token') : null);
      const authHeaders = storedToken ? { Authorization: `Bearer ${storedToken}` } : undefined;
      const [contractsRes, collaboratorsRes, citiesRes] = await Promise.all([
        fetch(`${API_URL}/contracts`, { headers: authHeaders }),
        fetch(`${API_URL}/collaborators`, { headers: authHeaders }),
        fetch(`${API_URL}/cities`, { headers: authHeaders }),
      ]);

      if (!contractsRes.ok || !collaboratorsRes.ok || !citiesRes.ok) {
        throw new Error('Falha ao carregar');
      }

      const contractsData = await contractsRes.json();
      const collaboratorsData = await collaboratorsRes.json();
      const citiesData = await citiesRes.json();
      setItems(contractsData);
      setCollaborators(collaboratorsData);
      setCities(citiesData);
    } catch (err) {
      setError('Nao foi possivel carregar contratos.');
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
      const res = await fetch(`${API_URL}/contracts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          collaboratorId,
          cityId,
          bankName,
          contractType,
          startDate,
          endDate: endDate || undefined,
          amount: toRawAmount(amount),
        }),
      });

      if (!res.ok) {
        throw new Error('Falha ao salvar');
      }

      setCollaboratorId('');
      setCityId('');
      setBankName('');
      setContractType('RPA');
      setStartDate('');
      setEndDate('');
      setAmount('');
      await load();
    } catch (err) {
      setError('Nao foi possivel salvar contrato.');
    }
  }

  return (
    <section className="card" style={{ padding: 22, display: 'grid', gap: 18 }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26 }}>
          Contratos
        </h1>
        <p className="muted" style={{ marginTop: 8 }}>
          Cadastro basico para testes. Em breve com templates e PDFs.
        </p>
      </div>

      <form onSubmit={handleCreate} style={{ display: 'grid', gap: 12 }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <label style={{ display: 'grid', gap: 6 }}>
            Colaborador
            <select
              className="input"
              value={collaboratorId}
              onChange={(event) => setCollaboratorId(event.target.value)}
              required
            >
              <option value="">Selecione</option>
              {collaborators.map((collaborator) => (
                <option key={collaborator.id} value={collaborator.id}>
                  {collaborator.fullName}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Cidade
            <select
              className="input"
              value={cityId}
              onChange={(event) => setCityId(event.target.value)}
              required
            >
              <option value="">Selecione</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Banco
            <input
              className="input"
              value={bankName}
              onChange={(event) => setBankName(event.target.value)}
              required
            />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Tipo de contrato
            <select
              className="input"
              value={contractType}
              onChange={(event) => setContractType(event.target.value as 'RPA' | 'MEI' | 'CLT')}
              required
            >
              <option value="RPA">RPA</option>
              <option value="MEI">MEI</option>
              <option value="CLT">CLT</option>
            </select>
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Inicio
            <input
              className="input"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              required
            />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Fim
            <input
              className="input"
              type="date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </label>
          <label style={{ display: 'grid', gap: 6 }}>
            Valor
            <input
              className="input"
              value={amount}
              onChange={(event) => setAmount(formatCurrency(event.target.value))}
              placeholder="0,00"
              required
            />
          </label>
        </div>
        <button className="button" type="submit">
          Salvar contrato
        </button>
      </form>

      {error ? <p style={{ color: 'var(--danger)' }}>{error}</p> : null}

      {loading ? (
        <p className="muted">Carregando...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ paddingBottom: 8 }}>Colaborador</th>
                <th style={{ paddingBottom: 8 }}>Cidade</th>
                <th style={{ paddingBottom: 8 }}>Banco</th>
                <th style={{ paddingBottom: 8 }}>Tipo</th>
                <th style={{ paddingBottom: 8 }}>Periodo</th>
                <th style={{ paddingBottom: 8 }}>Valor</th>
                <th style={{ paddingBottom: 8 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const collaborator = collaborators.find((c) => c.id === item.collaboratorId);
                const city = cities.find((c) => c.id === item.cityId);
                return (
                  <tr key={item.id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '10px 0' }}>{collaborator?.fullName ?? '-'}</td>
                    <td style={{ padding: '10px 0' }}>{city?.name ?? '-'}</td>
                    <td style={{ padding: '10px 0' }}>{item.bankName ?? '-'}</td>
                    <td style={{ padding: '10px 0' }}>{item.contractType ?? '-'}</td>
                    <td style={{ padding: '10px 0' }}>
                      {item.startDate ?? '-'} - {item.endDate ?? '-'}
                    </td>
                    <td style={{ padding: '10px 0' }}>
                      {item.amount ? formatCurrency(item.amount) : '-'}
                    </td>
                    <td style={{ padding: '10px 0' }}>{item.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
