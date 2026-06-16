import { BarChart3, BookOpen, ClipboardList, Layers3 } from 'lucide-react';

export type View = 'dashboard' | 'livros' | 'categorias' | 'emprestimos';

interface SidebarProps {
  view: View;
  onChangeView: (view: View) => void;
}

const items: Array<{ id: View; label: string; icon: typeof BarChart3 }> = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'livros', label: 'Livros', icon: BookOpen },
  { id: 'categorias', label: 'Categorias', icon: Layers3 },
  { id: 'emprestimos', label: 'Emprestimos', icon: ClipboardList }
];

export default function Sidebar({ view, onChangeView }: SidebarProps) {
  return (
    <aside className="sidebar">
      <span className="sidebar-title">Menu</span>
      <nav className="nav-list" aria-label="Navegacao principal">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-button ${view === item.id ? 'active' : ''}`}
              onClick={() => onChangeView(item.id)}
              type="button"
            >
              <Icon size={18} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
