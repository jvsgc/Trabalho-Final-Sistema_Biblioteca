export type Role = 'ROLE_ADMIN' | 'ROLE_USER';
export type LoanStatus = 'ATIVO' | 'DEVOLVIDO';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: Role;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export interface DashboardStats {
  totalLivros: number;
  totalExemplares: number;
  exemplaresDisponiveis: number;
  emprestimosAtivos: number;
  totalCategorias: number;
  totalUsuarios: number;
}

export interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
}

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  isbn?: string;
  editora?: string;
  anoPublicacao?: number;
  quantidadeTotal: number;
  quantidadeDisponivel: number;
  categoriaId: number;
  categoriaNome: string;
}

export interface Emprestimo {
  id: number;
  livroId: number;
  livroTitulo: string;
  leitor: string;
  dataEmprestimo: string;
  dataDevolucao?: string;
  status: LoanStatus;
}

export interface LivroPayload {
  titulo: string;
  autor: string;
  isbn?: string;
  editora?: string;
  anoPublicacao?: number;
  quantidadeTotal: number;
  categoriaId: number;
}

export interface CategoriaPayload {
  nome: string;
  descricao?: string;
}

export interface EmprestimoPayload {
  livroId: number;
  leitor: string;
}
