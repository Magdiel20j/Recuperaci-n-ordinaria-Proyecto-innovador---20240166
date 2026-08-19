import { useContext } from 'react';
import { StudentContext } from '../context/StudentContext';

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) throw new Error('Error de Provider');
  return context;
};