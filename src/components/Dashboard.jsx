import { useStudents } from '../hooks/useStudents';

export const Dashboard = () => {
  const { students } = useStudents();
  const activos = students.filter(s => s.Estado).length;
  const inactivos = students.filter(s => !s.Estado).length;

  return (
    <div className="stats-container">
      <div className="stat-box">
        <h3>Activos</h3>
        <p>{activos}</p>
      </div>
      <div className="stat-box">
        <h3>Inactivos</h3>
        <p>{inactivos}</p>
      </div>
    </div>
  );
};