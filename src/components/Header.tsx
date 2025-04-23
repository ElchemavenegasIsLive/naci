import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-bna-blue text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center">
          <img 
            src="https://hb.redlink.com.ar/bna/entidades/banco.nacion.v2/vista/imagenes/login/logoBna.png"
            alt="Banco de la Nación Argentina"
            className="h-12"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;