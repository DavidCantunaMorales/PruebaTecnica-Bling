import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { RegisterForm } from './components/RegisterForm';

function App() {
  const { users } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Registro de Usuarios</h1>
        <RegisterForm />
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Usuarios Registrados</h2>
          {users.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">ID</th>
                  <th className="border border-gray-300 p-2">Nombre</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Celular</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="border border-gray-300 p-2">{user.id}</td>
                    <td className="border border-gray-300 p-2">{user.name}</td>
                    <td className="border border-gray-300 p-2">{user.email}</td>
                    <td className="border border-gray-300 p-2">{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No hay usuarios registrados.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;