import { FormEvent } from 'react';
import { Save, Trash2 } from 'lucide-react';
import type { Categoria } from '../types/models';

export interface CategoriaFormState {
  id?: number;
  nome: string;
  descricao: string;
}

interface CategoryManagerProps {
  categorias: Categoria[];
  form: CategoriaFormState;
  isAdmin: boolean;
  onChange: (form: CategoriaFormState) => void;
  onSubmit: () => void;
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
}

export default function CategoryManager({
  categorias,
  form,
  isAdmin,
  onChange,
  onSubmit,
  onEdit,
  onDelete
}: CategoryManagerProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <div className="split-layout">
      {isAdmin && (
        <form className="workspace-panel" onSubmit={handleSubmit}>
          <h2>{form.id ? 'Editar categoria' : 'Nova categoria'}</h2>
          <label className="form-label">
            Nome
            <input
              className="form-control"
              value={form.nome}
              onChange={(event) => onChange({ ...form, nome: event.target.value })}
              required
              maxLength={100}
            />
          </label>
          <label className="form-label">
            Descricao
            <textarea
              className="form-control"
              value={form.descricao}
              onChange={(event) => onChange({ ...form, descricao: event.target.value })}
              rows={4}
              maxLength={255}
            />
          </label>
          <button className="btn btn-primary" type="submit">
            <Save size={16} aria-hidden="true" />
            {form.id ? 'Atualizar' : 'Salvar'}
          </button>
        </form>
      )}

      <section className="workspace-panel">
        <h2>Categorias cadastradas</h2>
        <div className="category-list">
          {categorias.map((categoria) => (
            <article className="category-row" key={categoria.id}>
              <button className="plain-row" type="button" onClick={() => isAdmin && onEdit(categoria)}>
                <strong>{categoria.nome}</strong>
                <span>{categoria.descricao || 'Sem descricao'}</span>
              </button>
              {isAdmin && (
                <button className="icon-danger" type="button" onClick={() => onDelete(categoria.id)} title="Excluir categoria">
                  <Trash2 size={18} aria-hidden="true" />
                </button>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
