import { FormEvent, useState } from 'react';
import { BookOpen, LogIn, UserPlus } from 'lucide-react';
import type { AuthResponse } from '../types/models';

interface LoginFormProps {
  onLogin: (response: AuthResponse) => void;
  onSubmitLogin: (email: string, senha: string) => Promise<AuthResponse>;
  onSubmitRegister: (nome: string, email: string, senha: string) => Promise<AuthResponse>;
}

export default function LoginForm({ onLogin, onSubmitLogin, onSubmitRegister }: LoginFormProps) {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('admin@biblioteca.com');
  const [senha, setSenha] = useState('admin123');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const response = modoCadastro
        ? await onSubmitRegister(nome, email, senha)
        : await onSubmitLogin(email, senha);
      onLogin(response);
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Falha ao autenticar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-screen">
      <section className="login-panel">
        <div className="brand-mark">
          <BookOpen size={34} aria-hidden="true" />
        </div>
        <p className="eyebrow">Sistema de Biblioteca</p>
        <h1>{modoCadastro ? 'Criar acesso' : 'Acessar sistema'}</h1>

        <form onSubmit={handleSubmit} className="login-form">
          {modoCadastro && (
            <label className="form-label">
              Nome
              <input
                className="form-control"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                required
                maxLength={120}
              />
            </label>
          )}

          <label className="form-label">
            E-mail
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="form-label">
            Senha
            <input
              className="form-control"
              type="password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              minLength={6}
              required
            />
          </label>

          {erro && <div className="alert alert-danger py-2">{erro}</div>}

          <button className="btn btn-primary w-100 d-inline-flex align-items-center justify-content-center gap-2" disabled={loading}>
            {modoCadastro ? <UserPlus size={18} aria-hidden="true" /> : <LogIn size={18} aria-hidden="true" />}
            {loading ? 'Aguarde...' : modoCadastro ? 'Cadastrar' : 'Entrar'}
          </button>
        </form>

        <button className="link-button" type="button" onClick={() => setModoCadastro((valor) => !valor)}>
          {modoCadastro ? 'Ja tenho cadastro' : 'Criar usuario comum'}
        </button>
      </section>
    </main>
  );
}
