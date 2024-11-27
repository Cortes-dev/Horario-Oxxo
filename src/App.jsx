import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TableHorario from './components/TableHorario';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow p-6">
        <TableHorario />
      </main>

      <Footer />
    </div>
  );
};

export default App;
