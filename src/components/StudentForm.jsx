import { useState, useEffect } from 'react';

export const StudentForm = ({ currentStudent, clearEdit, onSubmit }) => {
  const [form, setForm] = useState({ Nombre: '', Apellido: '', Carnet: '', Grado: 1, Estado: true });

  useEffect(() => {
    if (currentStudent) setForm(currentStudent);
    else setForm({ Nombre: '', Apellido: '', Carnet: '', Grado: 1, Estado: true });
  }, [currentStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ Nombre: '', Apellido: '', Carnet: '', Grado: 1, Estado: true });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', marginBottom: '20px', maxWidth: '400px' }}>
      <input type="text" placeholder="Carnet" value={form.Carnet} onChange={e => setForm({...form, Carnet: e.target.value})} required />
      <input type="text" placeholder="Nombre" value={form.Nombre} onChange={e => setForm({...form, Nombre: e.target.value})} required />
      <input type="text" placeholder="Apellido" value={form.Apellido} onChange={e => setForm({...form, Apellido: e.target.value})} required />
      <input type="number" placeholder="Grado" value={form.Grado} onChange={e => setForm({...form, Grado: Number(e.target.value)})} required />
      <label>
        <input type="checkbox" checked={form.Estado} onChange={e => setForm({...form, Estado: e.target.checked})} /> Activo
      </label>
      <button type="submit">{currentStudent ? 'Actualizar Estudiante' : 'Guardar Estudiante'}</button>
      {currentStudent && <button type="button" onClick={clearEdit}>Cancelar Editado</button>}
    </form>
  );
};