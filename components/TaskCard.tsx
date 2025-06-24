import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'badge-warning';
      case 'In Progress':
        return 'badge-info';
      case 'Completed':
        return 'badge-success';
      default:
        return 'badge-ghost';
    }
  };

  const handleStatusChange = (newStatus: 'Pending' | 'In Progress' | 'Completed') => {
    onUpdate(task.id, { status: newStatus });
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-lg">{task.title}</h2>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li><button onClick={() => onDelete(task.id)} className="text-error">Delete Task</button></li>
            </ul>
          </div>
        </div>
        
        <p className="text-base-content/70 text-sm mb-4">{task.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className={`badge ${getStatusColor(task.status)}`}>
            {task.status}
          </div>
          <div className="badge badge-outline">
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="card-actions justify-end">
          <select
            className="select select-sm select-bordered"
            value={task.status}
            onChange={(e) => handleStatusChange(e.target.value as 'Pending' | 'In Progress' | 'Completed')}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
