import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-bna-gray-light text-bna-gray-dark py-4">
      <div className="container mx-auto px-4">
        <div className="cuerpo" id="divCuerpo">
          <div className="flex justify-between items-center">
            <a 
              href="http://www.redlink.com.ar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="RedLinkLogoLogin"
            >
              <img 
                src="https://hb.redlink.com.ar/bna/entidades/banco.nacion.v2/vista/imagenes/login/logo_link.jpg" 
                width="60" 
                height="60" 
                alt="RED LINK"
                className="rounded"
              />
            </a>
            
            <div className="chicos">
              <div 
                className="flex items-center justify-center" 
                title="Haga Click para Verificar - Este sitio cuenta con un Certificado SSL para asegurar la confidencialidad de sus comunicaciones."
              >
                <a 
                  href="https://seal.certisur.com/getseal?host_name=hb.redlink.com.ar&lang=es&version=CURS-3.0&domain=imagen&ca=norton" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="linkCertisur"
                >
                  <img 
                    src="https://hb.redlink.com.ar/bna/entidades/banco.nacion.v2/vista/imagenes/login/CURS-3.0.png" 
                    alt="CertiSur Seal" 
                    width="100" 
                    height="72" 
                    className="imagenCertisur"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;