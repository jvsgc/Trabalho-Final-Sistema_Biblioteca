import { Edit3, Trash2 } from 'lucide-react';
import type { Livro } from '../types/models';

interface BookCardProps {
  livro: Livro;
  isAdmin: boolean;
  onEdit: (livro: Livro) => void;
  onDelete: (id: number) => void;
}

export default function BookCard({ livro, isAdmin, onEdit, onDelete }: BookCardProps) {
  const indisponivel = livro.quantidadeDisponivel === 0;

  return (
    <article className="book-card">
      <div>
        <div className="book-card-header">
          <h3>{livro.titulo}</h3>
          <span className={`status-badge ${indisponivel ? 'status-danger' : 'status-success'}`}>
            {indisponivel ? 'Sem exemplares' : 'Disponivel'}
          </span>
        </div>
        <p className="book-author">{livro.autor}</p>
      </div>

      <dl className="book-meta">
        <div>
          <dt>Categoria</dt>
          <dd>{livro.categoriaNome}</dd>
        </div>
        <div>
          <dt>ISBN</dt>
          <dd>{livro.isbn || 'Nao informado'}</dd>
        </div>
        <div>
          <dt>Estoque</dt>
          <dd>
            {livro.quantidadeDisponivel}/{livro.quantidadeTotal}
          </dd>
        </div>
      </dl>

      {isAdmin && (
        <div className="book-actions">
          <button className="btn btn-outline-primary btn-sm" type="button" onClick={() => onEdit(livro)}>
            <Edit3 size={16} aria-hidden="true" />
            Editar
          </button>
          <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => onDelete(livro.id)}>
            <Trash2 size={16} aria-hidden="true" />
            Excluir
          </button>
        </div>
      )}
    </article>
  );
}
