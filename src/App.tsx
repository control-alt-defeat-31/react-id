import React from 'react';
import { DashboardProvider } from './context/DashboardContext';
import { Dashboard } from './components/Layout/Dashboard';

function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}

export default App;