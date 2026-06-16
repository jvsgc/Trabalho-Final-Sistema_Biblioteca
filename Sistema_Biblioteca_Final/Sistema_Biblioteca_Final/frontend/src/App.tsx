import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCcw, Search } from 'lucide-react';
import { api } from './api/client';
import BookCard from './components/BookCard';
import BookForm, { LivroFormState } from './components/BookForm';
import CategoryManager, { CategoriaFormState } from './components/CategoryManager';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import LoanPanel, { EmprestimoFormState } from './components/LoanPanel';
import LoginForm from './components/LoginForm';
import Sidebar from './components/Sidebar';
import type { AuthResponse, Categoria, DashboardStats, Emprestimo, Livro, Usuario } from './types/models';

type View = 'dashboard' | 'livros' | 'categorias' | 'emprestimos';

const emptyLivroForm: LivroFormState = {
  titulo: '',
  autor: '',
  isbn: '',
  editora: '',
  anoPublicacao: '',
  quantidadeTotal: '1',
  categoriaId: ''
};

const emptyCategoriaForm: CategoriaFormState = {
  nome: '',
  descricao: ''
};

const emptyEmprestimoForm: EmprestimoFormState = {
  livroId: '',
  leitor: ''
};

function loadStoredUser(): Usuario | null {
  const raw = localStorage.getItem('biblioteca_usuario');
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as Usuario;
  } catch {
    return null;
  }
}

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('biblioteca_token'));
  const [usuario, setUsuario] = useState<Usuario | null>(() => loadStoredUser());
  const [view, setView] = useState<View>('dashboard');
  const [stats, setStats] = useState<DashboardStats>();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [livroForm, setLivroForm] = useState<LivroFormState>(emptyLivroForm);
  const [categoriaForm, setCategoriaForm] = useState<CategoriaFormState>(emptyCategoriaForm);
  const [emprestimoForm, setEmprestimoForm] = useState<EmprestimoFormState>(emptyEmprestimoForm);
  const [termoBusca, setTermoBusca] = useState('');
  const [feedback, setFeedback] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const isAdmin = usuario?.role === 'ROLE_ADMIN';

  const livrosFiltrados = useMemo(() => {
    const termo = termoBusca.trim().toLowerCase();
    if (!termo) {
      return livros;
    }
    return livros.filter((livro) =>
      [livro.titulo, livro.autor, livro.categoriaNome, livro.isbn ?? ''].some((campo) =>
        campo.toLowerCase().includes(termo)
      )
    );
  }, [livros, termoBusca]);

  const carregarDados = useCallback(async () => {
    if (!token) {
      return;
    }

    setLoading(true);
    setErro('');
    try {
      const [dashboardData, livrosData, categoriasData, emprestimosData] = await Promise.all([
        api.dashboard(token),
        api.listarLivros(token),
        api.listarCategorias(token),
        api.listarEmprestimos(token)
      ]);

      setStats(dashboardData);
      setLivros(livrosData);
      setCategorias(categoriasData);
      setEmprestimos(emprestimosData);
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Nao foi possivel carregar os dados.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  function persistirSessao(response: AuthResponse) {
    localStorage.setItem('biblioteca_token', response.token);
    localStorage.setItem('biblioteca_usuario', JSON.stringify(response.usuario));
    setToken(response.token);
    setUsuario(response.usuario);
  }

  function sair() {
    localStorage.removeItem('biblioteca_token');
    localStorage.removeItem('biblioteca_usuario');
    setToken(null);
    setUsuario(null);
  }

  async function executarAcao(acao: () => Promise<unknown>, mensagem: string) {
    setErro('');
    setFeedback('');
    try {
      await acao();
      setFeedback(mensagem);
      await carregarDados();
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Nao foi possivel concluir a operacao.');
    }
  }

  async function salvarLivro() {
    if (!token) return;

    await executarAcao(async () => {
      await api.salvarLivro(
        token,
        {
          titulo: livroForm.titulo,
          autor: livroForm.autor,
          isbn: livroForm.isbn || undefined,
          editora: livroForm.editora || undefined,
          anoPublicacao: livroForm.anoPublicacao ? Number(livroForm.anoPublicacao) : undefined,
          quantidadeTotal: Number(livroForm.quantidadeTotal),
          categoriaId: Number(livroForm.categoriaId)
        },
        livroForm.id
      );
      setLivroForm(emptyLivroForm);
    }, livroForm.id ? 'Livro atualizado.' : 'Livro cadastrado.');
  }

  function editarLivro(livro: Livro) {
    setLivroForm({
      id: livro.id,
      titulo: livro.titulo,
      autor: livro.autor,
      isbn: livro.isbn ?? '',
      editora: livro.editora ?? '',
      anoPublicacao: livro.anoPublicacao ? String(livro.anoPublicacao) : '',
      quantidadeTotal: String(livro.quantidadeTotal),
      categoriaId: String(livro.categoriaId)
    });
    setView('livros');
  }

  async function excluirLivro(id: number) {
    if (!token) return;
    await executarAcao(() => api.excluirLivro(token, id), 'Livro excluido.');
  }

  async function salvarCategoria() {
    if (!token) return;

    await executarAcao(async () => {
      await api.salvarCategoria(
        token,
        {
          nome: categoriaForm.nome,
          descricao: categoriaForm.descricao || undefined
        },
        categoriaForm.id
      );
      setCategoriaForm(emptyCategoriaForm);
    }, categoriaForm.id ? 'Categoria atualizada.' : 'Categoria cadastrada.');
  }

  function editarCategoria(categoria: Categoria) {
    setCategoriaForm({
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao ?? ''
    });
  }

  async function excluirCategoria(id: number) {
    if (!token) return;
    await executarAcao(() => api.excluirCategoria(token, id), 'Categoria excluida.');
  }

  async function salvarEmprestimo() {
    if (!token) return;
    await executarAcao(async () => {
      await api.criarEmprestimo(token, {
        livroId: Number(emprestimoForm.livroId),
        leitor: emprestimoForm.leitor
      });
      setEmprestimoForm(emptyEmprestimoForm);
    }, 'Emprestimo registrado.');
  }

  async function devolverEmprestimo(id: number) {
    if (!token) return;
    await executarAcao(() => api.devolverEmprestimo(token, id), 'Devolucao registrada.');
  }

  if (!token || !usuario) {
    return (
      <LoginForm
        onLogin={persistirSessao}
        onSubmitLogin={api.login}
        onSubmitRegister={api.registrar}
      />
    );
  }

  return (
    <>
      <Header usuario={usuario} onLogout={sair} />
      <main className="app-shell">
        <Sidebar view={view} onChangeView={setView} />
        <section className="content-area">
          <div className="content-toolbar">
            <div>
              <p className="eyebrow">Biblioteca</p>
              <h2>
                {view === 'dashboard' && 'Dashboard'}
                {view === 'livros' && 'Livros'}
                {view === 'categorias' && 'Categorias'}
                {view === 'emprestimos' && 'Emprestimos'}
              </h2>
            </div>
            <button className="btn btn-outline-secondary btn-sm" type="button" onClick={carregarDados} disabled={loading}>
              <RefreshCcw size={16} aria-hidden="true" />
              Atualizar
            </button>
          </div>

          {erro && <div className="alert alert-danger">{erro}</div>}
          {feedback && <div className="alert alert-success">{feedback}</div>}

          {view === 'dashboard' && <Dashboard stats={stats} />}

          {view === 'livros' && (
            <div className="books-layout">
              {isAdmin && (
                <section className="workspace-panel">
                  <h2>{livroForm.id ? 'Editar livro' : 'Novo livro'}</h2>
                  <BookForm
                    form={livroForm}
                    categorias={categorias}
                    onChange={setLivroForm}
                    onSubmit={salvarLivro}
                    onCancel={() => setLivroForm(emptyLivroForm)}
                  />
                </section>
              )}

              <section className="workspace-panel wide-panel">
                <div className="search-row">
                  <label className="search-field">
                    <Search size={18} aria-hidden="true" />
                    <input
                      value={termoBusca}
                      onChange={(event) => setTermoBusca(event.target.value)}
                      placeholder="Buscar por titulo, autor, categoria ou ISBN"
                    />
                  </label>
                </div>

                <div className="book-grid">
                  {livrosFiltrados.map((livro) => (
                    <BookCard
                      key={livro.id}
                      livro={livro}
                      isAdmin={Boolean(isAdmin)}
                      onEdit={editarLivro}
                      onDelete={excluirLivro}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}

          {view === 'categorias' && (
            <CategoryManager
              categorias={categorias}
              form={categoriaForm}
              isAdmin={Boolean(isAdmin)}
              onChange={setCategoriaForm}
              onSubmit={salvarCategoria}
              onEdit={editarCategoria}
              onDelete={excluirCategoria}
            />
          )}

          {view === 'emprestimos' && (
            <LoanPanel
              livros={livros}
              emprestimos={emprestimos}
              form={emprestimoForm}
              onChange={setEmprestimoForm}
              onSubmit={salvarEmprestimo}
              onReturn={devolverEmprestimo}
            />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
