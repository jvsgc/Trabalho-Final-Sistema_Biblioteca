import { BookCopy, BookOpenCheck, Library, Tags, UsersRound } from 'lucide-react';
import type { DashboardStats } from '../types/models';

interface DashboardProps {
  stats?: DashboardStats;
}

export default function Dashboard({ stats }: DashboardProps) {
  const metrics = [
    { label: 'Titulos', value: stats?.totalLivros ?? 0, icon: Library, tone: 'blue' },
    { label: 'Exemplares', value: stats?.totalExemplares ?? 0, icon: BookCopy, tone: 'green' },
    { label: 'Disponiveis', value: stats?.exemplaresDisponiveis ?? 0, icon: BookOpenCheck, tone: 'cyan' },
    { label: 'Emprestimos ativos', value: stats?.emprestimosAtivos ?? 0, icon: UsersRound, tone: 'amber' },
    { label: 'Categorias', value: stats?.totalCategorias ?? 0, icon: Tags, tone: 'violet' }
  ];

  return (
    <section className="metric-grid" aria-label="Resumo da biblioteca">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <article className={`metric metric-${metric.tone}`} key={metric.label}>
            <div className="metric-icon">
              <Icon size={22} aria-hidden="true" />
            </div>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        );
      })}
    </section>
  );
}
