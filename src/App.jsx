import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HorarioVista from './components/HorarioVista';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow p-6">
        <HorarioVista/>
      </main>

      <Footer />
    </div>
  );
};

export default App;
