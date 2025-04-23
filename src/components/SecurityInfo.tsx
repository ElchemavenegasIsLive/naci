import React from 'react';
import { Shield, AlertTriangle, Info } from 'lucide-react';

const SecurityInfo: React.FC = () => {
  return (
    <div className="bg-bna-gray-light border border-bna-gray rounded-lg p-4 max-w-md w-full">
      <div className="flex items-center mb-3">
        <Shield className="h-5 w-5 text-bna-blue mr-2" />
        <h3 className="font-medium text-bna-blue">Consejos de Seguridad</h3>
      </div>
      
      <ul className="space-y-2 text-sm text-bna-gray-dark">
        <li className="flex items-start">
          <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
          <span>Nunca revele su clave. El Banco jamás le solicitará sus datos por teléfono, correo o SMS.</span>
        </li>
        <li className="flex items-start">
          <AlertTriangle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
          <span>Verifique que la dirección web comience con https:// y tenga un candado de seguridad.</span>
        </li>
        <li className="flex items-start">
          <Info className="h-4 w-4 text-bna-blue mr-2 mt-0.5 flex-shrink-0" />
          <span>Cambie su clave periódicamente y no utilice datos personales fáciles de adivinar.</span>
        </li>
      </ul>
      
      <div className="mt-3 text-center">
        <a href="#" className="text-xs text-bna-blue hover:text-bna-blue-light">
          Ver más consejos de seguridad
        </a>
      </div>
    </div>
  );
};

export default SecurityInfo;