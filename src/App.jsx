import { StudentProvider } from './context/StudentContext';
import { Home } from './pages/Home';

function App() {
  return (
    <StudentProvider>
      <Home />
    </StudentProvider>
  );
}

export default App;