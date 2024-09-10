import React from 'react';

const ForbiddenPage: React.FC = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-4xl font-semibold text-[#160430]">403</p> 
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#160430] sm:text-5xl">Acceso restringido</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Lo sentimos, no tienes los permisos necesarios para acceder a esta página.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/home"
            className="rounded-md bg-[#160430] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2d0b5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#160430]"
          >
            Regresar al inicio
          </a>
          <a href="/contact" className="text-sm font-semibold text-[#160430] hover:text-[#2d0b5a]">
            Contactar soporte <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default ForbiddenPage;
