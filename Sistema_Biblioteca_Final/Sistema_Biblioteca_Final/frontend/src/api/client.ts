import type {
  AuthResponse,
  Categoria,
  CategoriaPayload,
  DashboardStats,
  Emprestimo,
  EmprestimoPayload,
  Livro,
  LivroPayload
} from '../types/models';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';

type ApiOptions = RequestInit & {
  token?: string | null;
};

async function request<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type') ?? '';
  const data = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof data === 'object' && data !== null && 'mensagem' in data
      ? String(data.mensagem)
      : 'Nao foi possivel concluir a operacao.';
    throw new Error(message);
  }

  return data as T;
}

export const api = {
  login: (email: string, senha: string) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha })
    }),

  registrar: (nome: string, email: string, senha: string) =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nome, email, senha })
    }),

  dashboard: (token: string) => request<DashboardStats>('/dashboard', { token }),

  listarLivros: (token: string, termo = '') =>
    request<Livro[]>(`/livros${termo ? `?termo=${encodeURIComponent(termo)}` : ''}`, { token }),

  salvarLivro: (token: string, payload: LivroPayload, id?: number) =>
    request<Livro>(id ? `/livros/${id}` : '/livros', {
      method: id ? 'PUT' : 'POST',
      token,
      body: JSON.stringify(payload)
    }),

  excluirLivro: (token: string, id: number) =>
    request<void>(`/livros/${id}`, {
      method: 'DELETE',
      token
    }),

  listarCategorias: (token: string) => request<Categoria[]>('/categorias', { token }),

  salvarCategoria: (token: string, payload: CategoriaPayload, id?: number) =>
    request<Categoria>(id ? `/categorias/${id}` : '/categorias', {
      method: id ? 'PUT' : 'POST',
      token,
      body: JSON.stringify(payload)
    }),

  excluirCategoria: (token: string, id: number) =>
    request<void>(`/categorias/${id}`, {
      method: 'DELETE',
      token
    }),

  listarEmprestimos: (token: string) => request<Emprestimo[]>('/emprestimos', { token }),

  criarEmprestimo: (token: string, payload: EmprestimoPayload) =>
    request<Emprestimo>('/emprestimos', {
      method: 'POST',
      token,
      body: JSON.stringify(payload)
    }),

  devolverEmprestimo: (token: string, id: number) =>
    request<Emprestimo>(`/emprestimos/${id}/devolver`, {
      method: 'PATCH',
      token
    })
};
