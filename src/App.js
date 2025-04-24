import React from 'react'
import ExamSeatingChartGenerator from './components/ExamSeatingChartGenerator';
import { FEATURES } from './config';
import BackendNotification from './components/BackendNotification';

import './App.css';

function App() {
  const [showNotification, setShowNotification] = React.useState(FEATURES.SHOW_MAINTENANCE_NOTIFICATION);

  return (
    <div className='App'>
      <ExamSeatingChartGenerator />

      <BackendNotification
        isOpen={showNotification}
        onClose={() => setShowNotification(false)} />
    </div>
  )
}

export default App;
