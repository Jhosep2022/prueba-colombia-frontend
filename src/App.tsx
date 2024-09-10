import React from 'react';
import AppRouter from './router/AppRouter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-custom-gradient">
      <AppRouter />
    </div>

  );
};

export default App;
