import { LogOut, ShieldCheck } from 'lucide-react';
import type { Usuario } from '../types/models';

interface HeaderProps {
  usuario: Usuario;
  onLogout: () => void;
}

export default function Header({ usuario, onLogout }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">Sistema de Biblioteca</p>
        <h1>Controle de acervo e emprestimos</h1>
      </div>

      <div className="header-actions">
        <div className="user-pill">
          <ShieldCheck size={18} aria-hidden="true" />
          <span>{usuario.nome}</span>
          <small>{usuario.role === 'ROLE_ADMIN' ? 'Administrador' : 'Usuario'}</small>
        </div>
        <button className="btn btn-outline-light btn-sm d-inline-flex align-items-center gap-2" onClick={onLogout}>
          <LogOut size={16} aria-hidden="true" />
          Sair
        </button>
      </div>
    </header>
  );
}
