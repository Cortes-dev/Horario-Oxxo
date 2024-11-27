import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-red-600 text-white py-6">
            <div className="container mx-auto text-center">
                <p className="text-sm">&copy; 2024 Tu Empresa. Todos los derechos reservados.</p>
                <div className="flex justify-center mt-4 space-x-6">
                    <a href="#" className="text-gray-400 hover:text-white">Política de privacidad</a>
                    <a href="#" className="text-gray-400 hover:text-white">Términos de uso</a>
                    <a href="#" className="text-gray-400 hover:text-white">Contacto</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
