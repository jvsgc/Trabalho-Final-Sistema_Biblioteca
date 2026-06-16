import { FormEvent } from 'react';
import { Save, X } from 'lucide-react';
import type { Categoria } from '../types/models';

export interface LivroFormState {
  id?: number;
  titulo: string;
  autor: string;
  isbn: string;
  editora: string;
  anoPublicacao: string;
  quantidadeTotal: string;
  categoriaId: string;
}

interface BookFormProps {
  form: LivroFormState;
  categorias: Categoria[];
  onChange: (form: LivroFormState) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function BookForm({ form, categorias, onChange, onSubmit, onCancel }: BookFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label className="form-label">
        Titulo
        <input
          className="form-control"
          value={form.titulo}
          onChange={(event) => onChange({ ...form, titulo: event.target.value })}
          required
          maxLength={180}
        />
      </label>

      <label className="form-label">
        Autor
        <input
          className="form-control"
          value={form.autor}
          onChange={(event) => onChange({ ...form, autor: event.target.value })}
          required
          maxLength={140}
        />
      </label>

      <label className="form-label">
        Categoria
        <select
          className="form-select"
          value={form.categoriaId}
          onChange={(event) => onChange({ ...form, categoriaId: event.target.value })}
          required
        >
          <option value="">Selecione</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </label>

      <label className="form-label">
        Quantidade
        <input
          className="form-control"
          type="number"
          min="1"
          value={form.quantidadeTotal}
          onChange={(event) => onChange({ ...form, quantidadeTotal: event.target.value })}
          required
        />
      </label>

      <label className="form-label">
        ISBN
        <input
          className="form-control"
          value={form.isbn}
          onChange={(event) => onChange({ ...form, isbn: event.target.value })}
          maxLength={30}
        />
      </label>

      <label className="form-label">
        Editora
        <input
          className="form-control"
          value={form.editora}
          onChange={(event) => onChange({ ...form, editora: event.target.value })}
          maxLength={120}
        />
      </label>

      <label className="form-label">
        Ano
        <input
          className="form-control"
          type="number"
          min="1450"
          max="2100"
          value={form.anoPublicacao}
          onChange={(event) => onChange({ ...form, anoPublicacao: event.target.value })}
        />
      </label>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit">
          <Save size={16} aria-hidden="true" />
          {form.id ? 'Atualizar livro' : 'Cadastrar livro'}
        </button>
        {form.id && (
          <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>
            <X size={16} aria-hidden="true" />
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
