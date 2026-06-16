import { FormEvent } from 'react';
import { CheckCircle2, RotateCcw } from 'lucide-react';
import type { Emprestimo, Livro } from '../types/models';

export interface EmprestimoFormState {
  livroId: string;
  leitor: string;
}

interface LoanPanelProps {
  livros: Livro[];
  emprestimos: Emprestimo[];
  form: EmprestimoFormState;
  onChange: (form: EmprestimoFormState) => void;
  onSubmit: () => void;
  onReturn: (id: number) => void;
}

function formatarData(valor?: string) {
  if (!valor) {
    return '-';
  }
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(valor));
}

export default function LoanPanel({ livros, emprestimos, form, onChange, onSubmit, onReturn }: LoanPanelProps) {
  const livrosDisponiveis = livros.filter((livro) => livro.quantidadeDisponivel > 0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <div className="split-layout">
      <form className="workspace-panel" onSubmit={handleSubmit}>
        <h2>Novo emprestimo</h2>
        <label className="form-label">
          Livro
          <select
            className="form-select"
            value={form.livroId}
            onChange={(event) => onChange({ ...form, livroId: event.target.value })}
            required
          >
            <option value="">Selecione</option>
            {livrosDisponiveis.map((livro) => (
              <option key={livro.id} value={livro.id}>
                {livro.titulo} ({livro.quantidadeDisponivel} disponiveis)
              </option>
            ))}
          </select>
        </label>

        <label className="form-label">
          Leitor
          <input
            className="form-control"
            value={form.leitor}
            onChange={(event) => onChange({ ...form, leitor: event.target.value })}
            required
            maxLength={140}
          />
        </label>

        <button className="btn btn-primary" type="submit">
          <CheckCircle2 size={16} aria-hidden="true" />
          Registrar emprestimo
        </button>
      </form>

      <section className="workspace-panel wide-panel">
        <h2>Historico</h2>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Livro</th>
                <th>Leitor</th>
                <th>Emprestimo</th>
                <th>Devolucao</th>
                <th>Status</th>
                <th className="text-end">Acao</th>
              </tr>
            </thead>
            <tbody>
              {emprestimos.map((emprestimo) => (
                <tr key={emprestimo.id}>
                  <td>{emprestimo.livroTitulo}</td>
                  <td>{emprestimo.leitor}</td>
                  <td>{formatarData(emprestimo.dataEmprestimo)}</td>
                  <td>{formatarData(emprestimo.dataDevolucao)}</td>
                  <td>
                    <span className={`status-badge ${emprestimo.status === 'ATIVO' ? 'status-warning' : 'status-success'}`}>
                      {emprestimo.status === 'ATIVO' ? 'Ativo' : 'Devolvido'}
                    </span>
                  </td>
                  <td className="text-end">
                    {emprestimo.status === 'ATIVO' && (
                      <button className="btn btn-outline-success btn-sm" type="button" onClick={() => onReturn(emprestimo.id)}>
                        <RotateCcw size={16} aria-hidden="true" />
                        Devolver
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
