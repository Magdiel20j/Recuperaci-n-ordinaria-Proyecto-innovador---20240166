import { useState } from 'react';
import { useStudents } from '../hooks/useStudents';
import { Dashboard } from '../components/Dashboard';
import { StudentForm } from '../components/StudentForm';

export const Home = () => {
  const { students, loading, addStudent, updateStudent, deleteStudent, seedInitialData } = useStudents();
  const [editingStudent, setEditingStudent] = useState(null);

  const handleFormSubmit = (student) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, student);
      setEditingStudent(null);
    } else {
      addStudent(student);
    }
  };

  if (loading) return <div className="main-wrapper"><p>Cargando...</p></div>;

  return (
    <div className="main-wrapper">
      <h1>Escuelita Marvel</h1>
      
      {students.length === 0 && (
        <div style={{ marginBottom: '15px' }}>
          <button onClick={seedInitialData}>Cargar Alumnos Iniciales</button>
        </div>
      )}

      <Dashboard />
      
      <h2>{editingStudent ? 'Editar Estudiante' : 'Nuevo Estudiante'}</h2>
      <StudentForm currentStudent={editingStudent} clearEdit={() => setEditingStudent(null)} onSubmit={handleFormSubmit} />

      <h2>Lista de Estudiantes</h2>
      <table>
        <thead>
          <tr>
            <th>Carnet</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Grado</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id}>
              <td>{s.Carnet}</td>
              <td>{s.Nombre}</td>
              <td>{s.Apellido}</td>
              <td>{s.Grado === 1 ? '1° Grado (Básico)' : `${s.Grado}° Grado`}</td>
              <td>{s.Estado ? 'Activo' : 'Inactivo'}</td>
              <td>
                <button onClick={() => setEditingStudent(s)}>Editar</button>
                <button onClick={() => deleteStudent(s.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};